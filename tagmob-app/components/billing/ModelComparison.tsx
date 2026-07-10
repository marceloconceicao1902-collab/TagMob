import React from 'react';
import { ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

export const ModelComparison = () => {
  const comparisonData = [
    { trad: "Valor baseado no VGV", tag: "Valor baseado no escopo do projeto" },
    { trad: "Percentual fixo", tag: "Orçamento personalizado" },
    { trad: "Cliente compra um pacote", tag: "Cliente escolhe apenas o que precisa" },
    { trad: "Pouca flexibilidade", tag: "Total flexibilidade" },
    { trad: "Investimento estimado", tag: "Investimento transparente por entregável" },
    { trad: "Mesmo VGV, mesmo critério", tag: "Cada campanha é precificada conforme sua complexidade" }
  ];

  return (
    <div className="w-full overflow-hidden rounded-xl border border-[#1A1A30] bg-[#0D0D1A] font-sans text-sm relative">
      {/* Grid overlay retro-tech */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, #39FF14 0, #39FF14 1px, transparent 1px, transparent 20px),
            repeating-linear-gradient(90deg, #39FF14 0, #39FF14 1px, transparent 1px, transparent 20px)
          `
        }}
      />
      
      {/* Cabeçalho do grid */}
      <div className="grid grid-cols-2 border-b border-[#1A1A30] bg-[#09090F]/80 backdrop-blur-md font-bold tracking-tight">
        <div className="p-4 text-center border-r border-[#1A1A30] text-[#555577] flex items-center justify-center gap-2">
          <AlertCircle size={13} className="text-[#555577]" />
          <span>Modelo Tradicional</span>
        </div>
        <div className="p-4 text-center text-[#FF0068] bg-[#FF0068]/05 flex items-center justify-center gap-2 relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF0068]" />
          <Sparkles size={13} className="text-[#FF0068]" />
          <span>Modelo TAGMOB</span>
        </div>
      </div>

      {/* Linhas da matriz */}
      <div className="divide-y divide-[#1A1A30] relative z-10">
        {comparisonData.map((row, index) => (
          <div 
            key={index} 
            className="grid grid-cols-2 hover:bg-[#111120]/60 transition-colors"
          >
            {/* Coluna Tradicional (Desbotada / Baixa prioridade visual) */}
            <div className="p-4 text-[#4E4E6E] border-r border-[#1A1A30] bg-[#09090F]/20 select-none">
              {row.trad}
            </div>
            
            {/* Coluna TAGMOB (Destacada com alta nitidez e tom neon) */}
            <div className="p-4 text-[#EDE8DF] font-semibold flex items-start gap-2.5 bg-[#FF0068]/[0.01]">
              <ShieldCheck size={14} className="text-[#39FF14] mt-0.5 flex-shrink-0" />
              <span>{row.tag}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Rodapé do card */}
      <div className="p-3 bg-[#09090F] border-t border-[#1A1A30] text-center text-[10px] text-[#555577] tracking-wider uppercase font-bold">
        Garantia de Escopo Real e Transparência TAGMOB OS
      </div>
    </div>
  );
};
