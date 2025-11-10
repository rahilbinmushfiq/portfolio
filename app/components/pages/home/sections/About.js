'use client';

import graduatedDeveloperImage from "@/public/graduatedDeveloper.svg";
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
    subsectionsRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const headerOffsetHeight = document.querySelector('header').offsetHeight,
      isMobileScreen = window.screen.width < window.screen.height,
      isScreenTooSmall = (window.screen.width < 350) || (window.screen.height < 800),
      isMobileScreenTooSmall = isMobileScreen && isScreenTooSmall,
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
          trigger: isMobileScreenTooSmall ? '#home' : sectionElement,
          start: `top-=${headerOffsetHeight} center`,
          end: `bottom-=${headerOffsetHeight} center`,
          toggleActions: 'restart reset restart reset',
        },
        defaults: { autoAlpha: 0, duration: 0.5, ease: 'power1.out' },
      });

      // The on-scroll reveal animation in timeline
      tl.set(sectionElement, { autoAlpha: 1 })
        .from(textElements, { y: 25, stagger: { amount: 0.5 } })
        .from(imageElement, { y: 50 }, '<')
        .from(headingUnderlineElement, { transformOrigin: 'center left', scaleX: 0 }, '<0.35');
    });

    return () => ctx.revert(); // Clean up the GSAP animations when the component unmounts
  }, []);

  return (
    <section id="about" ref={sectionRef} className="home-section invisible flex flex-col justify-center items-center gap-y-4 min-h-[calc(100dvh_-_80px)] px-6 py-12 xs:min-h-0 xs:h-[calc(100dvh_-_80px)] xs:py-0 sm:gap-y-12 sm:px-12 md:px-16 lg:gap-y-24 lg:h-[calc(100dvh_-_86px)] lg:px-20 xl:flex-row xl:gap-y-0 xl:pr-0 xl:pl-36 2xl:pl-56 2xl:gap-x-12 3xl:pl-[28rem] 3xl:gap-x-20 landscape:min-h-0 landscape:py-0">
      {/* Desktop Section Image */}
      <Image
        ref={desktopImageRef}
        className="hidden w-full h-auto xl:block xl:order-2 xl:grow xl:w-0"
        src={graduatedDeveloperImage}
        alt="graduated developer"
      />
      <div className="space-y-6 sm:space-y-8 lg:space-y-10 xl:basis-[48%] xl:pr-16 2xl:basis-[42%] 3xl:basis-[35%]">
        {/* Section Header */}
        <div ref={headerRef} className="section-header">
          <h3><span />About</h3>
          <p>In this section, you can take a quick look at my life as a web developer.</p>
        </div>
        {/* Mobile Section Image */}
        <Image
          ref={mobileImageRef}
          className="w-full h-auto sm:pb-6 lg:pb-12 xl:hidden"
          src={graduatedDeveloperImage}
          alt="graduated developer"
        />
        <div ref={subsectionsRef} className="space-y-4 [&>div]:about-subsection lg:space-y-10 xl:space-y-6 2xl:space-y-7 3xl:space-y-9">
          {/* Personal Subsection */}
          <div>
            <h4>Personal</h4>
            <p>When I&apos;m not coding, I&apos;m usually playing games, watching football, reading about new web trends, or exploring different technologies.</p>
          </div>
          {/* Technical Subsection */}
          <div>
            <h4>Technical</h4>
            <p>In my work, I focus on creating aesthetic and functional interfaces using the latest trends and best practices. I believe in collaboration with other developers and designers to create websites that satisfy the users.</p>
          </div>
          {/* Education Subsection */}
          <div>
            <h4>Education</h4>
            <p>I completed my Bachelor&apos;s in Computer Science and Engineering at Brac University with a CGPA of 3.63 out of 4.00. Also, our thesis resulted in an{" "}
              <a
                href="https://ieeexplore.ieee.org/document/10477346"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline decoration-[1.5px] underline-offset-2 text-primary-base"
              >
                IEEE journal publication
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
