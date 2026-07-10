"use client";

import { ClerkProvider } from "@clerk/nextjs";

const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
const IS_CLERK_READY =
  (key.startsWith("pk_live_") || key.startsWith("pk_test_")) &&
  !key.includes("SUBSTITUA") &&
  !key.includes("XXXXXXX") &&
  key.length > 30;

export function ClerkWrapper({ children }: { children: React.ReactNode }) {
  if (!IS_CLERK_READY) {
    return <>{children}</>;
  }
  return <ClerkProvider>{children}</ClerkProvider>;
}
