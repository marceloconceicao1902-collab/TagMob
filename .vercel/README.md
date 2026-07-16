# Vercel — projeto de produção

**Produção oficial:** projeto `tag-mob` → https://www.tagmob.com.br

Não faça deploy no projeto `tagmob-app` (é legado / preview).

```bash
# Na raiz do repositório:
npm run deploy:prod
```

Ou:

```bash
npx vercel --prod --yes --cwd .
```

O Root Directory no dashboard da Vercel deve ser `tagmob-app`.
