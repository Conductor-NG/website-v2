import type { Metadata } from "next";
import { DeletePage } from "@/components/design";

export const metadata: Metadata = {
  title: "Delete your profile",
  description:
    "How to close your Conductor account from the app, the 30-day grace period, and which records the law requires us to keep, anonymised, afterwards.",
  alternates: { canonical: "/delete-profile" },
};

export default function Page() {
  return <DeletePage />;
}
