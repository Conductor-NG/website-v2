# Deploying the marketing site (Cloud Run)

Standard container flow — the same shape as the greenfield app. No Vercel, no Firebase.

## What runs where
- **Static pages + SSR + API routes** → one Next.js server (standalone build) in a container on **Cloud Run**.
- **Analytics** → **GA4** (client script → Google). Reuse your existing GA4 property so history carries over. Optional **Search Console** verification.
- **Contact form + newsletter** → the site's own `/api/contact` and `/api/subscribe` routes → **Resend** (email). No database needed for v1.

## One-time setup
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

## Deploy (every release)
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
1. Map the domain: Cloud Run → **Manage custom domains** → add `conductor.ng` (or front it with a Load Balancer + Cloud CDN for caching).
2. Point DNS at Cloud Run and retire WordPress.
3. **GA4**: reuse the same `G-XXXX` id (no data reset). **Search Console**: add `conductor.ng` and verify.

## Env vars (also in `.env.example`)
| Var | Where | Notes |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | build (`_GA_ID` / `--build-arg`) | GA4 Measurement ID |
| `RESEND_API_KEY` | Secret Manager | contact form + newsletter email |
| `CONTACT_TO_EMAIL` | runtime env | where messages land (default support@conductor.ng) |
| `CONTACT_FROM_EMAIL` | runtime env | must be a Resend-verified sender |
| `RESEND_AUDIENCE_ID` | runtime env (optional) | newsletter list; else signups are emailed to you |
| `GOOGLE_SITE_VERIFICATION` | build (optional) | Search Console meta-tag token |
