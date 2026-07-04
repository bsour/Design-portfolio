"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { Magnetic } from "./magnetic";
import { LinkButton } from "./link-button";
import { img } from "@/lib/images";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

      const split = new SplitText(".hero-h1", { type: "lines", linesClass: "u-line" });
      // wrap each line in a mask
      split.lines.forEach((l) => {
        const mask = document.createElement("span");
        mask.className = "u-mask";
        l.parentNode?.insertBefore(mask, l);
        mask.appendChild(l);
      });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      if (!reduce) {
        tl.set(root.current, { autoAlpha: 1 })
          .from(".hero-frame", {
            clipPath: "inset(100% 0% 0% 0%)",
            duration: 1.4,
            ease: "power4.inOut",
          })
          .from(
            ".hero-image-color",
            { scale: 1.35, duration: 1.6, ease: "power3.out" },
            "<",
          )
          .from(
            split.lines,
            { yPercent: 115, duration: 1.1, stagger: 0.12 },
            "-=0.9",
          )
          .from(
            ".hero-fade",
            { y: 24, opacity: 0, stagger: 0.1, duration: 0.9 },
            "-=0.8",
          );
      } else {
        gsap.set(root.current, { autoAlpha: 1 });
      }

      // Parallax the hero photo via ScrollTrigger (reliable with fill images)
      if (!reduce) {
        gsap.fromTo(
          ".hero-parallax",
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      // Globe spotlight — B&W inside the orb, smooth cursor follow
      if (!reduce && canHover && frame.current && root.current) {
        const el = frame.current;
        const section = root.current;
        const spot = { x: 0, y: 0, o: 0 };

        const paint = () => {
          el.style.setProperty("--spot-x", `${spot.x}px`);
          el.style.setProperty("--spot-y", `${spot.y}px`);
          el.style.setProperty("--spot-opacity", String(spot.o));
        };

        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          gsap.to(spot, {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            o: 1,
            duration: 0.55,
            ease: "power3.out",
            onUpdate: paint,
            overwrite: "auto",
          });
        };
        const onLeave = () => {
          gsap.to(spot, {
            o: 0,
            duration: 0.35,
            ease: "power2.out",
            onUpdate: paint,
            overwrite: "auto",
          });
        };

        section.addEventListener("mousemove", onMove);
        section.addEventListener("mouseleave", onLeave);

        return () => {
          section.removeEventListener("mousemove", onMove);
          section.removeEventListener("mouseleave", onLeave);
          split.revert();
        };
      }

      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-dvh flex-col justify-end pb-10 pt-28 opacity-0"
    >
      {/* Full-bleed graded photograph with parallax + globe spotlight */}
      <div
        ref={frame}
        className="hero-frame grain absolute inset-0 -z-10 overflow-hidden bg-forest"
      >
        <div className="hero-parallax absolute inset-x-0 -inset-y-[8%] w-full">
          <Image
            src={img.heroForest}
            alt=""
            fill
            priority
            sizes="100vw"
            aria-hidden
            className="hero-image-color object-cover [filter:saturate(0.85)_contrast(1.03)_brightness(0.97)]"
          />
          {/* grade overlay (replaces .media::after) */}
          <div className="pointer-events-none absolute inset-0 bg-forest/15 mix-blend-multiply" />
        </div>

        {/* B&W layer revealed inside the globe orb */}
        <div className="hero-spotlight hero-parallax absolute inset-x-0 -inset-y-[8%] w-full">
          <Image
            src={img.heroForest}
            alt="Misty old-growth forest at dawn"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Globe shadow ring */}
        <div className="hero-globe-ring z-[3]" aria-hidden />

        {/* legibility scrim */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-paper via-paper/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 z-[2] h-40 bg-gradient-to-b from-paper/70 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-12">
        {/* top meta row */}
        <div className="hero-fade mb-auto flex justify-end font-mono text-[0.7rem] uppercase tracking-[0.24em]">
          <span className="bg-clay px-2 py-1 text-[#0a0b07]">
            Victoria, Australia · Est. 2004
          </span>
        </div>

        <div className="mt-10 md:mt-12">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <h1 className="hero-h1 display-xl text-[13vw] font-medium leading-[0.9] tracking-[-0.03em] text-ink sm:text-[10vw] lg:text-[6.5rem]">
              We bring down
              <br />
              giants with{" "}
              <span className="italic-accent font-normal">grace.</span>
            </h1>
          </div>

          <div className="flex flex-col gap-8 lg:pb-4">
            <p className="hero-fade max-w-sm text-lg leading-relaxed text-ink-soft text-balance">
              A modern crew handling felling, harvesting, clearing and
              rehabilitation — with the craft, safety and finish of a design
              studio.
            </p>
            <div className="hero-fade flex flex-wrap items-center gap-4">
              <Magnetic strength={0.5}>
                <LinkButton href="#contact" size="lg" variant="solid">
                  Start a project
                  <ArrowDownRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                </LinkButton>
              </Magnetic>
              <Magnetic strength={0.35}>
                <LinkButton href="#work" size="lg" variant="outline">
                  View our work
                </LinkButton>
              </Magnetic>
            </div>
          </div>
        </div>

          {/* baseline stat rule */}
          <div className="hero-fade mt-10 grid grid-cols-2 gap-6 border-t border-ink/15 pt-6 sm:grid-cols-4">
            {[
              ["20+", "Years on the tools"],
              ["9,800", "Trees felled safely"],
              ["0", "Lost-time incidents"],
              ["100%", "Timber recycled"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl font-medium md:text-4xl">
                  {n}
                </div>
                <div className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-mute">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
