import type { Metadata } from "next";
import { PromotionalTermsPage } from "@/components/design";

/**
 * Lives at /promotional-terms rather than under /legal, because this is the
 * URL an offer links to from inside the apps and from a push notification —
 * short, and stable once it is printed on a banner.
 */
export const metadata: Metadata = {
  title: "Promotional terms",
  description:
    "The rules that apply to every Conductor offer — discounts, referral rewards, cash bonuses and credits: who can take part, how a reward is paid, what forfeits one, and how to contest a decision.",
  alternates: { canonical: "/promotional-terms" },
};

export default function Page() {
  return <PromotionalTermsPage />;
}
