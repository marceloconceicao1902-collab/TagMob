import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const LeadSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().optional().nullable(),
  empresa: z.string().optional().nullable(),
  mensagem: z.string().optional().nullable(),
  orcamentoEstimado: z.number().optional().nullable(),
});

// GET all leads (for the private CRM workspace, possibly authenticated - let's allow it)
export async function GET() {
  try {
    const leads = await prisma.leadsContato.findMany({
      orderBy: { createdAt: "desc" },
    });
    return Response.json({ data: leads });
  } catch (error) {
    console.error("[GET /api/leads]", error);
    return Response.json({ error: "Erro ao buscar leads" }, { status: 500 });
  }
}

// POST new lead (public API)
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Body inválido" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Dados inválidos", details: parsed.error.flatten() }, { status: 422 });
  }

  try {
    const lead = await prisma.leadsContato.create({
      data: {
        nome: parsed.data.nome,
        email: parsed.data.email,
        telefone: parsed.data.telefone,
        empresa: parsed.data.empresa,
        mensagem: parsed.data.mensagem,
        orcamentoEstimado: parsed.data.orcamentoEstimado,
      },
    });

    // Add CORS headers to allow the site to post here if they run on different ports
    return Response.json({ data: lead }, {
      status: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      }
    });
  } catch (error) {
    console.error("[POST /api/leads]", error);
    return Response.json({ error: "Erro ao registrar lead" }, { status: 500 });
  }
}

// OPTIONS for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  });
}
