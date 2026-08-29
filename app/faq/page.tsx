import type { Metadata } from "next";
import { FAQPage } from "@/components/design";

export const metadata: Metadata = {
  title: "FAQ — questions, answered",
  description: "How Conductor works for passengers and car owners: fares, payment and refunds, safety and account, and offers.",
  alternates: { canonical: "/faq" },
};

export default function Page() {
  return <FAQPage />;
}
