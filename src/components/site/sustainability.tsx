"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { Badge } from "@/components/ui/badge";
import { img } from "@/lib/images";

const pillars = [
  { k: "01", title: "Zero to landfill", desc: "Timber milled, chipped or donated. Nothing wasted." },
  { k: "02", title: "Replant program", desc: "Three natives planted for every mature tree removed." },
  { k: "03", title: "Certified crews", desc: "Fully ticketed, insured and audited every quarter." },
];

export function Sustainability() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".pillar-row", {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pillars", start: "top 82%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative py-24 md:py-36">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-6 md:px-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <Badge>Cut with a conscience</Badge>
          <h2 className="mt-8 max-w-xl font-display text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
            For every giant we take down,{" "}
            <span className="italic-accent text-clay">more go in the ground.</span>
          </h2>

          <div className="pillars mt-12 border-t border-ink/15">
            {pillars.map((p) => (
              <div
                key={p.k}
                className="pillar-row flex items-start gap-6 border-b border-ink/15 py-6"
              >
                <span className="font-mono text-xs text-ink-mute">({p.k})</span>
                <div>
                  <h3 className="font-display text-2xl font-light tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="media grain relative aspect-[4/5] overflow-hidden rounded-md">
          <div className="absolute inset-0" data-speed="0.9">
            <Image
              src={img.redwoods}
              alt="Towering redwood canopy"
              fill
              sizes="(max-width:1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <span className="liquid-glass-chip absolute bottom-5 left-5 z-10 px-3.5 py-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-paper">
            Fig. 02 — Replanted stand, year three
          </span>
        </div>
      </div>
    </section>
  );
}
