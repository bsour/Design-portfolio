"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const stats = [
  { value: 9800, suffix: "+", label: "Trees safely felled", format: true },
  { value: 20, suffix: "yrs", label: "On the tools" },
  { value: 100, suffix: "%", label: "Timber & mulch recycled" },
  { value: 4.9, suffix: "/5", label: "Average client rating", decimals: 1 },
];

export function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const end = Number(el.dataset.value);
        const decimals = Number(el.dataset.decimals ?? 0);
        const format = el.dataset.format === "true";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          onUpdate: () => {
            el.textContent = format
              ? Math.round(obj.v).toLocaleString()
              : obj.v.toFixed(decimals);
          },
        });
      });

      gsap.from(".stat-item", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative border-y border-line bg-forest py-20 text-paper md:py-28">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-y-12 px-6 md:grid-cols-4 md:px-12">
        {stats.map((s) => (
          <div key={s.label} className="stat-item">
            <div className="flex items-baseline font-display text-6xl font-light tracking-tight md:text-7xl">
              <span
                className="stat-num"
                data-value={s.value}
                data-decimals={s.decimals ?? 0}
                data-format={s.format ? "true" : "false"}
              >
                0
              </span>
              <span className="text-clay-soft">{s.suffix}</span>
            </div>
            <span className="mt-3 block max-w-[11rem] font-mono text-[0.68rem] uppercase tracking-[0.16em] text-paper/60">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
