'use client';

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default function Main({ children }) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    document.body.style.overflow = 'hidden'; // Hide the scrollbar

    let mm = gsap.matchMedia(),
      headerOffsetHeight = document.querySelector('header').offsetHeight,
      navLinks, sections, isScrollInProgress;

    mm.add({
      isExtraSmallScreen: '(max-width: 639px)',
      isSmallToMediumScreen: '(min-width: 640px) and (max-width: 1023px)',
      isLargerScreen: '(min-width: 1024px)',
    }, (context) => {
      let { isExtraSmallScreen, isSmallToMediumScreen, isLargerScreen } = context.conditions;

      // Get the section elements based on user-device
      if (isExtraSmallScreen) {
        sections = gsap.utils.toArray('.home-section');
      } else {
        sections = gsap.utils.toArray('#home section');
      }

      // Get the navigation links if user-device is a dektop or a large tablet
      if (isLargerScreen) navLinks = gsap.utils.toArray('#desktop-nav ul li a');

      // Function that handles scrolling up or down a section in the homepage
      const scrollToSection = (sectionToBeScrolled) => {
        if (!sectionToBeScrolled) return; // Exit if the section to-be-scrolled does not exist

        isScrollInProgress = true;
        gsap.to(window, {
          duration: 0.4,
          ease: 'power3.inOut',
          scrollTo: { y: sectionToBeScrolled, offsetY: headerOffsetHeight },
          onComplete: () => isScrollInProgress = false,
        });
      };

      sections.forEach((section, index) => {
        /* Keep track of the current section in view, and
           style its corresponding navigation link on toggle
        */
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          toggleClass: isLargerScreen && { targets: navLinks[index], className: 'text-[#864DF8]' },
        });

        /* Observe user movement with wheel, touch, or pointer along the y-axis,
           and snap to the next or previous section based on that up/down movement
        */
        ScrollTrigger.observe({
          target: section,
          type: 'wheel, touch, pointer',
          wheelSpeed: -1,
          scrollSpeed: -1,
          tolerance: 50,
          preventDefault: true,
          onUp: () => !isScrollInProgress && scrollToSection(sections[index + 1]),
          onDown: () => !isScrollInProgress && scrollToSection(sections[index - 1]),
        });
      });
    });

    // Make the scrollbar visible, and clean up all the GSAP animations when component unmounts
    return () => {
      document.body.style.overflow = 'visible';
      mm.kill();
    };
  }, []);

  return (
    <main id="home" className="[&>section]:mt-[80px] lg:[&>section]:mt-[86px]">
      {children}
    </main>
  );
}
