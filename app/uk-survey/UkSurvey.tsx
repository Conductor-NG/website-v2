"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CheckGroup, LongText, Matrix, Money, OtherBox, Question, Radio, Text } from "./fields";
import * as Q from "./questions";

/**
 * The UK market-validation survey, one section per page.
 *
 * Order is the point of this file, not decoration. Current behaviour and the
 * barriers to sharing are captured BEFORE the concept is described, because
 * an unprimed baseline is the only version of those answers worth anything.
 * The concept appears once, as plain text, on its own page, and every
 * reaction question sits after it. Moving the description earlier — a hero,
 * an explainer, screenshots of the app — would tell people the answer before
 * asking the question, and the resulting numbers would deserve the scepticism
 * they would get.
 *
 * Who you are and where you live come early, before the travel questions.
 * Demographics usually go last to protect the completion rate, and that is a
 * fair worry, but it loses to a bigger one: without knowing who answered and
 * what transport their area actually has, a positive result is a national
 * average describing nobody. Weekday and weekend service are separate
 * questions, because a town with a decent weekday bus and nothing on a Sunday
 * is a different opportunity from one with neither.
 *
 * Having a car decides the route. Without one you cannot offer a seat, so the
 * driver half never appears; with one you answer both halves in a single run,
 * because supply is the side a marketplace actually fails on.
 *
 * Nothing is required except consent, the two screeners and the car question.
 * Every other blank is recorded as a blank: a forced field is a drop-off, and
 * a partial response is still evidence.
 */

type Answers = Record<string, unknown>;
type Phase = "survey" | "sending" | "done" | "screened-out";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Step = {
  id: string;
  /** Shown above the questions as the section name. */
  legend: string;
  hint?: string;
  render: (ctx: Ctx) => React.ReactNode;
  /** Blocks Next and explains why. Undefined means the page is optional. */
  blocked?: (a: Answers) => string | undefined;
};

type Ctx = {
  a: Answers;
  set: (key: string, value: unknown) => void;
  many: (key: string) => string[];
  text: (key: string) => string;
};

// --- shared pages -----------------------------------------------------------

const CONSENT: Step = {
  id: "consent",
  legend: "Before we start",
  render: ({ a, set }) => (
    <>
      <p className="uks-p">
        This short survey takes about five minutes. It helps us understand how
        people in the UK travel, and whether a shared-commute service would be
        useful here. Your answers are used for market research only.
      </p>
      <dl className="uks-dl">
        <dt>Who runs this</dt>
        <dd>Conductor Technology International Services Limited.</dd>
        <dt>What we collect</dt>
        <dd>
          Your answers, and — only if you choose to give them — your email
          address and the first part of your postcode. You do not have to
          provide either to complete the survey.
        </dd>
        <dt>How we use it</dt>
        <dd>
          To analyse travel needs and demand. If you leave an email we may
          contact you about an early-access pilot, and you can opt out at any
          time. We will not sell your data or share it with third parties for
          marketing. Responses are stored securely, and analysed separately
          from any contact details you give. We keep contact details no longer
          than 12 months unless you ask us to remove them sooner.
        </dd>
        <dt>Your rights</dt>
        <dd>
          Under UK GDPR you can ask to see, correct or delete your data at any
          time by emailing{" "}
          <a href="mailto:support@conductor.ng">support@conductor.ng</a>.
        </dd>
      </dl>
      <label className="uks-consent">
        <input
          checked={a.consent === true}
          onChange={(e) => set("consent", e.target.checked)}
          type="checkbox"
        />
        <span>
          I am 18 or over, live in the UK, and consent to my answers being used
          as described.
        </span>
      </label>
    </>
  ),
  blocked: (a) =>
    a.consent === true ? undefined : "Please confirm the statement above to continue.",
};

const SCREENING: Step = {
  id: "screening",
  legend: "A few questions first",
  hint: "So we know whose answers these are.",
  render: ({ a, set }) => (
    <>
      <Question number="1" title="Do you live in the UK?">
        <Radio
          name="livesInUk"
          onChange={(v) => set("livesInUk", v)}
          options={Q.YES_NO}
          value={a.livesInUk as string}
        />
      </Question>
      <Question
        number="2"
        title="In a typical week, how often do you make the same or a similar journey?"
        hint="A commute, a school run, or any regular trip."
      >
        <Radio
          name="tripFrequency"
          onChange={(v) => set("tripFrequency", v)}
          options={Q.TRIP_FREQUENCY}
          value={a.tripFrequency as string}
        />
      </Question>
      {/* The fork, asked here rather than three pages later. It decides
          whether this run includes the driver half, and until it is answered
          the counter has to guess — so the sooner it lands, the fewer people
          are shown a length that is not theirs. */}
      <Question number="3" title="Do you have a car you can drive?">
        <Radio
          name="carAccess"
          onChange={(v) => set("carAccess", v)}
          options={Q.CAR_ACCESS}
          value={a.carAccess as string}
        />
      </Question>
      {a.carAccess && a.carAccess !== "NO" ? (
        <Question number="4" title="Do you drive yourself for your regular journey?">
          <Radio
            name="drivesForJourney"
            onChange={(v) => set("drivesForJourney", v)}
            options={Q.DRIVES_FOR_JOURNEY}
            value={a.drivesForJourney as string}
          />
        </Question>
      ) : null}
    </>
  ),
  blocked: (a) =>
    a.livesInUk && a.tripFrequency && a.carAccess
      ? undefined
      : "Please answer all the questions on this page.",
};

/**
 * Who is answering. Asked early on purpose.
 *
 * Standard practice puts demographics last to protect the completion rate,
 * and that is a fair worry. It loses to a bigger one here: without knowing
 * who answered and what their area is like, a positive result is a national
 * average that describes nobody. Every question on this page and the next is
 * optional, and the sensitive ones offer "prefer not to say".
 */
const ABOUT_PERSON: Step = {
  id: "about-person",
  legend: "About you",
  hint: "All optional. It lets us see whether answers differ between groups.",
  render: ({ a, set, text }) => (
    <>
      <Question number="" title="Age">
        <Radio
          name="ageBand"
          onChange={(v) => set("ageBand", v)}
          options={Q.AGE_BANDS}
          value={a.ageBand as string}
        />
      </Question>
      <Question number="" title="Gender">
        <Radio
          name="gender"
          onChange={(v) => set("gender", v)}
          options={Q.GENDERS}
          value={a.gender as string}
        />
      </Question>
      <Question number="" title="What kind of work do you do?">
        <Radio
          name="industry"
          onChange={(v) => set("industry", v)}
          options={Q.INDUSTRY}
          value={a.industry as string}
        />
        {a.industry === "OTHER" ? (
          <OtherBox
            id="industryOther"
            onChange={(v) => set("industryOther", v)}
            value={text("industryOther")}
          />
        ) : null}
      </Question>
      <Question
        number=""
        title="How often are you somewhere other than home for work or study?"
        hint="Hybrid and shift patterns change what a regular journey even means."
      >
        <Radio
          name="workPattern"
          onChange={(v) => set("workPattern", v)}
          options={Q.WORK_PATTERN}
          value={a.workPattern as string}
        />
      </Question>
    </>
  ),
};

/**
 * Where they live and what transport exists there.
 *
 * The car question used to sit here and now sits in the screener: it is the
 * fork that decides whether this run includes the driver half, and a fork
 * answered on page four means four pages of telling people a length that may
 * not be theirs.
 *
 * Weekday and weekend transport are asked separately because they differ so
 * sharply in much of the UK. A town with a decent weekday bus and nothing on
 * a Sunday is a different opportunity from one with neither, and a single
 * "how good is public transport" question cannot tell them apart.
 */
const ABOUT_PLACE: Step = {
  id: "about-place",
  legend: "Where you live",
  render: ({ a, set, text }) => (
    <>
      <Text
        id="postcodeDistrict"
        label="First part of your postcode"
        maxLength={8}
        onChange={(v) => set("postcodeDistrict", v)}
        placeholder="e.g. SM1, ST17, CF24"
        value={text("postcodeDistrict")}
      />
      <Question number="" title="How would you describe where you live?">
        <Radio
          name="areaType"
          onChange={(v) => set("areaType", v)}
          options={Q.AREA_TYPE}
          value={a.areaType as string}
        />
      </Question>
      <Question number="" title="On a weekday, what is public transport like where you live?">
        <Radio
          name="ptWeekday"
          onChange={(v) => set("ptWeekday", v)}
          options={Q.PT_WEEKDAY}
          value={a.ptWeekday as string}
        />
      </Question>
      <Question number="" title="And at weekends?">
        <Radio
          name="ptWeekend"
          onChange={(v) => set("ptWeekend", v)}
          options={Q.PT_WEEKEND}
          value={a.ptWeekend as string}
        />
      </Question>
    </>
  ),
};

const PILOT: Step = {
  id: "pilot",
  legend: "Early access",
  render: ({ a, set, text }) => (
    <>
      <p className="uks-p">
        We're opening early access on selected routes. If you'd like to know
        when yours opens, leave an email — we'll only use it for that.
      </p>
      <label className="uks-consent">
        <input
          checked={a.pilotOptIn === true}
          onChange={(e) => set("pilotOptIn", e.target.checked)}
          type="checkbox"
        />
        <span>Yes, tell me when my route opens.</span>
      </label>
      {a.pilotOptIn === true ? (
        <Text
          autoComplete="email"
          id="email"
          label="Email"
          maxLength={254}
          onChange={(v) => set("email", v)}
          placeholder="you@example.com"
          type="email"
          value={text("email")}
        />
      ) : null}
    </>
  ),
  blocked: (a) => {
    if (a.pilotOptIn !== true) return undefined;
    const email = typeof a.email === "string" ? a.email.trim() : "";
    if (!email) return "Add an email address, or untick the box.";
    return EMAIL_RE.test(email) ? undefined : "That email address doesn't look right.";
  },
};

// --- passenger path ---------------------------------------------------------

const PASSENGER_STEPS: Step[] = [
  {
    id: "pax-now",
    legend: "How you travel now",
    render: ({ a, set, many, text }) => (
      <>
        <Question
          number="1"
          title="How do you usually make your regular journey?"
          hint="Tick everything you use — most people mix more than one across a week."
        >
          <CheckGroup
            name="currentModes"
            onChange={(v) => set("currentModes", v)}
            options={Q.CURRENT_MODE}
            values={many("currentModes")}
          />
          {many("currentModes").includes("OTHER") ? (
            <OtherBox
              id="currentModeOther"
              onChange={(v) => set("currentModeOther", v)}
              value={text("currentModeOther")}
            />
          ) : null}
        </Question>
        <Question number="2" title="Roughly how long is that journey, one way?">
          <Radio
            name="journeyLength"
            onChange={(v) => set("journeyLength", v)}
            options={Q.JOURNEY_LENGTH}
            value={a.journeyLength as string}
          />
        </Question>
        <Question
          number="3"
          title="About how much do you spend on this journey in a typical week?"
          hint="Fares, fuel, parking — whatever you actually spend."
        >
          <Money
            id="weeklySpendGbp"
            label="Per week"
            onChange={(v) => set("weeklySpendGbp", v)}
            value={text("weeklySpendGbp")}
          />
        </Question>
        <Question number="4" title="How satisfied are you with how you make this journey now?">
          <Radio
            name="satisfaction"
            onChange={(v) => set("satisfaction", v)}
            options={Q.SATISFACTION}
            value={a.satisfaction as string}
          />
        </Question>
        <Question
          number="5"
          title="Have you ever shared a car for a regular journey, formally or informally?"
        >
          <Radio
            name="sharedBefore"
            onChange={(v) => set("sharedBefore", v)}
            options={Q.SHARED_BEFORE}
            value={a.sharedBefore as string}
          />
        </Question>
      </>
    ),
  },
  {
    id: "pax-barriers",
    legend: "What's out there, and what stops you",
    render: ({ a, set, many, text }) => {
      const heard = many("heardOf");
      const triedSomething = heard.some((h) => h !== "NONE");
      return (
        <>
          <Question number="6" title="Before today, had you heard of or used any of these?">
            <CheckGroup
              name="heardOf"
              onChange={(v) => set("heardOf", v)}
              options={Q.HEARD_OF}
              values={heard}
            />
            {heard.includes("OTHER") ? (
              <OtherBox
                id="heardOfOther"
                onChange={(v) => set("heardOfOther", v)}
                value={text("heardOfOther")}
              />
            ) : null}
          </Question>
          {triedSomething ? (
            <Question number="7" title="Did they meet your needs?">
              <Radio
                name="metNeeds"
                onChange={(v) => set("metNeeds", v)}
                options={Q.MET_NEEDS}
                value={a.metNeeds as string}
              />
              <LongText
                id="metNeedsWhy"
                label="Briefly, why? (optional)"
                onChange={(v) => set("metNeedsWhy", v)}
                value={text("metNeedsWhy")}
              />
            </Question>
          ) : null}
          <Question
            number="8"
            title="Thinking about sharing a regular car journey with people you don't already know — what would put you off most?"
            hint="Pick up to three."
          >
            <CheckGroup
              max={3}
              name="barriers"
              onChange={(v) => set("barriers", v)}
              options={Q.BARRIERS}
              values={many("barriers")}
            />
            {many("barriers").includes("OTHER") ? (
              <OtherBox
                id="barriersOther"
                onChange={(v) => set("barriersOther", v)}
                value={text("barriersOther")}
              />
            ) : null}
          </Question>
        </>
      );
    },
  },
  {
    id: "pax-concept",
    legend: "Something we're building",
    hint: "Please read this before the next questions.",
    render: ({ a, set, many, text }) => (
      <>
        <p className="uks-concept">{Q.CONCEPT_PASSENGER}</p>
        <Question
          number="9"
          title="Based on that description, how likely would you be to use Conductor as a passenger for your regular journey?"
        >
          <Radio
            name="useLikelihood"
            onChange={(v) => set("useLikelihood", v)}
            options={Q.LIKELIHOOD}
            value={a.useLikelihood as string}
          />
        </Question>
        <Question number="10" title="What appeals most about it, if anything?" hint="Pick up to two.">
          <CheckGroup
            max={2}
            name="appeals"
            onChange={(v) => set("appeals", v)}
            options={Q.APPEALS}
            values={many("appeals")}
          />
          {many("appeals").includes("OTHER") ? (
            <OtherBox
              id="appealsOther"
              onChange={(v) => set("appealsOther", v)}
              value={text("appealsOther")}
            />
          ) : null}
        </Question>
        <Question
          number="11"
          title="Is the booked-in-advance approach more or less appealing than an on-demand ride you request there and then?"
        >
          <Radio
            name="scheduledVsOnDemand"
            onChange={(v) => set("scheduledVsOnDemand", v)}
            options={Q.SCHEDULED_VS_ONDEMAND}
            value={a.scheduledVsOnDemand as string}
          />
        </Question>
      </>
    ),
  },
  {
    id: "pax-trust",
    legend: "Trust and safety",
    render: ({ a, set }) => (
      <>
        <Question
          number="12"
          title="How much would each of these change your willingness to share a car with someone you don't know?"
        >
          <Matrix
            onChange={(row, value) =>
              set("trust", { ...((a.trust as Record<string, string>) ?? {}), [row]: value })
            }
            rows={Q.TRUST_FACTORS}
            scale={Q.TRUST_SCALE}
            values={(a.trust as Record<string, string>) ?? {}}
          />
        </Question>
        <Question
          number="13"
          title="If identity were verified on both sides, how comfortable would you feel sharing a regular car journey with someone new?"
        >
          <Radio
            name="comfortIfVerified"
            onChange={(v) => set("comfortIfVerified", v)}
            options={Q.COMFORT}
            value={a.comfortIfVerified as string}
          />
        </Question>
      </>
    ),
  },
  {
    id: "pax-price",
    legend: "What it would be worth",
    render: ({ a, set, text }) => (
      <>
        <Question
          number="14"
          title="Thinking about your own regular journey, at what weekly price for a shared seat would it be…"
          hint="Your best guess for each. Leave any blank if you'd rather not say."
        >
          <div className="uks-vw">
            <Money
              id="vwTooCheap"
              label="…so cheap you'd doubt its quality or safety?"
              onChange={(v) => set("vwTooCheap", v)}
              value={text("vwTooCheap")}
            />
            <Money
              id="vwBargain"
              label="…a good deal, good value?"
              onChange={(v) => set("vwBargain", v)}
              value={text("vwBargain")}
            />
            <Money
              id="vwGettingExpensive"
              label="…starting to feel expensive, but you'd still consider it?"
              onChange={(v) => set("vwGettingExpensive", v)}
              value={text("vwGettingExpensive")}
            />
            <Money
              id="vwTooExpensive"
              label="…so expensive you wouldn't use it?"
              onChange={(v) => set("vwTooExpensive", v)}
              value={text("vwTooExpensive")}
            />
          </div>
        </Question>
        <Question number="15" title="Realistically, how many days a week would you use it?">
          <Radio
            name="useDays"
            onChange={(v) => set("useDays", v)}
            options={Q.USE_DAYS}
            value={a.useDays as string}
          />
        </Question>
      </>
    ),
  },
  {
    id: "pax-breadth",
    legend: "Where else it might fit",
    render: ({ a, set, many, text }) => (
      <>
        <Question
          number="16"
          title="Besides your main journey, where else might you use shared, scheduled travel?"
        >
          <CheckGroup
            name="useCases"
            onChange={(v) => set("useCases", v)}
            options={Q.USE_CASES}
            values={many("useCases")}
          />
          {many("useCases").includes("OTHER") ? (
            <OtherBox
              id="useCasesOther"
              onChange={(v) => set("useCasesOther", v)}
              value={text("useCasesOther")}
            />
          ) : null}
        </Question>
        <Question
          number="17"
          title="If it worked well, how likely would you be to recommend it to colleagues, neighbours or friends on your route?"
        >
          <Radio
            name="recommend"
            onChange={(v) => set("recommend", v)}
            options={Q.LIKELIHOOD}
            value={a.recommend as string}
          />
        </Question>
      </>
    ),
  },
];

// --- car-owner path, shown to anyone with a car -----------------------------

const DRIVER_STEPS: Step[] = [
  {
    id: "drv-seats",
    legend: "Now the other side — your car",
    hint: "You said you drive. These questions are about offering your spare seats rather than taking one.",
    render: ({ a, set, text }) => (
      <>
        <Question number="1" title="On your regular journey, how many seats are usually empty?">
          <Radio
            name="spareSeats"
            onChange={(v) => set("spareSeats", v)}
            options={Q.SPARE_SEATS}
            value={a.spareSeats as string}
          />
        </Question>
        <Text
          id="route"
          label="What's your regular route?"
          onChange={(v) => set("route", v)}
          placeholder="First part of each postcode is fine, e.g. ST17 to B1"
          value={text("route")}
        />
        <Question
          number="2"
          title="Roughly what does that journey cost you a week in fuel and running costs?"
        >
          <Money
            id="weeklyRunningCostGbp"
            label="Per week"
            onChange={(v) => set("weeklyRunningCostGbp", v)}
            value={text("weeklyRunningCostGbp")}
          />
        </Question>
        <Question
          number="3"
          title="Have you ever given a regular lift in exchange for petrol money or a share of costs?"
        >
          <Radio
            name="gaveLifts"
            onChange={(v) => set("gaveLifts", v)}
            options={Q.GAVE_LIFTS}
            value={a.gaveLifts as string}
          />
        </Question>
      </>
    ),
  },
  {
    id: "drv-concept",
    legend: "Something we're building",
    hint: "Please read this before the next questions.",
    render: ({ a, set }) => (
      <>
        <p className="uks-concept">{Q.CONCEPT_DRIVER}</p>
        <Question
          number="4"
          title="How likely would you be to publish a journey you already make and take verified passengers for a cost-share?"
        >
          <Radio
            name="publishLikelihood"
            onChange={(v) => set("publishLikelihood", v)}
            options={Q.LIKELIHOOD}
            value={a.publishLikelihood as string}
          />
        </Question>
      </>
    ),
  },
  {
    id: "drv-comfort",
    legend: "What would make it work",
    render: ({ set, many, text }) => (
      <>
        <Question number="5" title="What would make you comfortable doing this?" hint="Pick up to three.">
          <CheckGroup
            max={3}
            name="comfortFactors"
            onChange={(v) => set("comfortFactors", v)}
            options={Q.DRIVER_COMFORT_FACTORS}
            values={many("comfortFactors")}
          />
          {many("comfortFactors").includes("OTHER") ? (
            <OtherBox
              id="comfortFactorsOther"
              onChange={(v) => set("comfortFactorsOther", v)}
              value={text("comfortFactorsOther")}
            />
          ) : null}
        </Question>
        <Question number="6" title="What would put you off?">
          <CheckGroup
            name="driverBarriers"
            onChange={(v) => set("driverBarriers", v)}
            options={Q.DRIVER_BARRIERS}
            values={many("driverBarriers")}
          />
          {many("driverBarriers").includes("OTHER") ? (
            <OtherBox
              id="driverBarriersOther"
              onChange={(v) => set("driverBarriersOther", v)}
              value={text("driverBarriersOther")}
            />
          ) : null}
        </Question>
      </>
    ),
  },
  {
    id: "drv-money",
    legend: "The economics",
    render: ({ a, set, text }) => (
      <>
        <Question
          number="7"
          title="What weekly cost-share, across your passengers, would make offering your seats worthwhile?"
        >
          <Money
            id="worthwhileWeeklyGbp"
            label="Per week"
            onChange={(v) => set("worthwhileWeeklyGbp", v)}
            value={text("worthwhileWeeklyGbp")}
          />
        </Question>
        <Question
          number="8"
          title="Would recovering some of your journey costs change how often you make the trip, or which trips you make?"
        >
          <Radio
            name="driveMore"
            onChange={(v) => set("driveMore", v)}
            options={Q.DRIVE_MORE}
            value={a.driveMore as string}
          />
        </Question>
      </>
    ),
  },
  {
    id: "drv-breadth",
    legend: "Where else it might fit",
    render: ({ a, set, many }) => (
      <>
        <Question
          number="9"
          title="Would you offer seats on journey types beyond your main commute?"
        >
          <CheckGroup
            name="driverUseCases"
            onChange={(v) => set("driverUseCases", v)}
            options={Q.USE_CASES}
            values={many("driverUseCases")}
          />
        </Question>
        <Question
          number="10"
          title="How likely would you be to recommend offering seats to other drivers you know?"
        >
          <Radio
            name="driverRecommend"
            onChange={(v) => set("driverRecommend", v)}
            options={Q.LIKELIHOOD}
            value={a.driverRecommend as string}
          />
        </Question>
      </>
    ),
  },
];

/**
 * Longest possible run — both halves — which is what the counter shows until
 * the car question settles which route this respondent is on.
 *
 * Derived, not typed out: the four fixed pages up front (consent, screening,
 * about you, where you live) and the pilot page at the end, plus whichever
 * question pages exist. A step added to either array moves this with it.
 */
const FIXED_STEPS = 5;
const MAX_STEPS = FIXED_STEPS + PASSENGER_STEPS.length + DRIVER_STEPS.length;

// --- the flow ---------------------------------------------------------------

export function UkSurvey() {
  const [answers, setAnswers] = useState<Answers>({ pilotOptIn: false });
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("survey");
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  /**
   * Whether the driver half is in this run.
   *
   * Derived from the answers rather than stored, so the step list and the
   * routing can never disagree with what the respondent actually said.
   *
   * Having a car is not enough. The driver pages open with "You said you
   * drive" and ask how many seats are empty on your regular journey — put
   * those to someone who ticked a household car and then said they do NOT
   * drive that journey, and the survey is contradicting them and asking
   * about a trip they do not make. Only an explicit "no" excludes them:
   * the question is optional, and when it is blank the seats are worth
   * asking about.
   */
  const hasCar = answers.carAccess !== undefined && answers.carAccess !== "NO";
  const offersSeats = hasCar && answers.drivesForJourney !== "NO";
  /** Which halves this row contains: passenger only, or passenger + driver. */
  const instrument = offersSeats ? "CAR_OWNER" : "PASSENGER";
  const topRef = useRef<HTMLDivElement>(null);

  const set = useCallback((key: string, value: unknown) => {
    setAnswers((cur) => ({ ...cur, [key]: value }));
    setError("");
  }, []);

  const ctx: Ctx = useMemo(
    () => ({
      a: answers,
      set,
      many: (key) => (Array.isArray(answers[key]) ? (answers[key] as string[]) : []),
      text: (key) => (typeof answers[key] === "string" ? (answers[key] as string) : ""),
    }),
    [answers, set],
  );

  // The driver path is chosen at the screener, so the step list is derived
  // rather than stored — there is no state to get out of step with itself.
  const steps = useMemo(
    () => [
      CONSENT,
      SCREENING,
      ABOUT_PERSON,
      ABOUT_PLACE,
      ...PASSENGER_STEPS,
      // Anyone who actually drives the journey answers the supply side too,
      // in the same run. They are the only people who can offer a seat, and
      // a marketplace with demand and no supply is the failure worth finding
      // early.
      ...(offersSeats ? DRIVER_STEPS : []),
      PILOT,
    ],
    [offersSeats],
  );

  const step = steps[Math.min(index, steps.length - 1)];

  // Move focus to the top of each new page. Without this a long page leaves
  // the next one scrolled halfway down, which reads as a broken form.
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  function goNext() {
    const why = step.blocked?.(answers);
    if (why) {
      setError(why);
      return;
    }
    // Screeners decide the route, and who leaves.
    if (step.id === "screening") {
      if (answers.livesInUk === "NO") {
        setNote("Thanks for your time — this study is for UK residents only.");
        setPhase("screened-out");
        return;
      }
      if (answers.tripFrequency === "NONE") {
        setNote(
          "Thanks for your time. This study is about regular journeys, so we won't take up any more of it.",
        );
        setPhase("screened-out");
        return;
      }
    }
    if (index === steps.length - 1) {
      void submit();
      return;
    }
    setIndex((i) => i + 1);
    setError("");
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goBack() {
    setError("");
    setIndex((i) => Math.max(0, i - 1));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function submit() {
    setPhase("sending");
    setError("");
    try {
      const res = await fetch("/api/uk-survey", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...answers, instrument, source: "uk-survey" }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setPhase("done");
    } catch (err) {
      setPhase("survey");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }


  if (phase === "screened-out") {
    return (
      <div className="uks-end" ref={topRef} role="status">
        <h2>Thank you</h2>
        <p>{note}</p>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="uks-end" ref={topRef} role="status">
        <h2>Thank you — that's exactly what we needed.</h2>
        <p>
          Your answers go straight into the work of deciding which routes to
          open first.
          {answers.pilotOptIn === true
            ? " We'll email you when early access reaches your area."
            : ""}
        </p>
        <p>
          Know someone with the same journey? Send them this page — every extra
          answer sharpens the picture.
        </p>
      </div>
    );
  }

  /**
   * What the counter says, which is NOT always how many steps are left.
   *
   * The route is not known until the car question on page 4, and before that
   * the derived list is the short one. Counting it directly meant a car owner
   * read "Step 4 of 11", answered honestly, and was shown "Step 5 of 16" —
   * the survey growing by half, sprung on exactly the people whose answers
   * matter most. A progress bar that grows is a well-known way to lose them.
   *
   * So until the route is settled the counter assumes the LONGEST path. It
   * can then only ever shrink, and finding out it is shorter than you thought
   * costs nobody anything.
   */
  const total = answers.carAccess === undefined ? MAX_STEPS : steps.length;
  const pct = Math.round(((index + 1) / total) * 100);
  const last = index === steps.length - 1;

  return (
    <div className="uks" ref={topRef}>
      {/* honeypot — bots fill this; the API drops them silently */}
      <input
        aria-hidden="true"
        autoComplete="off"
        name="company"
        onChange={(e) => set("company", e.target.value)}
        className="uks-hp"
        tabIndex={-1}
        type="text"
      />

      <div className="uks-prog">
        <div className="uks-prog__bar">
          <i style={{ width: `${pct}%` }} />
        </div>
        <span>
          Step {index + 1} of {total}
        </span>
      </div>

      <section className="uks-step" key={step.id}>
        <h2 className="uks-step__legend">{step.legend}</h2>
        {step.hint ? <p className="uks-step__hint">{step.hint}</p> : null}
        {step.render(ctx)}
      </section>

      {error ? (
        <p className="formnote formnote--err" role="alert">
          {error}
        </p>
      ) : null}

      <div className="uks-nav">
        <button
          className="btn"
          disabled={index === 0 || phase === "sending"}
          onClick={goBack}
          type="button"
        >
          Back
        </button>
        <button
          className="btn btn--primary btn--lg"
          disabled={phase === "sending"}
          onClick={goNext}
          type="button"
        >
          {phase === "sending" ? "Sending…" : last ? "Send my answers" : "Next"}
        </button>
      </div>
      {!last && index > 0 ? (
        <p className="uks-skip">Every question after the first page is optional.</p>
      ) : null}
    </div>
  );
}
