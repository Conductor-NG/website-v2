import type { Metadata } from "next";
import { Footer, Header } from "@/components/design";
import { UkSurvey } from "./UkSurvey";
import "./uk-survey.css";

export const metadata: Metadata = {
  title: "UK travel survey — Conductor",
  description:
    "Five minutes on how you make your regular journey, and whether sharing it would work for you. Research only, no account needed.",
  alternates: { canonical: "/uk-survey" },
  // Deliberately not indexed. A survey link is handed to a recruited sample;
  // passing traffic answering it would contaminate the very thing it measures.
  robots: { index: false, follow: false },
};

/**
 * The page is deliberately thin.
 *
 * Everything a respondent needs is inside the survey itself, starting with
 * the consent page. There is no hero, no explanation of the product and no
 * screenshots above the questions, because showing someone what you are
 * building before asking what they do today answers the question for them.
 * The concept appears once, in the middle, after the behaviour and barrier
 * questions have been captured.
 */
export default function UkSurveyPage() {
  return (
    <>
      <Header />
      <main className="uks-page">
        {/* `sec` + `wrap` are the site's own section and centred-container
            classes. An earlier draft used `section`/`container`, which this
            codebase does not define — so the survey sat hard against the left
            edge with the right half of the screen empty. */}
        <section className="sec">
          <div className="wrap wrap--tight">
            <p className="uks-page__eyebrow">Conductor · research</p>
            <h1 className="uks-page__h1">How do you make your regular journey?</h1>
            <p className="uks-page__lede">
              We're researching how people travel in the UK, and whether sharing
              a regular journey would be useful here. About five minutes. No
              account, no app download.
            </p>
            <UkSurvey />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
