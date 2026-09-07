import { notFound } from "next/navigation";
import { DeckTracker } from "../../deck-client";

// Per-founder profile pages, reached by clicking a co-founder card on /deck/team.
// Styled as a minimalist personal page (big stacked name, headshot, bio) on the
// deck's warm palette. Content is first-party — no user input.

const serif = "'Instrument Serif','Roboto Flex',Georgia,serif";

type Founder = {
  name: string;
  first: string;
  last: string;
  role: string;
  credential?: string;
  photo?: string;
  objectPosition?: string;
  initial?: string;
  lede: string;
  body: string[];
  quote?: string;
  email?: string;
  linkedin?: string;
  ready: boolean;
};

const FOUNDERS: Record<string, Founder> = {
  wale: {
    name: "Wale Shekoni",
    first: "Wale",
    last: "Shekoni",
    role: "Founder",
    photo: "/deck/images/founder-wale.jpg",
    objectPosition: "50% 20%",
    lede: "The idea started on a bridge in Lagos, years before the first line of code.",
    body: [
      "In 2019 I drove to and from my office on Ikoyi Road, by Obalende. Everyday on my way home from work, going up the Obalende bridge, commuters would flag me down to hitch a ride toward the Iyana Oworo bus stop — while I was headed for Costain roundabout. Different directions, different routes, different places.",
      "I didn't know these people and no one could vouch for them. They didn't know where I was going. I didn't know the going rate for a drop anywhere in Lagos. And if anything happened on that bridge — if I ever felt unsafe — there was no one I could reach in the moment.",
      "In January 2024 it all came together, and we began building Conductor — the trust, the pricing, the vouching, and the safety line that were missing on that bridge. Today the app is complete, and we have started onboarding users.",
    ],
    quote:
      "The demand was literally flagging me down. The trust to say yes just didn't exist yet.",
    email: "ws@conductor.ng",
    ready: true,
  },
  dimeji: {
    name: "Dimeji",
    first: "Dimeji",
    last: "",
    role: "Co-founder",
    initial: "D",
    lede: "Transportation runs through the whole path — a railway across northern Nigeria, a master's in AI, and the data behind one of the world's busiest transit systems.",
    body: [
      "I grew up in an estate in Abuja, driving out each morning past the same neighbours walking down our road toward the junction — waiting on a bus or a bike for the last stretch to work. I would give lifts to the ones I knew, three or four in the car, and watch the rest keep walking as I pulled away. I had empty seats. They needed seats. And there was nothing in between us.",
      "Every step since has been about building what it takes to close that gap. I spent years as an engineer on the Mota-Engil Kano–Maradi railway — a $1.9 billion line laying new track across northern Nigeria — then went to Sussex for an MSc in Artificial Intelligence. Today I am a data analyst at Transport for London, inside a system that moves millions of people a day, learning exactly how one is run.",
      "In September 2024, Wale and I brought Conductor together with the operating team we had spent years looking for. The gap I saw on that estate road — and the one Wale saw being flagged down on the Obalende bridge — is the same one Conductor is built to close: interest-based matching, so a shared ride is one people actually want to be in, and a weekly escrow that turns a one-off trip into a standing commuter relationship. We are building for Lagos first, and moving out from there.",
    ],
    quote:
      "I had empty seats. They needed seats. And there was no system in between us.",
    email: "dimeji@conductor.ng",
    ready: true,
  },
  bawo: {
    name: "Bawo Maleghemi",
    first: "Bawo",
    last: "Maleghemi",
    role: "Co-founder",
    initial: "B",
    lede: "A product leader for over a decade — fintech, payments and AI — with transport the thread running through all of it.",
    body: [
      "I have spent twelve years building products, most of it where technology meets the way people and money move. At Interswitch I led product across payments, oil and gas, and transport — shipping platforms like Smartmove and Smartfuel to millions of people across Africa. I was also part of the team that started BusRide in Lagos in 2019, putting scheduled, trackable buses onto roads that had only ever known the danfo and the molue.",
      "Since then I have built and led product in Canada — Director of Products at Otter, an AI bookkeeping and tax platform, and lead product on Optisage.ai — across fintech, SaaS and AI, zero-to-one and at scale. Different countries, different products, the same craft: find the real problem, ship something structured and fast, and stay honest about how people actually behave.",
      "That is the lesson transport keeps teaching me — the hard part is never the app, it is the human system around it: the trust, the timing, the incentives, the thousand small ways people act at a bus stop at 6am. Conductor is that lesson applied to the car. The seats are already on the road every morning; the coordination is what's missing. It is the clearest shot I have had at the problem I keep coming back to.",
    ],
    quote:
      "Lagos was never short of vehicles. It was short of coordination — and coordination is software.",
    email: "bm@conductor.ng",
    ready: true,
  },
};

export function generateStaticParams() {
  return Object.keys(FOUNDERS).map((slug) => ({ slug }));
}

export default async function FounderProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = FOUNDERS[slug];
  if (!f) {
    notFound();
  }

  return (
    <>
      <DeckTracker slide={`team/${slug}`} />
      <main style={{ flex: 1, width: "100%" }}>
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "40px 24px 88px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <a
            href="/deck/team"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#6B5D4E",
              textDecoration: "none",
            }}
          >
            ← Team
          </a>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
              margin: "40px 0 8px",
              textAlign: "center",
            }}
          >
            {f.photo ? (
              <div
                style={{
                  width: 168,
                  height: 168,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#FAE8CF",
                  flex: "none",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={f.name}
                  src={f.photo}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: f.objectPosition || "center",
                    display: "block",
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  width: 168,
                  height: 168,
                  borderRadius: "50%",
                  background: "#FAE8CF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontSize: 72,
                  color: "#9F6010",
                }}
              >
                {f.initial}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <h1
                style={{
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(48px,9vw,84px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                {f.first}
                {f.last ? (
                  <>
                    <br />
                    {f.last}
                  </>
                ) : null}
              </h1>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#EE4643",
                  marginTop: 8,
                }}
              >
                {f.role}
              </div>
              {f.credential ? (
                <div
                  style={{
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "#6B5D4E",
                    maxWidth: 460,
                    margin: "10px auto 0",
                  }}
                >
                  {f.credential}
                </div>
              ) : null}
            </div>
          </div>

          <p
            style={{
              fontSize: 20,
              lineHeight: 1.5,
              color: "#514336",
              textAlign: "center",
              maxWidth: 560,
              margin: "8px auto 0",
            }}
          >
            {f.lede}
          </p>

          <div
            style={{
              height: 1,
              background: "#ECDFCE",
              margin: "48px 0",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 22,
              maxWidth: 620,
              margin: "0 auto",
            }}
          >
            {f.body.map((para, i) => {
              // Insert the pull-quote after the first paragraph.
              const showQuote = i === 0 && f.quote;
              return (
                <div
                  key={para.slice(0, 24)}
                  style={{ display: "flex", flexDirection: "column", gap: 22 }}
                >
                  <p
                    style={{
                      fontSize: 18,
                      lineHeight: 1.65,
                      color: f.ready ? "#211A14" : "#8A7A6B",
                      margin: 0,
                    }}
                  >
                    {para}
                  </p>
                  {showQuote ? (
                    <p
                      style={{
                        fontFamily: serif,
                        fontStyle: "italic",
                        fontSize: "clamp(24px,3.4vw,34px)",
                        lineHeight: 1.3,
                        color: "#EE4643",
                        margin: "8px 0",
                        textWrap: "balance",
                      }}
                    >
                      &ldquo;{f.quote}&rdquo;
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              gap: 20,
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: 48,
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            {f.email ? (
              <a
                data-cta="founder_email"
                href={`mailto:${f.email}`}
                style={{ color: "#EE4643", textDecoration: "none" }}
              >
                {f.email}
              </a>
            ) : null}
            {f.linkedin ? (
              <a
                href={f.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#EE4643", textDecoration: "none" }}
              >
                LinkedIn ↗
              </a>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
}
