import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonError } from "@/lib/crm";

export async function GET() {
  try {
    const contacts = await prisma.crmContact.findMany({
      include: {
        ownerUser: { select: { id: true, fullName: true } },
        company: { select: { id: true, nome: true } },
      },
      orderBy: { updatedAt: "desc" },
    });
    return Response.json({ data: contacts });
  } catch (error) {
    console.error("[GET /api/crm/contacts]", error);
    return jsonError("Erro ao buscar contatos");
  }
}

const CreateContactSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email().optional().nullable(),
  telefone: z.string().optional().nullable(),
  cargo: z.string().optional().nullable(),
  empresaNome: z.string().optional().nullable(),
  companyId: z.string().optional().nullable(),
  ownerUserId: z.string().optional().nullable(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("Body inválido", 400);
  }

  const parsed = CreateContactSchema.safeParse(body);
  if (!parsed.success) return jsonError("Dados inválidos", 422);

  try {
    const contact = await prisma.crmContact.create({
      data: parsed.data,
      include: {
        ownerUser: { select: { id: true, fullName: true } },
        company: { select: { id: true, nome: true } },
      },
    });
    return Response.json({ data: contact }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/crm/contacts]", error);
    return jsonError("Erro ao criar contato");
  }
}
