import type { Metadata } from "next";
import { SafetyNew } from "@/components/design";

export const metadata: Metadata = {
  title: "Safety — you always know who's in the car",
  description: "Identity verified on both sides, safe named pickup points, a one-time code at meet-up, live tracking, share-ride and SOS on every trip.",
  alternates: { canonical: "/safety" },
};

export default function Page() {
  return <SafetyNew />;
}
