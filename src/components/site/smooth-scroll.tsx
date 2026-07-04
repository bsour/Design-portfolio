"use client";

import { useRef } from "react";
import { ScrollSmoother, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useNativeScroll } from "@/lib/device";
import { handleAnchorClick } from "@/lib/scroll-to";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const native = useNativeScroll();

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
    wrapper.current?.scrollTo(0, 0);

    if (native) {
      wrapper.current?.classList.add("is-native-scroll");
    }

    document.addEventListener("click", handleAnchorClick);

    const refresh = () => ScrollTrigger.refresh();

    if (native) {
      requestAnimationFrame(refresh);
      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);
      window.addEventListener("orientationchange", refresh);
      const t1 = window.setTimeout(refresh, 400);
      const t2 = window.setTimeout(refresh, 1500);

      return () => {
        document.removeEventListener("click", handleAnchorClick);
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
        window.removeEventListener("orientationchange", refresh);
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
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
