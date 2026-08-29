const fs = require("fs");
const dir = "design/src";
// [file, exactFind, replaceWith]
const edits = [
  // About
  ["About.jsx",
    "['0%','commission on a seat fare','Money moves between commuters. We do not take a cut of the journey itself.'],",
    "['Escrow','holds every fare','Money moves between commuters — held safely until each trip runs, then released to the car owner.'],"],
  ["About.jsx",
    "'You set the seat price; we take no commission from it',",
    "'The app prices each seat for the route; the fare goes to the car owner',"],
  ["About.jsx",
    "A free platform with no stated business model is a fair thing to be suspicious of, so: we take no commission from a seat fare. That money moves between commuters. Conductor earns through a service charge on the car owner side, which falls as a car owner completes more trips — the more you share, the less it costs you to share. Passengers pay no service fee at all.",
    "A free platform with no stated business model is a fair thing to be suspicious of, so here is ours plainly: the ride fare moves between commuters, and Conductor earns through a service charge built into it — one that falls as a car owner completes more trips. The more you share, the less it costs to share."],
  // Calculator
  ["Calculator.jsx",
    "'Fare agreed up front. No surge, no service fee.'",
    "'Fare agreed up front, locked at booking. No surge.'"],
  // FAQ
  ["FAQ.jsx",
    "Passengers pay no service fee — only the seat fare.']]},",
    "Everything up to booking a seat is free.']]},"],
  ["FAQ.jsx",
    "['What does Conductor take?','No commission on the seat fare. We earn through a service charge on the car owner side, and that charge falls as you complete more trips — the more you share, the less it costs you to share.'],",
    "['What does Conductor take?','Conductor earns through a service charge built into the fare, and it falls as you complete more trips — the more you share, the less it costs you to share.'],"],
  ["FAQ.jsx",
    "The car owner sets the per-seat price when publishing.'],",
    "The app prices each seat for the route when a trip is published.'],"],
  // Owner
  ["Owner.jsx",
    "Your share is released once your own journey is complete — no commission taken. Withdraw whenever you like.",
    "Your share is released once your own journey is complete. Withdraw whenever you like."],
  ["Owner.jsx",
    "Your service charge falls as you complete more trips. Consistent weekday sharing is rewarded rather than one-off journeys — so the arrangement gets better the longer you keep it up. We take no commission from the seat fare itself, ever.",
    "Your service charge falls as you complete more trips. Consistent weekday sharing is rewarded rather than one-off journeys — so the arrangement gets better the longer you keep it up."],
  ["Owner.jsx",
    "'No commission on the seat fare — you set it, you receive it'",
    "'The app prices each seat for your route'"],
  ["Owner.jsx",
    "'You set the seat price yourself; the app only suggests a range'",
    "'The app prices each seat for the route you drive'"],
  // Quote
  ["Quote.jsx",
    "['You set the seat price when you publish','You choose which passengers ride with you','Conductor takes no commission']",
    "['The app prices each seat for your route','You choose which passengers ride with you','Your share is released after each trip']"],
  // HowItWorks
  ["HowItWorks.jsx",
    "The car owner sets the seat price when publishing, and it never moves afterwards.",
    "The app prices each seat for the route, and it locks at booking — it never moves afterwards."],
  // AppScreens (create-trip screen)
  ["AppScreens.jsx",
    "'You set the price. Suggested ₦1,200–1,400.'",
    "'Priced for this route · ₦1,200 a seat'"],
];
let ok = 0, miss = 0;
for (const [file, find, repl] of edits) {
  const p = `${dir}/${file}`;
  const src = fs.readFileSync(p, "utf8");
  if (!src.includes(find)) { console.log("MISS", file, "::", find.slice(0, 46)); miss++; continue; }
  fs.writeFileSync(p, src.split(find).join(repl));
  ok++;
}
console.log(`applied ${ok} · missed ${miss}`);
