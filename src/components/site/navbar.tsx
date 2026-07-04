"use client";

import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { isTouchDevice } from "@/lib/device";
import { LinkButton } from "./link-button";
import { Magnetic } from "./magnetic";
import { cn } from "@/lib/utils";

const links = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
];

export function Navbar() {
  const nav = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(
    () => {
      const touch = isTouchDevice();

      if (touch) {
        gsap.set(nav.current, { y: 0, opacity: 1, clearProps: "transform" });
      } else {
        gsap.from(nav.current, {
          yPercent: -120,
          opacity: 0,
          duration: 1.1,
          delay: 0.4,
          ease: "power3.out",
        });
      }

      ScrollTrigger.create({
        start: 40,
        onUpdate: (self) => setScrolled(self.scroll() > 40),
        invalidateOnRefresh: true,
      });
    },
    { scope: nav },
  );

  return (
    <header
      ref={nav}
      className="pointer-events-auto fixed inset-x-0 top-0 z-[200] px-4 pt-4 md:px-6"
    >
      <div
        className={cn(
          "relative z-[201] mx-auto flex max-w-[1600px] items-center justify-between rounded-full border border-line bg-paper/70 px-4 py-2.5 backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 md:px-5",
          scrolled &&
            "bg-paper/80 py-2 shadow-[0_10px_40px_-20px_rgba(22,19,13,0.4)]",
        )}
      >
        <a href="#top" className="flex items-center gap-3 pl-1">
          <span className="font-display text-xl font-semibold tracking-tight">
            IRONBARK
          </span>
          <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-mute sm:block">
            ® Forestry Studio
          </span>
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative rounded-full px-4 py-2 text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
              <span className="absolute inset-x-4 bottom-1.5 h-px origin-left scale-x-0 bg-clay transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Magnetic strength={0.4}>
            <LinkButton href="#contact" size="sm" variant="clay">
              Get a quote
            </LinkButton>
          </Magnetic>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="relative z-[202] grid h-10 w-10 touch-manipulation place-items-center rounded-full border border-line lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="relative z-[201] mx-auto mt-2 max-w-[1600px] rounded-3xl border border-line bg-paper/95 p-4 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-display text-2xl text-ink-soft hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <LinkButton href="#contact" variant="clay" className="mt-3 w-full">
              Get a quote
            </LinkButton>
          </nav>
        </div>
      )}
    </header>
  );
}
