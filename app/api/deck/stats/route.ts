import { NextResponse } from "next/server";
import {
  getTimeline,
  getTokenMeta,
  redisEnabled,
} from "@/app/deck/_track/store";

export const runtime = "nodejs";

/**
 * Gated timeline endpoint. `?token=<id>` → the recipient's meta + their
 * (newest-first) event timeline. Same auth rule as /api/deck/tokens.
 */
export async function GET(req: Request) {
  const password = process.env.DECK_STATS_PASSWORD;
  if (!password || !redisEnabled()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  if (req.headers.get("x-deck-key") !== password) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const token = new URL(req.url).searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "missing_token" }, { status: 400 });
  }

  const [meta, timeline] = await Promise.all([
    getTokenMeta(token),
    getTimeline(token),
  ]);
  return NextResponse.json({ token, meta, timeline });
}
