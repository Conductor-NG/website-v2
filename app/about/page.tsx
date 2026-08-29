import type { Metadata } from "next";
import { About } from "@/components/design";

export const metadata: Metadata = {
  title: "About — the car is already going your way",
  description: "Most cars in Lagos traffic carry one person. Conductor fills the empty seats on trips already happening.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <About />;
}
