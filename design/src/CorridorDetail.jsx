const C=CORRIDORS[0];
const DEPARTURES=[['6:15 AM','Bisi A.',1,1200],['6:40 AM','Michael O.',2,1300],['6:55 AM','Tunde K.',1,1500],['7:20 AM','Ngozi U.',3,1250],['7:45 AM','Sola B.',2,1300]];
const MODES=[
  ['Conductor seat','₦1,300','₦56,290','One seat in a car already going your way',1],
  ['Ride-hailing, alone','₦4,300','₦186,190','Whole car, surge on top at peak',0],
  ['Driving yourself','₦1,815','₦78,590','Fuel, wear and servicing at ₦165/km',0],
  ['Danfo + keke','₦900','₦38,970','Cheapest, but three changes and no arrival time',0]
];
function CorridorDetail(){
  useReveal();
  const others=CORRIDORS.filter(x=>x.id!==C.id).slice(0,3);
  return (<>
    <Header page="corr"/>
    <main>
      <section className="phero"><div className="hero__glow"></div><div className="wrap">
        <Rv cls="crumb" tag="p"><a href={P.home}>Home</a><Icon name="chevron" size={13}/><a href={P.corr}>Corridors</a><Icon name="chevron" size={13}/>Agege → Ikeja GRA</Rv>
        <div className="phero__grid">
          <div>
            <Rv cls="eyebrow" tag="p" d={40}>Mainland corridor · live</Rv>
            <Rv d={90}><h1 className="h1">Agege <em>to</em> Ikeja GRA</h1></Rv>
            <Rv d={150}><p className="lede" style={{marginTop:24}}>Eleven kilometres, thirty-five minutes on a good morning, and {C.riders} people making the same run. A seat costs {naira(C.seat)} — roughly a third of hailing the same trip alone.</p></Rv>
            <Rv d={210} cls="hero__cta">
              <OpenAppBtn href={LINKS.pWeb} label="Book a seat" loc="corridor"/>
              <DownloadButton ios={LINKS.pIos} android={LINKS.pAnd} loc="corridor"/>
              <a href={P.own} className="btn btn--ghostline btn--lg">Drive this corridor</a>
            </Rv>
          </div>
          <Rv d={130} cls="rv--sc">
            <div className="card" style={{padding:26,display:'grid',gap:20}}>
              <MiniMap h={150}/>
              <div className="rline"><i></i><u></u><i></i></div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
                {[[C.km+' km','End to end'],[C.mins+' min','Typical morning'],[naira(C.seat),'Per seat'],[C.riders,'Regular riders']]
                  .map(([a,b])=><dl key={b} className="kpi"><dt className="num" style={{fontSize:30}}>{a}</dt><dd>{b}</dd></dl>)}
              </div>
            </div>
          </Rv>
        </div>
      </div></section>
      <section className="sec sec--cream"><div className="wrap">
        <SHead eyebrow="What it costs" title={<>Four ways to make this trip, <em>priced</em>.</>}
          lede="Same eleven kilometres, twice a day, five days a week. The monthly column assumes 43 legs — a normal Lagos working month."/>
        <Rv cls="card rv--sc" style={{padding:'8px 24px'}}>
          <table className="tbl">
            <thead><tr><th>How you travel</th><th>Per leg</th><th>Per month</th><th>What you get</th></tr></thead>
            <tbody>{MODES.map(([a,b,c,d,hi])=>
              <tr key={a} data-hi={hi?'1':'0'}><td>{a}</td><td><b className="num">{b}</b></td><td className="num">{c}</td><td>{d}</td></tr>)}
            </tbody>
          </table>
        </Rv>
        <Rv d={80}><p className="small" style={{marginTop:16}}>Estimates from typical 2026 fares on this corridor. Danfo figures assume two changes and exclude waiting time.</p></Rv>
      </div></section>
      <section className="sec"><div className="wrap">
        <div className="grid2" style={{gap:'clamp(30px,5vw,70px)',alignItems:'start'}}>
          <div>
            <SHead eyebrow="Tomorrow morning" title={<>Who is <em>leaving when</em>.</>} narrow={true}/>
            <div className="tline">{DEPARTURES.map(([t,n,s,p],i)=>
              <Rv key={t} d={i*60} tag="div">
                <b>{t} · {n}</b>
                <p>{s} {s>1?'seats':'seat'} free · {naira(p)} per seat · arrives Ikeja GRA by {['6:52','7:15','7:34','7:58','8:22'][i]} AM</p>
              </Rv>)}
            </div>
            <Rv d={340}><p className="small" style={{marginTop:6}}>Departures shown are typical for a Tuesday. Live seats appear in the app.</p></Rv>
          </div>
          <div>
            <SHead eyebrow="Who travels it" title={<>A corridor is a <em>set of regulars</em>.</>} narrow={true}/>
            <Rv cls="card" style={{padding:28,display:'grid',gap:22}}>
              <div style={{display:'flex'}}>
                {['Ada M','Michael O','Bisi A','Tunde K','Ngozi U','Sola B'].map((n,i)=>
                  <div key={n} style={{marginLeft:i?-10:0,border:'2px solid #fff',borderRadius:99}}><Mono name={n} i={i} size={40}/></div>)}
                <div style={{marginLeft:-10,border:'2px solid #fff',borderRadius:99,width:40,height:40,display:'grid',placeItems:'center',background:'var(--cream-20)',font:'700 12px/1 var(--font-body)',color:'var(--fg-2)'}}>+122</div>
              </div>
              <div className="ledger">
                {[['Verified riders','128'],['Average rating, both ways','4.9'],['Trips completed this month','612'],['Repeat pairings','71%']]
                  .map(([a,b])=><div key={a}>{a}<b className="num">{b}</b></div>)}
              </div>
              <div style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                <Icon name="shield" size={18} color="var(--success-base)" style={{flex:'none',marginTop:2}}/>
                <p className="small">Every rider on this corridor has cleared ID verification, and car owners have cleared licence and vehicle checks.</p>
              </div>
            </Rv>
          </div>
        </div>
      </div></section>
      <section className="sec sec--cream"><div className="wrap">
        <SHead eyebrow="Nearby" title={<>Other corridors on <em>this side of town</em>.</>} narrow={true}/>
        <div className="grid3">{others.map((c,i)=>
          <Rv key={c.id} d={i*70} tag="a" cls="ccard" href={P.corr}>
            <div className="ccard__hd"><span className="ccard__rt">{c.from}<span> → </span>{c.to}</span><span className="ccard__pr num">{naira(c.seat)}</span></div>
            <div className="ccard__meta"><span><b>{c.km} km</b> route</span><span><b>{c.mins} min</b></span><span><b className="num">{c.riders}</b> riders</span></div>
            <div className="spark">{c.peak.map((v,j)=><i key={j} style={{height:v*10+'%'}} data-peak={v>=8?'1':'0'}></i>)}</div>
          </Rv>)}
        </div>
      </div></section>
      <Band title={<>Take the <em>6:40</em> tomorrow.</>}
        lede="Book a seat on Agege → Ikeja GRA, or publish the trip if you are the one driving it."/>
    </main>
    <Footer/>
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<CorridorDetail/>);
