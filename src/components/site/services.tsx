"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { Badge } from "@/components/ui/badge";
import { img } from "@/lib/images";

const services = [
  { n: "01", title: "Precision Felling", tag: "Directional · Sectional · Rigging", image: img.redwoods },
  { n: "02", title: "Timber Harvesting", tag: "Selective · Mechanised · Sustainable", image: img.pines },
  { n: "03", title: "Land Clearing", tag: "Lots · Blocks · Development sites", image: img.aerial },
  { n: "04", title: "Stump Grinding", tag: "Below-grade · On-site mulching", image: img.trail },
  { n: "05", title: "Storm Response", tag: "24/7 · Make-safe · Insurance reports", image: img.fogForest },
  { n: "06", title: "Arborist Reports", tag: "Assessments · Permits · Compliance", image: img.canopy },
];

export function Services() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      // heading line reveal
      const split = new SplitText(".services-title", { type: "lines", linesClass: "u-line" });
      split.lines.forEach((l) => {
        const m = document.createElement("span");
        m.className = "u-mask";
        l.parentNode?.insertBefore(m, l);
        m.appendChild(l);
      });
      gsap.from(split.lines, {
        yPercent: 115,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".services-title", start: "top 85%" },
      });

      // row reveal
      gsap.from(".svc-row", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".svc-list", start: "top 80%" },
      });

      // preview follows pointer (desktop)
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const xTo = gsap.quickTo(preview.current, "x", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(preview.current, "y", { duration: 0.5, ease: "power3" });
        const move = (e: PointerEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
        };
        window.addEventListener("pointermove", move);
        return () => {
          window.removeEventListener("pointermove", move);
          split.revert();
        };
      }
      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section id="services" ref={root} className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Badge>Capabilities</Badge>
            <h2 className="services-title mt-7 font-display text-5xl font-light leading-[0.95] tracking-tight md:text-7xl">
              From stump
              <br />
              to skyline.
            </h2>
          </div>
          <p className="max-w-xs text-ink-soft text-balance">
            One crew, one contact, one insurance policy — the whole job handled
            end to end, no sub-contractor juggling.
          </p>
        </div>

        <div className="svc-list mt-14 border-t border-ink/15">
          {services.map((s, i) => (
            <a
              key={s.n}
              href="#work"
              className="svc-row group relative flex items-center justify-between gap-6 border-b border-ink/15 py-7 md:py-9"
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
            >
              <div className="flex items-baseline gap-5 md:gap-10">
                <span className="font-mono text-xs text-ink-mute md:text-sm">
                  ({s.n})
                </span>
                <h3 className="font-display text-3xl font-light tracking-tight transition-all duration-500 group-hover:translate-x-3 group-hover:text-clay md:text-6xl">
                  {s.title}
                </h3>
              </div>
              <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-mute transition-opacity duration-300 group-hover:opacity-100 md:block md:opacity-60">
                {s.tag}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* cursor-following preview */}
      <div
        ref={preview}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
        style={{ marginLeft: "-8rem", marginTop: "-10rem" }}
      >
        {services.map((s, i) => (
          <div
            key={s.n}
            className="media absolute h-64 w-56 overflow-hidden rounded-md transition-all duration-500"
            style={{
              opacity: active === i ? 1 : 0,
              transform: active === i ? "scale(1) rotate(-3deg)" : "scale(0.85) rotate(-3deg)",
            }}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              sizes="224px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
