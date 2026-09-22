const QGROUPS={
  passenger:{label:'Passengers',items:[
    ['What exactly is carpooling on Conductor?','Several people travelling the same way at the same time share one car instead of taking several. The car owner was making the journey regardless; you take one of the seats that would otherwise have travelled empty, and the cost of that journey is split between everyone in it.'],
    ['Can the fare change after I book?','No. The car owner sets a price per seat when they publish the trip, and it locks the moment you request the seat. There is no surge multiplier anywhere in the product — not at rush hour, not in the rain, not on a Friday evening.'],
    ['Can I choose what kind of car I ride in?','Yes, and it is the flexibility most people notice first. Filter by saloon, SUV or bus before you look at a single car owner, so comfort, air conditioning and boot space are a decision rather than a hope.'],
    ['Do I have to ride with strangers?','Only the first time. Most passengers settle into a handful of car owners on their route and travel with the same two or three people every week. Inside a community — a workplace, an estate, a campus — they were never strangers at all.'],
    ['How is this different from a hailing app?','A hailing app sends a driver to you and charges you for the whole car. Conductor is a scheduling platform: you book a seat in advance on a journey that was already going to happen, and pay a share of it rather than the price of a private trip.'],
    ['What if the car owner cancels?','Your money never leaves escrow until the trip is complete, so a cancellation returns it in full. You can also see the other trips published on your route for that morning without starting a new search.'],
    ['What does it cost to join?','Nothing. Creating an account, browsing trips, filtering by vehicle and messaging a car owner are all free. Everything up to booking a seat is free.']]},
  owner:{label:'Car owners',items:[
    ['How do I get started as a car owner?','Verify your identity, add your car and its papers, and submit them for a quick review. Once you are approved you can publish your first trip straight away — set your route, your days and your seats, and passengers on that route can start requesting.'],
    ['Who creates a trip, and who chooses the route and days?','You do. As a car owner you create the trip — you set the pickup and drop-off, the days of the week you will run it, the pickup time and how many seats. Conductor prices the seat for that route. Passengers then find your trip and book the days they need.'],
    ['Do I have to run more than one day a week?','Yes — a trip runs on at least three days a week, and passengers book at least three. Conductor is built for the commute people plan their week around, not the one-off journey, so the minimum keeps a trip worth relying on. You choose which three or more.'],
    ['Is this a taxi service? Do I need a hackney permit?','No. You are not for hire — you are sharing the cost of a journey you were already making, with people going the same way. Seat prices are held at cost-sharing level precisely so the trip remains a shared commute rather than commercial carriage.'],
    ['What does Conductor take?','Conductor earns through a service charge built into the fare, and it falls as you complete more trips — the more you share, the less it costs you to share.'],
    ['Can I select who rides with me?','Every time. Requests arrive with a verified profile and a rating earned from previous car owners, and you approve or decline each one. You can also restrict your seats to a community, so only its members can even ask.'],
    ['When exactly am I paid?','At the end of each trip. A passenger pays for their whole week up front, but that money sits in escrow and is released to you only once your own journey has been completed.'],
    ['What if a passenger does not show up?','Their fare is already in escrow. Half of that day’s fare still settles to you for holding the seat; the other half goes back to the passenger. Repeat no-shows affect a passenger’s rating and, eventually, their access to the platform.'],
    ['Does this add much time to my commute?','Only if you let it. Matching is by route, never by detour, and the meeting point is agreed on the road you already drive. Most car owners add five minutes or less.']]},
  money:{label:'Payment & refunds',items:[
    ['How does paying for a week of trips work?','When you add trips to your schedule you pay for all of them together, so the commute is settled in advance rather than transacted every morning. The full amount goes into escrow, not to any car owner.'],
    ['When does a car owner actually receive the money?','After their own trip is completed — per trip, not per week. Monday’s journey releases Monday’s fare; Friday’s is still held until Friday has happened.'],
    ['What happens if a trip does not go ahead?','It is refunded to you in full. That applies whether you cancelled, the car owner cancelled, or the trip was suspended part-way. Nothing that did not happen stays paid for.'],
    ['If a passenger cancels, does the car owner still get paid?','It depends on when. A passenger who suspends or cancels in good time is refunded, and the car owner is not paid for that seat that day. One who cancels too late, or simply does not show, still pays — the seat was held and the journey ran. The cut-off protects whoever plans ahead, on either side.'],
    ['How is the fare worked out?','A journey has one cost, and it is divided between the seats travelling in it. Three seats sharing means roughly a third each of what that trip would cost one person alone. The app prices each seat for the route when a trip is published.'],
    ['Why are fares not listed on this website?','Because a price written into a web page goes stale the day it is published. Fares are quoted live by the app, so the figure you are shown is the figure you actually pay.'],
    ['Is there a service fee on top for passengers?','No. Passengers pay the seat fare and nothing else.'],
    ['Can I pay cash?','Payment runs through the app so that escrow, refunds and dispute handling all work — and so nobody is counting notes at a junction in morning traffic.']]},
  safety:{label:'Safety & account',items:[
    ['What do I need to sign up?','A phone number and a verified identity — NIN or government ID — on both sides. Car owners additionally provide a driver’s licence, vehicle registration, insurance and a current roadworthiness certificate.'],
    ['Are passengers verified as well as car owners?','Yes. A car owner is letting someone into their own vehicle, so verification has to run in both directions for the product to work at all.'],
    ['What if I feel unsafe during a trip?','Hold SOS, on any screen. Your live location goes to emergency services, your trusted contacts and our safety team at once, with the trip details attached. Short of an emergency, either side can suspend the trip — it ends there, and the fare position is resolved afterwards rather than at the roadside.'],
    ['Can a car owner suspend a trip too?','Yes, and without penalty. Ending a journey that has become unsafe or unworkable is treated as the right call, not a breach.'],
    ['What are communities?','Groups built around a workplace, estate, campus or association. Trips posted inside one are visible only to its members, and a car owner can restrict their seats to it. Anyone can create one or ask to join.'],
    ['How do I share a trip with my family?','One tap sends your route, your travelling companion and your expected arrival to anyone you choose. They follow the journey live without installing anything, and they get an alert when you arrive.'],
    ['Can I be matched with someone I do not want to travel with?','No. Passengers request a specific car owner, and car owners approve or decline each request individually. Nobody is assigned to anybody, and either side can decline as often as they like without giving a reason or losing standing.'],
    ['What happens if the car that arrives is not the one on the profile?','Do not get in, and report it in the app. The registration and description on a profile are verified against the vehicle papers, and a mismatch is treated as a serious breach of the conduct code.'],
    ['How do I report a problem after a trip?','Leave a review of the other party, and if something went wrong, raise a complaint from the trip. A complaint can name a single person or several parties in the same car, and disputes are resolved against the trip’s real GPS record rather than just who argues hardest. While it is open, any money involved stays protected in escrow.'],
    ['Who sees my live location when I share a trip?','Only the people you send the link to, and only for the duration of that trip. They do not need an account or the app, and the link stops working when you arrive.'],
    ['How do I delete my account?','From the app, or via the deletion guide on our site. Trip records are retained only as long as the law requires, and your profile stops being visible immediately.']]},
  agreement:{label:'The agreement',items:[
    ['What does a car owner agree to?','Six things, and each is about a commute people can rely on: show up on time every day the route runs; treat passengers with respect; give reasonable notice before suspending a day; keep all payment in the app; consent to a basic background check; and follow the Car Owner Agreement and Code of Conduct.'],
    ['What does a passenger agree to?','The mirror image, so each side can see exactly what the other has committed to: be ready at the meeting point on time; treat the car owner and fellow riders with respect; give notice before dropping a day rather than leaving a seat empty at the last minute; pay through the app; verify their identity; and book the days they actually intend to travel. Nobody is signing something the other side cannot read.'],
    ['Why does showing up on time matter so much?','Because a booked commute only works if both the car and the passenger are where they said they would be. A car that does not come strands its riders; a passenger who is not ready holds up everyone in the seats behind them. On time, both ways, is the thing the whole system is built on.'],
    ['Why the notice before dropping a day?','So the other side can adjust — a car owner can offer the seat to someone else, and a passenger can find another way in. It also sets the money rule fairly: whoever gives notice is protected. A passenger who suspends in good time is refunded; one who drops out too late, or does not show, still pays the car owner. The same courtesy is asked of a car owner suspending a trip.'],
    ['Why does every payment go through the app?','So both sides are protected. A car owner’s earnings are guaranteed and held in escrow until the trip is done — they cannot be dodged in cash — and a passenger keeps refund and dispute cover if something goes wrong. Cash at the roadside has none of that.'],
    ['Why the checks on both sides?','Because a passenger is trusting a car owner with their daily safety, and a car owner is trusting who gets into their vehicle. Verifying identity on both sides, and a basic background check on the car owner, is what makes that trust reasonable rather than a leap.'],
    ['Where do I read the full agreement?','The commitments each side accepts in the app are the binding ones. You can read the full Car Owner Agreement, the Passenger Code and the Code of Conduct any time from your profile, or on this site.']]},
  promos:{label:'Offers',items:[
    ['What is the passenger offer running now?','Passengers can get up to 100% off every trip taken within the promotional week. Add your trips to your schedule as normal — the discount is applied at checkout, and anything still payable is held in escrow and released per trip in the usual way.'],
    ['What is the car owner offer running now?','Your service charge falls as you complete more trips. The more journeys you share, the cheaper each subsequent one is to run — so consistent weekday sharing is rewarded rather than one-off trips.'],
    ['Do offers change the way refunds work?','No. A discounted trip that does not happen is refunded on exactly the same terms as any other, for whatever was actually paid.'],
    ['How long do the offers last?','Both are running now and are subject to change. The app always shows the current terms at the point of booking, which is the version that applies.']]}
};

function FAQPage(){
  useReveal();
  const [tab,setTab]=React.useState('passenger');
  const keys=Object.keys(QGROUPS);
  // Open the tab named in the URL hash (e.g. /faq#agreement from the apps'
  // "Learn more" link), and follow later hash changes.
  React.useEffect(()=>{
    const applyHash=()=>{
      const h=(typeof window!=='undefined'?window.location.hash:'').replace('#','');
      if(h && QGROUPS[h]) setTab(h);
    };
    applyHash();
    window.addEventListener('hashchange',applyHash);
    return ()=>window.removeEventListener('hashchange',applyHash);
  },[]);
  const g=QGROUPS[tab];
  return (<>
    <Header role="passenger" page="faq"/>
    <main>
      <PageHero crumb="FAQ" eyebrow="FAQ" solo={true}
        title={<>Everything people ask, <em>answered plainly</em>.</>}
        lede="Grouped by who is asking. If your question is not here, our support team answers on email within a working day — and the answer usually ends up on this page."
        cta={[<a key="1" href="mailto:support@conductor.ng" className="btn btn--primary btn--lg">Email support<Icon name="arrow" size={18}/></a>,
              <a key="2" href={P.how} className="btn btn--ghostline btn--lg">See how it works instead</a>]}/>

      <section className="sec" style={{paddingTop:0}}><div className="wrap wrap--tight">
        <Rv cls="qtabs">
          {keys.map(k=>
            <button key={k} type="button" className="qtab" aria-pressed={tab===k} onClick={()=>setTab(k)}>
              {QGROUPS[k].label}<span className="num">{QGROUPS[k].items.length}</span>
            </button>)}
        </Rv>
        <div className="faq" style={{marginTop:34}}>
          {g.items.map(([q,a],i)=>
            <details key={tab+i} open={i===0}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>)}
        </div>
      </div></section>

      <section className="sec sec--cream"><div className="wrap">
        <SHead eyebrow="Still stuck" title={<>Ask a person <em>instead</em>.</>}
          lede="Support is a small team, not a queue. Tell them the route and the trip and they can see what happened."/>
        <div className="grid3">
          {[['chat','Email support','support@conductor.ng — answered within a working day, sooner during the morning run.','mailto:support@conductor.ng'],
            ['shield','Report a safety concern','Anything that happened on a trip, from a mismatched vehicle to conduct. These go to the safety team directly.','mailto:support@conductor.ng?subject=Safety%20report'],
            ['pin','Ask for your route','Not seeing where you travel? Tell us and we will let you know when a car owner publishes it.',P.corr+'#request']]
            .map(([ic,t,b,href],i)=>
              <Rv key={t} d={i*80} tag="a" cls="feat" href={href} style={{color:'inherit'}}>
                <div className="feat__ic"><Icon name={ic} size={21}/></div>
                <h3 className="h3" style={{fontSize:19}}>{t}</h3><p>{b}</p>
              </Rv>)}
        </div>
      </div></section>

      <Band title={<>The rest makes sense <em>once you ride</em>.</>}
        lede="Both apps are free. Book a seat, or publish the trip you were making anyway."/>
    </main>
    <Footer/>
  </>);
}
