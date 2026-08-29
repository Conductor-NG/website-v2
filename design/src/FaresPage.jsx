/* Dedicated fares page: hero → live calculator → this-week discount → the
   suspended-day billing rule → close. Composes the shared shell components so
   it flows in the same grammar as every other page. */
function FaresPage(){
  useReveal();
  return (<>
    <Header role="passenger" page="fares"/>
    <main>
      <PageHero crumb="Fares" eyebrow="Fares &amp; pricing" solo={true}
        title={<>Your real numbers, <em>not a guess</em>.</>}
        lede="Conductor prices every seat live for your exact route and locks it at booking — no surge, and nothing haggled at the roadside. Put your own commute in below and see what a seat actually costs, and how it drops the more you ride."
        cta={[<a key="1" href="#calc" className="btn btn--primary btn--lg">Work out my route<Icon name="arrow" size={18}/></a>,
              <a key="2" href="#discount" className="btn btn--ghostline btn--lg">This week’s discount</a>]}/>

      <section className="sec" id="calc"><div className="wrap">
        <SHead eyebrow="What it costs" title={<>Put your <em>own route</em> in.</>}
          lede="Pick where you travel from and to, and how often you make the journey. The distance and time are ours; the fare itself comes live from the app, so what you read here is what you pay at booking — for a passenger, or what you collect as a car owner."/>
        <Rv cls="rv--sc"><Calculator/></Rv>
        <Rv d={90}><p className="small" style={{marginTop:18,maxWidth:'74ch'}}>Not seeing where you travel? <a href={P.corr}>Ask us to open your route</a> and we will tell you when a car owner publishes it.</p></Rv>
      </div></section>

      <div id="discount"/>
      <Promo eyebrow="On now, for passengers"
        title={<>Up to <em>100% off</em> every trip you take this week.</>}
        body="Add your week of trips to your schedule as usual and the discount applies at checkout. Everything else works exactly as it always does — anything still payable is held in escrow and released to each car owner only after that journey is completed."
        points={['Applies to every trip taken within the promotional week','Add trips to your schedule and the discount is applied automatically','Trips that do not happen are still refunded in full','Current terms always shown in the app at the point of booking']}
        cta="Get the passenger app" href="#get"/>

      <section className="sec sec--cream" id="suspend"><div className="wrap">
        <SHead eyebrow="Suspended days" title={<>You only pay for the days that <em>actually run</em>.</>}
          lede="You settle the week up front and the money sits in escrow — but a day that does not happen is never yours to pay for. This is why paying ahead does not tie you to a schedule you cannot change."/>
        <div className="grid3">
          {[['calendar','Pay the week, charged by the day','You pay for the whole week when you add your trips, but each day is only ever charged once that journey has run. The week ahead is settled; the days are counted as they go.'],
            ['shield','Suspend a day, penalty-free','Drop a day you no longer need — or have a car owner suspend one — and it simply falls out of what you owe. Nobody is penalised for a day that could not run, on either side.'],
            ['wallet','Refunded in full','Every suspended or cancelled day is returned to you in full from escrow. You are only ever out of pocket for the seats you actually travelled in.']]
            .map(([ic,t,b],i)=>
              <Rv key={t} d={i*80} cls="feat">
                <div className="feat__ic"><Icon name={ic} size={21}/></div>
                <h3 className="h3" style={{fontSize:19}}>{t}</h3><p>{b}</p>
              </Rv>)}
        </div>
      </div></section>

      <Band mode="passenger" title={<>See what your <em>own week</em> costs.</>}
        lede="Put your route into the app, watch the fare come back live, and take the seat before it goes."/>
    </main>
    <Footer/>
  </>);
}
Object.assign(window,{FaresPage});
ReactDOM.createRoot(document.getElementById('root')).render(<FaresPage/>);
