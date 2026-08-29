const PAX_STEPS=[
  {n:'Step one',t:'Find the trips going your way',b:'Enter where you travel from and to, and see every car owner already driving that route — real journeys scheduled in advance, laid out on the map around you, not a car summoned in the rain.',screen:1},
  {n:'Step two',t:'Choose your car, and who you’ll ride with',b:'Open the car and the person before you commit: the vehicle itself, verified identity, a rating earned from both directions, and who else is already aboard. You choose them — nobody is assigned.',screen:3},
  {n:'Step three',t:'Pick your seat, and pay for the week',b:'Choose exactly where you sit — up front, or the back-left window — and pay for the days you need in one go. Your money sits in escrow and is released to the car owner only after each trip actually runs.',screen:13},
  {n:'Step four',t:'Travel, track it live, and rate',b:'Meet at a named landmark, follow the journey on a live map — your destination and the car’s progress in view the whole way — and share it with anyone you trust, with SOS a press away. When you arrive, you rate each other and the fare is released.',screen:14}
];
const PAX_VOICES=[
  {t:'I ride with the same two people every morning now. I know their names, and I know what the week will cost before it starts.',n:'Ada Mbakwe',r:'Passenger · 8 months'},
  {t:'Being able to pick an SUV was the thing that sold me. On a wet morning that is not a small detail.',n:'Chidinma Eze',r:'Passenger · 5 months'},
  {t:'I could see exactly who I was riding with, and what other passengers had said about them, before I paid anything.',n:'Tunde Balogun',r:'Passenger · 1 year'}
];

function PaxHome(){
  useReveal();
  return (<>
    <Header role="passenger" over={true}/>
    <main>
      <Film kind="passenger" eyebrow="For passengers"
        title={<>Your commute, for the price of <em>one seat</em>.</>}
        lede="Conductor is a carpooling scheduling platform. Someone is already driving your route this week — book a seat on that journey, pick the kind of car you travel in, and split the cost with everyone else going the same way."
        cta={[<OpenAppBtn key="0" href={LINKS.pWeb} label="Open the web app" loc="hero"/>,
              <DownloadButton key="1" ios={LINKS.pIos} android={LINKS.pAnd} loc="hero"/>,
              <a key="3" href="#cost" className="film__btn" style={{height:52,padding:'0 20px'}}>What my route costs<Icon name="arrow" size={16}/></a>]}
        caption="Ninety seconds with the Conductor team on how a shared morning run actually works."/>

      <Carpool role="passenger"/>

      <section className="sec"><div className="wrap">
        <div className="illusplit">
          <Rv cls="rv--sc illusplit__art">
            <img src="/images/art/passengers.png" alt="Four commuters sharing a car through Lagos" loading="lazy"/>
          </Rv>
          <div>
            <Rv cls="eyebrow" tag="p">The full car</Rv>
            <Rv d={60}><h2 className="h2">Four people, <em>one journey</em>.</h2></Rv>
            <Rv d={110}><p className="lede" style={{marginTop:24}}>The seat you take was already travelling — the car owner was making this run anyway. You fill a space that would have gone empty, and everyone in the car pays a share instead of the price of the whole trip.</p></Rv>
          </div>
        </div>
      </div></section>

      <StepWalk items={PAX_STEPS} set={PSCREENS} eyebrow="Your first ride"
        title={<>Four steps, and you have <em>a seat</em>.</>}
        lede="Every step below is a real screen from the passenger app — this is the whole journey, not a simplified version of it."/>

      <SafetyRow items={[
        ['shield','Verified before the first trip','Car owners clear identity, licence and vehicle checks. Passengers verify identity too, so the trust runs both ways.'],
        ['share','Share the ride as it happens','Send your route, your car owner and your arrival time to anyone you trust. They follow along without installing anything.'],
        ['alert','SOS on every screen','Hold SOS and your live location goes to your trusted contacts, emergency services and our safety team at once.']]}/>

      <section className="sec" id="cost"><div className="wrap">
        <SHead eyebrow="What it costs" title={<>Now put your <em>own route</em> in.</>}
          lede="Pick where you travel from and to, and how often you make the journey. Distance and journey time are ours; the fare comes live from the app, so what you read here is what you pay at booking."/>
        <Rv cls="rv--sc"><Quote mode="passenger"/></Rv>
        <Rv d={90}><p className="small" style={{marginTop:18,maxWidth:'74ch'}}>Not seeing where you travel? <a href={P.corr}>Ask us to open your route</a> and we will tell you when a car owner publishes it.</p></Rv>
      </div></section>

      <Promo eyebrow="On now, for passengers"
        title={<>Up to <em>100% off</em> every trip you take this week.</>}
        body="Add your week of trips to your schedule as usual and the discount applies at checkout. Everything else works exactly as it always does — anything still payable is held in escrow and released to each car owner only after that journey is completed."
        points={['Applies to every trip taken within the promotional week','Add trips to your schedule and the discount is applied automatically','Trips that do not happen are still refunded in full','Current terms always shown in the app at the point of booking']}
        cta="See what your route costs" href={P.fares}/>

      <Feedback cream={true} items={PAX_VOICES} eyebrow="Riders, in their words"
        title={<>The people already on <em>your route</em>.</>}
        lede="Feedback from passengers who have been sharing a corridor long enough to have an opinion about it."/>

      <Band mode="passenger" title={<>Find your first <em>shared seat</em>.</>}
        lede="Add the trips you make this week, see who is already driving them, and take the seat before it goes."/>
    </main>
    <Footer/>
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<PaxHome/>);
