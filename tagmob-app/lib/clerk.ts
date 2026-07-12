import { NextResponse } from "next/server";
import type { ProfileType } from "./types";

/**
 * Contexto de usuário para as rotas de API.
 * Futuramente: verificar o token do Firebase via Firebase Admin SDK.
 * Por enquanto, retorna null se o header Authorization não estiver presente.
 */
export interface UserContext {
  userId: string;
  dbUserId?: string;
  profileType: ProfileType;
  tenantId?: string;
  email?: string;
}

/**
 * Extrai e valida o contexto do usuário a partir do header Authorization.
 * Em produção plena: decodificar o idToken do Firebase com firebase-admin.
 * Por enquanto: verifica se o header existe e retorna um contexto básico.
 */
export async function getCurrentUserContext(
  req?: Request
): Promise<UserContext | null> {
  // Tentamos pegar o header de autorização da requisição
  const authHeader = req?.headers?.get?.("Authorization");
  const token = authHeader?.replace("Bearer ", "")?.trim();

  // Se não houver token, o acesso é negado
  if (!token) {
    return null;
  }

  // TODO: Adicionar verificação real do Firebase ID token com firebase-admin:
  //   import { getAuth } from 'firebase-admin/auth';
  //   const decoded = await getAuth().verifyIdToken(token);
  //   return { userId: decoded.uid, email: decoded.email, ... }

  // Por enquanto, retorna um contexto básico a partir do token presente
  // (substituir por decode real do Firebase Admin SDK em produção)
  return {
    userId: token.slice(0, 28) || "authenticated_user",
    profileType: "CONSTRUTORA",
    email: undefined,
  };
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
}
