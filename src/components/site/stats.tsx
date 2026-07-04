"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/device";

const stats = [
  { value: 9800, suffix: "+", label: "Trees safely felled", format: true },
  { value: 20, suffix: "yrs", label: "On the tools" },
  { value: 100, suffix: "%", label: "Timber & mulch recycled" },
  { value: 4.9, suffix: "/5", label: "Average client rating", decimals: 1 },
];

/** Hardcoded on small screens — GSAP counters are unreliable on touch */
const mobileStats = [
  { display: "9,800", suffix: "+", label: "Trees safely felled" },
  { display: "20", suffix: "yrs", label: "On the tools" },
  { display: "100", suffix: "%", label: "Timber & mulch recycled" },
  { display: "4.9", suffix: "/5", label: "Average client rating" },
];

const gridClass =
  "mx-auto grid max-w-[1600px] grid-cols-2 gap-y-12 px-6 md:grid-cols-4 md:px-12";

export function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const runCounters = () => {
        gsap.utils.toArray<HTMLElement>(".stat-num-desktop").forEach((el) => {
          if (el.dataset.animated === "true") return;
          el.dataset.animated = "true";

          const end = Number(el.dataset.value);
          const decimals = Number(el.dataset.decimals ?? 0);
          const format = el.dataset.format === "true";
          const obj = { v: 0 };

          gsap.to(obj, {
            v: end,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = format
                ? Math.round(obj.v).toLocaleString()
                : obj.v.toFixed(decimals);
            },
          });
        });
      };

      gsap.from(".stat-item-desktop", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 82%",
          once: true,
          onEnter: runCounters,
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative border-y border-line bg-forest py-20 text-ink md:py-28">
      {/* Touch devices — static values, no ScrollTrigger */}
      <div className={`stats-touch ${gridClass}`}>
        {mobileStats.map((s) => (
          <div key={s.label} className="stat-item">
            <div className="flex items-baseline font-display text-6xl font-light tracking-tight md:text-7xl">
              <span className="stat-num">{s.display}</span>
              <span className="text-clay-soft">{s.suffix}</span>
            </div>
            <span className="mt-3 block max-w-44 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink/55">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Desktop pointer — animated counters */}
      <div className={`stats-desktop ${gridClass}`}>
        {stats.map((s) => (
          <div key={s.label} className="stat-item-desktop">
            <div className="flex items-baseline font-display text-6xl font-light tracking-tight md:text-7xl">
              <span
                className="stat-num-desktop"
                data-value={s.value}
                data-decimals={"decimals" in s ? (s.decimals ?? 0) : 0}
                data-format={"format" in s && s.format ? "true" : "false"}
              >
                0
              </span>
              <span className="text-clay-soft">{s.suffix}</span>
            </div>
            <span className="mt-3 block max-w-44 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink/55">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
