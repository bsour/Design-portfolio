export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Touch phones/tablets — ScrollSmoother breaks native scroll here. */
export function isTouchDevice() {
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
}

export function useNativeScroll() {
  return prefersReducedMotion() || isTouchDevice();
}
