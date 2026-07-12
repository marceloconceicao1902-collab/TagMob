import { NextResponse } from "next/server";
import {
  getMissingFirebaseFields,
  getServerFirebaseConfig,
  isFirebaseConfigReady,
} from "@/lib/firebase-config";

export async function GET() {
  const config = getServerFirebaseConfig();

  if (!isFirebaseConfigReady(config)) {
    const missing = getMissingFirebaseFields(config);
    return NextResponse.json(
      {
        error: "Firebase não configurado no servidor.",
        missing,
        hint: "Adicione as variáveis NEXT_PUBLIC_FIREBASE_* em Vercel → Settings → Environment Variables e faça redeploy.",
      },
      { status: 503 }
    );
  }

  return NextResponse.json(config);
}
