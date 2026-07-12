import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey:            (process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "").trim(),
  authDomain:        (process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "").trim(),
  databaseURL:       (process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ?? "").trim(),
  projectId:         (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "").trim(),
  storageBucket:     (process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "").trim(),
  messagingSenderId: (process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "").trim(),
  appId:             (process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "").trim(),
  measurementId:     (process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "").trim(),
};

/** Variáveis mínimas para Auth (não exige databaseURL). */
export const IS_FIREBASE_READY = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

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

function getFirebaseApp(): FirebaseApp {
  if (!IS_FIREBASE_READY) {
    throw new Error("Firebase não configurado. Verifique as variáveis NEXT_PUBLIC_FIREBASE_*.");
  }
  ensureBrowser();
  if (!_app) {
    _app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  }
  return _app;
}

/** Retorna a instância Auth — inicializa o Firebase sob demanda no cliente. */
export function getFirebaseAuth(): Auth {
  if (!IS_FIREBASE_READY) {
    throw new Error("Serviço de autenticação indisponível. Verifique a configuração do Firebase.");
  }
  ensureBrowser();
  if (!_auth) {
    _auth = getAuth(getFirebaseApp());
  }
  return _auth;
}

export function getFirebaseDb(): Database {
  return _db ??= getDatabase(getFirebaseApp());
}

export function getFirebaseFirestore(): Firestore {
  return _firestore ??= getFirestore(getFirebaseApp());
}

export function getFirebaseStorage(): FirebaseStorage {
  return _storage ??= getStorage(getFirebaseApp());
}

let analytics: ReturnType<typeof import("firebase/analytics").getAnalytics> | null = null;

export function initFirebaseAnalytics(): void {
  if (typeof window === "undefined" || analytics) return;
  import("firebase/analytics")
    .then(({ getAnalytics, isSupported }) =>
      isSupported().then((ok) => {
        if (ok) analytics = getAnalytics(getFirebaseApp());
      })
    )
    .catch(() => {});
}

export { analytics };
