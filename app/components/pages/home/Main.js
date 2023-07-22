'use client';

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default function Main({ children }) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    let mm = gsap.matchMedia(),
      headerOffsetHeight = document.querySelector('header').offsetHeight,
      navLinks, sections, isScrollInProgress;

    mm.add({
      isTooSmallScreen: '((max-width: 349px) and (max-height: 799px))',
      isExtraSmallScreen: '(min-width: 350px) and (min-height: 800px) and (max-width: 639px)',
      isSmallToMediumScreen: '(min-width: 640px) and (max-width: 1023px)',
      isLargerScreen: '(min-width: 1024px)',
    }, (context) => {
      let { isTooSmallScreen, isExtraSmallScreen, isSmallToMediumScreen, isLargerScreen } = context.conditions;

      if (isTooSmallScreen) return;

      document.body.style.overflow = 'hidden'; // Hide the scrollbar

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
          duration: 0.25,
          ease: 'sine.inOut',
          scrollTo: { y: sectionToBeScrolled, offsetY: headerOffsetHeight },
          onComplete: () => isScrollInProgress = false,
        });
      };

      sections.forEach((section, sectionIndex) => {
        /* Keep track of the current section in view on larger screens, and
           style its corresponding navigation link on the navbar on toggle
        */
        isLargerScreen && ScrollTrigger.create({
          trigger: section,
          start: 'top-=86 bottom',
          end: 'bottom-=86 top',
          onToggle: (self) => self.isActive && navLinks.forEach((navLink, navIndex) => {
            navLink.classList.toggle('text-primary-light', sectionIndex === navIndex);
          }),
        });

        /* Observe user movement with wheel, touch, or pointer along the y-axis,
           and snap to the next or previous section based on that up/down movement
        */
        ScrollTrigger.observe({
          target: section,
          type: 'wheel, touch',
          wheelSpeed: -1,
          scrollSpeed: -1,
          tolerance: 75,
          onUp: () => !isScrollInProgress && scrollToSection(sections[sectionIndex + 1]),
          onDown: () => !isScrollInProgress && scrollToSection(sections[sectionIndex - 1]),
        });
      });
    });

    // Make the scrollbar visible, remove style for the active nav link, and clean up all the GSAP animations when component unmounts
    return () => {
      document.body.style.overflow = 'visible';
      navLinks && navLinks.forEach(navLink => {
        navLink.classList.remove('text-primary-light');
      });
      mm.kill();
    };
  }, []);

  return (
    <main id="home" className="xs:[&>section]:mt-[80px] lg:[&>section]:mt-[86px]">
      {children}
    </main>
  );
}
