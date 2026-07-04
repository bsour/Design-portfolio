"use client";

import { useRef } from "react";
import { ScrollSmoother, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { handleAnchorClick } from "@/lib/scroll-to";

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

    document.addEventListener("click", handleAnchorClick);

    if (reduce) {
      const hash = window.location.hash;
      if (hash.length > 1) {
        requestAnimationFrame(() => {
          const target = document.querySelector(hash);
          if (target) {
            const top =
              target.getBoundingClientRect().top + window.scrollY - 88;
            window.scrollTo(0, top);
          }
        });
      }
      return () => document.removeEventListener("click", handleAnchorClick);
    }

    const smoother = ScrollSmoother.create({
      wrapper: wrapper.current!,
      content: content.current!,
      smooth: 1.15,
      effects: true,
      normalizeScroll: true,
    });

    smoother.scrollTop(0);
    ScrollTrigger.refresh();

    // Scroll to hash target on load (e.g. /#services)
    const hash = window.location.hash;
    if (hash.length > 1) {
      requestAnimationFrame(() => {
        const target = document.querySelector(hash);
        if (target) smoother.scrollTo(target, false, "top 88px");
      });
    }

    document.addEventListener("click", handleAnchorClick);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
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
