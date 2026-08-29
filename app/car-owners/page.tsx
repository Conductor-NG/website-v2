import type { Metadata } from "next";
import { OwnerPage } from "@/components/design";

export const metadata: Metadata = {
  title: "For car owners — your empty seats pay for the drive",
  description: "You're already making the trip. Share your empty seats, approve every passenger, and let a few seats cover most of the fuel and servicing.",
  alternates: { canonical: "/car-owners" },
};

export default function Page() {
  return <OwnerPage />;
}
