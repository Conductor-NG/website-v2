/* Screen indices (p = PSCREENS, d = DSCREENS). A few still point at the closest
   available capture and are flagged // NEEDS-REAL until the true app screens land:
   - stage 5 pax pay screen / driver trip-earnings
   - stage 6 pax days-paid+suspended+refund list / driver escrow balance
   - stage 10 opened community page (Access Bank) — both sides
   - money-flow centre screen */
const STAGES=[
  {n:'Stage one',t:'See who is already travelling your way',
   b:'The map shows every published trip around you for the day you pick, each priced per seat. Instead of asking a stranger to come for you, you are looking at journeys that already exist — several cars, several destinations, all heading roughly where you are going. Tap any one and it opens up: the exact route, the pick-up time, the seat price and who is driving.',
   p:12,d:16,pLabel:'Passenger app · one trip',pDot:'var(--orange-base)',dLabel:'Passenger app',dDot:'var(--orange-base)'},
  {n:'Stage two',t:'Trips are published days before you travel',
   b:'Conductor is a scheduling platform, not a hailing app — nothing is summoned on demand. A car owner creates and publishes the journeys they will make in the days ahead. Passengers find those trips, join the ones they need and pay for them before the day arrives, so by the time the morning comes the whole thing is already settled.',
   p:2,d:11,
   split:[['Car owner','Creates and publishes the week’s trips ahead of time.'],['Passenger','Finds the trip, joins it and pays before the day.']]},
  {n:'Stage',t:'Pick your seat — or keep one back',
   b:'Comfort is a choice here, not a lottery. When you pay, you choose exactly where you sit — up front, or the back-left window — and that seat is held the moment the payment lands. On the other side, the car owner decides which seats to sell at all: open three and keep the fourth for a partner, a friend, or simply a lighter ride. Nobody is ever squeezed in beside a stranger they did not agree to.',
   p:13,d:17,
   split:[['Passenger','Chooses the exact seat they’ll travel in — held on payment.'],['Car owner','Opens the seats to sell, and locks any they’re keeping.']]},
  {n:'Stage three',t:'You choose the car, and see who you’ll ride with',
   b:'Filter by vehicle — saloon, SUV or bus — before you look at a single driver, so comfort and air conditioning are a choice, not a hope. You also see exactly who else is aboard: every passenger is verified, and the car owner can open or close individual seats to shape who joins the trip.',
   p:3,d:3,
   split:[['Passenger','Picks the vehicle, then sees who else is in the car.'],['Car owner','Opens or closes seats and reviews each passenger.']]},
  {n:'Stage four',t:'Nobody is ever assigned to anybody',
   b:'This is the part that surprises people: no match is forced on either side. The passenger asks a specific car owner; the car owner reviews who is asking and approves only the people they want. Either side can decline, as often as they like, without giving a reason — the most control either of you has ever had over a daily commute.',
   p:4,d:1},
  {n:'Stage five',t:'A seat costs a fraction of the whole car',
   b:'A journey has one cost. Divide it between the people travelling and each pays a share rather than the full fare — three seats sharing is roughly a third each of what that trip would cost alone. The passenger sees exactly what their seat costs; the car owner sees what the whole trip earns. The app prices it for the route and locks it at booking.',
   p:11,d:12},
  {n:'Stage six',t:'You pay for the week; drivers are paid trip by trip',
   b:'Add your week and you pay for all of it at once, so nobody counts notes at a junction — but the money sits in escrow, not with the driver. Each car owner is paid only after their own trip runs. And any day that does not happen — you suspend it, or the car owner does — is refunded to you in full.',
   p:8,d:13,
   split:[['Passenger','Each day shows as paid, suspended or refunded.'],['Car owner','Watches the escrow fill, and release one trip at a time.']]},
  {n:'Stage seven',t:'The journey, and where you meet',
   b:'You meet at a named landmark on the route the car was already taking — a filling station, a mall, a familiar junction — chosen because it is public, well-known and safe to wait at, never a pin down an unmarked street. From there both sides can share the live trip with family, and either can message the other if the traffic shifts.',
   p:5,d:14},
  {n:'Stage eight',t:'Identity first — nobody here is anonymous',
   b:'Security starts before anyone gets in a car. Identity is verified on both sides ahead of a first trip: passengers clear NIN and phone, car owners add licence, vehicle papers and roadworthiness — and each of you sees the other’s verification and rating. Every passenger and every car owner is rated after each trip, and either side can flag a problem: raise it and your money is protected until it is put right. A name here cannot be discarded and remade after a bad trip, which is exactly what makes every rating mean something.',
   p:9,d:7},
  {n:'Stage nine',t:'Travel with people from communities you know',
   b:'A verified stranger is one thing; someone from your own office, estate or campus is another. Create or join a community and the trips posted inside it are visible only to its members — a car owner can even restrict a seat to people from that community. It is the point where most people stop thinking of this as a service at all.',
   p:10,d:8} // NEEDS-REAL: opened community page (Access Bank)
];

const WHY=[
  ['naira','Spend a fraction of what you spend now','A seat costs a share of a journey, not the price of a whole car. For most people that is the single biggest monthly saving available to them.'],
  ['clock','Arrive at a time you can plan around','Trips are scheduled the day before, not summoned in the rain. You know who is driving, when they leave, and what it costs, before the morning starts.'],
  ['users','Travel with people, not strangers','Corridors settle into regulars. Within a fortnight most people are riding with the same two or three faces — and inside a community, people from their own workplace or estate.'],
  ['shield','Take the guesswork out of your commute','No bus that never comes, no fare argued in the rain, no danfo that changes its route on a whim. You know the car, the driver, the time and the price the night before — the unpredictability of public transport is gone from your daily commute.']
];

/* Money-flow: alternating pax (left) ↔ car owner (right), the phone in the middle.
   side: 'pax' sits in the left column, 'drv' in the right. Numbers zig-zag across. */
const MFLOW=[
  {side:'pax',t:'You pay for the whole week at once',b:'Every trip you added to your schedule, settled in a single payment. The commute stops being a daily cash transaction.'},
  {side:'drv',t:'The car owner receives nothing yet',b:'Not one naira reaches them at payment. Conductor holds every fare in escrow — and the car owner is paid only at the end of the day, once that day’s trip has been completed.'},
  {side:'pax',t:'Monday’s journey runs, and you arrive',b:'The first trip of the week is completed exactly as scheduled.'},
  {side:'drv',t:'Only Monday’s fare is released',b:'Release is per trip, not per week. Monday lands in the car owner’s wallet; Tuesday through Friday stay held until each of those runs.'},
  {side:'pax',t:'Either of you can drop Tuesday',b:'Plans change — for you or the car owner. If either side suspends a day the night before, that trip simply does not run, and you are never charged for a trip that will not happen.'},
  {side:'drv',t:'A suspended day costs the car owner nothing',b:'Tuesday pays them nothing and penalises them nothing. A day that could not run is nobody’s fault.'},
  {side:'pax',t:'Tuesday’s fare is refunded in full',b:'The held amount returns to your wallet, in full. You only ever pay for the seats you actually travelled in.'},
  {side:'drv',t:'The week closes, trip by trip',b:'Each remaining journey releases as it runs. By Friday every fare has been paid out for exactly what happened — no more, no less.'}
];

function HowItWorks(){
  useReveal();
  const [on,setOn]=React.useState(0),refs=React.useRef([]);
  React.useEffect(()=>{
    let raf=0;
    const pass=()=>{raf=0;const mid=window.innerHeight/2;let best=0,bd=1e9;
      refs.current.forEach((el,i)=>{if(!el)return;const r=el.getBoundingClientRect();const d=Math.abs(r.top+r.height/2-mid);if(d<bd){bd=d;best=i}});
      setOn(best)};
    const tick=()=>{if(raf)return;raf=setTimeout(()=>{raf=0;pass()},16)};
    pass();window.addEventListener('scroll',tick,{passive:true});window.addEventListener('resize',tick);
    return()=>{window.removeEventListener('scroll',tick);window.removeEventListener('resize',tick);if(raf)clearTimeout(raf)};
  },[]);
  const s=STAGES[on];
  return (<>
    <Header role="passenger" page="how it works"/>
    <main>
      <PageHero crumb="How it works" eyebrow="How it works" solo={true}
        title={<>One journey, seen from <em>both front seats</em>.</>}
        lede="Conductor is a carpooling scheduling platform: people who are already driving a route publish it, people who need that route book a seat on it, and the cost of the journey is split between everyone in the car. Scroll through a single week and watch both apps move together."
        cta={[<a key="1" href="#walk" className="btn btn--primary btn--lg">Start the walkthrough<Icon name="arrow" size={18}/></a>,
              <a key="2" href="#why" className="btn btn--ghostline btn--lg">Why people switch</a>]}/>

      <section style={{paddingBottom:'clamp(56px,6vw,88px)'}}><div className="wrap">
        <VRow items={[
          ['01','Carpooling','Several people who are going the same way travel in one car instead of several, and share what that journey costs.'],
          ['02','Scheduling','Trips are published and booked in advance, for a stated time. Nothing is hailed, and nothing is dispatched.'],
          ['03','Split by seat','One journey has one cost. It is divided between the seats travelling in it, so more seats means less each.'],
          ['04','Chosen, both ways','The passenger picks the car owner. The car owner approves the passenger. Either can decline without a reason.']]}/>
      </div></section>

      <section className="sec" id="walk" style={{paddingTop:0}}><div className="wrap">
        <div className="htw__prog">{STAGES.map((x,i)=><i key={i} data-on={i<=on?'1':'0'}></i>)}</div>
        <div className="htw">
          <div className="htw__col">
            <span className="htw__lb"><i style={{background:s.pDot||'var(--orange-base)'}}></i>{s.pLabel||'Passenger app'}</span>
            <Phone single={s.p} w={352} set={PSCREENS}/>
          </div>
          <div className="htw__mid">
            {STAGES.map((x,i)=>
              <div key={x.t} className="htw__stage" data-on={on===i?'1':'0'} ref={el=>refs.current[i]=el}>
                <div className="htw__n"><b>{i+1}</b>{'Stage '+(['one','two','three','four','five','six','seven','eight','nine','ten','eleven'][i]||(i+1))}</div>
                <h2 className="h2" style={{fontSize:'clamp(24px,2.4vw,34px)'}}>{x.t}</h2>
                <p>{x.b}</p>
                {x.split&&<div className="htw__split">
                  <div className="htw__sr"><i style={{background:'var(--orange-base)'}}></i><span><b>{x.split[0][0]} — </b>{x.split[0][1]}</span></div>
                  <div className="htw__sr"><i style={{background:'var(--pink-base)'}}></i><span><b>{x.split[1][0]} — </b>{x.split[1][1]}</span></div>
                </div>}
                <div className="htw__ph"><Phone single={x.p} w={286} set={PSCREENS}/><Phone single={x.d} w={286} set={DSCREENS}/></div>
              </div>)}
          </div>
          <div className="htw__col">
            <span className="htw__lb"><i style={{background:s.dDot||'var(--pink-base)'}}></i>{s.dLabel||'Car owner app'}</span>
            <Phone single={s.d} w={352} set={DSCREENS}/>
          </div>
        </div>
      </div></section>

      <section className="sec"><div className="wrap">
        <div className="illusplit">
          <Rv cls="rv--sc illusplit__art illusplit__art--panel">
            <img src="/images/art/commute-map.png" alt="A map with a route between two pins" loading="lazy"/>
          </Rv>
          <div>
            <Rv cls="eyebrow" tag="p">Start with your route</Rv>
            <Rv d={60}><h2 className="h2">It begins with where <em>you're going</em>.</h2></Rv>
            <Rv d={110}><p className="lede" style={{marginTop:24}}>Tell Conductor the trip you make — where from, where to, and the mornings you travel. It finds the people already driving that road, and the seats open on it. Everything else on this page follows from that one search.</p></Rv>
          </div>
        </div>
      </div></section>

      <section className="sec sec--cream" id="why"><div className="wrap">
        <SHead eyebrow="Why people join" title={<>Four reasons, and they <em>compound</em>.</>}
          lede="These are the four things people tell us they came for. Most arrive for the first and stay for the third."/>
        <div className="grid2">
          {WHY.map(([ic,t,b],i)=>
            <Rv key={t} d={i*80} cls="feat">
              <div className="feat__ic"><Icon name={ic} size={21}/></div>
              <h3 className="h3" style={{fontSize:20}}>{t}</h3><p>{b}</p>
            </Rv>)}
        </div>
      </div></section>

      <section className="sec"><div className="wrap">
        <SHead eyebrow="Money, in detail" title={<>Follow one week of fares <em>across the car</em>.</>}
          lede="The money never jumps straight from passenger to driver. It moves a step at a time — into escrow, out per trip, back on a refund. Read it from the passenger on the left, through the app, to the car owner on the right."/>
        <div className="mflow">
          <div className="mflow__phone" style={{gridRow:'1 / span '+MFLOW.length}}>
            <div className="mflow__phinner">
              <Phone single={0} w={358} set={[SHOT('drv-08-wallet')]}/>
              <p className="small" style={{textAlign:'center',maxWidth:'30ch',marginTop:14}}>The car owner’s wallet — held in escrow, released trip by trip, refunded when a day doesn’t run.</p>
            </div>
          </div>
          {MFLOW.map((m,i)=>
            <Rv key={i} d={0} cls={'mflow__card mflow__card--'+m.side}
              style={{gridColumn:m.side==='pax'?1:3,gridRow:i+1}}>
              <span className={'mflow__num mflow__num--'+m.side}>{i+1}</span>
              <div><b>{m.t}</b><p>{m.b}</p></div>
            </Rv>)}
        </div>
      </div></section>

      <Band title={<>Ride it, or <em>drive it</em>.</>}
        lede="Both apps are free to join. Start on whichever side of the journey you are on this week."/>
    </main>
    <Footer/>
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<HowItWorks/>);
