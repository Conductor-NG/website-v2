import type { Metadata } from "next";
import { HowItWorks } from "@/components/design";

export const metadata: Metadata = {
  title: "How it works — one trip, both sides",
  description: "The same journey from both seats: what a passenger does and what a car owner does at each step.",
  alternates: { canonical: "/how-it-works" },
};

export default function Page() {
  return <HowItWorks />;
}
