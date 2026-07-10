import { PrismaClient } from "@prisma/client";

// Safe mock proxy para evitar que a coleta de dados de página do Next.js falhe quando o Prisma não estiver inicializado ou gerado
function createPrismaMockProxy() {
  const handler: ProxyHandler<any> = {
    get(_target, prop) {
      if (prop === "then") return undefined;
      return new Proxy(() => {}, {
        get(_t, method) {
          if (method === "then") return undefined;
          return async () => {
            if (method === "count") return 0;
            if (method === "findMany") return [];
            if (method === "findUnique" || method === "findFirst") return null;
            if (method === "create" || method === "update" || method === "upsert") return {};
            return null;
          };
        },
        apply() {
          return async () => null;
        },
      });
    },
  };
  return new Proxy({}, handler);
}

let prismaClientInstance: any;

try {
  const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
  };

  prismaClientInstance =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: ["error"],
    });

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaClientInstance;
} catch (e) {
  console.warn("[lib/prisma.ts] PrismaClient não inicializado. Usando Mock Proxy para ambiente demo.");
  prismaClientInstance = createPrismaMockProxy();
}

export const prisma = prismaClientInstance;
