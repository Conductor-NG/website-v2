import type { Metadata } from "next";
import { PaxHome } from "@/components/design";

export const metadata: Metadata = {
  title: "Conductor — share the ride on your route, split the cost",
  description:
    "Someone is already driving your route this week. Book a seat for a share of the cost — verified both ways, fare agreed up front.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <PaxHome />;
}
