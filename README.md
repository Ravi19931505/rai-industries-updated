# R.A.I Industries — Website

React + TypeScript + Tailwind v4 + Framer Motion.

## Run locally
npm install
npm run dev

## Build
npm run build   → outputs to dist/

## Deploy (GitHub → Vercel)
Push to the existing repo → Vercel auto-deploys on push to main.
Framework preset: Vite. Build command: npm run build. Output dir: dist.

## MUST FIX BEFORE LAUNCH
1. Real contact details (address, phone, WhatsApp, email, hours) — done.
2. Real photography — done (Hero, About, 8 Products, 6 Shop Floor, 10 Capabilities).
3. Contact form — wired to Web3Forms (src/components/Contact.tsx). Get a free
   access key at https://web3forms.com (enter your email, no signup) and
   paste it into WEB3FORMS_ACCESS_KEY in src/data/content.ts. Until that's
   set, submissions will fail with the on-page error message.
4. index.html — replace the placeholder canonical URL (raiindustries.example.com)
   with the real domain once you have one.
