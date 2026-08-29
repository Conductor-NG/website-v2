import type { Metadata } from "next";
import { CorridorDetail } from "@/components/design";

export const metadata: Metadata = {
  title: "Agege → Ikeja GRA — a shared corridor",
  description:
    "Eleven kilometres, ~35 minutes, and a car full of people making the same morning run. See who's driving Agege → Ikeja GRA and take a seat.",
  alternates: { canonical: "/corridors/agege-ikeja" },
};

export default function Page() {
  return <CorridorDetail />;
}
