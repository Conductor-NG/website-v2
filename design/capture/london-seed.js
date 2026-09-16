// Seed London commuter trips on the LOCAL greenfield server for the /london
// website walkthrough screenshots. Talks to the API directly (better-auth
// email sign-in → session cookie) — no Expo web needed for seeding.
const API = "http://localhost:3000";
const WEEK = "2026-09-14"; // Monday
const VEHICLE_ID = 118; // Emeka's Honda Civic

async function signIn(email, origin) {
  const r = await fetch(API + "/api/auth/sign-in/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify({ email, password: "Password123!" }),
  });
  if (!r.ok) throw new Error("sign-in " + email + " " + r.status);
  const set = r.headers.getSetCookie ? r.headers.getSetCookie() : [r.headers.get("set-cookie")];
  const cookie = set.map((c) => c.split(";")[0]).join("; ");
  return { cookie, origin };
}
async function api(s, method, path, body) {
  const r = await fetch(API + path, {
    method,
    headers: { "Content-Type": "application/json", Cookie: s.cookie, Origin: s.origin },
    body: body ? JSON.stringify(body) : undefined,
  });
  let json = null, text = null;
  try { json = await r.clone().json(); } catch { try { text = await r.text(); } catch {} }
  return { status: r.status, json, text };
}
const L = (landmark, locality, lat, lng, street) => ({
  landmark, locality, city: "London", state: "Greater London", street, latitude: lat, longitude: lng,
});
// Real London commuter corridors. Pickups spread across the map so the
// /find screen shows a believable spread of cars.
const TRIPS = [
  { p: L("Clapham Common Station", "Clapham", 51.4618, -0.1384, "Clapham High St"), d: L("Canary Wharf, One Canada Square", "Isle of Dogs", 51.5049, -0.0195), km: 12.6, min: 48, t: "07:10", desc: "Clapham to Canary Wharf, Monday to Friday" },
  { p: L("Walthamstow Central", "Walthamstow", 51.5830, -0.0200, "Hoe St"), d: L("King's Cross St Pancras", "King's Cross", 51.5308, -0.1238), km: 10.2, min: 40, t: "07:20", desc: "Walthamstow to King's Cross" },
  { p: L("East Croydon Station", "Croydon", 51.3754, -0.0928, "George St"), d: L("London Bridge Station", "Southwark", 51.5050, -0.0864), km: 16.4, min: 58, t: "06:50", desc: "East Croydon to London Bridge" },
  { p: L("Ealing Broadway", "Ealing", 51.5148, -0.3016, "The Broadway"), d: L("Paddington Station", "Paddington", 51.5167, -0.1769), km: 9.4, min: 36, t: "07:30", desc: "Ealing to Paddington" },
  { p: L("Stratford, Westfield", "Stratford", 51.5434, -0.0069, "Montfichet Rd"), d: L("Liverpool Street Station", "City of London", 51.5179, -0.0823), km: 7.1, min: 30, t: "07:40", desc: "Stratford to Liverpool Street" },
  { p: L("Brixton Station", "Brixton", 51.4627, -0.1145, "Brixton Rd"), d: L("Victoria Station", "Westminster", 51.4952, -0.1441), km: 6.3, min: 28, t: "07:15", desc: "Brixton to Victoria" },
  { p: L("Wood Green", "Wood Green", 51.5975, -0.1097, "High Rd"), d: L("Old Street Roundabout", "Shoreditch", 51.5257, -0.0875), km: 9.8, min: 38, t: "07:05", desc: "Wood Green to Old Street" },
  { p: L("Canary Wharf, One Canada Square", "Isle of Dogs", 51.5049, -0.0195), d: L("Clapham Common Station", "Clapham", 51.4618, -0.1384), km: 12.6, min: 52, t: "17:45", desc: "Canary Wharf back to Clapham, evenings" },
];
(async () => {
  const drv = await signIn("emeka.okafor@gmail.com", "http://localhost:8082");
  const pax = await signIn("amarachi.eze@gmail.com", "http://localhost:8081");
  console.log("signed in both");
  const made = [];
  for (const t of TRIPS) {
    const body = {
      vehicleId: VEHICLE_ID, pickup: t.p, destination: t.d, distanceKm: t.km, estimatedDurationMin: t.min,
      daysOfWeek: [1, 2, 3, 4, 5], weekStartDate: WEEK, pickupTime: t.t, closedSeats: [], description: t.desc,
    };
    const r = await api(drv, "POST", "/api/trips", body);
    const id = r.json && (r.json.id || (r.json.trip && r.json.trip.id));
    console.log("create", t.p.landmark, "->", t.d.landmark, r.status, "id", id, id ? "" : JSON.stringify(r.json || r.text).slice(0, 200));
    if (!id) continue;
    const pr = await api(drv, "POST", `/api/trips/${id}/publish`, {});
    console.log("  publish", pr.status, pr.status >= 400 ? JSON.stringify(pr.json || pr.text).slice(0, 200) : "");
    made.push({ id, ...t });
  }
  // Pax requests a seat on the Clapham → Canary Wharf trip; driver accepts.
  const hero = made[0];
  if (hero) {
    let r = await api(pax, "POST", "/api/bookings", { tripId: hero.id, daysPattern: [1, 2, 3, 4, 5], seatPosition: "BACK_LEFT", note: "I'll be at the station entrance" });
    const bookingId = r.json && (r.json.bookingId || r.json.id);
    console.log("request seat", r.status, "bookingId", bookingId, bookingId ? "" : JSON.stringify(r.json || r.text).slice(0, 200));
    if (bookingId) {
      r = await api(drv, "POST", `/api/bookings/${bookingId}/accept`, {});
      console.log("accept", r.status, r.status >= 400 ? JSON.stringify(r.json || r.text).slice(0, 200) : "");
    }
    console.log("RESULT heroTripId=" + hero.id + " bookingId=" + bookingId);
  }
  console.log("trip ids:", made.map((m) => m.id).join(","));
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
