"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SlideInOnScroll({
  children,
  direction = "left",
  duration = 1,
  delay = 0,
}: {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  duration?: number;
  delay?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    const triggerEl = containerRef.current;
    if (!el || !triggerEl) return;

    const distance = 100;
    const fromVars: gsap.TweenVars = {
      opacity: 0,
      x:
        direction === "left" ? -distance : direction === "right" ? distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
    };

    gsap.fromTo(el, fromVars, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: triggerEl,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [direction, duration, delay]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        overflow: "visible", // ensures hidden overflow won't cut off animation
      }}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
