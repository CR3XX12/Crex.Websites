# Crex Websites

Bilingual portfolio and lead-generation site for Crex Websites.

## Commands

```bash
npm install
npm run dev
npm run build
```

Spanish is the default language. The selected language is stored in `localStorage`, and all customer-facing content is maintained in `src/locales/es.json` and `src/locales/en.json`.

The quote form uses Web3Forms to deliver submissions directly to the configured inbox without opening the visitor's email app.

1. Create an access key for the destination inbox at https://web3forms.com/
2. For local development, copy `.env.example` to `.env.local` and add the key.
3. In Vercel, add `VITE_WEB3FORMS_ACCESS_KEY` in Project Settings > Environment Variables for Production and Preview.
4. Redeploy after adding or changing the environment variable.
