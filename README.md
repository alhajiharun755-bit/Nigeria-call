# NigeriaCall — Complete Starter Project

This project is a real application starter, not a fake "real calling" implementation.

## What is included

- Mobile-first NigeriaCall web app
- Node.js + Express backend
- OTP endpoints ready for a real OTP provider
- Wallet API structure
- Calling quote endpoint
- Calling request endpoint ready for a compliant VoIP/telephony provider
- Call history endpoint
- Environment variable template
- Frontend UI

## Important before launch

Three external services are required:

1. **OTP/SMS provider** — sends and verifies real OTP codes.
2. **Payment provider** — handles deposits and webhooks.
3. **VoIP/telephony provider** — supplies lawful international calling to Nigerian numbers.

Provider credentials must stay on the server. Never put secret API keys in `public/index.html`.

## Run locally

Install Node.js 20+.

```bash
npm install
npm start
```

Then open:

http://localhost:3000

## Production work still required

- PostgreSQL/MySQL database instead of in-memory Maps
- Real authentication/session or JWT strategy
- Real OTP provider integration
- Real payment gateway + signed webhooks
- Real VoIP provider integration + verified caller ID
- Server-side rate/billing engine
- Idempotency and transaction ledger
- Admin dashboard with role-based access
- HTTPS, rate limiting, logging, monitoring and backups
- Terms, privacy policy and compliance checks for the countries/providers used

The starter deliberately does not bypass OTP, spoof caller identity, or make unauthorized calls.
