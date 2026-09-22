/**
 * Every option a respondent sees, paired with the code the store keeps.
 *
 * Separate from the flow so the wording can be read and argued about on its
 * own. The codes must match `app/api/uk-survey/_store.ts` exactly — anything
 * that does not match is dropped server-side rather than saved wrong, so a
 * typo here is silent data loss.
 *
 * Wording rule throughout: describe, never sell. A market-validation survey
 * that leans on the respondent produces evidence nobody will believe,
 * including the person who commissioned it.
 */

export type Opt = [code: string, label: string];

// --- screening --------------------------------------------------------------

export const TRIP_FREQUENCY: Opt[] = [
  ["FIVE_PLUS", "5 or more times a week"],
  ["TWO_TO_FOUR", "2 to 4 times a week"],
  ["ABOUT_ONCE", "About once a week"],
  ["LESS_THAN_ONCE", "Less than once a week"],
  ["NONE", "I don't make regular journeys"],
];

export const TRAVEL_ROLE: Opt[] = [
  ["PASSENGER", "I mostly travel as a passenger, or don't drive for these trips"],
  ["DRIVER", "I drive myself for these trips and often have spare seats"],
  ["BOTH", "Both, depending on the day"],
];

// --- passenger: how you travel now -----------------------------------------

export const CURRENT_MODE: Opt[] = [
  ["DRIVE_ALONE", "Drive alone"],
  ["LIFT_INFORMAL", "Get a lift, or share informally"],
  ["BUS", "Bus"],
  ["RAIL", "Train, tram or underground"],
  ["TAXI_APP", "Taxi, or an app like Uber"],
  ["WALK_CYCLE", "Walk or cycle"],
  ["OTHER", "Something else"],
];

export const JOURNEY_LENGTH: Opt[] = [
  ["UNDER_15", "Under 15 minutes"],
  ["15_30", "15 to 30 minutes"],
  ["30_45", "30 to 45 minutes"],
  ["45_60", "45 to 60 minutes"],
  ["OVER_60", "Over an hour"],
];

export const SATISFACTION: Opt[] = [
  ["VERY_SATISFIED", "Very satisfied"],
  ["SATISFIED", "Satisfied"],
  ["NEITHER", "Neither satisfied nor dissatisfied"],
  ["DISSATISFIED", "Dissatisfied"],
  ["VERY_DISSATISFIED", "Very dissatisfied"],
];

export const SHARED_BEFORE: Opt[] = [
  ["YES_NOW", "Yes, I do now"],
  ["YES_PAST", "Yes, in the past"],
  ["NEVER", "No, never"],
];

// --- passenger: existing options and barriers -------------------------------

export const HEARD_OF: Opt[] = [
  ["LIFTSHARE_FAXI", "Liftshare, Faxi or a similar car-share scheme"],
  ["BLABLACAR", "BlaBlaCar"],
  ["INFORMAL_GROUPS", "An informal WhatsApp or workplace lift group"],
  ["NONE", "None of these"],
  ["OTHER", "Something else"],
];

export const MET_NEEDS: Opt[] = [
  ["YES_WELL", "Yes, it worked well"],
  ["PARTLY", "Partly"],
  ["NOT_REALLY", "No, not really"],
  ["DIDNT_TRY", "I didn't try it properly"],
];

export const BARRIERS: Opt[] = [
  ["SAFETY", "Safety — not knowing who I'm travelling with"],
  ["RELIABILITY", "Reliability — worried they'd cancel or not turn up"],
  ["TOO_RIGID", "Too rigid — my schedule changes"],
  ["NO_ONE_ON_ROUTE", "Nobody travelling my exact route"],
  ["AWKWARDNESS", "Awkwardness with strangers"],
  ["COST_PAYMENT", "Cost, or the hassle of paying"],
  ["NOTHING", "Nothing really puts me off"],
  ["OTHER", "Something else"],
];

// --- passenger: reaction to the concept -------------------------------------

export const LIKELIHOOD: Opt[] = [
  ["DEFINITELY", "Definitely would"],
  ["PROBABLY", "Probably would"],
  ["MIGHT", "Might or might not"],
  ["PROBABLY_NOT", "Probably wouldn't"],
  ["DEFINITELY_NOT", "Definitely wouldn't"],
];

export const APPEALS: Opt[] = [
  ["LOWER_COST", "Lower cost — splitting the fare"],
  ["KNOW_DRIVER_AND_PRICE", "Knowing the driver and the price in advance"],
  ["IDENTITY_VERIFIED", "Identity verified on both sides"],
  ["CHOOSE_WHO", "Choosing who I travel with"],
  ["PAYMENT_HELD", "Payment held until the trip happens"],
  ["ENVIRONMENT", "Environmental benefit"],
  ["NOTHING", "Nothing appeals"],
  ["OTHER", "Something else"],
];

export const SCHEDULED_VS_ONDEMAND: Opt[] = [
  ["MUCH_MORE", "Much more appealing"],
  ["SOMEWHAT_MORE", "Somewhat more appealing"],
  ["NO_DIFFERENCE", "No difference"],
  ["SOMEWHAT_LESS", "Somewhat less appealing"],
  ["MUCH_LESS", "Much less appealing"],
];

// --- passenger: trust -------------------------------------------------------

export const TRUST_FACTORS: Opt[] = [
  ["IDENTITY_VERIFIED", "The other person's identity is verified"],
  ["RATINGS_VISIBLE", "You can see their rating from previous trips"],
  ["APPROVE_WHO", "You choose and approve who you ride with"],
  ["LIVE_SHARING_SOS", "Live trip-sharing with a contact, and an SOS button"],
];

export const TRUST_SCALE: Opt[] = [
  ["MUCH_MORE_WILLING", "Much more willing"],
  ["MORE_WILLING", "More willing"],
  ["NO_DIFFERENCE", "No difference"],
  ["LESS_WILLING", "Less willing"],
  ["MUCH_LESS_WILLING", "Much less willing"],
];

export const COMFORT: Opt[] = [
  ["VERY_COMFORTABLE", "Very comfortable"],
  ["COMFORTABLE", "Comfortable"],
  ["NEITHER", "Neither comfortable nor uncomfortable"],
  ["UNCOMFORTABLE", "Uncomfortable"],
  ["VERY_UNCOMFORTABLE", "Very uncomfortable"],
];

// --- passenger: frequency and breadth ---------------------------------------

export const USE_DAYS: Opt[] = [
  ["FIVE_PLUS", "5 or more days a week"],
  ["THREE_FOUR", "3 to 4 days a week"],
  ["ONE_TWO", "1 to 2 days a week"],
  ["OCCASIONAL", "Occasionally"],
  ["WOULD_NOT", "I wouldn't use it"],
];

export const USE_CASES: Opt[] = [
  ["COMMUTING", "Commuting"],
  ["SCHOOL_RUN", "School or nursery runs"],
  ["INTERCITY", "Trips between towns or cities"],
  ["EVENTS", "Getting to events"],
  ["AIRPORT", "Airport runs"],
  ["NOWHERE", "Nowhere else"],
  ["OTHER", "Somewhere else"],
];

// --- car owner --------------------------------------------------------------

export const SPARE_SEATS: Opt[] = [
  ["THREE_PLUS", "3 or more"],
  ["TWO", "2"],
  ["ONE", "1"],
  ["NONE", "None — the car is usually full"],
];

export const GAVE_LIFTS: Opt[] = [
  ["YES_NOW", "Yes, I do now"],
  ["YES_PAST", "Yes, in the past"],
  ["NO", "No"],
];

export const DRIVER_COMFORT_FACTORS: Opt[] = [
  ["PAX_VERIFIED", "Passengers' identity verified"],
  ["I_APPROVE_EACH", "I approve or decline each passenger myself"],
  ["RATINGS_VISIBLE", "Passenger ratings I can see beforehand"],
  ["PAYMENT_HELD", "Payment guaranteed, held until the trip happens"],
  ["INSURANCE_CLARITY", "Clarity about insurance"],
  ["LIVE_SHARING_SOS", "Live trip-sharing and an SOS button"],
  ["NOTHING", "Nothing would make me comfortable"],
  ["OTHER", "Something else"],
];

export const DRIVER_BARRIERS: Opt[] = [
  ["SAFETY_STRANGERS", "Safety — strangers in my car"],
  ["INSURANCE_LEGAL", "Insurance or legal uncertainty"],
  ["HASSLE_NOT_WORTH_IT", "Hassle — not worth it for the money"],
  ["DETOURS_DELAYS", "Detours or delays to my route"],
  ["RESPONSIBILITY", "Responsibility if something goes wrong"],
  ["NOTHING", "Nothing really"],
  ["OTHER", "Something else"],
];

export const DRIVE_MORE: Opt[] = [
  ["YES_MORE", "Yes, I'd drive more"],
  ["NO_CHANGE", "No change"],
  ["NOT_SURE", "Not sure"],
];

// --- demographics -----------------------------------------------------------

export const AGE_BANDS: Opt[] = [
  ["UNDER_25", "Under 25"],
  ["25_34", "25 to 34"],
  ["35_44", "35 to 44"],
  ["45_54", "45 to 54"],
  ["55_64", "55 to 64"],
  ["65_PLUS", "65 or over"],
  ["PREFER_NOT", "Prefer not to say"],
];

export const GENDERS: Opt[] = [
  ["FEMALE", "Female"],
  ["MALE", "Male"],
  ["OTHER", "Other"],
  ["PREFER_NOT", "Prefer not to say"],
];

export const YES_NO: Opt[] = [
  ["YES", "Yes"],
  ["NO", "No"],
];

/**
 * The concept, exactly as the respondent reads it.
 *
 * Shown once, and only after the behaviour and barrier questions, so the
 * baseline is captured before the idea is in their head. Plain description,
 * no adjectives, no screenshots: the point is to measure a reaction to the
 * proposition, not to a piece of marketing.
 */
export const CONCEPT_PASSENGER =
  "Conductor is an app for sharing regular car journeys. Someone already driving a route — for example, a commute — publishes the trip in advance. Other people going the same way can book a seat, and the cost of the journey is split between everyone sharing the car. Trips are arranged ahead of time rather than requested on demand, so you know the driver, the car and the price before the day. Both drivers and passengers verify their identity and rate each other after each trip, and your payment is held securely and only released to the driver once the trip has happened.";

export const CONCEPT_DRIVER =
  "Conductor lets you publish a journey you're already making and offer your spare seats to verified passengers going the same way. They pay a share of the trip cost, held securely and released to you after the trip. You approve who rides with you, see their rating, and can decline anyone without giving a reason.";

// --- who you are and where you live -----------------------------------------
//
// Asked early, and deliberately. Where someone lives and what transport
// actually exists there shapes every answer that follows: a village with no
// Sunday bus and a zone-2 flat are different markets, and a survey that
// cannot tell them apart produces a national average nobody can act on.

export const INDUSTRY: Opt[] = [
  ["HEALTH_CARE", "Health and social care"],
  ["EDUCATION", "Education"],
  ["RETAIL_HOSPITALITY", "Retail, hospitality or leisure"],
  ["MANUFACTURING", "Manufacturing or engineering"],
  ["CONSTRUCTION", "Construction or the trades"],
  ["TRANSPORT_LOGISTICS", "Transport, warehousing or logistics"],
  ["PROFESSIONAL_FINANCE", "Finance, legal or professional services"],
  ["TECH", "Technology or telecoms"],
  ["PUBLIC_SECTOR", "Public sector or government"],
  ["CREATIVE", "Creative, media or the arts"],
  ["AGRICULTURE", "Agriculture or food production"],
  ["STUDENT", "Studying"],
  ["NOT_WORKING", "Not currently working"],
  ["OTHER", "Something else"],
];

export const WORK_PATTERN: Opt[] = [
  ["ONSITE_FULL", "On site five days a week"],
  ["ONSITE_MOST", "On site most days"],
  ["HYBRID", "Hybrid — some days at home"],
  ["MOSTLY_HOME", "Mostly at home"],
  ["SHIFTS", "Shift work, or it varies week to week"],
  ["NA", "Doesn't apply to me"],
];

export const AREA_TYPE: Opt[] = [
  ["CITY_CENTRE", "City centre"],
  ["CITY_SUBURB", "Suburb of a city"],
  ["LARGE_TOWN", "Large town"],
  ["SMALL_TOWN", "Small town"],
  ["VILLAGE_RURAL", "Village or rural area"],
];

export const PT_WEEKDAY: Opt[] = [
  ["FREQUENT", "Frequent and reliable"],
  ["USABLE", "Usable, but limited"],
  ["POOR", "Poor — I'd rather not rely on it"],
  ["NONE", "Effectively none"],
];

export const PT_WEEKEND: Opt[] = [
  ["SAME", "About the same as weekdays"],
  ["REDUCED", "Reduced, but still usable"],
  ["MUCH_WORSE", "Much worse"],
  ["NONE", "Nothing at weekends"],
  ["NOT_SURE", "Not sure"],
];

export const CAR_ACCESS: Opt[] = [
  ["YES_OWN", "Yes — my own car"],
  ["YES_SHARED", "Yes — a household or shared car"],
  ["NO", "No"],
];

export const DRIVES_FOR_JOURNEY: Opt[] = [
  ["YES_MOST", "Yes, most of the time"],
  ["YES_SOME", "Sometimes"],
  ["NO", "No"],
];
