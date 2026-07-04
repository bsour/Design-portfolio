"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleMenu = () => setOpen((v) => !v);

  const bar = (
    <>
      <header
        id="site-nav"
        className="pointer-events-auto fixed inset-x-0 top-0 z-[99999] touch-manipulation px-4 pt-4 md:px-6"
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1600px] items-center justify-between rounded-full border border-line bg-paper/95 px-4 py-2.5 md:bg-paper/70 md:px-5 md:backdrop-blur-xl md:backdrop-saturate-150",
            scrolled &&
              "md:bg-paper/80 md:py-2 md:shadow-[0_10px_40px_-20px_rgba(22,19,13,0.4)]",
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
            onClick={toggleMenu}
            className="relative z-[1] grid h-11 min-h-11 w-11 min-w-11 shrink-0 touch-manipulation place-items-center rounded-full border border-line bg-paper active:scale-95 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {open ? (
        <div className="pointer-events-auto fixed inset-0 z-[100000] touch-manipulation lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-ink/50"
            onClick={() => setOpen(false)}
          />
          <nav className="absolute inset-x-4 top-21 rounded-3xl border border-line bg-paper p-4 shadow-2xl">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 font-display text-2xl text-ink-soft hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <LinkButton
              href="#contact"
              variant="clay"
              className="mt-3 w-full"
              onClick={() => setOpen(false)}
            >
              Get a quote
            </LinkButton>
          </nav>
        </div>
      ) : null}
    </>
  );

  if (!mounted) return bar;

  return createPortal(bar, document.body);
}
