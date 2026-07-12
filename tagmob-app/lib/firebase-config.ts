export type FirebaseClientConfig = {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

/** Config pública do projeto (Firebase Console → Configurações do projeto).
 *  Segura no cliente — proteção via Authorized Domains e regras do Firebase. */
const DEFAULT_FIREBASE_CONFIG: FirebaseClientConfig = {
  apiKey:            "AIzaSyAd5VeEhPcNkdxDxagiGF4xKIZEXfjgbWU",
  authDomain:        "tagmob-f6b96.firebaseapp.com",
  databaseURL:       "https://tagmob-f6b96-default-rtdb.firebaseio.com",
  projectId:         "tagmob-f6b96",
  storageBucket:     "tagmob-f6b96.firebasestorage.app",
  messagingSenderId: "399706737295",
  appId:             "1:399706737295:web:7f9ec9f0ed7b6f705ffefa",
  measurementId:     "G-2HX3XVMSPW",
};

export function trimEnv(value: string | undefined): string {
  return (value ?? "").trim().replace(/^["']|["']$/g, "");
}

function withDefaults(partial: FirebaseClientConfig): FirebaseClientConfig {
  return {
    apiKey:            partial.apiKey            || DEFAULT_FIREBASE_CONFIG.apiKey,
    authDomain:        partial.authDomain        || DEFAULT_FIREBASE_CONFIG.authDomain,
    databaseURL:       partial.databaseURL       || DEFAULT_FIREBASE_CONFIG.databaseURL,
    projectId:         partial.projectId         || DEFAULT_FIREBASE_CONFIG.projectId,
    storageBucket:     partial.storageBucket     || DEFAULT_FIREBASE_CONFIG.storageBucket,
    messagingSenderId: partial.messagingSenderId || DEFAULT_FIREBASE_CONFIG.messagingSenderId,
    appId:             partial.appId             || DEFAULT_FIREBASE_CONFIG.appId,
    measurementId:     partial.measurementId     || DEFAULT_FIREBASE_CONFIG.measurementId,
  };
}

export function isFirebaseConfigReady(config: FirebaseClientConfig): boolean {
  return Boolean(
    config.apiKey &&
    config.authDomain &&
    config.projectId &&
    config.appId
  );
}

/** Lê variáveis embutidas no bundle do cliente (build time / dev server). */
export function getInlineFirebaseConfig(): FirebaseClientConfig {
  return withDefaults({
    apiKey:            trimEnv(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
    authDomain:        trimEnv(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
    databaseURL:       trimEnv(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL),
    projectId:         trimEnv(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
    storageBucket:     trimEnv(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
    messagingSenderId: trimEnv(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
    appId:             trimEnv(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
    measurementId:     trimEnv(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID),
  });
}

/** Lê variáveis no servidor em runtime (Vercel, .env.local, etc.). */
export function getServerFirebaseConfig(): FirebaseClientConfig {
  const read = (nextKey: string, fallbackKey?: string) =>
    trimEnv(process.env[nextKey] ?? (fallbackKey ? process.env[fallbackKey] : undefined));

  return withDefaults({
    apiKey:            read("NEXT_PUBLIC_FIREBASE_API_KEY", "FIREBASE_API_KEY"),
    authDomain:        read("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", "FIREBASE_AUTH_DOMAIN"),
    databaseURL:       read("NEXT_PUBLIC_FIREBASE_DATABASE_URL", "FIREBASE_DATABASE_URL"),
    projectId:         read("NEXT_PUBLIC_FIREBASE_PROJECT_ID", "FIREBASE_PROJECT_ID"),
    storageBucket:     read("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", "FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: read("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID", "FIREBASE_MESSAGING_SENDER_ID"),
    appId:             read("NEXT_PUBLIC_FIREBASE_APP_ID", "FIREBASE_APP_ID"),
    measurementId:     read("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID", "FIREBASE_MEASUREMENT_ID"),
  });
}

export function getMissingFirebaseFields(config: FirebaseClientConfig): string[] {
  const fields: Array<[string, string]> = [
    ["apiKey", "NEXT_PUBLIC_FIREBASE_API_KEY"],
    ["authDomain", "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"],
    ["projectId", "NEXT_PUBLIC_FIREBASE_PROJECT_ID"],
    ["appId", "NEXT_PUBLIC_FIREBASE_APP_ID"],
  ];
  return fields.filter(([key]) => !config[key as keyof FirebaseClientConfig]).map(([, env]) => env);
}
