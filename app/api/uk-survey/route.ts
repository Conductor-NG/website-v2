import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  AGE_BANDS,
  APPEALS,
  AREA_TYPE,
  BARRIERS,
  CAR_ACCESS,
  COMFORT,
  CURRENT_MODE,
  DRIVES_FOR_JOURNEY,
  DRIVE_MORE,
  DRIVER_BARRIERS,
  DRIVER_COMFORT_FACTORS,
  GAVE_LIFTS,
  GENDERS,
  HEARD_OF,
  INDUSTRY,
  INSTRUMENTS,
  JOURNEY_LENGTH,
  LIKELIHOOD,
  MET_NEEDS,
  PT_WEEKDAY,
  PT_WEEKEND,
  SATISFACTION,
  saveResponse,
  SCHEDULED_VS_ONDEMAND,
  SHARED_BEFORE,
  SPARE_SEATS,
  storeEnabled,
  type SurveyResponse,
  TRIP_FREQUENCY,
  TRUST_FACTORS,
  TRUST_SCALE,
  type TrustFactor,
  USE_CASES,
  USE_DAYS,
  WORK_PATTERN,
} from "./_store";

export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const TO = process.env.SURVEY_TO_EMAIL || process.env.CONTACT_TO_EMAIL || "support@conductor.ng";
const FROM = process.env.CONTACT_FROM_EMAIL || "Conductor site <noreply@conductor.ng>";

/** Nobody's weekly travel costs four figures. Anything above is a typo or a joke. */
const MAX_GBP = 2000;

function bad(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

function oneOf<T extends readonly string[]>(list: T, v: unknown): T[number] | undefined {
  return typeof v === "string" && (list as readonly string[]).includes(v)
    ? (v as T[number])
    : undefined;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Codes that mean "and nothing else". Anything alongside one is a contradiction. */
const EXCLUSIVE = new Set(["NONE", "NOTHING", "NOWHERE"]);

/**
 * Many-of, filtered to the allowed set, de-duplicated and capped.
 *
 * The exclusivity rule is enforced here as well as in the form, because the
 * form is a convenience and this is the record. "Nothing puts me off, except
 * safety" is not an answer anyone can analyse, and a stored row that says it
 * will quietly skew a count long after the session that produced it is gone.
 */
function manyOf<T extends readonly string[]>(list: T, v: unknown, max: number): string[] {
  if (!Array.isArray(v)) return [];
  const allowed = new Set(list as readonly string[]);
  const picked = [
    ...new Set(v.filter((x): x is string => typeof x === "string" && allowed.has(x))),
  ];
  const exclusive = picked.find((x) => EXCLUSIVE.has(x));
  if (exclusive) return [exclusive];
  return picked.slice(0, max);
}

/**
 * A money answer in whole pounds, or null.
 *
 * Null and zero are different answers here: a blank box means "didn't say",
 * which Van Westendorp treats as missing, while £0 is a real if unlikely
 * response. Returning undefined for junk keeps both meanings intact.
 */
function money(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : Number(String(v).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(n) || n < 0 || n > MAX_GBP) return null;
  return Math.round(n);
}

/**
 * POST /api/uk-survey — the UK market-validation survey.
 *
 * Delivery, in order of preference: the Upstash store the CSV export reads,
 * then a notification email via Resend, then the generic CONTACT_WEBHOOK_URL.
 * Any one channel succeeding counts as saved; this only fails the respondent
 * when nothing at all is configured.
 *
 * Validation is deliberately lopsided. The screeners and consent are
 * required, because without them the row cannot be interpreted or lawfully
 * kept. Everything else is optional and silently dropped if it does not match
 * the expected set: a half-finished answer is still evidence, and rejecting a
 * whole submission over one stray field loses the lot.
 */
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return bad("Bad request.");
  }
  // Honeypot — bots fill this hidden field; drop them silently.
  if (data.company) return NextResponse.json({ ok: true });

  if (data.consent !== true) {
    return bad("Please confirm the consent statement before sending your answers.");
  }
  const instrument = oneOf(INSTRUMENTS, data.instrument);
  if (!instrument) return bad("We couldn't tell which survey this was.");
  const tripFrequency = oneOf(TRIP_FREQUENCY, data.tripFrequency);
  if (!tripFrequency) return bad("Tell us how often you make that journey.");
  const carAccess = oneOf(CAR_ACCESS, data.carAccess);
  if (!carAccess) return bad("Tell us whether you have a car you can drive.");

  const email = str(data.email, 254);
  const pilotOptIn = data.pilotOptIn === true;
  if (email && !EMAIL_RE.test(email)) return bad("That email address doesn't look right.");
  if (pilotOptIn && !email) {
    return bad("Add an email address so we can tell you when your route opens.");
  }

  // Q12 matrix — one scale value per factor, unknown keys ignored.
  const trust: Partial<Record<TrustFactor, (typeof TRUST_SCALE)[number]>> = {};
  const rawTrust = data.trust;
  if (rawTrust && typeof rawTrust === "object") {
    for (const factor of TRUST_FACTORS) {
      const picked = oneOf(TRUST_SCALE, (rawTrust as Record<string, unknown>)[factor]);
      if (picked) trust[factor] = picked;
    }
  }

  const r: SurveyResponse = {
    id: randomBytes(8).toString("hex"),
    submittedAt: new Date().toISOString(),
    instrument,
    source: str(data.source, 80) || "uk-survey",
    consent: true,
    tripFrequency,
    carAccess,
    drivesForJourney: oneOf(DRIVES_FOR_JOURNEY, data.drivesForJourney),

    industry: oneOf(INDUSTRY, data.industry),
    industryOther: str(data.industryOther, 120),
    workPattern: oneOf(WORK_PATTERN, data.workPattern),
    areaType: oneOf(AREA_TYPE, data.areaType),
    ptWeekday: oneOf(PT_WEEKDAY, data.ptWeekday),
    ptWeekend: oneOf(PT_WEEKEND, data.ptWeekend),

    currentModes: manyOf(CURRENT_MODE, data.currentModes, CURRENT_MODE.length),
    currentModeOther: str(data.currentModeOther, 120),
    journeyLength: oneOf(JOURNEY_LENGTH, data.journeyLength),
    weeklySpendGbp: money(data.weeklySpendGbp),
    satisfaction: oneOf(SATISFACTION, data.satisfaction),
    sharedBefore: oneOf(SHARED_BEFORE, data.sharedBefore),
    heardOf: manyOf(HEARD_OF, data.heardOf, HEARD_OF.length),
    heardOfOther: str(data.heardOfOther, 120),
    metNeeds: oneOf(MET_NEEDS, data.metNeeds),
    metNeedsWhy: str(data.metNeedsWhy, 1000),
    barriers: manyOf(BARRIERS, data.barriers, 3),
    barriersOther: str(data.barriersOther, 120),
    useLikelihood: oneOf(LIKELIHOOD, data.useLikelihood),
    appeals: manyOf(APPEALS, data.appeals, 2),
    appealsOther: str(data.appealsOther, 120),
    scheduledVsOnDemand: oneOf(SCHEDULED_VS_ONDEMAND, data.scheduledVsOnDemand),
    trust: Object.keys(trust).length > 0 ? trust : undefined,
    comfortIfVerified: oneOf(COMFORT, data.comfortIfVerified),
    vwTooCheap: money(data.vwTooCheap),
    vwBargain: money(data.vwBargain),
    vwGettingExpensive: money(data.vwGettingExpensive),
    vwTooExpensive: money(data.vwTooExpensive),
    useDays: oneOf(USE_DAYS, data.useDays),
    useCases: manyOf(USE_CASES, data.useCases, USE_CASES.length),
    useCasesOther: str(data.useCasesOther, 120),
    recommend: oneOf(LIKELIHOOD, data.recommend),

    spareSeats: oneOf(SPARE_SEATS, data.spareSeats),
    route: str(data.route, 120),
    weeklyRunningCostGbp: money(data.weeklyRunningCostGbp),
    gaveLifts: oneOf(GAVE_LIFTS, data.gaveLifts),
    publishLikelihood: oneOf(LIKELIHOOD, data.publishLikelihood),
    comfortFactors: manyOf(DRIVER_COMFORT_FACTORS, data.comfortFactors, 3),
    comfortFactorsOther: str(data.comfortFactorsOther, 120),
    driverBarriers: manyOf(DRIVER_BARRIERS, data.driverBarriers, DRIVER_BARRIERS.length),
    driverBarriersOther: str(data.driverBarriersOther, 120),
    worthwhileWeeklyGbp: money(data.worthwhileWeeklyGbp),
    driveMore: oneOf(DRIVE_MORE, data.driveMore),
    driverUseCases: manyOf(USE_CASES, data.driverUseCases, USE_CASES.length),
    driverRecommend: oneOf(LIKELIHOOD, data.driverRecommend),

    ageBand: oneOf(AGE_BANDS, data.ageBand),
    gender: oneOf(GENDERS, data.gender),
    postcodeDistrict: str(data.postcodeDistrict, 8).toUpperCase(),
    pilotOptIn,
    email,
  };

  const resendKey = process.env.RESEND_API_KEY;
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!storeEnabled() && !resendKey && !webhookUrl) {
    return bad("The survey isn't wired up yet — please try again later.", 503);
  }

  const attempts: Promise<unknown>[] = [];
  if (storeEnabled()) attempts.push(saveResponse(r));
  if (resendKey) attempts.push(notify(resendKey, r));
  if (resendKey && pilotOptIn && email && process.env.RESEND_AUDIENCE_ID) {
    attempts.push(
      new Resend(resendKey).contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
        unsubscribed: false,
      }),
    );
  }
  if (webhookUrl) {
    attempts.push(
      fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: "uk-survey", ...r }),
      }).then((res) => {
        if (!res.ok) throw new Error(`webhook ${res.status}`);
      }),
    );
  }

  const results = await Promise.allSettled(attempts);
  if (!results.some((x) => x.status === "fulfilled")) {
    console.error("[uk-survey] all channels failed", results);
    return bad("We couldn't save your answers just now — please try again.", 502);
  }
  return NextResponse.json({ ok: true });
}

/** A short human summary. The CSV export is the analysis surface, not this. */
async function notify(key: string, r: SurveyResponse) {
  const pax = r.instrument === "PASSENGER";
  const lines = pax
    ? [
        `Travels by: ${(r.currentModes ?? []).join(", ") || "—"} · ${r.journeyLength ?? "—"}`,
        `Spends: £${r.weeklySpendGbp ?? "—"}/week · satisfaction ${r.satisfaction ?? "—"}`,
        `Would use: ${r.useLikelihood ?? "—"} · ${r.useDays ?? "—"} days`,
        `Scheduled vs on-demand: ${r.scheduledVsOnDemand ?? "—"}`,
        `Barriers: ${(r.barriers ?? []).join(", ") || "—"}`,
        `Price (cheap/good/pricey/too much): £${r.vwTooCheap ?? "—"} / £${r.vwBargain ?? "—"} / £${r.vwGettingExpensive ?? "—"} / £${r.vwTooExpensive ?? "—"}`,
      ]
    : [
        `Route: ${r.route || "—"} · spare seats ${r.spareSeats ?? "—"}`,
        `Running cost: £${r.weeklyRunningCostGbp ?? "—"}/week`,
        `Would publish: ${r.publishLikelihood ?? "—"}`,
        `Wants: ${(r.comfortFactors ?? []).join(", ") || "—"}`,
        `Put off by: ${(r.driverBarriers ?? []).join(", ") || "—"}`,
        `Worthwhile at: £${r.worthwhileWeeklyGbp ?? "—"}/week`,
      ];
  const body = [
    `Instrument: ${r.instrument}`,
    `Frequency: ${r.tripFrequency} · car ${r.carAccess}`,
    `Area: ${r.areaType ?? "—"} · transport ${r.ptWeekday ?? "—"} weekdays, ${r.ptWeekend ?? "—"} weekends`,
    `Industry: ${r.industry ?? "—"} · pattern ${r.workPattern ?? "—"}`,
    "",
    ...lines,
    "",
    `Postcode: ${r.postcodeDistrict || "—"} · age ${r.ageBand ?? "—"} · gender ${r.gender ?? "—"}`,
    `Email: ${r.email || "—"}${r.pilotOptIn ? " (wants pilot access)" : ""}`,
    "",
    `id ${r.id} · ${r.submittedAt}`,
  ];
  const result = await new Resend(key).emails.send({
    from: FROM,
    to: TO,
    replyTo: r.email || undefined,
    subject: `[UK survey] ${pax ? "Passenger" : "Car owner"} · ${r.postcodeDistrict || "no postcode"} · ${(pax ? r.useLikelihood : r.publishLikelihood) ?? "—"}`,
    text: body.join("\n"),
  });
  if (result.error) throw new Error(result.error.message);
}
