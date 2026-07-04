"use client";

import { useRef } from "react";
import { ScrollSmoother, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Browser scroll restoration fights ScrollSmoother's wrapper scroll and
    // can land the page mid-way (often on a pinned section like Process).
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    wrapper.current?.scrollTo(0, 0);

    if (reduce) return;

    const smoother = ScrollSmoother.create({
      wrapper: wrapper.current!,
      content: content.current!,
      smooth: 1.15,
      effects: true,
      normalizeScroll: true,
    });

    smoother.scrollTop(0);
    ScrollTrigger.refresh();

    // Recalculate pin/parallax distances once images finish loading
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      smoother.kill();
    };
  });

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content" ref={content}>
        {children}
      </div>
    </div>
  );
}
