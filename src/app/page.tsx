import { Cursor } from "@/components/site/cursor";
import { Navbar } from "@/components/site/navbar";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Intro } from "@/components/site/intro";
import { Services } from "@/components/site/services";
import { Process } from "@/components/site/process";
import { Stats } from "@/components/site/stats";
import { Showcase } from "@/components/site/showcase";
import { Sustainability } from "@/components/site/sustainability";
import { Testimonials } from "@/components/site/testimonials";
import { CTA } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <SmoothScroll>
        <main id="top" className="relative">
          <Hero />
          <Marquee />
          <Intro />
          <Services />
          <Process />
          <Stats />
          <Showcase />
          <Sustainability />
          <Testimonials />
          <CTA />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
