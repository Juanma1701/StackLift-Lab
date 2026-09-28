# StackLift Lab

Aplicacion full-stack para gestionar entrenamientos.

## Estructura

- `server`: API Node.js, Express, PostgreSQL y Prisma.
- `client`: interfaz React, Vite, TypeScript, Tailwind CSS y shadcn/ui.

## Inicio rapido

```bash
cd server
npm install
npx prisma generate
npm run dev
```

En otra terminal:

```bash
cd client
npm install
npm run dev
```

## Despliegue a producción

1. Copia `server/.env.example` → `server/.env` y `client/.env.example` → `client/.env`, y rellena con tus valores reales (nunca subas los `.env` reales a git — ya están en `.gitignore`).
2. Backend: despliega en un servicio como Railway o Render, con una base de datos PostgreSQL administrada (ej. Railway, Supabase, Neon).
3. Frontend: `npm run build` en `client/` genera `dist/`, que puedes desplegar en Vercel o Netlify.
4. Si backend y frontend quedan en dominios distintos, cambia en `server/src/controllers/auth.controller.ts` el `sameSite` de la cookie a `"none"` (requiere `secure: true`, que ya se activa solo cuando `NODE_ENV=production`).
5. Actualiza `CLIENT_URL` en el backend y `VITE_API_URL` en el frontend con las URLs reales de producción.
