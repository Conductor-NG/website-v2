const FREQS=[['daily','Daily',1],['weekly','Weekly',5],['monthly','Monthly',20]];
const ILLO={passenger:'public/images/campaign.passenger.car.user.svg',driver:'public/images/campaign.driver.coined.user.svg'};

function FreqSlider({value,onChange}){
  const idx=FREQS.findIndex(f=>f[0]===value);
  return React.createElement('div',{className:'freq'},
    React.createElement('input',{type:'range',min:0,max:2,step:1,value:idx,'aria-label':'How often you travel',
      onChange:e=>onChange(FREQS[+e.target.value][0]),
      style:{'--p':(idx/2*100)+'%'}}),
    React.createElement('div',{className:'freq__lb'},FREQS.map(([k,l],i)=>
      React.createElement('button',{key:k,type:'button','aria-pressed':value===k,onClick:()=>onChange(k)},l))));
}

function Quote({mode='passenger',compact}){
  const [city,setCity]=React.useState('lagos');
  const c=CITIES[city];
  const [from,setFrom]=React.useState(c.popular[0][0]);
  const [to,setTo]=React.useState(c.popular[0][1]);
  const [seats,setSeats]=React.useState(2);
  const [freq,setFreq]=React.useState('weekly');
  const [trip,setTrip]=React.useState('one-way');
  const [q,setQ]=React.useState(null);
  const [asked,setAsked]=React.useState(false);
  const km=distance(city,from,to);
  const isP=mode==='passenger';
  const reset=()=>{setQ(null);setAsked(false)};
  const swap=nc=>{const n=CITIES[nc];setCity(nc);setFrom(n.popular[0][0]);setTo(n.popular[0][1]);reset()};
  const pick=(f,t)=>{setFrom(f);setTo(t);reset()};
  const mult=FREQS.find(f=>f[0]===freq)[2]*(trip==='round-trip'?2:1);
  const legs=mult;
  const ask=async()=>{setAsked(true);setQ(await fetchQuote({city,from,to,seats:isP?1:seats}))};
  const mins=km?Math.round(km*2.6):null;
  const freqLabel=FREQS.find(f=>f[0]===freq)[1].toLowerCase();
  return React.createElement('div',{className:'quote'+(compact?' quote--compact':'')},
    React.createElement('div',{className:'quote__l'},
      React.createElement('div',{className:'quote__hd'},
        React.createElement('span',{className:'tiny'},isP?'Your commute':'Your daily drive'),
        React.createElement('div',{className:'seg seg--sm'},Object.keys(CITIES).map(k=>
          React.createElement('button',{key:k,onClick:()=>swap(k),'aria-pressed':city===k,type:'button'},CITIES[k].label)))),
      React.createElement('div',{className:'field'},
        React.createElement('label',{htmlFor:'qf'},'From'),
        React.createElement('select',{id:'qf',value:from,onChange:e=>pick(e.target.value,to)},
          c.pickups.map(([id,n,a])=>React.createElement('option',{key:id,value:id},n+' · '+a)))),
      React.createElement('div',{className:'field'},
        React.createElement('label',{htmlFor:'qt'},'To'),
        React.createElement('select',{id:'qt',value:to,onChange:e=>pick(from,e.target.value)},
          c.dests.map(([id,n,a])=>React.createElement('option',{key:id,value:id},n+' · '+a)))),
      React.createElement('div',{className:'quote__pop'},
        React.createElement('span',{className:'tiny'},'Popular'),
        React.createElement('div',{className:'chips'},c.popular.map(([f,t])=>
          React.createElement('button',{key:f+t,className:'chip chip--sm',type:'button',onClick:()=>pick(f,t)},
            shortName(city,f)+' → '+shortName(city,t))))),
      React.createElement('div',{className:'quote__ctl'},
        React.createElement('div',{className:'field'},
          React.createElement('label',null,'Trip'),
          React.createElement('div',{className:'seg'},[['one-way','One way'],['round-trip','Return']].map(([k,l])=>
            React.createElement('button',{key:k,type:'button','aria-pressed':trip===k,onClick:()=>{setTrip(k);reset()}},l)))),
        !isP&&React.createElement('div',{className:'field'},
          React.createElement('label',null,'Seats you would share'),
          React.createElement('div',{className:'chips'},[1,2,3].map(s=>
            React.createElement('button',{key:s,className:'chip',type:'button','aria-pressed':seats===s,onClick:()=>{setSeats(s);reset()}},s+(s>1?' seats':' seat'))))),
        React.createElement('div',{className:'field'},
          React.createElement('label',null,'How often'),
          React.createElement(FreqSlider,{value:freq,onChange:f=>{setFreq(f);reset()}})))),
    React.createElement('div',{className:'quote__r'},
      React.createElement('div',{className:'quote__route'},
        React.createElement('span',{className:'quote__rn'},place(city,from).name),
        React.createElement('span',{className:'dotline'},React.createElement('i'),React.createElement('u'),React.createElement('i',{style:{background:'var(--pink-base)'}})),
        React.createElement('span',{className:'quote__rn'},place(city,to).name)),
      React.createElement('div',{className:'quote__facts'},
        React.createElement('div',null,React.createElement('dt',{className:'num'},km?km.toFixed(1):'—'),React.createElement('dd',null,'km each way')),
        React.createElement('div',null,React.createElement('dt',{className:'num'},mins||'—'),React.createElement('dd',null,'minutes, typical')),
        React.createElement('div',null,React.createElement('dt',{className:'num'},legs),React.createElement('dd',null,legs===1?'leg a day':'legs a '+freqLabel.replace('ly','')))),
      React.createElement('div',{className:'quote__body'},
        React.createElement('img',{className:'quote__ill',src:ILLO[isP?'passenger':'driver'],alt:'',loading:'lazy'}),
        React.createElement('div',{className:'quote__fare'},
          !asked&&React.createElement(React.Fragment,null,
            React.createElement('span',{className:'tiny'},isP?'What a seat costs':'What the seats collect'),
            React.createElement('p',{className:'quote__ph'},isP
              ?'Fares are quoted live in the app, so what you see is what you pay — never a number that went stale on a web page.'
              :'Your figure is quoted live in the app, against the seats you choose to share.'),
            React.createElement('button',{className:'btn btn--primary',type:'button',onClick:ask,style:{height:48,justifySelf:'start'}},
              isP?'Get today\u2019s fare':'Get today\u2019s figure',React.createElement(Icon,{name:'arrow',size:17}))),
          asked&&q&&q.state==='ok'&&React.createElement(React.Fragment,null,
            React.createElement('span',{className:'tiny'},freqLabel==='daily'?'Today, this route':'Per '+freqLabel.replace('ly','')+', this route'),
            React.createElement('span',{className:'bigfig num'},naira(q.amount*mult*(isP?1:seats))),
            React.createElement('p',{className:'small'},'Quoted by the app just now — the same figure you will see at booking.')),
          asked&&q&&q.state!=='ok'&&React.createElement(React.Fragment,null,
            React.createElement('span',{className:'tiny'},'Live fare'),
            React.createElement('p',{className:'quote__ph'},'Open the app for today\u2019s figure on this route. Pricing is quoted there so it is never out of date here.'),
            React.createElement('div',{className:'storerow'},
              React.createElement(StoreBtn,{kind:'ios',href:isP?LINKS.pIos:LINKS.dIos,label:isP?'Passenger app':'Car owner app'}),
              React.createElement(StoreBtn,{kind:'play',href:isP?LINKS.pAnd:LINKS.dAnd,label:isP?'Passenger app':'Car owner app',light:true}))))),
      React.createElement('ul',{className:'checks checks--sm'},
        (isP?['The fare is agreed before you get in','No surge, at any hour or in any weather','You choose the vehicle, and the car owner']
            :['The app prices each seat for your route','You choose which passengers ride with you','Your share is released after each trip'])
          .map(t=>React.createElement('li',{key:t},React.createElement(Icon,{name:'check',size:15}),t)))));
}
Object.assign(window,{Quote,FreqSlider,FREQS});
