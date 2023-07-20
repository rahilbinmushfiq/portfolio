"use client";

import Carousel from "./subsections/portfolio/Carousel";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Portfolio() {
  // References of the elements needed for animation
  const sectionRef = useRef(null),
    headerRef = useRef(null),
    carouselRef = useRef(null),
    projectRef = useRef(null),
    chevronLeftRef = useRef(null),
    chevronRightRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const headerOffsetHeight = document.querySelector('header').offsetHeight,
      isMobileScreen = window.screen.width < window.screen.height,
      isScreenTooSmall = (window.screen.width < 350) || (window.screen.height < 800),
      isMobileScreenTooSmall = isMobileScreen && isScreenTooSmall,
      // Get the elements needed for animation from their references
      sectionElement = sectionRef.current,
      sectionHeaderContainerElement = headerRef.current,
      sectionHeaderElements = headerRef.current.children,
      headingUnderlineElement = headerRef.current.firstChild.firstChild,
      carouselElement = carouselRef.current,
      chevronLeftElement = chevronLeftRef.current,
      chevronRightElement = chevronRightRef.current,
      projects = [...projectRef.current.children];

    const ctx = gsap.context(() => {
      // Initialize the timeline for on-scroll reveal animation (when the section comes into view)
      const tl = gsap.timeline({
        delay: 0.5,
        scrollTrigger: {
          trigger: isMobileScreenTooSmall ? '#home' : sectionElement,
          start: `top-=${headerOffsetHeight} bottom`,
          end: `bottom-=${headerOffsetHeight} top`,
          toggleActions: 'restart reset restart reset',
        },
        defaults: { autoAlpha: 0, duration: 0.5, ease: 'power1.out' }
      });

      // The on-scroll reveal animation in timeline
      tl.from(sectionHeaderContainerElement, {})
        .from(carouselElement, { yPercent: 100, duration: 0.35 }, '<')
        .from(sectionHeaderElements, { y: 25, stagger: 0.2 })
        .from(chevronLeftElement, { x: -50 }, '<')
        .from(chevronRightElement, { x: 50 }, '<')
        .from(headingUnderlineElement, { transformOrigin: 'center left', scaleX: 0 }, '<0.35');;

      projects.forEach(project => {
        // Get the elements (image, details, and buttons) of the project
        const projectImageElement = project.firstChild,
          projectDetailElements = project.lastChild.firstChild.children,
          projectButtonElements = project.lastChild.lastChild.children;

        // Animate the elements of the projects
        tl.from(projectImageElement, { x: -50 }, '<-0.35')
          .from(projectDetailElements, { x: 25, stagger: { amount: 0.4 } }, '<')
          .from(projectButtonElements, { x: 35, duration: 0.4, stagger: { amount: 0.4 } }, '<0.1')
      });
    });

    return () => ctx.revert(); // Clean up the GSAP animations when the component unmounts
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="home-section flex flex-col min-h-[calc(100vh_-_80px)] pt-12 bg-neutral-100 xs:h-[calc(100vh_-_80px)] xs:pt-0 lg:h-[calc(100vh_-_86px)] landscape:pt-0">
      {/* Section Header */}
      <div ref={headerRef} className="section-header invisible px-6 pb-8 xs:pt-8 sm:px-12 md:px-16 sm:py-14 lg:px-20 lg:max-xl:py-20 xl:px-36 2xl:px-56 2xl:py-20 3xl:px-[28rem] 3xl:py-28">
        <h3><span />Portfolio</h3>
        <p>In this section, you can view my featured projects. Swipe left or right to view other projects.</p>
      </div>
      {/* Project Carousel */}
      <Carousel
        carouselRef={carouselRef}
        chevronLeftRef={chevronLeftRef}
        projectRef={projectRef}
        chevronRightRef={chevronRightRef}
      />
    </section>
  );
}
