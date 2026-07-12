import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LandingPage from "./(site)/LandingPage";

export default async function RootPage() {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  // Se o host contiver o domínio hub, a indicação de app, ou a porta padrão do CRM
  if (
    host.includes("tagmob-hub") ||
    host.includes("tagmob-app") ||
    host.includes("localhost:3000")
  ) {
    redirect("/corretor");
  }

  // Caso contrário, renderiza a landing page institucional com o simulador Anti-VGV
  return <LandingPage />;
}
