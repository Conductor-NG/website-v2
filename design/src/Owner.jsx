const OWN_STEPS=[
  {n:'Step one',t:'Publish your week in under a minute',b:'Set your route, your departure window, the seats you’ll share and what each one costs — then publish the whole week at once. From there it runs on its own, filling with passengers as they book.',screen:11},
  {n:'Step two',t:'Approve only the passengers you want',b:'Requests arrive with a verified profile and a rating earned from previous car owners. You approve the people you want in your car and decline the rest — no penalty, and they are not told why.',screen:1},
  {n:'Step three',t:'Drive the route you were driving anyway',b:'Meet at a landmark on the road you already take, so nobody is hunting for your plate. Follow the trip live and message your passengers in-app if traffic moves your timing.',screen:4},
  {n:'Step four',t:'Get paid, trip by trip',b:'Passengers pay for the week up front, but the money sits in escrow. Your share is released the moment each journey completes — you see exactly what every day and every seat earned, and withdraw whenever you like.',screen:12}
];
const OWN_VOICES=[
  {t:'My car was going anyway. Three seats cover fuel and most of the servicing, and I have company in the traffic.',n:'Michael Okafor',r:'Car owner · 2 years'},
  {t:'I was nervous about who would get in. Then I realised I approve every passenger myself, and I can just keep the same four people.',n:'Folake Adeniyi',r:'Car owner · 11 months'},
  {t:'The money lands at the end of the trip, no chasing and nobody counting notes at a junction.',n:'Emeka Nwosu',r:'Car owner · 6 months'}
];

function OwnerPage(){
  useReveal();
  return (<>
    <Header role="owner" over={true}/>
    <main>
      <Film kind="driver" eyebrow="For car owners"
        title={<>Your car is already making the trip. <em>Let it pay for itself.</em></>}
        lede="Publish the journeys you drive each week, approve the passengers you want in your car, and let the seats that were travelling empty cover what the trip costs you to run. You are not for hire — you are sharing a journey that was happening anyway."
        cta={[<OpenAppBtn key="0" href={LINKS.dWeb} label="Open the web app" loc="hero"/>,
              <DownloadButton key="1" ios={LINKS.dIos} android={LINKS.dAnd} loc="hero"/>,
              <a key="3" href="#cost" className="film__btn" style={{height:52,padding:'0 20px'}}>What my seats collect<Icon name="arrow" size={16}/></a>]}
        caption="Car owners on why they started sharing the drive — and what changed about the commute."/>

      <Carpool role="owner"/>

      <section className="sec"><div className="wrap">
        <div className="illusplit">
          <div>
            <Rv cls="eyebrow" tag="p">Already on the road</Rv>
            <Rv d={60}><h2 className="h2">You were <em>driving anyway</em>.</h2></Rv>
            <Rv d={110}><p className="lede" style={{marginTop:24}}>Conductor doesn't send you anywhere new. You publish the route you already drive, approve the people going your way, and the seats that were travelling empty start covering what the trip costs you to run.</p></Rv>
          </div>
          <Rv cls="rv--sc illusplit__art">
            <img src="/images/art/driver.png" alt="A car owner driving through Lagos" loading="lazy"/>
          </Rv>
        </div>
      </div></section>

      <StepWalk items={OWN_STEPS} set={DSCREENS} eyebrow="How it runs"
        title={<>Publish it once, drive it <em>every day</em>.</>}
        lede="The same four screens you will use every weekday morning, in the order you will meet them."/>

      <section className="sec sec--cream"><div className="wrap">
        <SHead eyebrow="The part car owners ask about first" title={<>You decide <em>who</em> gets in.</>}
          lede="A request is an ask, not a booking. You see who they are, what other car owners rated them and where they are going — then you approve or decline."/>
        <div className="grid2" style={{alignItems:'center',gap:'clamp(24px,3vw,52px)'}}>
          <div>
            <ul className="checks" style={{gap:16}}>
              {['Every request carries a verified identity and a rating earned from previous trips',
                'Decline as often as you like — it costs you nothing and they are not told why',
                'Build a list of regulars you approve automatically on your route',
                'Restrict your seats to a community, so only its members can even ask',
                'The app prices each seat for the route you drive']
                .map(t=><li key={t} style={{fontSize:16,lineHeight:1.55}}><Icon name="check" size={18}/>{t}</li>)}
            </ul>
            <a className="linkarrow" href={P.how} style={{marginTop:28,display:'inline-flex'}}>See both apps side by side<Icon name="arrow" size={15}/></a>
          </div>
          <Rv d={120} cls="rv--sc twoph">
            <Phone single={10} w={288} set={DSCREENS}/><Phone single={3} w={288} set={DSCREENS}/>
          </Rv>
        </div>
      </div></section>

      <SafetyRow link={true} items={[
        ['shield','Every passenger is verified','Identity checks on both sides before a first trip. No anonymous seats, in either direction.'],
        ['star','Ratings run both ways','You rate passengers on punctuality and etiquette; they rate you. Both scores are public, and both are earned.'],
        ['alert','Support on the trip, not after it','Share-ride and SOS are available to you as well as your passengers, and either side can suspend a trip without penalty.']]}/>

      <section className="sec" id="cost"><div className="wrap">
        <SHead eyebrow="What the seats are worth" title={<>Now put your <em>own drive</em> in.</>}
          lede="Pick your route, how many seats you would share and how often you make the journey. Distance and journey time are ours; the figure comes live from the app’s own pricing, so it is never a stale number on a web page."/>
        <Rv cls="rv--sc"><Quote mode="owner"/></Rv>
      </div></section>

      <Promo eyebrow="On now, for car owners"
        title={<>The more you drive, the more you <em>keep</em>.</>}
        body="Your service charge falls as you complete more trips, so a bigger share of every fare stays with you. Consistent weekday sharing is rewarded rather than one-off journeys — the arrangement earns you more the longer you keep it up."
        points={['Service charge reduces as your completed trip count grows — you keep more per seat','The app prices each seat for your route, live','Publish a whole week of journeys in one sitting','Current rate always shown in the app before you publish']}
        cta="Get the car owner app" href="#get"/>

      <Feedback cream={true} items={OWN_VOICES} eyebrow="Car owners, in their words"
        title={<>People who drive it <em>every morning</em>.</>}
        lede="Feedback from car owners who have been sharing a corridor long enough to have an opinion about it."/>

      <Band mode="owner" title={<>Publish your route, fill the <em>empty seats</em>.</>}
        lede="Publishing a journey takes a minute. The passengers travelling your way are already looking for it."/>
    </main>
    <Footer/>
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<OwnerPage/>);
