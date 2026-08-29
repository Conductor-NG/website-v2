const CITIES={
  lagos:{
    label:'Mainland ↔ Island',
    pickups:[['6','Abule Egba Bus Stop','Abule Egba'],['7','Super Bus Stop','Abule Egba'],['8','U-Turn Bus Stop','Abule Egba'],['9','Ahmadiyya Bus Stop','Abule Egba'],['10','Pleasure Bus Stop','Abule Egba'],['11','Ikorodu Garage','Ikorodu'],['12','Agric Bus Stop','Ikorodu'],['13','Ogolonto Bus Stop','Ikorodu'],['14','Sabo Market','Ikorodu'],['15','Benson Bus Stop','Ikorodu'],['16','Majidun Bus Stop','Ikorodu'],['17','Ajah Under Bridge','Ajah'],['18','Abraham Adesanya Roundabout','Ajah'],['19','Sangotedo, Novare Mall','Ajah'],['20','VGC Bus Stop','Lekki-Ajah'],['21','Ilaje Bus Stop','Ajah'],['22','Business School Roundabout','Ajah']],
    dests:[['101','CMS Bus Stop','Island'],['102','Obalende Bus Stop','Island'],['103','Marina Bus Stop','Island'],['104','Tafawa Balewa Square','Island'],['105','Sandgrouse Market','Island'],['106','Broad Street','Island'],['107','Outer Marina','Island'],['108','Simpson Bus Stop','Island'],['109','Idumota','Island'],['110','Sura Bus Stop','Island'],['111','Adetokunbo Ademola','Victoria Island'],['112','Maroko, Sandfill','VI / Lekki'],['113','Falomo Roundabout','Ikoyi'],['114','Admiralty Gate','Lekki Phase 1']],
    km:{6:[29,30.2,29.3,29.8,30.5,29.5,29.4,30.3,30.5,30.8,32.5,33.8,31,35.2],7:[27.5,28.7,27.8,28.3,29,28,27.9,28.8,29,29.3,31,32.3,29.5,33.7],8:[29.8,31,30.1,30.6,31.3,30.3,30.2,31.1,31.3,31.6,33.3,34.6,31.8,36],9:[31.6,32.8,31.9,32.4,33.1,32.1,32,32.9,33.1,33.4,35.1,36.4,33.6,37.8],10:[25.5,26.7,25.8,26.3,27,26,25.9,26.8,27,27.3,29,30.3,27.5,31.7],11:[36,37.2,36.3,36.8,37.5,36.5,36.4,37.3,37.5,37.8,39.5,40.8,37,42.2],12:[35,36.2,35.3,35.8,36.5,35.5,35.4,36.3,36.5,36.8,38.5,39.8,36,41.2],13:[32.5,33.7,32.8,33.3,34,33,32.9,33.8,34,34.3,36,37.3,33.5,38.7],14:[36.5,37.7,36.8,37.3,38,37,36.9,37.8,38,38.3,40,41.3,37.5,42.7],15:[35.8,37,36.1,36.6,37.3,36.3,36.2,37.1,37.3,37.6,39.3,40.6,36.8,42],16:[30.3,31.5,30.6,31.1,31.8,30.8,30.7,31.6,31.8,32.1,33.8,35.1,31.3,36.5],17:[24.5,25.7,24.8,25.3,26,25,24.9,25.8,26,26.3,18,16,20,14],18:[29,30.2,29.3,29.8,30.5,29.5,29.4,30.3,30.5,30.8,22.5,20.5,24.5,18.5],19:[38.7,39.9,39,39.5,40.2,39.2,39.1,40,40.2,40.5,32.2,30.2,34.2,28.2],20:[20.5,21.7,20.8,21.3,22,21,20.9,21.8,22,22.3,14,12,16,10],21:[23,24.2,23.3,23.8,24.5,23.5,23.4,24.3,24.5,24.8,16.5,14.5,18.5,12.5],22:[32,33.2,32.3,32.8,33.5,32.5,32.4,33.3,33.5,33.8,25.5,23.5,27.5,21.5]},
    popular:[['6','101'],['11','103'],['17','111']]
  },
  abuja:{
    label:'Suburbs ↔ Central',
    pickups:[['30','Kubwa NNPC Junction','Kubwa'],['31','Kubwa FHA','Kubwa'],['32','Lugbe FHA','Lugbe'],['33','Berger Junction','Lugbe'],['34','Gwarimpa 1st Avenue','Gwarimpa'],['35','Gwarimpa 3rd Avenue','Gwarimpa']],
    dests:[['201','Federal Secretariat','Central Business District'],['202','NNPC Towers','Central Business District'],['203','Wuse Market','Wuse Zone 5'],['204','Aminu Kano Crescent','Wuse II']],
    km:{30:[28.5,27.2,25,23.5],31:[26,24.5,22.5,21],32:[20.5,18.5,19,22],33:[23,21,21.5,24.5],34:[16.5,15,13.5,11.5],35:[18,16.5,15,13]},
    popular:[['34','203'],['32','201'],['30','204']]
  }
};
const place=(city,id)=>{const c=CITIES[city];const r=c.pickups.concat(c.dests).find(x=>x[0]===id);return r?{name:r[1],area:r[2]}:null};
const shortName=(city,id)=>{const p=place(city,id);return p?(p.area==='Island'||p.area==='Central Business District'?p.name.replace(' Bus Stop',''):p.area):id};
function distance(city,from,to){
  const c=CITIES[city],row=c.km[from];if(!row)return null;
  const i=c.dests.findIndex(d=>d[0]===to);return i<0?null:row[i];
}
/* Fares are never stored here. The app's pricing service is the only source.
   Set QUOTE_ENDPOINT once it exists: it should accept from/to/seats and return { amount, currency }. */
const QUOTE_ENDPOINT=null;
async function fetchQuote({city,from,to,seats}){
  if(!QUOTE_ENDPOINT)return{state:'unwired'};
  try{
    const r=await fetch(`${QUOTE_ENDPOINT}?city=${city}&from=${from}&to=${to}&seats=${seats}`);
    if(!r.ok)return{state:'error'};
    const d=await r.json();
    return typeof d.amount==='number'?{state:'ok',amount:d.amount}:{state:'error'};
  }catch(e){return{state:'error'}}
}
Object.assign(window,{CITIES,distance,place,shortName,fetchQuote,QUOTE_ENDPOINT});
