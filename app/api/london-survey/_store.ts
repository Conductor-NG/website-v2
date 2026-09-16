import { Redis } from "@upstash/redis";

/**
 * London commuter-survey store — self-contained, removable as one unit.
 *
 * Same Upstash / Vercel-KV credentials as the deck tracker (either env
 * naming scheme). With no store configured, `saveResponse` returns false so
 * the API can fall back to email / webhook delivery instead of failing.
 */
const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const client: Redis | null = url && token ? new Redis({ url, token }) : null;

const LIST = "survey:london:responses";
const COUNT = "survey:london:count";

export const COMMUTE_MODES = [
  "OWN_OR_FAMILY_VEHICLE",
  "COLLEAGUE_OR_NEIGHBOUR",
  "COMPANY_STAFF_BUS",
  "PUBLIC_TRANSPORT",
  "RIDE_HAILING_TAXI",
  "WALK_OR_CYCLE",
  "OTHER",
] as const;
export type CommuteMode = (typeof COMMUTE_MODES)[number];

export const LEAVE_TIMES = ["BEFORE_0630", "0630_0730", "0730_0830", "0830_0930", "AFTER_0930", "VARIES"] as const;
export const WEEKLY_COSTS = ["UNDER_20", "20_40", "40_60", "60_100", "OVER_100", "NOT_SURE"] as const;
export const INTEREST = ["YES", "PROBABLY", "MAYBE", "PROBABLY_NOT", "NO"] as const;
export const DRIVE_INTEREST = ["YES", "MAYBE", "NO", "NO_CAR"] as const;

export type SurveyResponse = {
  id: string;
  submittedAt: string;
  homeArea: string;
  workArea: string;
  days: number[]; // ISO weekday numbers 1–7
  leaveTime: (typeof LEAVE_TIMES)[number];
  commuteModeMorning: CommuteMode;
  commuteModeReturn: CommuteMode;
  weeklyCost: (typeof WEEKLY_COSTS)[number];
  interest: (typeof INTEREST)[number];
  driveInterest: (typeof DRIVE_INTEREST)[number];
  comment: string;
  name: string;
  email: string;
  launchUpdates: boolean;
  consent: true;
  source: string;
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
