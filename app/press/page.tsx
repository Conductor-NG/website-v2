import type { Metadata } from "next";
import { PressPage } from "@/components/design";

export const metadata: Metadata = {
  title: "Press & media",
  description:
    "What Conductor is, the quick facts, boilerplate and where to reach a person. For interviews, data or brand assets, write to press@conductor.ng.",
  alternates: { canonical: "/press" },
};

export default function Page() {
  return <PressPage />;
}
