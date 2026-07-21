import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ROUTE_MAP: Record<string, string> = {
  CORRETOR: "/corretor",
  IMOBILIARIA: "/corretor",
  MARCA: "/marca",
  ARQUITETO: "/profissionais",
  CONSTRUTORA: "/construtora",
};

export default async function DashboardRedirectPage() {
  const { userId, sessionClaims } = await auth();
  if (!userId) redirect("/sign-in");

  const meta = (sessionClaims?.publicMetadata ?? {}) as Record<string, string>;
  const profileType = meta.profileType;

  if (!profileType) redirect("/onboarding");

  const route = ROUTE_MAP[profileType] ?? "/onboarding";
  redirect(route);
}
