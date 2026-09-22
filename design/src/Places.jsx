/* Lagos locations the fare estimator can answer instantly, without a
   round-trip. Search itself is nationwide via /api/places — this list just
   covers the areas people type most, so the common case costs nothing and
   never waits. Coords are approximate — enough for a haversine estimate and
   the 50 km coverage cap. */
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
  ['ikotun','Ikotun','Mainland',6.5450,3.2650],
  ['alimosho','Alimosho','Mainland',6.6050,3.2950],
  ['akowonjo','Akowonjo','Mainland',6.6050,3.3050],
  ['dopemu','Dopemu','Mainland',6.6150,3.3100],
  ['ipaja','Ipaja','Mainland',6.6130,3.2680],
  ['meiran','Meiran','Mainland',6.6600,3.2900],
  ['alagbado','Alagbado','Mainland',6.6800,3.2700],
  ['iju','Iju Ishaga','Mainland',6.6500,3.3200],
  ['ifako','Ifako','Mainland',6.6300,3.3300],
  ['magodo','Magodo','Mainland',6.6200,3.3700],
  ['omole','Omole','Mainland',6.6330,3.3620],
  ['shomolu','Shomolu','Mainland',6.5400,3.3830],
  ['ogudu','Ogudu','Mainland',6.5750,3.3950],
  ['alapere','Alapere','Mainland',6.5950,3.3980],
  ['ebute-metta','Ebute Metta','Mainland',6.4850,3.3850],
  ['lagos-island','Lagos Island','Island',6.4550,3.3950],
  ['ijesha','Ijesha','Mainland',6.4950,3.3300],
  ['orile','Orile','Mainland',6.4750,3.3400],
  ['mile2','Mile 2','Mainland',6.4650,3.3100],
  ['satellite','Satellite Town','Mainland',6.4600,3.2500],
  ['ojo','Ojo','Mainland',6.4600,3.1900],
  ['okokomaiko','Okokomaiko','Mainland',6.4700,3.1750],
  ['vgc','Victoria Garden City','Island',6.4600,3.5600],
  ['ibeju','Ibeju Lekki','Island',6.4400,3.8500],
  ['akute','Akute','Commuter belt',6.6700,3.3400],
  ['arepo','Arepo','Commuter belt',6.7000,3.3900],
  ['magboro','Magboro','Commuter belt',6.7200,3.4000],
  ['ibafo','Ibafo','Commuter belt',6.7500,3.4100],
  ['mowe','Mowe','Commuter belt',6.8100,3.4400],
  ['badagry','Badagry','Outskirts',6.4150,2.8880]
];

const ROAD_FACTOR=1.4;   // straight-line → road distance (matches app default)
const MAX_KM=50;         // coverage cap — routes beyond this aren't priced

/* Places resolved from the Google proxy during this session, held in the
   same [id,name,area,lat,lng] shape as the built-in list.

   Search is nationwide now, so the two ends of a route are no longer
   guaranteed to be in LAGOS_PLACES — but routeKm still has to find their
   coordinates. A picked result is registered here before onChange fires, so
   by the time anything asks for a distance the coordinates are in hand. */
const REMOTE_PLACES={};
const PLACE_BY_ID=Object.fromEntries(LAGOS_PLACES.map(p=>[p[0],p]));
function placeById(id){return PLACE_BY_ID[id]||REMOTE_PLACES[id]||null;}
function rememberPlace(p){REMOTE_PLACES[p[0]]=p;return p;}

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

/* Google Places, proxied through /api/places so the key stays on the server.

   The built-in list answers instantly on every keystroke and covers the
   areas most people type. Google fills in everything it cannot: streets,
   estates, bus stops, and every city outside Lagos. If the proxy has no key
   or is having a bad day it answers ok:false and the input degrades to
   list-only rather than showing the visitor a failure. */
const PLACES_ENDPOINT='/api/places';
let placesUsable=true;   // flipped off for the session once the proxy says no_key

/** Fresh token per search session — Google bills the keystrokes as one. */
function newSessionToken(){
  return 'cs-'+Math.random().toString(36).slice(2)+Date.now().toString(36);
}

async function remoteSearch(query,token,signal){
  if(!placesUsable) return [];
  try{
    const r=await fetch(PLACES_ENDPOINT+'?q='+encodeURIComponent(query)+'&token='+encodeURIComponent(token),{signal});
    const j=await r.json();
    if(!j.ok){
      // No key configured: stop asking for the rest of the session.
      if(j.reason==='no_key') placesUsable=false;
      return [];
    }
    return (j.places||[]).map(p=>[p.id,p.name,p.area,null,null]);
  }catch(err){
    return [];   // includes the abort when a newer keystroke supersedes this
  }
}

/** Resolve a prediction to coordinates and register it. Null if it fails. */
async function remoteDetails(id,token){
  try{
    const r=await fetch(PLACES_ENDPOINT+'?id='+encodeURIComponent(id)+'&token='+encodeURIComponent(token));
    const j=await r.json();
    if(!j.ok||!j.place) return null;
    const p=j.place;
    return rememberPlace([p.id,p.name,p.area,p.lat,p.lng]);
  }catch(err){return null}
}

/* Searchable place input — text field + dropdown, built-in list then Google. */
function PlaceSearch({value,onChange,label,placeholder,exclude,accent}){
  const [q,setQ]=React.useState('');
  const [open,setOpen]=React.useState(false);
  const [hi,setHi]=React.useState(0);
  const [remote,setRemote]=React.useState([]);
  const [busy,setBusy]=React.useState(false);
  const wrapRef=React.useRef(null);
  const tokenRef=React.useRef(null);
  if(tokenRef.current===null) tokenRef.current=newSessionToken();
  const sel=value?placeById(value):null;
  React.useEffect(()=>{
    const onDoc=e=>{if(wrapRef.current&&!wrapRef.current.contains(e.target))setOpen(false)};
    document.addEventListener('mousedown',onDoc);return()=>document.removeEventListener('mousedown',onDoc);
  },[]);

  const local=searchPlaces(open?q:'',exclude);

  /* Ask Google for what the built-in list could not answer.
     Debounced, so a typed word is one request rather than one per letter,
     and aborted when the next keystroke lands so a slow early reply cannot
     overwrite the results for what is now on screen. */
  React.useEffect(()=>{
    const term=q.trim();
    if(!open||term.length<3||!placesUsable){setRemote([]);setBusy(false);return}
    const ctl=new AbortController();
    setBusy(true);
    const t=setTimeout(async()=>{
      const found=await remoteSearch(term,tokenRef.current,ctl.signal);
      if(ctl.signal.aborted) return;
      setRemote(found);
      setBusy(false);
    },250);
    return()=>{clearTimeout(t);ctl.abort()};
  },[q,open]);

  /* Built-in first, then anything Google adds that is not already shown and
     is not the other end of the route — picking one place twice would price
     a zero-km trip. */
  const seenNames=new Set(local.map(p=>p[1].toLowerCase()));
  const matches=local.concat(
    remote.filter(p=>p[0]!==exclude&&!seenNames.has((p[1]||'').toLowerCase()))
  ).slice(0,8);
  const shown=sel&&!open?sel[1]:q;

  const choose=async p=>{
    setOpen(false);
    if(p[3]!=null){onChange(p[0]);setQ('');return}
    // A Google prediction carries no coordinates. Fetch them before handing
    // the id up, so the calculator never sees a place it cannot measure.
    setBusy(true);
    const full=await remoteDetails(p[0],tokenRef.current);
    setBusy(false);
    tokenRef.current=newSessionToken();   // that billing session is spent
    if(full){onChange(full[0]);setQ('')}
    else{setOpen(true)}                   // lookup failed — leave them on the list
  };

  const empty=open&&q.trim().length>=3&&matches.length===0;
  return React.createElement('div',{className:'field psearch',ref:wrapRef},
    React.createElement('label',null,label),
    React.createElement('div',{className:'psearch__in'},
      React.createElement(Icon,{name:'pin',size:16,color:accent||'var(--fg-3)'}),
      React.createElement('input',{type:'text',value:shown,placeholder:placeholder||'Search any address',
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
    empty&&busy&&React.createElement('div',{className:'psearch__none'},'Searching…'),
    empty&&!busy&&React.createElement('div',{className:'psearch__none'},
      'Nothing found for that. Try adding the town or city — "Allen Avenue, Ikeja".'));
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
Object.assign(window,{LAGOS_PLACES,ROAD_FACTOR,MAX_KM,placeById,rememberPlace,haversineKm,routeKm,searchPlaces,PlaceSearch,CORRIDORS});
