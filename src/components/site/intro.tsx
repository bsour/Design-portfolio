"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { img } from "@/lib/images";
import { Badge } from "@/components/ui/badge";

const statement =
  "We treat every site like a commission. Read the land, respect what stays, remove what must go — and leave the ground better than we found it.";

export function Intro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = new SplitText(".intro-statement", { type: "words" });
      gsap.set(split.words, { opacity: 0.2 });
      gsap.to(split.words, {
        opacity: 1,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: ".intro-statement",
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        },
      });
      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section id="studio" ref={root} className="relative py-24 md:py-36">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 md:px-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="media grain relative aspect-[4/5] overflow-hidden rounded-md lg:aspect-[5/6]">
          <div className="absolute inset-0" data-speed="0.9">
            <Image
              src={img.trunks}
              alt="Sunlit stand of tall tree trunks"
              fill
              sizes="(max-width:1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <span className="liquid-glass-chip absolute bottom-5 left-5 z-10 px-3.5 py-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-paper">
            Fig. 01 — Selective harvest
          </span>
        </div>

        <div>
          <Badge>The studio</Badge>
          <p className="intro-statement mt-8 font-display text-3xl font-light leading-[1.18] tracking-tight md:text-[2.9rem]">
            {statement}
          </p>
          <div className="mt-10 flex items-center gap-8 border-t border-ink/15 pt-6">
            <div>
              <div className="font-display text-2xl">Licensed</div>
              <div className="eyebrow mt-1">Fully insured</div>
            </div>
            <div>
              <div className="font-display text-2xl">Certified</div>
              <div className="eyebrow mt-1">Arborists on crew</div>
            </div>
            <div>
              <div className="font-display text-2xl">Local</div>
              <div className="eyebrow mt-1">Victoria wide</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
