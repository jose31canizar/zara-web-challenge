# Zara Web Challenge - Smartphones

Next.js implementation of the smartphone catalog challenge:

- Product listing with API-backed search and result count
- Product detail
- Persistent cart with item removal and total price

## How to run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - development mode
- `npm run build` - production build (minified/optimized assets by Next.js)
- `npm run start` - run production server
- `npm run lint` - run ESLint
- `npm run test` - run test suite


## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS + DaisyUI
- React Context API + `localStorage` for cart persistence
- Vitest for tests

## API

- Base URL: `https://prueba-tecnica-api-tienda-moviles.onrender.com`

Endpoints:

- `GET /products?limit=20&search=<query>`
- `GET /products/{id}`

