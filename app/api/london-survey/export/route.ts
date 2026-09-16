import { NextResponse } from "next/server";
import { listResponses, responseCount, storeEnabled } from "../_store";

export const runtime = "nodejs";

/**
 * Gated CSV export of the London survey. Same shape as the deck stats gate:
 * send the key in `x-survey-key` (or `?key=`). Key = SURVEY_EXPORT_KEY,
 * falling back to DECK_STATS_PASSWORD so the existing team secret works.
 *   curl -H "x-survey-key: …" https://conductor.ng/api/london-survey/export > london.csv
 */
export async function GET(req: Request) {
  const password = process.env.SURVEY_EXPORT_KEY || process.env.DECK_STATS_PASSWORD;
  if (!password || !storeEnabled()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  const url = new URL(req.url);
  const key = req.headers.get("x-survey-key") || url.searchParams.get("key");
  if (key !== password) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const rows = await listResponses();
  if (url.searchParams.get("format") === "json") {
    return NextResponse.json({ count: await responseCount(), rows });
  }
  const cols = [
    "id", "submittedAt", "homeArea", "workArea", "days", "leaveTime", "commuteModeMorning", "commuteModeReturn",
    "weeklyCost", "interest", "driveInterest", "comment", "name", "email", "launchUpdates", "source",
  ] as const;
  const esc = (v: unknown) => {
    const s = Array.isArray(v) ? v.join(" ") : v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="london-survey-${new Date().toISOString().slice(0, 10)}.csv"`,
      "cache-control": "no-store",
    },
  });
}
