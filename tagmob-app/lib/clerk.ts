import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { ProfileType } from "./types";

export interface UserContext {
  userId: string;
  dbUserId?: string;
  profileType: ProfileType;
  tenantId?: string;
  email?: string;
}

export async function getCurrentUserContext(): Promise<UserContext | null> {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  const IS_CLERK_READY =
    (publishableKey.startsWith("pk_live_") || publishableKey.startsWith("pk_test_")) &&
    !publishableKey.includes("SUBSTITUA") &&
    !publishableKey.includes("XXXXXXX") &&
    publishableKey.length > 30;

  // Em modo demo (sem chaves ativas do Clerk), retorna um contexto mock padrão
  if (!IS_CLERK_READY) {
    return {
      userId: "demo_user_id",
      dbUserId: "demo_db_user_id",
      profileType: "CORRETOR",
      tenantId: "demo_tenant_id",
      email: "demo@tagmob.com.br",
    };
  }

  try {
    const { userId } = await auth();
    if (!userId) return null;

    const user = await currentUser();
    const publicMetadata = (user?.publicMetadata ?? {}) as {
      profileType?: ProfileType;
      tenantId?: string;
      dbUserId?: string;
    };

    return {
      userId,
      dbUserId: publicMetadata.dbUserId ?? userId,
      profileType: publicMetadata.profileType ?? "CORRETOR",
      tenantId: publicMetadata.tenantId,
      email: user?.emailAddresses[0]?.emailAddress,
    };
  } catch (error) {
    console.error("[getCurrentUserContext] Erro ao obter sessão Clerk:", error);
    // Fallback gracioso caso falhe comunicação com os servidores do Clerk
    return {
      userId: "demo_user_id",
      dbUserId: "demo_db_user_id",
      profileType: "CORRETOR",
      tenantId: "demo_tenant_id",
      email: "demo@tagmob.com.br",
    };
  }
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
}
