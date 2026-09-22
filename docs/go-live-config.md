# Conductor website — go-live configuration

Two things are **built and deployed in code** but need someone to flip switches / add
keys before they actually work in production. Nothing here is a code change — it's all
dashboard + environment-variable setup.

All environment variables below go in **Vercel → the `website-v2` project → Settings →
Environment Variables** (set them for **Production**, and Preview if you want them there
too), then **redeploy** (or trigger a new deploy) so they take effect.

---

## 1. Contact form + newsletter delivery  ⚠️ highest priority

The contact form (`/contact`) and the newsletter signup are fully built and live, but
**right now they don't deliver anywhere** — a visitor who submits gets an error
("Messaging isn't configured yet"). This is our main lead-capture, so it should be fixed
first. Pick **one** of the two options below.

### Option A — Email via Resend (recommended)
Submissions get emailed to the support inbox.

1. Create an account at **https://resend.com** (free tier is plenty for this volume).
2. **Add and verify the `conductor.ng` domain** in Resend (Resend → Domains → Add Domain).
   Resend gives you a few **DNS records** (SPF/DKIM/`MX`-style `TXT`/`CNAME`) — add those
   to the `conductor.ng` DNS. Verification usually completes within minutes to a few hours.
3. Create an **API key** (Resend → API Keys).
4. Set these environment variables in Vercel:

   | Variable | Value | Notes |
   |----------|-------|-------|
   | `RESEND_API_KEY` | `re_...` (the key) | **required** to enable email |
   | `CONTACT_TO_EMAIL` | `support@conductor.ng` | where messages land (defaults to this if unset) |
   | `CONTACT_FROM_EMAIL` | `Conductor site <noreply@conductor.ng>` | **must** be on the Resend-verified domain |
   | `RESEND_AUDIENCE_ID` | *(optional)* a Resend Audience id | newsletter signups get added to this list; if unset, each signup is emailed to `CONTACT_TO_EMAIL` instead |

5. Redeploy. Submit a test message from `/contact` and confirm it arrives.

### Option B — Send to a webhook / Google Sheet (no email account needed)
If you'd rather have submissions land in a spreadsheet (or Zapier/Make/Slack/etc.) instead
of email, set a single webhook URL and the form will POST each submission there as JSON.

1. Easiest sheet route: create a **Google Sheet** → Extensions → **Apps Script** → paste a
   small `doPost(e)` script that appends `JSON.parse(e.postData.contents)` as a row →
   **Deploy → Web app** (Execute as: me, Who has access: Anyone) → copy the web-app URL.
2. Set in Vercel:

   | Variable | Value |
   |----------|-------|
   | `CONTACT_WEBHOOK_URL` | the Apps Script / Zapier / Make / Slack webhook URL |

3. Redeploy and submit a test.

> You can set **both** — the form succeeds as long as at least one channel (Resend **or**
> webhook) is configured, and it sends to every channel that is.

---

## 2. Analytics, performance & ad pixels

All of these are wired in code and **turn on automatically once configured** — no code
changes needed. Anything left unset simply stays off (loads nothing).

### 2a. Vercel Analytics + Speed Insights — **dashboard toggles, no keys**
- Vercel → `website-v2` project → **Analytics** tab → **Enable Web Analytics**.
- Vercel → **Speed Insights** tab → **Enable Speed Insights**.

That's it — the code already renders both components; enabling them in the dashboard starts
collecting visitor analytics and real-user Core Web Vitals.

### 2b. Environment-variable trackers
Set whichever you use:

| Variable | What it enables | Where to get it |
|----------|-----------------|-----------------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 | GA4 admin → Data Streams → Measurement ID (`G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta (Facebook/Instagram) Pixel | Meta Events Manager → your Pixel → the numeric ID |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | TikTok Pixel | TikTok Ads Manager → Assets → Events → your pixel ID |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console verification | Search Console → the `content=""` value of the verification meta tag (meta-tag method) |
| `NEXT_PUBLIC_SITE_URL` | canonical URL for metadata/OG | `https://conductor.ng` |

> `NEXT_PUBLIC_*` variables are exposed to the browser (that's expected — pixel/GA IDs are
> public by design). The Resend key and webhook URL are **server-only** — never prefix those
> with `NEXT_PUBLIC_`.

**Conversion events** are already wired: once the Meta/TikTok pixel IDs are set, key actions
— "Open the web app", "Download the app", and the fare calculator's "Estimated cost" —
automatically fire standard conversion events (`Lead` / `Download` / `ViewContent`) so ad
campaigns can optimise toward people who actually convert.

---

## 3. Live chat (tawk.to) → ClickUp tickets

The chat widget and the ClickUp bridge are both built. The widget stays invisible
until `NEXT_PUBLIC_TAWK_PROPERTY_ID` is set, and the webhook accepts-and-drops until
the ClickUp variables are set — so a half-finished setup breaks nothing.

**How it works:** a visitor opens the chat and asks a question → tawk.to POSTs to
`https://conductor.ng/api/tawk` → a task is created in the **Support Inbox** list
(Chat Support space) with the question,
the visitor's name/email/city and the page they were on, assigned to whoever
`CLICKUP_ASSIGNEE_IDS` names. When the chat ends, the full transcript is appended to
that same task as a comment. Offline messages ("Ticket Create" in tawk) file the same
way. **Agents still reply inside tawk.to** — the ClickUp task is the record and the
follow-up, not the conversation.

### 3a. tawk.to setup
1. Create the property at **https://tawk.to** (free) for `conductor.ng`.
2. **Administration → Chat Widget** → copy the widget URL. It looks like
   `https://embed.tawk.to/68xxxxxxxxxxxxxx/1hxxxxxxx` — the first half is the
   **property ID**, the second the **widget ID**.
3. **Administration → Settings → Webhooks** → add a webhook:
   - URL: `https://conductor.ng/api/tawk`
   - Events: **Chat Start**, **Ticket Create**, **Chat Transcript Created**
   - Copy the **secret key** it generates.

> The webhook only works against the deployed site — tawk.to can't reach `localhost`,
> so test it on `conductor.ng` after deploying.

### 3b. ClickUp setup
1. ClickUp → avatar → **Settings → Apps → API Token** → generate a personal token (`pk_...`).
2. Decide who tickets go to and get their **numeric user IDs** (not emails) — the
   ClickUp API returns them, or ask whoever set up the workspace.

### 3c. Environment variables

| Variable | Value | Notes |
|----------|-------|-------|
| `NEXT_PUBLIC_TAWK_PROPERTY_ID` | first half of the embed URL | **required** — blank means no widget at all |
| `NEXT_PUBLIC_TAWK_WIDGET_ID` | second half of the embed URL | defaults to `default` |
| `TAWK_WEBHOOK_SECRET` | the webhook secret key | **server-only.** Every request is HMAC-verified; a wrong value rejects everything with a 401 |
| `CLICKUP_API_TOKEN` | `pk_...` | server-only |
| `CLICKUP_SUPPORT_LIST_ID` | the list id | last path segment of the Support Inbox list's ClickUp URL |
| `CLICKUP_ASSIGNEE_IDS` | user ids | who owns the ticket — gets the "assigned to you" notification; blank files tickets unassigned |
| `CLICKUP_WATCHER_IDS` | user ids | who follows it without owning it; optional |
| `KV_REST_API_URL` + `KV_REST_API_TOKEN` | *(optional)* Upstash / Vercel KV | **recommended** — see below |

Without the KV pair the integration still files every ticket; you just lose two things:
the **full transcript** appended when a chat ends, and **duplicate protection** if tawk
retries a delivery. The investor deck already uses these same credentials, so if KV is
connected for that, this picks it up automatically.

### 3d. Test it
1. Deploy, then open `conductor.ng` and send yourself a message in the chat bubble.
2. A task should appear in **Support Inbox** within a few seconds.
3. If nothing shows: tawk.to → Webhooks shows the delivery status and response code.
   `401` = wrong `TAWK_WEBHOOK_SECRET`. `502` = ClickUp rejected it (bad token or list ID).
   `200 {"skipped":"not configured"}` = the environment variables aren't set on the deployment.

---

## 4. Fare-calculator place search (Google Places)

The calculator on `/fares` and the home page prices a route from two searched
points. Without a key it searches a built-in list of ~80 Lagos areas, so
anyone who types their street gets nothing back. With a key it searches
streets, estates, bus stops and every city in Nigeria.

The site keeps working either way — with no key the input silently falls back
to the built-in list.

### 4a. Which key

It must be a **server** key. Not `EXPO_PUBLIC_MAPS_BROWSER_KEY` (browser keys
are referrer-restricted and already public), and **not a Map ID** —
`EXPO_PUBLIC_MAPS_MAP_ID` identifies a cloud-based *map style*, carries no
credentials and cannot authenticate anything.

The Conductor server's own `GOOGLE_MAPS_SERVER_KEY` works and is already
proven against these exact endpoints (see
`apps/server/src/maps/maps.service.ts` in conductor-greenfield). This route
accepts it under that name, so it can be pasted in as-is.

A dedicated key for the website is still better: it keeps this site's quota
and blast radius separate, so a marketing-site incident never forces rotating
a key the app depends on. To mint one:

1. <https://console.cloud.google.com/> → the same project as the app
   (`conductor-ng-dev`), so billing and enabled APIs carry over.
2. **APIs & Services → Library** → enable **Places API (New)**. Enable the
   legacy **Places API** as well if it is offered — the route tries New
   first and falls back, so either one alone is enough, but projects created
   after early 2025 can only enable New.
3. **APIs & Services → Credentials → Create credentials → API key**.
4. **Restrict it:**
   - *Application restrictions:* **IP addresses**, not HTTP referrers. The
     calls come from the server, so there is no referrer to match — referrer
     restrictions would block every call. If you cannot pin Vercel's egress
     IPs, leave this as None.
   - *API restrictions:* **Restrict key → Places API (New)** (+ Places API).
5. **Billing** must be enabled on the project. Set a budget alert — Places is
   billed per request.

> If you reuse `GOOGLE_MAPS_SERVER_KEY`, check its *Application restrictions*
> first. It was provisioned for Cloud Run; if it has since been IP-restricted
> to Cloud Run's egress, calls from Vercel are rejected and you will see
> `REQUEST_DENIED` in the logs.

### 4b. Set it on Vercel

Vercel → the website project → **Settings → Environment Variables**:

| Variable | Value | Environments |
| --- | --- | --- |
| `GOOGLE_PLACES_API_KEY` | the key from 4a | Production, Preview, Development |

`GOOGLE_MAPS_SERVER_KEY` is accepted as a fallback name, so the app's existing
server key can be set under the name it already has. If both are present,
`GOOGLE_PLACES_API_KEY` wins.

There is **no `NEXT_PUBLIC_` prefix** on purpose. A `NEXT_PUBLIC_` key is
compiled into the page and anyone can read it out of the HTML and spend the
quota. This one is read only by `/api/places` on the server.

Then **Deployments → ⋯ → Redeploy**. Environment variables are baked in at
build time; an existing deployment will not pick it up.

### 4c. Test it

    curl "https://conductor.ng/api/places?q=allen%20avenue&token=test"

- `{"ok":true,"places":[...]}` — working.
- `{"ok":false,"reason":"no_key"}` — the variable isn't on that deployment,
  or it hasn't been redeployed since.
- `{"ok":false,"reason":"upstream"}` — Google rejected it. The real reason is
  in the Vercel function logs; usually the Places API isn't enabled, billing
  is off, or the key has referrer/IP restrictions that exclude Vercel.

Two log lines matter, and they mean different things:

- `[places] New autocomplete 403: …` — Places API (New) refused, and the
  route fell back to the legacy API for 5 minutes. If the legacy call then
  succeeded the visitor saw results and nothing is broken, but enabling
  Places API (New) on the key removes a wasted call per search.
- `[places] REQUEST_DENIED: …` — the legacy API refused too. Nothing is
  working; the key is wrong, restricted, or has neither API enabled.

### 4d. What it costs

Two things keep the bill down:

- **Session tokens.** Keystrokes are grouped into one autocomplete session,
  and coordinates are fetched only for the result actually picked — one
  Details call per completed search, not one per letter.
- **Caching.** Repeated queries are answered from an in-process cache for 10
  minutes, so the same few dozen area names aren't billed over and over.
- **Field masks.** Both APIs are asked for only the fields the calculator
  uses, which keeps each call in a cheaper billing tier.

Routes over 50 km still aren't priced — Conductor is a daily-commute product.
Search reaches the whole country; the estimate covers a commute.

---

## Quick checklist
- [ ] Resend: domain verified + `RESEND_API_KEY` (+ `CONTACT_*`) set  — **or** `CONTACT_WEBHOOK_URL` set
- [ ] Vercel Analytics enabled (dashboard)
- [ ] Vercel Speed Insights enabled (dashboard)
- [ ] `NEXT_PUBLIC_GA_ID` set
- [ ] `NEXT_PUBLIC_META_PIXEL_ID` set
- [ ] `NEXT_PUBLIC_TIKTOK_PIXEL_ID` set
- [ ] `GOOGLE_SITE_VERIFICATION` set (if verifying Search Console by meta tag)
- [ ] `NEXT_PUBLIC_SITE_URL=https://conductor.ng` set
- [ ] Redeployed after setting variables
- [ ] Sent a test contact-form message and confirmed it arrived
- [ ] tawk.to property created, `NEXT_PUBLIC_TAWK_PROPERTY_ID` + `NEXT_PUBLIC_TAWK_WIDGET_ID` set
- [ ] tawk.to webhook pointed at `https://conductor.ng/api/tawk` (Chat Start, Ticket Create, Chat Transcript Created) + `TAWK_WEBHOOK_SECRET` set
- [ ] `CLICKUP_API_TOKEN`, `CLICKUP_SUPPORT_LIST_ID`, `CLICKUP_ASSIGNEE_IDS` set
- [ ] Sent a test chat message and confirmed the ClickUp ticket appeared
- [ ] Places API enabled + `GOOGLE_PLACES_API_KEY` set (server-side, no `NEXT_PUBLIC_`), redeployed, and `/api/places?q=allen%20avenue` returns results
