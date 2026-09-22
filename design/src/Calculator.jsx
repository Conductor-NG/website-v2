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

/* Campaign calculator: illustration + route selects + CTA → estimate pop-up
   (trip toggle + frequency slider) → register pop-up (web app + store downloads).
   Recoloured to v2's brand. Priced with v2's routeKm + fareFromKm engine.
   Passenger frequency is Daily·Weekly; car owner adds Monthly. */
const CALC_OWNER_SEATS=3; // typical empty seats a car owner shares
const CALC_COPY={
  passenger:{ill:'/images/campaign.passenger.car.user.svg',
    title:'Route Cost Calculator',sub:'Enter your route and see how much it costs',lede:'Estimate what you spend on your daily route',cta:'Estimated Cost',
    mTitle:'Ride safe, spend less',mDesc:"We've priced your route. Turn your journey into a comfy, shared ride.",
    estLabel:'Estimated cost',mCta:'Register',regTitle:'Join in and enjoy amazing trips',
    regDesc:'Start on the web app right now, or grab it from your store.'},
  owner:{ill:'/images/campaign.driver.coined.user.svg',
    title:'Earnings Calculator',sub:'Enter your route and see how much you can earn',lede:'Estimate what you can earn on your daily route',cta:'Estimated Earning',
    mTitle:'Unlock your daily capital',mDesc:"We've priced your route. Turn your empty seats into a steady paycheck.",
    estLabel:'Estimated earning',mCta:'Claim my route',regTitle:'Your journey starts here',
    regDesc:'Start on the web app right now, or grab it from your store.'},
};
const CALC_FREQ={passenger:[['daily','Daily',1],['weekly','Weekly',5]],
  owner:[['daily','Daily',1],['weekly','Weekly',5],['monthly','Monthly',20]]};
function CalcFreqSlider({list,freq,onChange}){
  const n=list.length;
  let idx=list.findIndex(f=>f[0]===freq); if(idx<0)idx=Math.min(1,n-1);
  const pct=n>1?idx/(n-1)*100:0;
  return React.createElement('div',{className:'cslider'},
    React.createElement('div',{className:'cslider__track'},
      React.createElement('div',{className:'cslider__bg'}),
      React.createElement('div',{className:'cslider__fill',style:{width:'calc('+pct+'% - 4px)'}}),
      list.map((f,i)=>{const pos=n>1?i/(n-1)*100:0;return React.createElement('span',{key:f[0],className:'cslider__dot'+(i<=idx?' on':''),style:{left:pos+'%'}});}),
      React.createElement('div',{className:'cslider__thumb',style:{left:pct+'%'}},
        React.createElement('svg',{width:14,height:10,viewBox:'0 0 14 10',fill:'none'},
          React.createElement('path',{d:'M5 1L1.5 5L5 9',stroke:'#fff',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}),
          React.createElement('path',{d:'M9 1L12.5 5L9 9',stroke:'#fff',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}))),
      React.createElement('input',{type:'range',min:0,max:n-1,step:1,value:idx,'aria-label':'Frequency',
        onChange:e=>onChange(list[+e.target.value][0])})),
    React.createElement('div',{className:'cslider__labels'},
      list.map(f=>React.createElement('span',{key:f[0],className:f[0]===freq?'on':''},f[1]))));
}
function Calculator({lock,start}){
  const [mode,setMode]=React.useState(lock||'passenger');
  const [from,setFrom]=React.useState('');
  const [to,setTo]=React.useState('');
  const [trip,setTrip]=React.useState('one-way');
  const [freq,setFreq]=React.useState('weekly');
  const [modal,setModal]=React.useState(null);
  const isP=mode==='passenger';
  const cp=CALC_COPY[mode];
  const freqList=CALC_FREQ[mode];
  React.useEffect(()=>{if(!freqList.some(f=>f[0]===freq))setFreq('weekly');},[mode]); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(()=>{const onKey=e=>{if(e.key==='Escape')setModal(null);};document.addEventListener('keydown',onKey);return()=>document.removeEventListener('keydown',onKey);},[]);

  const km=(from&&to)?routeKm(from,to):null;
  const overCap=km!=null&&km>MAX_KM;
  const priced=km!=null&&!overCap;
  const perLeg=priced?(isP?fareFromKm(km).seat:fareFromKm(km).seat*CALC_OWNER_SEATS):0;
  const fmul=(freqList.find(f=>f[0]===freq)||freqList[0])[2];
  const estimate=Math.round(perLeg*fmul*(trip==='round-trip'?2:1)/100)*100; // nearest ₦100
  const freqWord=(freqList.find(f=>f[0]===freq)||freqList[0])[1].toLowerCase();

  const closeModal=()=>setModal(null);
  // Portal to <body> so the fixed overlay isn't trapped by the reveal wrapper's transform.
  const overlay=(inner)=>createPortal(
    React.createElement('div',{className:'cov',onClick:e=>{if(e.target===e.currentTarget)closeModal();}},inner),document.body);

  return React.createElement(React.Fragment,null,
    React.createElement('div',{className:'calc2'},
      React.createElement('div',{className:'calc2__ill'},
        React.createElement('img',{src:cp.ill,alt:'',width:453,height:423})),
      React.createElement('div',{className:'calc2__form'},
        !lock&&React.createElement('div',{className:'seg',role:'group'},
          [['passenger',"I'm a passenger"],['owner',"I'm a car owner"]].map(([k,l])=>
            React.createElement('button',{key:k,onClick:()=>setMode(k),'aria-pressed':mode===k},l))),
        React.createElement('div',null,
          React.createElement('h2',{className:'calc2__h'},cp.title),
          React.createElement('p',{className:'calc2__sub'},cp.sub),
          React.createElement('p',{className:'calc2__lede'},cp.lede)),
        React.createElement('div',{className:'calc__route2'},
          React.createElement(PlaceSearch,{label:'Starting point',value:from||null,onChange:v=>setFrom(v||''),placeholder:'Select starting point route',exclude:to,accent:'var(--orange-base)'}),
          React.createElement('button',{type:'button',className:'calc__swap','aria-label':'Swap starting point and destination',
            onClick:()=>{const a=from;setFrom(to);setTo(a)}},React.createElement(Icon,{name:'route',size:16})),
          React.createElement(PlaceSearch,{label:'Destination',value:to||null,onChange:v=>setTo(v||''),placeholder:'Select destination route',exclude:from,accent:'var(--pink-base)'})),
        React.createElement('button',{type:'button',className:'btn btn--primary calc2__cta',onClick:()=>{if(priced){setTrip('one-way');setFreq('daily');setModal('calc');track('calc_estimate',{mode,from,to,location:'calculator'});}},disabled:!priced},cp.cta),
        overCap&&React.createElement('p',{className:'small',style:{margin:'2px 0 0'}},'That route is beyond the '+MAX_KM+' km a shared commute covers — pick two points closer together.'))),

    modal==='calc'&&overlay(
      React.createElement('div',{className:'cmodal',role:'dialog','aria-modal':true},
        React.createElement('div',{className:'cmodal__head'},
          React.createElement('img',{className:'cmodal__headbg',src:'/images/campaign-modal-header-bg.svg',alt:''}),
          React.createElement('div',{className:'cmodal__htext'},
            React.createElement('h3',null,cp.mTitle),
            React.createElement('p',null,cp.mDesc)),
          React.createElement('button',{type:'button',className:'cmodal__x',onClick:closeModal,'aria-label':'Close'},React.createElement(Icon,{name:'x',size:16}))),
        React.createElement('div',{className:'cmodal__body'},
          React.createElement('div',{className:'ctt'},
            React.createElement('div',{className:'ctt__in'},
              [['one-way','One way'],['round-trip','Round trip']].map(([k,l])=>
                React.createElement('button',{key:k,type:'button',onClick:()=>setTrip(k),'aria-pressed':trip===k},l)))),
          React.createElement('p',{className:'cest-l'},cp.estLabel),
          React.createElement('p',{className:'cest-v num'},naira(estimate)),
          React.createElement('p',{className:'cest-f'},freqWord),
          React.createElement(CalcFreqSlider,{list:freqList,freq:freq,onChange:setFreq}),
          React.createElement('div',{className:'cmodal__dl'},
            React.createElement(OpenAppBtn,{href:isP?LINKS.pWeb:LINKS.dWeb,label:'Open the web app',loc:'calculator'}),
            React.createElement(DownloadButton,{ios:isP?LINKS.pIos:LINKS.dIos,android:isP?LINKS.pAnd:LINKS.dAnd,variant:'dark',loc:'calculator'}))))));
}
Object.assign(window,{Calculator,useCount,fareFromKm});
