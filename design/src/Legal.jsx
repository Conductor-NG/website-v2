/* Legal + company pages: Privacy, Terms, Code of conduct, Delete profile,
   Careers, Press. A shared LegalDoc renderer (readable article column with a
   sticky contents rail) + a lighter layout for Careers / Press.

   The four legal documents reproduce the published conductor.ng policies
   (reviewed by the legal team) as close to word-for-word as practical.
   Source of truth remains the master copies held by the legal team. */

function LegalBody({blocks}){
  return blocks.map((b,i)=>{
    const [t,v]=b;
    if(t==='h2') return <h2 key={i} className="legal__h2" id={'s'+i}>{v}</h2>;
    if(t==='h3') return <h3 key={i} className="legal__h3">{v}</h3>;
    if(t==='p')  return <p  key={i} className="legal__p">{v}</p>;
    if(t==='ol') return <ol key={i} className="legal__list">{v.map((x,j)=><li key={j}>{x}</li>)}</ol>;
    if(t==='ul') return <ul key={i} className="legal__list legal__list--b">{v.map((x,j)=><li key={j}>{x}</li>)}</ul>;
    return null;
  });
}

function LegalDoc({crumb,eyebrow,title,updated,intro,blocks}){
  useReveal();
  const toc=blocks.map((b,i)=>b[0]==='h2'?[i,b[1]]:null).filter(Boolean);
  return (<>
    <Header role="passenger"/>
    <main>
      <PageHero crumb={crumb} eyebrow={eyebrow} solo={true}
        title={title}
        lede={intro}/>
      <section className="sec" style={{paddingTop:0}}><div className="wrap">
        <div className="legal">
          <aside className="legal__toc">
            {updated&&<p className="legal__updated">Last updated · {updated}</p>}
            <p className="eyebrow" style={{margin:'0 0 12px'}}>On this page</p>
            <nav>{toc.map(([i,t])=><a key={i} href={'#s'+i}>{t}</a>)}</nav>
          </aside>
          <article className="legal__body">
            <LegalBody blocks={blocks}/>
            <div className="legal__foot">
              <p className="small">This page mirrors the current published policy. Questions? <a href="mailto:privacy@conductor.ng">privacy@conductor.ng</a></p>
            </div>
          </article>
        </div>
      </div></section>
      <Band title={<>The rest is just the ride <em>working</em>.</>}
        lede="Both apps are free. Book a seat, or publish the trip you were making anyway."/>
    </main>
    <Footer/>
  </>);
}

/* ---------------- Privacy ---------------- */
function PrivacyPage(){return <LegalDoc crumb="Privacy" eyebrow="Legal" updated="August 2026"
  title={<>Privacy <em>policy</em>.</>}
  intro="Conductor takes your privacy seriously. This Privacy Policy explains what personal information we collect, why we collect it, who we share it with, how long we keep it, and the rights you have under Nigerian data protection law — including the Nigeria Data Protection Act 2023 (NDPA) and, where applicable, the Nigeria Data Protection Regulation (NDPR)."
  blocks={[
  ['h2','1 · Scope & Roles'],
  ['p','This Policy applies to personal information collected when accessing or using the Platform, communicating with Conductor, or otherwise interacting with their services. For the NDPA, Conductor functions as the Data Controller regarding personal information, except where specific processing activities involve them acting as a processor on behalf of another controller (such as certain identity-verification activities where the controller is a licensed identity provider).'],
  ['h2','2 · What We Collect'],
  ['p','The following categories of information are collected:'],
  ['ol',[
    <><b>Registration &amp; profile data:</b> name, date of birth, phone number, email, gender (where declared), photograph, password (hashed), preferred language, initial role (Passenger or Driver), and occupation category (optional).</>,
    <><b>Identity-verification data:</b> NIN and NIN-verification records; for Drivers, driver’s licence number, licence photograph, and licence verification records; vehicle registration papers, insurance certificate, and other supporting documents.</>,
    <><b>Trip &amp; usage data:</b> Bookings, Trips published, Trip-Days completed, cancellations, ratings, chat messages, service-recovery credits and referrals.</>,
    <><b>Location data:</b> pickup and drop-off coordinates, live GPS during a Trip, and area-level home / work coordinates captured during onboarding (see clause 6).</>,
    <><b>Financial data:</b> Wallet balances, transaction history, bank-account details submitted for withdrawals, and tokenised card details as held by payment processors.</>,
    <><b>Device &amp; technical data:</b> device model, operating system, app version, IP address, session identifiers, telemetry (battery, network kind, GPS accuracy), and analytics events.</>,
    <><b>Safety data:</b> SOS activations, emergency contacts nominated, incident reports, safety-relevant photos or recordings (e.g. vehicle photographs), and dispute records.</>,
    <><b>Communications:</b> messages exchanged in the in-app chat, support tickets, and notifications delivered via their providers.</>,
    <><b>Search &amp; preference data:</b> the routes and days searched, filters applied, promotional codes redeemed, and preferences set.</>]],
  ['h2','3 · How We Use It'],
  ['p','Personal information is used to:'],
  ['ol',[
    'operate the Platform — register accounts, verify identity, publish or book Trips, calculate fares, process payments, and settle earnings;',
    'keep the Platform safe — run Trust & Safety systems, detect fraud, prevent abuse, investigate incidents, and respond to disputes;',
    'improve the Platform — understand feature usage, prioritise product decisions, calibrate pricing, and develop new features;',
    'communicate with users — send Trip notifications, service messages, safety alerts, receipts, and (where opted in or the law permits) promotional messages;',
    'meet legal, tax, and regulatory obligations — including obligations under the NDPA, NDPR, FCCPA, Federal Inland Revenue Service (FIRS) requirements, and any lawful requests by competent authorities;',
    'enforce Terms and defend legal rights.']],
  ['h2','4 · Legal Bases (NDPA)'],
  ['p','Processing relies on one or more of the following lawful bases under the NDPA:'],
  ['ol',[
    <><b>Contract</b> — processing necessary to perform services to users (e.g. matching Passengers with Drivers, processing payments).</>,
    <><b>Legal obligation</b> — processing required by Nigerian law (e.g. VAT, KYC / identity verification, responding to lawful orders).</>,
    <><b>Legitimate interests</b> — where processing is necessary for Conductor’s or a third party’s legitimate interests and not overridden by user rights and freedoms (e.g. fraud prevention, Platform integrity, research and product improvement using aggregated data).</>,
    <><b>Consent</b> — where specifically requested (e.g. certain marketing communications, background-location tracking outside a Trip window).</>,
    <><b>Vital interests</b> — where processing is necessary to protect the life or physical safety of any person (e.g. SOS activations).</>]],
  ['h2','5 · Who We Share With'],
  ['ol',[
    <><b>Other Users, on a need-to-know basis:</b> a Driver receives the Passenger’s first name, rating, and pickup / drop-off; a Passenger receives the Driver’s first name, rating, and Vehicle’s make / model / plate (partially masked in some contexts). Full identity documents, home / work coordinates, or unmasked phone numbers are not shared between Users.</>,
    <><b>Service providers</b> under written contract and confidentiality obligations, including cloud hosting, payment processing (Paystack), mapping (Google Maps & Places), notification orchestration (Novu, WhatsApp / Meta), identity verification (QoreID, VerifyMe), analytics, and customer-support tooling.</>,
    <><b>Regulators, courts, and law-enforcement agencies</b> where required by law, court order, or valid regulatory demand, or where there is good-faith belief that disclosure is necessary to prevent harm, fraud, or a violation of law.</>,
    <><b>Corporate transactions</b> — in the event of a merger, acquisition, financing, insolvency, or sale of assets, information may be transferred to the counterparty, subject to appropriate protections.</>,
    <><b>With your consent</b> — e.g. where connecting a third-party service to a Conductor account, or authorising sharing information with a workplace-benefits scheme.</>]],
  ['p','Personal information is not sold, and it is not used for interest-based advertising to third parties.'],
  ['h2','6 · Location Data'],
  ['ol',[
    'The Platform collects location data (a) at points where users actively use location features (searching, booking, setting home / work), (b) during Trips (for safety and to power in-Trip UX such as ETA and route replay), and (c) where background-location permission has been granted (for pickup-arrival detection when the phone is asleep).',
    'Location permission may be revoked at any time through device settings. Revoking permission may disable safety or matching features that require it.',
    'Location precision is minimised where possible. Home and work areas are stored as neighbourhood-level coordinates, not exact street addresses.',
    'Location data is not sold.']],
  ['h2','7 · National Identification Number (NIN)'],
  ['p','The following notice supplements this Policy in relation to NIN specifically, and forms part of it.'],
  ['ol',[
    <><b>Identity verification.</b> NIN is used to confirm that the registered identity is genuine and belongs to the user. This helps confirm the identity of both Drivers and Passengers and prevents the use of false, stolen, or fraudulent identities.</>,
    <><b>Safety and security.</b> NIN verification forms part of safety measures. It supports accountability, deters misconduct, and protects the community from fraudulent or harmful activity.</>,
    <><b>Driver and Passenger authentication.</b> For Drivers, NIN verification is part of onboarding and due diligence to ensure that only properly identified individuals provide transportation services on the Platform. For Passengers, NIN verification reduces impersonation and promotes trust between all Users.</>,
    <><b>Fraud prevention and investigation.</b> NIN may be used to detect, prevent, investigate, and respond to fraud, identity theft, abuse of the Platform, or other activities that violate the Terms or applicable law.</>,
    <><b>Legal and regulatory compliance.</b> NIN may be processed to comply with applicable laws, lawful requests from competent authorities, and other requirements imposed by relevant governmental agencies.</>,
    <><b>Protection.</b> NIN is treated as sensitive personal information with reasonable administrative, technical, and organisational measures to protect it against unauthorised access, disclosure, alteration, misuse, or loss. Access is restricted to authorised personnel and trusted service providers who require it to perform verification, security, or compliance functions and are bound by confidentiality and data-protection obligations.</>,
    <><b>No sale or marketing.</b> NIN is not sold and is not used for marketing.</>,
    <><b>Retention.</b> NIN is retained only for as long as necessary to fulfil the purposes above, comply with legal and regulatory requirements, resolve disputes, or enforce contractual rights. Where retention is no longer required, it will be securely deleted or anonymised in accordance with the retention schedule.</>,
    <><b>Your rights.</b> Subject to applicable law, users may request access, correction, objection, or exercise other rights available under NDPA (see clause 9 below).</>]],
  ['h2','8 · Retention'],
  ['p','Personal information is retained only for as long as necessary for the purposes described in this Policy, or for such longer period as is required by law. Indicative retention windows (subject to specific legal, regulatory, or operational requirements):'],
  ['ul',[
    <><b>Account &amp; profile data</b> — while the account is active, and thereafter for a reasonable period to satisfy legal obligations, resolve disputes, and enforce agreements.</>,
    <><b>Identity-verification records (including NIN, licences, vehicle documents)</b> — for the duration of the account and thereafter for such period as is required by anti-fraud, safety, tax, or regulatory obligations.</>,
    <><b>Trip, payment, and settlement records</b> — for a minimum of seven (7) years, or such longer period as required for accounting, tax, or audit purposes.</>,
    <><b>Search history &amp; usage telemetry</b> — up to 365 days by default (admin-tunable), used for personalisation and product research.</>,
    <><b>Chat and support communications</b> — for such period as is required to service tickets, respond to disputes, and comply with law.</>,
    <><b>Anonymised / aggregated data</b> — may be retained indefinitely.</>]],
  ['h2','9 · Your Rights'],
  ['p','Subject to applicable law and to any specific conditions, users have the right to:'],
  ['ul',[
    'ask Conductor to confirm whether personal information is processed and to receive a copy;',
    'ask Conductor to correct inaccurate or incomplete information;',
    'ask Conductor to delete personal information no longer having a lawful basis to retain;',
    'object to processing on grounds of particular situation, or to withdraw a consent previously given;',
    'request restriction of processing in certain cases;',
    'request portability of personal information provided to Conductor, in a structured, commonly used, machine-readable format;',
    'lodge a complaint with the Nigeria Data Protection Commission (NDPC).']],
  ['p','To exercise a right, contact privacy@conductor.ng. Conductor may need to verify identity before responding. Response will be within the timeframe required by law and generally within thirty (30) days.'],
  ['h2','10 · Security & Breaches'],
  ['ol',[
    'Administrative, technical, and organisational safeguards are implemented to protect personal information from unauthorised access, disclosure, alteration, misuse, or loss. These include encryption in transit, access controls, network segmentation, audit logs, and staff training.',
    'No system is completely secure. If account or personal information has been compromised, contact Conductor immediately at security@conductor.ng.',
    'Where a personal-data breach is likely to result in a risk to affected individuals, the Nigeria Data Protection Commission and any affected individuals will be notified in accordance with the NDPA.']],
  ['h2','11 · Children'],
  ['p','The Platform is not intended for and may not be used by any person under the age of 18. Personal information is not knowingly collected from any person under 18. If Conductor becomes aware that such information has been collected, it will be deleted and the associated account will be terminated.'],
  ['h2','12 · Cross-Border Transfers'],
  ['p','Some service providers process personal information outside Nigeria. Where personal information is transferred outside Nigeria, this is done in accordance with the NDPA, including by relying on adequacy decisions, standard contractual clauses, binding corporate rules, or one of the other lawful transfer mechanisms recognised under Nigerian law.'],
  ['h2','13 · Contact & Data Protection Officer (DPO)'],
  ['p','Questions, requests, or complaints about privacy or personal information: privacy@conductor.ng.']
  ]}/>;}

/* ---------------- Terms ---------------- */
function TermsPage(){return <LegalDoc crumb="Terms" eyebrow="Legal" updated="10 August 2026"
  title={<>Terms of <em>service</em>.</>}
  intro="These Terms of Service govern your use of the Conductor.ng website, mobile application and related services (the “Platform”). They incorporate the Passenger Policy, the Car Owner Policy, the Code of Conduct, the Refund Policy and the Privacy Policy by reference. Where a document written specifically for Passengers or Car Owners addresses a matter these Terms also cover, the specific document prevails."
  blocks={[
  ['h2','1 · Acceptance of terms'],
  ['p','By creating an account, browsing the Platform, or tapping “accept” at registration, you agree to be bound by these Terms, the Code of Conduct, and, depending on how you use the Platform, the Passenger Policy or the Car Owner Policy. If you do not agree, please do not use the Platform.'],
  ['h2','2 · Service description'],
  ['p','Conductor.ng operates a car-sharing and commute-matching platform that connects verified Car Owners with Passengers travelling the same routes in Lagos and other Nigerian locations. The Company facilitates these connections, publishes pricing, holds fares in escrow, and provides supporting safety and support tooling. The Company does not own, lease, or operate any Vehicle, and Car Owners provide transportation services as independent contractors as set out in the Car Owner Policy.'],
  ['h2','3 · Fares, payment and refunds'],
  ['ul',[
    'Every fare is calculated by the Company’s pricing engine, shown in full before booking, and locked at booking. There is no surge pricing.',
    'Fares are collected through the Platform and held in Company-controlled escrow, per Trip-Day, until the Trip-Day is complete or resolved.',
    'Refunds are governed by the Refund Policy, which is incorporated into these Terms by reference. In summary: cancellations before a Car Owner accepts a Booking are refunded in full; a Trip-Day is refunded in full where the Car Owner cancels, no-shows, or fails to deliver the ride as promised; a Passenger no-show is not refunded; late-cancellation and no-show handling otherwise follows the published cut-off and attendance-flag model described in the Refund Policy.']],
  ['h2','4 · Vehicle standards and roadworthiness'],
  ['p','The Company is not liable for mechanical faults or breakdowns of any Vehicle. Car Owners are solely responsible for keeping their Vehicle roadworthy, insured, and compliant with Lagos State and federal vehicle regulations, as set out in the Car Owner Policy. Where a Vehicle fails during a Trip, the Company will assist in arranging alternative transport where reasonably possible, but is not liable for resulting inconvenience or cost. Users accept that vehicle condition can vary trip to trip and use the Platform on that basis.'],
  ['h2','5 · Conduct and disputes'],
  ['p','All Users must treat each other, and the Vehicle, respectfully and lawfully, in accordance with the Code of Conduct. Physical altercation, verbal abuse, sexual misconduct, or other misconduct between Users results in suspension or termination in accordance with the sanctions ladder set out in the Code of Conduct, without refund of any related fare. The Company may report criminal conduct to the Nigeria Police Force or other competent authority and may preserve and disclose evidence in accordance with law. The Company is a facilitator and disclaims liability for disputes arising directly between Users, without prejudice to the dispute-resolution channel described in clause 8.'],
  ['h2','6 · Limitation of liability'],
  ['ul',[
    'The Company is a facilitator connecting Passengers and Car Owners; it does not assume responsibility for the safety, conduct, or actions of any User.',
    'To the fullest extent permitted by Nigerian law, the Company is not liable for damages, losses, or injuries arising from your use of the Platform or a Trip, except where such liability cannot lawfully be excluded.',
    'You agree to indemnify and hold the Company harmless from claims arising from your use of the Platform, save to the extent caused by the Company’s own breach of these Terms or applicable law.']],
  ['h2','7 · Data protection'],
  ['p','Our collection, use, and protection of your personal data is described in full in the Privacy Policy, which forms part of these Terms. Where you are a Passenger or Car Owner, the Passenger Policy or Car Owner Policy also sets out data rights specific to your role.'],
  ['h2','8 · Governing law, disputes and arbitration'],
  ['p','These Terms are governed by the laws of Lagos State and the Federal Republic of Nigeria. In-app reporting and the support and disputes channels described in the Passenger Policy and Car Owner Policy are the first point of call for any complaint. Where a matter is not resolved through support or mediation, it is referred to arbitration in Lagos under the Arbitration and Mediation Act 2023, subject to the enforceability of that provision under Nigerian consumer-protection law and your statutory right to bring certain claims before the Federal Competition and Consumer Protection Tribunal.'],
  ['h2','9 · Changes to these Terms'],
  ['p','The Company may amend these Terms from time to time. Where a change is material, we will notify Users through the Platform or by email and update the “last updated” date on this page. Continued use of the Platform after a change takes effect constitutes acceptance of the revised Terms.'],
  ['h2','10 · Contact information'],
  ['ul',[
    'Email: support@conductor.ng',
    'Phone: +234 818 887 6601',
    'Address: 8A Olayinka Balogun Crescent, Magodo Phase 2, Lagos, Nigeria']]
  ]}/>;}

/* ---------------- Code of conduct ---------------- */
function ConductPage(){return <LegalDoc crumb="Code of conduct" eyebrow="Legal" updated="10 August 2026"
  title={<>Code of <em>conduct</em>.</>}
  intro="Conductor is a community of Passengers and Car Owners who share vehicles every week. Trust between us is the reason the Platform works. This Code sets out what everyone agrees to do and, more importantly, what nobody may do — with the sanctions that follow when the line is crossed."
  blocks={[
  ['h2','1 · Scope & values'],
  ['ol',[
    <><b>Who this applies to.</b> This Code applies to every User of the Platform — Passenger, Car Owner, or both — and to their conduct in-app, at pickup and drop-off, inside a Vehicle, and in any Platform-facilitated communication.</>,
    <><b>Values we operate by.</b>
      <ul className="legal__sub">
        <li><b>Respect.</b> Every person in the Vehicle is a colleague, a professional, a neighbour.</li>
        <li><b>Punctuality.</b> The schedule is the product; keeping it protects everyone’s time.</li>
        <li><b>Honesty.</b> Identity is verified for a reason; ratings, chat, and refund claims must be truthful.</li>
        <li><b>Safety.</b> If it is not safe, we don’t do it — whether that means not driving, not boarding, or not staying quiet.</li>
      </ul></>,
    <><b>How the Code is enforced.</b> Our Trust & Safety team uses in-app evidence (GPS traces, chat logs, attendance flags, ratings, photos, dispute records) together with any report or evidence you submit. Enforcement decisions are recorded against the account and, where applicable, the underlying verified identity.</>]],
  ['h2','2 · Zero-tolerance conduct'],
  ['p','The following conduct results in immediate termination of the offender’s account, an identity-level ban that prevents re-registration under any name, and (where warranted) referral to law-enforcement.'],
  ['ol',[
    <><b>Physical violence or assault</b> against a Passenger, Car Owner, or any third party in connection with a Trip.</>,
    <><b>Sexual misconduct</b> of any kind — including unwanted touching, sexual comments, sexual coercion, indecent exposure, requests for sexual acts, sending sexual content in-app, or any conduct that would constitute a sexual offence under Nigerian law.</>,
    <><b>Weapons and prohibited items</b> — firearms, ammunition, explosives, chemical or biological hazards, illegal drugs (as defined by Nigerian law), or any item whose possession is a criminal offence.</>,
    <><b>Driving under the influence.</b> Any Car Owner found to be operating a Vehicle under the influence of alcohol, controlled substances, or any impairing medication is permanently banned.</>,
    <><b>Reckless driving causing serious risk or harm</b> — including street-racing, dangerous overtaking, or gross violation of traffic law that endangers occupants.</>,
    <><b>Human trafficking, kidnapping, or unlawful detention</b> of any person via the Platform.</>,
    <><b>Identity fraud</b> — using another person’s NIN, licence, or documents; falsifying vehicle papers; or evading a ban by re-registering under a different identity.</>,
    <><b>Hate conduct</b> — slurs, symbols, or targeted abuse based on race, tribe, ethnicity, nationality, religion, gender, gender identity, sexual orientation, disability, or any other protected characteristic.</>,
    <><b>Threats and stalking</b> — credible threats of harm, following a User off-platform, or repeated unwanted contact after being asked to stop.</>,
    <><b>Retaliation</b> against a User for reporting an incident, cooperating with an investigation, or leaving an honest rating.</>]],
  ['h2','3 · Serious violations'],
  ['p','The following conduct is investigated and typically results in extended suspension (7 to 90 days) or, on repetition or aggravating facts, termination.'],
  ['ol',[
    <><b>Verbal abuse, insults, or intimidation</b> that falls short of a criminal threat.</>,
    <><b>Discrimination</b> in booking, boarding, seating, or service that does not rise to hate conduct but visibly disadvantages a User on a protected ground.</>,
    <><b>Chronic no-show or last-minute cancellation</b> that materially impacts the schedule of other Users.</>,
    <><b>Repeated route deviation</b> by a Car Owner without lawful cause.</>,
    <><b>Off-platform payments.</b> Soliciting or accepting cash, bank transfer, or any other off-platform value for a Trip.</>,
    <><b>Passenger transfer / seat resale</b> without the Car Owner’s knowledge and Platform approval.</>,
    <><b>Fraudulent refund claims</b>, false SOS activations, or false incident reports.</>,
    <><b>Damage to the Vehicle</b> caused by a Passenger’s deliberate act or gross negligence.</>,
    <><b>Damage to a Passenger’s property</b> caused by a Car Owner’s deliberate act or gross negligence.</>,
    <><b>Publishing a Vehicle</b> that is unroadworthy, uninsured, or missing required documents.</>,
    <><b>Manipulation of ratings, referrals, or promotions</b> — including creating accounts to boost oneself, colluding to inflate ratings, or exploiting referral loopholes.</>,
    <><b>Recording or photographing</b> another User inside the Vehicle without their consent, other than incidental capture through Platform safety tooling.</>]],
  ['h2','4 · Minor violations'],
  ['p','The following conduct typically results in a warning or a short suspension (24 to 72 hours) for repeat occurrences.'],
  ['ol',[
    'Occasional lateness beyond the published grace period.',
    'Rudeness in chat or at pickup that does not rise to abuse.',
    'Failure to wear a seat belt after being reminded.',
    'Eating, smoking, or vaping in the Vehicle without the Car Owner’s permission.',
    'Playing personal audio at volume without earphones.',
    'A Vehicle presented in visibly unclean condition.',
    'Non-critical documents lapsing briefly before renewal.',
    'Publishing a Trip whose stated route and actual route materially diverge on isolated occasions.']],
  ['h2','5 · Sanctions ladder'],
  ['p','Sanctions are proportionate to the conduct, aggravated by pattern, and always subject to the specific facts. In broad terms:'],
  ['ol',[
    <><b>Warning.</b> Recorded on your account; no restriction on service.</>,
    <><b>Feature restriction.</b> Temporary loss of a specific feature (e.g. no publishing, no wallet withdrawal) while a review is completed.</>,
    <><b>Short suspension.</b> Account inactive for 24 – 72 hours; existing Bookings honoured or refunded per the Refund Policy.</>,
    <><b>Extended suspension.</b> Account inactive for 7 – 90 days; Bookings cancelled with refund; funds in Wallet subject to normal payout rules.</>,
    <><b>Termination.</b> Account permanently closed. Withdrawable Wallet funds are paid out subject to identity verification and fraud checks.</>,
    <><b>Identity-level ban.</b> Applied in addition to termination for zero-tolerance conduct. The verified identity (NIN + face) is blocked from re-registration under any name or phone number.</>,
    <><b>Suspension carry-over.</b> A suspension in effect at the time an account is closed carries forward to any subsequent re-registration by the same verified identity, unless the sanction has expired or been lifted on appeal.</>,
    <><b>Referral to authorities.</b> Where conduct amounts to a criminal offence, the Company may report to and cooperate with the Nigeria Police Force, FRSC, NDLEA, or other competent authority, and may preserve and disclose evidence in accordance with law.</>]],
  ['h2','6 · Appeals'],
  ['ol',[
    'Warnings, feature restrictions, and short suspensions are recorded but not routinely appealable; you may raise the matter with support.',
    'Extended suspensions and terminations are appealable. Open the notification in the app or email appeals@conductor.ng within fourteen (14) days of the sanction.',
    'Appeals are decided by a person who was not part of the original decision, using the same evidence available to that decision plus any new evidence you supply.',
    'The Company’s decision on appeal is final for Platform-access purposes, without prejudice to any legal right you may have.']],
  ['h2','7 · Reporting an incident'],
  ['ol',[
    <><b>In immediate danger:</b> tap in-app SOS and, in parallel, call 112 or your local police service.</>,
    <><b>After the fact:</b> open the affected Trip-Day in the app and tap “Report an issue”. Attach photographs, screenshots, or a written statement.</>,
    <><b>General reports:</b> email safety@conductor.ng. All reports are treated in confidence, subject to lawful disclosure.</>,
    <><b>Retaliation is a zero-tolerance breach.</b> Retaliating against a User who reports in good faith is grounds for termination and identity-level ban.</>]]
  ]}/>;}

/* ---------------- Delete your profile ---------------- */
function DeletePage(){return <LegalDoc crumb="Delete your profile" eyebrow="Your account" updated="August 2026"
  title={<>How to delete <em>your account</em>.</>}
  intro="Users who wish to close their Conductor.ng account can do so through the app. The process takes approximately two minutes and includes a thirty-day grace period during which deletion can be cancelled. This permanently removes your profile and personal details after 30 days. Trip and payment records are kept, anonymised, only where the law requires it."
  blocks={[
  ['h2','Five-step deletion process'],
  ['ol',[
    <><b>Step 1:</b> Navigate to the Account tab, scroll to the App section, and select Delete account.</>,
    <><b>Step 2:</b> Review the warning screen explaining the 30-day grace period and what information will be removed.</>,
    <><b>Step 3:</b> Choose which profile to delete — passenger side, car owner side, or the entire account.</>,
    <><b>Step 4:</b> Optionally provide feedback about why you’re leaving the platform.</>,
    <><b>Step 5:</b> Confirm deletion by typing “DELETE” to schedule account deletion.</>]],
  ['p','The 30-day grace period begins immediately. Users can log back in before it ends to cancel the deletion request.'],
  ['h2','1 · How to request deletion'],
  ['p','Open Account → Delete account in the app, or contact Conductor at support@conductor.ng. Once the request is received, the account is scheduled for deletion and enters a thirty (30) day deactivation period.'],
  ['h2','2 · Thirty (30) day grace period'],
  ['ol',[
    'The account is deactivated but not permanently deleted for thirty (30) days.',
    'If the user logs in or otherwise accesses the Platform using their credentials during that period, the deletion request is deemed withdrawn and the account is automatically reactivated. A new deletion request may be submitted at any time.',
    'Where the user is owed money on the account (e.g. a Wallet balance), Conductor will guide them through payout (typically to the verified bank account) as part of the deletion flow. The account cannot be permanently deleted while funds are undischarged.']],
  ['h2','3 · Timeline for deletion'],
  ['p','After the 30-day grace period, Conductor completes the deletion or anonymisation of eligible personal data within a reasonable further period and, in any event, in accordance with applicable legal and regulatory requirements. Certain information may remain in secure archives for the periods described below.'],
  ['h2','4 · Information that may not be deleted'],
  ['p','Notwithstanding a deletion request, certain categories of information may be retained where retention is necessary or permitted by law, including:'],
  ['ol',[
    <><b>Identity-verification records</b> — information used to verify User identity (including NIN records) may be retained where necessary to comply with legal, regulatory, security, fraud-prevention, or audit requirements.</>,
    <><b>Transaction and Trip records</b> — records relating to completed Trips, payments, receipts, disputes, complaints, refunds, and other transactional activity may be retained for accounting, tax, auditing, and legal-compliance purposes.</>,
    <><b>Safety and security information</b> — information necessary to investigate or prevent fraud, abuse, security incidents, violations of these Terms, or other unlawful activity, and to protect Users and the public.</>,
    <><b>Legal and regulatory requirements</b> — personal information subject to a legal-hold, court order, governmental directive, or valid regulatory request.</>,
    <><b>Anonymised or aggregated data</b> — information that has been irreversibly anonymised so that it can no longer identify the user may be retained and used for statistical analysis, service improvement, business planning, and other lawful purposes.</>]],
  ['h2','5 · Effect of permanent deletion'],
  ['p','Once an account is permanently deleted, access to the profile, Trip history, saved preferences, referrals, and other information associated with the account may be lost. Information retained under clause 4 will continue to be protected in accordance with the Privacy Policy and applicable law.'],
  ['h2','6 · Your acknowledgement'],
  ['p','By submitting a deletion request, users acknowledge and understand this Policy.']
  ]}/>;}

/* ---------------- Careers ---------------- */
function CareersPage(){
  useReveal();
  const roles=[
    ['Engineering','Mobile & platform engineers','React Native, NestJS, Postgres. You will own real surfaces end to end — booking, escrow, live trips — not tickets in a queue.'],
    ['Operations','City & driver operations','Onboard car owners, run the morning corridors, and turn what happens on the road into product. Lagos-based, on the ground.'],
    ['Trust & Safety','Safety investigators','Work the incident and dispute queue with GPS, chat and attendance evidence. Calm judgement under real stakes.'],
    ['Design','Product designer','One designer’s decisions reach every commuter. Systems thinking, a strong bar for craft, and comfort shipping weekly.']];
  return (<>
    <Header role="passenger"/>
    <main>
      <PageHero crumb="Careers" eyebrow="Careers" solo={true}
        title={<>Build the way Lagos <em>gets to work</em>.</>}
        lede="We are a small team solving a daily problem millions of people actually have. If you want your work in the hands of commuters this quarter — not this decade — this is the place."
        cta={[<a key="1" href="mailto:careers@conductor.ng" className="btn btn--primary btn--lg">See open roles<Icon name="arrow" size={18}/></a>,
              <a key="2" href="/about" className="btn btn--ghostline btn--lg">About the company</a>]}/>
      <section className="sec" style={{paddingTop:0}}><div className="wrap">
        <div className="vrow">
          {[['01','Ship weekly','Small team, short path from idea to production. What you build is live in days, not quarters.'],
            ['02','On the ground','We ride the corridors we build for. Product decisions start from the morning run, not a whiteboard.'],
            ['03','Own the outcome','You own a surface, its metrics, and the call on how to move them — with the context to make it well.'],
            ['04','Lagos-first','Built here, for here. The hard problems are ours to solve, and they are worth solving.']].map(([n,t,b],i)=>
            <Rv key={t} d={i*80} tag="div">
              <span className="vrow__n">{n}</span><h4>{t}</h4><p>{b}</p>
            </Rv>)}
        </div>
      </div></section>
      <section className="sec sec--cream"><div className="wrap">
        <SHead eyebrow="Where we’re hiring" title={<>Roles we are <em>usually</em> open to.</>}
          lede="Even when a role is not listed, we read every serious note. Tell us what you would own and why it fits."/>
        <div className="grid2" style={{gap:'clamp(18px,2vw,24px)'}}>
          {roles.map(([tag,t,b],i)=>
            <Rv key={t} d={i*70} cls="card" style={{padding:'clamp(22px,2.4vw,30px)',display:'grid',gap:8}}>
              <p className="eyebrow" style={{margin:0}}>{tag}</p>
              <h3 className="h3" style={{fontSize:'clamp(19px,1.8vw,23px)'}}>{t}</h3>
              <p style={{color:'var(--fg-2)',lineHeight:1.55,margin:0}}>{b}</p>
              <a className="linkarrow" href={'mailto:careers@conductor.ng?subject=' + encodeURIComponent(t)} style={{marginTop:8,display:'inline-flex'}}>Apply for this<Icon name="arrow" size={15}/></a>
            </Rv>)}
        </div>
        <Rv d={200} style={{marginTop:30}}>
          <p className="lede" style={{margin:0}}>Nothing quite fits? Write to <a href="mailto:careers@conductor.ng">careers@conductor.ng</a> — tell us what you would build.</p>
        </Rv>
      </div></section>
      <Band title={<>Come and build the <em>morning run</em>.</>}
        lede="Small team, real stakes, work that ships. Send a note and let’s talk."/>
    </main>
    <Footer/>
  </>);
}

/* ---------------- Press ---------------- */
function PressPage(){
  useReveal();
  const facts=[
    ['Founded','2024 · Lagos, Nigeria'],
    ['What it is','A carpooling scheduling platform — publish the journey you’re already making, or take a seat on one that is.'],
    ['Where','Lagos and other Nigerian corridors'],
    ['Apps','Passenger and Car Owner apps, iOS and Android'],
    ['Company','Conductor Technology International Services Limited']];
  return (<>
    <Header role="passenger"/>
    <main>
      <PageHero crumb="Press" eyebrow="Press" solo={true}
        title={<>Press & <em>media</em>.</>}
        lede="What Conductor is, in the words we’d use ourselves — plus the facts, the boilerplate, and where to reach a person. For interviews, data or brand assets, write to press@conductor.ng."
        cta={[<a key="1" href="mailto:press@conductor.ng" className="btn btn--primary btn--lg">Contact press<Icon name="arrow" size={18}/></a>,
              <a key="2" href="#facts" className="btn btn--ghostline btn--lg">The quick facts</a>]}/>
      <section className="sec" style={{paddingTop:0}} id="facts"><div className="wrap">
        <SHead eyebrow="At a glance" title={<>The <em>quick facts</em>.</>}/>
        <div className="prfacts">
          {facts.map(([k,v],i)=>
            <Rv key={k} d={i*60} cls="prfacts__row">
              <span className="prfacts__k">{k}</span>
              <span className="prfacts__v">{v}</span>
            </Rv>)}
        </div>
      </div></section>
      <section className="sec sec--cream"><div className="wrap wrap--tight">
        <SHead eyebrow="Boilerplate" title={<>About Conductor, <em>in short</em>.</>}/>
        <p className="lede" style={{marginTop:0}}>Conductor is a carpooling scheduling platform for Nigerian commuters. People already driving a route publish it; people who need that route book a seat on it; and the cost of the journey is split between everyone travelling in the car. Identity is verified on both sides, fares are held in escrow and released per trip, and safety tooling — live tracking, trip-sharing and SOS — ships with every journey. The goal is simple: fewer cars carrying more people, on the roads Lagos already drives every morning.</p>
        <p className="lede" style={{marginTop:18}}>Conductor is operated by Conductor Technology International Services Limited. For interviews, figures or brand assets, contact <a href="mailto:press@conductor.ng">press@conductor.ng</a>.</p>
      </div></section>
      <Band title={<>Writing about how a city <em>moves</em>?</>}
        lede="We’re happy to help with data, context and a real person to talk to. press@conductor.ng."/>
    </main>
    <Footer/>
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<PrivacyPage/>);
