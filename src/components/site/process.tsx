"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { isTouchDevice, prefersReducedMotion } from "@/lib/device";
import { Badge } from "@/components/ui/badge";
import { img } from "@/lib/images";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    title: "Walk & assess",
    desc: "A certified arborist walks the site, flags hazards and maps every tree. You get a fixed quote and a clear plan — no surprises.",
    image: img.mistRoad,
  },
  {
    n: "02",
    title: "Plan & permit",
    desc: "We handle council approvals, traffic management and neighbour notices, then schedule around your timeline and the weather.",
    image: img.ridge,
  },
  {
    n: "03",
    title: "Fell & extract",
    desc: "Rigging, directional felling and mechanised extraction. Spotters, exclusion zones and comms keep the site calm and controlled.",
    image: img.dark,
  },
  {
    n: "04",
    title: "Clear & restore",
    desc: "Timber milled or chipped, stumps ground out, ground raked back. We leave the block cleaner than we found it.",
    image: img.canopy,
  },
];

export function Process() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = prefersReducedMotion();
      const touch = isTouchDevice();

      const mm = gsap.matchMedia();

      // Must match the CSS `lg:` breakpoint exactly — otherwise JS can set up
      // the desktop pin/horizontal-scroll while CSS renders the mobile swipe
      // layout (or vice versa), corrupting the pin distance and the layout.
      mm.add("(min-width: 1024px)", () => {
        if (reduce || touch) return;

        const el = track.current!;
        const distance = () => Math.max(el.scrollWidth - window.innerWidth, 0);

        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".process-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          gsap.set(el, { clearProps: "transform" });
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="process"
      ref={root}
      className="relative border-y border-line bg-paper-2 max-lg:py-24 lg:min-h-dvh lg:overflow-hidden"
    >
      <div className="pointer-events-none px-6 max-lg:static max-lg:mb-10 md:left-12 lg:absolute lg:left-6 lg:top-28 lg:z-10 lg:px-0">
        <Badge>The method</Badge>
        <h2 className="mt-5 max-w-md font-display text-4xl font-light leading-[0.95] tracking-tight md:text-6xl">
          A calm site is a <span className="italic-accent text-clay">safe</span>{" "}
          site.
        </h2>
        <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-mute lg:hidden">
          Swipe to explore →
        </p>
      </div>

      <div
        ref={track}
        className={cn(
          "flex gap-6 px-6 md:gap-10 md:px-12",
          "max-lg:snap-x max-lg:snap-mandatory max-lg:overflow-x-auto max-lg:pb-6 max-lg:touch-pan-x",
          "lg:h-dvh lg:items-center lg:overflow-visible",
        )}
      >
        {/* Leading spacer — desktop horizontal scroll offset only */}
        <div className="hidden shrink-0 lg:block lg:w-[40vw]" />

        {steps.map((s) => (
          <article
            key={s.n}
            className={cn(
              "group relative flex shrink-0 overflow-hidden rounded-lg border border-line bg-paper",
              "max-lg:w-[88vw] max-lg:snap-center max-lg:flex-col",
              "lg:h-[64vh] lg:w-[40vw] lg:flex-row",
            )}
          >
            <div
              className={cn(
                "media grain relative shrink-0 overflow-hidden",
                "max-lg:aspect-[4/3] max-lg:w-full",
                "lg:h-full lg:w-1/2",
              )}
            >
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="(max-width: 1024px) 88vw, 30vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
            </div>
            <div className="flex w-full flex-col justify-between p-6 lg:h-full lg:w-1/2 lg:p-8">
              <span className="font-display text-5xl font-light text-ink/15 lg:text-7xl">
                {s.n}
              </span>
              <div>
                <span className="eyebrow">Step {s.n}</span>
                <h3 className="mt-3 font-display text-2xl font-light tracking-tight md:text-3xl lg:text-4xl">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  {s.desc}
                </p>
              </div>
            </div>
          </article>
        ))}

        <div className="hidden w-[12vw] shrink-0 lg:block" />
      </div>

      <div className="absolute inset-x-6 bottom-8 z-10 hidden h-px overflow-hidden bg-ink/15 md:inset-x-12 lg:block">
        <div className="process-progress h-full w-full origin-left scale-x-0 bg-clay" />
      </div>
    </section>
  );
}
