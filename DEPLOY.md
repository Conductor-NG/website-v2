# Deploying the marketing site

Two targets build from this one codebase:

- **Vercel** — builds `main` on every push (and opens preview deploys for PRs).
- **Cloud Run** — the container flow below, same shape as the greenfield app.

Either can serve the site on its own. Keep both green: a change that only gets
tested on one of them can still break the other (see *Build output modes*).

## What runs where
- **Static pages + SSR + API routes** → one Next.js server. On Cloud Run that's a
  standalone build in a container; on Vercel it's Vercel's own build output.
- **Analytics** → **GA4** (client script → Google). Reuse your existing GA4 property so history carries over. Optional **Search Console** verification.
- **Contact form + newsletter** → the site's own `/api/contact` and `/api/subscribe` routes → **Resend** (email). No database needed for v1.

## Build output modes
`next.config.mjs` sets `output` conditionally:

```js
output: process.env.VERCEL ? undefined : "standalone",
```

- **Container builds** (no `VERCEL` env) emit `.next/standalone` — what the
  Dockerfile copies and `node server.js` runs.
- **Vercel builds** (`VERCEL=1`, set automatically) must leave `output` unset.
  Next 16 runs Vercel's build adapter *before* the standalone step, and the
  standalone step then reads a build trace (`.next/next-server.js.nft.json`)
  that Vercel's build never writes — so a hard-coded `output: "standalone"`
  fails the Vercel build with `ENOENT` *after* it otherwise reports success.

Don't hard-code `output: "standalone"` back in.

## Vercel
No config file is needed — Vercel detects Next.js and runs `npm run build`
against `package-lock.json`. Set these in **Project → Settings → Environment
Variables** (the same values as the Cloud Run env table below):

| Var | Notes |
|---|---|
| `NEXT_PUBLIC_GA_ID` | GA4 Measurement ID — inlined at build time, so a change needs a redeploy |
| `RESEND_API_KEY` | contact form + newsletter email |
| `CONTACT_TO_EMAIL` | where messages land |
| `CONTACT_FROM_EMAIL` | must be a Resend-verified sender |
| `RESEND_AUDIENCE_ID` | optional newsletter list |
| `GOOGLE_SITE_VERIFICATION` | optional Search Console token |

Lockfiles: `package-lock.json` is what Vercel installs from. `bun.lock` exists
for the documented local `bun` workflow — update both when you change
dependencies, or the two paths drift onto different versions.

## Cloud Run — one-time setup
```bash
# 1. Artifact Registry repo for the image
gcloud artifacts repositories create web \
  --repository-format=docker --location=us-east1

# 2. Resend: sign up at resend.com, verify the conductor.ng domain (DNS),
#    then store the API key in Secret Manager
printf '%s' 're_your_key' | gcloud secrets create RESEND_API_KEY --data-file=-

# 3. Let Cloud Run read that secret
PROJECT_NUMBER=$(gcloud projects describe "$(gcloud config get-value project)" --format='value(projectNumber)')
gcloud secrets add-iam-policy-binding RESEND_API_KEY \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role=roles/secretmanager.secretAccessor
```

## Cloud Run — deploy (every release)
```bash
gcloud builds submit --substitutions=_GA_ID=G-XXXXXXXXXX
```
That builds the image (baking in your GA4 id), pushes it, and deploys to Cloud Run. It prints the live `*.run.app` URL.

> Prefer to build locally instead of Cloud Build?
> ```bash
> docker build --build-arg NEXT_PUBLIC_GA_ID=G-XXXX -t us-east1-docker.pkg.dev/PROJECT/web/conductor-website:latest .
> docker push us-east1-docker.pkg.dev/PROJECT/web/conductor-website:latest
> gcloud run deploy conductor-website --image us-east1-docker.pkg.dev/PROJECT/web/conductor-website:latest \
>   --region us-east1 --allow-unauthenticated \
>   --set-secrets RESEND_API_KEY=RESEND_API_KEY:latest \
>   --set-env-vars 'CONTACT_TO_EMAIL=support@conductor.ng,CONTACT_FROM_EMAIL=Conductor site <noreply@conductor.ng>'
> ```

## Go live
1. Map the domain — on **Vercel**: Project → Settings → Domains → add `conductor.ng`.
   On **Cloud Run**: **Manage custom domains** → add `conductor.ng` (or front it
   with a Load Balancer + Cloud CDN for caching).
2. Point DNS at whichever target is serving, and retire WordPress.
3. **GA4**: reuse the same `G-XXXX` id (no data reset). **Search Console**: add `conductor.ng` and verify.

## Env vars (also in `.env.example`)
Values are the same on both targets; only the delivery mechanism differs
(Secret Manager / `--set-env-vars` on Cloud Run, project env vars on Vercel).

| Var | Where (Cloud Run) | Notes |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | build (`_GA_ID` / `--build-arg`) | GA4 Measurement ID |
| `RESEND_API_KEY` | Secret Manager | contact form + newsletter email |
| `CONTACT_TO_EMAIL` | runtime env | where messages land (default support@conductor.ng) |
| `CONTACT_FROM_EMAIL` | runtime env | must be a Resend-verified sender |
| `RESEND_AUDIENCE_ID` | runtime env (optional) | newsletter list; else signups are emailed to you |
| `GOOGLE_SITE_VERIFICATION` | build (optional) | Search Console meta-tag token |
