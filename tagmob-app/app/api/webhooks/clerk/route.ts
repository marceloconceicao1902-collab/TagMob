import { headers } from "next/headers";
import { Webhook } from "svix";
import { prisma } from "@/lib/prisma";
import type { ProfileType } from "@/lib/types";
type TenantType = "IMOBILIARIA" | "CONSTRUTORA" | "ARQUITETO" | "MARCA";

type ClerkUserCreatedEvent = {
  type: "user.created";
  data: {
    id: string;
    email_addresses: { email_address: string }[];
    first_name: string | null;
    last_name: string | null;
    public_metadata: {
      profileType?: string;
      tenantSlug?: string;
    };
  };
};

type ClerkOrgCreatedEvent = {
  type: "organization.created";
  data: {
    id: string;
    slug: string;
    name: string;
    public_metadata: {
      tenantType?: string;
    };
  };
};

type ClerkEvent = ClerkUserCreatedEvent | ClerkOrgCreatedEvent;

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response("Webhook secret não configurado", { status: 500 });
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Headers svix ausentes", { status: 400 });
  }

  const payload = await req.text();
  const wh = new Webhook(webhookSecret);

  let event: ClerkEvent;
  try {
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkEvent;
  } catch {
    return new Response("Assinatura do webhook inválida", { status: 400 });
  }

  // ─── user.created → cria User no banco ────────────────────────────────────
  if (event.type === "user.created") {
    const { id, email_addresses, first_name, last_name, public_metadata } = event.data;
    const email = email_addresses[0]?.email_address;
    if (!email) return new Response("Email não encontrado", { status: 400 });

    const profileType = (public_metadata.profileType ?? "CORRETOR") as ProfileType;
    const fullName = [first_name, last_name].filter(Boolean).join(" ") || email;

    let tenantId: string | undefined;
    if (public_metadata.tenantSlug) {
      const tenant = await prisma.tenant.findUnique({
        where: { slug: public_metadata.tenantSlug },
      });
      tenantId = tenant?.id;
    }

    await prisma.user.upsert({
      where: { clerkUserId: id },
      update: { email, fullName, profileType },
      create: {
        clerkUserId: id,
        email,
        fullName,
        profileType,
        tenantId,
        phaseAccess: 1,
      },
    });

    console.log(`[Clerk Webhook] User criado: ${email} (${profileType})`);
    return new Response("User sincronizado", { status: 200 });
  }

  // ─── organization.created → cria Tenant no banco ──────────────────────────
  if (event.type === "organization.created") {
    const { id, slug, name, public_metadata } = event.data;
    const tenantType = (public_metadata.tenantType ?? "IMOBILIARIA") as TenantType;

    await prisma.tenant.upsert({
      where: { slug },
      update: { name },
      create: {
        clerkOrgId: id,
        slug,
        name,
        type: tenantType,
        activePhase: 1,
      },
    });

    console.log(`[Clerk Webhook] Tenant criado: ${name} (${slug})`);
    return new Response("Tenant sincronizado", { status: 200 });
  }

  return new Response("Evento ignorado", { status: 200 });
}
