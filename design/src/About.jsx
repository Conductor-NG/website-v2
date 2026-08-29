const PILLARS=[
  ['spark','Fewer cars, for the same number of people','A car carrying one person and a car carrying four take up identical road space. Every seat we fill is a vehicle that did not need to make the journey — less fuel burned, less exhaust, and fewer cars in the queue everyone else is sitting in.'],
  ['naira','A commute that stops eating a salary','Transport is one of the largest recurring costs a working household carries. Splitting a journey between the seats in the car turns that cost into a fraction of itself, every single working day, without anybody changing where they live or work.'],
  ['clock','The end of the daily negotiation','Scheduled trips remove the part of commuting that exhausts people: the standing, the haggling, the not knowing whether you will arrive. You know the car, the driver, the departure and the cost the night before.'],
  ['wallet','A car that pays for its own running','Most private cars are the second most expensive thing their owner will buy and they spend the journey almost empty. Sharing the seats that were already travelling turns a pure cost into something that substantially covers itself.'],
  ['users','Commuting as something social','People who share a corridor become regulars, then acquaintances. Inside a community — a workplace, an estate, a campus — they were never strangers to begin with.'],
  ['shield','Accountability in both directions','Verified identity on both sides, ratings that run both ways, and safeguards available to everyone in the car. Trust is the product; the seats are just how it is delivered.']
];

const IMPACT=[
  ['4 seats','travel where 1 travelled','A single shared car replaces up to four separate journeys on the same road, at the same hour.'],
  ['~75%','less emitted, per person','Emissions are shared across the people in the vehicle, not multiplied by them.'],
  ['Escrow','holds every fare','Money moves between commuters — held safely until each trip runs, then released to the car owner.'],
  ['1 payment','for a whole week of trips','Settled in advance, released to each car owner only as their journey completes.']
];

function About(){
  useReveal();
  return (<>
    <Header role="passenger" page="about"/>
    <main>
      <Film kind="passenger" eyebrow="About Conductor"
        title={<>We are trying to put <em>fewer cars</em> on the road.</>}
        lede="Conductor is a carpooling scheduling platform. People already driving a route publish it, people who need that route take a seat on it, and the cost of the journey is split between everyone travelling in the car. That single idea is what everything below comes from."
        cta={[<a key="1" href="#why" className="film__btn" style={{height:52,padding:'0 20px'}}>What we are building<Icon name="arrow" size={16}/></a>,
              <a key="2" href={P.how} className="film__btn" style={{height:52,padding:'0 20px'}}>How the product works</a>]}
        caption="The Conductor team on why a shared seat beats a summoned car."/>

      <div className="skyband" role="img" aria-label="The Lagos skyline"></div>

      <section className="sec" id="why"><div className="wrap">
        <SHead eyebrow="The problem" title={<>Almost every car on the road is <em>mostly empty</em>.</>}
          lede="Look at the traffic on any weekday morning. Four or five seats per vehicle, one person in each. The congestion, the fuel burned, the emissions and the hours lost are all being produced to move a small number of people very inefficiently."/>
        <div className="grid2" style={{gap:'clamp(24px,3vw,48px)',alignItems:'start'}}>
          <div>
            <p className="lede" style={{marginTop:0}}>Nobody is doing this on purpose. People drive alone because coordinating with anyone else has always been harder than not bothering — you would need to know who else is going your way, when they leave, whether you can trust them, and how to settle the money fairly.</p>
            <p className="lede" style={{marginTop:20}}>That coordination problem is the entire product. Conductor is the scheduling layer that makes sharing a journey as easy as making it alone, and the trust layer that makes it something you would actually do.</p>
          </div>
          <Rv cls="card rv--sc" style={{padding:'clamp(24px,2.6vw,34px)',display:'grid',gap:22,alignContent:'start'}}>
            <p className="eyebrow" style={{margin:0}}>What a shared seat changes</p>
            <div style={{display:'grid',gap:18}}>
              {IMPACT.map(([a,b,c])=>
                <div key={a} style={{display:'grid',gap:5}}>
                  <div style={{display:'flex',alignItems:'baseline',gap:10}}>
                    <span className="num" style={{font:'italic 400 clamp(26px,2.4vw,34px)/1 var(--font-serif)',color:'var(--fg-1)'}}>{a}</span>
                    <T s={14} c="var(--fg-2)">{b}</T>
                  </div>
                  <p className="small">{c}</p>
                </div>)}
            </div>
          </Rv>
        </div>
      </div></section>

      <section className="sec sec--cream"><div className="wrap">
        <SHead eyebrow="What we are for" title={<>Six things a full car <em>quietly fixes</em>.</>}
          lede="Carpooling is usually sold on price alone. Price is the reason most people arrive, but it is not the reason they stay."/>
        <div className="grid3">
          {PILLARS.map(([ic,t,b],i)=>
            <Rv key={t} d={i*70} cls="feat">
              <div className="feat__ic"><Icon name={ic} size={21}/></div>
              <h3 className="h3" style={{fontSize:19}}>{t}</h3><p>{b}</p>
            </Rv>)}
        </div>
      </div></section>

      <section className="sec"><div className="wrap">
        <div className="grid2" style={{gap:'clamp(24px,3vw,52px)',alignItems:'center'}}>
          <div>
            <SHead eyebrow="The environmental case" title={<>Net zero is not a <em>slogan</em> for us.</>}/>
            <p className="lede" style={{marginTop:0}}>Transport is one of the fastest-growing sources of emissions in any growing city, and the cheapest way to reduce it is not a new vehicle — it is a fuller one. Electrifying a fleet takes a decade and enormous capital. Filling the empty seats already driving past your gate takes an app and a schedule.</p>
            <ul className="checks" style={{gap:14,marginTop:26}}>
              {['Every filled seat removes a vehicle-journey from the road entirely',
                'Emissions per person fall in direct proportion to the seats shared',
                'Less congestion means less idling, which is where a surprising share of urban emissions is produced',
                'No new infrastructure, no new vehicles, no waiting for a fleet to turn over']
                .map(t=><li key={t} style={{fontSize:16,lineHeight:1.55}}><Icon name="check" size={18}/>{t}</li>)}
            </ul>
          </div>
          <Rv d={120} cls="card rv--sc" style={{padding:'clamp(26px,3vw,40px)',display:'grid',gap:20,background:'var(--cream-100)',borderColor:'var(--cream-100)',color:'#fff'}}>
            <p className="eyebrow" style={{margin:0,color:'var(--pink-30)'}}>The arithmetic</p>
            <h3 className="h3" style={{color:'#fff',fontSize:'clamp(21px,2vw,26px)'}}>One car, four commuters, one journey’s worth of emissions — instead of four.</h3>
            <div style={{display:'grid',gap:12,paddingTop:6,borderTop:'1px solid rgba(255,255,255,.16)'}}>
              {[['Driving alone','4 cars · 4 journeys','rgba(255,255,255,.24)',100],
                ['Sharing one car','1 car · 1 journey','var(--orange-base)',25]].map(([a,b,col,w])=>
                <div key={a} style={{display:'grid',gap:7}}>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <T s={14} w={600} c="#fff">{a}</T><T s={13} c="rgba(255,255,255,.6)">{b}</T>
                  </div>
                  <div style={{height:10,borderRadius:99,background:'rgba(255,255,255,.1)'}}>
                    <div style={{height:'100%',width:w+'%',borderRadius:99,background:col}}></div>
                  </div>
                </div>)}
            </div>
            <p className="small" style={{color:'rgba(255,255,255,.6)'}}>Illustrative, for a four-seat car travelling a corridor that four people would otherwise drive separately.</p>
          </Rv>
        </div>
      </div></section>

      <section className="sec"><div className="wrap">
        <div className="illusplit">
          <Rv cls="rv--sc illusplit__art">
            <img src="/images/art/passenger-driver.png" alt="Two commuters sharing a car through Lagos" loading="lazy"/>
          </Rv>
          <div>
            <Rv cls="eyebrow" tag="p">Two people, one road</Rv>
            <Rv d={60}><h2 className="h2">The same journey, <em>shared</em>.</h2></Rv>
            <Rv d={110}><p className="lede" style={{marginTop:24}}>The car owner was already making this trip. The passenger needed exactly this route, at exactly this time. Conductor is simply the arrangement that lets one car do the work of two — the same road, the same morning, the cost split between the people in it.</p></Rv>
          </div>
        </div>
      </div></section>

      <section className="sec sec--cream"><div className="wrap">
        <SHead eyebrow="Both sides gain" title={<>Nobody here is the <em>service</em>.</>}
          lede="A car owner on Conductor is not a driver working for a platform. They are a commuter with spare seats, and the arrangement has to be worth their while too."/>
        <div className="grid2">
          <Rv cls="card" style={{padding:'clamp(26px,2.8vw,38px)',display:'grid',gap:18,alignContent:'start'}}>
            <p className="eyebrow" style={{margin:0}}>For the person riding</p>
            <h3 className="h3">Cost, certainty and calm</h3>
            <ul className="checks">
              {['A seat costs a share of the journey, not the price of the car',
                'The fare is agreed before the trip and cannot move afterwards',
                'You choose the vehicle class and the person driving it',
                'The week is paid once and refunded automatically if a trip does not happen',
                'No standing, no haggling, no wondering whether you will arrive'].map(t=>
                <li key={t}><Icon name="check" size={16}/>{t}</li>)}
            </ul>
            <a className="linkarrow" href={P.home} style={{justifySelf:'start'}}>For passengers<Icon name="arrow" size={15}/></a>
          </Rv>
          <Rv d={100} cls="card" style={{padding:'clamp(26px,2.8vw,38px)',display:'grid',gap:18,alignContent:'start'}}>
            <p className="eyebrow" style={{margin:0}}>For the person driving</p>
            <h3 className="h3">Revenue from a journey you were making anyway</h3>
            <ul className="checks">
              {['Empty seats become income without a single extra kilometre driven',
                'The app prices each seat for the route; the fare goes to the car owner',
                'You approve every passenger, and can decline without a reason',
                'Fares are held in escrow, so a no-show never costs you the trip',
                'Fuel, servicing and wear stop being carried alone'].map(t=>
                <li key={t}><Icon name="check" size={16}/>{t}</li>)}
            </ul>
            <a className="linkarrow" href={P.own} style={{justifySelf:'start'}}>For car owners<Icon name="arrow" size={15}/></a>
          </Rv>
        </div>
      </div></section>

      <section className="sec"><div className="wrap">
        <div className="grid2" style={{gap:'clamp(24px,3vw,52px)',alignItems:'center'}}>
          <Rv cls="rv--sc twoph" style={{order:2}}>
            <Phone single={10} w={292} set={PSCREENS}/><Phone single={8} w={292} set={DSCREENS}/>
          </Rv>
          <div>
            <SHead eyebrow="Communities" title={<>The best version of this is <em>people you know</em>.</>}/>
            <p className="lede" style={{marginTop:0}}>Anyone can create a community around a workplace, an estate, a campus or an association. Trips posted inside one are visible only to its members, and a car owner can restrict their seats so that only members may even ask.</p>
            <p className="lede" style={{marginTop:18}}>It changes the nature of the thing. You are not getting into a verified stranger's car; you are getting a lift from someone two floors up who leaves at the same time you do. That is how carpooling worked before anyone needed an app, and it is what we are trying to give back.</p>
            <a className="linkarrow" href={P.how+'#walk'} style={{marginTop:24,display:'inline-flex'}}>See communities in the app<Icon name="arrow" size={15}/></a>
          </div>
        </div>
      </div></section>

      <section className="sec sec--cream"><div className="wrap">
        <div className="moneysplit">
          <div>
            <Rv cls="eyebrow" tag="p">Straight answers</Rv>
            <Rv d={60}><h2 className="h2">How the company <em>makes money</em>.</h2></Rv>
            <Rv d={110}><p className="lede" style={{marginTop:24}}>A free platform with no stated business model is a fair thing to be suspicious of, so here is ours plainly: the ride fare moves between commuters, and Conductor earns through a service charge built into it — one that falls as a car owner completes more trips. The more you share, the less it costs to share.</p></Rv>
            <Rv d={150}><p className="lede" style={{marginTop:18}}>We would rather tell you that plainly than have you work it out later.</p></Rv>
          </div>
          <Rv d={120} cls="moneysplit__art rv--sc">
            <img src="/images/art/purse.png" alt="A coin purse with coins dropping in" loading="lazy"/>
          </Rv>
        </div>
      </div></section>

      <section className="sec"><div className="wrap">
        <SHead eyebrow="Who we are" title={<>A small team, and a <em>long road</em>.</>}
          lede="Conductor Technology International Services Limited. We are commuters ourselves, which is the only qualification that has been much use so far."/>
        <div className="grid3">
          {[['pin','Where to find us','8A Olayinka Balogun Crescent, Magodo Phase 2. The office is small and the kettle is usually on.'],
            ['chat','How to reach us','support@conductor.ng — answered by a person within a working day, and sooner during the morning run.'],
            ['users','Working with us','Partnerships, press and community enquiries all go to the same address. So do complaints, which we would rather hear than not.']]
            .map(([ic,t,b],i)=>
              <Rv key={t} d={i*80} cls="feat">
                <div className="feat__ic"><Icon name={ic} size={21}/></div>
                <h3 className="h3" style={{fontSize:19}}>{t}</h3><p>{b}</p>
              </Rv>)}
        </div>
      </div></section>

      <Band title={<>Put one more <em>full car</em> on the road.</>}
        lede="Take a seat on a journey that was happening anyway, or share the seats in the one you are already driving."/>
    </main>
    <Footer/>
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<About/>);
