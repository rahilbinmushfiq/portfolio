'use client';

import developerCodingImage from "@/public/developerCoding.svg";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
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
      isMobileScreen = window.screen.width < window.screen.height,
      isScreenTooSmall = (window.screen.width < 350) || (window.screen.height < 800),
      isMobileScreenTooSmall = isMobileScreen && isScreenTooSmall,
      isDesktop = window.screen.width >= 1280,
      // Get the elements needed for animation from their references
      sectionElement = sectionRef.current,
      textElements = textRefs.current.children,
      imageElement = imageRef.current,
      buttonElements = buttonRefs.current.children,
      indicatorTextElement = isDesktop ?
        desktopIndicatorRef.current.firstChild
        : mobileIndicatorRef.current.firstChild,
      indicatorIconElement = isDesktop ?
        desktopIndicatorRef.current.lastChild
        : mobileIndicatorRef.current.lastChild;

    const ctx = gsap.context(() => {
      // Initialize the timeline for on-scroll reveal animation (when the section comes into view)
      const tl = gsap.timeline({
        delay: 0.5,
        scrollTrigger: {
          trigger: isMobileScreenTooSmall ? '#home' : sectionElement,
          start: `top-=${headerOffsetHeight} center`,
          end: `bottom-=${headerOffsetHeight} center`,
          toggleActions: 'restart reset restart reset',
        },
        defaults: { autoAlpha: 0, duration: 0.5, ease: 'power1.out' },
      });

      // The on-scroll reveal animation in timeline
      tl.set(sectionElement, { autoAlpha: 1 })
        .from(textElements, { y: 25, stagger: { amount: 0.45 } })
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

  // Function that handles hero button click event to scroll down to its corresponding section
  const handleHeroButtonClick = (event) => {
    event.preventDefault();

    gsap.registerPlugin(ScrollToPlugin);
    gsap.to(window, {
      duration: 0.5,
      ease: 'power1.inOut',
      scrollTo: {
        y: event.target.hash,
        offsetY: window.innerWidth < 1024 ? 80 : 86,
      },
    });
  };

  return (
    <section id="hero" ref={sectionRef} className="home-section invisible flex flex-col justify-center min-h-[98vh] pt-12 mt-[80px] xs:min-h-0 xs:h-[calc(100dvh_-_80px)] xs:pt-0 lg:mt-[86px] lg:h-[calc(100dvh_-_86px)] landscape:min-h-0 landscape:pt-0">
      <div className="grow flex flex-col gap-y-4 xl:flex-row xl:gap-y-0">
        <div className="grow flex flex-col justify-center gap-y-8 px-6 xs:gap-y-12 sm:max-h-[25rem] sm:px-12 md:px-16 lg:max-h-[30rem] lg:px-20 xl:grow-0 xl:basis-[45%] xl:gap-y-16 xl:max-h-none xl:pr-0 xl:pl-36 2xl:basis-[38%] 2xl:gap-y-20 2xl:pl-56 3xl:pl-[28rem]">
          {/* Hero Section Header */}
          <div ref={textRefs} className="space-y-3 lg:space-y-5 xl:space-y-7">
            <h2 className="-mb-2 text-sm font-medium xs:text-base sm:text-xl xl:-mb-4 xl:font-medium xl:text-lg 3xl:text-xl dpr-lg:text-base">
              Hi, I&apos;m <span className="text-primary-base">Rahil Bin Mushfiq</span>.
            </h2>
            <h1 className="font-semibold text-5xl/[1.15] xs:text-[3.5rem]/[1.15] lg:text-7xl/[1.15] xl:text-6xl/[1.15] 2xl:text-[5.5rem]/[1.15] 3xl:text-8xl/[1.2] dpr-lg:text-6xl/[1.15] dpr-xl:text-[3.5rem]/[1.15]">
              Frontend Developer.
            </h1>
            <p className="text-gray-600">
              I create unique and intuitive web experiences with a focus on clean code and user-centered design.
            </p>
          </div>
          {/* Hero Section Buttons */}
          <div ref={buttonRefs} className="flex gap-x-4 [&>button]:hero-button dpr-lg:gap-x-3">
            <button className="bg-primary-base text-white hover:bg-primary-light">
              <Link href="/#portfolio" onClick={handleHeroButtonClick}>
                See my work
              </Link>
            </button>
            <button className="text-primary-base hover:bg-primary-light hover:text-white">
              <Link href="/#contact" onClick={handleHeroButtonClick}>
                Contact me
              </Link>
            </button>
          </div>
        </div>
        {/* Hero Section Image */}
        <div ref={imageRef} className="flex justify-center items-center px-6 py-12 xs:py-0 sm:px-12 md:px-16 xl:grow xl:px-20 2xl:px-24 3xl:pr-12 3xl:pl-32 landscape:py-0">
          <Image className="w-full h-auto" src={developerCodingImage} alt="developer coding" priority />
        </div>
      </div>
      {/* Mobile Swipe-Indicator */}
      <div ref={mobileIndicatorRef} className="indicator-wrapper hidden xs:flex xl:hidden">
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
