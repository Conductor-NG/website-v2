/* Safety, reworked to the site's language: lead with the safety SCREENS in a
   StepWalk (same component as Home / Car-owners), then the full list, then the
   FAQ lives on its own /faq page. */
const SAFE_STEPS=[
  {n:'Before a first trip',t:'Verified before you ever meet',b:'Identity is checked on both sides before a first trip — passengers clear NIN, phone and a liveness selfie; car owners add licence, vehicle papers and roadworthiness. You see the other’s verification and rating before any money is committed.',screen:0},
  {n:'Meeting up',t:'A named place to meet, never a dropped pin',b:'You meet at a known, categorised landmark on the route the car was already taking — a filling station, a mall, a familiar junction — colour-coded for how safe and public it is, never an unmarked spot down a side street.',screen:1},
  {n:'On the road',t:'Track the whole trip, and share it live',b:'Follow the journey on a live map, your destination and the car’s progress in view the whole way, and send a live link to anyone you trust — they follow along without the app. SOS sits on the same screen.',screen:2},
  {n:'If anything goes wrong',t:'SOS on every screen, for both people',b:'Hold SOS and your live location goes to emergency services, your trusted contacts and our safety team at once. Short of an emergency, either side can suspend the trip — it ends there, and the fare is resolved afterwards, never at the roadside.',screen:3},
  {n:'Afterwards',t:'Rated, and it sticks to you',b:'Every passenger and car owner is rated after each trip, and either side can flag a problem — raise it and your money is protected until it is put right. A name here cannot be discarded and remade after a bad trip, which is exactly what makes every rating mean something.',screen:4}
];
const SAFE_SET=[SHOT('pax-09-verification'),SHOT('drv-14-landmark'),SHOT('pax-livetrip'),SHOT('drv-05-sos'),SHOT('pax-07-rate')];

const SAFE_ALL=[
  ['Before you travel','shield','Identity & trust',[
    ['Two-sided identity verification','NIN, phone and a liveness selfie for passengers; driver’s licence, vehicle papers and roadworthiness for car owners.'],
    ['Nobody is anonymous','A verified name that cannot be thrown away and remade after a bad trip.'],
    ['You see them before you agree','Verification, rating and time on Conductor, visible to both sides before any money is committed.'],
    ['You choose who you ride with','Passengers request a specific car owner; the owner approves or declines. Nobody is ever assigned.'],
    ['Verified communities','Choose to ride only with people from a workplace, estate or campus you belong to.'],
    ['The car you’ll actually see','Make, colour and plate verified against the papers — a different car is a reportable mismatch.']]],
  ['When you meet','pin','The first two minutes',[
    ['First-meet code','A short code shown in both apps that you each confirm before the door opens.'],
    ['Named landmark meeting points','Public, well-known spots — never a pin down an unmarked street.'],
    ['Colour-coded landmark safety','Every meeting point tagged safe & public, use-with-care, or best-avoided.'],
    ['Seat control','The car owner opens or closes seats; the passenger picks the exact seat they’ll sit in.']]],
  ['During the trip','route','Safeguards that travel with you',[
    ['Live trip location tracking','A moving map and live ETA in the app, both sides, for the whole journey.'],
    ['Share your trip with your people','A live link to family or an emergency contact — they follow without the app.'],
    ['SOS on every screen','Emergency services, trusted contacts and our safety team, all at once, with your live location.'],
    ['Suspend at any time','Either side can end a journey — no penalty, and any held fare is returned.'],
    ['Road incidents & live traffic','Community-reported incidents and live traffic along your route.'],
    ['GPS-verified pick-up & drop-off','The trip is checked against where it actually happened.']]],
  ['After the trip','star','Accountability that compounds',[
    ['Reviews of every passenger and driver','Both sides rated after each trip — scores can’t be bought or reset.'],
    ['Feedback with voice notes','Detailed feedback, including a voice note, not just a star.'],
    ['Raise a complaint','An issue for a trip — for yourself, or several parties in the same car.'],
    ['GPS-adjudicated disputes','Settled against the trip’s real location record.'],
    ['Your money is protected','The driver is paid only after the trip runs — until then we hold it, and refund you for anything that does not happen.']]],
  ['Behind the scenes','eye','The platform itself',[
    ['Bans and suspensions','Repeat offenders barred at the identity level, with a fair appeals process.'],
    ['No cash at the roadside','Every fare moves through escrow — nothing handed over in the car.'],
    ['A conduct code both sides sign','Clear rules — and a team that acts on reports, not files them.'],
    ['Your data, protected','Handled under Nigerian data-protection rules; delete it whenever you want.']]]
];

function SafetyNew(){
  useReveal();
  return (<>
    <Header role="passenger" page="safety"/>
    <main>
      <PageHero crumb="Safety" eyebrow="Safety &amp; verification"
        title={<>A shared ride only works if <em>everyone</em> feels safe.</>}
        lede="Conductor is not a stranger arriving at your gate. It is two verified people who agreed to travel the same road at the same time — and every safeguard below applies in both directions, free, and on by default."
        cta={[<a key="1" href="#seen" className="btn btn--primary btn--lg">See it in the app<Icon name="arrow" size={18}/></a>,
              <a key="2" href="#all" className="btn btn--ghostline btn--lg">Every safeguard</a>]}
        aside={<Phone single={6} w={288} set={PSCREENS}/>}/>

      <section style={{paddingBottom:'clamp(40px,5vw,64px)'}}><div className="wrap">
        <VRow items={[
          ['01','Nobody is anonymous','Identity is verified on both sides before a first trip. No anonymous seats, no anonymous drivers.'],
          ['02','Both sides choose','Passengers request; car owners approve. Either can decline, at any point, without a reason.'],
          ['03','Everything runs both ways','Verification, ratings, SOS, the right to suspend — the passenger and the car owner get the same tools.'],
          ['04','On every single trip','Nothing here is an upgrade. Every safeguard ships with every journey, for free.']]}/>
      </div></section>

      <div id="seen"></div>
      <StepWalk items={SAFE_STEPS} set={SAFE_SET} eyebrow="Safety you can see"
        title={<>The safeguards, <em>on the screen</em>.</>}
        lede="Not a list of promises — the actual screens both people use, in the order a trip meets them. Scroll through one journey, from the checks before you meet to what happens if something goes wrong."/>

      <section className="sec sec--cream" id="all"><div className="wrap">
        <SHead eyebrow="Every safeguard, in one place" title={<>And the <em>full picture</em>.</>}
          lede="Each safeguard stated once, grouped by when in the trip it matters — so you can see the whole thing, not a highlight reel."/>
        <div className="phases">
          {SAFE_ALL.map(([phase,ic,tag,items],i)=>
            <Rv key={phase} d={i*60} cls="card phase rv--sc">
              <div className="phase__head">
                <span className="phase__n">{'0'+(i+1)}</span>
                <div className="phase__meta">
                  <div className="feat__ic phase__ic"><Icon name={ic} size={19}/></div>
                  <div>
                    <h3 className="phase__title">{phase}</h3>
                    <p className="phase__tag">{tag}</p>
                  </div>
                </div>
              </div>
              <div className="phase__items">
                {items.map(([t,b])=>
                  <div key={t} className="safeitem">
                    <span className="safeitem__ck"><Icon name="check" size={13} color="var(--success-base)"/></span>
                    <div><b>{t}</b><p>{b}</p></div>
                  </div>)}
              </div>
            </Rv>)}
        </div>
      </div></section>

      <section className="sec"><div className="wrap">
        <div className="trustband">
          {[['shield','Your money is always safe','The driver is not paid up front — we hold every fare and release it only after your trip has run. Anything that does not happen is refunded to you in full.'],
            ['alert','Either side can suspend','End a journey that has become unsafe or unworkable, with no penalty on either side.'],
            ['users','A conduct code both sign','Clear rules on behaviour, cancellation and disputes — and a team that acts on reports.']]
            .map(([ic,t,b],i)=>
              <Rv key={t} d={i*70} cls="trustband__c">
                <div className="feat__ic"><Icon name={ic} size={20}/></div>
                <div><b>{t}</b><p>{b}</p></div>
              </Rv>)}
        </div>
        <Rv d={200} style={{marginTop:30,display:'flex',flexWrap:'wrap',gap:16,alignItems:'center',justifyContent:'space-between'}}>
          <p className="lede" style={{margin:0,maxWidth:'42ch'}}>More questions about safety, verification or your account?</p>
          <a className="btn btn--ghostline btn--lg" href={P.faq}>Read the safety FAQs<Icon name="arrow" size={17}/></a>
        </Rv>
      </div></section>

      <Band title={<>Travel with people you can <em>actually see</em>.</>}
        lede="Verification, live tracking, SOS and every other safeguard come with every trip on both apps — free, and on by default."/>
    </main>
    <Footer/>
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<SafetyNew/>);
