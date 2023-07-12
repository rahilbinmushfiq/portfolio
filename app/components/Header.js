'use client';

import Link from "next/link";
import { Leckerli_One } from "next/font/google";
import { CgExternal } from "react-icons/cg";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const leckerliOne = Leckerli_One({
  weight: '400',
  subsets: ['latin'],
});

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [navigationSectionId, setNavigationSectionId] = useState(null);  // State hook for updating the id for the next section to be navigated

  // Reload the browser on window-resize to prevent the unexpected scroll-behavior in some browser
  useEffect(() => {
    const handleResize = () => location.reload();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animate the header when the component mounts
  useLayoutEffect(() => {
    let tl = gsap.timeline({
      defaults: { autoAlpha: 1, y: 0, ease: 'power3.inOut' },
    }).to('header', { duration: 0.5 })
      .to('header div', { duration: 0.35 });

    return () => tl.kill();
  }, []);

  /* Navigate to the section of the homepage using the section id,
     which was set right after the user clicked on its corresponding link on the menu
  */
  useLayoutEffect(() => {
    if (pathname === '/' && navigationSectionId) {
      let headerOffsetHeight = window.innerWidth < 1024 ? 80 : 86;
      let scrollTween = gsap.to(window, {
        duration: 0.5,
        ease: "power3.inOut",
        scrollTo: { y: navigationSectionId, offsetY: headerOffsetHeight },
        onComplete: () => setNavigationSectionId(null),
      });

      return () => scrollTween.kill();
    }
  }, [pathname, navigationSectionId]);

  // Handle header functionality and animations on the basis of user-action on the navigation button and links
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    let mm = gsap.matchMedia(),
      isSmallerScreen = window.innerWidth < 1024,
      headerOffsetHeight = isSmallerScreen ? 80 : 86,
      navButton, navLinks;

    // Timeline for transforming the navigation button into a close button
    let navButtonTimeline = gsap.timeline({
      defaults: { duration: 0.25, ease: 'power3.inOut' },
      paused: true,
      reversed: true,
    })
      .fromTo(
        '#top-line',
        { transformOrigin: 'right top', rotation: 0, width: 14 },
        { transformOrigin: 'right top', rotation: -45, width: 18 },
      ).fromTo(
        '#middle-line',
        { transformOrigin: 'right center', scaleX: 1, opacity: 1 },
        { transformOrigin: 'right center', scaleX: 0, opacity: 0 },
        '<',
      ).fromTo(
        '#bottom-line',
        { transformOrigin: 'right bottom', rotation: 0, width: 10 },
        { transformOrigin: 'right bottom', rotation: 45, width: 18 },
        '<',
      );

    // Timeline for displaying the navigation menu open animation
    let navMenuTimeline = gsap.timeline({
      defaults: { duration: 0.25, ease: 'power3.inOut' },
      paused: true,
      reversed: true,
    })
      // First, transform the header into a navigation menu and remove its background transparency
      .fromTo(
        'header',
        { backgroundColor: 'transparent' },
        { backgroundColor: 'white', duration: 0.01 },
        '<',
      ).fromTo(
        'header',
        { height: headerOffsetHeight },
        { height: window.innerHeight },
        '<',
      )
      // Next, animate the colors of header and navigation button
      .fromTo(
        'header',
        { backgroundColor: 'white', color: 'black' },
        { backgroundColor: '#7342D5', color: 'white' },
      ).fromTo(
        '.line',
        { backgroundColor: 'black' },
        { backgroundColor: 'white' },
        '<',
      )
      // Finally, animate the navigation links to make them gradually appear on the menu
      .fromTo(
        '#mobile-nav-wrapper',
        { autoAlpha: 0 },
        { autoAlpha: 1 },
        '<0.125',
      )
      .fromTo(
        '#mobile-nav-wrapper nav ul li',
        { opacity: 0, y: 50, stagger: 0.025 },
        { opacity: 1, y: 0, stagger: 0.025 },
        '<',
      );

    // Function responsible for opening or closing the navigation menu
    const handleNavMenu = () => {
      /* If user clicked on the navigation button while the navigation menu was closed,
         transform the navigation button into a close button and open the navigation menu,
         otherwise, transform the button into a regular menu button and close the navigation menu
      */
      navButtonTimeline.reversed() ? navButtonTimeline.play() : navButtonTimeline.reverse();
      navMenuTimeline.reversed() ? navMenuTimeline.play() : navMenuTimeline.reverse();
    };

    // Function that handles click events on navigation links
    const handleNavLinkClick = (event) => {
      event.preventDefault();

      /* First, auto-close the navigation menu (for smaller devices),
         next, redirect to homepage if user is not on the homepage,
         finally, set new id for the section to be scrolled
      */
      if (isSmallerScreen) handleNavMenu();
      setTimeout(() => {
        if (pathname !== '/') router.push('/');
        setNavigationSectionId(event.target.hash);
      }, isSmallerScreen ? 800 : 0);
    };

    mm.add({
      isSmallerScreen: '(max-width: 1023px)',
      isLargerScreen: '(min-width: 1024px)',
    }, (context) => {
      let { isSmallerScreen, isLargerScreen } = context.conditions;

      // Get the navigation link and button (if available) elements based on user-device
      if (isLargerScreen) {
        navLinks = gsap.utils.toArray('#desktop-nav ul li a');
      } else {
        navButton = document.querySelector('#mobile-nav-button');
        navLinks = gsap.utils.toArray('#mobile-nav ul li a');
      }

      // Listen for click event on each of the navigation link
      navLinks.forEach(navLink => {
        navLink.addEventListener('click', handleNavLinkClick);
      });

      // Listen for click event on the navigation button (for smaller devices)
      isSmallerScreen && navButton.addEventListener('click', handleNavMenu);
    });

    // Clean up all the event listeners and GSAP tweens when the component unmounts
    return () => {
      navButton && navButton.removeEventListener('click', handleNavMenu);
      navLinks.forEach(navLink => {
        navLink.removeEventListener('click', handleNavLinkClick);
      });
      navButtonTimeline.kill();
      navMenuTimeline.kill();
      mm.kill();
    };
  }, [pathname, router]);

  return (
    <header className="fixed inset-0 -translate-y-24 invisible z-[2] flex flex-col h-20 p-6 bg-white bg-opacity-75 backdrop-blur-sm shadow-[0_6px_36px_0_rgba(0,0,0,0.075)] sm:px-12 md:px-16 lg:h-[86px] lg:px-20 xl:px-36 2xl:px-56">
      <div className="flex justify-between items-center -translate-y-3.5 invisible lg:items-center lg:font-medium">
        {/* Website Logo */}
        <div>
          <Link href="/">
            <p className={`${leckerliOne.className} inline text-2xl`}>Rahil.dev</p>
          </Link>
        </div>
        {/* Mobile Navigation Menu Toggle Button */}
        <button id="mobile-nav-button" className="flex flex-col justify-between items-end w-5 h-3.5 cursor-pointer lg:hidden">
          <span id="top-line" className="line w-3.5" />
          <span id="middle-line" className="line w-5" />
          <span id="bottom-line" className="line w-2.5" />
        </button>
        {/* Desktop Navigation Bar */}
        <nav id="desktop-nav" className="hidden lg:block">
          {/* Navigation Links */}
          <ul className="w-fit flex gap-x-6 xl:gap-x-10 2xl:gap-x-14">
            <li>
              <Link href="/#hero">Home</Link>
            </li>
            <li>
              <Link href="/#skills">Skills</Link>
            </li>
            <li>
              <Link href="/#about">About</Link>
            </li>
            <li>
              <Link href="/#portfolio">Portfolio</Link>
            </li>
            <li>
              <Link href="/#contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="hidden lg:block">
          {/* External Link for Resume */}
          <Link
            className="flex items-center gap-x-1.5 px-5 py-2.5 rounded-sm text-white border border-[#864DF8] bg-[#864DF8] transition-colors duration-500 ease-out hover:text-[#864DF8] hover:bg-transparent"
            href="https://www.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-xs/none 2xl:text-sm/none">Resume</p>
            <CgExternal size={16} />
          </Link>
        </div>
      </div>
      <div id="mobile-nav-wrapper" className="invisible grow flex flex-col justify-center overflow-y-hidden text-lg text-center font-medium sm:text-2xl">
        <nav id="mobile-nav">
          {/* Navigation Links */}
          <ul className="w-fit space-y-11 mx-auto sm:space-y-14">
            <li>
              <Link href="/#hero">Home</Link>
            </li>
            <li>
              <Link href="/#skills">Skills</Link>
            </li>
            <li>
              <Link href="/#about">About</Link>
            </li>
            <li>
              <Link href="/#portfolio">Portfolio</Link>
            </li>
            <li>
              <Link href="/#contact">Contact</Link>
            </li>
            <li>
              {/* External Link for Resume */}
              <Link
                className="flex justify-center items-center gap-x-2 w-fit px-6 py-3 rounded-sm border border-white sm:px-8 sm:py-4"
                href="https://www.google.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>Resume</p>
                <CgExternal size={20} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
