"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { Badge } from "@/components/ui/badge";
import { img } from "@/lib/images";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  location: string;
  type: string;
  year: string;
  image: string;
  ratio: string;
  offset?: string;
};

const projects: Project[] = [
  { title: "Ridgeline pine harvest", location: "Otway Ranges", type: "Timber Harvesting", year: "’25", image: img.pines, ratio: "aspect-[4/5]" },
  { title: "Storm-down blue gum", location: "Dandenong", type: "Emergency Response", year: "’25", image: img.fogForest, ratio: "aspect-[4/3]", offset: "lg:mt-24" },
  { title: "Lifestyle block clear", location: "Macedon", type: "Land Clearing", year: "’24", image: img.aerial, ratio: "aspect-[4/3]" },
  { title: "Riverside rehab", location: "Yarra Valley", type: "Site Restoration", year: "’24", image: img.trail, ratio: "aspect-[4/5]", offset: "lg:mt-24" },
];

function Tile({ p }: { p: Project }) {
  return (
    <a
      href="#"
      className={cn("project-tile group block", p.offset)}
      data-cursor="hover"
    >
      <div className={cn("media grain relative overflow-hidden rounded-md", p.ratio)}>
        <div className="tile-bg absolute inset-x-0 -top-[10%] h-[120%]">
          <Image
            src={p.image}
            alt={p.title}
            fill
            sizes="(max-width:1024px) 100vw, 45vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
        </div>
        <span className="absolute right-4 top-4 z-10 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-paper text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-light tracking-tight transition-colors duration-300 group-hover:text-clay md:text-3xl">
            {p.title}
          </h3>
          <span className="mt-1 block text-sm text-ink-mute">
            {p.type} · {p.location}
          </span>
        </div>
        <span className="font-mono text-xs text-ink-mute">{p.year}</span>
      </div>
    </a>
  );
}

export function Showcase() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = new SplitText(".work-title", { type: "lines", linesClass: "u-line" });
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
        scrollTrigger: { trigger: ".work-title", start: "top 85%" },
      });

      // internal parallax on each tile image
      gsap.utils.toArray<HTMLElement>(".tile-bg").forEach((bg) => {
        gsap.fromTo(
          bg,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: bg,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      gsap.from(".project-tile", {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".tile-grid", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="work" ref={root} className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Badge>Selected work</Badge>
            <h2 className="work-title mt-7 font-display text-5xl font-light leading-[0.95] tracking-tight md:text-7xl">
              Big jobs.
              <br />
              <span className="italic-accent text-clay">Clean</span> finishes.
            </h2>
          </div>
          <p className="max-w-xs text-ink-soft text-balance">
            A snapshot of recent fells, clears and rehabilitations across the
            region.
          </p>
        </div>

        <div className="tile-grid mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2">
          {projects.map((p) => (
            <Tile key={p.title} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
