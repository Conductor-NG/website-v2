const IC = {
  arrow:'M5 12h14M13 6l6 6-6 6', check:'M20 6 9 17l-5-5', shield:'M12 3 4 6v6c0 5 3.4 7.9 8 9 4.6-1.1 8-4 8-9V6l-8-3Z|M9 12l2 2 4-4',
  star:'M12 3.5 14.6 9l6 .9-4.3 4.2 1 6-5.3-2.8L6.7 20l1-6L3.4 9.9 9.4 9 12 3.5',
  pin:'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z|M12 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  users:'M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2|M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8|M22 20v-2a4 4 0 0 0-3-3.9|M16 2.1a4 4 0 0 1 0 7.8',
  wallet:'M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5|M17 13h.01',
  home:'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z',
  chat:'M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12Z',
  user:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2|M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
  clock:'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18|M12 7v5l3 2',
  car:'M5 16h14M6.5 16V9.4l1.7-3.2h7.6L17.5 9.4V16|M4 9.4h16|M7.5 19v-3M16.5 19v-3',
  bell:'M18 9a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7|M13.7 20a2 2 0 0 1-3.4 0',
  sliders:'M4 6h10M18 6h2M4 12h4M12 12h8M4 18h10M18 18h2|M16 4v4M10 10v4M16 16v4',
  alert:'M12 3 2.5 20h19L12 3Z|M12 9v5M12 17.5h.01', route:'M6 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6|M18 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6|M18 11v3a4 4 0 0 1-4 4H8',
  share:'M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7|M16 6l-4-4-4 4|M12 2v13',
  chevron:'m9 18 6-6-6-6', chevronD:'m6 9 6 6 6-6', plus:'M12 5v14M5 12h14', x:'M18 6 6 18M6 6l12 12', menu:'M3 7h18M3 12h18M3 17h18', download:'M12 3v11M8 10l4 4 4-4|M5 20h14',
  eye:'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z|M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6',
  naira:'M6 4v16M18 4v16M6 8l12 8M3.5 10h17M3.5 14h17', spark:'M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8',
  phone:'M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z|M11 18h2',
  calendar:'M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z|M4 10h16M9 3v4M15 3v4'
};
function Icon({name,size=20,color='currentColor',sw=1.8,style}){
  const d=IC[name]||''; return React.createElement('svg',{width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:color,strokeWidth:sw,strokeLinecap:'round',strokeLinejoin:'round',style,'aria-hidden':true},
    d.split('|').map((p,i)=>React.createElement('path',{key:i,d:p})));
}
const APPLE='M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9-.7 0-1.8-.9-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.6ZM14.2 5.9c.6-.8 1-1.9.9-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-.9 2.9 1 0 2.1-.5 2.7-1.3Z';
const PLAY='M4.3 2.6c-.3.3-.5.8-.5 1.4v16c0 .6.2 1.1.5 1.4l.1.1 9-9v-.2l-9-8.7ZM16.4 15.5l-3-3v-.2l3-3 .1.1 3.6 2c1 .6 1 1.5 0 2.1l-3.7 2ZM16.5 15.6 13.4 12.5l-9.1 9.1c.3.4.9.4 1.5.1l10.7-6.1';
// Fire a GA4 event (no-op until NEXT_PUBLIC_GA_ID is set). Used for
// site→app conversions: open_webapp, download_intent, store_click.
function track(name,params){
  if(typeof window!=='undefined'&&typeof window.gtag==='function')window.gtag('event',name,params||{});
}
const appOf=(s)=>/driver|owner|car/i.test(s||'')?'owner':'passenger';

function StoreBtn({kind='ios',href,label,loc}){
  // Official store badges — same badge for both apps; the store link differs via href.
  const alt=kind==='ios'?'Download on the App Store':'Get it on Google Play';
  const src=kind==='ios'?'/images/badge.appstore.svg':'/images/badge.googleplay.svg';
  return React.createElement('a',{href,target:'_blank',rel:'noopener',className:'storebadge','aria-label':label?alt+' — '+label:alt,
    onClick:()=>track('store_click',{store:kind==='ios'?'app_store':'google_play',app:appOf(href),location:loc||'cta'})},
    React.createElement('img',{src,alt,className:'storebadge__img'}));
}
const LINKS={pIos:'https://apps.apple.com/ng/app/conductor-ng/id6747010463',pAnd:'https://play.google.com/store/apps/details?id=ng.conductor.passenger&hl=en',dIos:'https://apps.apple.com/ng/app/conductor-ng-driver/id6747726138',dAnd:'https://play.google.com/store/apps/details?id=ng.conductor.driver&hl=en',pWeb:'https://app.conductor.ng',dWeb:'https://driver.conductor.ng'};
// Primary "open the web app in your browser" button — the zero-download path we lead with.
// variant 'band' → white pill for the dark orange download band; default → orange→red gradient.
function OpenAppBtn({href,label='Open the web app',variant='primary',size='lg',loc}){
  const cls=variant==='band'?'btn btn--'+size+' openapp--band':'btn btn--primary btn--'+size;
  return React.createElement('a',{href,target:'_blank',rel:'noopener',className:cls,'aria-label':label+' in your browser',
    onClick:()=>track('open_webapp',{app:/driver\.conductor/.test(href||'')?'owner':'passenger',location:loc||'cta'})},
    label,React.createElement(Icon,{name:'arrow',size:18}));
}
// Single "Download the app" button that opens a small popover with the App Store +
// Google Play badges. variant 'dark' (solid, light/dark backgrounds) | 'band' (outline, on the orange band).
function DownloadButton({ios,android,variant='dark',size='lg',label='Download the app',loc}){
  const [open,setOpen]=React.useState(false);
  const ref=React.useRef(null);
  React.useEffect(()=>{
    if(!open)return;
    const onDoc=(e)=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    const onKey=(e)=>{if(e.key==='Escape')setOpen(false);};
    document.addEventListener('mousedown',onDoc);document.addEventListener('keydown',onKey);
    return ()=>{document.removeEventListener('mousedown',onDoc);document.removeEventListener('keydown',onKey);};
  },[open]);
  return React.createElement('div',{className:'dlwrap',ref},
    React.createElement('button',{type:'button',className:'btn btn--'+size+' dlbtn dlbtn--'+variant,
      'aria-haspopup':'true','aria-expanded':open?'true':'false',
      onClick:()=>{const n=!open;setOpen(n);if(n)track('download_intent',{app:appOf(ios),location:loc||'cta'});}},
      React.createElement(Icon,{name:'download',size:18}),
      React.createElement('span',null,label),
      React.createElement(Icon,{name:'chevronD',size:15,style:{transition:'transform .2s',transform:open?'rotate(180deg)':'none'}})),
    open&&React.createElement('div',{className:'dlpop',role:'menu'},
      React.createElement('p',{className:'dlpop__t'},'Get the app'),
      React.createElement(StoreBtn,{kind:'ios',href:ios,label:'app',loc:loc}),
      React.createElement(StoreBtn,{kind:'play',href:android,label:'app',loc:loc})));
}

function useReveal(){
  React.useEffect(()=>{
    let raf=0;
    const pass=()=>{
      raf=0;const h=window.innerHeight||800;
      document.querySelectorAll('.rv:not(.in)').forEach(el=>{
        if(el.getBoundingClientRect().top<h-40)el.classList.add('in');
      });
    };
    const tick=()=>{if(raf)return;raf=setTimeout(()=>{raf=0;pass()},16)};
    pass();
    const t=[setTimeout(pass,150),setTimeout(pass,600)];
    window.addEventListener('scroll',tick,{passive:true});
    window.addEventListener('resize',tick);
    return()=>{window.removeEventListener('scroll',tick);window.removeEventListener('resize',tick);t.forEach(clearTimeout);if(raf)clearTimeout(raf)};
  });
}
const Rv=({children,d=0,cls='',tag='div',...r})=>React.createElement(tag,{className:'rv '+cls,style:{'--d':d+'ms'},...r},children);
const naira=n=>'₦'+Math.round(n).toLocaleString('en-NG');

const TINT=[['#FAE8CF','#7A4A0E'],['#F8D9DE','#6E1E2A'],['#E6E5E3','#454442'],['#BDEFC8','#13451E']];
function Mono({name,i=0,size=38}){
  const [bg,fg]=TINT[i%4];
  return React.createElement('div',{className:'avatar',style:{background:bg,color:fg,width:size,height:size,fontSize:size*.37}},name.split(' ').map(w=>w[0]).slice(0,2).join(''));
}
function Verified({size=13}){return React.createElement('span',{style:{display:'inline-grid',placeItems:'center',width:size,height:size,borderRadius:99,background:'var(--success-base)',color:'#fff',flex:'none'}},React.createElement(Icon,{name:'check',size:size*.66,sw:3}))}
function Stars({v=4.9,n}){return React.createElement('span',{style:{display:'inline-flex',gap:4,alignItems:'center',font:'var(--type-body-sm)',color:'var(--fg-2)'}},
  React.createElement('svg',{width:11,height:11,viewBox:'0 0 24 24',fill:'var(--orange-base)'},React.createElement('path',{d:IC.star})),
  React.createElement('span',{className:'num'},v),n?' · '+n:'')}

/* ---------------- phone + app screens ---------------- */
const DSB=(window.ConductorDesignSystem_31cc6b||{}).Button||(({variant,size,block,className,...p})=>React.createElement('button',{...p,className:'btn btn--'+(variant||'primary')+(size?' btn--'+size:'')+(block?' btn--block':'')+(className?' '+className:'')}));
function StatusBar(){return React.createElement('div',{className:'sbar'},React.createElement('span',{className:'num'},'9:41'),
  React.createElement('em',null,React.createElement('svg',{width:34,height:11,viewBox:'0 0 34 11',fill:'currentColor'},
    React.createElement('path',{d:'M0 7h2v4H0zM4 5h2v6H4zM8 3h2v8H8zM12 1h2v10h-2z'}),
    React.createElement('rect',{x:18,y:1.5,width:14,height:8,rx:2,fill:'none',stroke:'currentColor',strokeWidth:1}),
    React.createElement('rect',{x:19.5,y:3,width:9,height:5,rx:1}))))}

function MiniMap({h=132,pin=true,children}){
  return React.createElement('div',{className:'maparea',style:{height:h}},
    React.createElement('div',{className:'maproad',style:{left:'-6%',top:'26%',width:'118%',height:9,transform:'rotate(-7deg)'}}),
    React.createElement('div',{className:'maproad maproad--b',style:{left:'12%',top:'-14%',width:7,height:'130%',transform:'rotate(9deg)'}}),
    React.createElement('div',{className:'maproad',style:{left:'-6%',top:'68%',width:'118%',height:6,transform:'rotate(4deg)'}}),
    React.createElement('div',{className:'maproad maproad--b',style:{right:'20%',top:'-10%',width:5,height:'130%',transform:'rotate(-6deg)'}}),
    pin&&React.createElement('svg',{style:{position:'absolute',inset:0,width:'100%',height:'100%'},viewBox:'0 0 260 132',preserveAspectRatio:'none'},
      React.createElement('path',{d:'M32 104C74 96 78 52 118 44s62 8 108-24',stroke:'var(--orange-base)',strokeWidth:3,fill:'none',strokeLinecap:'round',strokeDasharray:'0 0'})),
    pin&&React.createElement('div',{style:{position:'absolute',left:'11%',bottom:'18%',width:11,height:11,borderRadius:99,background:'var(--cream-100)',border:'2.5px solid #fff',boxShadow:'var(--elev-1)'}}),
    pin&&React.createElement('div',{style:{position:'absolute',right:'11%',top:'12%',width:11,height:11,borderRadius:99,background:'var(--orange-base)',border:'2.5px solid #fff',boxShadow:'var(--elev-1)'}}),
    children);
}
const Row=({children,style})=>React.createElement('div',{style:{display:'flex',alignItems:'center',gap:9,...style}},children);
/* `t` takes a design-system type token (--type-*); `s`/`w` remain for page-level text outside the phone */
const T=({t,s=12,w=500,c='var(--fg-2)',ls='-.005em',children,style})=>React.createElement('span',{style:{font:t?`var(--type-${t})`:`${w} ${s}px/1.35 var(--font-body)`,color:c,letterSpacing:ls,...style}},children);
const AV='assets/michael.png';
const Avatar=({size=38,src=AV})=>React.createElement('div',{style:{width:size,height:size,borderRadius:'50%',background:`var(--cream-20) url(${src}) center/cover no-repeat`,flex:'none'}});
const Caps=({children,c='var(--pink-base)'})=>React.createElement('span',{style:{font:'var(--type-overline)',letterSpacing:'.08em',color:c}},children);

function TripCard({name,i,rate,trips,from,to,time,price,seats,hot,photo}){
  return React.createElement('div',{className:'tcard'+(hot?' tcard--hot':'')},
    React.createElement(Row,null,photo?React.createElement(Avatar,null):React.createElement(Mono,{name,i}),
      React.createElement('div',{style:{flex:1,display:'grid',gap:2}},
        React.createElement(Row,{style:{gap:5}},React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},name),React.createElement(Verified,null)),
        React.createElement(Stars,{v:rate,n:trips+' trips'})),
      React.createElement('div',{style:{textAlign:'right',display:'grid',gap:1}},
        React.createElement(T,{t:'title-md',c:'var(--fg-1)'},naira(price)),React.createElement(T,{t:'label-sm',c:'var(--fg-3)'},'per seat'))),
    React.createElement('div',{style:{height:1,background:'var(--divider)'}}),
    React.createElement(Row,{style:{justifyContent:'space-between'}},
      React.createElement('div',{className:'route'},from,React.createElement('span',{className:'dotline'},React.createElement('i'),React.createElement('u'),React.createElement('i',{style:{background:'var(--pink-base)'}})),to),
      React.createElement(T,{t:'label-sm',c:'var(--fg-3)'},time)),
    React.createElement(Row,{style:{justifyContent:'space-between'}},
      React.createElement(T,{t:'label-sm',c:hot?'var(--orange-50)':'var(--fg-3)'},seats),
      hot&&React.createElement(Caps,null,'MATCHES YOUR ROUTE')));
}
function NavBar({on=0}){
  const t=[['home','Home'],['route','Trips'],['chat','Chat'],['wallet','Wallet']];
  return React.createElement('div',{className:'navbar'},t.map(([n,l],i)=>React.createElement('div',{key:n,'data-on':i===on?'1':'0'},React.createElement(Icon,{name:n,size:19,sw:i===on?2.1:1.7}),l)));
}
function ScrHead({title,sub,right}){
  return React.createElement('div',{style:{padding:'4px 16px 6px',display:'flex',alignItems:'center',gap:10}},
    React.createElement('div',{style:{flex:1,display:'grid',gap:2}},
      React.createElement('span',{style:{font:'var(--type-title-lg)',color:'var(--fg-1)'}},title),
      sub&&React.createElement(T,{t:'body-sm',c:'var(--fg-3)'},sub)),
    right);
}

function ScrFind(){
  return React.createElement(React.Fragment,null,React.createElement(StatusBar,null),
    React.createElement(ScrHead,{title:'Good morning, Ada',sub:'Mon 12 Aug · 6:40 AM',right:React.createElement('div',{style:{width:34,height:34,borderRadius:99,background:'var(--surface-gray)',display:'grid',placeItems:'center',position:'relative'}},React.createElement(Icon,{name:'bell',size:17,color:'var(--fg-1)'}),React.createElement('i',{style:{position:'absolute',top:7,right:8,width:6,height:6,borderRadius:99,background:'var(--pink-base)'}}))}),
    React.createElement('div',{className:'scr__body'},
      React.createElement('div',{style:{background:'var(--surface-gray)',borderRadius:12,padding:'11px 13px',display:'grid',gap:7}},
        React.createElement(Row,null,React.createElement(Icon,{name:'pin',size:15,color:'var(--orange-base)'}),React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},'Agege'),React.createElement(Icon,{name:'arrow',size:13,color:'var(--fg-3)'}),React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},'Ikeja GRA')),
        React.createElement(Row,{style:{gap:6}},React.createElement(Icon,{name:'clock',size:13,color:'var(--fg-3)'}),React.createElement(T,{t:'body-sm'},'Arrive by 8:00 AM · 3 seats'))),
      React.createElement(Row,{style:{justifyContent:'space-between',padding:'2px 2px 0'}},React.createElement(Caps,{c:'var(--fg-2)'},'7 CAR OWNERS ON YOUR ROUTE'),React.createElement(Icon,{name:'sliders',size:15,color:'var(--fg-3)'})),
      React.createElement(TripCard,{name:'Michael O.',i:0,photo:true,rate:4.9,trips:214,from:'Agege',to:'Ikeja GRA',time:'6:55 AM',price:1300,seats:'2 seats left · Corolla',hot:true}),
      React.createElement(TripCard,{name:'Bisi A.',i:1,rate:4.8,trips:96,from:'Agege',to:'Allen',time:'7:10 AM',price:1200,seats:'3 seats left · Elantra'}),
      React.createElement(Row,{style:{gap:8,justifyContent:'center',paddingTop:2}},
        React.createElement(T,{t:'label-md',c:'var(--orange-50)'},'4 more leaving before 8:00 AM'),
        React.createElement(Icon,{name:'chevronD',size:14,color:'var(--orange-50)'}))),
    React.createElement(NavBar,{on:0}));
}
function ScrMatch(){
  return React.createElement(React.Fragment,null,React.createElement(StatusBar,null),
    React.createElement('div',{style:{padding:'4px 16px 6px',display:'flex',alignItems:'center',gap:10}},
      React.createElement(Icon,{name:'chevron',size:18,color:'var(--fg-1)',style:{transform:'rotate(180deg)'}}),
      React.createElement(T,{t:'title-md',c:'var(--fg-1)'},'Confirm your seat')),
    React.createElement('div',{className:'scr__body'},
      React.createElement('div',{className:'tcard',style:{gap:12}},
        React.createElement(Row,null,React.createElement(Avatar,{size:46}),
          React.createElement('div',{style:{flex:1,display:'grid',gap:3}},
            React.createElement(Row,{style:{gap:5}},React.createElement(T,{t:'title-md',c:'var(--fg-1)'},'Michael O.'),React.createElement(Verified,null)),
            React.createElement(Stars,{v:4.9,n:'214 trips'}),
            React.createElement(T,{t:'body-sm',c:'var(--fg-3)'},'AKD 234 XY · silver Corolla'))),
        React.createElement('div',{style:{display:'flex',gap:6,flexWrap:'wrap'}},['NIN verified','Licence checked','2 yrs on Conductor'].map(t=>
          React.createElement('span',{key:t,style:{font:'var(--type-label-sm)',padding:'6px 9px',borderRadius:99,background:'var(--cream-20)',color:'var(--fg-2)',border:'1px solid var(--divider)'}},t)))),
      React.createElement(MiniMap,{h:104}),
      React.createElement('div',{style:{display:'grid',gap:9}},
        [['Seat fare','₦1,300'],['Service fee','₦0'],['Surge','Never']].map(([a,b],i)=>React.createElement(Row,{key:a,style:{justifyContent:'space-between'}},React.createElement(T,{t:'body-md'},a),React.createElement(T,{t:'title-sm',c:i===2?'var(--success-base)':'var(--fg-1)'},b))),
        React.createElement('div',{style:{height:1,background:'var(--divider)'}}),
        React.createElement(Row,{style:{justifyContent:'space-between'}},React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},'You pay'),React.createElement('span',{style:{font:'var(--type-title-lg)',color:'var(--orange-base)'}},'₦1,300'))),
      React.createElement('div',{style:{marginTop:'auto',display:'grid',gap:8}},
        React.createElement(DSB,{variant:'primary',block:true,style:{height:44,font:'var(--type-button-md)'}},'Request & pay ₦1,300'),
        React.createElement(T,{t:'body-sm',c:'var(--fg-3)',style:{textAlign:'center'}},'Held in escrow until Michael accepts'))));
}
function ScrLive(){
  return React.createElement(React.Fragment,null,React.createElement(StatusBar,null),
    React.createElement('div',{className:'scr__body',style:{gap:12}},
      React.createElement(MiniMap,{h:210},
        React.createElement('div',{style:{position:'absolute',left:12,right:12,bottom:12,background:'#fff',borderRadius:12,padding:'10px 12px',boxShadow:'var(--elev-2)',display:'flex',alignItems:'center',gap:9}},
          React.createElement(Avatar,{size:34}),
          React.createElement('div',{style:{flex:1,display:'grid',gap:2}},React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},'2 mins away'),React.createElement(T,{t:'body-sm',c:'var(--fg-3)'},'Meeting at Pen Cinema footbridge')),
          React.createElement('div',{style:{width:32,height:32,borderRadius:99,background:'var(--orange-10)',display:'grid',placeItems:'center'}},React.createElement(Icon,{name:'chat',size:15,color:'var(--orange-50)'})))),
      React.createElement(Row,{style:{gap:9}},
        React.createElement('button',{className:'btn btn--outline',style:{flex:1,height:42,font:'var(--type-button-md)',gap:7}},React.createElement(Icon,{name:'share',size:15}),'Share ride'),
        React.createElement('button',{style:{width:42,height:42,borderRadius:99,border:'1px solid var(--pink-20)',background:'var(--pink-10)',color:'var(--pink-base)',display:'grid',placeItems:'center',cursor:'pointer'}},React.createElement(Icon,{name:'alert',size:17}))),
      React.createElement('div',{className:'tcard',style:{gap:9}},
        React.createElement(Row,{style:{justifyContent:'space-between'}},React.createElement(Caps,{c:'var(--fg-2)'},'SHARED WITH 3 PEOPLE'),React.createElement(Icon,{name:'eye',size:14,color:'var(--fg-3)'})),
        React.createElement(Row,{style:{gap:-6}},['Ada M','Tolu B','Mum'].map((n,i)=>React.createElement('div',{key:n,style:{marginLeft:i?-9:0,border:'2px solid #fff',borderRadius:99}},React.createElement(Mono,{name:n,i:i+1,size:26})))),
        React.createElement(T,{t:'body-sm'},'They see your live route and get an alert when you arrive.'))),
    React.createElement(NavBar,{on:1}));
}
function ScrWallet(){
  const bars=[38,54,44,72,61,80,66];
  return React.createElement(React.Fragment,null,React.createElement(StatusBar,null),
    React.createElement(ScrHead,{title:'Your wallet',sub:'August 2026'}),
    React.createElement('div',{className:'scr__body'},
      React.createElement('div',{style:{background:'var(--primary-base)',borderRadius:16,padding:16,color:'#fff',display:'grid',gap:10}},
        React.createElement(T,{t:'body-sm',c:'rgba(255,255,255,.7)',ls:'.04em',style:{textTransform:'uppercase'}},'Saved vs ride-hailing'),
        React.createElement('span',{style:{font:'var(--type-headline-md)'}},'₦34,600'),
        React.createElement('div',{style:{display:'flex',gap:5,alignItems:'flex-end',height:44,marginTop:2}},
          bars.map((h,i)=>React.createElement('div',{key:i,style:{flex:1,height:h+'%',borderRadius:4,background:i===5?'var(--orange-base)':'rgba(255,255,255,.16)'}}))),
        React.createElement(T,{t:'body-sm',c:'rgba(255,255,255,.7)'},'42 shared trips this month')),
      React.createElement('div',{className:'tcard',style:{gap:11}},
        React.createElement(Row,{style:{justifyContent:'space-between'}},React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},'Balance'),React.createElement(T,{t:'title-md',c:'var(--fg-1)'},'₦6,200')),
        React.createElement(Row,{style:{gap:8}},
          React.createElement(DSB,{variant:'primary',size:'sm',style:{flex:1}},'Top up'),
          React.createElement(DSB,{variant:'outline',size:'sm',style:{flex:1}},'Withdraw'))),
      [['Ikeja GRA → Agege','Yesterday','−₦1,300'],['Agege → Ikeja GRA','Mon','−₦1,300'],['Referral bonus','Sun','+₦1,000']].map(([a,b,c],i)=>
        React.createElement(Row,{key:i,style:{justifyContent:'space-between',padding:'9px 2px',borderBottom:'1px solid var(--divider)'}},
          React.createElement('div',{style:{display:'grid',gap:2}},React.createElement(T,{t:'title-sm',c:'var(--fg-1)'},a),React.createElement(T,{t:'body-sm',c:'var(--fg-3)'},b)),
          React.createElement(T,{t:'title-sm',c:c[0]==='+'?'var(--success-base)':'var(--fg-1)'},c)))),
    React.createElement(NavBar,{on:3}));
}
const SHOT=n=>'/images/screens/'+n+'.png';
/* Base passenger set → actual v3 app screenshots (design/backup/*.html captures).
   The full PSCREENS/DSCREENS sets are assembled in AppScreens.jsx. */
const SCREENS=[SHOT('pax-00-home'),SHOT('pax-03-ownerprofile'),SHOT('pax-05-intransit'),SHOT('pax-00-home')];
function Phone({active=0,w=320,single,set}){
  const list=set||SCREENS;
  const i=single!=null?single:active;
  const src=list[i];
  // Actual app screen interior (no bezel) dropped into the iPhone 17 vector frame.
  if(typeof src==='string'){
    const sos=src.indexOf('drv-05-sos')>=0; // driver SOS-active — the screen pulses red
    return React.createElement('div',{className:'iphone17',style:{'--pw':'min('+w+'px, 34vh)'}},
      React.createElement('div',{className:'iphone17__btn iphone17__btn--action'}),
      React.createElement('div',{className:'iphone17__btn iphone17__btn--vup'}),
      React.createElement('div',{className:'iphone17__btn iphone17__btn--vdown'}),
      React.createElement('div',{className:'iphone17__btn iphone17__btn--power'}),
      React.createElement('div',{className:'iphone17__bezel'},
        React.createElement('div',{className:'iphone17__status'},
          React.createElement('span',{className:'iphone17__time'},'9:41'),
          React.createElement('span',{className:'iphone17__sig'},
            React.createElement('svg',{viewBox:'0 0 20 12',width:17,height:11,'aria-hidden':true},
              React.createElement('rect',{x:0,y:7,width:3,height:5,rx:1,fill:'currentColor'}),
              React.createElement('rect',{x:5,y:4.5,width:3,height:7.5,rx:1,fill:'currentColor'}),
              React.createElement('rect',{x:10,y:2,width:3,height:10,rx:1,fill:'currentColor'}),
              React.createElement('rect',{x:15,y:0,width:3,height:12,rx:1,fill:'currentColor',opacity:.35})),
            React.createElement('svg',{viewBox:'0 0 16 12',width:15,height:11,'aria-hidden':true},
              React.createElement('path',{d:'M8 11.2 0.6 3.4A10.5 10.5 0 0 1 15.4 3.4Z',fill:'none',stroke:'currentColor',strokeWidth:1.4,strokeLinejoin:'round',opacity:.9})),
            React.createElement('svg',{viewBox:'0 0 26 12',width:24,height:11,'aria-hidden':true},
              React.createElement('rect',{x:0.6,y:0.6,width:22,height:10.8,rx:2.6,fill:'none',stroke:'currentColor',strokeWidth:1,opacity:.5}),
              React.createElement('rect',{x:2,y:2,width:17,height:8,rx:1.4,fill:'currentColor'}),
              React.createElement('rect',{x:23.6,y:3.6,width:1.8,height:4.8,rx:0.9,fill:'currentColor',opacity:.5})))),
        React.createElement('div',{className:'iphone17__island'}),
        React.createElement('div',{className:'iphone17__screen'},
          React.createElement('img',{src,alt:'Conductor app screen',loading:'lazy',draggable:false}),
          sos&&React.createElement('div',{className:'iphone17__sosflash','aria-hidden':true}))));
  }
  // Fallback: a hand-built React mockup inside the CSS bezel (screens with no v3 design yet, e.g. Communities).
  return React.createElement('div',{className:'phone-fit',style:{width:w,height:Math.round(w*2.108)}},
    React.createElement('div',{className:'phone',style:{'--s':w/320}},
      React.createElement('div',{className:'phone__notch'}),
      React.createElement('div',{className:'phone__screen'},
        React.createElement('div',{className:'scr','data-off':'0'},React.createElement(src,null)))));
}
Object.assign(window,{Icon,IC,StoreBtn,LINKS,useReveal,Rv,naira,Mono,Avatar,Caps,Verified,Stars,Phone,SCREENS,T,Row,MiniMap,TripCard,DSB,StatusBar,ScrHead,NavBar});
