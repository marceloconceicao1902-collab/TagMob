"use client";

import { useEffect, useRef, useState } from "react";

type RevealTag = "div" | "li" | "section" | "p" | "span";

/**
 * Revela o conteúdo quando ele entra na viewport.
 * Só anima uma vez — o observer é desconectado após o primeiro cruzamento.
 */
export function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: RevealTag;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      className={`deck-reveal ${className ?? ""}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
