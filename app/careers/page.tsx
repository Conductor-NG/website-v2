import type { Metadata } from "next";
import { CareersPage } from "@/components/design";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build the way Lagos gets to work. A small team shipping weekly, on the ground in the corridors we build for. See the roles we're usually open to.",
  alternates: { canonical: "/careers" },
};

export default function Page() {
  return <CareersPage />;
}
