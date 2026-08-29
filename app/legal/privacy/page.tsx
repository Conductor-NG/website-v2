import type { Metadata } from "next";
import { PrivacyPage } from "@/components/design";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What personal information Conductor collects, why, who we share it with, how long we keep it, and your rights under the Nigeria Data Protection Act 2023.",
  alternates: { canonical: "/legal/privacy" },
};

export default function Page() {
  return <PrivacyPage />;
}
