# App-screen captures for /london

The `/london` walkthrough uses screenshots of the real passenger app (Expo web)
running against the local greenfield server with London trips seeded.

1. Greenfield: start Postgres + `bun run dev` in `apps/server`, then
   `bunx expo start --web --port 8081 --offline` in `apps/conductor`
   (driver app on 8082 is only needed for the API sign-in origin).
2. Temporarily re-anchor the pax app's Lagos fallbacks to London
   (`LAGOS_CENTER` in `app/find.tsx` + `app/find/list.tsx`, `biasLat/Lng` in
   `app/find/_SearchSheet.tsx`) — local only, revert after.
3. `node london-seed.js` — signs in the seeded driver/pax accounts and creates
   the London corridors + one approved booking.
4. Start this site (`next dev -p 3001`, it serves the avatar images), then
   `NODE_PATH=<website>/node_modules node london-cap.js` → writes
   `public/images/screens/uk/*.png`. The tidy pass converts ₦ to illustrative £
   (₦400 ≈ £1) and hides Google's web-only map chrome.
