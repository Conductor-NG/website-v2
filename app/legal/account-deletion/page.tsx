import type { Metadata } from "next";
import { AccountDeletionPage } from "@/components/design";

export const metadata: Metadata = {
  title: "Account & data deletion policy",
  description:
    "How to delete your Conductor account, what happens during the 30-day grace period, and which records we may lawfully retain afterwards.",
  alternates: { canonical: "/legal/account-deletion" },
};

export default function Page() {
  return <AccountDeletionPage />;
}
