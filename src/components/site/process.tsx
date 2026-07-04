"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { Badge } from "@/components/ui/badge";
import { img } from "@/lib/images";

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
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;

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
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      id="process"
      ref={root}
      className="relative min-h-dvh overflow-hidden border-y border-line bg-paper-2"
    >
      <div className="pointer-events-none absolute left-6 top-28 z-10 md:left-12">
        <Badge>The method</Badge>
        <h2 className="mt-5 max-w-md font-display text-4xl font-light leading-[0.95] tracking-tight md:text-6xl">
          A calm site is a <span className="italic-accent text-clay">safe</span>{" "}
          site.
        </h2>
      </div>

      <div
        ref={track}
        className="flex h-dvh items-center gap-6 px-6 will-change-transform md:gap-10 md:px-12"
      >
        <div className="w-[44vw] shrink-0 md:w-[40vw]" />

        {steps.map((s) => (
          <article
            key={s.n}
            className="group relative flex h-[64vh] w-[84vw] shrink-0 overflow-hidden rounded-lg border border-line bg-paper sm:w-[64vw] md:w-[52vw] lg:w-[40vw]"
          >
            <div className="media grain relative w-1/2 shrink-0 overflow-hidden">
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="30vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
            </div>
            <div className="flex w-1/2 flex-col justify-between p-8">
              <span className="font-display text-7xl font-light text-ink/15">
                {s.n}
              </span>
              <div>
                <span className="eyebrow">Step {s.n}</span>
                <h3 className="mt-3 font-display text-3xl font-light tracking-tight md:text-4xl">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  {s.desc}
                </p>
              </div>
            </div>
          </article>
        ))}

        <div className="w-[12vw] shrink-0" />
      </div>

      <div className="absolute inset-x-6 bottom-8 z-10 h-px overflow-hidden bg-ink/15 md:inset-x-12">
        <div className="process-progress h-full w-full origin-left scale-x-0 bg-clay" />
      </div>
    </section>
  );
}
