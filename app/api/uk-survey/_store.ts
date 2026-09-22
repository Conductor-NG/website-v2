import { Redis } from "@upstash/redis";

/**
 * UK market-validation survey store — self-contained, removable as one unit.
 *
 * Same Upstash / Vercel-KV credentials as the deck tracker and the London
 * survey (either env naming scheme). With no store configured `saveResponse`
 * returns false, so the API can fall back to email / webhook delivery rather
 * than failing the respondent.
 *
 * Two instruments share one store. `instrument` says which, and the fields
 * for the other side are simply absent — a survey with two routes is still
 * one dataset, and splitting the storage would mean reconciling two exports
 * every time someone asks how many people answered.
 */
const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const client: Redis | null = url && token ? new Redis({ url, token }) : null;

const LIST = "survey:uk:responses";
const COUNT = "survey:uk:count";

export const INSTRUMENTS = ["PASSENGER", "CAR_OWNER"] as const;
export type Instrument = (typeof INSTRUMENTS)[number];

// --- shared screeners -------------------------------------------------------

export const TRIP_FREQUENCY = [
  "FIVE_PLUS",
  "TWO_TO_FOUR",
  "ABOUT_ONCE",
  "LESS_THAN_ONCE",
  "NONE",
] as const;

export const TRAVEL_ROLE = ["PASSENGER", "DRIVER", "BOTH"] as const;

// --- passenger --------------------------------------------------------------

export const CURRENT_MODE = [
  "DRIVE_ALONE",
  "LIFT_INFORMAL",
  "BUS",
  "RAIL",
  "TAXI_APP",
  "WALK_CYCLE",
  "OTHER",
] as const;

export const JOURNEY_LENGTH = [
  "UNDER_15",
  "15_30",
  "30_45",
  "45_60",
  "OVER_60",
] as const;

/** Five-point satisfaction, positive first. */
export const SATISFACTION = [
  "VERY_SATISFIED",
  "SATISFIED",
  "NEITHER",
  "DISSATISFIED",
  "VERY_DISSATISFIED",
] as const;

export const SHARED_BEFORE = ["YES_NOW", "YES_PAST", "NEVER"] as const;

export const HEARD_OF = [
  "LIFTSHARE_FAXI",
  "BLABLACAR",
  "INFORMAL_GROUPS",
  "NONE",
  "OTHER",
] as const;

export const MET_NEEDS = ["YES_WELL", "PARTLY", "NOT_REALLY", "DIDNT_TRY"] as const;

/** What stops people sharing. NOTHING is exclusive — see the form. */
export const BARRIERS = [
  "SAFETY",
  "RELIABILITY",
  "TOO_RIGID",
  "NO_ONE_ON_ROUTE",
  "AWKWARDNESS",
  "COST_PAYMENT",
  "NOTHING",
  "OTHER",
] as const;

/** Five-point likelihood, positive first. Shared by several questions. */
export const LIKELIHOOD = [
  "DEFINITELY",
  "PROBABLY",
  "MIGHT",
  "PROBABLY_NOT",
  "DEFINITELY_NOT",
] as const;

export const APPEALS = [
  "LOWER_COST",
  "KNOW_DRIVER_AND_PRICE",
  "IDENTITY_VERIFIED",
  "CHOOSE_WHO",
  "PAYMENT_HELD",
  "ENVIRONMENT",
  "NOTHING",
  "OTHER",
] as const;

export const SCHEDULED_VS_ONDEMAND = [
  "MUCH_MORE",
  "SOMEWHAT_MORE",
  "NO_DIFFERENCE",
  "SOMEWHAT_LESS",
  "MUCH_LESS",
] as const;

/** Matrix rows for Q12 — each rated on TRUST_SCALE. */
export const TRUST_FACTORS = [
  "IDENTITY_VERIFIED",
  "RATINGS_VISIBLE",
  "APPROVE_WHO",
  "LIVE_SHARING_SOS",
] as const;
export type TrustFactor = (typeof TRUST_FACTORS)[number];

export const TRUST_SCALE = [
  "MUCH_MORE_WILLING",
  "MORE_WILLING",
  "NO_DIFFERENCE",
  "LESS_WILLING",
  "MUCH_LESS_WILLING",
] as const;

export const COMFORT = [
  "VERY_COMFORTABLE",
  "COMFORTABLE",
  "NEITHER",
  "UNCOMFORTABLE",
  "VERY_UNCOMFORTABLE",
] as const;

export const USE_DAYS = ["FIVE_PLUS", "THREE_FOUR", "ONE_TWO", "OCCASIONAL", "WOULD_NOT"] as const;

export const USE_CASES = [
  "COMMUTING",
  "SCHOOL_RUN",
  "INTERCITY",
  "EVENTS",
  "AIRPORT",
  "NOWHERE",
  "OTHER",
] as const;

// --- car owner --------------------------------------------------------------

export const SPARE_SEATS = ["THREE_PLUS", "TWO", "ONE", "NONE"] as const;

export const GAVE_LIFTS = ["YES_NOW", "YES_PAST", "NO"] as const;

export const DRIVER_COMFORT_FACTORS = [
  "PAX_VERIFIED",
  "I_APPROVE_EACH",
  "RATINGS_VISIBLE",
  "PAYMENT_HELD",
  "INSURANCE_CLARITY",
  "LIVE_SHARING_SOS",
  "NOTHING",
  "OTHER",
] as const;

export const DRIVER_BARRIERS = [
  "SAFETY_STRANGERS",
  "INSURANCE_LEGAL",
  "HASSLE_NOT_WORTH_IT",
  "DETOURS_DELAYS",
  "RESPONSIBILITY",
  "NOTHING",
  "OTHER",
] as const;

export const DRIVE_MORE = ["YES_MORE", "NO_CHANGE", "NOT_SURE"] as const;

// --- demographics -----------------------------------------------------------

export const AGE_BANDS = [
  "UNDER_25",
  "25_34",
  "35_44",
  "45_54",
  "55_64",
  "65_PLUS",
  "PREFER_NOT",
] as const;

export const GENDERS = ["FEMALE", "MALE", "OTHER", "PREFER_NOT"] as const;

export const YES_NO = ["YES", "NO"] as const;

/**
 * One row per completed response.
 *
 * Everything after `role` is optional because the two instruments fill
 * different halves, and because every non-screening question is deliberately
 * optional — a forced field is a drop-off, and a blank answer is still data.
 */
export type SurveyResponse = {
  id: string;
  submittedAt: string;
  instrument: Instrument;
  source: string;
  consent: true;

  // screening (both)
  tripFrequency: (typeof TRIP_FREQUENCY)[number];
  role: (typeof TRAVEL_ROLE)[number];

  // passenger
  currentMode?: (typeof CURRENT_MODE)[number];
  currentModeOther?: string;
  journeyLength?: (typeof JOURNEY_LENGTH)[number];
  weeklySpendGbp?: number | null;
  satisfaction?: (typeof SATISFACTION)[number];
  sharedBefore?: (typeof SHARED_BEFORE)[number];
  heardOf?: string[];
  heardOfOther?: string;
  metNeeds?: (typeof MET_NEEDS)[number];
  metNeedsWhy?: string;
  barriers?: string[];
  barriersOther?: string;
  useLikelihood?: (typeof LIKELIHOOD)[number];
  appeals?: string[];
  appealsOther?: string;
  scheduledVsOnDemand?: (typeof SCHEDULED_VS_ONDEMAND)[number];
  /** Q12 matrix: one TRUST_SCALE value per TRUST_FACTORS row. */
  trust?: Partial<Record<TrustFactor, (typeof TRUST_SCALE)[number]>>;
  comfortIfVerified?: (typeof COMFORT)[number];
  /** Van Westendorp, in whole pounds per week. Any may be null. */
  vwTooCheap?: number | null;
  vwBargain?: number | null;
  vwGettingExpensive?: number | null;
  vwTooExpensive?: number | null;
  useDays?: (typeof USE_DAYS)[number];
  useCases?: string[];
  useCasesOther?: string;
  recommend?: (typeof LIKELIHOOD)[number];
  hasCarAccess?: (typeof YES_NO)[number];

  // car owner
  spareSeats?: (typeof SPARE_SEATS)[number];
  route?: string;
  weeklyRunningCostGbp?: number | null;
  gaveLifts?: (typeof GAVE_LIFTS)[number];
  publishLikelihood?: (typeof LIKELIHOOD)[number];
  comfortFactors?: string[];
  comfortFactorsOther?: string;
  driverBarriers?: string[];
  driverBarriersOther?: string;
  worthwhileWeeklyGbp?: number | null;
  driveMore?: (typeof DRIVE_MORE)[number];
  driverUseCases?: string[];
  driverRecommend?: (typeof LIKELIHOOD)[number];

  // demographics + pilot (both, all optional)
  ageBand?: (typeof AGE_BANDS)[number];
  gender?: (typeof GENDERS)[number];
  postcodeDistrict?: string;
  pilotOptIn: boolean;
  email?: string;
};

export function storeEnabled(): boolean {
  return client !== null;
}

export async function saveResponse(r: SurveyResponse): Promise<boolean> {
  if (!client) return false;
  await client.rpush(LIST, JSON.stringify(r));
  await client.incr(COUNT);
  return true;
}

export async function listResponses(): Promise<SurveyResponse[]> {
  if (!client) return [];
  const rows = await client.lrange<string | SurveyResponse>(LIST, 0, -1);
  return rows.map((row) => (typeof row === "string" ? (JSON.parse(row) as SurveyResponse) : row));
}

export async function responseCount(): Promise<number> {
  if (!client) return 0;
  return (await client.get<number>(COUNT)) ?? 0;
}
