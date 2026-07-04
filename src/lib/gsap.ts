"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Register once on the client. Safe to call repeatedly (GSAP dedupes).
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, useGSAP);

ScrollTrigger.config({ ignoreMobileResize: true });

gsap.defaults({ ease: "power3.out", duration: 1 });

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, useGSAP };
