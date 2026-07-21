import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="tagmob-grid-bg min-h-screen flex flex-col text-slate-100 bg-slate-950 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="text-pink-500 font-black text-2xl tracking-tighter glow-pink">
            TAG
          </span>
          <span className="text-cyan-400 font-black text-2xl tracking-tighter glow-cyan">
            MOB
          </span>
          <span className="hidden sm:inline-block ml-3 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-cyan-400 rounded-full border border-cyan-500/20">
            Fase 1 · Ecossistema
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <a href="#ecossistema" className="hidden md:inline-block text-slate-400 hover:text-white transition-colors">
            Ecossistema
          </a>
          <a href="#fluxo" className="hidden md:inline-block text-slate-400 hover:text-white transition-colors">
            Como Funciona
          </a>
          <a href="#trabalhos" className="hidden md:inline-block text-slate-400 hover:text-white transition-colors">
            Trabalhos Efetuados
          </a>
          <a href="#simulador" className="hidden md:inline-block text-slate-400 hover:text-white transition-colors">
            Orçamento & Simulador
          </a>
          <Link
            href="/sign-in"
            className="text-slate-300 hover:text-white transition-colors font-medium"
          >
            Entrar
          </Link>
          <Link
            href="/sign-up"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-pink-500/20"
          >
            Iniciar Projeto
          </Link>
        </div>
      </nav>

      {/* 1. ABERTURA (Hero Section) */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-20 pb-24 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400 mb-8">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          Plataforma PropTech & AdTech de Ambientalização Inteligente
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl text-white">
          A inteligência que conecta{" "}
          <span className="text-pink-500 glow-pink">
            imóveis
          </span>
          ,{" "}
          <span className="text-cyan-400 glow-cyan">
            marcas
          </span>{" "}
          e resultados.
        </h1>

        <p className="mt-8 text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
          O TAGMOB foi desenvolvido para <strong className="text-white font-semibold">pensar</strong> a ambientalização de imóveis,{" "}
          <strong className="text-white font-semibold">criar</strong> narrativas visuais com{" "}
          <strong className="text-white font-semibold">Profissionais de Criação</strong>,{" "}
          <strong className="text-white font-semibold">construir</strong> apresentações interativas de alto impacto e{" "}
          <strong className="text-white font-semibold">conectar</strong> Construtoras, Marcas e Equipes de Vendas no momento de maior intenção de compra.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <Link
            href="/sign-up"
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-base px-8 py-4 rounded-xl transition-all shadow-xl shadow-pink-500/25"
          >
            Turbinar meu primeiro lançamento
          </Link>
          <a
            href="#simulador"
            className="border border-slate-700 text-slate-200 hover:border-slate-500 hover:text-white font-semibold text-base px-8 py-4 rounded-xl transition-all bg-slate-900/50"
          >
            Simular Orçamento & Remuneração
          </a>
        </div>

        {/* Target Audience Pills (Fase 1) */}
        <div className="mt-16 w-full pt-8 border-t border-slate-800/80">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-4">
            Ecossistema integrado para a Fase 1
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Construtoras & Incorporadoras", desc: "Valorização de VGV", badgeBg: "bg-pink-500/10 border-pink-500/30 text-pink-400", dot: "bg-pink-500" },
              { label: "Marcas & Fornecedores de Acabamento", desc: "Product placement nativo", badgeBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400", dot: "bg-cyan-400" },
              { label: "Corretores & Equipes de Vendas", desc: "Ferramenta de conversão", badgeBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400", dot: "bg-emerald-400" },
              { label: "Profissionais de Criação", desc: "Autonomia & Projetos", badgeBg: "bg-amber-500/10 border-amber-500/30 text-amber-400", dot: "bg-amber-400" },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-semibold ${item.badgeBg}`}
              >
                <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                <span className="text-slate-200">{item.label}</span>
                <span className="text-slate-500 font-normal">| {item.desc}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4 italic">
            *Nota: Fornecedores complementares, decoradores e serviços entrarão na expansão da Segunda Fase.
          </p>
        </div>
      </section>

      {/* 2. MEIO: O ECOSSISTEMA E FUNCIONALIDADES ("Nossa, eles fazem tudo isso!") */}
      <section id="ecossistema" className="py-20 px-6 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest font-bold text-cyan-400 mb-3">
              Tudo em uma única plataforma
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              O ecossistema completo que orquestra do briefing à venda final.
            </h3>
            <p className="mt-4 text-slate-400 text-lg">
              Substitua dezenas de ferramentas descentralizadas por um fluxo contínuo onde cada agente do ecossistema ganha eficiência e rentabilidade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between hover:border-pink-500/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-xl mb-6">
                  01
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Briefing Inteligente</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Estruturação automática de diretrizes de projeto para Construtoras e Marcas. Parâmetros técnicos, verba estimada e direcionamento criativo em minutos.
                </p>
              </div>
              <ul className="mt-6 space-y-2 border-t border-slate-900 pt-4 text-xs text-slate-300">
                <li className="flex items-center gap-2">✓ Alinhamento técnico de produtos</li>
                <li className="flex items-center gap-2">✓ Padronização de requisitos</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between hover:border-cyan-500/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xl mb-6">
                  02
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Product Placement Nativo</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Inclusão direta do catálogo real de Marcas de Acabamento nos projetos de ambientação. O comprador visualiza o produto exato inserido no imóvel.
                </p>
              </div>
              <ul className="mt-6 space-y-2 border-t border-slate-900 pt-4 text-xs text-slate-300">
                <li className="flex items-center gap-2">✓ Catálogo digital rastreável</li>
                <li className="flex items-center gap-2">✓ Especificação técnica direta</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xl mb-6">
                  03
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Hub de Vendas & Habilitação</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Corretores e equipes de vendas recebem um portfólio digital interativo pronto para apresentação em plantões de vendas ou atendimentos remotos.
                </p>
              </div>
              <ul className="mt-6 space-y-2 border-t border-slate-900 pt-4 text-xs text-slate-300">
                <li className="flex items-center gap-2">✓ Link interativo para o comprador</li>
                <li className="flex items-center gap-2">✓ Resposta imediata de dúvidas</li>
              </ul>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between hover:border-amber-500/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-xl mb-6">
                  04
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Autonomia de Criação</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Liberdade para Profissionais de Criação aplicarem conceitos e selecionarem parceiros, mantendo a originalidade do projeto dentro das regras da Construtora.
                </p>
              </div>
              <ul className="mt-6 space-y-2 border-t border-slate-900 pt-4 text-xs text-slate-300">
                <li className="flex items-center gap-2">✓ Curadoria sem engessamento</li>
                <li className="flex items-center gap-2">✓ Valorização do trabalho autoral</li>
              </ul>
            </div>

            {/* Card 5 */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between hover:border-purple-500/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xl mb-6">
                  05
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Orçamentação em Tempo Real</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Geração instantânea de custos de acabamento e ambientação para o cliente final. Fim das tabelas manuais e das demoras no atendimento.
                </p>
              </div>
              <ul className="mt-6 space-y-2 border-t border-slate-900 pt-4 text-xs text-slate-300">
                <li className="flex items-center gap-2">✓ Transparência total de custos</li>
                <li className="flex items-center gap-2">✓ Simulação de parcelamento/opções</li>
              </ul>
            </div>

            {/* Card 6 */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between hover:border-indigo-500/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xl mb-6">
                  06
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Gestão de Remuneração</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Regras claras e automatizadas de repasse e comissionamento para cada agente do ecossistema. Valorização de cada etapa de conversão.
                </p>
              </div>
              <ul className="mt-6 space-y-2 border-t border-slate-900 pt-4 text-xs text-slate-300">
                <li className="flex items-center gap-2">✓ Rastreabilidade comercial</li>
                <li className="flex items-center gap-2">✓ Previsibilidade para parceiros</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FLUXO DE TRABALHO (Pensar -> Criar -> Construir -> Conectar) */}
      <section id="fluxo" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-bold text-pink-500 mb-3">
            Fluxo Passo a Passo
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Como a jornada acontece na prática
          </h3>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {[
            {
              step: "01",
              title: "PENSAR",
              subtitle: "Estratégia & Briefing",
              desc: "A Construtora e as Marcas definem os parâmetros do lançamento e as linhas de produtos desejadas.",
              titleColor: "text-pink-500",
            },
            {
              step: "02",
              title: "CRIAR",
              subtitle: "Desenvolvimento Autoral",
              desc: "Profissionais de Criação elaboram o conceito de ambientação escolhendo as combinações mais harmoniosas.",
              titleColor: "text-cyan-400",
            },
            {
              step: "03",
              title: "CONSTRUIR",
              subtitle: "Apresentação Interativa",
              desc: "O sistema compila o projeto visual, a especificação detalhada de acabamentos e a tabela de custos.",
              titleColor: "text-emerald-400",
            },
            {
              step: "04",
              title: "CONECTAR",
              subtitle: "Vendas & Conversão",
              desc: "Corretores apresentam o imóvel ao comprador no momento de decisão, ativando vendas com orçamentos instantâneos.",
              titleColor: "text-amber-400",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl relative overflow-hidden"
            >
              <div className={`text-4xl font-black opacity-20 mb-4 ${item.titleColor}`}>
                {item.step}
              </div>
              <h4 className={`text-lg font-black tracking-wider mb-1 ${item.titleColor}`}>
                {item.title}
              </h4>
              <p className="text-xs font-semibold text-slate-300 mb-3">{item.subtitle}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FINAL: TRABALHOS EFETUADOS & PROVA SOCIAL */}
      <section id="trabalhos" className="py-20 px-6 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs uppercase tracking-widest font-bold text-cyan-400 mb-2">
                Casos Práticos
              </h2>
              <h3 className="text-3xl font-extrabold text-white">Trabalhos Efetuados</h3>
            </div>
            <p className="text-sm text-slate-400 max-w-md mt-2 md:mt-0">
              Conheça lançamentos imobiliários que aceleraram a velocidade de vendas e engajamento através da ambientalização do TAGMOB.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tag: "Empreendimento Residencial",
                title: "Residencial Alto da Mata",
                details: "3 Marcas parceiras · 45 dias de campanha · 88% de adesão nos kits de acabamento",
              },
              {
                tag: "Lançamento de Luxo",
                title: "Torre Horizon Design",
                details: "Ambientação 100% digital · Aumento de 32% no ticket médio de vendas",
              },
              {
                tag: "Smart Studios",
                title: "Urban Concept Studios",
                details: "Projetos flexíveis por Profissionais de Criação · Vendas aceleradas em 4 semanas",
              },
            ].map((card, i) => (
              <div key={i} className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400 bg-pink-950/60 border border-pink-800/40 px-2.5 py-1 rounded-md">
                    {card.tag}
                  </span>
                  <h4 className="text-lg font-bold text-white mt-4 mb-2">{card.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{card.details}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-900 text-xs font-semibold text-cyan-400 flex items-center justify-between">
                  <span>Ver estudo de caso</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINAL: ORÇAMENTO & SIMULADOR DE VALORES / LANÇAMENTO */}
      <section id="simulador" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 md:p-14 shadow-2xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Transparência Comercial
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
              Simulador de Valores & Remuneração
            </h2>
            <p className="text-slate-400 text-base md:text-lg mt-4">
              Entenda os investimentos para seu lançamento imobiliário e veja como o sistema de remuneração distribui valor para Construtoras, Marcas e Equipes de Vendas.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Simulador Interativo Demo */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
                <span>Simular Lançamento</span>
                <span className="text-xs font-normal text-slate-400">Estimativa Instantânea</span>
              </h3>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Porte do Empreendimento (Número de Unidades)
                </label>
                <select
                  defaultValue="50 a 150 unidades (Lançamento Padrão)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Até 50 unidades (Porte Médio)">Até 50 unidades (Porte Médio)</option>
                  <option value="50 a 150 unidades (Lançamento Padrão)">50 a 150 unidades (Lançamento Padrão)</option>
                  <option value="Mais de 150 unidades (Grande Porte)">Mais de 150 unidades (Grande Porte)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Marcas de Acabamento Integradas
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["2 a 4 Marcas", "5 a 8 Marcas", "Exclusivo"].map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`text-xs py-2 px-3 rounded-lg border font-medium ${
                        i === 1
                          ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Estimativa de Valorização VGV:</span>
                  <span className="text-emerald-400 font-bold">+ 4.5% a 8.2%</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Velocidade Média de Vendas:</span>
                  <span className="text-cyan-400 font-bold">2.4x mais ágil</span>
                </div>
                <div className="flex justify-between text-sm text-white font-bold pt-2 border-t border-slate-900">
                  <span>Retorno Estimado para a Operação:</span>
                  <span className="text-pink-400">Excelente ROI</span>
                </div>
              </div>

              <Link
                href="/sign-up"
                className="w-full block text-center bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-pink-500/20 text-sm"
              >
                Solicitar Orçamento Detalhado
              </Link>
            </div>

            {/* Como Funciona a Remuneração */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Como Funciona o Sistema de Remuneração</h3>
              
              <div className="space-y-4 text-sm text-slate-300">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <h4 className="font-bold text-pink-400 text-sm mb-1">1. Para Construtoras</h4>
                  <p className="text-xs text-slate-400">
                    Aumento imediato de percepção de valor nos decorados sem encarecer o custo direto por m².
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <h4 className="font-bold text-cyan-400 text-sm mb-1">2. Para Marcas</h4>
                  <p className="text-xs text-slate-400">
                    Remuneração atrelada à conversão direta de kits e acabamentos especificados no projeto.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <h4 className="font-bold text-emerald-400 text-sm mb-1">3. Para Corretores & Equipes de Vendas</h4>
                  <p className="text-xs text-slate-400">
                    Comissionamento adicional na venda de produtos de ambientação integrados ao financiamento do cliente.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <h4 className="font-bold text-amber-400 text-sm mb-1">4. Para Profissionais de Criação</h4>
                  <p className="text-xs text-slate-400">
                    Honorários garantidos com autonomia de projeto e repasse transparente sem intermediários burocráticos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-6 text-center border-t border-slate-800 bg-slate-950 relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Pronto para transformar seu próximo lançamento?
          </h2>
          <p className="mt-4 text-slate-300 text-lg">
            Acelere vendas, encante compradores e conecte seu produto às melhores marcas.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/sign-up"
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-base px-8 py-4 rounded-xl transition-all shadow-xl shadow-pink-500/25"
            >
              Criar Conta Gratuita
            </Link>
            <a
              href="#simulador"
              className="border border-slate-700 text-slate-200 hover:border-slate-500 hover:text-white font-semibold text-base px-8 py-4 rounded-xl transition-all"
            >
              Falar com um Especialista
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-between px-8 py-6 gap-4 bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
        <span>© 2024 TAGMOB. Pensar · Criar · Construir · Conectar.</span>
        <span className="uppercase tracking-widest text-slate-500 text-[11px]">
          v0.2.0 · Estrutura Validada Fase 1
        </span>
      </footer>
    </main>
  );
}
