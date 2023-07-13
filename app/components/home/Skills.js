'use client';

import thoughtProcessImage from "@/public/thoughtProcess.svg";
import { techStack } from "@/app/data/techStack";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Skills() {
  // References of the elements needed for animation
  const sectionRef = useRef(null),
    sectionContainerRef = useRef(null),
    sectionHeaderRef = useRef(null),
    imageRef = useRef(null),
    techStackRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const headerOffsetHeight = document.querySelector('header').offsetHeight,
      // Get the elements needed for animation from their references
      sectionElement = sectionRef.current,
      sectionContainerElement = sectionContainerRef.current,
      sectionHeaderElements = sectionHeaderRef.current.children,
      headingUnderlineElement = sectionHeaderRef.current.firstChild.firstChild,
      imageElement = imageRef.current,
      techElements = [...techStackRef.current.children];

    const ctx = gsap.context(() => {
      // Initialize the timeline for on-scroll reveal animation (when the section comes into view)
      const tl = gsap.timeline({
        delay: 0.5,
        scrollTrigger: {
          trigger: sectionElement,
          start: `top-=${headerOffsetHeight} bottom`,
          end: `bottom-=${headerOffsetHeight} top`,
          toggleActions: 'restart reset restart reset',
        },
        defaults: { autoAlpha: 0, duration: 0.5, ease: 'power1.out' },
      });

      // The on-scroll reveal animation in timeline
      tl.from(sectionContainerElement, {})
        .from(sectionHeaderElements, { y: 25, stagger: { amount: 0.2 } }, '<')
        .from(imageElement, { y: 50 }, '<')
        .from(techElements, { y: 35, stagger: { amount: 0.5 } }, '<')
        .from(headingUnderlineElement, { transformOrigin: 'center left', scaleX: 0 }, '<0.35');
    });

    return () => ctx.revert(); // Clean up the GSAP animations when the component unmounts
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="home-section h-[calc(100vh_-_80px)] bg-neutral-100 lg:h-[calc(100vh_-_86px)]">
      <div ref={sectionContainerRef} className="invisible w-full h-full p-6 sm:px-12 md:px-16 lg:px-20 xl:flex xl:pl-6 xl:pr-36 2xl:pr-56">
        {/* Section Image */}
        <div ref={imageRef} className="hidden xl:flex xl:justify-center xl:items-center xl:pr-14 2xl:pr-24">
          <Image className="w-full h-auto" src={thoughtProcessImage} alt="Thought Process" priority />
        </div>
        <div className="flex flex-col justify-center gap-y-12 h-full xl:basis-4/5 xl:gap-y-10 2xl:basis-[45%] 2xl:gap-y-14">
          {/* Section Header */}
          <div ref={sectionHeaderRef} className="section-header">
            <h3><span />Skills</h3>
            <p>My attention to detail in design and code results in pixel-perfect websites with beautiful, responsive, and functional interfaces that delight users.</p>
          </div>
          {/* Tech Stack */}
          <div ref={techStackRef} className="grid grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-5 md:gap-9 lg:gap-11 xl:gap-6 2xl:gap-7">
            {techStack.map(({ techName, techWebsite, techLogo }) => (
              <Link
                key={techName}
                href={techWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-1 flex flex-col items-center gap-y-3 py-5 rounded-sm cursor-pointer bg-neutral-50 shadow-lg transition-shadow duration-200 ease-in hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.15)] sm:py-8 md:py-9 lg:py-10 xl:py-6 2xl:py-8"
              >
                <div className="relative flex justify-center items-center w-9 h-9 sm:w-11 sm:h-11 xl:max-2xl:w-10 xl:max-2xl:h-10">
                  <Image
                    className="object-contain"
                    src={techLogo}
                    fill
                    sizes="300px"
                    alt={techName}
                  />
                </div>
                <p className="text-xs font-medium text-gray-600 2xl:text-sm">{techName}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
