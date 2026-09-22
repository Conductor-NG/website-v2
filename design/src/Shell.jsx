const P={home:'/',pass:'/',own:'/car-owners',how:'/how-it-works',about:'/about',safety:'/safety',faq:'/faq',corr:'/corridors',cdet:'/corridors/agege-ikeja',fares:'/fares',privacy:'/legal/privacy',terms:'/legal/terms',conduct:'/legal/code-of-conduct',paxpol:'/legal/passenger-policy',ownpol:'/legal/car-owner-policy',refund:'/legal/privacy#refund',del:'/delete-profile',careers:'/careers',press:'/press',contact:'/contact'};
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
    ['Legal',[['Privacy policy',P.privacy],['Terms of service',P.terms],['Passenger policy',P.paxpol],['Car owner policy',P.ownpol],['Refund policy',P.refund],['Code of conduct',P.conduct],['Delete your profile',P.del]]]];
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
Object.assign(window,{P,NAVS,SWITCH,Header,Footer,Band,PageHero,SHead,VRow,Faq,RLine});
