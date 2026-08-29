import type { Metadata } from "next";
import { Corridors } from "@/components/design";

export const metadata: Metadata = {
  title: "Corridors — routes people share",
  description: "The Lagos and Abuja corridors people commute together. Find yours and see who's driving it.",
  alternates: { canonical: "/corridors" },
};

export default function Page() {
  return <Corridors />;
}
