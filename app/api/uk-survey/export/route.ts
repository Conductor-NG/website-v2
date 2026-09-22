import { NextResponse } from "next/server";
import { listResponses, responseCount, storeEnabled, TRUST_FACTORS } from "../_store";

export const runtime = "nodejs";

/**
 * Gated CSV export of the UK validation survey. Same gate as the London one:
 * send the key in `x-survey-key` (or `?key=`). Key = SURVEY_EXPORT_KEY,
 * falling back to DECK_STATS_PASSWORD so the existing team secret works.
 *
 *   curl -H "x-survey-key: …" https://conductor.ng/api/uk-survey/export > uk.csv
 *
 * `?instrument=PASSENGER` or `CAR_OWNER` narrows it, because the two sides
 * are analysed separately even though they share a store. The Q12 matrix is
 * flattened to one column per factor so it opens straight into a pivot table
 * rather than needing a JSON step first.
 */
export async function GET(req: Request) {
  const password = process.env.SURVEY_EXPORT_KEY || process.env.DECK_STATS_PASSWORD;
  if (!password || !storeEnabled()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  const url = new URL(req.url);
  const key = req.headers.get("x-survey-key") || url.searchParams.get("key");
  if (key !== password) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const want = url.searchParams.get("instrument");
  const all = await listResponses();
  const rows = want ? all.filter((r) => r.instrument === want) : all;

  if (url.searchParams.get("format") === "json") {
    return NextResponse.json({ count: await responseCount(), returned: rows.length, rows });
  }

  const cols = [
    "id",
    "submittedAt",
    "instrument",
    "source",
    "tripFrequency",
    "carAccess",
    "drivesForJourney",
    // context
    "industry",
    "industryOther",
    "workPattern",
    "areaType",
    "ptWeekday",
    "ptWeekend",
    // passenger
    "currentModes",
    "currentModeOther",
    "journeyLength",
    "weeklySpendGbp",
    "satisfaction",
    "sharedBefore",
    "heardOf",
    "heardOfOther",
    "metNeeds",
    "metNeedsWhy",
    "barriers",
    "barriersOther",
    "useLikelihood",
    "appeals",
    "appealsOther",
    "scheduledVsOnDemand",
    "comfortIfVerified",
    "vwTooCheap",
    "vwBargain",
    "vwGettingExpensive",
    "vwTooExpensive",
    "useDays",
    "useCases",
    "useCasesOther",
    "recommend",
    // car owner
    "spareSeats",
    "route",
    "weeklyRunningCostGbp",
    "gaveLifts",
    "publishLikelihood",
    "comfortFactors",
    "comfortFactorsOther",
    "driverBarriers",
    "driverBarriersOther",
    "worthwhileWeeklyGbp",
    "driveMore",
    "driverUseCases",
    "driverRecommend",
    // demographics + pilot
    "ageBand",
    "gender",
    "postcodeDistrict",
    "pilotOptIn",
    "email",
  ] as const;

  const trustCols = TRUST_FACTORS.map((f) => `trust_${f}`);

  const esc = (v: unknown) => {
    const s = Array.isArray(v) ? v.join(" ") : v === null || v === undefined ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const header = [...cols, ...trustCols].join(",");
  const body = rows.map((r) =>
    [
      ...cols.map((c) => esc(r[c as keyof typeof r])),
      ...TRUST_FACTORS.map((f) => esc(r.trust?.[f])),
    ].join(","),
  );

  const csv = [header, ...body].join("\n");
  const name = want ? `uk-survey-${want.toLowerCase()}` : "uk-survey";
  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="${name}-${new Date().toISOString().slice(0, 10)}.csv"`,
      "cache-control": "no-store",
    },
  });
}
