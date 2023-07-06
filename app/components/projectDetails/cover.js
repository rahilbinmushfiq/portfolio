'use client';

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Cover({ projectTitle, projectMockups }) {
  const [activeCoverId, setActiveCoverId] = useState(0); // State to track the active cover image ID
  const coverContainerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Function to manage new active cover id after completing the going-out-of-frame animation
      const handleActiveCoverId = () => {
        /* If the last cover image is reached, reset to the first cover image,
          otherwise, render the next cover image on the carousel
        */
        if (activeCoverId === projectMockups.length - 1) {
          setActiveCoverId(0);
        } else {
          setActiveCoverId(prevActiveCover => prevActiveCover + 1);
        }
      };

      // Cycle through the cover images every 3 seconds with animation
      gsap.to(coverContainerRef.current, {
        keyframes: [
          { xPercent: -100, duration: 0 },
          { autoAlpha: 1, xPercent: 0, delay: 0.25, duration: 0.5, ease: 'power1.inOut' },
          { autoAlpha: 0, xPercent: 100, delay: 2.25, duration: 0.5, ease: 'power1.inOut', onComplete: handleActiveCoverId },
        ],
      });
    });

    return () => ctx.revert(); // Clean up the GSAP animations when the component unmounts
  }, [activeCoverId, projectMockups.length]);

  return (
    <div ref={coverContainerRef} className="invisible relative h-full w-full">
      <Image
        className="object-contain"
        src={projectMockups[activeCoverId]}
        alt={`${projectTitle} Cover`}
        fill
        sizes="50vh"
        priority
      />
    </div>
  );
}
