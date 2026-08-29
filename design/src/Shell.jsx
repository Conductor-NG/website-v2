const P={home:'Conductor Home.html',pass:'Conductor Home.html',own:'For Car Owners.html',how:'How It Works.html',about:'About.html',safety:'Safety.html',faq:'FAQ.html',corr:'Corridors.html',cdet:'Corridor Agege to Ikeja.html'};
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
  const grp=(logo,cap,webHref,ios,android)=>React.createElement('div',{key:cap,style:{display:'flex',flexDirection:'column',alignItems:'center',gap:14}},
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
        React.createElement('div',{style:{display:'flex',flexWrap:'wrap',gap:'clamp(24px,5vw,64px)',justifyContent:'center',marginTop:16}},
          mode==='owner'?[drvGrp]:mode==='passenger'?[paxGrp]:[paxGrp,drvGrp]))));
}

function Footer(){
  const C=[['Ride',[['Open the web app',LINKS.pWeb],['For passengers',P.home],['For car owners',P.own],['How it works',P.how],['Safety',P.safety]]],
    ['Answers',[['FAQ',P.faq],['Routes',P.corr],['Request a route',P.corr+'#request'],['Contact','mailto:support@conductor.ng']]],
    ['Company',[['About',P.about],['Communities',P.how+'#walk'],['Careers',P.careers],['Press',P.press]]],
    ['Legal',[['Privacy policy',P.privacy],['Terms of service',P.terms],['Code of conduct',P.conduct],['Delete your profile',P.del]]]];
  return React.createElement('footer',{className:'ftr'},
    React.createElement('div',{className:'wrap'},
      React.createElement('div',{className:'ftr__grid',style:{gridTemplateColumns:'1.4fr repeat(4,1fr)'}},
        React.createElement('div',{style:{display:'grid',gap:16,alignContent:'start',maxWidth:'30ch'}},
          React.createElement('a',{href:P.home,className:'mark','aria-label':'Conductor.ng home'},React.createElement('img',{src:'/images/logos/logo2.png',alt:'Conductor.ng',style:{height:74,width:'auto',display:'block'}})),
          React.createElement('p',{className:'small'},'A carpooling scheduling platform. Publish the journey you are already making, or take a seat on one that is already happening.'),
          React.createElement('p',{className:'small'},'8A Olayinka Balogun Crescent, Magodo Phase 2 · support@conductor.ng')),
        C.map(([t,ls])=>React.createElement('div',{key:t},React.createElement('h6',null,t),
          React.createElement('ul',null,ls.map(([l,h])=>React.createElement('li',{key:l},React.createElement('a',{href:h},l))))))),
      React.createElement('div',{className:'ftr__base'},
        React.createElement('span',null,'© 2026 Conductor Technology International Services Limited.'),
        React.createElement('span',null,'Every seat that travels full is one less car on the road.'))));
}
Object.assign(window,{P,NAVS,SWITCH,Header,Footer,Band,PageHero,SHead,VRow,Faq,RLine});
