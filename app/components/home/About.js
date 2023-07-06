'use client';

import graduationImage from "@/public/graduation.svg";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  // References of the elements needed for animation
  const sectionRef = useRef(null),
    headerRef = useRef(null),
    desktopImageRef = useRef(null),
    mobileImageRef = useRef(null),
    subsectionsRef = useRef([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const headerOffsetHeight = document.querySelector('header').offsetHeight,
      isDesktop = window.screen.width >= 1280,
      // Get the elements needed for animation from their references
      sectionElement = sectionRef.current,
      textElements = [headerRef.current.children, subsectionsRef.current.children],
      imageElement = isDesktop ? desktopImageRef.current : mobileImageRef.current,
      headingUnderlineElement = headerRef.current.firstChild.firstChild;

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
        .from(textElements, { y: 25, stagger: { amount: 0.5 } }, '<')
        .from(imageElement, { y: 50 }, '<')
        .from(headingUnderlineElement, { transformOrigin: 'center left', scaleX: 0 }, '<0.35');
    });

    return () => ctx.revert(); // Clean up the GSAP animations when the component unmounts
  }, []);

  return (
    <section id="about" ref={sectionRef} className="invisible home-section flex flex-col justify-center items-center gap-y-4 px-6 h-[calc(100vh_-_80px)] sm:gap-y-12 sm:px-12 md:px-16 lg:gap-y-24 lg:h-[calc(100vh_-_86px)] lg:px-20 xl:flex-row xl:gap-y-0 xl:pr-0 xl:pl-36 2xl:pl-56 2xl:gap-x-12">
      {/* Desktop Section Image */}
      <Image
        ref={desktopImageRef}
        className="hidden w-full h-auto xl:block xl:order-2 xl:grow xl:w-0"
        src={graduationImage}
        alt="Graduation"
      />
      <div className="space-y-6 sm:space-y-8 lg:space-y-10 xl:basis-[48%] xl:pr-16 2xl:basis-[42%]">
        {/* Section Header */}
        <div ref={headerRef} className="section-header">
          <h3><span />About</h3>
          <p>In this section, you can take a quick look at my life as a frontend developer.</p>
        </div>
        {/* Tablet Section Image */}
        <Image
          ref={mobileImageRef}
          className="w-full h-auto sm:pb-6 lg:pb-12 xl:hidden"
          src={graduationImage}
          alt="Graduation"
        />
        <div ref={subsectionsRef} className="space-y-4 [&>div]:about-subsection lg:space-y-10 xl:space-y-6 2xl:space-y-7">
          {/* Personal Subsection */}
          <div ref={element => { if (subsectionsRef.current) subsectionsRef.current[0] = element }}>
            <h4>Personal</h4>
            <p>When I&apos;m not coding, you can find me playing video games, watching football, reading about the latest trends in web development, or exploring new technologies.</p>
          </div>
          {/* Technical Subsection */}
          <div ref={element => { if (subsectionsRef.current) subsectionsRef.current[1] = element }}>
            <h4>Technical</h4>
            <p>In my work, I focus on creating aesthetic and functional interfaces using the latest trends and best practices. I believe in collaboration with other developers and designers to create websites that satisfy the users.</p>
          </div>
          {/* Education Subsection */}
          <div ref={element => { if (subsectionsRef.current) subsectionsRef.current[2] = element }}>
            <h4>Education</h4>
            <p>I earned my Bachelor&apos;s degree in Computer Science and Engineering from Brac University, graduating with a CGPA of 3.63 out of 4.00.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
