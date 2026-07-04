"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { Magnetic } from "./magnetic";
import { img } from "@/lib/images";

export function CTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = new SplitText(".cta-title", { type: "lines", linesClass: "u-line" });
      split.lines.forEach((l) => {
        const m = document.createElement("span");
        m.className = "u-mask";
        l.parentNode?.insertBefore(m, l);
        m.appendChild(l);
      });
      gsap.from(split.lines, {
        yPercent: 120,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: ".cta-title", start: "top 82%" },
      });
      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="media grain relative flex min-h-[92vh] items-center overflow-hidden text-paper"
    >
      <div className="absolute inset-0 -z-0" data-speed="0.9">
        <Image
          src={img.dark}
          alt="Dense dark forest"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-forest/55" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-12">
        <div className="liquid-glass-dark p-8 sm:p-10 md:p-16">
        <span className="eyebrow text-paper/70">
          Free · No-obligation · On-site
        </span>
        <h2 className="cta-title mt-6 font-display text-[13vw] font-light leading-[0.9] tracking-tight md:text-[8.5rem]">
          Got a tree
          <br />
          <span className="italic-accent">problem?</span>
        </h2>

        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-md text-lg leading-relaxed text-paper/80 text-balance">
            Send a photo and a postcode. We&apos;ll walk the site and return a
            fixed quote within 48 hours.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Magnetic strength={0.5}>
              <Button size="lg" variant="clay">
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
            </Magnetic>
            <Magnetic strength={0.35}>
              <Button
                size="lg"
                variant="outline"
                className="border-paper/40 text-paper hover:bg-paper hover:text-ink"
              >
                Call 1800 IRONBARK
              </Button>
            </Magnetic>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
