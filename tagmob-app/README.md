# TAGMOB APP

**Plataforma PropTech + AdTech** — Pensar · Criar · Construir.

Conecta corretores, marcas parceiras e arquitetos através de product placement inteligente em imóveis de alto padrão.

---

## Stack

- **Next.js 15** (App Router + TypeScript)
- **Prisma ORM** + PostgreSQL 16
- **Clerk** — autenticação e multitenant
- **Tailwind CSS v4**
- **BullMQ + Redis** (filas para workers assíncronos)
- **Zod** — validação de schemas

---

## Início Rápido

### 1. Instalar dependências

```bash
npm install
```

### 2. Variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` e preencha:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` e `CLERK_SECRET_KEY` — obtenha em [dashboard.clerk.com](https://dashboard.clerk.com)
- `CLERK_WEBHOOK_SECRET` — configure o webhook no Clerk apontando para `/api/webhooks/clerk`

### 3. Subir banco de dados (Docker)

```bash
docker-compose up -d
```

Isso sobe **PostgreSQL 16** na porta `5432` e **Redis 7** na porta `6379`.

### 4. Criar as tabelas no banco

```bash
npm run db:push
```

### 5. Popular com dados demo

```bash
npm run db:seed
```

Cria:
- 3 bairros (Jardins, Itaim Bibi, Moema)
- 2 marcas piloto (Porcelanato XYZ, Smart Home Pro)
- 1 usuário demo por perfil (corretor, imobiliária, marca, arquiteto, construtora)
- 1 imóvel demo com matching scores e placement aprovado

### 6. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## Arquitetura de Camadas

| Camada | Perfil | Fase |
|--------|--------|------|
| Camada 1 | Construtoras & Infraestrutura | Fase 3 |
| Camada 2 | Corretores & Imobiliárias | **Fase 1 (MVP)** |
| Camada 3 | Marcas Parceiras (AdTech) | **Fase 1 (MVP)** |
| Camada 4 | Arquitetos & Design | Fase 2 |

---

## Estrutura de Pastas

```
app/
├── (public)/           # Landing page
├── (auth)/             # sign-in, sign-up (Clerk)
├── (dashboard)/
│   ├── corretor/       # Camada 2
│   ├── marca/          # Camada 3
│   ├── arquiteto/      # Camada 4
│   └── construtora/    # Camada 1
└── api/
    ├── properties/     # CRUD imóveis
    ├── brands/         # CRUD marcas
    ├── placements/     # Product placement + conflito
    └── webhooks/clerk/ # Sync Clerk → banco

lib/
├── prisma.ts           # Singleton Prisma
├── clerk.ts            # Helpers de contexto/tenant
└── conflict-matrix.ts  # Motor de exclusividade de marcas

prisma/
├── schema.prisma       # 10 entidades, 9 enums
└── seed.ts             # Dados demo
```

---

## Comandos Úteis

```bash
npm run db:studio       # Prisma Studio (UI do banco)
npm run db:migrate      # Criar migration de produção
npm run db:reset        # Reset completo do banco (dev only)
npm run lint            # Lint do projeto
npm run build           # Build de produção
```

---

## Fluxo de Onboarding

1. Usuário acessa `/sign-up` e cria conta no Clerk
2. É redirecionado para `/onboarding` para escolher seu perfil
3. O `profileType` é salvo no `publicMetadata` do Clerk
4. O middleware redireciona automaticamente para o dashboard correto
5. O webhook `/api/webhooks/clerk` cria o registro no banco PostgreSQL

---

## Configurar Webhook no Clerk

No [Clerk Dashboard](https://dashboard.clerk.com):
1. **Configure** → **Webhooks** → **Add endpoint**
2. URL: `https://SEU-DOMINIO/api/webhooks/clerk`
3. Eventos: `user.created`, `organization.created`
4. Copie o **Signing Secret** → `CLERK_WEBHOOK_SECRET` no `.env.local`

---

## Roadmap

- **Fase 1 (MVP):** Corretor + Marca · Cadastro de imóveis · Upload de fotos · Product placement manual
- **Fase 2:** Arquiteto · Canvas de especificação (Fabric.js) · Motor de matching automático (BullMQ)
- **Fase 3:** Construtora · Portfólio enterprise · SAML SSO · Contratos B2B
