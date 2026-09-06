import { randomBytes } from "node:crypto";
import { Redis } from "@upstash/redis";

/**
 * Per-recipient deck tracking store (self-contained, removable as one unit).
 *
 * Backed by Upstash Redis / Vercel KV. Credentials are read from env under
 * BOTH naming schemes so it works whether the store was connected as an
 * Upstash integration or a Vercel-KV integration. If neither is configured,
 * `client` is null and every function degrades gracefully — writes no-op,
 * reads return empty — so the public deck never 500s over analytics.
 */

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const client: Redis | null = url && token ? new Redis({ url, token }) : null;

export function redisEnabled(): boolean {
  return client !== null;
}

// ---- Keys --------------------------------------------------------------
const TOKENS_SET = "deck:tokens";
const eventsKey = (v: string) => `deck:events:${v}`;
const tokenKey = (v: string) => `deck:token:${v}`;

// ---- Types -------------------------------------------------------------
export type EventType = "view" | "dwell" | "cta";

export type IncomingEvent = {
  v: string;
  type: EventType;
  slide: string;
  seconds?: number;
  cta?: string;
};

export type StoredEvent = {
  type: EventType;
  slide: string;
  seconds?: number;
  cta?: string;
  ts: number;
};

export type TokenRow = {
  id: string;
  name: string;
  note: string;
  createdAt: number | null;
  lastSeen: number | null;
  views: number;
  ctas: number;
};

// ---- Validation --------------------------------------------------------
const TYPES: EventType[] = ["view", "dwell", "cta"];
const MAX_STR = 64;

function cleanStr(s: unknown, max = MAX_STR): string | null {
  if (typeof s !== "string") {
    return null;
  }
  const t = s.trim();
  if (!t || t.length > max) {
    return null;
  }
  return t;
}

function cleanSeconds(n: unknown): number | undefined {
  if (typeof n !== "number" || !Number.isFinite(n)) {
    return undefined;
  }
  const i = Math.round(n);
  if (i < 0 || i > 86400) {
    return undefined;
  }
  return i;
}

// ---- Writes ------------------------------------------------------------
/**
 * Record a single deck event. Silently skips when disabled or when the
 * payload is junk (bad token / slide / type / seconds). Never throws for
 * validation — callers on the public path must not leak errors.
 */
export async function recordEvent(ev: IncomingEvent): Promise<void> {
  if (!client) {
    return;
  }
  const v = cleanStr(ev?.v);
  const slide = cleanStr(ev?.slide);
  const type = ev?.type;
  if (!v || !slide || !TYPES.includes(type)) {
    return;
  }
  const cta = ev.cta != null ? cleanStr(ev.cta) : undefined;
  const seconds = cleanSeconds(ev.seconds);

  const ts = Date.now();
  const stored: StoredEvent = { type, slide, ts };
  if (seconds !== undefined) {
    stored.seconds = seconds;
  }
  if (cta) {
    stored.cta = cta;
  }

  const redis = client;
  await Promise.all([
    redis.sadd(TOKENS_SET, v),
    redis
      .lpush(eventsKey(v), JSON.stringify(stored))
      .then(() => redis.ltrim(eventsKey(v), 0, 999)),
    redis.hset(tokenKey(v), { lastSeen: ts }),
    type === "view"
      ? redis.hincrby(tokenKey(v), "views", 1)
      : type === "dwell"
        ? redis.hincrby(tokenKey(v), "dwellTotal", seconds ?? 0)
        : redis.hincrby(tokenKey(v), "ctas", 1),
  ]);
}

/**
 * Mint a new recipient token: an 8-char unguessable base62 id. Seeds its
 * hash with name/note/createdAt and registers it in the tokens set.
 */
export async function createToken({
  name,
  note,
}: {
  name?: string;
  note?: string;
}): Promise<{ token: string; id: string }> {
  if (!client) {
    throw new Error("redis_disabled");
  }
  const id = base62(8);
  await Promise.all([
    client.hset(tokenKey(id), {
      name: (name || "").slice(0, 200),
      note: (note || "").slice(0, 500),
      createdAt: Date.now(),
    }),
    client.sadd(TOKENS_SET, id),
  ]);
  return { token: id, id };
}

// ---- Reads -------------------------------------------------------------
export async function listTokens(): Promise<TokenRow[]> {
  if (!client) {
    return [];
  }
  const ids = await client.smembers(TOKENS_SET);
  const rows = await Promise.all(
    ids.map(async (id): Promise<TokenRow> => {
      const h =
        (await client.hgetall<Record<string, string | number>>(tokenKey(id))) ||
        {};
      return {
        id,
        name: str(h.name),
        note: str(h.note),
        createdAt: num(h.createdAt),
        lastSeen: num(h.lastSeen),
        views: num(h.views) ?? 0,
        ctas: num(h.ctas) ?? 0,
      };
    }),
  );
  rows.sort((a, b) => (b.lastSeen ?? 0) - (a.lastSeen ?? 0));
  return rows;
}

export async function getTokenMeta(v: string): Promise<TokenRow | null> {
  if (!client) {
    return null;
  }
  const h = await client.hgetall<Record<string, string | number>>(tokenKey(v));
  if (!h || Object.keys(h).length === 0) {
    return null;
  }
  return {
    id: v,
    name: str(h.name),
    note: str(h.note),
    createdAt: num(h.createdAt),
    lastSeen: num(h.lastSeen),
    views: num(h.views) ?? 0,
    ctas: num(h.ctas) ?? 0,
  };
}

export async function getTimeline(v: string): Promise<StoredEvent[]> {
  if (!client) {
    return [];
  }
  const raw = await client.lrange<string | StoredEvent>(eventsKey(v), 0, 199);
  const out: StoredEvent[] = [];
  for (const item of raw) {
    // Upstash may auto-deserialize JSON strings into objects; handle both.
    if (typeof item === "object" && item !== null) {
      out.push(item as StoredEvent);
      continue;
    }
    try {
      out.push(JSON.parse(item as string) as StoredEvent);
    } catch {
      // skip corrupt entry
    }
  }
  return out;
}

// ---- Helpers -----------------------------------------------------------
const B62 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function base62(len: number): string {
  const bytes = randomBytes(len);
  let out = "";
  for (let i = 0; i < len; i++) {
    out += B62[bytes[i] % 62];
  }
  return out;
}

function str(v: unknown): string {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

function num(v: unknown): number | null {
  if (v == null || v === "") {
    return null;
  }
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}
