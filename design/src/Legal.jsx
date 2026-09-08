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
function PrivacyPage(){return <LegalDoc crumb="Privacy" eyebrow="Legal"
  title={<>Privacy <em>policy</em>.</>}
  intro="Conductor takes your privacy seriously. This Privacy Policy explains what personal information we collect, why we collect it, who we share it with, how long we keep it, and the rights you have under Nigerian data-protection law — including the Nigeria Data Protection Act 2023 (NDPA) and, where applicable, the Nigeria Data Protection Regulation (NDPR)."
  blocks={[
  ['h2','1 · Scope & roles'],
  ['p','This Policy applies to personal information we collect when you access or use the Platform, communicate with us, or otherwise interact with our services. For the purposes of the NDPA, Conductor is the Data Controller in respect of your personal information, save where a specific processing activity involves us acting as processor on behalf of another controller (for example, certain identity-verification activities where the controller is a licensed identity provider).'],
  ['h2','2 · What we collect'],
  ['p','We collect the following categories of information:'],
  ['ol',[
    <><b>Registration &amp; profile data:</b> name, date of birth, phone number, email, gender (where declared), photograph, password (hashed), preferred language, initial role (Passenger or Driver), and occupation category (optional).</>,
    <><b>Identity-verification data:</b> NIN and NIN-verification records; for Drivers, driver’s licence number, licence photograph, and licence verification records; vehicle registration papers, insurance certificate, and other supporting documents.</>,
    <><b>Trip &amp; usage data:</b> Bookings, Trips published, Trip-Days completed, cancellations, ratings, chat messages, service-recovery credits and referrals.</>,
    <><b>Location data:</b> pickup and drop-off coordinates, live GPS during a Trip, and area-level home / work coordinates captured during onboarding (see clause 6).</>,
    <><b>Financial data:</b> Wallet balances, transaction history, bank-account details submitted for withdrawals, and tokenised card details as held by our payment processor.</>,
    <><b>Device &amp; technical data:</b> device model, operating system, app version, IP address, session identifiers, telemetry (battery, network kind, GPS accuracy), and analytics events.</>,
    <><b>Safety data:</b> SOS activations, emergency contacts you nominate, incident reports, safety-relevant photos or recordings (e.g. vehicle photographs), and dispute records.</>,
    <><b>Communications:</b> messages exchanged in the in-app chat, support tickets, and notifications delivered via our providers.</>,
    <><b>Search &amp; preference data:</b> the routes and days you search, filters you apply, promotional codes you redeem, and preferences you set.</>]],
  ['h2','3 · How we use it'],
  ['p','We use personal information to:'],
  ['ul',[
    'operate the Platform — register your account, verify your identity, publish or book Trips, calculate fares, process payments, and settle earnings;',
    'keep the Platform safe — run our Trust & Safety systems, detect fraud, prevent abuse, investigate incidents, and respond to disputes;',
    'improve the Platform — understand how features are used, prioritise product decisions, calibrate pricing, and develop new features;',
    'communicate with you — send Trip notifications, service messages, safety alerts, receipts, and (where you have opted in or the law permits) promotional messages;',
    'meet legal, tax, and regulatory obligations — including obligations arising under the NDPA, NDPR, FCCPA, Federal Inland Revenue Service (FIRS) requirements, and any lawful requests by competent authorities;',
    'enforce our Terms and defend our legal rights.']],
  ['h2','4 · Legal bases (NDPA)'],
  ['p','We rely on one or more of the following lawful bases under the NDPA:'],
  ['ol',[
    <><b>Contract</b> — processing necessary to perform our services to you (e.g. matching you with Drivers, processing payments).</>,
    <><b>Legal obligation</b> — processing required by Nigerian law (e.g. VAT, KYC / identity verification, responding to lawful orders).</>,
    <><b>Legitimate interests</b> — where processing is necessary for our or a third party’s legitimate interests and not overridden by your rights and freedoms (e.g. fraud prevention, Platform integrity, research and product improvement using aggregated data).</>,
    <><b>Consent</b> — where we specifically ask for it (e.g. certain marketing communications, background-location tracking outside a Trip window).</>,
    <><b>Vital interests</b> — where processing is necessary to protect the life or physical safety of any person (e.g. SOS activations).</>]],
  ['h2','5 · Who we share with'],
  ['ol',[
    <><b>Other Users, on a need-to-know basis:</b> a Driver receives the Passenger’s first name, rating, and pickup / drop-off; a Passenger receives the Driver’s first name, rating, and Vehicle’s make / model / plate (partially masked in some contexts). We do not share full identity documents, home / work coordinates, or unmasked phone numbers between Users.</>,
    <><b>Service providers</b> under written contract and confidentiality obligations, including cloud hosting, payment processing (Paystack), mapping (Google Maps &amp; Places), notification orchestration (Novu, WhatsApp / Meta), identity verification (QoreID, VerifyMe), analytics, and customer-support tooling.</>,
    <><b>Regulators, courts, and law-enforcement agencies</b> where required by law, court order, or valid regulatory demand, or where we have a good-faith belief that disclosure is necessary to prevent harm, fraud, or a violation of law.</>,
    <><b>Corporate transactions</b> — in the event of a merger, acquisition, financing, insolvency, or sale of assets, information may be transferred to the counterparty, subject to appropriate protections.</>,
    <><b>With your consent</b> — e.g. where you connect a third-party service to your Conductor account, or authorise us to share information with a workplace-benefits scheme.</>]],
  ['p','We do not sell your personal information, and we do not use it for interest-based advertising to third parties.'],
  ['h2','6 · Location data'],
  ['ol',[
    'The Platform collects location data (a) at points where you actively use location features (searching, booking, setting home / work), (b) during Trips (for safety and to power in-Trip UX such as ETA and route replay), and (c) where you have granted the app background-location permission (for pickup-arrival detection when the phone is asleep).',
    'You may revoke location permission at any time through your device settings. Revoking permission may disable safety or matching features that require it.',
    'Location precision is minimised where possible. Home and work areas are stored as neighbourhood-level coordinates, not exact street addresses.',
    'We do not sell location data.']],
  ['h2','7 · National Identification Number (NIN)'],
  ['p','The following notice supplements this Policy in relation to NIN specifically, and forms part of it.'],
  ['ol',[
    <><b>Identity verification.</b> Your NIN is used to confirm that the identity you have registered is genuine and belongs to you. This helps us confirm the identity of both Drivers and Passengers and prevents the use of false, stolen, or fraudulent identities.</>,
    <><b>Safety and security.</b> NIN verification forms part of our safety measures. It supports accountability, deters misconduct, and protects the community from fraudulent or harmful activity.</>,
    <><b>Driver and Passenger authentication.</b> For Drivers, NIN verification is part of onboarding and due diligence to ensure that only properly identified individuals provide transportation services on the Platform. For Passengers, NIN verification reduces impersonation and promotes trust between all Users.</>,
    <><b>Fraud prevention and investigation.</b> Your NIN may be used to detect, prevent, investigate, and respond to fraud, identity theft, abuse of the Platform, or other activities that violate our Terms or applicable law.</>,
    <><b>Legal and regulatory compliance.</b> We may process your NIN to comply with applicable laws, lawful requests from competent authorities, and other requirements imposed by relevant governmental agencies.</>,
    <><b>Protection.</b> We treat your NIN as sensitive personal information and implement reasonable administrative, technical, and organisational measures to protect it against unauthorised access, disclosure, alteration, misuse, or loss. Access is restricted to authorised personnel and trusted service providers who require it to perform verification, security, or compliance functions on our behalf and who are bound by confidentiality and data-protection obligations.</>,
    <><b>No sale or marketing.</b> We do not sell your NIN and we do not use it for marketing.</>,
    <><b>Retention.</b> Your NIN is retained only for as long as necessary to fulfil the purposes above, comply with legal and regulatory requirements, resolve disputes, or enforce our contractual rights. Where retention is no longer required, we will securely delete or anonymise it in accordance with our retention schedule.</>,
    <><b>Your rights.</b> Subject to applicable law, you may request access, correction, objection, or exercise other rights available under NDPA (see clause 9 below).</>]],
  ['h2','8 · Retention'],
  ['p','We retain personal information only for as long as necessary for the purposes described in this Policy, or for such longer period as is required by law. Indicative retention windows (subject to specific legal, regulatory, or operational requirements):'],
  ['ul',[
    <><b>Account &amp; profile data</b> — while the account is active, and thereafter for a reasonable period to satisfy legal obligations, resolve disputes, and enforce our agreements.</>,
    <><b>Identity-verification records (including NIN, licences, vehicle documents)</b> — for the duration of the account and thereafter for such period as is required by anti-fraud, safety, tax, or regulatory obligations.</>,
    <><b>Trip, payment, and settlement records</b> — for a minimum of seven (7) years, or such longer period as required for accounting, tax, or audit purposes.</>,
    <><b>Search history &amp; usage telemetry</b> — up to 365 days by default (admin-tunable), used for personalisation and product research.</>,
    <><b>Chat and support communications</b> — for such period as is required to service tickets, respond to disputes, and comply with law.</>,
    <><b>Anonymised / aggregated data</b> — may be retained indefinitely.</>]],
  ['h2','9 · Your rights'],
  ['p','Subject to applicable law and to any specific conditions, you have the right to:'],
  ['ul',[
    'ask us to confirm whether we process your personal information and to receive a copy;',
    <>ask us to correct inaccurate or incomplete information;</>,
    <>ask us to delete personal information we no longer have a lawful basis to retain (see the <a href="/legal/account-deletion">Account &amp; Data Deletion Policy</a>);</>,
    'object to processing on grounds of your particular situation, or to withdraw a consent you previously gave;',
    'request restriction of processing in certain cases;',
    'request portability of personal information you provided to us, in a structured, commonly used, machine-readable format;',
    'lodge a complaint with the Nigeria Data Protection Commission (NDPC).']],
  ['p','To exercise a right, contact privacy@conductor.ng. We may need to verify your identity before responding. We will respond within the timeframe required by law and generally within thirty (30) days.'],
  ['h2','10 · Security & breaches'],
  ['ol',[
    'We implement administrative, technical, and organisational safeguards designed to protect personal information from unauthorised access, disclosure, alteration, misuse, or loss. These include encryption in transit, access controls, network segmentation, audit logs, and staff training.',
    'No system is completely secure. If you believe your account or personal information has been compromised, contact us immediately at security@conductor.ng.',
    'Where a personal-data breach is likely to result in a risk to affected individuals, we will notify the Nigeria Data Protection Commission and any affected individuals in accordance with the NDPA.']],
  ['h2','11 · Children'],
  ['p','The Platform is not intended for and may not be used by any person under the age of 18. We do not knowingly collect personal information from any person under 18. If we become aware that we have collected such information, we will delete it and terminate the associated account.'],
  ['h2','12 · Cross-border transfers'],
  ['p','Some of our service providers process personal information outside Nigeria. Where personal information is transferred outside Nigeria, we do so in accordance with the NDPA, including by relying on adequacy decisions, standard contractual clauses, binding corporate rules, or one of the other lawful transfer mechanisms recognised under Nigerian law.'],
  ['h2','13 · Contact & Data Protection Officer (DPO)'],
  ['p','Questions, requests, or complaints about your privacy or personal information: privacy@conductor.ng.']
  ]}/>;}
/* ---------------- Terms ---------------- */
function TermsPage(){return <LegalDoc crumb="Terms" eyebrow="Legal"
  title={<>Terms of <em>service</em>.</>}
  intro="These Terms of Service (the “Terms”) govern your access to and use of the Conductor.ng mobile applications, website, and related services (together, the “Platform”). By registering for or using the Platform, you agree to these Terms in full. If you do not agree, do not use the Platform."
  blocks={[
  ['h2','1 · Definitions'],
  ['ol',[
    <><b>“Company”, “we”, “us”, “our”, “Conductor”</b> Conductor.ng and its affiliated entities.</>,
    <><b>“Platform”</b> The Conductor mobile applications (passenger and driver), the website at conductor.ng, and all connected services.</>,
    <><b>“User”, “you”</b> Any individual who registers for or uses the Platform, whether as a Passenger, a Driver, or both.</>,
    <><b>“Passenger”</b> A User who books a seat on a Trip through the Platform.</>,
    <><b>“Driver” (also referred to as “Car Owner”)</b> A User who publishes and operates Trips on the Platform using a Vehicle they own or are lawfully authorised to operate. Conductor’s community and in-app materials refer to Drivers as “Car Owners”; the two terms are interchangeable for the purposes of these Terms.</>,
    <><b>“Trip”</b> A scheduled recurring ride published by a Driver on the Platform, with a defined pickup, drop-off, days of the week, and departure time.</>,
    <><b>“Trip-Day”</b> A single occurrence of a Trip on a specific calendar day. Bookings, payments, and settlement all operate at the Trip-Day level.</>,
    <><b>“Booking”</b> A Passenger’s reservation of a specific seat on one or more Trip-Days.</>,
    <><b>“Wallet”</b> The in-app balance held to the credit of a User, comprising sub-balances for spendable funds, referral rewards, and promotional credits.</>,
    <><b>“Escrow”</b> The mechanism by which Passenger payments are held by the Company (in dedicated Company-controlled accounts) pending completion or resolution of a Trip-Day.</>,
    <><b>“Settlement”</b> The automated process by which the Company disburses Trip-Day proceeds from Escrow to the applicable Driver and Company accounts after the Trip-Day is complete.</>,
    <><b>“Service Charge”</b> The commission, platform fee, applicable taxes (including VAT), and other charges deducted by the Company from each Trip.</>,
    <><b>“NIN”</b> A User’s Nigerian National Identification Number, verified through licensed identity providers.</>]],
  ['h2','2 · Eligibility & account'],
  ['ol',[
    'You must be at least 18 years old, have full legal capacity to enter contracts under Nigerian law, and be resident in a jurisdiction where the Platform is offered.',
    'Each User must register only one account. You are responsible for all activity conducted under your account, including any activity by anyone you permit to use it.',
    'You must provide accurate, current, and complete information during registration and keep it updated. You must not impersonate any person, misrepresent your identity, or use another person’s NIN, phone number, email, bank account, or vehicle documents.',
    'You may be required to complete identity verification (including NIN verification and, for Drivers, driver’s licence and vehicle-document verification) before certain features are unlocked or before Bookings, publishing, or payouts can occur.',
    'We may refuse registration, restrict features, or terminate accounts at our discretion where we reasonably suspect false information, fraudulent activity, or a risk to other Users or the Platform.']],
  ['h2','3 · The service'],
  ['ol',[
    <><b>Marketplace, not a transport provider.</b> Conductor is a technology platform that connects independent Drivers with Passengers seeking scheduled recurring transportation. We do not own, lease, operate, or maintain any Vehicles, and we do not employ any Driver. Drivers are independent contractors and are not agents, employees, partners, or joint venturers of the Company.</>,
    <><b>Scheduled carpooling only.</b> The Platform is designed for regular, recurring commutes between fixed pickup and drop-off points on set days at set times. It is not an on-demand ride-hailing service. Departure times are set by the Driver, not the Passenger.</>,
    <><b>Same seat, same route.</b> When a Passenger books a Trip, the same seat is generally reserved for them on every eligible Trip-Day of that Booking, subject to availability, the Driver’s publication of the applicable Trip-Days, and these Terms.</>,
    <><b>Fixed pricing.</b> Fares are calculated at the time of Booking using the Company’s pricing engine and are locked at Booking. There is no surge, dynamic, or auction-based pricing.</>,
    <><b>Ancillary services.</b> The Company may from time to time offer additional features, including in-app messaging, incident reporting, promotional rewards, referral programmes, wallet withdrawals, and other services. Such features are subject to these Terms and any additional terms published for that specific feature.</>]],
  ['h2','4 · Passenger terms'],
  ['ol',[
    <><b>Booking a seat.</b> You may book one or more seats on a Trip for one or more Trip-Days. Each seat reservation binds you to pay the full fare for the booked Trip-Days unless a cancellation, no-show, or refund rule under these Terms applies.</>,
    <><b>Punctuality.</b> You must be at the agreed pickup point at least five (5) minutes before the Driver’s scheduled departure time. Drivers are entitled to depart at the scheduled time; a Driver waiting longer than the applicable grace period (published in-app and generally not exceeding ten (10) minutes) is a courtesy, not an obligation, and may be treated as a no-show against you.</>,
    <><b>Accurate information.</b> You must provide correct pickup and drop-off details when booking. Providing false, inaccurate, or misleading information may result in ineligibility for a refund, additional fees, or account restriction.</>,
    <><b>Fare payment.</b> You authorise the Company to charge the applicable fare, taxes, and any lawful additional charges to your selected payment method or Wallet when you confirm a Booking.</>,
    <><b>Conduct.</b> You must treat Drivers, other Passengers, and their property with respect and comply with the reasonable safety instructions of the Driver at all times. Prohibited conduct is set out at clause 11.</>,
    <><b>Items in the Vehicle.</b> You are solely responsible for your personal belongings. The Company is not liable for items lost, damaged, or left in a Vehicle, though we will provide reasonable assistance to help you contact the Driver.</>]],
  ['h2','5 · Driver terms'],
  ['ol',[
    <><b>Independent contractor.</b> You confirm that you provide transportation services as an independent contractor. Nothing in these Terms creates any employment, agency, joint-venture, franchise, or partnership relationship between you and the Company. You are solely responsible for your own tax obligations arising from your activity on the Platform.</>,
    <><b>Vehicle and documents.</b> You must comply with clause 6 (Vehicles &amp; documents) at all times.</>,
    <><b>Publishing a Trip.</b> When you publish a Trip you undertake to operate every Trip-Day you have offered, on time, at the fare shown, unless a valid cancellation, suspension, force majeure event, or lawful reason permits otherwise.</>,
    <><b>Safe operation.</b> You must operate the Vehicle in a safe, lawful, and professional manner; comply with all traffic, licensing, and insurance laws; keep the Vehicle roadworthy and clean; and refrain from operating under the influence of alcohol, drugs, or medication that impairs driving.</>,
    <><b>Passenger treatment.</b> You must treat Passengers with respect and courtesy, refrain from harassment or discrimination, and comply with the anti-discrimination principles at clause 11.</>,
    <><b>Trip status updates.</b> You must use the in-app controls to mark Trip-Day events accurately (departed, arrived, completed, cancelled, suspended) so Passengers and the settlement engine receive correct information.</>,
    <><b>Payouts.</b> Payouts are made from Escrow to your registered bank account or Wallet in accordance with clause 7 and the Refund Policy. You are responsible for keeping your bank details current.</>,
    <><b>Suspension of a Trip-Day by the Driver.</b> Where you are unable to operate a specific Trip-Day (e.g. vehicle unavailability, personal emergency), you must suspend the Trip-Day in-app as early as possible so affected Passengers can plan alternatives. Suspended Trip-Days are not chargeable to the Passenger.</>]],
  ['h2','6 · Vehicles & documents'],
  ['p','The Vehicle you use must be:'],
  ['ul',[
    'owned by you or operated with the documented consent of the registered owner;',
    'currently registered, insured for public use (or otherwise adequately insured for the passenger-carrying activity), and possessing all valid particulars and permits required by law;',
    'mechanically sound, clean, and free from defects that would render it unsafe;',
    'seat-belted for every occupied seat.']],
  ['ol',[
    'You must upload and keep current the vehicle’s registration papers, insurance certificate, and any other documents the Company requires (which may include a licence, roadworthiness certificate, other vehicle’s documents.).',
    'You must upload vehicle photographs for identification',
    'The Company may verify submitted documents using licensed third-party verification providers and may re-verify at any time. Documents that expire, are revoked, or are found to be false will result in your Vehicle being marked unavailable for publishing until remedied. Providing false documents is a ground for permanent termination.',
    'You may register up to three (3) Vehicles per account (subject to change by the Company on notice). All must be individually verified.']],
  ['h2','7 · Payments, escrow, service fee'],
  ['ol',[
    <><b>Fare structure.</b> Fares are composed of the base ride fare, driver time component, driver service charge, passenger service charge, VAT, applicable state tax, and rounding — computed by the Company’s pricing engine, versioned per Trip, and locked at Booking time.</>,
    <><b>Payment methods.</b> Passengers may pay via debit/credit card, bank transfer, or Wallet balance, using the payment providers integrated into the Platform. Certain payment methods may require additional identity verification.</>,
    <><b>Escrow.</b> Amounts paid by a Passenger are held in a Company-controlled escrow account allocated per Trip-Day, per cost component, until the Trip-Day is complete or otherwise resolved under these Terms and the Refund Policy.</>,
    <><b>Settlement.</b> After a Trip-Day is complete, the Company’s automated settlement engine routes the applicable amounts from Escrow to (a) the Driver’s Wallet or bank account (the Driver’s net earnings after Service Charge), and (b) the Company’s accounts (Service Charge, VAT, applicable taxes, and other lawful deductions). Settlement is generally initiated within 24 hours after the Trip-Day is complete.</>,
    <><b>Never-reverse window.</b> Once 26 hours have elapsed after Trip-Day completion, funds are considered settled and are not automatically reversible from a Driver’s account. Disputes raised after this window are handled through the Company’s dispute engine and may be resolved by make-good credits, wallet credits, or other remedies rather than reversal from the Driver’s Wallet.</>,
    <><b>Wallet.</b> Wallet balances comprise (a) spendable funds; (b) referral rewards; and (c) promotional credits. Referral rewards and promotional credits are subject to the specific terms of each programme and are not redeemable for cash.</>,
    <><b>Wallet withdrawals.</b> Users may withdraw spendable Wallet funds to a verified bank account. Withdrawals may be subject to identity re-verification, minimum amounts, fees, and lawful delays for fraud prevention. Referral rewards may require transfer to the spendable Wallet before withdrawal.</>,
    <><b>Service Charge.</b> The Company deducts a Service Charge from each Trip-Day settlement (comprising commission, applicable VAT, and any other lawful charges). Rates are disclosed in-app and are subject to reasonable change on notice.</>,
    <><b>Taxes.</b> Prices displayed to Passengers are inclusive of applicable VAT. The Company will remit VAT in accordance with Nigerian tax law. Drivers are solely responsible for their own income tax and any other personal tax obligations.</>,
    <><b>Failed payments.</b> Where a payment fails, the Company may retry the charge, invoice the Passenger, deduct from Wallet balance, or restrict Booking rights until settled.</>]],
  ['h2','8 · Cancellations, no-shows, suspensions'],
  ['p','Detailed rules — including the two-tier refund model, per-Trip-Day treatment, and how attendance flags (rode, no-show, cancel-early, cancel-late, suspended, skipped-by-driver) affect refunds and payouts — are set out in the Refund Policy. In summary:'],
  ['ol',[
    'Passenger cancellation before Driver acceptance: full refund of any pre-authorised or held amount.',
    'Passenger cancellation early (before the Driver’s cut-off window on the day): refund of the fare paid for the affected Trip-Day, in accordance with the Refund Policy.',
    'Passenger cancellation late, or no-show: the fare for that Trip-Day is due to the Driver in the ordinary course; no refund is due unless specific facts qualify under the Refund Policy.',
    'Driver-suspended Trip-Day: the Passenger is not charged for that Trip-Day and any pre-held amount is released back.',
    'Driver cancellation of a whole Trip after acceptance: the Passenger receives a full refund of affected Trip-Days and, at the Company’s discretion, may receive a service-recovery credit.',
    'Service failure by the Driver (e.g. Driver did not arrive, unroadworthy vehicle, misconduct): refund pursuant to the Refund Policy and possible sanction under clause 12.',
    'Force majeure and external circumstances: see clause 15.']],
  ['h2','9 · Ratings & reviews'],
  ['ol',[
    'Passengers and Drivers may rate each other and leave feedback in accordance with the in-app flow.',
    'To prevent retaliation and revenge-rating, ratings for a given week’s Trip-Days are only released once a defined weekly window is complete. Individual per-day ratings are not exposed in-app.',
    'Ratings and free-text feedback must be honest, based on the User’s own experience, and free from unlawful, defamatory, obscene, threatening, or discriminatory content.',
    'The Company may remove ratings or reviews that violate these Terms and may use ratings, together with other signals, to inform Trust & Safety decisions (including suspension or termination).']],
  ['h2','10 · Safety & SOS'],
  ['ol',[
    'Every User’s safety is our shared priority. The Platform provides safety tooling including live GPS tracking during a Trip, an in-app SOS button, incident reporting, verified emergency contacts, and driver / passenger identity verification.',
    'By using the Platform you consent to the collection and processing of location data during Trips for safety, dispute-resolution, and operational purposes as further described in the Privacy Policy.',
    'In an emergency, use the in-app SOS. The SOS may notify your registered emergency contacts, the Company’s safety team, and, where warranted, law-enforcement or medical services.',
    'The Company is not a first responder. Where SOS or safety features do not result in immediate assistance, you should contact local emergency services without delay.',
    'The Company may investigate any safety incident reported through or discovered on the Platform, may share information with law enforcement or regulators as permitted or required by law, and may suspend accounts pending investigation.']],
  ['h2','11 · Prohibited conduct'],
  ['p','You must not, and must not attempt to:'],
  ['ul',[
    'use the Platform for any unlawful purpose, or in violation of any Nigerian federal, state, or local law or regulation;',
    'impersonate another person, misrepresent your identity, or use another person’s account, NIN, licence, or payment method;',
    'discriminate against any User on the grounds of race, colour, ethnicity, nationality, tribe, religion, gender, gender identity, sexual orientation, disability, age (subject to eligibility), marital status, or any other protected characteristic under Nigerian law;',
    'harass, threaten, stalk, intimidate, physically or sexually assault, or verbally abuse any User or third party;',
    'carry or transport any weapon, explosive, controlled substance, illegal drug, hazardous material, live animal (other than a legitimate service animal), or any other item prohibited by law or by these Terms;',
    'operate a Vehicle under the influence of alcohol, drugs, or any impairing substance; drive recklessly; or otherwise endanger the safety of any occupant, other road user, or the public;',
    'solicit or accept off-platform payments for Trips, or otherwise attempt to circumvent the Platform’s payment, escrow, or fare-calculation systems;',
    'manipulate, tamper with, or exploit the Platform’s ratings, referrals, promotions, wallet, or any other feature;',
    'use the Platform to send spam, phishing content, malware, or any unsolicited commercial communications;',
    'scrape, crawl, reverse-engineer, decompile, or otherwise attempt to derive the source code of the Platform, or use bots or automation to interact with the Platform;',
    'infringe or misappropriate any intellectual property or privacy right of the Company or of any third party;',
    'engage in any activity that we reasonably determine to be fraudulent, abusive, deceptive, or harmful to Users, drivers, third parties, or the Platform’s integrity.']],
  ['h2','12 · Suspension & termination'],
  ['p','We may, at our discretion and with such notice as is reasonable in the circumstances, suspend, restrict, or terminate your access to the Platform in whole or in part where:'],
  ['ul',[
    'you have breached these Terms or any policy incorporated by reference;',
    'we reasonably suspect fraud, misuse, or a safety concern;',
    'a legal or regulatory obligation requires us to;',
    'your account has been inactive for a prolonged period; or',
    'your documents (NIN, licence, insurance) have lapsed, been revoked, or been found invalid.']],
  ['ol',[
    'Suspensions may be temporary or indefinite; certain suspensions carry over between accounts where a suspended identity re-registers.',
    'Where a suspension or termination is capable of appeal, the appeal channel will be identified in-app. The Company’s determination on appeal is final for platform-access purposes, without prejudice to any legal right you may have.',
    'Termination does not extinguish accrued rights or obligations. Certain records (financial, safety, identity-verification) are retained after termination as set out in the Privacy Policy and the Account & Data Deletion Policy.']],
  ['h2','13 · Disclaimers & limitation of liability'],
  ['ol',[
    <><b>“As is”.</b> Except as expressly stated in these Terms or as required by non-excludable Nigerian law, the Platform and all services are provided “as is” and “as available”, without warranties of any kind, express or implied, including implied warranties of merchantability, fitness for a particular purpose, non-infringement, availability, or uninterrupted operation.</>,
    <><b>Marketplace disclaimer.</b> We do not operate Vehicles or provide transportation services. We do not warrant, endorse, or guarantee the acts, omissions, roadworthiness of vehicles, driving skill, punctuality, honesty, or physical safety of any User. Each Trip is a contract between the applicable Passenger(s) and Driver, facilitated by the Platform.</>,
    <><b>No liability for third-party services.</b> The Platform integrates with third-party services (payments, maps, notifications, identity verification, etc.). We are not liable for the acts or omissions of those third parties.</>,
    <><b>Excluded losses.</b> To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, consequential, exemplary, or punitive damages; loss of profit, revenue, business, opportunity, goodwill, or anticipated savings; loss or corruption of data; or any loss arising from a User’s inability to use the Platform.</>,
    <><b>Non-excludable rights.</b> Nothing in these Terms excludes or limits any liability that cannot be excluded or limited under Nigerian law, including under the Federal Competition and Consumer Protection Act 2018 (FCCPA) or any other applicable statute.</>]],
  ['h2','14 · Indemnity'],
  ['p','To the maximum extent permitted by law, you shall defend, indemnify, and hold harmless the Company, its officers, directors, employees, agents, contractors, and affiliates from and against any and all claims, demands, actions, proceedings, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or in connection with:'],
  ['ul',[
    'your breach of these Terms or of any policy incorporated by reference;',
    'your violation of any applicable law or regulation;',
    'your infringement of any right of any third party;',
    'your negligent or wilful act or omission in connection with any Trip; or',
    'any content, statement, review, or communication you post, transmit, or make available via the Platform.']],
  ['h2','15 · Force majeure & uncontrollable circumstances'],
  ['p','Neither party is liable for delay or non-performance to the extent caused by circumstances beyond that party’s reasonable control, including acts of God, severe weather (flooding, storms), pandemics or epidemics, government actions, curfews, roadblocks, protests, civil unrest, strikes affecting third-party services, telecommunications or utility failures, or accidents caused by third parties. Where a Trip-Day is disrupted by such an event, no refund is due unless the Refund Policy expressly provides otherwise or the Company decides at its discretion to grant a service-recovery credit.'],
  ['h2','16 · Intellectual property'],
  ['ol',[
    'The Platform, including the Conductor name, mark, logo, software, code, designs, illustrations, copy, and other content (excluding User content) is owned by the Company or its licensors and is protected by copyright, trademark, and other intellectual-property laws.',
    'Subject to your compliance with these Terms, we grant you a limited, personal, non-exclusive, non-transferable, non-sublicensable, revocable licence to install and use the Platform on a device you own or control, solely for your personal use of the services as intended.',
    'You retain ownership of the content you post to the Platform (photos, ratings, reviews, chat messages, etc.). By posting it, you grant the Company a perpetual, worldwide, royalty-free, sublicensable licence to host, store, reproduce, adapt, publish, and use that content for the purpose of operating, improving, promoting, and providing the Platform, subject to the Privacy Policy.',
    'You must not remove, obscure, or alter any proprietary notice on the Platform, or use the Company’s marks without our prior written consent (except for factual, nominative reference).']],
  ['h2','17 · Third-party services'],
  ['p','The Platform integrates with third-party services, including without limitation Google Maps and Places (mapping and geocoding), Paystack (payments), Novu (notification orchestration), QoreID / VerifyMe (identity verification), and cloud-hosting providers. Your use of those services through the Platform is subject to the applicable provider’s terms, and we are not responsible for the acts or omissions of those providers. Sensitive data shared with a provider is done so on the basis of the provider’s own contractual and legal duties to us.'],
  ['h2','18 · Dispute resolution & governing law'],
  ['ol',[
    <><b>Escalation first.</b> Before commencing formal proceedings, you agree to first raise your complaint through our in-app customer-support channel or by email to support@conductor.ng. We commit to acknowledge your complaint within seven (7) business days and to work in good faith to resolve it.</>,
    <><b>Mediation.</b> Where a dispute is not resolved through customer support within thirty (30) days, either party may propose non-binding mediation seated in Lagos State under mediation rules acceptable to both parties.</>,
    <><b>Arbitration or court.</b> Where mediation fails or is declined, the dispute shall be finally settled by arbitration under the Arbitration and Mediation Act 2023, seated in Lagos State, before a sole arbitrator agreed between the parties or, failing agreement, appointed by the Lagos Chamber of Commerce International Arbitration Centre. The language of arbitration is English. Nothing in this clause prevents either party from applying to a competent court for urgent injunctive relief, or from bringing a Passenger’s consumer-protection claim before the Federal Competition and Consumer Protection Tribunal or another statutory forum where that forum is exclusively competent.</>,
    <><b>Class-action waiver.</b> To the extent permitted by law, you and we each agree to resolve disputes only in an individual capacity and not as a class member, class representative, or in any similar collective proceeding.</>,
    <><b>Governing law.</b> These Terms are governed by the laws of the Federal Republic of Nigeria, without regard to conflict-of-law principles.</>,
    <><b>Venue for non-arbitrable matters.</b> Any dispute not subject to arbitration shall be brought exclusively in the courts of Lagos State, and the parties submit to their exclusive jurisdiction.</>]],
  ['h2','19 · Changes to these Terms'],
  ['p','We may modify these Terms from time to time. Where a change materially affects your rights or obligations, we will provide reasonable notice via the Platform or the email associated with your account, and will identify an effective date. Your continued use of the Platform after the effective date constitutes acceptance of the modified Terms. If you do not agree to a material change, you must stop using the Platform.'],
  ['h2','20 · General'],
  ['ol',[
    <><b>Entire agreement.</b> These Terms, together with the Privacy Policy, Refund Policy, Account &amp; Data Deletion Policy, Community Guidelines, and any Driver Addendum, constitute the entire agreement between you and the Company in relation to the Platform, and supersede any prior agreement or understanding on the subject.</>,
    <><b>Severability.</b> If any provision is held invalid or unenforceable, that provision shall be modified to the minimum extent necessary to be enforceable, or, failing that, severed; the remaining provisions continue in force.</>,
    <><b>Waiver.</b> A failure or delay in exercising a right is not a waiver of that right.</>,
    <><b>Assignment.</b> You may not assign or transfer these Terms without our written consent. We may assign these Terms to any successor or affiliate, or in connection with a merger, sale, or restructuring.</>,
    <><b>Notices.</b> We will send notices to the email or in-app inbox on your account. You may send notices to us via support@conductor.ng or the physical address published on our website.</>,
    <><b>No third-party beneficiaries</b> — save for our affiliates, officers, directors, employees, and agents in respect of the indemnity at clause 14.</>,
    <><b>Survival.</b> Clauses relating to Payments (7), Cancellations (8), Ratings and Reviews (9), Prohibited conduct (11), Suspension (12), Disclaimers and liability (13), Indemnity (14), IP (16), Dispute resolution (18), and this clause 20 survive termination.</>]]
  ]}/>;}
/* ---------------- Passenger policy ---------------- */
function PassengerPolicyPage(){return <LegalDoc crumb="Passenger policy" eyebrow="Legal"
  title={<>Passenger <em>policy</em>.</>}
  intro="This Policy is written directly to you as a Passenger. It supplements the Terms of Service and, where a Passenger-specific matter arises, prevails over any general provision. Every commitment we make to you is here; every commitment you make to Conductors and to Car Owners is here too."
  blocks={[
  ['h2','1 · Your rights'],
  ['p','As a Passenger on the Platform, you are entitled to:'],
  ['ol',[
    <><b>Transparent pricing.</b> The full fare, including VAT and any applicable tax, is shown before you confirm a Booking and is locked at Booking. There is no surge and no hidden fee.</>,
    <><b>Escrowed payment.</b> Your fare is held in Company-controlled escrow, per Trip-Day, until the Trip-Day is complete or resolved.</>,
    <><b>The same seat, same route.</b> When you book a recurring Trip, the same seat is generally reserved for you on every eligible Trip-Day, subject to the Car Owner’s continued publication of the Trip-Days.</>,
    <><b>Refund per the Refund Policy.</b> A pre-departure cancellation window inside which you may cancel without loss; full refund where the Car Owner cancels, no-shows, presents an unroadworthy Vehicle, or the Trip is not delivered as promised.</>,
    <><b>Verified Car Owners.</b> Every Car Owner must complete NIN, licence, and vehicle-document verification before publishing.</>,
    <><b>Safety tooling.</b> In-app SOS, live GPS tracking on your Trip, an anonymised in-app chat channel with the Car Owner, and Trust &amp; Safety support for any incident.</>,
    <><b>Honest ratings.</b> Weekly release windows to prevent revenge-rating from a Car Owner. Written feedback is confidential save for lawful disclosure and internal review.</>,
    <><b>Respectful treatment.</b> Freedom from discrimination, harassment, and inappropriate conduct.</>,
    <><b>Appeal.</b> Any suspension or termination is appealable in accordance with the Code of Conduct.</>,
    <><b>Data rights.</b> Access, correction, deletion (subject to the Deletion Policy), portability, and objection rights under the Nigeria Data Protection Act 2023, exercisable via privacy@conductor.ng.</>,
    'A dispute channel that responds within seven (7) business days, with escalation to mediation and, where necessary, arbitration in Lagos.']],
  ['h2','2 · Your obligations'],
  ['ol',[
    'Comply with the Terms of Service, this Policy, the Code of Conduct, and applicable Nigerian law.',
    'Provide truthful information at signup, including your NIN where verification is required.',
    'Provide accurate pickup and drop-off details when booking.',
    'Be punctual. Be at the pickup point at least five (5) minutes before departure and do not expect the Car Owner to wait beyond the published grace period.',
    'Pay all applicable fares, fees, and taxes through the Platform.',
    'Treat the Car Owner, other Passengers, and the Vehicle with respect.',
    'Wear a seat belt at every occupied position.',
    'Do not carry weapons, drugs, explosives, hazardous materials, or any item prohibited by law.',
    'Do not solicit or offer off-platform payment for a Trip.',
    'Do not transfer, share, or resell your seat to another person without the Car Owner’s knowledge and Platform approval.',
    'Rate honestly and use in-app messaging only for operational communication with the Car Owner.']],
  ['h2','3 · Before the ride'],
  ['ol',[
    <><b>Book the seat you need.</b> Choose your seat position at Booking; the Car Owner is notified and the seat is soft-reserved.</>,
    <><b>Confirm pickup.</b> Check the pickup pin the day before. If your working pattern changes, adjust or cancel before the cut-off to avoid a late-cancellation charge.</>,
    <><b>Nominate an emergency contact.</b> Emergency contacts are notified when you activate SOS. You may nominate up to a small number in-app.</>,
    <><b>Verify the Vehicle.</b> At pickup, confirm the Vehicle’s make, model, colour, and (partially masked) plate against what the app shows.</>,
    <><b>Verify the Car Owner.</b> Confirm the Car Owner’s name and photograph match the person driving. If they do not, do not board; report in-app.</>]],
  ['h2','4 · During the ride'],
  ['ol',[
    'Wear your seat belt.',
    'Do not distract the driver. Do not tamper with the Vehicle’s controls, doors, or mirrors.',
    'Do not eat, smoke, or vape in the Vehicle without permission.',
    'Do not play personal audio at volume; use earphones.',
    'Respect the seat you booked. Do not encroach on adjoining seats or unclear the aisle.',
    'If the Car Owner drives dangerously, is intoxicated, or acts in a way that breaches the Code of Conduct, ask them to stop; if it continues, activate SOS or ask to alight at the next safe stop and report the incident.',
    'Live-track is on by default during your Trip. You may share your live location with an emergency contact from the in-Trip screen.']],
  ['h2','5 · After the ride'],
  ['ol',[
    <><b>Take your belongings.</b> The Company is not liable for items lost in a Vehicle, though we will help you contact the Car Owner.</>,
    <><b>Rate the Car Owner honestly.</b> Weekly release windows apply.</>,
    'If something went wrong, report it — open the Trip-Day and tap “Report an issue” or email support@conductor.ng.',
    'Refunds (where due) are credited to your Wallet immediately or within 24 hours. Bank refunds (where applicable) take 5 – 15 business days.']],
  ['h2','6 · Fares, wallet & refunds'],
  ['ol',[
    'Fares are inclusive of VAT. The fare is calculated by the Company’s pricing engine, versioned per Trip, and locked at Booking.',
    'Accepted payment methods, minimums, and processing fees are displayed at checkout.',
    'Your Wallet has spendable funds, referral rewards, and promotional credits — each with its own rules. Only spendable funds are directly withdrawable.',
    'Refunds follow the Refund Policy. In summary: full refund for cancellations before Car Owner acceptance; full refund for the Trip-Day where the Car Owner cancels, no-shows, or fails to deliver the ride; no refund for a Passenger no-show; late-cancellation and no-show handling is per the published cut-off and the attendance-flag model.',
    'The 26-hour never-reverse window applies to Car Owner settlement. Disputes raised after 26 hours are handled through the dispute engine and, where you win, may be paid as a Wallet credit or bank refund.']],
  ['h2','7 · Safety & SOS'],
  ['ol',[
    'Use the in-app SOS whenever you feel unsafe. It notifies your emergency contacts, our safety team, and, where warranted, dispatches assistance.',
    'In an immediate emergency, call 112 or your local police service in parallel with SOS.',
    'Live GPS runs on every Trip. You may share your Trip live-link with an emergency contact.',
    'The Company is not a first responder and does not guarantee response times. Where SOS does not resolve the situation, do not delay contacting local emergency services.',
    'False SOS activations are a serious violation under the Code of Conduct.']],
  ['h2','8 · Complaints & disputes'],
  ['ol',[
    <><b>Step 1 — In-app.</b> Open the affected Trip-Day and tap “Report an issue”. We acknowledge within seven (7) business days.</>,
    <><b>Step 2 — Escalation.</b> If unresolved, email disputes@conductor.ng. We aim to close the matter within thirty (30) days.</>,
    <><b>Step 3 — Mediation.</b> Where a matter cannot be resolved through support, either side may propose non-binding mediation in Lagos State.</>,
    <><b>Step 4 — Arbitration or court.</b> Under the Terms of Service, matters that survive the above go to arbitration in Lagos under the Arbitration and Mediation Act 2023, subject to the enforceability of that provision under Nigerian consumer-protection law and your statutory right to bring certain claims before the Federal Competition and Consumer Protection Tribunal.</>,
    <><b>Regulator.</b> You may lodge a data-protection complaint with the Nigeria Data Protection Commission (ndpc.gov.ng) and, for other consumer matters, with the Federal Competition and Consumer Protection Commission (fccpc.gov.ng).</>]],
  ['h2','9 · Suspension & termination'],
  ['p','The suspension, termination, appeal, and identity-ban provisions in the Terms of Service and the Code of Conduct apply. Common reasons a Passenger’s account may be restricted include: fraudulent refund claims, chronic no-shows or late cancellations that harm Car Owners’ schedules, off-platform payment attempts, and any zero-tolerance breach under the Code of Conduct.'],
  ['h2','10 · Data & privacy summary'],
  ['p',<>Full detail is in the <a href="/legal/privacy">Privacy Policy</a>. In summary: we collect the information necessary to run your Bookings, keep you safe, comply with the law, and improve the service; we do not sell your personal information; we do not use it for advertising to third parties; we share only with Car Owners on a need-to-know basis, with our vetted service providers under contract, and with authorities where the law requires. Your NIN is treated as sensitive personal information under section 7 of the <a href="/legal/privacy">Privacy Policy</a>.</>]
  ]}/>;}

/* ---------------- Car owner policy ---------------- */
function CarOwnerPolicyPage(){return <LegalDoc crumb="Car owner policy" eyebrow="Legal"
  title={<>Car owner <em>policy</em>.</>}
  intro="This Policy is written directly to you as a Car Owner (referred to in the Terms of Service as a “Driver”). It supplements the Terms and, where a Car Owner-specific matter arises, prevails over any general provision. Every commitment we make to you is here; every commitment you make to Conductor and to Passengers is here too."
  blocks={[
  ['h2','1 · Your status'],
  ['ol',[
    'You provide transportation services as an independent contractor using a Vehicle you own or are lawfully authorised to operate.',
    'Nothing in these Terms, this Policy, or your listing on the Platform creates an employment, agency, partnership, franchise, or joint-venture relationship between you and the Company.',
    'You retain full control over when you publish Trips, which Bookings you accept, and how you operate your Vehicle, subject to the safety, conduct, and legal requirements that apply to public-facing transportation activity in Nigeria.',
    'You are free to provide the same or similar services outside the Platform and to use competing platforms.',
    'You are solely responsible for your own income tax and any personal tax reporting arising from your Platform earnings.']],
  ['h2','2 · Your rights'],
  ['p','As a Car Owner on the Platform, you are entitled to:'],
  ['ol',[
    <><b>Transparent pricing.</b> Every Trip you publish is priced using our published pricing engine; the calculation and its components are visible in-app.</>,
    <><b>Escrowed fares.</b> Passenger fares for each Trip-Day are held in Company-controlled escrow until the Trip-Day is complete or resolved.</>,
    <><b>Timely payout.</b> Your net earnings for each Trip-Day are credited to your Wallet or bank account within a reasonable time after completion — generally within 24 hours — and once 26 hours have elapsed post-completion, those funds are not automatically reversible.</>,
    <><b>Clear Service Charge.</b> The Service Charge (Company commission, applicable VAT, and other lawful deductions) is disclosed in-app and changes only on reasonable notice.</>,
    'Refuse a Booking that would breach these Terms, the Code of Conduct, or your safety — without penalty when the reason is legitimate and recorded in-app.',
    'Refuse to carry a Passenger who is not the person who booked, appears intoxicated to the point of danger, refuses to wear a seat belt, or otherwise breaches these Terms or the law — and to be paid for that Trip-Day as if the Passenger were a no-show.',
    'Suspend a Trip-Day in-app when you are unable to operate, without loss of standing where the suspension is timely and infrequent.',
    'Appeal any suspension or termination in accordance with the Code of Conduct.',
    'Access your Trip history, earnings statements, ratings feedback, and the personal data we hold about you, on request via privacy@conductor.ng.',
    <><b>Safety tooling.</b> In-app SOS, verified Passenger identities, live GPS tracking during Trips, and Trust &amp; Safety support for any incident you report.</>,
    <><b>A fair investigation.</b> Serious complaints against you are investigated using evidence — not on the strength of a single rating — and you are told the substance of the complaint before termination unless doing so would compromise a criminal investigation or safety.</>]],
  ['h2','3 · Your obligations'],
  ['ol',[
    'Comply with the Terms of Service, this Policy, the Code of Conduct, and all applicable Nigerian federal, state, and local laws.',
    'Provide truthful information at signup, including your NIN, driver’s licence, and vehicle documents. Keep this information current.',
    'Operate the Vehicle safely, lawfully, and professionally. Do not drive under the influence, do not use a hand-held phone, do not race, do not overload seats.',
    'Treat every Passenger with respect and courtesy. Do not discriminate on any protected ground (see the Code of Conduct).',
    'Update Trip-Day statuses truthfully and promptly through the in-app controls. Attendance flags drive settlement; mis-tagging is a serious breach.',
    'Do not solicit or accept payment for a Trip outside the Platform.',
    'Notify us promptly of any accident, licence suspension, criminal charge, insurance lapse, or other event that could reasonably affect your fitness to provide services on the Platform.']],
  ['h2','4 · Vehicle standards'],
  ['p','The Vehicle you use must be:'],
  ['ul',[
    'owned by you or operated with the documented consent of the registered owner;',
    'currently registered and insured for the passenger-carrying activity you conduct;',
    'roadworthy and mechanically sound — brakes, tyres, lights, wipers, mirrors, indicators, seat belts on every occupied position, all in working order;',
    'clean inside and out at the start of every Trip-Day;',
    'configured with the correct seat layout for its category (e.g. sedan, minibus, 10-seater, 17-seater) as declared in-app.']],
  ['ol',[
    'You may register up to three (3) Vehicles per account (subject to change by the Company on notice). Each Vehicle is individually verified.',
    'You may operate only Vehicles that are attached to your account and currently marked as active.',
    'Number plates in Vehicle photographs may be automatically masked by our system before display to third parties.']],
  ['h2','5 · Documents & verification'],
  ['ol',[
    'You must upload and keep current: driver’s licence, NIN, vehicle registration (proof of ownership or authorised use), insurance certificate, roadworthiness certificate (where applicable), hackney or commercial permit (where applicable), and any other document we require.',
    'Documents are verified through licensed identity and document providers. You authorise us and our providers to perform such checks and to re-verify at any time.',
    'Where a critical document expires, is revoked, or is under investigation, publishing is paused until the position is regularised.',
    'Providing false documents is a zero-tolerance breach under the Code of Conduct and results in termination and identity-level ban.']],
  ['h2','6 · Publishing & operating Trips'],
  ['ol',[
    'Publish only Trips you intend and are able to run. When you publish, Passengers plan their week around your schedule.',
    'Depart on time. The published departure time is a commitment, subject only to force majeure and to your right to suspend a Trip-Day in advance.',
    'Do not materially deviate from the published route without lawful cause. Traffic re-routing that is materially the same journey is acceptable; picking up unrelated stops is not.',
    'Suspend a Trip-Day in-app as early as possible when you cannot operate, so Passengers can plan alternatives. Suspended Trip-Days are not chargeable to Passengers.',
    'Habitual cancellations, no-shows, chronic lateness, or repeated route deviation may lead to warnings, extended suspension, or termination.']],
  ['h2','7 · Earnings, escrow & payout'],
  ['ol',[
    'Passenger fares for each Trip-Day are held in Company-controlled escrow accounts allocated per Trip-Day and per cost component.',
    'After completion, the settlement engine credits your net earnings (fare less Service Charge and applicable tax) to your Wallet or bank account, generally within 24 hours.',
    'Once 26 hours have elapsed after Trip-Day completion, those funds are considered settled and are not automatically reversible. Post-window disputes are resolved through the dispute engine and are typically paid as make-good credits from Company accounts rather than by reversing your Wallet.',
    'You may withdraw spendable Wallet funds to a verified bank account. Withdrawals are subject to identity verification, minimum amounts, fees, and lawful holds.',
    'Referral rewards and promotional credits are held in dedicated Wallet sub-balances and may be transferable to the spendable Wallet subject to programme-specific rules (e.g. release upon a qualifying Passenger’s fifth successful ride).',
    'Instant-payout facilities, when offered, may carry a fee that may be waivable by promotional credit.']],
  ['h2','8 · Passenger interaction'],
  ['ol',[
    'Confirm the boarding Passenger is the person who booked (name and, where offered, in-app photo).',
    'Greet the Passenger, confirm the drop-off, and drive off promptly once everyone is seat-belted.',
    'Do not touch or handle a Passenger’s belongings without permission.',
    'Do not initiate personal conversation the Passenger has not invited. Do not make comments on appearance, dress, faith, ethnicity, or personal circumstances.',
    'Do not use in-app messaging to contact a Passenger outside the operational purpose of the Trip.']],
  ['h2','9 · Safety'],
  ['ol',[
    'Use the in-app SOS if you feel unsafe. In an emergency, call 112 or your local police service without delay.',
    'Cooperate with the Company’s Trust & Safety team in the investigation of any incident.',
    'Report accidents, collisions, or injuries in-app immediately, whether or not another party was involved.',
    'Do not record video or audio of Passengers without their consent, other than through Platform safety tooling where offered.']],
  ['h2','10 · Reliability & standing'],
  ['ol',[
    'The Platform computes reliability signals from on-time performance, Trip-Day completion, Passenger ratings (released weekly to prevent revenge-rating), and complaint history.',
    'Reliability affects your matching priority. Higher reliability means Passengers see you first in search; lower reliability may reduce visibility.',
    'Serious safety complaints override reliability and may trigger immediate suspension pending investigation.']],
  ['h2','11 · Insurance'],
  ['ol',[
    'You are responsible for ensuring your Vehicle carries the insurance required by Nigerian law for the passenger-carrying activity you conduct.',
    'The Platform is not, and does not replace, insurance. Discuss appropriate coverage (comprehensive, third-party liability, passenger-liability) with a licensed insurer.',
    'If the Company introduces a Company-provided coverage scheme, it will be documented separately and, unless expressly stated to be primary, will be excess to your own insurance.']],
  ['h2','12 · Suspension & termination'],
  ['p','The suspension, termination, appeal, and identity-ban provisions in the Terms of Service and the Code of Conduct apply. In summary, repeat safety incidents or a single zero-tolerance breach (assault, sexual misconduct, weapons, DUI, gross negligence causing injury, identity fraud, retaliation) result in immediate termination and identity-level ban.']
  ]}/>;}

/* ---------------- Refund policy ---------------- */
function RefundPolicyPage(){return <LegalDoc crumb="Refund policy" eyebrow="Legal"
  title={<>Refund <em>policy</em>.</>}
  intro="This Refund Policy sets out when refunds are and are not payable, the process for requesting one, and how long refunds take to reach you. It is incorporated by reference into the Terms of Service."
  blocks={[
  ['h2','1 · General principles'],
  ['ol',[
    'Refunds are decided on the facts of each Trip-Day, in accordance with this Policy.',
    'Approved refunds are, in the first instance, credited to your Wallet spendable balance. Where you have withdrawn, refunds may be routed to the original payment method or another payment channel we designate, subject to operational, legal, and regulatory requirements.',
    'We reserve the right to investigate every refund request, including by reviewing GPS data, chat logs, driver / passenger attendance flags, and any other Trip records, in order to prevent fraud, abuse, or misuse.',
    'Refunds are processed on a per-Trip-Day basis. A multi-day Booking is not refunded on a whole-Trip basis simply because one Trip-Day was disputed — each affected Trip-Day is evaluated on its own facts.',
    'Where the Service Charge has been earned, we may deduct it from a refund. Where a refund arises from Driver fault or a service failure attributable to us, the full amount paid is refunded.']],
  ['h2','2 · Passenger-initiated cancellations'],
  ['ol',[
    <><b>Before Driver acceptance.</b> Any amount pre-authorised, held, or paid is refunded in full.</>,
    <><b>Early cancellation (before the daily cut-off).</b> Where you cancel a Trip-Day sufficiently in advance of the Driver’s pickup time (as defined by the in-app cancellation window for that Trip), the fare is refunded in full, less any small administrative processing fee expressly disclosed at cancellation.</>,
    <><b>Late cancellation.</b> Where you cancel a Trip-Day inside the cut-off window — sufficiently close to pickup that the Driver cannot reasonably re-sell the seat — the fare for that Trip-Day is not refundable. This is because the seat has effectively been consumed against the Driver’s capacity.</>,
    <><b>No-show.</b> If the Driver arrives at the pickup point and waits the applicable grace period (published in-app) and you neither arrive nor cancel in-app, you are treated as a no-show and no refund is due.</>,
    <><b>Ride refused after boarding for behaviour.</b> Where a Driver ends a Trip early due to your prohibited conduct (clause 11 of the Terms), you are not entitled to a refund of the affected Trip-Day.</>]],
  ['h2','3 · Driver-initiated cancellations & service failures'],
  ['ol',[
    <><b>Driver cancels a Trip-Day after accepting the Booking.</b> You receive a full refund of the fare paid for that Trip-Day. Where the pattern is repeated by the same Driver, we may sanction the Driver under clause 12 of the Terms.</>,
    <><b>Driver marks the Trip-Day as suspended</b> (e.g. vehicle unavailable, personal emergency). You are not charged for that Trip-Day and any pre-held amount is released back.</>,
    <><b>Driver no-show</b> (Driver did not arrive within a reasonable time and did not update the Trip-Day status). You are refunded in full.</>,
    <><b>Vehicle unroadworthy or safety-inadequate at pickup.</b> You may decline to board; the Trip-Day is refunded in full and reported to our Trust &amp; Safety team.</>,
    <><b>Substantial route deviation.</b> Where the Driver, without lawful reason, materially departs from the agreed route in a way that substantially harms the value of the Trip to you, a partial or full refund may be granted upon investigation.</>]],
  ['h2','4 · Payment failures, duplicates, and technical errors'],
  ['ol',[
    'Duplicate charges are refunded in full upon confirmation.',
    'Where a payment is deducted without a corresponding successful Booking, the amount is refunded in full.',
    'Where an incorrect fare has been charged due to a technical error, we will refund the difference.']],
  ['h2','5 · Wallet balances & withdrawals'],
  ['ol',[
    'Spendable Wallet funds may be withdrawn to a verified bank account. Withdrawals may take between one (1) and five (5) business days after approval, depending on the banking rails.',
    'Withdrawal requests may be delayed or declined where fraud, abuse, suspicious activity, sanctions-list matching, or a lawful hold is present.',
    'Referral rewards and promotional credits are not directly withdrawable. Referral rewards may be transferred to the spendable Wallet subject to programme-specific minimums and PIN authentication.']],
  ['h2','6 · Promotional credits, bonuses, and coupons'],
  ['p','Promotional credits, referral rewards, discount codes, and other incentives are:'],
  ['ul',[
    'non-transferable;',
    'not redeemable for cash;',
    'not refundable when a related Trip is cancelled — only the eligible monetary amount, if any, may be refunded;',
    'expire in accordance with the terms of the specific promotion.']],
  ['h2','7 · Circumstances where refunds may be declined'],
  ['ul',[
    'failure of the Passenger to appear within the permitted waiting time;',
    'provision of inaccurate pickup or drop-off information;',
    'violations of these Terms;',
    'fraudulent, deceptive, or abusive refund practices, or repeated misuse of the refund process;',
    'circumstances beyond the Company’s reasonable control (see clause 15 of the Terms);',
    'where the service has substantially been rendered.']],
  ['h2','8 · Processing time'],
  ['ol',[
    <><b>To the in-app Wallet:</b> generally immediate or within 24 hours of approval.</>,
    <><b>To a bank account or card:</b> generally within 5 to 15 business days, depending on the financial institution, payment processor, and applicable regulations.</>,
    'We are not liable for delays caused by third-party payment providers or financial institutions.']],
  ['h2','9 · How to request a refund'],
  ['p','Open the affected Trip-Day in the app and tap “Report an issue”. Describe the problem and attach any photographs or screenshots you have. Our support team will acknowledge within seven (7) business days and confirm the outcome within a reasonable time thereafter. You may also email support@conductor.ng.'],
  ['h2','10 · Fraud prevention & abuse'],
  ['p','We maintain fraud-detection measures for refund requests. Users who engage in fraudulent, deceptive, or abusive refund practices may have their accounts suspended, restricted, or terminated, and forfeit outstanding Wallet balances derived from the abusive activity, without prejudice to any other legal remedy available to the Company.'],
  ['h2','11 · Changes to this Policy'],
  ['p','We may amend this Policy from time to time. Changes take effect on publication and continued use of the Platform constitutes acceptance.']
  ]}/>;}

/* ---------------- Account & data deletion ---------------- */
function AccountDeletionPage(){return <LegalDoc crumb="Account & data deletion" eyebrow="Legal"
  title={<>Account &amp; data <em>deletion</em>.</>}
  intro="You control your account. This Policy explains how to request deletion, what happens during the 30-day grace period, and which categories of information we may lawfully retain after your account is closed."
  blocks={[
  ['h2','1 · How to request deletion'],
  ['p','Open Account → Delete account in the app, or contact us at support@conductor.ng. Once we receive your request, your account is scheduled for deletion and enters a thirty (30) day deactivation period.'],
  ['h2','2 · Thirty (30) day grace period'],
  ['ol',[
    'Your account is deactivated but not permanently deleted for thirty (30) days.',
    'If you log in or otherwise access the Platform using your credentials during that period, your deletion request is deemed withdrawn and your account is automatically reactivated. You may submit a new deletion request at any time.',
    'Where you are owed money on your account (e.g. a Wallet balance), we will guide you through payout (typically to your verified bank account) as part of the deletion flow. The account cannot be permanently deleted while funds are undischarged.']],
  ['h2','3 · Timeline for deletion'],
  ['p','After the 30-day grace period, we complete the deletion or anonymisation of your eligible personal data within a reasonable further period and, in any event, in accordance with applicable legal and regulatory requirements. Certain information may remain in our secure archives for the periods described below.'],
  ['h2','4 · Information that may not be deleted'],
  ['p','Notwithstanding a deletion request, we may retain certain categories of information where retention is necessary or permitted by law, including:'],
  ['ol',[
    <><b>Identity-verification records</b> — information used to verify User identity (including NIN records) may be retained where necessary to comply with legal, regulatory, security, fraud-prevention, or audit requirements.</>,
    <><b>Transaction and Trip records</b> — records relating to completed Trips, payments, receipts, disputes, complaints, refunds, and other transactional activity may be retained for accounting, tax, auditing, and legal-compliance purposes.</>,
    <><b>Safety and security information</b> — we may retain information necessary to investigate or prevent fraud, abuse, security incidents, violations of these Terms, or other unlawful activity, and to protect Users and the public.</>,
    <><b>Legal and regulatory requirements</b> — personal information subject to a legal-hold, court order, governmental directive, or valid regulatory request.</>,
    <><b>Anonymised or aggregated data</b> — information that has been irreversibly anonymised so that it can no longer identify you may be retained and used for statistical analysis, service improvement, business planning, and other lawful purposes.</>]],
  ['h2','5 · Effect of permanent deletion'],
  ['p','Once your account is permanently deleted, you may lose access to your profile, Trip history, saved preferences, referrals, and other information associated with the account. Information retained under clause 4 will continue to be protected in accordance with the Privacy Policy and applicable law.'],
  ['h2','6 · Your acknowledgement'],
  ['p','By submitting a deletion request, you acknowledge and understand this Policy.']
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
    ['Operations','City & car owner operations','Onboard car owners, run the morning corridors, and turn what happens on the road into product. Lagos-based, on the ground.'],
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
