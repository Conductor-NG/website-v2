import type { Metadata } from "next";
import { RefundPolicyPage } from "@/components/design";

export const metadata: Metadata = {
  title: "Refund policy",
  description:
    "When refunds are and are not payable on Conductor — cancellations, no-shows, driver service failures, wallet withdrawals, processing times and how to request one.",
  alternates: { canonical: "/legal/refund-policy" },
};

export default function Page() {
  return <RefundPolicyPage />;
}
