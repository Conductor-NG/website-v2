import type { Metadata } from "next";
import { PassengerPolicyPage } from "@/components/design";

export const metadata: Metadata = {
  title: "Passenger policy",
  description:
    "The policy for passengers booking a seat on Conductor — your rights and obligations, before, during and after the ride, fares and refunds, safety and SOS, complaints and disputes.",
  alternates: { canonical: "/legal/passenger-policy" },
};

export default function Page() {
  return <PassengerPolicyPage />;
}
