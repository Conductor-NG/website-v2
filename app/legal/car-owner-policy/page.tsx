import type { Metadata } from "next";
import { CarOwnerPolicyPage } from "@/components/design";

export const metadata: Metadata = {
  title: "Car owner policy",
  description:
    "The policy for car owners who publish trips on Conductor — your status, rights and obligations, vehicle standards, verification, earnings and escrow, safety and standing.",
  alternates: { canonical: "/legal/car-owner-policy" },
};

export default function Page() {
  return <CarOwnerPolicyPage />;
}
