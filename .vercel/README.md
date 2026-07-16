# Vercel — projeto de produção

**Produção oficial:** projeto `tag-mob` → https://www.tagmob.com.br  
**Branch de produção:** sempre `main` (nunca feature/`cursor/*`).

Não faça deploy no projeto `tagmob-app` (legado).

```bash
# Na raiz, com checkout em main sincronizada com origin/main:
npm run deploy:prod
```

O script recusa se a branch não for `main` ou se `main` ≠ `origin/main`.  
Root Directory no dashboard Vercel: `tagmob-app`.
