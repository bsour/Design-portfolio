"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { isTouchDevice, prefersReducedMotion } from "@/lib/device";

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
      const touch = isTouchDevice();
      const reduce = prefersReducedMotion();

      const runCounters = () => {
        gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
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

      if (touch || reduce) {
        gsap.set(".stat-item", { opacity: 1, y: 0 });
        ScrollTrigger.create({
          trigger: root.current,
          start: "top 90%",
          once: true,
          onEnter: runCounters,
          invalidateOnRefresh: true,
        });
      } else {
        gsap.from(".stat-item", {
          y: 40,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 82%",
            once: true,
            invalidateOnRefresh: true,
            onEnter: runCounters,
          },
        });
      }

      if (touch) {
        const refresh = () => ScrollTrigger.refresh();
        requestAnimationFrame(refresh);
        window.setTimeout(refresh, 500);
        window.setTimeout(refresh, 1500);
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative border-y border-line bg-forest py-20 text-ink md:py-28">
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
            <span className="mt-3 block max-w-[11rem] font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink/55">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
