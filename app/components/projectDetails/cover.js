'use client';

import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { gsap } from "gsap";

export default function Cover({ coverContainerRef, projectTitle, projectMockups }) {
  const [isFirstCoverLoaded, setIsFirstCoverLoaded] = useState(false); // State to track the loading status of the first cover image

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isFirstCoverLoaded) {
        const coverContainer = coverContainerRef.current,
          coverImages = [...coverContainer.children];

        // Timeline for infinite cover image cycle animation
        const tl = gsap.timeline({
          delay: 0.25,
          repeat: -1,
          defaults: { duration: 0.75, ease: 'power1.inOut' },
        });

        // Cycle through each of the cover image every 2 seconds with animation
        coverImages.forEach((coverImage, index) => {
          index === 0
            ? tl.set(coverImages, { xPercent: -100 })
            : tl.set(coverContainer, { x: `${-(100 * index)}vw` });

          tl.to(coverImage, { autoAlpha: 1, xPercent: 0 })
            .to(coverImage, { autoAlpha: 0, xPercent: 100 }, '>2');
        });
      }
    });

    return () => ctx.revert(); // Clean up the GSAP animations when the component unmounts
  }, [isFirstCoverLoaded]);

  return (
    <div ref={coverContainerRef} className="flex w-min h-[50vh] py-12 bg-neutral-100">
      {projectMockups.map((projectMockup, index) => (
        <div key={index} className="invisible relative w-screen h-full">
          <Image
            className="object-contain px-6 sm:px-12 md:px-16 lg:px-20 xl:px-0"
            src={projectMockup}
            alt={`${projectTitle} Cover`}
            fill
            sizes="75vh"
            priority={index === 0 ? true : false}
            onLoadingComplete={() => index === 0 && setIsFirstCoverLoaded(true)}
          />
        </div>
      ))}
    </div>
  );
}
