const ZONES=['All Lagos','Mainland','Island','Cross-bridge'];
function CorridorCard({c,href}){
  return (<a className="ccard" href={href}>
    <div className="ccard__hd">
      <span className="ccard__rt">{c.from}<span> → </span>{c.to}</span>
      <span className="ccard__pr num">{naira(c.seat)}</span>
    </div>
    <div className="ccard__meta">
      <span><b>{c.km} km</b> route</span><span><b>{c.mins} min</b> typical</span><span><b className="num">{c.riders}</b> riders</span>
    </div>
    <div className="spark">{c.peak.map((v,j)=><i key={j} style={{height:v*10+'%'}} data-peak={v>=8?'1':'0'}></i>)}</div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderTop:'1px solid var(--divider)',paddingTop:14}}>
      <T s={12} c="var(--fg-3)">Busiest 6:30–7:30 AM</T>
      <T s={12.5} w={600} c="var(--orange-50)">Open corridor →</T>
    </div>
  </a>);
}
function Corridors(){
  useReveal();
  const [zone,setZone]=React.useState('All Lagos');
  const [q,setQ]=React.useState('');
  const list=CORRIDORS.filter(c=>(zone==='All Lagos'||c.zone===zone)&&(c.from+' '+c.to).toLowerCase().includes(q.toLowerCase()));
  const riders=CORRIDORS.reduce((a,c)=>a+c.riders,0);
  return (<>
    <Header page="corr"/>
    <main>
      <PageHero crumb="Corridors" eyebrow="Corridors" solo={true}
        title={<>Lagos runs on <em>a handful of routes</em>.</>}
        lede="A corridor is a shared commuting route — the same stretch of road, at the same hour, travelled by hundreds of people in separate cars. Find yours, see what a seat costs, and travel it with the people already on it."
        cta={[<a key="1" href="#list" className="btn btn--primary btn--lg">Browse corridors<Icon name="arrow" size={18}/></a>,
              <a key="2" href="#request" className="btn btn--ghostline btn--lg">Request a new one</a>]}/>
      <section className="sec" id="list" style={{paddingTop:0}}><div className="wrap">
        <Rv cls="card" style={{padding:'22px 24px',display:'grid',gap:18,marginBottom:34}}>
          <div style={{display:'flex',gap:16,flexWrap:'wrap',alignItems:'center'}}>
            <div className="input" style={{flex:'1 1 260px'}}>
              <Icon name="pin" size={18} color="var(--fg-3)"/>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search a place — Ikeja, Yaba, Lekki…"
                style={{border:0,background:'transparent',outline:'none',font:'var(--type-body-lg)',color:'var(--fg-1)',width:'100%'}}/>
            </div>
            <div className="chips">{ZONES.map(z=><button key={z} className="chip" aria-pressed={zone===z} onClick={()=>setZone(z)}>{z}</button>)}</div>
          </div>
          <div className="rline"><i></i><u></u><i></i></div>
          <div style={{display:'flex',gap:26,flexWrap:'wrap'}}>
            {[[CORRIDORS.length,'corridors live'],[riders.toLocaleString(),'regular riders'],['₦0','to join either side'],['Never','surge pricing']]
              .map(([a,b])=><div key={b} style={{display:'flex',gap:8,alignItems:'baseline'}}>
                <span className="num" style={{font:'italic 400 22px/1 var(--font-serif)'}}>{a}</span><T s={13}>{b}</T></div>)}
          </div>
        </Rv>
        <div className="grid3">
          {list.map((c,i)=><Rv key={c.id} d={i*60}><CorridorCard c={c} href={c.id==='agege-ikeja'?P.cdet:'#request'}/></Rv>)}
        </div>
        {!list.length&&<p className="lede" style={{padding:'40px 0'}}>No corridor matches “{q}”. Request it below and we will notify you the moment a car owner publishes it.</p>}
      </div></section>
      <section className="sec sec--cream" id="request"><div className="wrap">
        <div className="grid2" style={{alignItems:'center',gap:40}}>
          <div>
            <SHead eyebrow="Not on the list" title={<>Corridors open when <em>people ask</em>.</>}
              lede="We add routes weekly, and the ones with waiting riders go first. Tell us where you travel and we will tell you the moment a car owner publishes it."/>
            <div style={{display:'flex',gap:10,flexWrap:'wrap',maxWidth:520}}>
              <div className="input" style={{flex:'1 1 140px'}}><input placeholder="From" style={{border:0,background:'transparent',outline:'none',font:'var(--type-body-lg)',width:'100%'}}/></div>
              <div className="input" style={{flex:'1 1 140px'}}><input placeholder="To" style={{border:0,background:'transparent',outline:'none',font:'var(--type-body-lg)',width:'100%'}}/></div>
              <button className="btn btn--primary" style={{height:52}}>Notify me</button>
            </div>
            <p className="small" style={{marginTop:14}}>We only use it to tell you about this corridor. Nothing else.</p>
          </div>
          <Rv cls="card rv--sc" style={{padding:30,display:'grid',gap:20}}>
            <p className="eyebrow" style={{margin:0}}>Recently opened</p>
            {[['Ikorodu → Lekki Phase 1','Opened 3 weeks ago','76 riders'],['Ajah → Victoria Island','Opened last month','183 riders'],['Festac → Apapa','Opened last month','64 riders']]
              .map(([a,b,c])=><div key={a} style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,paddingBottom:16,borderBottom:'1px solid var(--divider)'}}>
                <div><T s={15} w={600} c="var(--fg-1)">{a}</T><div><T s={12} c="var(--fg-3)">{b}</T></div></div>
                <T s={13} w={600} c="var(--fg-2)">{c}</T></div>)}
            <T s={12.5} c="var(--fg-3)">Five corridors are live today. Twelve more have riders waiting.</T>
          </Rv>
        </div>
      </div></section>
      <section className="sec"><div className="wrap wrap--tight" style={{textAlign:'center',display:'grid',gap:20,justifyItems:'center'}}>
        <Rv cls="eyebrow" tag="p">Route optimisation</Rv>
        <Rv d={60}><h2 className="h2" style={{maxWidth:'18ch'}}>Beat the traffic <em>together</em>.</h2></Rv>
        <Rv d={120}><p className="lede" style={{textAlign:'center'}}>Everyone on a corridor sees the same road. In-app, car owners and passengers on your route share the paths that are moving, coordinate departure times, and skip the gridlock as a group rather than one car at a time.</p></Rv>
      </div></section>
      <Band title={<>Your corridor is <em>somebody’s route</em>.</>}
        lede="Whether you are looking for a seat or filling one, start where you already travel."/>
    </main>
    <Footer/>
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<Corridors/>);
