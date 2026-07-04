"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Badge } from "@/components/ui/badge";

const quotes = [
  {
    quote:
      "They dropped a thirty-metre gum three feet from our roofline without so much as a cracked tile. Absolute pros.",
    name: "Rachel M.",
    role: "Homeowner · Warrandyte",
  },
  {
    quote:
      "We contract IRONBARK for all council storm work. Fast, documented, and their safety record speaks for itself.",
    name: "Daniel O.",
    role: "Ops Manager · Shire Works",
  },
  {
    quote:
      "Cleared a four-acre block in two days and left it graded and mulched. Ready to build on Monday.",
    name: "Priya S.",
    role: "Developer · Macedon Ranges",
  },
];

export function Testimonials() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".quote-card", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Badge>Word of mouth</Badge>
        <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-3">
          {quotes.map((q) => (
            <figure key={q.name} className="quote-card flex flex-col">
              <span className="font-display text-5xl leading-none text-clay">
                &ldquo;
              </span>
              <blockquote className="mt-4 font-display text-xl font-light leading-relaxed tracking-tight md:text-2xl">
                {q.quote}
              </blockquote>
              <figcaption className="mt-8 border-t border-ink/15 pt-4">
                <span className="block font-display text-lg">{q.name}</span>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-mute">
                  {q.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
