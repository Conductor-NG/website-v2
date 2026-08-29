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
Object.assign(window,{Film,FILMS,Clips});
