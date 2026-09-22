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
 * Places API (New) first, legacy second — mirroring what the Conductor
 * server already does (apps/server/src/maps/maps.service.ts in
 * conductor-greenfield). Which of the two a key can call depends on what is
 * enabled on it, and projects created after early 2025 cannot enable the
 * legacy Places API at all, so trying both is what makes any given key work.
 * A failure of New puts it on a short cooldown rather than retrying it on
 * every keystroke.
 *
 * With no key configured this answers `{ ok: false, reason: "no_key" }` and
 * the calculator falls back to its built-in Lagos list. The page keeps
 * working; it just cannot find a street until the key is set.
 */

/**
 * GOOGLE_PLACES_API_KEY is the website's own key. GOOGLE_MAPS_SERVER_KEY is
 * the name the Conductor server uses, accepted so the existing server key
 * can be reused as-is. A dedicated key is still preferable: it keeps the
 * marketing site's quota and blast radius separate from the app's.
 */
const KEY = process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_SERVER_KEY;

const NEW_BASE = "https://places.googleapis.com/v1";
const LEGACY_BASE = "https://maps.googleapis.com/maps/api/place";

/** Nigeria. Everything is restricted to it — this is a Nigerian service. */
const COUNTRY = "NG";

/**
 * Bias toward Lagos so local results outrank distant namesakes.
 *
 * 50 km is not a preference: Places API (New) rejects a circle.radius above
 * 50 000 m outright ("Invalid circle.radius"), on locationBias as well as
 * locationRestriction. It is a soft bias, so somewhere further out still
 * resolves — it just is not promoted.
 */
const BIAS = { lat: 6.5244, lng: 3.3792, radiusM: 50_000 };

type Prediction = { id: string; name: string; area: string };
type Place = Prediction & { lat: number; lng: number };

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

/**
 * When Places API (New) fails, stop asking for a while. Without this every
 * keystroke pays the latency of a call that is going to fail before falling
 * back — on a key with only the legacy API enabled, that is every keystroke.
 */
const COOLDOWN_MS = 5 * 60_000;
let newApiCooldownUntil = 0;

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
    if (id) {
      const place = await details(id, token);
      if (!place) {
        return NextResponse.json({ ok: false, reason: "upstream" }, { headers: noStore });
      }
      return NextResponse.json({ ok: true, place }, { headers: noStore });
    }
    // Two characters is noise; three is where a prediction starts being useful.
    if (q.length < 3) {
      return NextResponse.json({ ok: true, places: [] }, { headers: noStore });
    }
    return NextResponse.json({ ok: true, places: await predict(q, token) }, { headers: noStore });
  } catch (err) {
    console.error("[places]", err instanceof Error ? err.message : err);
    // Degrade to the built-in list rather than showing the visitor a failure.
    return NextResponse.json({ ok: false, reason: "upstream" }, { headers: noStore });
  }
}

/* ------------------------------------------------------------------ */
/* Autocomplete                                                        */
/* ------------------------------------------------------------------ */

async function predict(q: string, token: string): Promise<Prediction[]> {
  const key = `p:${q.toLowerCase()}`;
  const hit = cacheGet(key) as Prediction[] | undefined;
  if (hit) return hit;

  let places: Prediction[] | null = null;

  if (Date.now() >= newApiCooldownUntil) {
    places = await predictViaNew(q, token);
    if (places === null) {
      newApiCooldownUntil = Date.now() + COOLDOWN_MS;
      console.warn(`[places] New API unavailable; using legacy for ${COOLDOWN_MS / 1000}s`);
    }
  }
  if (places === null) places = await predictViaLegacy(q, token);

  cacheSet(key, places);
  return places;
}

/** Places API (New). Null means the call failed, not that nothing matched. */
async function predictViaNew(q: string, token: string): Promise<Prediction[] | null> {
  const body: Record<string, unknown> = {
    input: q,
    includedRegionCodes: [COUNTRY],
    locationBias: {
      circle: {
        center: { latitude: BIAS.lat, longitude: BIAS.lng },
        radius: BIAS.radiusM,
      },
    },
  };
  if (token) body.sessionToken = token;

  const res = await fetch(`${NEW_BASE}/places:autocomplete`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "content-type": "application/json",
      "X-Goog-Api-Key": KEY as string,
      // Trimming the response drops it into a cheaper billing tier.
      "X-Goog-FieldMask":
        "suggestions.placePrediction.placeId,suggestions.placePrediction.structuredFormat,suggestions.placePrediction.text",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.warn(`[places] New autocomplete ${res.status}: ${(await res.text()).slice(0, 200)}`);
    return null;
  }

  const json = (await res.json()) as {
    suggestions?: Array<{
      placePrediction?: {
        placeId?: string;
        text?: { text?: string };
        structuredFormat?: { mainText?: { text?: string }; secondaryText?: { text?: string } };
      };
    }>;
  };

  const out: Prediction[] = [];
  for (const s of json.suggestions ?? []) {
    const p = s.placePrediction;
    if (!p?.placeId) continue;
    out.push({
      id: p.placeId,
      name: p.structuredFormat?.mainText?.text ?? p.text?.text ?? "",
      area: p.structuredFormat?.secondaryText?.text ?? "",
    });
    if (out.length === 7) break;
  }
  return out;
}

/** Legacy autocomplete, for keys that only have the old Places API enabled. */
async function predictViaLegacy(q: string, token: string): Promise<Prediction[]> {
  const u = new URL(`${LEGACY_BASE}/autocomplete/json`);
  u.searchParams.set("input", q);
  u.searchParams.set("components", `country:${COUNTRY.toLowerCase()}`);
  u.searchParams.set("location", `${BIAS.lat},${BIAS.lng}`);
  u.searchParams.set("radius", String(BIAS.radiusM));
  u.searchParams.set("language", "en");
  u.searchParams.set("key", KEY as string);
  if (token) u.searchParams.set("sessiontoken", token);

  const res = await fetch(u, { cache: "no-store" });
  const json = (await res.json()) as {
    status?: string;
    error_message?: string;
    predictions?: Array<{
      place_id: string;
      description?: string;
      structured_formatting?: { main_text?: string; secondary_text?: string };
    }>;
  };

  // ZERO_RESULTS is a normal answer, not a failure.
  if (json.status && json.status !== "OK" && json.status !== "ZERO_RESULTS") {
    throw new Error(`${json.status}: ${json.error_message ?? "places autocomplete"}`);
  }

  return (json.predictions ?? []).slice(0, 7).map((p) => ({
    id: p.place_id,
    name: p.structured_formatting?.main_text ?? p.description ?? "",
    area: p.structured_formatting?.secondary_text ?? "",
  }));
}

/* ------------------------------------------------------------------ */
/* Details — coordinates for the one result the visitor picked         */
/* ------------------------------------------------------------------ */

async function details(id: string, token: string): Promise<Place | null> {
  const key = `d:${id}`;
  const hit = cacheGet(key) as Place | undefined;
  if (hit) return hit;

  let place: Place | null = null;
  if (Date.now() >= newApiCooldownUntil) place = await detailsViaNew(id, token);
  if (!place) place = await detailsViaLegacy(id, token);

  if (place) cacheSet(key, place);
  return place;
}

async function detailsViaNew(id: string, token: string): Promise<Place | null> {
  const u = new URL(`${NEW_BASE}/places/${encodeURIComponent(id)}`);
  if (token) u.searchParams.set("sessionToken", token);

  const res = await fetch(u, {
    cache: "no-store",
    headers: {
      "X-Goog-Api-Key": KEY as string,
      "X-Goog-FieldMask": "id,displayName,formattedAddress,location",
    },
  });
  if (!res.ok) {
    console.warn(`[places] New details ${res.status}: ${(await res.text()).slice(0, 200)}`);
    return null;
  }

  const json = (await res.json()) as {
    displayName?: { text?: string };
    formattedAddress?: string;
    location?: { latitude?: number; longitude?: number };
  };
  const lat = json.location?.latitude;
  const lng = json.location?.longitude;
  if (typeof lat !== "number" || typeof lng !== "number") return null;

  return {
    id,
    name: json.displayName?.text ?? json.formattedAddress ?? "",
    area: json.formattedAddress ?? "",
    lat,
    lng,
  };
}

async function detailsViaLegacy(id: string, token: string): Promise<Place | null> {
  const u = new URL(`${LEGACY_BASE}/details/json`);
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
  if (!loc) return null;

  return {
    id,
    name: json.result?.name ?? "",
    area: json.result?.formatted_address ?? "",
    lat: loc.lat,
    lng: loc.lng,
  };
}
