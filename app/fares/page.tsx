import type { Metadata } from "next";
import { FaresPage } from "@/components/design";

export const metadata: Metadata = {
  title: "Fares — your real numbers, not a guess",
  description:
    "Conductor prices each seat live for your route and locks it at booking. See what a seat costs, this week's discount, and how suspended days are never charged.",
  alternates: { canonical: "/fares" },
};

export default function Page() {
  return <FaresPage />;
}
