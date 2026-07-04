import { ScrollSmoother } from "@/lib/gsap";

const NAV_OFFSET = 88;

export function scrollToSection(selector: string) {
  const target = document.querySelector(selector);
  if (!target) return false;

  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(target, true, `top ${NAV_OFFSET}px`);
    return true;
  }

  const top =
    target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}

export function handleAnchorClick(event: MouseEvent) {
  const anchor = (event.target as Element | null)?.closest("a[href]");
  if (!anchor) return;

  const href = anchor.getAttribute("href");
  if (!href?.startsWith("#") || href.length < 2) return;

  event.preventDefault();
  scrollToSection(href);
}
