"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/device";

const items = [
  "Tree Felling",
  "Timber Harvesting",
  "Land Clearing",
  "Stump Grinding",
  "Storm Response",
  "Arborist Reports",
  "Mulching",
  "Site Rehabilitation",
];

export function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Touch uses pure CSS animation — GSAP inline transforms block it
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

      gsap.to(track.current, {
        xPercent: -50,
        repeat: -1,
        duration: 28,
        ease: "none",
      });
    },
    { scope: track },
  );

  return (
    <div className="relative overflow-hidden border-y border-line bg-forest py-6 text-ink">
      <div ref={track} className="marquee-track flex w-max shrink-0">
        {[...items, ...items].map((it, i) => (
          <div key={i} className="flex shrink-0 items-center">
            <span className="px-8 font-display text-3xl font-light tracking-tight md:text-4xl">
              {it}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-clay-soft" />
          </div>
        ))}
      </div>
    </div>
  );
}
