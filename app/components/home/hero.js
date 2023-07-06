'use client';

import hero from "@/public/hero.svg";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function Hero() {
  // References of the elements needed for animation
  const sectionRef = useRef(null),
    textRefs = useRef(null),
    imageRef = useRef(null),
    buttonRefs = useRef(null),
    mobileIndicatorRef = useRef(null),
    desktopIndicatorRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const headerOffsetHeight = document.querySelector('header').offsetHeight,
      isDesktop = window.screen.width >= 1280,
      // Get the elements needed for animation from their references
      sectionElement = sectionRef.current,
      textElements = textRefs.current.children,
      imageElement = imageRef.current,
      buttonElements = buttonRefs.current.children,
      indicatorTextElement = isDesktop ? desktopIndicatorRef.current.firstChild : mobileIndicatorRef.current.firstChild,
      indicatorIconElement = isDesktop ? desktopIndicatorRef.current.lastChild : mobileIndicatorRef.current.lastChild;

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
      tl.from(sectionElement, {})
        .from(textElements, { y: 25, stagger: { amount: 0.45 } }, '<')
        .from(imageElement, { y: 50 }, '<')
        .from(buttonElements, { x: 50, stagger: { amount: 0.2 } }, '<')
        .from(indicatorTextElement, { y: 25 }, '<0.2')
        .set(indicatorIconElement, { autoAlpha: 0, y: isDesktop ? -12 : 8 }, '<0.3')
        .from(indicatorIconElement, {
          keyframes: {
            autoAlpha: [0, 0.9, 1, 0.9, 0],
            y: [-12, -7, -2, 3, 8],
            ease: 'power1.inOut',
            easeEach: 'none',
          },
          repeat: -1,
          duration: 1.25,
          reversed: !isDesktop,
        }, '<');
    });

    return () => ctx.revert(); // Clean up the GSAP animations when the component unmounts
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="invisible home-section flex flex-col justify-center h-[calc(100vh_-_80px)] lg:h-[calc(100vh_-_86px)]">
      <div className="grow flex flex-col gap-y-4 xl:flex-row xl:gap-y-0">
        <div className="max-xl:grow sm:max-h-[25rem] lg:max-h-[30rem] xl:max-h-none flex flex-col justify-center gap-y-12 px-6 sm:px-12 md:px-16 lg:px-20 xl:basis-[40%] xl:gap-y-16 xl:pr-0 xl:pl-36 2xl:basis-[38%] 2xl:gap-y-20 2xl:pl-56">
          {/* Hero Section Header */}
          <div ref={textRefs} className="space-y-3 lg:space-y-5 xl:space-y-7">
            <h2 className="-mb-2 text-base font-medium sm:max-xl:text-xl xl:-mb-4 xl:font-medium xl:text-lg">
              Hi, I&apos;m <span className="text-[#7342D5]">Rahil Bin Mushfiq</span>.
            </h2>
            <h1 className="text-[3.5rem]/[1.15] font-semibold lg:text-7xl xl:text-6xl 2xl:text-[5.5rem]/[1.15]">
              Frontend Developer.
            </h1>
            <p className="text-gray-600">
              I create unique and intuitive web experiences with a focus on clean code and user-centered design.
            </p>
          </div>
          {/* Hero Section Buttons */}
          <div ref={buttonRefs} className="flex gap-x-4 [&>button]:hero-button xl:gap-x-6">
            <button className="bg-[#7342D5] text-white hover:bg-[#864DF8]">See my work</button>
            <button className="text-[#7342D5] hover:bg-[#864DF8] hover:text-white">Contact me</button>
          </div>
        </div>
        {/* Hero Section Image */}
        <div ref={imageRef} className="flex justify-center items-center px-6 sm:px-12 md:px-16 xl:grow xl:pr-0 xl:pl-16 2xl:px-24">
          <Image className="w-full h-auto" src={hero} alt="developer-working" priority />
        </div>
      </div>
      {/* Mobile Swipe-Indicator */}
      <div ref={mobileIndicatorRef} className="indicator-wrapper flex xl:hidden">
        <p>SWIPE UP</p>
        <FaChevronUp />
      </div>
      {/* Desktop Scroll-Indicator */}
      <div ref={desktopIndicatorRef} className="indicator-wrapper hidden xl:flex">
        <p>SCROLL DOWN</p>
        <FaChevronDown />
      </div>
    </section>
  );
}
