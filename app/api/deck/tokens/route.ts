import { NextResponse } from "next/server";
import { createToken, listTokens, redisEnabled } from "@/app/deck/_track/store";

export const runtime = "nodejs";

/**
 * Gated admin endpoint for recipient links.
 *   GET  → list all recipients + the origin (for building links client-side).
 *   POST → mint a new recipient token from {name, note}.
 *
 * Auth model: requires header `x-deck-key` === DECK_STATS_PASSWORD.
 *   - env unset OR redis disabled → 503 not_configured (drives the setup notice)
 *   - wrong / missing key         → 401
 */

type Gate =
  | { ok: true }
  | { ok: false; res: NextResponse };

function gate(req: Request): Gate {
  const password = process.env.DECK_STATS_PASSWORD;
  if (!password || !redisEnabled()) {
    return {
      ok: false,
      res: NextResponse.json({ error: "not_configured" }, { status: 503 }),
    };
  }
  if (req.headers.get("x-deck-key") !== password) {
    return {
      ok: false,
      res: NextResponse.json({ error: "unauthorized" }, { status: 401 }),
    };
  }
  return { ok: true };
}

function originOf(req: Request): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env) {
    return env.replace(/\/$/, "");
  }
  return new URL(req.url).origin;
}

export async function GET(req: Request) {
  const g = gate(req);
  if (!g.ok) {
    return g.res;
  }
  const tokens = await listTokens();
  return NextResponse.json({ tokens, origin: originOf(req) });
}

export async function POST(req: Request) {
  const g = gate(req);
  if (!g.ok) {
    return g.res;
  }
  let body: { name?: string; note?: string };
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  const { token, id } = await createToken({
    name: (body?.name || "").trim(),
    note: (body?.note || "").trim(),
  });
  const url = `${originOf(req)}/deck?v=${id}`;
  return NextResponse.json({ token, id, url });
}
