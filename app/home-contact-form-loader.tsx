"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const HomeContactForm = dynamic(() => import("./home-contact-form").then((module) => module.HomeContactForm), { ssr: false });

export function HomeContactFormLoader() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsVisible(true);
      observer.disconnect();
    }, { rootMargin: "320px" });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return <div ref={containerRef} className="contact-form-loader">{isVisible ? <HomeContactForm /> : <div className="contact-form-placeholder" aria-hidden="true" />}</div>;
}
