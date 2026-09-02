"use client";
/* AUTO-PORTED from the design export (design/src/*.jsx).
   Do not edit here — edit the source and re-run design/port.cjs.
   Re-skinned to the app theme via app/design-css/theme-override.css. */
import React from "react";
import { createPortal } from "react-dom";
const ReactDOM = { createRoot: () => ({ render() {} }) };


/* ============ Parts ============ */
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
// One place for all outbound analytics. Fires GA4, and maps high-intent
// actions to standard Meta/TikTok conversion events so ad platforms can
// optimise delivery. All calls are guarded — Meta/TikTok no-op until their
// pixels are configured (NEXT_PUBLIC_*_PIXEL_ID), so this is always safe.
const CONV_EVENTS={
  // internal name : [Meta standard event, TikTok standard event]
  open_webapp:['Lead','ClickButton'],
  download_intent:['Lead','Download'],
  store_click:['Lead','ClickButton'],
  calc_estimate:['ViewContent','ViewContent'],
};
function track(name,params){
  if(typeof window==='undefined')return;
  const w=window;
  if(typeof w.gtag==='function')w.gtag('event',name,params||{});
  const std=CONV_EVENTS[name];
  if(typeof w.fbq==='function'){
    if(std)w.fbq('track',std[0],params||{});
    w.fbq('trackCustom',name,params||{});
  }
  if(w.ttq&&typeof w.ttq.track==='function'){
    if(std)w.ttq.track(std[1],params||{});
    w.ttq.track(name,params||{});
  }
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
      React.createElement('p',{className:'dlpop__t'},'Scan or tap to download'),
      React.createElement('div',{className:'dlpop__grid'},
        React.createElement('div',{className:'dlpop__col'},
          React.createElement('img',{className:'dlpop__qr',src:'/images/qr.googleplay.svg',alt:'Google Play QR code',width:120,height:120,loading:'lazy'}),
          React.createElement(StoreBtn,{kind:'play',href:android,label:'app',loc:loc})),
        React.createElement('div',{className:'dlpop__col'},
          React.createElement('img',{className:'dlpop__qr',src:'/images/qr.appstore.svg',alt:'App Store QR code',width:120,height:120,loading:'lazy'}),
          React.createElement(StoreBtn,{kind:'ios',href:ios,label:'app',loc:loc})))));
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
const DSB=((typeof window!=='undefined'?window:{}).ConductorDesignSystem_31cc6b||{}).Button||(({variant,size,block,className,...p})=>React.createElement('button',{...p,className:'btn btn--'+(variant||'primary')+(size?' btn--'+size:'')+(block?' btn--block':'')+(className?' '+className:'')}));
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



/* ============ AppScreens ============ */
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



/* ============ Film ============ */
const FILMS={
  passenger:{src:'/videos/PASSENGER.mp4',label:'Passenger film'},
  driver:{src:'/videos/DRIVER.mp4',label:'Car owner film'}
};
function Film({kind='passenger',eyebrow,title,lede,cta,caption}){
  const f=FILMS[kind];
  const ref=React.useRef(null);
  const [ok,setOk]=React.useState(true);
  const [sound,setSound]=React.useState(false);
  React.useEffect(()=>{
    const v=ref.current;if(!v)return;
    const io=new IntersectionObserver(es=>es.forEach(e=>{
      if(e.isIntersecting){const p=v.play();if(p&&p.catch)p.catch(()=>{})}else v.pause();
    }),{threshold:.25});
    io.observe(v);return()=>io.disconnect();
  },[]);
  const toggle=()=>{const v=ref.current;if(!v)return;v.muted=sound;setSound(!sound);if(!sound){v.currentTime=0;const p=v.play();if(p&&p.catch)p.catch(()=>{})}};
  return React.createElement('section',{className:'film'},
    React.createElement('video',{ref,className:'film__v',src:f.src,muted:true,loop:true,playsInline:true,preload:'metadata',
      onError:()=>setOk(false),onClick:toggle,'aria-label':f.label}),
    !ok&&React.createElement('div',{className:'film__fb'},React.createElement('span',{className:'film__fbl'},f.label)),
    React.createElement('div',{className:'film__scrim'}),
    React.createElement('div',{className:'wrap film__in'},
      React.createElement('div',{className:'film__txt'},
        React.createElement(Rv,{cls:'eyebrow eyebrow--light',tag:'p'},eyebrow),
        React.createElement(Rv,{d:70},React.createElement('h1',{className:'h1 film__h'},title)),
        React.createElement(Rv,{d:140},React.createElement('p',{className:'lede film__l'},lede)),
        React.createElement(Rv,{d:200,cls:'film__cta'},cta)),
      React.createElement(Rv,{d:260,cls:'film__foot'},
        React.createElement('button',{className:'film__btn',onClick:toggle,type:'button'},
          React.createElement(Icon,{name:sound?'x':'spark',size:15}),sound?'Mute':'Play with sound'),
        React.createElement('span',{className:'film__cap'},caption))));
}
function Clips({kind='passenger',items}){
  return React.createElement('div',{className:'clips'},items.map((c,i)=>
    React.createElement(Rv,{key:c.n,d:i*80,cls:'clip'},
      React.createElement('div',{className:'clip__v'},
        React.createElement('span',{className:'clip__play'}),
        React.createElement('span',{className:'clip__t'},c.t)),
      React.createElement('div',{className:'clip__m'},
        React.createElement('b',null,c.n),
        React.createElement('span',null,c.r)))));
}



/* ============ Steps ============ */
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



/* ============ Shell ============ */
const P={home:'/',pass:'/',own:'/car-owners',how:'/how-it-works',about:'/about',safety:'/safety',faq:'/faq',corr:'/corridors',cdet:'/corridors/agege-ikeja',fares:'/fares',privacy:'/legal/privacy',terms:'/legal/terms',conduct:'/legal/code-of-conduct',del:'/delete-profile',careers:'/careers',press:'/press',contact:'/contact'};
const NAVS={
  passenger:[['Home',P.home],['How it works',P.how],['Safety',P.safety],['About',P.about]],
  owner:[['Home',P.home],['How it works',P.how],['Safety',P.safety],['About',P.about]]
};
const SWITCH={passenger:['I have a car',P.own],owner:['I need a ride',P.home]};

function Header({page,role='passenger',over}){
  const [stuck,setStuck]=React.useState(false),[open,setOpen]=React.useState(false);
  React.useEffect(()=>{const f=()=>setStuck(window.scrollY>12);f();window.addEventListener('scroll',f,{passive:true});return()=>window.removeEventListener('scroll',f)},[]);
  const nav=NAVS[role]||NAVS.passenger,[swLabel,swHref]=SWITCH[role]||SWITCH.passenger;
  const webUrl=role==='owner'?LINKS.dWeb:LINKS.pWeb;
  const onDark=over&&!stuck;
  const logo='/images/logos/'+(role==='owner'?(onDark?'logo4':'logo3'):(onDark?'logo2':'logo1'))+'.png';
  return React.createElement(React.Fragment,null,
    React.createElement('header',{className:'hdr'+(stuck?' stuck':(over?' hdr--over':''))},
      React.createElement('div',{className:'wrap hdr__in'},
        React.createElement('a',{href:P.home,className:'mark','aria-label':'Conductor.ng home'},
          React.createElement('img',{src:logo,alt:'Conductor.ng',style:{height:56,width:'auto',display:'block'}})),
        React.createElement('nav',{className:'hdr__nav'},nav.map(([l,h])=>
          React.createElement('a',{key:l,href:h,'data-on':page===l.toLowerCase()?'1':'0'},l))),
        React.createElement('div',{className:'hdr__cta'},
          React.createElement('a',{href:swHref,className:'switch'},swLabel,React.createElement('b',null,'→')),
          React.createElement('a',{href:webUrl,target:'_blank',rel:'noopener',className:'btn btn--primary btn--sm',style:{height:42,padding:'0 18px'},onClick:()=>track('open_webapp',{app:role,location:'header'})},'Open app')),
        React.createElement('button',{className:'burger',onClick:()=>setOpen(o=>!o),'aria-label':'Menu'},
          React.createElement(Icon,{name:open?'x':'menu',size:20})))),
    React.createElement('div',{className:'sheet'+(open?' open':'')},
      nav.map(([l,h])=>React.createElement('a',{key:l,href:h,onClick:()=>setOpen(false)},l)),
      React.createElement('a',{href:swHref,onClick:()=>setOpen(false)},swLabel,' →'),
      React.createElement('a',{href:webUrl,target:'_blank',rel:'noopener',onClick:()=>{setOpen(false);track('open_webapp',{app:role,location:'menu'});},style:{color:'var(--orange-50)',borderBottom:0}},'Open web app →')));
}

const RLine=()=>React.createElement('p',{className:'rline'},React.createElement('i'),React.createElement('u'),React.createElement('i'));

function PageHero({crumb,eyebrow,title,lede,cta,aside,solo}){
  return React.createElement('section',{className:'phero'},
    React.createElement('div',{className:'hero__glow'}),
    React.createElement('div',{className:'wrap'},
      React.createElement('div',{className:'phero__grid'+(solo?' phero__grid--solo':'')},
        React.createElement('div',null,
          crumb&&React.createElement(Rv,{cls:'crumb',tag:'p'},React.createElement('a',{href:P.home},'Home'),React.createElement(Icon,{name:'chevron',size:13}),crumb),
          React.createElement(Rv,{cls:'eyebrow',tag:'p',d:40},eyebrow),
          React.createElement(Rv,{d:90},React.createElement('h1',{className:'h1'},title)),
          lede&&React.createElement(Rv,{d:150},React.createElement('p',{className:'lede',style:{marginTop:24}},lede)),
          cta&&React.createElement(Rv,{d:210,cls:'hero__cta'},cta)),
        aside&&React.createElement(Rv,{d:130,cls:'rv--sc hero__stage'},aside))));
}

function SHead({eyebrow,title,lede,narrow}){
  return React.createElement('div',{className:'shead'+(lede?' shead--split':''),style:narrow?{maxWidth:'24ch'}:null},
    React.createElement('div',null,
      React.createElement(Rv,{cls:'eyebrow',tag:'p'},eyebrow),
      React.createElement(Rv,{d:60},React.createElement('h2',{className:'h2'},title))),
    lede&&React.createElement(Rv,{d:120},React.createElement('p',{className:'lede'},lede)));
}

function VRow({items}){
  return React.createElement('div',{className:'vrow'},items.map(([n,t,b],i)=>
    React.createElement(Rv,{key:t,d:i*80,tag:'div'},
      React.createElement('span',{className:'vrow__n'},n),
      React.createElement('h4',null,t),
      React.createElement('p',null,b))));
}

function Faq({items,eyebrow='Questions',title}){
  return React.createElement('section',{className:'sec',id:'faq'},
    React.createElement('div',{className:'wrap wrap--tight'},
      React.createElement(SHead,{eyebrow,title,narrow:true}),
      React.createElement('div',{className:'faq'},items.map(([q,a],i)=>
        React.createElement('details',{key:i,open:i===0},
          React.createElement('summary',null,q),
          React.createElement('p',null,a))))));
}

function Band({title,lede,mode='both'}){
  const grp=(logo,cap,webHref,ios,android)=>React.createElement('div',{key:cap,className:'band__appgrp',style:{display:'flex',flexDirection:'column',alignItems:'center',gap:14,minWidth:0}},
    React.createElement('img',{src:'/images/logos/'+logo+'.png',alt:cap,style:{height:86,width:'auto'}}),
    React.createElement('span',{className:'eyebrow',style:{color:'rgba(255,255,255,.8)',margin:0}},cap),
    React.createElement('div',{style:{display:'flex',flexWrap:'wrap',gap:10,justifyContent:'center'}},
      React.createElement(OpenAppBtn,{href:webHref,variant:'band',label:'Open the web app',loc:'band'}),
      React.createElement(DownloadButton,{ios:ios,android:android,variant:'band',loc:'band'})));
  const paxGrp=grp('logo1','Passenger app',LINKS.pWeb,LINKS.pIos,LINKS.pAnd),drvGrp=grp('logo3','Car owner app',LINKS.dWeb,LINKS.dIos,LINKS.dAnd);
  return React.createElement('section',{id:'get',style:{padding:'0 0 clamp(70px,7vw,110px)'}},
    React.createElement('div',{className:'wrap'},
      React.createElement(Rv,{cls:'band rv--sc'},
        React.createElement('div',{className:'band__ring',style:{width:520,height:520,left:-160,top:-220}}),
        React.createElement('div',{className:'band__ring',style:{width:760,height:760,right:-260,bottom:-420}}),
        React.createElement('p',{className:'eyebrow',style:{color:'rgba(255,255,255,.8)',margin:0}},'Get started'),
        React.createElement('h2',{className:'h2'},title),
        React.createElement('p',{className:'lede',style:{color:'rgba(255,255,255,.88)'}},lede),
        React.createElement('div',{className:'band__apps'},
          mode==='owner'?[drvGrp]:mode==='passenger'?[paxGrp]:[paxGrp,drvGrp]))));
}

/* Social channels — single source for the footer + contact page. */
const SOCIALS=[
  ['Instagram','https://www.instagram.com/conductornaija','M12 2c2.7 0 3 0 4.1.1 1 .1 1.7.2 2.3.5.6.2 1.1.5 1.6 1 .5.5.8 1 1 1.6.3.6.4 1.3.5 2.3.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c-.1 1-.2 1.7-.5 2.3a4.4 4.4 0 0 1-1 1.6c-.5.5-1 .8-1.6 1-.6.3-1.3.4-2.3.5-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1-.1-1.7-.2-2.3-.5a4.4 4.4 0 0 1-1.6-1 4.4 4.4 0 0 1-1-1.6c-.3-.6-.4-1.3-.5-2.3C2 15 2 14.7 2 12s0-3 .1-4.1c.1-1 .2-1.7.5-2.3.2-.6.5-1.1 1-1.6.5-.5 1-.8 1.6-1 .6-.3 1.3-.4 2.3-.5C9 2 9.3 2 12 2Zm0 1.8c-2.7 0-3 0-4 .1-.8 0-1.2.2-1.5.3-.4.1-.7.3-1 .6-.3.3-.5.6-.6 1-.1.3-.3.7-.3 1.5-.1 1-.1 1.3-.1 4s0 3 .1 4c0 .8.2 1.2.3 1.5.1.4.3.7.6 1 .3.3.6.5 1 .6.3.1.7.3 1.5.3 1 .1 1.3.1 4 .1s3 0 4-.1c.8 0 1.2-.2 1.5-.3.4-.1.7-.3 1-.6.3-.3.5-.6.6-1 .1-.3.3-.7.3-1.5.1-1 .1-1.3.1-4s0-3-.1-4c0-.8-.2-1.2-.3-1.5a2.7 2.7 0 0 0-.6-1 2.7 2.7 0 0 0-1-.6c-.3-.1-.7-.3-1.5-.3-1-.1-1.3-.1-4-.1Zm0 3.1a5.1 5.1 0 1 1 0 10.2 5.1 5.1 0 0 1 0-10.2Zm0 1.8a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6Zm5.3-3.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z'],
  ['Facebook','https://www.facebook.com/conductornaija','M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z'],
  ['X','https://x.com/conductorng_','M18.9 2H22l-7.3 8.3L23 22h-6.8l-5.3-6.9L4.8 22H1.7l7.8-8.9L1 2h7l4.8 6.4L18.9 2Zm-1.2 18h1.9L7.4 4H5.4l12.3 16Z'],
  ['TikTok','https://www.tiktok.com/@conductorng','M16.2 3c.3 2 1.5 3.6 3.4 4 .4.1.8.1 1.2.1v3c-1.5 0-2.9-.5-4.1-1.3v6.5a5.8 5.8 0 1 1-5.8-5.8c.3 0 .6 0 .9.1v3.1c-.3-.1-.6-.2-.9-.2a2.8 2.8 0 1 0 2.8 2.8V3h2.6Z'],
  ['LinkedIn','https://www.linkedin.com/company/conductor-nigeria/','M6.9 5a1.95 1.95 0 1 1-3.9 0 1.95 1.95 0 0 1 3.9 0ZM3.4 8.5h3v12h-3v-12Zm5 0h2.9v1.6h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7v7.3h-3v-6.5c0-1.5 0-3.5-2.1-3.5s-2.5 1.7-2.5 3.4v6.6h-3v-12Z'],
];
function SocialIcon({d,size=17}){
  return React.createElement('svg',{width:size,height:size,viewBox:'0 0 24 24',fill:'currentColor','aria-hidden':true},
    React.createElement('path',{d}));
}
function SocialRow({tone='light'}){
  return React.createElement('div',{className:'socrow'},
    SOCIALS.map(([label,href,d])=>React.createElement('a',{key:label,href,target:'_blank',rel:'noreferrer',className:'socrow__a','aria-label':label,title:label},
      React.createElement(SocialIcon,{d}))));
}
function Footer(){
  const C=[['Ride',[['Open the web app',LINKS.pWeb],['For passengers',P.home],['For car owners',P.own],['How it works',P.how],['Safety',P.safety]]],
    ['Answers',[['FAQ',P.faq],['Routes',P.corr],['Request a route',P.corr+'#request'],['Contact us',P.contact]]],
    ['Company',[['About',P.about],['Communities',P.how+'#walk'],['Careers',P.careers],['Press',P.press]]],
    ['Legal',[['Privacy policy',P.privacy],['Terms of service',P.terms],['Code of conduct',P.conduct],['Delete your profile',P.del]]]];
  return React.createElement('footer',{className:'ftr'},
    React.createElement('div',{className:'wrap'},
      React.createElement('div',{className:'ftr__grid',style:{gridTemplateColumns:'1.4fr repeat(4,1fr)'}},
        React.createElement('div',{style:{display:'grid',gap:16,alignContent:'start',maxWidth:'32ch'}},
          React.createElement('a',{href:P.home,className:'mark','aria-label':'Conductor.ng home'},React.createElement('img',{src:'/images/logos/logo2.png',alt:'Conductor.ng',style:{height:74,width:'auto',display:'block'}})),
          React.createElement('p',{className:'small'},'A carpooling scheduling platform. Publish the journey you are already making, or take a seat on one that is already happening.'),
          React.createElement('p',{className:'small',style:{lineHeight:1.7}},
            '8A Olayinka Balogun Crescent, Magodo Phase 2',React.createElement('br'),
            React.createElement('a',{href:'mailto:support@conductor.ng'},'support@conductor.ng'),' · ',
            React.createElement('a',{href:'tel:+2348131500124'},'+234 813 150 0124')),
          React.createElement(SocialRow,null)),
        C.map(([t,ls])=>React.createElement('div',{key:t},React.createElement('h6',null,t),
          React.createElement('ul',null,ls.map(([l,h])=>React.createElement('li',{key:l},React.createElement('a',{href:h},l))))))),
      React.createElement('div',{className:'ftr__base'},
        React.createElement('span',null,'© 2026 Conductor Technology International Services Limited.'),
        React.createElement('span',null,'Every seat that travels full is one less car on the road.'))));
}



/* ============ Places ============ */
/* Curated Lagos locations for the fare estimator's place-search inputs.
   The website has no live Places key, so search runs over this list; the
   app itself uses Google Places. Coords are approximate — enough for a
   haversine estimate and the 50 km coverage cap. */
const LAGOS_PLACES=[
  ['ikeja','Ikeja GRA','Mainland',6.5833,3.3500],
  ['ikeja-cm','Ikeja City Mall','Mainland',6.6120,3.3580],
  ['mma','Murtala Muhammed Airport','Ikeja',6.5774,3.3212],
  ['agege','Agege','Mainland',6.6150,3.3200],
  ['ogba','Ogba','Mainland',6.6300,3.3450],
  ['berger','Berger · Ojodu','Mainland',6.6400,3.3800],
  ['ojota','Ojota','Mainland',6.5800,3.3850],
  ['ketu','Ketu','Mainland',6.5950,3.3900],
  ['mile12','Mile 12','Mainland',6.6000,3.4100],
  ['maryland','Maryland','Mainland',6.5700,3.3650],
  ['gbagada','Gbagada','Mainland',6.5500,3.3850],
  ['anthony','Anthony','Mainland',6.5500,3.3700],
  ['ilupeju','Ilupeju','Mainland',6.5550,3.3600],
  ['palmgrove','Palmgrove','Mainland',6.5350,3.3650],
  ['yaba','Yaba','Mainland',6.5100,3.3700],
  ['bariga','Bariga','Mainland',6.5350,3.3900],
  ['surulere','Surulere','Mainland',6.5000,3.3550],
  ['ojuelegba','Ojuelegba','Mainland',6.5100,3.3600],
  ['mushin','Mushin','Mainland',6.5300,3.3500],
  ['oshodi','Oshodi','Mainland',6.5550,3.3400],
  ['isolo','Isolo','Mainland',6.5350,3.3200],
  ['okota','Okota','Mainland',6.5100,3.3200],
  ['ejigbo','Ejigbo','Mainland',6.5600,3.3000],
  ['egbeda','Egbeda','Mainland',6.5950,3.2900],
  ['idimu','Idimu','Mainland',6.6050,3.2750],
  ['iyana-ipaja','Iyana Ipaja','Mainland',6.6100,3.2900],
  ['abule-egba','Abule Egba','Mainland',6.6450,3.3050],
  ['igando','Igando','Mainland',6.5550,3.2500],
  ['ikorodu','Ikorodu','Mainland',6.6194,3.5106],
  ['costain','Costain','Mainland',6.4750,3.3650],
  ['apapa','Apapa','Mainland',6.4500,3.3600],
  ['festac','Festac Town','Mainland',6.4650,3.2850],
  ['amuwo','Amuwo Odofin','Mainland',6.4600,3.2900],
  ['marina','Marina · CMS','Lagos Island',6.4500,3.3950],
  ['onikan','Onikan','Lagos Island',6.4450,3.4050],
  ['obalende','Obalende','Lagos Island',6.4450,3.4050],
  ['ikoyi','Ikoyi','Island',6.4550,3.4350],
  ['vi','Victoria Island','Island',6.4281,3.4219],
  ['oniru','Oniru','Island',6.4300,3.4500],
  ['lekki1','Lekki Phase 1','Lekki',6.4450,3.4700],
  ['ikate','Ikate','Lekki',6.4400,3.4850],
  ['ilasan','Ilasan','Lekki',6.4400,3.5000],
  ['chevron','Chevron · Lekki','Lekki',6.4450,3.5350],
  ['ajah','Ajah','Lekki',6.4667,3.5667],
  ['sangotedo','Sangotedo','Lekki',6.4700,3.5850],
  ['awoyaya','Awoyaya','Lekki',6.4850,3.6100],
  ['epe','Epe','Outskirts',6.5900,3.9800],
  ['badagry','Badagry','Outskirts',6.4150,2.8880]
];

const ROAD_FACTOR=1.4;   // straight-line → road distance (matches app default)
const MAX_KM=50;         // coverage cap — routes beyond this aren't priced

const PLACE_BY_ID=Object.fromEntries(LAGOS_PLACES.map(p=>[p[0],p]));
function placeById(id){return PLACE_BY_ID[id]||null;}

function haversineKm(a,b){
  if(!a||!b) return null;
  const R=6371,toRad=d=>d*Math.PI/180;
  const dLat=toRad(b[3]-a[3]),dLng=toRad(b[4]-a[4]);
  const s=Math.sin(dLat/2)**2+Math.cos(toRad(a[3]))*Math.cos(toRad(b[3]))*Math.sin(dLng/2)**2;
  return 2*R*Math.asin(Math.min(1,Math.sqrt(s)));
}
/** Road-distance estimate in km between two place ids, or null. */
function routeKm(fromId,toId){
  const km=haversineKm(placeById(fromId),placeById(toId));
  return km==null?null:km*ROAD_FACTOR;
}
function searchPlaces(query,excludeId){
  const q=(query||'').trim().toLowerCase();
  return LAGOS_PLACES.filter(p=>p[0]!==excludeId&&(!q||p[1].toLowerCase().includes(q)||p[2].toLowerCase().includes(q))).slice(0,7);
}

/* Searchable place input — text field + filtered dropdown (no external API). */
function PlaceSearch({value,onChange,label,placeholder,exclude,accent}){
  const [q,setQ]=React.useState('');
  const [open,setOpen]=React.useState(false);
  const [hi,setHi]=React.useState(0);
  const wrapRef=React.useRef(null);
  const sel=value?placeById(value):null;
  React.useEffect(()=>{
    const onDoc=e=>{if(wrapRef.current&&!wrapRef.current.contains(e.target))setOpen(false)};
    document.addEventListener('mousedown',onDoc);return()=>document.removeEventListener('mousedown',onDoc);
  },[]);
  const matches=searchPlaces(open?q:'',exclude);
  const shown=sel&&!open?sel[1]:q;
  const choose=p=>{onChange(p[0]);setQ('');setOpen(false)};
  return React.createElement('div',{className:'field psearch',ref:wrapRef},
    React.createElement('label',null,label),
    React.createElement('div',{className:'psearch__in'},
      React.createElement(Icon,{name:'pin',size:16,color:accent||'var(--fg-3)'}),
      React.createElement('input',{type:'text',value:shown,placeholder:placeholder||'Search a place',
        'aria-label':label,autoComplete:'off',
        onFocus:()=>{setOpen(true);setQ('')},
        onChange:e=>{setQ(e.target.value);setOpen(true);setHi(0)},
        onKeyDown:e=>{
          if(e.key==='ArrowDown'){e.preventDefault();setHi(h=>Math.min(h+1,matches.length-1))}
          else if(e.key==='ArrowUp'){e.preventDefault();setHi(h=>Math.max(h-1,0))}
          else if(e.key==='Enter'&&matches[hi]){e.preventDefault();choose(matches[hi])}
          else if(e.key==='Escape'){setOpen(false)}
        }}),
      sel&&!open&&React.createElement('button',{type:'button',className:'psearch__clr','aria-label':'Change '+label,
        onClick:()=>{onChange(null);setQ('');setOpen(true)}},React.createElement(Icon,{name:'x',size:14}))),
    open&&matches.length>0&&React.createElement('ul',{className:'psearch__menu'},
      matches.map((p,i)=>React.createElement('li',{key:p[0],className:'psearch__opt'+(i===hi?' is-hi':''),
        onMouseEnter:()=>setHi(i),onMouseDown:e=>{e.preventDefault();choose(p)}},
        React.createElement(Icon,{name:'pin',size:14,color:'var(--fg-3)'}),
        React.createElement('span',null,React.createElement('b',null,p[1]),React.createElement('em',null,p[2]))))),
    open&&q&&matches.length===0&&React.createElement('div',{className:'psearch__none'},'No match — try an area like Ikeja or Lekki'));
}
/* Corridor marketing data — used by the /corridors pages (the calculator no
   longer needs it; it prices from searched pick-up/drop-off distance). */
const CORRIDORS=[
  {id:'agege-ikeja',from:'Agege',to:'Ikeja GRA',km:11,hail:4300,seat:1300,mins:35,riders:128,zone:'Mainland',peak:[2,4,7,9,6,3,2,4,6,3]},
  {id:'yaba-vi',from:'Yaba',to:'Victoria Island',km:15,hail:6800,seat:2000,mins:55,riders:214,zone:'Cross-bridge',peak:[3,6,9,8,4,2,3,5,7,4]},
  {id:'ikorodu-lekki',from:'Ikorodu',to:'Lekki Phase 1',km:34,hail:14500,seat:4200,mins:95,riders:76,zone:'Cross-bridge',peak:[4,8,9,5,2,1,2,4,6,5]},
  {id:'surulere-marina',from:'Surulere',to:'Marina',km:13,hail:5600,seat:1700,mins:45,riders:97,zone:'Cross-bridge',peak:[3,7,9,6,3,2,2,4,7,3]},
  {id:'ajah-vi',from:'Ajah',to:'Victoria Island',km:22,hail:9200,seat:2800,mins:70,riders:183,zone:'Island',peak:[5,9,8,4,2,1,2,3,6,6]},
  {id:'magodo-ikeja',from:'Magodo',to:'Ikeja',km:12,hail:4900,seat:1500,mins:40,riders:112,zone:'Mainland',peak:[2,5,8,9,5,3,2,4,7,4]},
  {id:'berger-ikeja',from:'Berger',to:'Ikeja',km:10,hail:4100,seat:1200,mins:32,riders:88,zone:'Mainland',peak:[3,6,9,7,4,2,3,5,6,3]},
  {id:'festac-apapa',from:'Festac',to:'Apapa',km:14,hail:5400,seat:1600,mins:42,riders:64,zone:'Mainland',peak:[4,7,8,5,3,2,2,4,6,4]}
];



/* ============ Calculator ============ */
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
/* ============ PaxHome ============ */
const PAX_STEPS=[
  {n:'Step one',t:'Find the trips going your way',b:'Enter where you travel from and to, and see every car owner already driving that route — real journeys scheduled in advance, laid out on the map around you, not a car summoned in the rain.',screen:1},
  {n:'Step two',t:'Choose your car, and who you’ll ride with',b:'Open the car and the person before you commit: the vehicle itself, verified identity, a rating earned from both directions, and who else is already aboard. You choose them — nobody is assigned.',screen:3},
  {n:'Step three',t:'Pick your seat, and pay for the week',b:'Choose exactly where you sit — up front, or the back-left window — and pay for the days you need in one go. Your money sits in escrow and is released to the car owner only after each trip actually runs.',screen:13},
  {n:'Step four',t:'Travel, track it live, and rate',b:'Meet at a named landmark, follow the journey on a live map — your destination and the car’s progress in view the whole way — and share it with anyone you trust, with SOS a press away. When you arrive, you rate each other and the fare is released.',screen:14}
];
const PAX_VOICES=[
  {t:'I ride with the same two people every morning now. I know their names, and I know what the week will cost before it starts.',n:'Ada Mbakwe',r:'Passenger · 8 months'},
  {t:'Being able to pick an SUV was the thing that sold me. On a wet morning that is not a small detail.',n:'Chidinma Eze',r:'Passenger · 5 months'},
  {t:'I could see exactly who I was riding with, and what other passengers had said about them, before I paid anything.',n:'Tunde Balogun',r:'Passenger · 1 year'}
];

function PaxHome(){
  useReveal();
  return (<>
    <Header role="passenger" over={true}/>
    <main>
      <Film kind="passenger" eyebrow="For passengers"
        title={<>Your commute, for the price of <em>one seat</em>.</>}
        lede="Conductor is a carpooling scheduling platform. Someone is already driving your route this week — book a seat on that journey, pick the kind of car you travel in, and split the cost with everyone else going the same way."
        cta={[<OpenAppBtn key="0" href={LINKS.pWeb} label="Open the web app" loc="hero"/>,
              <DownloadButton key="1" ios={LINKS.pIos} android={LINKS.pAnd} loc="hero"/>,
              <a key="3" href="#cost" className="film__btn" style={{height:52,padding:'0 20px'}}>What my route costs<Icon name="arrow" size={16}/></a>]}
        caption="Ninety seconds with the Conductor team on how a shared morning run actually works."/>

      <Carpool role="passenger"/>

      <section className="sec"><div className="wrap">
        <div className="illusplit">
          <Rv cls="rv--sc illusplit__art">
            <img src="/images/art/passengers.png" alt="Four commuters sharing a car through Lagos" loading="lazy"/>
          </Rv>
          <div>
            <Rv cls="eyebrow" tag="p">The full car</Rv>
            <Rv d={60}><h2 className="h2">Four people, <em>one journey</em>.</h2></Rv>
            <Rv d={110}><p className="lede" style={{marginTop:24}}>The seat you take was already travelling — the car owner was making this run anyway. You fill a space that would have gone empty, and everyone in the car pays a share instead of the price of the whole trip.</p></Rv>
          </div>
        </div>
      </div></section>

      <StepWalk items={PAX_STEPS} set={PSCREENS} eyebrow="Your first ride"
        title={<>Four steps, and you have <em>a seat</em>.</>}
        lede="Every step below is a real screen from the passenger app — this is the whole journey, not a simplified version of it."/>

      <SafetyRow items={[
        ['shield','Verified before the first trip','Car owners clear identity, licence and vehicle checks. Passengers verify identity too, so the trust runs both ways.'],
        ['share','Share the ride as it happens','Send your route, your car owner and your arrival time to anyone you trust. They follow along without installing anything.'],
        ['alert','SOS on every screen','Hold SOS and your live location goes to your trusted contacts, emergency services and our safety team at once.']]}/>

      <section className="sec" id="cost"><div className="wrap">
        <SHead eyebrow="What it costs" title={<>Now put your <em>own route</em> in.</>}
          lede="Pick where you travel from and to, and how often you make the journey. Distance and journey time are ours; the fare comes live from the app, so what you read here is what you pay at booking."/>
        <Rv cls="rv--sc"><Calculator lock="passenger"/></Rv>
        <Rv d={90}><p className="small" style={{marginTop:18,maxWidth:'74ch'}}>Not seeing where you travel? <a href={P.corr}>Ask us to open your route</a> and we will tell you when a car owner publishes it.</p></Rv>
      </div></section>

      <Promo eyebrow="On now, for passengers"
        title={<>Up to <em>100% off</em> every trip you take this week.</>}
        body="Add your week of trips to your schedule as usual and the discount applies at checkout. Everything else works exactly as it always does — anything still payable is held in escrow and released to each car owner only after that journey is completed."
        points={['Applies to every trip taken within the promotional week','Add trips to your schedule and the discount is applied automatically','Trips that do not happen are still refunded in full','Current terms always shown in the app at the point of booking']}
        cta="See what your route costs" href={P.fares}/>

      <Feedback cream={true} items={PAX_VOICES} eyebrow="Riders, in their words"
        title={<>The people already on <em>your route</em>.</>}
        lede="Feedback from passengers who have been sharing a corridor long enough to have an opinion about it."/>

      <Band mode="passenger" title={<>Find your first <em>shared seat</em>.</>}
        lede="Add the trips you make this week, see who is already driving them, and take the seat before it goes."/>
    </main>
    <Footer/>
  </>);
}



/* ============ Owner ============ */
const OWN_STEPS=[
  {n:'Step one',t:'Publish your week in under a minute',b:'Set your route, your departure window, the seats you’ll share and what each one costs — then publish the whole week at once. From there it runs on its own, filling with passengers as they book.',screen:11},
  {n:'Step two',t:'Approve only the passengers you want',b:'Requests arrive with a verified profile and a rating earned from previous car owners. You approve the people you want in your car and decline the rest — no penalty, and they are not told why.',screen:1},
  {n:'Step three',t:'Drive the route you were driving anyway',b:'Meet at a landmark on the road you already take, so nobody is hunting for your plate. Follow the trip live and message your passengers in-app if traffic moves your timing.',screen:4},
  {n:'Step four',t:'Get paid, trip by trip',b:'Passengers pay for the week up front, but the money sits in escrow. Your share is released the moment each journey completes — you see exactly what every day and every seat earned, and withdraw whenever you like.',screen:12}
];
const OWN_VOICES=[
  {t:'My car was going anyway. Three seats cover fuel and most of the servicing, and I have company in the traffic.',n:'Michael Okafor',r:'Car owner · 2 years'},
  {t:'I was nervous about who would get in. Then I realised I approve every passenger myself, and I can just keep the same four people.',n:'Folake Adeniyi',r:'Car owner · 11 months'},
  {t:'The money lands at the end of the trip, no chasing and nobody counting notes at a junction.',n:'Emeka Nwosu',r:'Car owner · 6 months'}
];

function OwnerPage(){
  useReveal();
  return (<>
    <Header role="owner" over={true}/>
    <main>
      <Film kind="driver" eyebrow="For car owners"
        title={<>Your car is already making the trip. <em>Let it pay for itself.</em></>}
        lede="Publish the journeys you drive each week, approve the passengers you want in your car, and let the seats that were travelling empty cover what the trip costs you to run. You are not for hire — you are sharing a journey that was happening anyway."
        cta={[<OpenAppBtn key="0" href={LINKS.dWeb} label="Open the web app" loc="hero"/>,
              <DownloadButton key="1" ios={LINKS.dIos} android={LINKS.dAnd} loc="hero"/>,
              <a key="3" href="#cost" className="film__btn" style={{height:52,padding:'0 20px'}}>What my seats collect<Icon name="arrow" size={16}/></a>]}
        caption="Car owners on why they started sharing the drive — and what changed about the commute."/>

      <Carpool role="owner"/>

      <section className="sec"><div className="wrap">
        <div className="illusplit">
          <div>
            <Rv cls="eyebrow" tag="p">Already on the road</Rv>
            <Rv d={60}><h2 className="h2">You were <em>driving anyway</em>.</h2></Rv>
            <Rv d={110}><p className="lede" style={{marginTop:24}}>Conductor doesn't send you anywhere new. You publish the route you already drive, approve the people going your way, and the seats that were travelling empty start covering what the trip costs you to run.</p></Rv>
          </div>
          <Rv cls="rv--sc illusplit__art">
            <img src="/images/art/driver.png" alt="A car owner driving through Lagos" loading="lazy"/>
          </Rv>
        </div>
      </div></section>

      <StepWalk items={OWN_STEPS} set={DSCREENS} eyebrow="How it runs"
        title={<>Publish it once, drive it <em>every day</em>.</>}
        lede="The same four screens you will use every weekday morning, in the order you will meet them."/>

      <section className="sec sec--cream"><div className="wrap">
        <SHead eyebrow="The part car owners ask about first" title={<>You decide <em>who</em> gets in.</>}
          lede="A request is an ask, not a booking. You see who they are, what other car owners rated them and where they are going — then you approve or decline."/>
        <div className="grid2" style={{alignItems:'center',gap:'clamp(24px,3vw,52px)'}}>
          <div>
            <ul className="checks" style={{gap:16}}>
              {['Every request carries a verified identity and a rating earned from previous trips',
                'Decline as often as you like — it costs you nothing and they are not told why',
                'Build a list of regulars you approve automatically on your route',
                'Restrict your seats to a community, so only its members can even ask',
                'The app prices each seat for the route you drive']
                .map(t=><li key={t} style={{fontSize:16,lineHeight:1.55}}><Icon name="check" size={18}/>{t}</li>)}
            </ul>
            <a className="linkarrow" href={P.how} style={{marginTop:28,display:'inline-flex'}}>See both apps side by side<Icon name="arrow" size={15}/></a>
          </div>
          <Rv d={120} cls="rv--sc twoph">
            <Phone single={10} w={288} set={DSCREENS}/><Phone single={3} w={288} set={DSCREENS}/>
          </Rv>
        </div>
      </div></section>

      <SafetyRow link={true} items={[
        ['shield','Every passenger is verified','Identity checks on both sides before a first trip. No anonymous seats, in either direction.'],
        ['star','Ratings run both ways','You rate passengers on punctuality and etiquette; they rate you. Both scores are public, and both are earned.'],
        ['alert','Support on the trip, not after it','Share-ride and SOS are available to you as well as your passengers, and either side can suspend a trip without penalty.']]}/>

      <section className="sec" id="cost"><div className="wrap">
        <SHead eyebrow="What the seats are worth" title={<>Now put your <em>own drive</em> in.</>}
          lede="Pick your route, how many seats you would share and how often you make the journey. Distance and journey time are ours; the figure comes live from the app’s own pricing, so it is never a stale number on a web page."/>
        <Rv cls="rv--sc"><Calculator lock="owner"/></Rv>
      </div></section>

      <Promo eyebrow="On now, for car owners"
        title={<>The more you drive, the more you <em>keep</em>.</>}
        body="Your service charge falls as you complete more trips, so a bigger share of every fare stays with you. Consistent weekday sharing is rewarded rather than one-off journeys — the arrangement earns you more the longer you keep it up."
        points={['Service charge reduces as your completed trip count grows — you keep more per seat','The app prices each seat for your route, live','Publish a whole week of journeys in one sitting','Current rate always shown in the app before you publish']}
        cta="Get the car owner app" href="#get"/>

      <Feedback cream={true} items={OWN_VOICES} eyebrow="Car owners, in their words"
        title={<>People who drive it <em>every morning</em>.</>}
        lede="Feedback from car owners who have been sharing a corridor long enough to have an opinion about it."/>

      <Band mode="owner" title={<>Publish your route, fill the <em>empty seats</em>.</>}
        lede="Publishing a journey takes a minute. The passengers travelling your way are already looking for it."/>
    </main>
    <Footer/>
  </>);
}



/* ============ HowItWorks ============ */
/* Screen indices (p = PSCREENS, d = DSCREENS). A few still point at the closest
   available capture and are flagged // NEEDS-REAL until the true app screens land:
   - stage 5 pax pay screen / driver trip-earnings
   - stage 6 pax days-paid+suspended+refund list / driver escrow balance
   - stage 10 opened community page (Access Bank) — both sides
   - money-flow centre screen */
const STAGES=[
  {n:'Stage one',t:'See who is already travelling your way',
   b:'The map shows every published trip around you for the day you pick, each priced per seat. Instead of asking a stranger to come for you, you are looking at journeys that already exist — several cars, several destinations, all heading roughly where you are going. Tap any one and it opens up: the exact route, the pick-up time, the seat price and who is driving.',
   p:12,d:16,pLabel:'Passenger app · one trip',pDot:'var(--orange-base)',dLabel:'Passenger app',dDot:'var(--orange-base)'},
  {n:'Stage two',t:'Trips are published days before you travel',
   b:'Conductor is a scheduling platform, not a hailing app — nothing is summoned on demand. A car owner creates and publishes the journeys they will make in the days ahead. Passengers find those trips, join the ones they need and pay for them before the day arrives, so by the time the morning comes the whole thing is already settled.',
   p:2,d:11,
   split:[['Car owner','Creates and publishes the week’s trips ahead of time.'],['Passenger','Finds the trip, joins it and pays before the day.']]},
  {n:'Stage',t:'Pick your seat — or keep one back',
   b:'Comfort is a choice here, not a lottery. When you pay, you choose exactly where you sit — up front, or the back-left window — and that seat is held the moment the payment lands. On the other side, the car owner decides which seats to sell at all: open three and keep the fourth for a partner, a friend, or simply a lighter ride. Nobody is ever squeezed in beside a stranger they did not agree to.',
   p:13,d:17,
   split:[['Passenger','Chooses the exact seat they’ll travel in — held on payment.'],['Car owner','Opens the seats to sell, and locks any they’re keeping.']]},
  {n:'Stage three',t:'You choose the car, and see who you’ll ride with',
   b:'Filter by vehicle — saloon, SUV or bus — before you look at a single driver, so comfort and air conditioning are a choice, not a hope. You also see exactly who else is aboard: every passenger is verified, and the car owner can open or close individual seats to shape who joins the trip.',
   p:3,d:3,
   split:[['Passenger','Picks the vehicle, then sees who else is in the car.'],['Car owner','Opens or closes seats and reviews each passenger.']]},
  {n:'Stage four',t:'Nobody is ever assigned to anybody',
   b:'This is the part that surprises people: no match is forced on either side. The passenger asks a specific car owner; the car owner reviews who is asking and approves only the people they want. Either side can decline, as often as they like, without giving a reason — the most control either of you has ever had over a daily commute.',
   p:4,d:1},
  {n:'Stage five',t:'A seat costs a fraction of the whole car',
   b:'A journey has one cost. Divide it between the people travelling and each pays a share rather than the full fare — three seats sharing is roughly a third each of what that trip would cost alone. The passenger sees exactly what their seat costs; the car owner sees what the whole trip earns. The app prices it for the route and locks it at booking.',
   p:11,d:12},
  {n:'Stage six',t:'You pay for the week; drivers are paid trip by trip',
   b:'Add your week and you pay for all of it at once, so nobody counts notes at a junction — but the money sits in escrow, not with the driver. Each car owner is paid only after their own trip runs. And any day that does not happen — you suspend it, or the car owner does — is refunded to you in full.',
   p:8,d:13,
   split:[['Passenger','Each day shows as paid, suspended or refunded.'],['Car owner','Watches the escrow fill, and release one trip at a time.']]},
  {n:'Stage seven',t:'The journey, and where you meet',
   b:'You meet at a named landmark on the route the car was already taking — a filling station, a mall, a familiar junction — chosen because it is public, well-known and safe to wait at, never a pin down an unmarked street. From there both sides can share the live trip with family, and either can message the other if the traffic shifts.',
   p:5,d:14},
  {n:'Stage eight',t:'Identity first — nobody here is anonymous',
   b:'Security starts before anyone gets in a car. Identity is verified on both sides ahead of a first trip: passengers clear NIN and phone, car owners add licence, vehicle papers and roadworthiness — and each of you sees the other’s verification and rating. Every passenger and every car owner is rated after each trip, and either side can flag a problem: raise it and your money is protected until it is put right. A name here cannot be discarded and remade after a bad trip, which is exactly what makes every rating mean something.',
   p:9,d:7},
  {n:'Stage nine',t:'Travel with people from communities you know',
   b:'A verified stranger is one thing; someone from your own office, estate or campus is another. Create or join a community and the trips posted inside it are visible only to its members — a car owner can even restrict a seat to people from that community. It is the point where most people stop thinking of this as a service at all.',
   p:10,d:8} // NEEDS-REAL: opened community page (Access Bank)
];

const WHY=[
  ['naira','Spend a fraction of what you spend now','A seat costs a share of a journey, not the price of a whole car. For most people that is the single biggest monthly saving available to them.'],
  ['clock','Arrive at a time you can plan around','Trips are scheduled the day before, not summoned in the rain. You know who is driving, when they leave, and what it costs, before the morning starts.'],
  ['users','Travel with people, not strangers','Corridors settle into regulars. Within a fortnight most people are riding with the same two or three faces — and inside a community, people from their own workplace or estate.'],
  ['shield','Take the guesswork out of your commute','No bus that never comes, no fare argued in the rain, no danfo that changes its route on a whim. You know the car, the driver, the time and the price the night before — the unpredictability of public transport is gone from your daily commute.']
];

/* Money-flow: alternating pax (left) ↔ car owner (right), the phone in the middle.
   side: 'pax' sits in the left column, 'drv' in the right. Numbers zig-zag across. */
const MFLOW=[
  {side:'pax',t:'You pay for the whole week at once',b:'Every trip you added to your schedule, settled in a single payment. The commute stops being a daily cash transaction.'},
  {side:'drv',t:'The car owner receives nothing yet',b:'Not one naira reaches them at payment. Conductor holds every fare in escrow — and the car owner is paid only at the end of the day, once that day’s trip has been completed.'},
  {side:'pax',t:'Monday’s journey runs, and you arrive',b:'The first trip of the week is completed exactly as scheduled.'},
  {side:'drv',t:'Only Monday’s fare is released',b:'Release is per trip, not per week. Monday lands in the car owner’s wallet; Tuesday through Friday stay held until each of those runs.'},
  {side:'pax',t:'Either of you can drop Tuesday',b:'Plans change — for you or the car owner. If either side suspends a day the night before, that trip simply does not run, and you are never charged for a trip that will not happen.'},
  {side:'drv',t:'A suspended day costs the car owner nothing',b:'Tuesday pays them nothing and penalises them nothing. A day that could not run is nobody’s fault.'},
  {side:'pax',t:'Tuesday’s fare is refunded in full',b:'The held amount returns to your wallet, in full. You only ever pay for the seats you actually travelled in.'},
  {side:'drv',t:'The week closes, trip by trip',b:'Each remaining journey releases as it runs. By Friday every fare has been paid out for exactly what happened — no more, no less.'}
];

function HowItWorks(){
  useReveal();
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
  const s=STAGES[on];
  return (<>
    <Header role="passenger" page="how it works"/>
    <main>
      <PageHero crumb="How it works" eyebrow="How it works" solo={true}
        title={<>One journey, seen from <em>both front seats</em>.</>}
        lede="Conductor is a carpooling scheduling platform: people who are already driving a route publish it, people who need that route book a seat on it, and the cost of the journey is split between everyone in the car. Scroll through a single week and watch both apps move together."
        cta={[<a key="1" href="#walk" className="btn btn--primary btn--lg">Start the walkthrough<Icon name="arrow" size={18}/></a>,
              <a key="2" href="#why" className="btn btn--ghostline btn--lg">Why people switch</a>]}/>

      <section style={{paddingBottom:'clamp(56px,6vw,88px)'}}><div className="wrap">
        <VRow items={[
          ['01','Carpooling','Several people who are going the same way travel in one car instead of several, and share what that journey costs.'],
          ['02','Scheduling','Trips are published and booked in advance, for a stated time. Nothing is hailed, and nothing is dispatched.'],
          ['03','Split by seat','One journey has one cost. It is divided between the seats travelling in it, so more seats means less each.'],
          ['04','Chosen, both ways','The passenger picks the car owner. The car owner approves the passenger. Either can decline without a reason.']]}/>
      </div></section>

      <section className="sec" id="walk" style={{paddingTop:0}}><div className="wrap">
        <div className="htw__prog">{STAGES.map((x,i)=><i key={i} data-on={i<=on?'1':'0'}></i>)}</div>
        <div className="htw">
          <div className="htw__col">
            <span className="htw__lb"><i style={{background:s.pDot||'var(--orange-base)'}}></i>{s.pLabel||'Passenger app'}</span>
            <Phone single={s.p} w={352} set={PSCREENS}/>
          </div>
          <div className="htw__mid">
            {STAGES.map((x,i)=>
              <div key={x.t} className="htw__stage" data-on={on===i?'1':'0'} ref={el=>refs.current[i]=el}>
                <div className="htw__n"><b>{i+1}</b>{'Stage '+(['one','two','three','four','five','six','seven','eight','nine','ten','eleven'][i]||(i+1))}</div>
                <h2 className="h2" style={{fontSize:'clamp(24px,2.4vw,34px)'}}>{x.t}</h2>
                <p>{x.b}</p>
                {x.split&&<div className="htw__split">
                  <div className="htw__sr"><i style={{background:'var(--orange-base)'}}></i><span><b>{x.split[0][0]} — </b>{x.split[0][1]}</span></div>
                  <div className="htw__sr"><i style={{background:'var(--pink-base)'}}></i><span><b>{x.split[1][0]} — </b>{x.split[1][1]}</span></div>
                </div>}
                <div className="htw__ph"><Phone single={x.p} w={286} set={PSCREENS}/><Phone single={x.d} w={286} set={DSCREENS}/></div>
              </div>)}
          </div>
          <div className="htw__col">
            <span className="htw__lb"><i style={{background:s.dDot||'var(--pink-base)'}}></i>{s.dLabel||'Car owner app'}</span>
            <Phone single={s.d} w={352} set={DSCREENS}/>
          </div>
        </div>
      </div></section>

      <section className="sec"><div className="wrap">
        <div className="illusplit">
          <Rv cls="rv--sc illusplit__art illusplit__art--panel">
            <img src="/images/art/commute-map.png" alt="A map with a route between two pins" loading="lazy"/>
          </Rv>
          <div>
            <Rv cls="eyebrow" tag="p">Start with your route</Rv>
            <Rv d={60}><h2 className="h2">It begins with where <em>you're going</em>.</h2></Rv>
            <Rv d={110}><p className="lede" style={{marginTop:24}}>Tell Conductor the trip you make — where from, where to, and the mornings you travel. It finds the people already driving that road, and the seats open on it. Everything else on this page follows from that one search.</p></Rv>
          </div>
        </div>
      </div></section>

      <section className="sec sec--cream" id="why"><div className="wrap">
        <SHead eyebrow="Why people join" title={<>Four reasons, and they <em>compound</em>.</>}
          lede="These are the four things people tell us they came for. Most arrive for the first and stay for the third."/>
        <div className="grid2">
          {WHY.map(([ic,t,b],i)=>
            <Rv key={t} d={i*80} cls="feat">
              <div className="feat__ic"><Icon name={ic} size={21}/></div>
              <h3 className="h3" style={{fontSize:20}}>{t}</h3><p>{b}</p>
            </Rv>)}
        </div>
      </div></section>

      <section className="sec"><div className="wrap">
        <SHead eyebrow="Money, in detail" title={<>Follow one week of fares <em>across the car</em>.</>}
          lede="The money never jumps straight from passenger to driver. It moves a step at a time — into escrow, out per trip, back on a refund. Read it from the passenger on the left, through the app, to the car owner on the right."/>
        <div className="mflow">
          <div className="mflow__phone" style={{gridRow:'1 / span '+MFLOW.length}}>
            <div className="mflow__phinner">
              <Phone single={0} w={358} set={[SHOT('drv-08-wallet')]}/>
              <p className="small" style={{textAlign:'center',maxWidth:'30ch',marginTop:14}}>The car owner’s wallet — held in escrow, released trip by trip, refunded when a day doesn’t run.</p>
            </div>
          </div>
          {MFLOW.map((m,i)=>
            <Rv key={i} d={0} cls={'mflow__card mflow__card--'+m.side}
              style={{gridColumn:m.side==='pax'?1:3,gridRow:i+1}}>
              <span className={'mflow__num mflow__num--'+m.side}>{i+1}</span>
              <div><b>{m.t}</b><p>{m.b}</p></div>
            </Rv>)}
        </div>
      </div></section>

      <Band title={<>Ride it, or <em>drive it</em>.</>}
        lede="Both apps are free to join. Start on whichever side of the journey you are on this week."/>
    </main>
    <Footer/>
  </>);
}



/* ============ SafetyNew ============ */
/* Safety, reworked to the site's language: lead with the safety SCREENS in a
   StepWalk (same component as Home / Car-owners), then the full list, then the
   FAQ lives on its own /faq page. */
const SAFE_STEPS=[
  {n:'Before a first trip',t:'Verified before you ever meet',b:'Identity is checked on both sides before a first trip — passengers clear NIN, phone and a liveness selfie; car owners add licence, vehicle papers and roadworthiness. You see the other’s verification and rating before any money is committed.',screen:0},
  {n:'Meeting up',t:'A named place to meet, never a dropped pin',b:'You meet at a known, categorised landmark on the route the car was already taking — a filling station, a mall, a familiar junction — colour-coded for how safe and public it is, never an unmarked spot down a side street.',screen:1},
  {n:'On the road',t:'Track the whole trip, and share it live',b:'Follow the journey on a live map — the car’s progress and your destination in view the whole way. Add the people you trust as emergency contacts and they’re sent a live link automatically: they watch you get home from any browser, no app or login needed — your name, who else is in the car, and your live location, only while the trip is on. SOS sits on the same screen.',screen:2},
  {n:'If anything goes wrong',t:'SOS on every screen, for both people',b:'Hold SOS and your live location goes to emergency services, your trusted contacts and our safety team at once. Short of an emergency, either side can suspend the trip — it ends there, and the fare is resolved afterwards, never at the roadside.',screen:3},
  {n:'Afterwards',t:'Rated, and it sticks to you',b:'Every passenger and car owner is rated after each trip, and either side can flag a problem — raise it and your money is protected until it is put right. A name here cannot be discarded and remade after a bad trip, which is exactly what makes every rating mean something.',screen:4}
];
const SAFE_SET=[SHOT('pax-09-verification'),SHOT('drv-14-landmark'),SHOT('pax-tripshare-v2'),SHOT('drv-05-sos'),SHOT('pax-07-rate')];

const SAFE_ALL=[
  ['Before you travel','shield','Identity & trust',[
    ['Two-sided identity verification','NIN, phone and a liveness selfie for passengers; driver’s licence, vehicle papers and roadworthiness for car owners.'],
    ['Nobody is anonymous','A verified name that cannot be thrown away and remade after a bad trip.'],
    ['You see them before you agree','Verification, rating and time on Conductor, visible to both sides before any money is committed.'],
    ['You choose who you ride with','Passengers request a specific car owner; the owner approves or declines. Nobody is ever assigned.'],
    ['Verified communities','Choose to ride only with people from a workplace, estate or campus you belong to.'],
    ['The car you’ll actually see','Make, colour and plate verified against the papers — a different car is a reportable mismatch.']]],
  ['When you meet','pin','The first two minutes',[
    ['First-meet code','A short code shown in both apps that you each confirm before the door opens.'],
    ['Named landmark meeting points','Public, well-known spots — never a pin down an unmarked street.'],
    ['Colour-coded landmark safety','Every meeting point tagged safe & public, use-with-care, or best-avoided.'],
    ['Seat control','The car owner opens or closes seats; the passenger picks the exact seat they’ll sit in.']]],
  ['During the trip','route','Safeguards that travel with you',[
    ['Live trip location tracking','A moving map and live ETA in the app, both sides, for the whole journey.'],
    ['Share your trip with your people','A live link to family or an emergency contact — they follow without the app.'],
    ['SOS on every screen','Emergency services, trusted contacts and our safety team, all at once, with your live location.'],
    ['Suspend at any time','Either side can end a journey — no penalty, and any held fare is returned.'],
    ['Road incidents & live traffic','Community-reported incidents and live traffic along your route.'],
    ['GPS-verified pick-up & drop-off','The trip is checked against where it actually happened.']]],
  ['After the trip','star','Accountability that compounds',[
    ['Reviews of every passenger and driver','Both sides rated after each trip — scores can’t be bought or reset.'],
    ['Feedback with voice notes','Detailed feedback, including a voice note, not just a star.'],
    ['Raise a complaint','An issue for a trip — for yourself, or several parties in the same car.'],
    ['GPS-adjudicated disputes','Settled against the trip’s real location record.'],
    ['Your money is protected','The driver is paid only after the trip runs — until then we hold it, and refund you for anything that does not happen.']]],
  ['Behind the scenes','eye','The platform itself',[
    ['Bans and suspensions','Repeat offenders barred at the identity level, with a fair appeals process.'],
    ['No cash at the roadside','Every fare moves through escrow — nothing handed over in the car.'],
    ['A conduct code both sides sign','Clear rules — and a team that acts on reports, not files them.'],
    ['Your data, protected','Handled under Nigerian data-protection rules; delete it whenever you want.']]]
];

function SafetyNew(){
  useReveal();
  return (<>
    <Header role="passenger" page="safety"/>
    <main>
      <PageHero crumb="Safety" eyebrow="Safety &amp; verification"
        title={<>A shared ride only works if <em>everyone</em> feels safe.</>}
        lede="Conductor is not a stranger arriving at your gate. It is two verified people who agreed to travel the same road at the same time — and every safeguard below applies in both directions, free, and on by default."
        cta={[<a key="1" href="#seen" className="btn btn--primary btn--lg">See it in the app<Icon name="arrow" size={18}/></a>,
              <a key="2" href="#all" className="btn btn--ghostline btn--lg">Every safeguard</a>]}
        aside={<Phone single={6} w={288} set={PSCREENS}/>}/>

      <section style={{paddingBottom:'clamp(40px,5vw,64px)'}}><div className="wrap">
        <VRow items={[
          ['01','Nobody is anonymous','Identity is verified on both sides before a first trip. No anonymous seats, no anonymous drivers.'],
          ['02','Both sides choose','Passengers request; car owners approve. Either can decline, at any point, without a reason.'],
          ['03','Everything runs both ways','Verification, ratings, SOS, the right to suspend — the passenger and the car owner get the same tools.'],
          ['04','On every single trip','Nothing here is an upgrade. Every safeguard ships with every journey, for free.']]}/>
      </div></section>

      <div id="seen"></div>
      <StepWalk items={SAFE_STEPS} set={SAFE_SET} eyebrow="Safety you can see"
        title={<>The safeguards, <em>on the screen</em>.</>}
        lede="Not a list of promises — the actual screens both people use, in the order a trip meets them. Scroll through one journey, from the checks before you meet to what happens if something goes wrong."/>

      <section className="sec sec--cream" id="all"><div className="wrap">
        <SHead eyebrow="Every safeguard, in one place" title={<>And the <em>full picture</em>.</>}
          lede="Each safeguard stated once, grouped by when in the trip it matters — so you can see the whole thing, not a highlight reel."/>
        <div className="phases">
          {SAFE_ALL.map(([phase,ic,tag,items],i)=>
            <Rv key={phase} d={i*60} cls="card phase rv--sc">
              <div className="phase__head">
                <span className="phase__n">{'0'+(i+1)}</span>
                <div className="phase__meta">
                  <div className="feat__ic phase__ic"><Icon name={ic} size={19}/></div>
                  <div>
                    <h3 className="phase__title">{phase}</h3>
                    <p className="phase__tag">{tag}</p>
                  </div>
                </div>
              </div>
              <div className="phase__items">
                {items.map(([t,b])=>
                  <div key={t} className="safeitem">
                    <span className="safeitem__ck"><Icon name="check" size={13} color="var(--success-base)"/></span>
                    <div><b>{t}</b><p>{b}</p></div>
                  </div>)}
              </div>
            </Rv>)}
        </div>
      </div></section>

      <section className="sec"><div className="wrap">
        <div className="trustband">
          {[['shield','Your money is always safe','The driver is not paid up front — we hold every fare and release it only after your trip has run. Anything that does not happen is refunded to you in full.'],
            ['alert','Either side can suspend','End a journey that has become unsafe or unworkable, with no penalty on either side.'],
            ['users','A conduct code both sign','Clear rules on behaviour, cancellation and disputes — and a team that acts on reports.']]
            .map(([ic,t,b],i)=>
              <Rv key={t} d={i*70} cls="trustband__c">
                <div className="feat__ic"><Icon name={ic} size={20}/></div>
                <div><b>{t}</b><p>{b}</p></div>
              </Rv>)}
        </div>
        <Rv d={200} style={{marginTop:30,display:'flex',flexWrap:'wrap',gap:16,alignItems:'center',justifyContent:'space-between'}}>
          <p className="lede" style={{margin:0,maxWidth:'42ch'}}>More questions about safety, verification or your account?</p>
          <a className="btn btn--ghostline btn--lg" href={P.faq}>Read the safety FAQs<Icon name="arrow" size={17}/></a>
        </Rv>
      </div></section>

      <Band title={<>Travel with people you can <em>actually see</em>.</>}
        lede="Verification, live tracking, SOS and every other safeguard come with every trip on both apps — free, and on by default."/>
    </main>
    <Footer/>
  </>);
}



/* ============ FaresPage ============ */
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




/* ============ Corridors ============ */
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



/* ============ CorridorDetail ============ */
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



/* ============ About ============ */
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



/* ============ FAQ ============ */
const QGROUPS={
  passenger:{label:'Passengers',items:[
    ['What exactly is carpooling on Conductor?','Several people travelling the same way at the same time share one car instead of taking several. The car owner was making the journey regardless; you take one of the seats that would otherwise have travelled empty, and the cost of that journey is split between everyone in it.'],
    ['Can the fare change after I book?','No. The car owner sets a price per seat when they publish the trip, and it locks the moment you request the seat. There is no surge multiplier anywhere in the product — not at rush hour, not in the rain, not on a Friday evening.'],
    ['Can I choose what kind of car I ride in?','Yes, and it is the flexibility most people notice first. Filter by saloon, SUV or bus before you look at a single driver, so comfort, air conditioning and boot space are a decision rather than a hope.'],
    ['Do I have to ride with strangers?','Only the first time. Most passengers settle into a handful of car owners on their route and travel with the same two or three people every week. Inside a community — a workplace, an estate, a campus — they were never strangers at all.'],
    ['How is this different from a hailing app?','A hailing app sends a driver to you and charges you for the whole car. Conductor is a scheduling platform: you book a seat in advance on a journey that was already going to happen, and pay a share of it rather than the price of a private trip.'],
    ['What if the car owner cancels?','Your money never leaves escrow until the trip is complete, so a cancellation returns it in full. You can also see the other trips published on your route for that morning without starting a new search.'],
    ['What does it cost to join?','Nothing. Creating an account, browsing trips, filtering by vehicle and messaging a car owner are all free. Everything up to booking a seat is free.']]},
  owner:{label:'Car owners',items:[
    ['Is this a taxi service? Do I need a hackney permit?','No. You are not for hire — you are sharing the cost of a journey you were already making, with people going the same way. Seat prices are held at cost-sharing level precisely so the trip remains a shared commute rather than commercial carriage.'],
    ['What does Conductor take?','Conductor earns through a service charge built into the fare, and it falls as you complete more trips — the more you share, the less it costs you to share.'],
    ['Can I select who rides with me?','Every time. Requests arrive with a verified profile and a rating earned from previous car owners, and you approve or decline each one. You can also restrict your seats to a community, so only its members can even ask.'],
    ['When exactly am I paid?','At the end of each trip. A passenger pays for their whole week up front, but that money sits in escrow and is released to you only once your own journey has been completed.'],
    ['What if a passenger does not show up?','Their fare is already in escrow, so a no-show does not cost you the trip. Repeat no-shows affect a passenger’s rating and, eventually, their access to the platform.'],
    ['Does this add much time to my commute?','Only if you let it. Matching is by route, never by detour, and the meeting point is agreed on the road you already drive. Most car owners add five minutes or less.']]},
  money:{label:'Payment & refunds',items:[
    ['How does paying for a week of trips work?','When you add trips to your schedule you pay for all of them together, so the commute is settled in advance rather than transacted every morning. The full amount goes into escrow, not to any driver.'],
    ['When does a car owner actually receive the money?','After their own trip is completed — per trip, not per week. Monday’s journey releases Monday’s fare; Friday’s is still held until Friday has happened.'],
    ['What happens if a trip does not go ahead?','It is refunded to you in full. That applies whether you cancelled, the car owner cancelled, or the trip was suspended part-way. Nothing that did not happen stays paid for.'],
    ['How is the fare worked out?','A journey has one cost, and it is divided between the seats travelling in it. Three seats sharing means roughly a third each of what that trip would cost one person alone. The app prices each seat for the route when a trip is published.'],
    ['Why are fares not listed on this website?','Because a price written into a web page goes stale the day it is published. Fares are quoted live by the app, so the figure you are shown is the figure you actually pay.'],
    ['Is there a service fee on top for passengers?','No. Passengers pay the seat fare and nothing else.'],
    ['Can I pay cash?','Payment runs through the app so that escrow, refunds and dispute handling all work — and so nobody is counting notes at a junction in morning traffic.']]},
  safety:{label:'Safety & account',items:[
    ['What do I need to sign up?','A phone number and a verified identity — NIN or government ID — on both sides. Car owners additionally provide a driver’s licence, vehicle registration, insurance and a current roadworthiness certificate.'],
    ['Are passengers verified as well as drivers?','Yes. A car owner is letting someone into their own vehicle, so verification has to run in both directions for the product to work at all.'],
    ['What if I feel unsafe during a trip?','Hold SOS, on any screen. Your live location goes to emergency services, your trusted contacts and our safety team at once, with the trip details attached. Short of an emergency, either side can suspend the trip — it ends there, and the fare position is resolved afterwards rather than at the roadside.'],
    ['Can a car owner suspend a trip too?','Yes, and without penalty. Ending a journey that has become unsafe or unworkable is treated as the right call, not a breach.'],
    ['What are communities?','Groups built around a workplace, estate, campus or association. Trips posted inside one are visible only to its members, and a car owner can restrict their seats to it. Anyone can create one or ask to join.'],
    ['How do I share a trip with my family?','One tap sends your route, your travelling companion and your expected arrival to anyone you choose. They follow the journey live without installing anything, and they get an alert when you arrive.'],
    ['Can I be matched with someone I do not want to travel with?','No. Passengers request a specific car owner, and car owners approve or decline each request individually. Nobody is assigned to anybody, and either side can decline as often as they like without giving a reason or losing standing.'],
    ['What happens if the car that arrives is not the one on the profile?','Do not get in, and report it in the app. The registration and description on a profile are verified against the vehicle papers, and a mismatch is treated as a serious breach of the conduct code.'],
    ['How do I report a problem after a trip?','Leave a review of the other party, and if something went wrong, raise a complaint from the trip. A complaint can name a single person or several parties in the same car, and disputes are resolved against the trip’s real GPS record rather than just who argues hardest. While it is open, any money involved stays protected in escrow.'],
    ['Who sees my live location when I share a trip?','Only the people you send the link to, and only for the duration of that trip. They do not need an account or the app, and the link stops working when you arrive.'],
    ['How do I delete my account?','From the app, or via the deletion guide on our site. Trip records are retained only as long as the law requires, and your profile stops being visible immediately.']]},
  promos:{label:'Offers',items:[
    ['What is the passenger offer running now?','Passengers can get up to 100% off every trip taken within the promotional week. Add your trips to your schedule as normal — the discount is applied at checkout, and anything still payable is held in escrow and released per trip in the usual way.'],
    ['What is the car owner offer running now?','Your service charge falls as you complete more trips. The more journeys you share, the cheaper each subsequent one is to run — so consistent weekday sharing is rewarded rather than one-off trips.'],
    ['Do offers change the way refunds work?','No. A discounted trip that does not happen is refunded on exactly the same terms as any other, for whatever was actually paid.'],
    ['How long do the offers last?','Both are running now and are subject to change. The app always shows the current terms at the point of booking, which is the version that applies.']]}
};

function FAQPage(){
  useReveal();
  const [tab,setTab]=React.useState('passenger');
  const keys=Object.keys(QGROUPS);
  const g=QGROUPS[tab];
  return (<>
    <Header role="passenger" page="faq"/>
    <main>
      <PageHero crumb="FAQ" eyebrow="FAQ" solo={true}
        title={<>Everything people ask, <em>answered plainly</em>.</>}
        lede="Grouped by who is asking. If your question is not here, our support team answers on email within a working day — and the answer usually ends up on this page."
        cta={[<a key="1" href="mailto:support@conductor.ng" className="btn btn--primary btn--lg">Email support<Icon name="arrow" size={18}/></a>,
              <a key="2" href={P.how} className="btn btn--ghostline btn--lg">See how it works instead</a>]}/>

      <section className="sec" style={{paddingTop:0}}><div className="wrap wrap--tight">
        <Rv cls="qtabs">
          {keys.map(k=>
            <button key={k} type="button" className="qtab" aria-pressed={tab===k} onClick={()=>setTab(k)}>
              {QGROUPS[k].label}<span className="num">{QGROUPS[k].items.length}</span>
            </button>)}
        </Rv>
        <div className="faq" style={{marginTop:34}}>
          {g.items.map(([q,a],i)=>
            <details key={tab+i} open={i===0}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>)}
        </div>
      </div></section>

      <section className="sec sec--cream"><div className="wrap">
        <SHead eyebrow="Still stuck" title={<>Ask a person <em>instead</em>.</>}
          lede="Support is a small team, not a queue. Tell them the route and the trip and they can see what happened."/>
        <div className="grid3">
          {[['chat','Email support','support@conductor.ng — answered within a working day, sooner during the morning run.','mailto:support@conductor.ng'],
            ['shield','Report a safety concern','Anything that happened on a trip, from a mismatched vehicle to conduct. These go to the safety team directly.','mailto:support@conductor.ng?subject=Safety%20report'],
            ['pin','Ask for your route','Not seeing where you travel? Tell us and we will let you know when a car owner publishes it.',P.corr+'#request']]
            .map(([ic,t,b,href],i)=>
              <Rv key={t} d={i*80} tag="a" cls="feat" href={href} style={{color:'inherit'}}>
                <div className="feat__ic"><Icon name={ic} size={21}/></div>
                <h3 className="h3" style={{fontSize:19}}>{t}</h3><p>{b}</p>
              </Rv>)}
        </div>
      </div></section>

      <Band title={<>The rest makes sense <em>once you ride</em>.</>}
        lede="Both apps are free. Book a seat, or publish the trip you were making anyway."/>
    </main>
    <Footer/>
  </>);
}



/* ============ Legal ============ */
/* Legal + company pages: Privacy, Terms, Code of conduct, Delete profile,
   Careers, Press. A shared LegalDoc renderer (readable article column with a
   sticky contents rail) + a lighter layout for Careers / Press.

   The four legal documents reproduce the published conductor.ng policies
   (reviewed by the legal team) as close to word-for-word as practical.
   Source of truth remains the master copies held by the legal team. */

function LegalBody({blocks}){
  return blocks.map((b,i)=>{
    const [t,v]=b;
    if(t==='h2') return <h2 key={i} className="legal__h2" id={'s'+i}>{v}</h2>;
    if(t==='h3') return <h3 key={i} className="legal__h3">{v}</h3>;
    if(t==='p')  return <p  key={i} className="legal__p">{v}</p>;
    if(t==='ol') return <ol key={i} className="legal__list">{v.map((x,j)=><li key={j}>{x}</li>)}</ol>;
    if(t==='ul') return <ul key={i} className="legal__list legal__list--b">{v.map((x,j)=><li key={j}>{x}</li>)}</ul>;
    return null;
  });
}

function LegalDoc({crumb,eyebrow,title,updated,intro,blocks}){
  useReveal();
  const toc=blocks.map((b,i)=>b[0]==='h2'?[i,b[1]]:null).filter(Boolean);
  return (<>
    <Header role="passenger"/>
    <main>
      <PageHero crumb={crumb} eyebrow={eyebrow} solo={true}
        title={title}
        lede={intro}/>
      <section className="sec" style={{paddingTop:0}}><div className="wrap">
        <div className="legal">
          <aside className="legal__toc">
            {updated&&<p className="legal__updated">Last updated · {updated}</p>}
            <p className="eyebrow" style={{margin:'0 0 12px'}}>On this page</p>
            <nav>{toc.map(([i,t])=><a key={i} href={'#s'+i}>{t}</a>)}</nav>
          </aside>
          <article className="legal__body">
            <LegalBody blocks={blocks}/>
            <div className="legal__foot">
              <p className="small">This page mirrors the current published policy. Questions? <a href="mailto:privacy@conductor.ng">privacy@conductor.ng</a></p>
            </div>
          </article>
        </div>
      </div></section>
      <Band title={<>The rest is just the ride <em>working</em>.</>}
        lede="Both apps are free. Book a seat, or publish the trip you were making anyway."/>
    </main>
    <Footer/>
  </>);
}

/* ---------------- Privacy ---------------- */
function PrivacyPage(){return <LegalDoc crumb="Privacy" eyebrow="Legal" updated="August 2026"
  title={<>Privacy <em>policy</em>.</>}
  intro="Conductor takes your privacy seriously. This Privacy Policy explains what personal information we collect, why we collect it, who we share it with, how long we keep it, and the rights you have under Nigerian data protection law — including the Nigeria Data Protection Act 2023 (NDPA) and, where applicable, the Nigeria Data Protection Regulation (NDPR)."
  blocks={[
  ['h2','1 · Scope & Roles'],
  ['p','This Policy applies to personal information collected when accessing or using the Platform, communicating with Conductor, or otherwise interacting with their services. For the NDPA, Conductor functions as the Data Controller regarding personal information, except where specific processing activities involve them acting as a processor on behalf of another controller (such as certain identity-verification activities where the controller is a licensed identity provider).'],
  ['h2','2 · What We Collect'],
  ['p','The following categories of information are collected:'],
  ['ol',[
    <><b>Registration &amp; profile data:</b> name, date of birth, phone number, email, gender (where declared), photograph, password (hashed), preferred language, initial role (Passenger or Driver), and occupation category (optional).</>,
    <><b>Identity-verification data:</b> NIN and NIN-verification records; for Drivers, driver’s licence number, licence photograph, and licence verification records; vehicle registration papers, insurance certificate, and other supporting documents.</>,
    <><b>Trip &amp; usage data:</b> Bookings, Trips published, Trip-Days completed, cancellations, ratings, chat messages, service-recovery credits and referrals.</>,
    <><b>Location data:</b> pickup and drop-off coordinates, live GPS during a Trip, and area-level home / work coordinates captured during onboarding (see clause 6).</>,
    <><b>Financial data:</b> Wallet balances, transaction history, bank-account details submitted for withdrawals, and tokenised card details as held by payment processors.</>,
    <><b>Device &amp; technical data:</b> device model, operating system, app version, IP address, session identifiers, telemetry (battery, network kind, GPS accuracy), and analytics events.</>,
    <><b>Safety data:</b> SOS activations, emergency contacts nominated, incident reports, safety-relevant photos or recordings (e.g. vehicle photographs), and dispute records.</>,
    <><b>Communications:</b> messages exchanged in the in-app chat, support tickets, and notifications delivered via their providers.</>,
    <><b>Search &amp; preference data:</b> the routes and days searched, filters applied, promotional codes redeemed, and preferences set.</>]],
  ['h2','3 · How We Use It'],
  ['p','Personal information is used to:'],
  ['ol',[
    'operate the Platform — register accounts, verify identity, publish or book Trips, calculate fares, process payments, and settle earnings;',
    'keep the Platform safe — run Trust & Safety systems, detect fraud, prevent abuse, investigate incidents, and respond to disputes;',
    'improve the Platform — understand feature usage, prioritise product decisions, calibrate pricing, and develop new features;',
    'communicate with users — send Trip notifications, service messages, safety alerts, receipts, and (where opted in or the law permits) promotional messages;',
    'meet legal, tax, and regulatory obligations — including obligations under the NDPA, NDPR, FCCPA, Federal Inland Revenue Service (FIRS) requirements, and any lawful requests by competent authorities;',
    'enforce Terms and defend legal rights.']],
  ['h2','4 · Legal Bases (NDPA)'],
  ['p','Processing relies on one or more of the following lawful bases under the NDPA:'],
  ['ol',[
    <><b>Contract</b> — processing necessary to perform services to users (e.g. matching Passengers with Drivers, processing payments).</>,
    <><b>Legal obligation</b> — processing required by Nigerian law (e.g. VAT, KYC / identity verification, responding to lawful orders).</>,
    <><b>Legitimate interests</b> — where processing is necessary for Conductor’s or a third party’s legitimate interests and not overridden by user rights and freedoms (e.g. fraud prevention, Platform integrity, research and product improvement using aggregated data).</>,
    <><b>Consent</b> — where specifically requested (e.g. certain marketing communications, background-location tracking outside a Trip window).</>,
    <><b>Vital interests</b> — where processing is necessary to protect the life or physical safety of any person (e.g. SOS activations).</>]],
  ['h2','5 · Who We Share With'],
  ['ol',[
    <><b>Other Users, on a need-to-know basis:</b> a Driver receives the Passenger’s first name, rating, and pickup / drop-off; a Passenger receives the Driver’s first name, rating, and Vehicle’s make / model / plate (partially masked in some contexts). Full identity documents, home / work coordinates, or unmasked phone numbers are not shared between Users.</>,
    <><b>Service providers</b> under written contract and confidentiality obligations, including cloud hosting, payment processing (Paystack), mapping (Google Maps & Places), notification orchestration (Novu, WhatsApp / Meta), identity verification (QoreID, VerifyMe), analytics, and customer-support tooling.</>,
    <><b>Regulators, courts, and law-enforcement agencies</b> where required by law, court order, or valid regulatory demand, or where there is good-faith belief that disclosure is necessary to prevent harm, fraud, or a violation of law.</>,
    <><b>Corporate transactions</b> — in the event of a merger, acquisition, financing, insolvency, or sale of assets, information may be transferred to the counterparty, subject to appropriate protections.</>,
    <><b>With your consent</b> — e.g. where connecting a third-party service to a Conductor account, or authorising sharing information with a workplace-benefits scheme.</>]],
  ['p','Personal information is not sold, and it is not used for interest-based advertising to third parties.'],
  ['h2','6 · Location Data'],
  ['ol',[
    'The Platform collects location data (a) at points where users actively use location features (searching, booking, setting home / work), (b) during Trips (for safety and to power in-Trip UX such as ETA and route replay), and (c) where background-location permission has been granted (for pickup-arrival detection when the phone is asleep).',
    'Location permission may be revoked at any time through device settings. Revoking permission may disable safety or matching features that require it.',
    'Location precision is minimised where possible. Home and work areas are stored as neighbourhood-level coordinates, not exact street addresses.',
    'Location data is not sold.']],
  ['h2','7 · National Identification Number (NIN)'],
  ['p','The following notice supplements this Policy in relation to NIN specifically, and forms part of it.'],
  ['ol',[
    <><b>Identity verification.</b> NIN is used to confirm that the registered identity is genuine and belongs to the user. This helps confirm the identity of both Drivers and Passengers and prevents the use of false, stolen, or fraudulent identities.</>,
    <><b>Safety and security.</b> NIN verification forms part of safety measures. It supports accountability, deters misconduct, and protects the community from fraudulent or harmful activity.</>,
    <><b>Driver and Passenger authentication.</b> For Drivers, NIN verification is part of onboarding and due diligence to ensure that only properly identified individuals provide transportation services on the Platform. For Passengers, NIN verification reduces impersonation and promotes trust between all Users.</>,
    <><b>Fraud prevention and investigation.</b> NIN may be used to detect, prevent, investigate, and respond to fraud, identity theft, abuse of the Platform, or other activities that violate the Terms or applicable law.</>,
    <><b>Legal and regulatory compliance.</b> NIN may be processed to comply with applicable laws, lawful requests from competent authorities, and other requirements imposed by relevant governmental agencies.</>,
    <><b>Protection.</b> NIN is treated as sensitive personal information with reasonable administrative, technical, and organisational measures to protect it against unauthorised access, disclosure, alteration, misuse, or loss. Access is restricted to authorised personnel and trusted service providers who require it to perform verification, security, or compliance functions and are bound by confidentiality and data-protection obligations.</>,
    <><b>No sale or marketing.</b> NIN is not sold and is not used for marketing.</>,
    <><b>Retention.</b> NIN is retained only for as long as necessary to fulfil the purposes above, comply with legal and regulatory requirements, resolve disputes, or enforce contractual rights. Where retention is no longer required, it will be securely deleted or anonymised in accordance with the retention schedule.</>,
    <><b>Your rights.</b> Subject to applicable law, users may request access, correction, objection, or exercise other rights available under NDPA (see clause 9 below).</>]],
  ['h2','8 · Retention'],
  ['p','Personal information is retained only for as long as necessary for the purposes described in this Policy, or for such longer period as is required by law. Indicative retention windows (subject to specific legal, regulatory, or operational requirements):'],
  ['ul',[
    <><b>Account &amp; profile data</b> — while the account is active, and thereafter for a reasonable period to satisfy legal obligations, resolve disputes, and enforce agreements.</>,
    <><b>Identity-verification records (including NIN, licences, vehicle documents)</b> — for the duration of the account and thereafter for such period as is required by anti-fraud, safety, tax, or regulatory obligations.</>,
    <><b>Trip, payment, and settlement records</b> — for a minimum of seven (7) years, or such longer period as required for accounting, tax, or audit purposes.</>,
    <><b>Search history &amp; usage telemetry</b> — up to 365 days by default (admin-tunable), used for personalisation and product research.</>,
    <><b>Chat and support communications</b> — for such period as is required to service tickets, respond to disputes, and comply with law.</>,
    <><b>Anonymised / aggregated data</b> — may be retained indefinitely.</>]],
  ['h2','9 · Your Rights'],
  ['p','Subject to applicable law and to any specific conditions, users have the right to:'],
  ['ul',[
    'ask Conductor to confirm whether personal information is processed and to receive a copy;',
    'ask Conductor to correct inaccurate or incomplete information;',
    'ask Conductor to delete personal information no longer having a lawful basis to retain;',
    'object to processing on grounds of particular situation, or to withdraw a consent previously given;',
    'request restriction of processing in certain cases;',
    'request portability of personal information provided to Conductor, in a structured, commonly used, machine-readable format;',
    'lodge a complaint with the Nigeria Data Protection Commission (NDPC).']],
  ['p','To exercise a right, contact privacy@conductor.ng. Conductor may need to verify identity before responding. Response will be within the timeframe required by law and generally within thirty (30) days.'],
  ['h2','10 · Security & Breaches'],
  ['ol',[
    'Administrative, technical, and organisational safeguards are implemented to protect personal information from unauthorised access, disclosure, alteration, misuse, or loss. These include encryption in transit, access controls, network segmentation, audit logs, and staff training.',
    'No system is completely secure. If account or personal information has been compromised, contact Conductor immediately at security@conductor.ng.',
    'Where a personal-data breach is likely to result in a risk to affected individuals, the Nigeria Data Protection Commission and any affected individuals will be notified in accordance with the NDPA.']],
  ['h2','11 · Children'],
  ['p','The Platform is not intended for and may not be used by any person under the age of 18. Personal information is not knowingly collected from any person under 18. If Conductor becomes aware that such information has been collected, it will be deleted and the associated account will be terminated.'],
  ['h2','12 · Cross-Border Transfers'],
  ['p','Some service providers process personal information outside Nigeria. Where personal information is transferred outside Nigeria, this is done in accordance with the NDPA, including by relying on adequacy decisions, standard contractual clauses, binding corporate rules, or one of the other lawful transfer mechanisms recognised under Nigerian law.'],
  ['h2','13 · Contact & Data Protection Officer (DPO)'],
  ['p','Questions, requests, or complaints about privacy or personal information: privacy@conductor.ng.']
  ]}/>;}

/* ---------------- Terms ---------------- */
function TermsPage(){return <LegalDoc crumb="Terms" eyebrow="Legal" updated="1 September 2026"
  title={<>Terms of <em>service</em>.</>}
  intro="These Terms of Service govern your use of the Conductor.ng website, mobile application and related services (the “Platform”). They incorporate the Passenger Policy, the Car Owner Policy, the Code of Conduct, the Refund Policy and the Privacy Policy by reference. Where a document written specifically for Passengers or Car Owners addresses a matter these Terms also cover, the specific document prevails."
  blocks={[
  ['h2','1 · Acceptance of terms'],
  ['p','By creating an account, browsing the Platform, or tapping “accept” at registration, you agree to be bound by these Terms, the Code of Conduct, and, depending on how you use the Platform, the Passenger Policy or the Car Owner Policy. If you do not agree, please do not use the Platform.'],
  ['h2','2 · Service description'],
  ['p','Conductor.ng operates a car-sharing and commute-matching platform that connects verified Car Owners with Passengers travelling the same routes in Lagos and other Nigerian locations. The Company facilitates these connections, publishes pricing, holds fares in escrow, and provides supporting safety and support tooling. The Company does not own, lease, or operate any Vehicle, and Car Owners provide transportation services as independent contractors as set out in the Car Owner Policy.'],
  ['h2','3 · Fares, payment and refunds'],
  ['ul',[
    'Every fare is calculated by the Company’s pricing engine, shown in full before booking, and locked at booking. There is no surge pricing.',
    'Fares are collected through the Platform and held in Company-controlled escrow, per Trip-Day, until the Trip-Day is complete or resolved.',
    'Refunds are governed by the Refund Policy, which is incorporated into these Terms by reference. In summary: cancellations before a Car Owner accepts a Booking are refunded in full; a Trip-Day is refunded in full where the Car Owner cancels, no-shows, or fails to deliver the ride as promised; a Passenger no-show is not refunded; late-cancellation and no-show handling otherwise follows the published cut-off and attendance-flag model described in the Refund Policy.']],
  ['h2','4 · Vehicle standards and roadworthiness'],
  ['p','The Company is not liable for mechanical faults or breakdowns of any Vehicle. Car Owners are solely responsible for keeping their Vehicle roadworthy, insured, and compliant with Lagos State and federal vehicle regulations, as set out in the Car Owner Policy. Where a Vehicle fails during a Trip, the Company will assist in arranging alternative transport where reasonably possible, but is not liable for resulting inconvenience or cost. Users accept that vehicle condition can vary trip to trip and use the Platform on that basis.'],
  ['h2','5 · Conduct and disputes'],
  ['p','All Users must treat each other, and the Vehicle, respectfully and lawfully, in accordance with the Code of Conduct. Physical altercation, verbal abuse, sexual misconduct, or other misconduct between Users results in suspension or termination in accordance with the sanctions ladder set out in the Code of Conduct, without refund of any related fare. The Company may report criminal conduct to the Nigeria Police Force or other competent authority and may preserve and disclose evidence in accordance with law. The Company is a facilitator and disclaims liability for disputes arising directly between Users, without prejudice to the dispute-resolution channel described in clause 9.'],
  ['h2','6 · Limitation of liability'],
  ['ul',[
    'The Company is a facilitator connecting Passengers and Car Owners; it does not assume responsibility for the safety, conduct, or actions of any User.',
    'To the fullest extent permitted by Nigerian law, the Company is not liable for damages, losses, or injuries arising from your use of the Platform or a Trip, except where such liability cannot lawfully be excluded.',
    'You agree to indemnify and hold the Company harmless from claims arising from your use of the Platform, save to the extent caused by the Company’s own breach of these Terms or applicable law.']],
  ['h2','7 · Data protection'],
  ['p','Our collection, use, and protection of your personal data is described in full in the Privacy Policy, which forms part of these Terms. Where you are a Passenger or Car Owner, the Passenger Policy or Car Owner Policy also sets out data rights specific to your role.'],
  ['h2','8 · Live trip sharing & emergency contacts'],
  ['p','Conductor lets Passengers and Car Owners share their live journey with people they choose, so someone they trust can follow the trip while they are on the road. Sharing applies to a specific trip, and emergency contacts automatically receive access to a User’s eligible trips during the relevant trip week (a Car Owner’s route or a Passenger’s selection of a minimum of three active days).'],
  ['ul',[
    <><b>Live trip sharing.</b> You may share a link to your active trip with your emergency contacts or other persons of your choice. Anyone who has the link may be able to view your name or identifier, the number of other passengers on the trip, and your live location while the trip is active. Each trip has its own link, and a link gives access only to that specific trip — not to any other trip in the same week.</>,
    <><b>Emergency contacts.</b> By adding a person as an emergency contact, you acknowledge that Conductor may automatically send that person information and trip-sharing links relating to your eligible trips during the relevant trip week.</>,
    <><b>Your responsibility.</b> You are responsible for ensuring that your emergency-contact information is accurate, and for sharing trip links only with persons you trust.</>,
    <><b>Link access.</b> You acknowledge that anyone who obtains a shared trip link may access the information available through that link. Conductor does not currently require additional authentication to access a shared trip link.</>,
    <><b>End of access.</b> Live location is available only while the relevant trip is active. Access to live location ends when the trip ends, is cancelled, or your access to the trip is otherwise revoked.</>]],
  ['h2','9 · Governing law, disputes and arbitration'],
  ['p','These Terms are governed by the laws of Lagos State and the Federal Republic of Nigeria. In-app reporting and the support and disputes channels described in the Passenger Policy and Car Owner Policy are the first point of call for any complaint. Where a matter is not resolved through support or mediation, it is referred to arbitration in Lagos under the Arbitration and Mediation Act 2023, subject to the enforceability of that provision under Nigerian consumer-protection law and your statutory right to bring certain claims before the Federal Competition and Consumer Protection Tribunal.'],
  ['h2','10 · Changes to these Terms'],
  ['p','The Company may amend these Terms from time to time. Where a change is material, we will notify Users through the Platform or by email and update the “last updated” date on this page. Continued use of the Platform after a change takes effect constitutes acceptance of the revised Terms.'],
  ['h2','11 · Contact information'],
  ['ul',[
    'Email: support@conductor.ng',
    'Phone: +234 818 887 6601',
    'Address: 8A Olayinka Balogun Crescent, Magodo Phase 2, Lagos, Nigeria']]
  ]}/>;}

/* ---------------- Code of conduct ---------------- */
function ConductPage(){return <LegalDoc crumb="Code of conduct" eyebrow="Legal" updated="10 August 2026"
  title={<>Code of <em>conduct</em>.</>}
  intro="Conductor is a community of Passengers and Car Owners who share vehicles every week. Trust between us is the reason the Platform works. This Code sets out what everyone agrees to do and, more importantly, what nobody may do — with the sanctions that follow when the line is crossed."
  blocks={[
  ['h2','1 · Scope & values'],
  ['ol',[
    <><b>Who this applies to.</b> This Code applies to every User of the Platform — Passenger, Car Owner, or both — and to their conduct in-app, at pickup and drop-off, inside a Vehicle, and in any Platform-facilitated communication.</>,
    <><b>Values we operate by.</b>
      <ul className="legal__sub">
        <li><b>Respect.</b> Every person in the Vehicle is a colleague, a professional, a neighbour.</li>
        <li><b>Punctuality.</b> The schedule is the product; keeping it protects everyone’s time.</li>
        <li><b>Honesty.</b> Identity is verified for a reason; ratings, chat, and refund claims must be truthful.</li>
        <li><b>Safety.</b> If it is not safe, we don’t do it — whether that means not driving, not boarding, or not staying quiet.</li>
      </ul></>,
    <><b>How the Code is enforced.</b> Our Trust & Safety team uses in-app evidence (GPS traces, chat logs, attendance flags, ratings, photos, dispute records) together with any report or evidence you submit. Enforcement decisions are recorded against the account and, where applicable, the underlying verified identity.</>]],
  ['h2','2 · Zero-tolerance conduct'],
  ['p','The following conduct results in immediate termination of the offender’s account, an identity-level ban that prevents re-registration under any name, and (where warranted) referral to law-enforcement.'],
  ['ol',[
    <><b>Physical violence or assault</b> against a Passenger, Car Owner, or any third party in connection with a Trip.</>,
    <><b>Sexual misconduct</b> of any kind — including unwanted touching, sexual comments, sexual coercion, indecent exposure, requests for sexual acts, sending sexual content in-app, or any conduct that would constitute a sexual offence under Nigerian law.</>,
    <><b>Weapons and prohibited items</b> — firearms, ammunition, explosives, chemical or biological hazards, illegal drugs (as defined by Nigerian law), or any item whose possession is a criminal offence.</>,
    <><b>Driving under the influence.</b> Any Car Owner found to be operating a Vehicle under the influence of alcohol, controlled substances, or any impairing medication is permanently banned.</>,
    <><b>Reckless driving causing serious risk or harm</b> — including street-racing, dangerous overtaking, or gross violation of traffic law that endangers occupants.</>,
    <><b>Human trafficking, kidnapping, or unlawful detention</b> of any person via the Platform.</>,
    <><b>Identity fraud</b> — using another person’s NIN, licence, or documents; falsifying vehicle papers; or evading a ban by re-registering under a different identity.</>,
    <><b>Hate conduct</b> — slurs, symbols, or targeted abuse based on race, tribe, ethnicity, nationality, religion, gender, gender identity, sexual orientation, disability, or any other protected characteristic.</>,
    <><b>Threats and stalking</b> — credible threats of harm, following a User off-platform, or repeated unwanted contact after being asked to stop.</>,
    <><b>Retaliation</b> against a User for reporting an incident, cooperating with an investigation, or leaving an honest rating.</>]],
  ['h2','3 · Serious violations'],
  ['p','The following conduct is investigated and typically results in extended suspension (7 to 90 days) or, on repetition or aggravating facts, termination.'],
  ['ol',[
    <><b>Verbal abuse, insults, or intimidation</b> that falls short of a criminal threat.</>,
    <><b>Discrimination</b> in booking, boarding, seating, or service that does not rise to hate conduct but visibly disadvantages a User on a protected ground.</>,
    <><b>Chronic no-show or last-minute cancellation</b> that materially impacts the schedule of other Users.</>,
    <><b>Repeated route deviation</b> by a Car Owner without lawful cause.</>,
    <><b>Off-platform payments.</b> Soliciting or accepting cash, bank transfer, or any other off-platform value for a Trip.</>,
    <><b>Passenger transfer / seat resale</b> without the Car Owner’s knowledge and Platform approval.</>,
    <><b>Fraudulent refund claims</b>, false SOS activations, or false incident reports.</>,
    <><b>Damage to the Vehicle</b> caused by a Passenger’s deliberate act or gross negligence.</>,
    <><b>Damage to a Passenger’s property</b> caused by a Car Owner’s deliberate act or gross negligence.</>,
    <><b>Publishing a Vehicle</b> that is unroadworthy, uninsured, or missing required documents.</>,
    <><b>Manipulation of ratings, referrals, or promotions</b> — including creating accounts to boost oneself, colluding to inflate ratings, or exploiting referral loopholes.</>,
    <><b>Recording or photographing</b> another User inside the Vehicle without their consent, other than incidental capture through Platform safety tooling.</>]],
  ['h2','4 · Minor violations'],
  ['p','The following conduct typically results in a warning or a short suspension (24 to 72 hours) for repeat occurrences.'],
  ['ol',[
    'Occasional lateness beyond the published grace period.',
    'Rudeness in chat or at pickup that does not rise to abuse.',
    'Failure to wear a seat belt after being reminded.',
    'Eating, smoking, or vaping in the Vehicle without the Car Owner’s permission.',
    'Playing personal audio at volume without earphones.',
    'A Vehicle presented in visibly unclean condition.',
    'Non-critical documents lapsing briefly before renewal.',
    'Publishing a Trip whose stated route and actual route materially diverge on isolated occasions.']],
  ['h2','5 · Sanctions ladder'],
  ['p','Sanctions are proportionate to the conduct, aggravated by pattern, and always subject to the specific facts. In broad terms:'],
  ['ol',[
    <><b>Warning.</b> Recorded on your account; no restriction on service.</>,
    <><b>Feature restriction.</b> Temporary loss of a specific feature (e.g. no publishing, no wallet withdrawal) while a review is completed.</>,
    <><b>Short suspension.</b> Account inactive for 24 – 72 hours; existing Bookings honoured or refunded per the Refund Policy.</>,
    <><b>Extended suspension.</b> Account inactive for 7 – 90 days; Bookings cancelled with refund; funds in Wallet subject to normal payout rules.</>,
    <><b>Termination.</b> Account permanently closed. Withdrawable Wallet funds are paid out subject to identity verification and fraud checks.</>,
    <><b>Identity-level ban.</b> Applied in addition to termination for zero-tolerance conduct. The verified identity (NIN + face) is blocked from re-registration under any name or phone number.</>,
    <><b>Suspension carry-over.</b> A suspension in effect at the time an account is closed carries forward to any subsequent re-registration by the same verified identity, unless the sanction has expired or been lifted on appeal.</>,
    <><b>Referral to authorities.</b> Where conduct amounts to a criminal offence, the Company may report to and cooperate with the Nigeria Police Force, FRSC, NDLEA, or other competent authority, and may preserve and disclose evidence in accordance with law.</>]],
  ['h2','6 · Appeals'],
  ['ol',[
    'Warnings, feature restrictions, and short suspensions are recorded but not routinely appealable; you may raise the matter with support.',
    'Extended suspensions and terminations are appealable. Open the notification in the app or email appeals@conductor.ng within fourteen (14) days of the sanction.',
    'Appeals are decided by a person who was not part of the original decision, using the same evidence available to that decision plus any new evidence you supply.',
    'The Company’s decision on appeal is final for Platform-access purposes, without prejudice to any legal right you may have.']],
  ['h2','7 · Reporting an incident'],
  ['ol',[
    <><b>In immediate danger:</b> tap in-app SOS and, in parallel, call 112 or your local police service.</>,
    <><b>After the fact:</b> open the affected Trip-Day in the app and tap “Report an issue”. Attach photographs, screenshots, or a written statement.</>,
    <><b>General reports:</b> email safety@conductor.ng. All reports are treated in confidence, subject to lawful disclosure.</>,
    <><b>Retaliation is a zero-tolerance breach.</b> Retaliating against a User who reports in good faith is grounds for termination and identity-level ban.</>]]
  ]}/>;}

/* ---------------- Delete your profile ---------------- */
function DeletePage(){return <LegalDoc crumb="Delete your profile" eyebrow="Your account" updated="August 2026"
  title={<>How to delete <em>your account</em>.</>}
  intro="Users who wish to close their Conductor.ng account can do so through the app. The process takes approximately two minutes and includes a thirty-day grace period during which deletion can be cancelled. This permanently removes your profile and personal details after 30 days. Trip and payment records are kept, anonymised, only where the law requires it."
  blocks={[
  ['h2','Five-step deletion process'],
  ['ol',[
    <><b>Step 1:</b> Navigate to the Account tab, scroll to the App section, and select Delete account.</>,
    <><b>Step 2:</b> Review the warning screen explaining the 30-day grace period and what information will be removed.</>,
    <><b>Step 3:</b> Choose which profile to delete — passenger side, car owner side, or the entire account.</>,
    <><b>Step 4:</b> Optionally provide feedback about why you’re leaving the platform.</>,
    <><b>Step 5:</b> Confirm deletion by typing “DELETE” to schedule account deletion.</>]],
  ['p','The 30-day grace period begins immediately. Users can log back in before it ends to cancel the deletion request.'],
  ['h2','1 · How to request deletion'],
  ['p','Open Account → Delete account in the app, or contact Conductor at support@conductor.ng. Once the request is received, the account is scheduled for deletion and enters a thirty (30) day deactivation period.'],
  ['h2','2 · Thirty (30) day grace period'],
  ['ol',[
    'The account is deactivated but not permanently deleted for thirty (30) days.',
    'If the user logs in or otherwise accesses the Platform using their credentials during that period, the deletion request is deemed withdrawn and the account is automatically reactivated. A new deletion request may be submitted at any time.',
    'Where the user is owed money on the account (e.g. a Wallet balance), Conductor will guide them through payout (typically to the verified bank account) as part of the deletion flow. The account cannot be permanently deleted while funds are undischarged.']],
  ['h2','3 · Timeline for deletion'],
  ['p','After the 30-day grace period, Conductor completes the deletion or anonymisation of eligible personal data within a reasonable further period and, in any event, in accordance with applicable legal and regulatory requirements. Certain information may remain in secure archives for the periods described below.'],
  ['h2','4 · Information that may not be deleted'],
  ['p','Notwithstanding a deletion request, certain categories of information may be retained where retention is necessary or permitted by law, including:'],
  ['ol',[
    <><b>Identity-verification records</b> — information used to verify User identity (including NIN records) may be retained where necessary to comply with legal, regulatory, security, fraud-prevention, or audit requirements.</>,
    <><b>Transaction and Trip records</b> — records relating to completed Trips, payments, receipts, disputes, complaints, refunds, and other transactional activity may be retained for accounting, tax, auditing, and legal-compliance purposes.</>,
    <><b>Safety and security information</b> — information necessary to investigate or prevent fraud, abuse, security incidents, violations of these Terms, or other unlawful activity, and to protect Users and the public.</>,
    <><b>Legal and regulatory requirements</b> — personal information subject to a legal-hold, court order, governmental directive, or valid regulatory request.</>,
    <><b>Anonymised or aggregated data</b> — information that has been irreversibly anonymised so that it can no longer identify the user may be retained and used for statistical analysis, service improvement, business planning, and other lawful purposes.</>]],
  ['h2','5 · Effect of permanent deletion'],
  ['p','Once an account is permanently deleted, access to the profile, Trip history, saved preferences, referrals, and other information associated with the account may be lost. Information retained under clause 4 will continue to be protected in accordance with the Privacy Policy and applicable law.'],
  ['h2','6 · Your acknowledgement'],
  ['p','By submitting a deletion request, users acknowledge and understand this Policy.']
  ]}/>;}

/* ---------------- Careers ---------------- */
function CareersPage(){
  useReveal();
  const roles=[
    ['Engineering','Mobile & platform engineers','React Native, NestJS, Postgres. You will own real surfaces end to end — booking, escrow, live trips — not tickets in a queue.'],
    ['Operations','City & driver operations','Onboard car owners, run the morning corridors, and turn what happens on the road into product. Lagos-based, on the ground.'],
    ['Trust & Safety','Safety investigators','Work the incident and dispute queue with GPS, chat and attendance evidence. Calm judgement under real stakes.'],
    ['Design','Product designer','One designer’s decisions reach every commuter. Systems thinking, a strong bar for craft, and comfort shipping weekly.']];
  return (<>
    <Header role="passenger"/>
    <main>
      <PageHero crumb="Careers" eyebrow="Careers" solo={true}
        title={<>Build the way Lagos <em>gets to work</em>.</>}
        lede="We are a small team solving a daily problem millions of people actually have. If you want your work in the hands of commuters this quarter — not this decade — this is the place."
        cta={[<a key="1" href="mailto:careers@conductor.ng" className="btn btn--primary btn--lg">See open roles<Icon name="arrow" size={18}/></a>,
              <a key="2" href="/about" className="btn btn--ghostline btn--lg">About the company</a>]}/>
      <section className="sec" style={{paddingTop:0}}><div className="wrap">
        <div className="vrow">
          {[['01','Ship weekly','Small team, short path from idea to production. What you build is live in days, not quarters.'],
            ['02','On the ground','We ride the corridors we build for. Product decisions start from the morning run, not a whiteboard.'],
            ['03','Own the outcome','You own a surface, its metrics, and the call on how to move them — with the context to make it well.'],
            ['04','Lagos-first','Built here, for here. The hard problems are ours to solve, and they are worth solving.']].map(([n,t,b],i)=>
            <Rv key={t} d={i*80} tag="div">
              <span className="vrow__n">{n}</span><h4>{t}</h4><p>{b}</p>
            </Rv>)}
        </div>
      </div></section>
      <section className="sec sec--cream"><div className="wrap">
        <SHead eyebrow="Where we’re hiring" title={<>Roles we are <em>usually</em> open to.</>}
          lede="Even when a role is not listed, we read every serious note. Tell us what you would own and why it fits."/>
        <div className="grid2" style={{gap:'clamp(18px,2vw,24px)'}}>
          {roles.map(([tag,t,b],i)=>
            <Rv key={t} d={i*70} cls="card" style={{padding:'clamp(22px,2.4vw,30px)',display:'grid',gap:8}}>
              <p className="eyebrow" style={{margin:0}}>{tag}</p>
              <h3 className="h3" style={{fontSize:'clamp(19px,1.8vw,23px)'}}>{t}</h3>
              <p style={{color:'var(--fg-2)',lineHeight:1.55,margin:0}}>{b}</p>
              <a className="linkarrow" href={'mailto:careers@conductor.ng?subject=' + encodeURIComponent(t)} style={{marginTop:8,display:'inline-flex'}}>Apply for this<Icon name="arrow" size={15}/></a>
            </Rv>)}
        </div>
        <Rv d={200} style={{marginTop:30}}>
          <p className="lede" style={{margin:0}}>Nothing quite fits? Write to <a href="mailto:careers@conductor.ng">careers@conductor.ng</a> — tell us what you would build.</p>
        </Rv>
      </div></section>
      <Band title={<>Come and build the <em>morning run</em>.</>}
        lede="Small team, real stakes, work that ships. Send a note and let’s talk."/>
    </main>
    <Footer/>
  </>);
}

/* ---------------- Press ---------------- */
function PressPage(){
  useReveal();
  const facts=[
    ['Founded','2024 · Lagos, Nigeria'],
    ['What it is','A carpooling scheduling platform — publish the journey you’re already making, or take a seat on one that is.'],
    ['Where','Lagos and other Nigerian corridors'],
    ['Apps','Passenger and Car Owner apps, iOS and Android'],
    ['Company','Conductor Technology International Services Limited']];
  return (<>
    <Header role="passenger"/>
    <main>
      <PageHero crumb="Press" eyebrow="Press" solo={true}
        title={<>Press & <em>media</em>.</>}
        lede="What Conductor is, in the words we’d use ourselves — plus the facts, the boilerplate, and where to reach a person. For interviews, data or brand assets, write to press@conductor.ng."
        cta={[<a key="1" href="mailto:press@conductor.ng" className="btn btn--primary btn--lg">Contact press<Icon name="arrow" size={18}/></a>,
              <a key="2" href="#facts" className="btn btn--ghostline btn--lg">The quick facts</a>]}/>
      <section className="sec" style={{paddingTop:0}} id="facts"><div className="wrap">
        <SHead eyebrow="At a glance" title={<>The <em>quick facts</em>.</>}/>
        <div className="prfacts">
          {facts.map(([k,v],i)=>
            <Rv key={k} d={i*60} cls="prfacts__row">
              <span className="prfacts__k">{k}</span>
              <span className="prfacts__v">{v}</span>
            </Rv>)}
        </div>
      </div></section>
      <section className="sec sec--cream"><div className="wrap wrap--tight">
        <SHead eyebrow="Boilerplate" title={<>About Conductor, <em>in short</em>.</>}/>
        <p className="lede" style={{marginTop:0}}>Conductor is a carpooling scheduling platform for Nigerian commuters. People already driving a route publish it; people who need that route book a seat on it; and the cost of the journey is split between everyone travelling in the car. Identity is verified on both sides, fares are held in escrow and released per trip, and safety tooling — live tracking, trip-sharing and SOS — ships with every journey. The goal is simple: fewer cars carrying more people, on the roads Lagos already drives every morning.</p>
        <p className="lede" style={{marginTop:18}}>Conductor is operated by Conductor Technology International Services Limited. For interviews, figures or brand assets, contact <a href="mailto:press@conductor.ng">press@conductor.ng</a>.</p>
      </div></section>
      <Band title={<>Writing about how a city <em>moves</em>?</>}
        lede="We’re happy to help with data, context and a real person to talk to. press@conductor.ng."/>
    </main>
    <Footer/>
  </>);
}



export { PaxHome, OwnerPage, HowItWorks, SafetyNew, FaresPage, Corridors, CorridorDetail, FAQPage, About, Calculator, Header, Footer, PrivacyPage, TermsPage, ConductPage, DeletePage, CareersPage, PressPage };
