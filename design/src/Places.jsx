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
Object.assign(window,{LAGOS_PLACES,ROAD_FACTOR,MAX_KM,placeById,haversineKm,routeKm,searchPlaces,PlaceSearch,CORRIDORS});
