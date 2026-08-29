import type { Metadata } from "next";
import { TermsPage } from "@/components/design";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The terms that govern your use of the Conductor.ng website, apps and services — fares, escrow, refunds, conduct, liability and governing law.",
  alternates: { canonical: "/legal/terms" },
};

export default function Page() {
  return <TermsPage />;
}
