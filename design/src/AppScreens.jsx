/* App screens rebuilt on the design system's ui_kits:
   passenger/Screens.jsx (Home · Search · Review · Pending) and driver/DriverScreens.jsx
   (DriverHome · DriverTripRequest · DriverOngoing · DriverCreate) — same structures,
   same --type-* tokens, real avatar asset, ALL-CAPS status labels. */

const Tag=({children,tone})=>React.createElement('span',{style:{font:'var(--type-label-sm)',padding:'6px 9px',borderRadius:99,letterSpacing:'.04em',
  background:tone==='ok'?'var(--success-20)':tone==='hot'?'var(--orange-10)':'var(--cream-20)',
  color:tone==='ok'?'var(--success-90)':tone==='hot'?'var(--orange-50)':'var(--fg-2)',
  border:'1px solid '+(tone==='ok'?'var(--success-20)':tone==='hot'?'var(--orange-30)':'var(--divider)')}},children);

const BackHead=({title})=>React.createElement('div',{style:{padding:'4px 16px 6px',display:'flex',alignItems:'center',gap:10}},
  React.createElement('button',{style:{width:34,height:34,borderRadius:99,border:'1px solid var(--outline)',background:'#fff',display:'grid',placeItems:'center',cursor:'pointer',flex:'none'}},
    React.createElement(Icon,{name:'chevron',size:16,color:'var(--fg-1)',style:{transform:'rotate(180deg)'}})),
  React.createElement(T,{t:'title-md',c:'var(--fg-1)'},title));

/* DS route timeline — orange origin dot, rule, pink destination dot */
const RouteStack=({time,from,to})=>React.createElement('div',{className:'tcard'},
  React.createElement('div',{style:{display:'flex',gap:12}},
    React.createElement('div',{style:{display:'flex',flexDirection:'column',alignItems:'center',paddingTop:4}},
      React.createElement('div',{style:{width:10,height:10,borderRadius:'50%',background:'var(--orange-base)'}}),
      React.createElement('div',{style:{width:2,flex:1,minHeight:22,background:'var(--outline-strong)',margin:'4px 0'}}),
      React.createElement('div',{style:{width:10,height:10,borderRadius:'50%',background:'var(--pink-base)'}})),
    React.createElement('div',{style:{flex:1}},
      React.createElement('div',null,React.createElement(T,{t:'body-sm',c:'var(--fg-2)',ls:'.04em'},'PICK-UP · '+time)),
      React.createElement('div',{style:{marginBottom:12}},React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},from)),
      React.createElement('div',null,React.createElement(T,{t:'body-sm',c:'var(--fg-2)',ls:'.04em'},'DROP-OFF')),
      React.createElement('div',null,React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},to)))));

const Field=({label,value,accent})=>React.createElement('div',{style:{flex:1,display:'grid',gap:6}},
  React.createElement(T,{t:'label-md',c:'var(--fg-2)'},label),
  React.createElement('div',{style:{display:'flex',alignItems:'center',gap:9,background:'var(--surface-gray)',borderRadius:12,padding:'11px 13px'}},
    accent&&React.createElement(Icon,{name:'pin',size:15,color:accent}),
    React.createElement(T,{t:'body-md',c:'var(--fg-1)'},value)));

/* ---------------- passenger extras ---------------- */
const VEHICLES=[['Saloon','Corolla, Elantra','Standard',4],['SUV','CR-V, Highlander','Roomier',4],['Bus','Hiace, Sienna','Best value',7]];
function PScrVehicle(){
  return React.createElement(React.Fragment,null,React.createElement(StatusBar,null),
    React.createElement(BackHead,{title:'Choose a vehicle'}),
    React.createElement('div',{className:'scr__body'},
      React.createElement(T,{t:'body-sm',c:'var(--fg-3)'},'Agege → Ikeja GRA · 7 car owners this morning'),
      VEHICLES.map(([n,ex,pr,seats],i)=>
        React.createElement('div',{key:n,className:'tcard'+(i===1?' tcard--hot':''),style:{gap:9}},
          React.createElement(Row,null,
            React.createElement('div',{style:{width:42,height:42,borderRadius:12,background:i===1?'var(--orange-10)':'var(--surface-gray)',display:'grid',placeItems:'center',flex:'none'}},
              React.createElement(Icon,{name:'car',size:21,color:i===1?'var(--orange-50)':'var(--fg-2)'})),
            React.createElement('div',{style:{flex:1,display:'grid',gap:2}},
              React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},n),
              React.createElement(T,{t:'body-sm',c:'var(--fg-3)'},ex+' · up to '+seats+' seats')),
            React.createElement(T,{t:'label-sm',c:i===1?'var(--orange-50)':'var(--fg-3)',ls:'.04em'},pr)),
          i===1&&React.createElement(Row,{style:{gap:6}},React.createElement(Icon,{name:'check',size:13,color:'var(--success-base)'}),React.createElement(T,{t:'body-sm'},'Air conditioning on every listed trip')))),
      React.createElement('div',{style:{marginTop:'auto',display:'grid',gap:8}},
        React.createElement(T,{t:'body-sm',c:'var(--fg-3)',style:{textAlign:'center'}},'You pick the vehicle, then the car owner'),
        React.createElement(DSB,{variant:'primary',block:true,style:{height:44,font:'var(--type-button-md)'}},'See SUVs on this route'))),
    React.createElement(NavBar,{on:0}));
}
function PScrRate(){
  return React.createElement(React.Fragment,null,React.createElement(StatusBar,null),
    React.createElement('div',{className:'scr__body',style:{gap:14}},
      React.createElement('div',{style:{display:'grid',gap:8,justifyItems:'center',paddingTop:16}},
        React.createElement(Avatar,{size:60}),
        React.createElement(T,{t:'title-md',c:'var(--fg-1)'},'You arrived at 7:52 AM'),
        React.createElement(T,{t:'body-sm',c:'var(--fg-3)'},'Ikeja GRA · with Michael O.')),
      React.createElement('div',{style:{display:'flex',gap:7,justifyContent:'center',padding:'6px 0'}},
        [1,2,3,4,5].map(i=>React.createElement('svg',{key:i,width:28,height:28,viewBox:'0 0 24 24',fill:'var(--orange-base)',stroke:'var(--orange-base)',strokeWidth:1.6},
          React.createElement('path',{d:IC.star})))),
      React.createElement('div',{style:{display:'flex',gap:6,flexWrap:'wrap',justifyContent:'center'}},
        ['Punctual','Clean car','Good company'].map(t=>React.createElement(Tag,{key:t,tone:'ok'},t))),
      React.createElement('div',{className:'tcard',style:{gap:8}},
        React.createElement(Row,{style:{justifyContent:'space-between'}},React.createElement(T,{t:'body-md'},'Fare released to Michael'),React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},'₦1,300')),
        React.createElement(Row,{style:{justifyContent:'space-between'}},React.createElement(T,{t:'body-md'},'You saved, against hailing'),React.createElement(T,{t:'title-sm',c:'var(--success-base)'},'₦3,000'))),
      React.createElement('div',{style:{marginTop:'auto',display:'grid',gap:8}},
        React.createElement(DSB,{variant:'primary',block:true,style:{height:44,font:'var(--type-button-md)'}},'Submit rating'),
        React.createElement(DSB,{variant:'outline',block:true,style:{height:44,font:'var(--type-button-md)'}},'Book Michael again'))));
}

/* ---------------- driver screens (DS DriverCreate) ---------------- */
function DScrCreate(){
  return React.createElement(React.Fragment,null,React.createElement(StatusBar,null),
    React.createElement(BackHead,{title:'Create trip'}),
    React.createElement('div',{className:'scr__body'},
      React.createElement(Field,{label:'Pick-up point',value:'Agege Bus Stop',accent:'var(--orange-base)'}),
      React.createElement(Field,{label:'Drop-off point',value:'Ikeja GRA',accent:'var(--pink-base)'}),
      React.createElement(Row,{style:{gap:12,alignItems:'flex-start'}},
        React.createElement(Field,{label:'Date',value:'Tomorrow'}),
        React.createElement(Field,{label:'Time',value:'6:40 AM'})),
      React.createElement(Row,{style:{gap:12,alignItems:'flex-start'}},
        React.createElement(Field,{label:'Seats',value:'2 of 4'}),
        React.createElement(Field,{label:'Price per seat',value:'₦1,300'})),
      React.createElement(Row,{style:{gap:8}},
        React.createElement(Icon,{name:'check',size:14,color:'var(--success-base)'}),
        React.createElement(T,{t:'body-sm'},'Priced for this route · ₦1,200 a seat')),
      React.createElement('div',{style:{marginTop:'auto'}},
        React.createElement(DSB,{variant:'primary',block:true,style:{height:44,font:'var(--type-button-md)'}},'Publish trip'))),
    React.createElement(NavBar,{on:0}));
}
/* DS DriverHome trip list, with the REQUEST status label */
function DScrRequests(){
  const R=[['Ada M.',4.9,86,'Agege → Allen','1 seat',1],['Ngozi U.',5.0,140,'Agege → Ikeja GRA','2 seats',0]];
  return React.createElement(React.Fragment,null,React.createElement(StatusBar,null),
    React.createElement(ScrHead,{title:'Choose your passengers',sub:'3 requests · 2 seats free',
      right:React.createElement('div',{style:{width:34,height:34,borderRadius:99,background:'var(--cream-20)',display:'grid',placeItems:'center',position:'relative'}},
        React.createElement(Icon,{name:'bell',size:17,color:'var(--fg-1)'}),
        React.createElement('i',{style:{position:'absolute',top:7,right:8,width:6,height:6,borderRadius:99,background:'var(--pink-base)'}}))}),
    React.createElement('div',{className:'scr__body'},
      R.map(([n,rt,tr,route,seats,hot],i)=>
        React.createElement('div',{key:n,className:'tcard'+(hot?' tcard--hot':''),style:{gap:10}},
          React.createElement(Row,{style:{justifyContent:'space-between'}},
            React.createElement(Caps,null,'REQUEST'),
            React.createElement(T,{t:'label-md',c:'var(--fg-2)'},seats)),
          React.createElement(Row,null,i===0?React.createElement(Avatar,null):React.createElement(Mono,{name:n,i:i+1}),
            React.createElement('div',{style:{flex:1,display:'grid',gap:2}},
              React.createElement(Row,{style:{gap:5}},React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},n),React.createElement(Verified,null)),
              React.createElement(Stars,{v:rt,n:tr+' trips'}))),
          React.createElement(T,{t:'body-md',c:'var(--fg-1)'},route),
          React.createElement(Row,{style:{gap:7}},
            React.createElement(DSB,{variant:'outline',size:'sm',style:{flex:1}},'Decline'),
            React.createElement(DSB,{variant:'primary',size:'sm',style:{flex:2}},'Accept')))),
      React.createElement(Row,{style:{gap:8,justifyContent:'center',paddingTop:2}},
        React.createElement(T,{t:'label-md',c:'var(--orange-50)'},'1 more request waiting'),
        React.createElement(Icon,{name:'chevronD',size:14,color:'var(--orange-50)'}))),
    React.createElement(NavBar,{on:1}));
}
/* DS DriverTripRequest */
function DScrRequestDetail(){
  return React.createElement(React.Fragment,null,React.createElement(StatusBar,null),
    React.createElement(BackHead,{title:'Trip request'}),
    React.createElement('div',{className:'scr__body'},
      React.createElement('div',{style:{background:'var(--cream-20)',padding:14,borderRadius:12,display:'flex',gap:12,alignItems:'center'}},
        React.createElement(Avatar,{size:52}),
        React.createElement('div',{style:{flex:1,display:'grid',gap:2}},
          React.createElement(Row,{style:{gap:5}},React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},'Ada Mbakwe'),React.createElement(Verified,null)),
          React.createElement(Stars,{v:4.9,n:'86 trips'}),
          React.createElement(T,{t:'body-sm',c:'var(--fg-3)'},'NIN verified · 8 months')),
        React.createElement('div',{style:{width:34,height:34,borderRadius:99,background:'#fff',border:'1px solid var(--outline)',display:'grid',placeItems:'center'}},
          React.createElement(Icon,{name:'chat',size:15,color:'var(--fg-1)'}))),
      React.createElement(RouteStack,{time:'6:40 AM',from:'Agege Bus Stop',to:'Allen Avenue'}),
      React.createElement('div',{className:'tcard'},
        React.createElement(Row,{style:{justifyContent:'space-between'}},
          React.createElement('div',{style:{display:'grid',gap:3}},
            React.createElement(T,{t:'body-sm',c:'var(--fg-2)'},'Passenger pays'),
            React.createElement('span',{style:{font:'var(--type-title-lg)',color:'var(--orange-base)'}},'₦1,300')),
          React.createElement('div',{style:{textAlign:'right',display:'grid',gap:3}},
            React.createElement(T,{t:'body-sm',c:'var(--fg-2)'},'1 seat'),
            React.createElement(T,{t:'body-sm',c:'var(--fg-2)'},'~35 mins')))),
      React.createElement(Row,{style:{gap:8}},
        React.createElement(Icon,{name:'shield',size:14,color:'var(--success-base)'}),
        React.createElement(T,{t:'body-sm'},'Held in escrow until the trip is complete')),
      React.createElement('div',{style:{marginTop:'auto',display:'flex',gap:10}},
        React.createElement(DSB,{variant:'outline',style:{flex:1,height:44,font:'var(--type-button-md)'}},'Decline'),
        React.createElement(DSB,{variant:'primary',style:{flex:2,height:44,font:'var(--type-button-md)'}},'Accept trip'))),
    React.createElement(NavBar,{on:1}));
}
/* DS DriverOngoing */
function DScrOngoing(){
  return React.createElement(React.Fragment,null,React.createElement(StatusBar,null),
    React.createElement(BackHead,{title:'Ongoing trip'}),
    React.createElement('div',{className:'scr__body',style:{gap:12}},
      React.createElement(MiniMap,{h:180}),
      React.createElement('div',{className:'tcard',style:{gap:10}},
        React.createElement(Row,null,React.createElement(Avatar,{size:40}),
          React.createElement('div',{style:{flex:1,display:'grid',gap:2}},
            React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},'Ada Mbakwe'),
            React.createElement(T,{t:'body-sm',c:'var(--fg-3)'},'Pick-up in 6 mins · Pen Cinema')),
          React.createElement('div',{style:{width:34,height:34,borderRadius:99,background:'var(--orange-10)',display:'grid',placeItems:'center'}},
            React.createElement(Icon,{name:'chat',size:15,color:'var(--orange-50)'})))),
      React.createElement('div',{style:{background:'var(--cream-20)',padding:14,borderRadius:12,display:'flex',justifyContent:'space-between'}},
        React.createElement('div',{style:{display:'grid',gap:3}},
          React.createElement(T,{t:'body-sm',c:'var(--fg-2)'},'Status'),
          React.createElement(T,{t:'title-sm',c:'var(--orange-base)'},'Heading to pick-up')),
        React.createElement('div',{style:{textAlign:'right',display:'grid',gap:3}},
          React.createElement(T,{t:'body-sm',c:'var(--fg-2)'},'Fare'),
          React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},'₦2,600'))),
      React.createElement(Row,{style:{gap:9}},
        React.createElement(DSB,{variant:'outline',style:{flex:1,height:42,font:'var(--type-button-md)',gap:7}},React.createElement(Icon,{name:'share',size:15}),'Share trip'),
        React.createElement('button',{style:{width:42,height:42,borderRadius:99,border:'1px solid var(--pink-20)',background:'var(--pink-10)',color:'var(--pink-base)',display:'grid',placeItems:'center',cursor:'pointer',flex:'none'}},
          React.createElement(Icon,{name:'alert',size:17})))),
    React.createElement(NavBar,{on:1}));
}
/* DS DriverHome — earnings surface on --primary-base, activity toggle, week/acceptance/rating */
function DScrHome(){
  return React.createElement(React.Fragment,null,React.createElement(StatusBar,null),
    React.createElement(ScrHead,{title:'Adebayo',sub:'Good morning',
      right:React.createElement('div',{style:{width:34,height:34,borderRadius:99,background:'var(--cream-20)',display:'grid',placeItems:'center'}},
        React.createElement(Icon,{name:'bell',size:17,color:'var(--fg-1)'}))}),
    React.createElement('div',{className:'scr__body'},
      React.createElement('div',{style:{background:'var(--primary-base)',color:'#fff',borderRadius:16,padding:16,display:'grid',gap:14}},
        React.createElement('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:10}},
          React.createElement('div',{style:{display:'grid',gap:5}},
            React.createElement(T,{t:'body-sm',c:'rgba(255,255,255,.7)',ls:'.04em',style:{textTransform:'uppercase'}},'Today’s earnings'),
            React.createElement('span',{style:{font:'var(--type-headline-md)'}},'₦8,400'),
            React.createElement(T,{t:'body-sm',c:'rgba(255,255,255,.7)'},'3 trips · 2 seats avg')),
          React.createElement('div',{style:{padding:'6px 12px',borderRadius:999,background:'var(--orange-base)',font:'var(--type-label-md)',display:'flex',alignItems:'center',gap:8,flex:'none'}},
            React.createElement('div',{style:{width:8,height:8,borderRadius:'50%',background:'var(--success-20)'}}),'Online')),
        React.createElement('div',{style:{display:'flex',gap:12,paddingTop:14,borderTop:'1px solid rgba(255,255,255,.12)'}},
          [['This week','₦42,800'],['Acceptance','94%'],['Rating','★ 4.9']].map(([a,b])=>
            React.createElement('div',{key:a,style:{flex:1,display:'grid',gap:3}},
              React.createElement(T,{t:'body-sm',c:'rgba(255,255,255,.7)'},a),
              React.createElement(T,{t:'title-sm',c:'#fff'},b))))),
      React.createElement(Row,{style:{justifyContent:'space-between'}},
        React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},'Today’s trips'),
        React.createElement(DSB,{variant:'tonal',size:'sm'},'New trip')),
      [['SCHEDULED','6:40 AM','Agege → Ikeja GRA','2/4','2 passengers','var(--fg-2)'],
       ['COMPLETED','5:30 PM','Ikeja GRA → Agege','3/4','+₦3,900','var(--success-90)']].map(([st,tm,route,seats,pax,col])=>
        React.createElement('div',{key:tm,className:'tcard',style:{gap:7}},
          React.createElement(Row,{style:{justifyContent:'space-between'}},
            React.createElement(Caps,{c:col},st+' · '+tm),
            React.createElement(T,{t:'label-md',c:'var(--fg-2)'},seats)),
          React.createElement(T,{t:'body-lg',c:'var(--fg-1)'},route),
          React.createElement(T,{t:'body-sm',c:'var(--fg-2)'},pax)))),
    React.createElement(NavBar,{on:0}));
}
/* ---------------- passenger: map browse ---------------- */
function PScrMap(){
  const pins=[['22%','30%','₦1,300',1],['58%','20%','₦1,200',0],['40%','52%','₦1,500',0],['70%','62%','₦1,250',0]];
  return React.createElement(React.Fragment,null,React.createElement(StatusBar,null),
    React.createElement(ScrHead,{title:'Trips near you',sub:'12 published for tomorrow morning'}),
    React.createElement('div',{className:'scr__body',style:{gap:11}},
      React.createElement(MiniMap,{h:250,pin:false},
        pins.map(([l,t,p,hot],i)=>React.createElement('div',{key:i,style:{position:'absolute',left:l,top:t,transform:'translate(-50%,-100%)',
          background:hot?'var(--orange-base)':'#fff',color:hot?'#fff':'var(--fg-1)',border:'1px solid '+(hot?'var(--orange-base)':'var(--outline)'),
          borderRadius:99,padding:'5px 10px',font:'var(--type-label-md)',boxShadow:'var(--elev-2)',whiteSpace:'nowrap'}},p)),
        React.createElement('div',{style:{position:'absolute',left:'44%',bottom:'12%',width:14,height:14,borderRadius:99,background:'var(--pink-base)',border:'3px solid #fff',boxShadow:'var(--elev-1)'}})),
      React.createElement(Row,{style:{gap:6,flexWrap:'wrap'}},
        ['Tomorrow','6–7 AM','Any vehicle'].map(t=>React.createElement(Tag,{key:t},t))),
      React.createElement('div',{className:'tcard',style:{gap:8}},
        React.createElement(Row,{style:{justifyContent:'space-between'}},
          React.createElement(Caps,{c:'var(--fg-2)'},'CLOSEST TO YOU'),
          React.createElement(T,{t:'label-md',c:'var(--fg-2)'},'400 m')),
        React.createElement(Row,null,React.createElement(Avatar,{size:34}),
          React.createElement('div',{style:{flex:1,display:'grid',gap:1}},
            React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},'Michael O. · 6:40 AM'),
            React.createElement(T,{t:'body-sm',c:'var(--fg-3)'},'2 seats left · Corolla')),
          React.createElement(T,{t:'title-sm',c:'var(--orange-base)'},'₦1,300')))),
    React.createElement(NavBar,{on:0}));
}
/* ---------------- passenger: request sent ---------------- */
function PScrRequestSent(){
  return React.createElement(React.Fragment,null,React.createElement(StatusBar,null),
    React.createElement(BackHead,{title:'Your trip'}),
    React.createElement('div',{className:'scr__body',style:{gap:13}},
      React.createElement('div',{className:'tcard',style:{gap:11,borderColor:'var(--pink-20)',background:'var(--pink-10)'}},
        React.createElement(Caps,null,'TRIP REQUEST SENT'),
        React.createElement(T,{t:'title-md',c:'var(--fg-1)'},'Waiting for Michael'),
        React.createElement(T,{t:'body-md'},'You will get a notification the moment your request is accepted.'),
        React.createElement('div',{style:{display:'flex',gap:4}},[1,2,3].map(i=>
          React.createElement('div',{key:i,style:{flex:1,height:6,borderRadius:99,background:i<2?'var(--pink-base)':'var(--pink-20)'}})))),
      React.createElement(RouteStack,{time:'6:40 AM',from:'Agege Bus Stop',to:'Ikeja GRA'}),
      React.createElement('div',{className:'tcard',style:{gap:8}},
        React.createElement(Row,{style:{justifyContent:'space-between'}},React.createElement(T,{t:'body-md'},'Your seat'),React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},'₦1,300')),
        React.createElement(Row,{style:{justifyContent:'space-between'}},React.createElement(T,{t:'body-md'},'Status'),React.createElement(T,{t:'title-sm',c:'var(--pink-base)'},'Held in escrow'))),
      React.createElement('div',{style:{marginTop:'auto',display:'grid',gap:8}},
        React.createElement(DSB,{variant:'outline',block:true,style:{height:44,font:'var(--type-button-md)'}},'Cancel request'))));
}
/* ---------------- SOS, both apps ---------------- */
function SOSScreen({who,triggered}){
  if(triggered) return React.createElement(SOSTriggered,{who});
  return React.createElement(React.Fragment,null,React.createElement(StatusBar,null),
    React.createElement(BackHead,{title:'Emergency'}),
    React.createElement('div',{className:'scr__body',style:{gap:14}},
      React.createElement('div',{style:{display:'grid',justifyItems:'center',gap:12,padding:'10px 0',borderRadius:16,background:'var(--pink-10)',border:'1px solid var(--pink-20)'}},
        React.createElement('div',{style:{width:104,height:104,borderRadius:99,background:'var(--pink-base)',color:'#fff',display:'grid',placeItems:'center',font:'var(--type-title-lg)',letterSpacing:'.06em',position:'relative'}},'HOLD',
          React.createElement('span',{style:{position:'absolute',inset:-10,borderRadius:99,border:'1px solid var(--pink-60)'}})),
        React.createElement(T,{t:'body-sm',c:'var(--fg-2)',style:{textAlign:'center',maxWidth:'24ch'}},'Hold for three seconds to raise an alert')),
      React.createElement('div',{className:'tcard',style:{gap:10}},
        React.createElement(Caps,{c:'var(--fg-2)'},'THIS ALERTS, AT ONCE'),
        [['Emergency services','With your live coordinates'],['Your trusted contacts','3 people on your list'],['Conductor safety team','With full trip details']]
          .map(([a,b])=>React.createElement(Row,{key:a,style:{gap:10}},
            React.createElement(Icon,{name:'check',size:15,color:'var(--success-base)'}),
            React.createElement('div',{style:{display:'grid',gap:1,flex:1}},
              React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},a),
              React.createElement(T,{t:'body-sm',c:'var(--fg-3)'},b))))),
      React.createElement(Row,{style:{gap:8}},
        React.createElement(Icon,{name:'shield',size:14,color:'var(--fg-3)'}),
        React.createElement(T,{t:'body-sm'},who==='driver'?'Available to you and to your passengers':'Available to you and to your car owner')),
      React.createElement('div',{style:{marginTop:'auto'}},
        React.createElement(DSB,{variant:'outline',block:true,style:{height:44,font:'var(--type-button-md)'}},'Suspend this trip instead'))),
    React.createElement(NavBar,{on:1}));
}
/* SOS after it's been held — alert active, location broadcasting. */
function SOSTriggered({who}){
  return React.createElement(React.Fragment,null,React.createElement(StatusBar,null),
    React.createElement(BackHead,{title:'SOS active'}),
    React.createElement('div',{className:'scr__body',style:{gap:14}},
      React.createElement('div',{style:{display:'grid',justifyItems:'center',gap:12,padding:'20px 0 18px',borderRadius:16,background:'var(--pink-10)',border:'1px solid var(--pink-20)'}},
        React.createElement('div',{style:{position:'relative',width:116,height:116,display:'grid',placeItems:'center'}},
          React.createElement('span',{className:'sos-ring',style:{position:'absolute',inset:6,borderRadius:99,border:'2px solid var(--pink-base)'}}),
          React.createElement('span',{className:'sos-ring',style:{position:'absolute',inset:6,borderRadius:99,border:'2px solid var(--pink-base)',animationDelay:'.6s'}}),
          React.createElement('div',{className:'sos-active',style:{width:98,height:98,borderRadius:99,background:'var(--pink-base)',color:'#fff',display:'grid',placeItems:'center',font:'var(--type-title-lg)',letterSpacing:'.12em'}},'SOS')),
        React.createElement(T,{t:'title-sm',c:'var(--pink-base)',style:{textAlign:'center'}},'Alert sent'),
        React.createElement(T,{t:'body-sm',c:'var(--fg-2)',style:{textAlign:'center',maxWidth:'26ch'}},'Sharing your live location now')),
      React.createElement('div',{className:'tcard',style:{gap:10}},
        React.createElement(Caps,{c:'var(--fg-2)'},'NOTIFIED JUST NOW'),
        [['Emergency services','Your live coordinates sent'],['Your trusted contacts','3 people alerted'],['Conductor safety team','Watching your trip live']]
          .map(([a,b])=>React.createElement(Row,{key:a,style:{gap:10}},
            React.createElement(Icon,{name:'check',size:15,color:'var(--success-base)'}),
            React.createElement('div',{style:{display:'grid',gap:1,flex:1}},
              React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},a),
              React.createElement(T,{t:'body-sm',c:'var(--fg-3)'},b))))),
      React.createElement('div',{style:{marginTop:'auto'}},
        React.createElement(DSB,{variant:'outline',block:true,style:{height:44,font:'var(--type-button-md)'}},"I'm safe — cancel alert"))),
    React.createElement(NavBar,{on:1}));
}
const PScrSOS=()=>React.createElement(SOSScreen,{who:'passenger'});
const DScrSOS=()=>React.createElement(SOSScreen,{who:'driver',triggered:true});

/* ---------------- profile + verification, both apps ---------------- */
function ProfileScreen({who}){
  const checks=who==='driver'
    ? [['NIN verified','Matched to your legal name'],['Driver’s licence','Valid until Mar 2029'],['Vehicle papers','Corolla · AKD 234 XY'],['Roadworthiness','Certificate current']]
    : [['NIN verified','Matched to your legal name'],['Phone verified','Confirmed by OTP'],['Emergency contacts','3 people added'],['Payment method','Card ending 4417']];
  return React.createElement(React.Fragment,null,React.createElement(StatusBar,null),
    React.createElement(ScrHead,{title:'Your profile',sub:who==='driver'?'Car owner account':'Passenger account'}),
    React.createElement('div',{className:'scr__body',style:{gap:12}},
      React.createElement('div',{className:'tcard',style:{gap:12}},
        React.createElement(Row,null,React.createElement(Avatar,{size:52}),
          React.createElement('div',{style:{flex:1,display:'grid',gap:2}},
            React.createElement(Row,{style:{gap:5}},React.createElement(T,{t:'title-md',c:'var(--fg-1)'},who==='driver'?'Adebayo O.':'Ada Mbakwe'),React.createElement(Verified,null)),
            React.createElement(Stars,{v:4.9,n:who==='driver'?'214 trips':'86 trips'}))),
        React.createElement(Row,{style:{gap:6,flexWrap:'wrap'}},
          React.createElement(Tag,{tone:'ok'},'Fully verified'),
          React.createElement(Tag,null,who==='driver'?'2 yrs on Conductor':'8 months'))),
      React.createElement('div',{className:'tcard',style:{gap:11}},
        React.createElement(Caps,{c:'var(--fg-2)'},'VERIFICATION'),
        checks.map(([a,b])=>React.createElement(Row,{key:a,style:{gap:10}},
          React.createElement(Icon,{name:'check',size:15,color:'var(--success-base)'}),
          React.createElement('div',{style:{display:'grid',gap:1,flex:1}},
            React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},a),
            React.createElement(T,{t:'body-sm',c:'var(--fg-3)'},b))))),
      React.createElement(Row,{style:{gap:8}},
        React.createElement(Icon,{name:'eye',size:14,color:'var(--fg-3)'}),
        React.createElement(T,{t:'body-sm'},'This is what the other side sees before agreeing to travel.'))),
    React.createElement(NavBar,{on:3}));
}
const PScrProfile=()=>React.createElement(ProfileScreen,{who:'passenger'});
const DScrProfile=()=>React.createElement(ProfileScreen,{who:'driver'});

/* ---------------- passenger: the week's schedule + one payment ---------------- */
function PScrSchedule(){
  const days=[['Mon','Agege → Ikeja GRA','₦1,300','done'],['Tue','Agege → Ikeja GRA','₦1,300','done'],['Wed','Agege → Ikeja GRA','₦1,300','held'],['Thu','Agege → Ikeja GRA','₦1,300','held'],['Fri','Agege → Ikeja GRA','₦1,300','held']];
  return React.createElement(React.Fragment,null,React.createElement(StatusBar,null),
    React.createElement(ScrHead,{title:'Your schedule',sub:'Week of 12 August · 5 trips'}),
    React.createElement('div',{className:'scr__body',style:{gap:11}},
      React.createElement('div',{style:{background:'var(--primary-base)',color:'#fff',borderRadius:16,padding:15,display:'grid',gap:8}},
        React.createElement(T,{t:'body-sm',c:'rgba(255,255,255,.7)',ls:'.04em',style:{textTransform:'uppercase'}},'Paid for the week'),
        React.createElement('span',{style:{font:'var(--type-headline-md)'}},'₦6,500'),
        React.createElement(Row,{style:{gap:7}},
          React.createElement(Icon,{name:'shield',size:14,color:'var(--success-20)'}),
          React.createElement(T,{t:'body-sm',c:'rgba(255,255,255,.7)'},'₦3,900 still held · released per trip'))),
      React.createElement('div',{className:'tcard',style:{gap:9}},
        days.map(([d,r,p,st])=>React.createElement(Row,{key:d,style:{gap:10}},
          React.createElement('div',{style:{width:34,height:34,borderRadius:9,background:st==='done'?'var(--success-20)':'var(--cream-20)',display:'grid',placeItems:'center',flex:'none'}},
            React.createElement(T,{t:'label-md',c:st==='done'?'var(--success-90)':'var(--fg-2)'},d)),
          React.createElement('div',{style:{flex:1,display:'grid',gap:1}},
            React.createElement(T,{t:'body-md',c:'var(--fg-1)'},r),
            React.createElement(T,{t:'body-sm',c:st==='done'?'var(--success-90)':'var(--fg-3)'},st==='done'?'Released to driver':'Held in escrow')),
          React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},p)))),
      React.createElement(Row,{style:{gap:8}},
        React.createElement(Icon,{name:'check',size:14,color:'var(--success-base)'}),
        React.createElement(T,{t:'body-sm'},'Cancel any day and that day’s fare is refunded in full.'))),
    React.createElement(NavBar,{on:1}));
}

/* ---------------- communities, both apps ---------------- */
function CommunityScreen({who}){
  const list=[['Access Bank, Marina','Verified workplace',412,1],['Magodo Residents','Verified estate',188,0],['UNILAG Staff','Verified campus',96,0]];
  return React.createElement(React.Fragment,null,React.createElement(StatusBar,null),
    React.createElement(ScrHead,{title:'Communities',sub:who==='driver'?'Choose who you carry':'Travel with people you know'}),
    React.createElement('div',{className:'scr__body',style:{gap:11}},
      React.createElement('div',{className:'tcard',style:{gap:8,borderColor:'var(--orange-30)',background:'var(--orange-10)'}},
        React.createElement(Caps,{c:'var(--orange-50)'},'YOUR COMMUNITY'),
        React.createElement(T,{t:'title-md',c:'var(--fg-1)'},'Access Bank, Marina'),
        React.createElement(T,{t:'body-sm'},who==='driver'?'Only members can request your seats.':'Only members can see trips posted here.')),
      list.map(([n,kind,members,joined])=>React.createElement('div',{key:n,className:'tcard',style:{gap:9}},
        React.createElement(Row,null,
          React.createElement('div',{style:{width:38,height:38,borderRadius:10,background:'var(--cream-20)',display:'grid',placeItems:'center',flex:'none'}},
            React.createElement(Icon,{name:'users',size:18,color:'var(--fg-2)'})),
          React.createElement('div',{style:{flex:1,display:'grid',gap:1}},
            React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},n),
            React.createElement(T,{t:'body-sm',c:'var(--fg-3)'},kind+' · '+members+' members')),
          joined?React.createElement(Tag,{tone:'ok'},'Joined'):React.createElement(DSB,{variant:'outline',size:'sm'},'Join')))),
      React.createElement('div',{style:{marginTop:'auto'}},
        React.createElement(DSB,{variant:'primary',block:true,style:{height:44,font:'var(--type-button-md)'}},'Create a community'))),
    React.createElement(NavBar,{on:2}));
}
const PScrCommunity=()=>React.createElement(CommunityScreen,{who:'passenger'});
const DScrCommunity=()=>React.createElement(CommunityScreen,{who:'driver'});

/* ---------------- driver: approved confirmation ---------------- */
function DScrApproved(){
  return React.createElement(React.Fragment,null,React.createElement(StatusBar,null),
    React.createElement(BackHead,{title:'Passenger approved'}),
    React.createElement('div',{className:'scr__body',style:{gap:13}},
      React.createElement('div',{className:'tcard',style:{gap:11,borderColor:'var(--success-20)',background:'var(--success-20)',alignItems:'center',justifyItems:'center',textAlign:'center'}},
        React.createElement('div',{style:{width:56,height:56,borderRadius:99,background:'var(--success-base)',color:'#fff',display:'grid',placeItems:'center'}},
          React.createElement(Icon,{name:'check',size:28,sw:2.6})),
        React.createElement(Caps,{c:'var(--success-90)'},'APPROVED'),
        React.createElement(T,{t:'title-md',c:'var(--fg-1)'},'Ada is riding with you'),
        React.createElement(T,{t:'body-md',style:{textAlign:'center'}},'She has been notified and the meeting point is now shared with you both.')),
      React.createElement('div',{className:'tcard',style:{gap:9}},
        React.createElement(Caps,{c:'var(--fg-2)'},'SEATS ON THIS TRIP'),
        React.createElement(Row,{style:{gap:7}},
          [['Ada M.',1],['Ngozi U.',1],['Free',0]].map(([n,taken],i)=>
            React.createElement('div',{key:i,style:{flex:1,padding:'9px 6px',borderRadius:10,textAlign:'center',
              background:taken?'var(--cream-20)':'var(--surface-gray)',border:'1px solid '+(taken?'var(--divider)':'var(--outline)')}},
              React.createElement(T,{t:'label-md',c:taken?'var(--fg-1)':'var(--fg-3)'},n)))),
        React.createElement(Row,{style:{justifyContent:'space-between'}},
          React.createElement(T,{t:'body-md'},'Fare split, 2 of 3 seats'),
          React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},'₦2,600'))),
      React.createElement('div',{style:{marginTop:'auto',display:'grid',gap:8}},
        React.createElement(DSB,{variant:'primary',block:true,style:{height:44,font:'var(--type-button-md)'}},'Start the trip'),
        React.createElement(T,{t:'body-sm',c:'var(--fg-3)',style:{textAlign:'center'}},'Fares release to you when each trip completes'))),
    React.createElement(NavBar,{on:1}));
}

/* Real v3 app screenshots (captured from design/backup/*.html). Community has no
   v3 design yet, so those two slots keep the hand-built React mockup as a fallback. */
const PSCREENS=[SCREENS[0],SHOT('pax-01-map'),SHOT('pax-02-results'),SCREENS[1],SHOT('pax-04-waiting'),SCREENS[2],SHOT('pax-06-sos'),SHOT('pax-07-rate'),SHOT('pax-08-schedule'),SHOT('pax-09-verification'),SHOT('pax-10-community'),SHOT('pax-11-cost'),SHOT('pax-ikorodu'),SHOT('pax-seat-select'),SHOT('pax-livetrip')];
const DSCREENS=[SHOT('drv-00-create'),SHOT('drv-01-requests'),SHOT('drv-02-tripdetails'),SHOT('drv-03-paxprofile'),SHOT('drv-04-cockpit'),SHOT('drv-05-sos'),SHOT('drv-06-home'),SHOT('drv-07-profile'),SHOT('drv-08-community'),SHOT('drv-08-wallet'),SHOT('drv-09-manifest'),SHOT('drv-11-published'),SHOT('drv-12-earnings'),SHOT('drv-13-escrow'),SHOT('drv-14-landmark'),SHOT('pax-ikorodu'),SHOT('pax-01-map'),SHOT('drv-seat-manage')];
Object.assign(window,{PSCREENS,DSCREENS,PScrVehicle,PScrRate,PScrMap,PScrRequestSent,PScrSOS,PScrProfile,PScrSchedule,PScrCommunity,
  DScrCreate,DScrRequests,DScrApproved,DScrRequestDetail,DScrOngoing,DScrSOS,DScrHome,DScrProfile,DScrCommunity,Tag,BackHead,RouteStack,Field});
