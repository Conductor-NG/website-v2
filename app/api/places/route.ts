import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Place search for the fare calculator — anywhere in Nigeria.
 *
 * The calculator used to search a hand-written list of Lagos areas, so
 * anyone who typed their street got nothing back. This proxies Google
 * Places so a real address resolves.
 *
 * It is a server route, not a browser key, on purpose. A key shipped to the
 * page is public: anyone can lift it out of the HTML and spend your quota,
 * and HTTP referrer restrictions are a speed bump rather than a lock. Here
 * the key never leaves the server, it can be IP-restricted, and repeated
 * queries are answered from cache instead of being billed again.
 *
 * Two calls, deliberately:
 *   ?q=      autocomplete predictions, one per keystroke burst
 *   ?id=     details for the one the user actually picked, which is the
 *            only place coordinates are needed
 *
 * Both carry the same `token`, a session token, so Google bills the whole
 * interaction as one autocomplete session rather than per keystroke.
 *
 * With no key configured this answers `{ ok: false, reason: "no_key" }` and
 * the calculator falls back to its built-in Lagos list. The page keeps
 * working; it just cannot find a street until the key is set.
 */

const KEY = process.env.GOOGLE_PLACES_API_KEY;
const BASE = "https://maps.googleapis.com/maps/api/place";

/** Nigeria. Everything is restricted to it — this is a Nigerian service. */
const COUNTRY = "ng";

/** Bias toward Lagos so local results outrank distant namesakes. */
const BIAS = { lat: 6.5244, lng: 3.3792, radiusM: 120_000 };

type Prediction = { id: string; name: string; area: string };

/**
 * Small in-process cache.
 *
 * The same few dozen queries — "ikeja", "lekki", "ikotun" — will be typed
 * thousands of times, and each one is billable. This is per-instance and
 * evaporates on deploy, which is fine: it exists to blunt repetition inside
 * a busy hour, not to be a database.
 */
const TTL_MS = 10 * 60_000;
const MAX_ENTRIES = 500;
const cache = new Map<string, { at: number; value: unknown }>();

function cacheGet(key: string): unknown | undefined {
  const hit = cache.get(key);
  if (!hit) return undefined;
  if (Date.now() - hit.at > TTL_MS) {
    cache.delete(key);
    return undefined;
  }
  return hit.value;
}

function cacheSet(key: string, value: unknown) {
  if (cache.size >= MAX_ENTRIES) {
    // Oldest insertion first — Map preserves insertion order.
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
  cache.set(key, { at: Date.now(), value });
}

const noStore = { "cache-control": "no-store" } as const;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") || "").trim().slice(0, 120);
  const id = (url.searchParams.get("id") || "").trim().slice(0, 300);
  const token = (url.searchParams.get("token") || "").trim().slice(0, 60);

  if (!KEY) {
    // Not an error the visitor should see — the client falls back quietly.
    return NextResponse.json({ ok: false, reason: "no_key" }, { headers: noStore });
  }

  try {
    if (id) return NextResponse.json(await details(id, token), { headers: noStore });
    // Two characters is noise; three is where a prediction starts being useful.
    if (q.length < 3) {
      return NextResponse.json({ ok: true, places: [] }, { headers: noStore });
    }
    return NextResponse.json(await predict(q, token), { headers: noStore });
  } catch (err) {
    console.error("[places]", err instanceof Error ? err.message : err);
    // Degrade to the built-in list rather than showing the visitor a failure.
    return NextResponse.json({ ok: false, reason: "upstream" }, { headers: noStore });
  }
}

async function predict(q: string, token: string) {
  const key = `p:${q.toLowerCase()}`;
  const hit = cacheGet(key);
  if (hit) return hit;

  const u = new URL(`${BASE}/autocomplete/json`);
  u.searchParams.set("input", q);
  u.searchParams.set("components", `country:${COUNTRY}`);
  u.searchParams.set("location", `${BIAS.lat},${BIAS.lng}`);
  u.searchParams.set("radius", String(BIAS.radiusM));
  u.searchParams.set("language", "en");
  u.searchParams.set("key", KEY as string);
  if (token) u.searchParams.set("sessiontoken", token);

  const res = await fetch(u, { cache: "no-store" });
  const json = (await res.json()) as {
    status?: string;
    predictions?: Array<{
      place_id: string;
      structured_formatting?: { main_text?: string; secondary_text?: string };
      description?: string;
    }>;
    error_message?: string;
  };

  // ZERO_RESULTS is a normal answer, not a failure.
  if (json.status && json.status !== "OK" && json.status !== "ZERO_RESULTS") {
    throw new Error(`${json.status}: ${json.error_message ?? "places autocomplete"}`);
  }

  const places: Prediction[] = (json.predictions ?? []).slice(0, 7).map((p) => ({
    id: p.place_id,
    name: p.structured_formatting?.main_text ?? p.description ?? "",
    area: p.structured_formatting?.secondary_text ?? "",
  }));

  const value = { ok: true, places };
  cacheSet(key, value);
  return value;
}

async function details(id: string, token: string) {
  const key = `d:${id}`;
  const hit = cacheGet(key);
  if (hit) return hit;

  const u = new URL(`${BASE}/details/json`);
  u.searchParams.set("place_id", id);
  // Only what the calculator needs. Every extra field is a wider billing tier.
  u.searchParams.set("fields", "geometry/location,name,formatted_address");
  u.searchParams.set("language", "en");
  u.searchParams.set("key", KEY as string);
  if (token) u.searchParams.set("sessiontoken", token);

  const res = await fetch(u, { cache: "no-store" });
  const json = (await res.json()) as {
    status?: string;
    error_message?: string;
    result?: {
      name?: string;
      formatted_address?: string;
      geometry?: { location?: { lat: number; lng: number } };
    };
  };

  if (json.status !== "OK") {
    throw new Error(`${json.status}: ${json.error_message ?? "places details"}`);
  }
  const loc = json.result?.geometry?.location;
  if (!loc) throw new Error("no geometry on place");

  const value = {
    ok: true,
    place: {
      id,
      name: json.result?.name ?? "",
      area: json.result?.formatted_address ?? "",
      lat: loc.lat,
      lng: loc.lng,
    },
  };
  cacheSet(key, value);
  return value;
}
