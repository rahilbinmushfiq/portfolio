'use client';

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const pathname = usePathname();

  // References of the elements needed for animation
  const footerRef = useRef(null),
    textRef = useRef(null);

  // Footer text on-scroll reveal animation (when the footer element comes into view)
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.fromTo(textRef.current, {
      autoAlpha: 0,
      y: 30,
    }, {
      autoAlpha: 1,
      y: 0,
      scrollTrigger: footerRef.current,
      delay: 0.5,
      duration: 0.5,
      ease: 'power1.out',
    });

    return () => tween.revert(); // Clean up the GSAP animations when the component unmounts
  }, []);

  // Refresh scrollTrigger instance to re-calculate its start and end on route change
  useLayoutEffect(() => {
    ScrollTrigger.refresh();
  }, [pathname]);

  return (
    <footer ref={footerRef} className="py-5 overflow-hidden bg-neutral-100">
      <p ref={textRef} className="invisible text-[11px] text-center text-neutral-700 xs:text-xs sm:text-sm 3xl:text-base">
        Copyright &copy; <span className="font-medium">Rahil Bin Mushfiq</span>. All Rights Reserved
      </p>
    </footer>
  );
}
