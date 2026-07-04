"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Two-part cursor: a precise dot that tracks instantly and a ring that
 * lags with easing. The ring scales up over interactive elements.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const xDot = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const yDot = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const xRing = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const yRing = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });

    const move = (e: PointerEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor='hover']")) {
        gsap.to(ring.current, { scale: 1.9, borderColor: "var(--clay)", duration: 0.3 });
        gsap.to(dot.current, { scale: 0, duration: 0.3 });
      }
    };
    const out = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor='hover']")) {
        gsap.to(ring.current, { scale: 1, borderColor: "var(--ink)", duration: 0.3 });
        gsap.to(dot.current, { scale: 1, duration: 0.3 });
      }
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerout", out);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerout", out);
    };
  });

  return (
    <>
      <div ref={ring} className="cursor-ring hidden md:block" aria-hidden />
      <div ref={dot} className="cursor-dot hidden md:block" aria-hidden />
    </>
  );
}
