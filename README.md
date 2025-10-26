# bookstore-website

## API / Backend

This frontend expects a backend API. By default the axios client uses the Vite env var
`VITE_API_BASE_URL`. If that variable is not set, it falls back to `http://localhost:5000`.

Quick steps to run with a local backend on port 5000:

1. Copy `.env.example` to `.env` at the project root (or set `VITE_API_BASE_URL` in your environment):

```
VITE_API_BASE_URL=http://localhost:5000
```

2. Start your backend so it listens on port 5000.
3. Start the frontend dev server:

```powershell
npm install
npm run dev
```

If you see CORS errors, enable CORS on your backend or use a proxy. If you want me to add a dev proxy configuration in `vite.config.ts`, tell me and I will wire it up.
