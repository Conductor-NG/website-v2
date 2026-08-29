import type { Metadata } from "next";
import { ConductPage } from "@/components/design";

export const metadata: Metadata = {
  title: "Code of conduct",
  description:
    "What every passenger and car owner agrees to — the values, the zero-tolerance conduct, the sanctions ladder, appeals and how to report an incident.",
  alternates: { canonical: "/legal/code-of-conduct" },
};

export default function Page() {
  return <ConductPage />;
}
