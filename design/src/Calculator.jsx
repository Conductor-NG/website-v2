const WEEKS=4.33, RUN_PER_KM=165;

/* Distance-based estimate, fitted to real 2026 corridor fares. The live app
   prices each seat exactly; this is the marketing estimate. */
function fareFromKm(km){
  const seat=Math.round((250+110*km)/50)*50;      // ~₦110/km + base, to nearest ₦50
  const hail=Math.round(seat*3.4/100)*100;         // hailing a whole car ≈ 3.4× a seat
  const mins=Math.max(8,Math.round(km*2.6));       // typical Lagos pace incl. traffic
  return {km,seat,hail,mins};
}

function useCount(target,ms=700){
  const [v,setV]=React.useState(target), from=React.useRef(target);
  React.useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion:reduce)').matches){from.current=target;setV(target);return}
    const a=from.current,t0=performance.now();let raf;
    const tick=t=>{const p=Math.min(1,(t-t0)/ms),e=1-Math.pow(1-p,3);setV(a+(target-a)*e);if(p<1)raf=requestAnimationFrame(tick);else from.current=target};
    raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf);
  },[target,ms]);
  return v;
}

function Calculator({lock,start}){
  const [mode,setMode]=React.useState(lock||'passenger');
  const [from,setFrom]=React.useState('ikeja');
  const [to,setTo]=React.useState('vi');
  const [days,setDays]=React.useState(5);
  const [seats,setSeats]=React.useState(2);
  const isP=mode==='passenger';

  const km=routeKm(from,to);
  const overCap=km!=null&&km>MAX_KM;
  const priced=km!=null&&!overCap;
  const c=priced?fareFromKm(km):{km:0,seat:0,hail:0,mins:0};

  const legs=2*days*WEEKS;
  const hailMonth=c.hail*legs, condMonth=c.seat*legs;
  const runMonth=c.km*legs*RUN_PER_KM, earnMonth=c.seat*seats*legs;
  const headline=useCount(priced?(isP?hailMonth-condMonth:earnMonth):0);
  const pct=runMonth?Math.round(earnMonth/runMonth*100):0;

  return React.createElement('div',{className:'calc'},
    React.createElement('div',{className:'calc__l'},
      !lock&&React.createElement('div',{className:'seg',role:'group'},
        [['passenger',"I'm a passenger"],['owner',"I'm a car owner"]].map(([k,l])=>
          React.createElement('button',{key:k,onClick:()=>setMode(k),'aria-pressed':mode===k},l))),
      React.createElement('div',{className:'calc__route2'},
        React.createElement(PlaceSearch,{label:'Pick-up',value:from,onChange:v=>setFrom(v),placeholder:'Where you start',exclude:to,accent:'var(--orange-base)'}),
        React.createElement('button',{type:'button',className:'calc__swap','aria-label':'Swap pick-up and drop-off',
          onClick:()=>{const a=from;setFrom(to);setTo(a)}},React.createElement(Icon,{name:'route',size:16})),
        React.createElement(PlaceSearch,{label:'Drop-off',value:to,onChange:v=>setTo(v),placeholder:'Where you are headed',exclude:from,accent:'var(--pink-base)'})),
      React.createElement('div',{className:'field'},
        React.createElement('label',null,'Days you commute'),
        React.createElement('div',{className:'chips'},[3,4,5,6].map(d=>
          React.createElement('button',{key:d,className:'chip',onClick:()=>setDays(d),'aria-pressed':days===d},d+' days')))),
      !isP&&React.createElement('div',{className:'field'},
        React.createElement('label',null,'Empty seats you share'),
        React.createElement('div',{className:'chips'},[1,2,3].map(s=>
          React.createElement('button',{key:s,className:'chip',onClick:()=>setSeats(s),'aria-pressed':seats===s},s+(s>1?' seats':' seat'))))),
      React.createElement('div',{style:{display:'grid',gap:10,paddingTop:4}},
        priced&&React.createElement(Row,{style:{gap:8}},React.createElement(Icon,{name:'route',size:16,color:'var(--fg-3)'}),
          React.createElement(T,{s:13.5},c.km.toFixed(1)+' km · '+c.mins+' min average, both ways · '+Math.round(legs)+' legs a month')),
        !isP&&priced&&React.createElement(Row,{style:{gap:8}},React.createElement(Icon,{name:'car',size:16,color:'var(--fg-3)'}),
          React.createElement(T,{s:13.5},'Running cost reckoned at ₦165 a km — fuel, wear and servicing.')),
        React.createElement(Row,{style:{gap:8}},React.createElement(Icon,{name:'shield',size:16,color:'var(--fg-3)'}),
          React.createElement(T,{s:13.5},'Fare agreed up front, locked at booking. No surge.')))),
    React.createElement('div',{className:'calc__r'},
      overCap
        ?React.createElement('div',{className:'calc__cap'},
            React.createElement(Icon,{name:'pin',size:22,color:'var(--orange-base)'}),
            React.createElement('div',{className:'bigfig num',style:{fontSize:'clamp(30px,4vw,44px)'}},Math.round(km)+' km'),
            React.createElement('p',{className:'small',style:{maxWidth:'32ch'}},'That is beyond the '+MAX_KM+' km a shared commute covers. Pick two points closer together — Conductor is built for the daily run across the city, not intercity trips.'))
        :!priced
        ?React.createElement('div',{className:'calc__cap'},
            React.createElement(Icon,{name:'route',size:22,color:'var(--fg-3)'}),
            React.createElement('p',{className:'small',style:{maxWidth:'30ch'}},'Search a pick-up and a drop-off to see what the route costs.'))
        :React.createElement(React.Fragment,null,
      React.createElement('div',{className:'tiny'},isP?'You keep, every month':'You collect, every month'),
      React.createElement('div',{className:'bigfig num'},naira(headline)),
      React.createElement(T,{s:14,style:{marginTop:-6}},isP
        ?'against '+naira(hailMonth)+' on a hailing app for the same '+Math.round(legs)+' legs'
        :'from '+seats+(seats>1?' seats':' seat')+' on trips you already make, against '+naira(runMonth)+' of fuel and wear'),
      isP
        ?React.createElement('div',{className:'bars'},
            React.createElement(Bar,{label:'Ride-hailing',val:hailMonth,max:hailMonth,color:'var(--cream-80)'}),
            React.createElement(Bar,{label:'Conductor seat',val:condMonth,max:hailMonth,color:'var(--orange-base)'}))
        :React.createElement('div',{className:'bars'},
            React.createElement(Bar,{label:'Your fuel, wear & servicing',val:runMonth,max:Math.max(runMonth,earnMonth),color:'var(--cream-80)'}),
            React.createElement(Bar,{label:'Covered by passengers',val:earnMonth,max:Math.max(runMonth,earnMonth),color:'var(--success-base)'})),
      React.createElement('div',{className:'ledger'},
        isP
          ?[['Per leg',naira(c.hail)+' → '+naira(c.seat)],['Every week',naira((c.hail-c.seat)*2*days)],['Over a year',naira((hailMonth-condMonth)*12)]]
              .map(([a,b])=>React.createElement('div',{key:a},a,React.createElement('b',{className:'num'},b)))
          :[['Per leg, per seat',naira(c.seat)],['Every week',naira(c.seat*seats*2*days)],['Running cost covered',pct+'%'],[pct>=100?'Left over each month':'Still on you each month',naira(Math.abs(earnMonth-runMonth))]]
              .map(([a,b])=>React.createElement('div',{key:a},a,React.createElement('b',{className:'num'},b)))),
      React.createElement('div',{style:{display:'flex',flexWrap:'wrap',gap:10,marginTop:4}},
        React.createElement(OpenAppBtn,{href:isP?LINKS.pWeb:LINKS.dWeb,label:'Open the web app',size:'sm',loc:'calculator'}),
        React.createElement(DownloadButton,{ios:isP?LINKS.pIos:LINKS.dIos,android:isP?LINKS.pAnd:LINKS.dAnd,variant:'dark',size:'sm',loc:'calculator'})),
      React.createElement(T,{s:11.5,c:'var(--fg-3)'},'Estimate from typical 2026 Lagos fares. Your exact figure is priced live in the app at booking.'))));
}
function Bar({label,val,max,color}){
  return React.createElement('div',{className:'bar'},
    React.createElement('div',{className:'bar__t'},React.createElement('span',null,label),React.createElement('b',{className:'num'},naira(val))),
    React.createElement('div',{className:'bar__r'},React.createElement('div',{className:'bar__f',style:{width:Math.max(4,val/max*100)+'%',background:color}})));
}
Object.assign(window,{Calculator,useCount,fareFromKm});
