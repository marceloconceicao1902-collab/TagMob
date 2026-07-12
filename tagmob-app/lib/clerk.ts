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
    return null;
  }
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
}
