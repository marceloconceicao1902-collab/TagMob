import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAuth, Auth } from "firebase/auth";

const apiKey     = (process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "").trim();
const projectId  = (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "").trim();
const databaseURL = (process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ?? "").trim();

/**
 * Verifica se as variáveis mínimas estão presentes.
 * Evita crash durante o pre-rendering estático na Vercel (build time SSG).
 */
const IS_FIREBASE_READY = Boolean(apiKey && projectId && databaseURL);

let app: FirebaseApp;
let db: Database;
let firestore: Firestore;
let storage: FirebaseStorage;
let auth: Auth;
let analytics: any = null;

if (IS_FIREBASE_READY) {
  const firebaseConfig = {
    apiKey,
    authDomain:        (process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "").trim(),
    databaseURL,
    projectId,
    storageBucket:     (process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "").trim(),
    messagingSenderId: (process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "").trim(),
    appId:             (process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "").trim(),
    measurementId:     (process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "").trim(),
  };

  // Evita re-inicialização durante hot reload do Next.js
  app      = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  db       = getDatabase(app);
  firestore = getFirestore(app);
  storage  = getStorage(app);
  auth     = getAuth(app);

  // Analytics: somente no browser
  if (typeof window !== "undefined") {
    import("firebase/analytics")
      .then(({ getAnalytics, isSupported }) =>
        isSupported().then((ok) => {
          if (ok) analytics = getAnalytics(app);
        })
      )
      .catch(() => {});
  }
} else {
  // Stubs seguros para o build SSG — nunca são chamados em runtime real
  // (as páginas que usam Firebase são "use client" e rodam só no browser)
  app       = null as any;
  db        = null as any;
  firestore = null as any;
  storage   = null as any;
  auth      = null as any;
}

export { app, db, firestore, storage, auth, analytics, IS_FIREBASE_READY };
