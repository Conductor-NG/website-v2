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
| `CLICKUP_ASSIGNEE_IDS` | user ids | comma-separated numeric ClickUp user ids (`GET /api/v2/team`); blank files tickets unassigned |
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
