import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nomeRazao, cnpjCpf, categoria, registroPro, regiaoAtuacao, portfolioUrl, marcasInsumos, email, telefone } = body;

    if (!nomeRazao || !cnpjCpf || !categoria || !regiaoAtuacao) {
      return NextResponse.json(
        { error: "Preencha todos os campos obrigatórios (Nome/Razão Social, CPF/CNPJ, Categoria e Região)." },
        { status: 400 }
      );
    }

    const novoProfissional = {
      id: `pro-${Date.now()}`,
      usuarioId: `usr-${Date.now()}`,
      nomeRazao,
      cnpjCpf,
      categoria,
      registroPro: registroPro || null,
      regiaoAtuacao,
      portfolioUrl: portfolioUrl || null,
      marcasInsumos: marcasInsumos || [],
      email: email || "",
      telefone: telefone || "",
      statusAprovacao: "PENDENTE",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Cadastro de profissional enviado com sucesso! Nosso time analisará suas credenciais.",
      data: novoProfissional,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Erro interno ao processar cadastro" }, { status: 500 });
  }
}
