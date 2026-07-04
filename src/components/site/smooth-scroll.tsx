"use client";

import { useRef } from "react";
import { ScrollSmoother, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { handleAnchorClick } from "@/lib/scroll-to";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Always start at hero on refresh — never restore a prior section hash.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
    wrapper.current?.scrollTo(0, 0);

    document.addEventListener("click", handleAnchorClick);

    if (reduce) {
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

    const onLoad = () => {
      smoother.scrollTop(0);
      ScrollTrigger.refresh();
    };
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
