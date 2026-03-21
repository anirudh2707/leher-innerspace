import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import TangledHead from "../components/TangledHead";
import ContentSections from "../components/ContentSections";

export default function Index() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const journeyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!journeyRef.current) return;
      const rect = journeyRef.current.getBoundingClientRect();
      const height = journeyRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / Math.max(height, 1)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="leher-gradient-bg min-h-screen">
      <Header />

      {/* Hero intro — static */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <HeroSection />
      </section>

      {/* ═══ Scroll-driven animation zone ═══
          The head is sticky inside a tall container.
          As the user scrolls through this zone the lines morph.
          Subtle chapter labels float past in the background. */}
      <div ref={journeyRef} className="relative" style={{ height: "350vh" }}>
        {/* Sticky head — stays centred while user scrolls */}
        <div className="sticky top-0 h-screen flex items-center justify-center z-10 pointer-events-none">
          <div className="w-[280px] md:w-[360px] lg:w-[400px]">
            <TangledHead scrollProgress={scrollProgress} />
          </div>
        </div>

        {/* Scroll chapter markers — minimal, fade in/out */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center">
          {/* ~25% */}
          <div className="absolute top-[22%] w-full text-center">
            <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground/50 font-body animate-fade-in-up">
              the noise within
            </p>
          </div>
          {/* ~50% */}
          <div className="absolute top-[48%] w-full text-center">
            <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground/50 font-body animate-fade-in-up">
              finding awareness
            </p>
          </div>
          {/* ~75% */}
          <div className="absolute top-[72%] w-full text-center">
            <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground/50 font-body animate-fade-in-up">
              discovering clarity
            </p>
          </div>
        </div>
      </div>

      {/* Content sections — standard vertical scroll */}
      <ContentSections />

    </div>
  );
}
