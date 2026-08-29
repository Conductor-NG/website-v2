/* Loose types for the auto-ported design module (components/design.jsx).
   The ported prototype's components have optional-by-convention props;
   type them permissively so route wrappers can compose them freely. */
import type { ComponentType } from "react";

type AnyProps = ComponentType<Record<string, unknown>>;

export const PaxHome: AnyProps;
export const OwnerPage: AnyProps;
export const HowItWorks: AnyProps;
export const SafetyNew: AnyProps;
export const FaresPage: AnyProps;
export const Corridors: AnyProps;
export const CorridorDetail: AnyProps;
export const FAQPage: AnyProps;
export const About: AnyProps;
export const Calculator: AnyProps;
export const Quote: AnyProps;
export const Header: AnyProps;
export const Footer: AnyProps;
export const PrivacyPage: AnyProps;
export const TermsPage: AnyProps;
export const ConductPage: AnyProps;
export const DeletePage: AnyProps;
export const CareersPage: AnyProps;
export const PressPage: AnyProps;
