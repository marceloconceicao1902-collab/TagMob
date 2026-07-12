import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAuth, Auth } from "firebase/auth";
import {
  FirebaseClientConfig,
  getInlineFirebaseConfig,
  getMissingFirebaseFields,
  isFirebaseConfigReady,
} from "@/lib/firebase-config";

const inlineConfig = getInlineFirebaseConfig();

/** Disponível no bundle do cliente (pode ser false em produção sem vars no build). */
export const IS_FIREBASE_READY = isFirebaseConfigReady(inlineConfig);

let _resolvedConfig: FirebaseClientConfig | null = null;
let _configPromise: Promise<FirebaseClientConfig> | null = null;
let _app: FirebaseApp | undefined;
let _auth: Auth | undefined;
let _db: Database | undefined;
let _firestore: Firestore | undefined;
let _storage: FirebaseStorage | undefined;

function ensureBrowser() {
  if (typeof window === "undefined") {
    throw new Error("Firebase só pode ser usado no navegador.");
  }
}

async function resolveFirebaseConfig(): Promise<FirebaseClientConfig> {
  if (_resolvedConfig) return _resolvedConfig;

  if (!_configPromise) {
    _configPromise = (async () => {
      if (isFirebaseConfigReady(inlineConfig)) {
        _resolvedConfig = inlineConfig;
        return inlineConfig;
      }

      const res = await fetch("/api/firebase-config");
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const missing: string[] = body.missing ?? [];
        const missingText = missing.length > 0 ? ` Faltando: ${missing.join(", ")}.` : "";
        throw new Error(
          `Serviço de autenticação indisponível.${missingText} Configure as variáveis na Vercel (Settings → Environment Variables) e faça redeploy.`
        );
      }

      const remote = (await res.json()) as FirebaseClientConfig;
      if (!isFirebaseConfigReady(remote)) {
        const missing = getMissingFirebaseFields(remote);
        throw new Error(
          `Serviço de autenticação indisponível. Faltando: ${missing.join(", ")}.`
        );
      }

      _resolvedConfig = remote;
      return remote;
    })();
  }

  return _configPromise;
}

function getFirebaseApp(config: FirebaseClientConfig): FirebaseApp {
  ensureBrowser();
  if (!_app) {
    _app = getApps().length === 0 ? initializeApp(config) : getApp();
  }
  return _app;
}

/** Retorna Auth — carrega config do bundle ou da API em runtime. */
export async function getFirebaseAuth(): Promise<Auth> {
  const config = await resolveFirebaseConfig();
  if (!_auth) {
    _auth = getAuth(getFirebaseApp(config));
  }
  return _auth;
}

export async function getFirebaseDb(): Promise<Database> {
  const config = await resolveFirebaseConfig();
  return _db ??= getDatabase(getFirebaseApp(config));
}

export async function getFirebaseFirestore(): Promise<Firestore> {
  const config = await resolveFirebaseConfig();
  return _firestore ??= getFirestore(getFirebaseApp(config));
}

export async function getFirebaseStorage(): Promise<FirebaseStorage> {
  const config = await resolveFirebaseConfig();
  return _storage ??= getStorage(getFirebaseApp(config));
}

let analytics: ReturnType<typeof import("firebase/analytics").getAnalytics> | null = null;

export async function initFirebaseAnalytics(): Promise<void> {
  if (typeof window === "undefined" || analytics) return;
  try {
    const config = await resolveFirebaseConfig();
    const { getAnalytics, isSupported } = await import("firebase/analytics");
    const ok = await isSupported();
    if (ok) analytics = getAnalytics(getFirebaseApp(config));
  } catch {
    /* analytics opcional */
  }
}

export { analytics };
