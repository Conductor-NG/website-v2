function StepWalk({items,eyebrow,title,lede,phoneW=346,set}){
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
  return (<section className="sec" id="how"><div className="wrap">
    <SHead eyebrow={eyebrow} title={title} lede={lede}/>
    <div className="walk">
      <div className="walk__steps">{items.map((s,i)=>
        <div key={s.t} className="step" data-on={on===i?'1':'0'} ref={el=>refs.current[i]=el}>
          <div className="step__n"><b>{i+1}</b>{s.n}</div>
          <h3 className="h3">{s.t}</h3>
          <p>{s.b}</p>
          <div className="step__ph"><Phone single={s.screen} w={300} set={set}/></div>
        </div>)}
      </div>
      <div className="walk__sticky"><Phone single={items[on]?items[on].screen:0} w={phoneW} set={set}/></div>
    </div>
  </div></section>);
}
function SafetyRow({items,link=true}){
  return (<section className="sec sec--cream" id="safety"><div className="wrap">
    <SHead eyebrow="Safety, both ways" title={<>You know exactly <em>who</em> is in the car.</>}
      lede="Identity is verified before the first trip, ratings run in both directions, and two safeguards travel with you on every journey."/>
    <div className="grid3">
      {items.map(([ic,t,b],i)=>
        <Rv key={t} d={i*80} cls="feat">
          <div className="feat__ic"><Icon name={ic} size={21}/></div>
          <h3 className="h3" style={{fontSize:19}}>{t}</h3><p>{b}</p>
        </Rv>)}
    </div>
    {link&&<Rv d={240} style={{marginTop:26}}><a className="linkarrow" href={P.safety}>How verification, ratings and SOS work<Icon name="arrow" size={15}/></a></Rv>}
  </div></section>);
}
function Feedback({items,eyebrow,title,lede,cream}){
  return (<section className={'sec'+(cream?' sec--cream':'')}><div className="wrap">
    <SHead eyebrow={eyebrow} title={title} lede={lede}/>
    <div className="fb">
      {items.map((x,i)=>
        <Rv key={x.n} d={i*80} cls="fbc">
          <p className="fbc__q">“{x.t}”</p>
          <footer className="fbc__f"><Mono name={x.n} i={i}/><div><b>{x.n}</b><span>{x.r}</span></div></footer>
        </Rv>)}
    </div>
  </div></section>);
}
function Promo({eyebrow,title,body,points,cta,href}){
  return (<section className="sec" style={{paddingTop:0}}><div className="wrap">
    <Rv cls="promo rv--sc">
      <div className="promo__l">
        <p className="eyebrow" style={{margin:0,color:'var(--pink-30)'}}>{eyebrow}</p>
        <h2 className="h2" style={{color:'#fff',fontSize:'clamp(26px,2.8vw,40px)'}}>{title}</h2>
        <p style={{font:'var(--type-body-lg)',lineHeight:1.55,color:'rgba(255,255,255,.72)',maxWidth:'46ch'}}>{body}</p>
        <a href={href} className="btn btn--primary btn--lg" style={{justifySelf:'start'}}>{cta}<Icon name="arrow" size={18}/></a>
      </div>
      <ul className="promo__r">
        {points.map(t=><li key={t}><Icon name="check" size={16}/>{t}</li>)}
      </ul>
    </Rv>
  </div></section>);
}
function Carpool({role}){
  const isP=role!=='owner';
  return (<section className="sec"><div className="wrap">
    <SHead eyebrow="What Conductor is" title={<>Carpooling, but <em>scheduled</em>.</>}
      lede={isP
        ?'Not a hailing app. Nothing is summoned. Car owners publish the journeys they are already making this week, you book a seat on the one that fits your morning, and the cost of that journey is split between everyone travelling in it.'
        :'Not a driving job. Nothing is dispatched to you. You publish the journeys you are already making this week, passengers going the same way ask for a seat, and the cost of that journey is shared between everyone travelling in it.'}/>
    <VRow items={[
      ['01','Carpooling','Several people going the same way travel in one car instead of several, and share what the journey costs.'],
      ['02','Scheduled in advance','Trips are published and booked ahead for a stated time. You know the car, the person and the price the night before.'],
      ['03','Split by the seat','One journey has one cost, divided between the seats in the car. More seats sharing means less for each of them.'],
      ['04','Chosen on both sides',isP?'You pick the car owner; they approve you. Either of you can decline, without giving a reason.':'Passengers ask; you approve. You can decline as often as you like, at no cost to you.']]}/>
  </div></section>);
}
Object.assign(window,{StepWalk,SafetyRow,Feedback,Promo,Carpool});
