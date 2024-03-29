import Link from "next/link";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AiFillPhone } from "react-icons/ai";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function ContactInformation() {
  // References of the elements needed for animation
  const subsectionRef = useRef(null),
    innerContainerRef = useRef(null),
    subHeaderRef = useRef(null),
    contactInformationsRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const headerOffsetHeight = document.querySelector('header').offsetHeight,
      isMobileScreen = window.screen.width < window.screen.height,
      isScreenTooSmall = (window.screen.width < 350) || (window.screen.height < 800),
      isMobileScreenTooSmall = isMobileScreen && isScreenTooSmall,
      isMobile = window.screen.width < 640,
      axis = isMobile ? 'y' : 'x',
      // Get the elements needed for animation from their references
      subsectionElement = subsectionRef.current,
      innerContainerElement = innerContainerRef.current,
      subHeaderElements = subHeaderRef.current.children,
      contactInformationElements = contactInformationsRef.current.children;

    const ctx = gsap.context(() => {
      // Initialize the timeline for on-scroll reveal animation (when the subsection comes into view)
      const tl = gsap.timeline({
        delay: 0.5,
        scrollTrigger: {
          trigger: isMobileScreenTooSmall ? '#home' : subsectionElement,
          start: `top-=${headerOffsetHeight}px bottom-=100px`,
          end: `bottom-=${headerOffsetHeight}px top+=100px`,
          toggleActions: 'restart reset restart reset',
        },
        defaults: { autoAlpha: 0, duration: 0.5, ease: 'power1.out' },
      });

      // If user-device is tablet or desktop, animate the subsection (outer container) first
      if (!isMobile) {
        tl.set(subsectionElement, { autoAlpha: 1 })
          .from(subsectionElement, { xPercent: 100, duration: 0.35 });
      }

      // The on-scroll reveal animation of subsection in timeline
      tl.set(innerContainerElement, { autoAlpha: 1 })
        .from(subHeaderElements, { [axis]: isMobile ? 25 : -25, stagger: { amount: 0.2 } })
        .from(contactInformationElements, { [axis]: isMobile ? 50 : -50, stagger: { amount: 0.5 } }, '<');
    });

    return () => ctx.revert(); // Clean up the GSAP animations when the component unmounts
  }, []);

  return (
    <div ref={subsectionRef} className="home-section flex items-center min-h-[calc(100dvh_-_(80px_+_56px))] px-6 py-12 bg-primary-base xs:min-h-0 xs:h-[calc(100dvh_-_(80px_+_56px))] xs:py-0 sm:invisible sm:grow sm:pl-8 sm:pr-12 md:pr-16 lg:pl-12 lg:pr-20 xl:pl-16 xl:pr-36 2xl:pl-20 2xl:pr-56 3xl:pl-28 3xl:pr-[28rem] dpr-lg:pl-16 dpr-xl:pl-12 landscape:min-h-0 landscape:py-0">
      <div ref={innerContainerRef} className="invisible space-y-20 sm:space-y-24 xl:space-y-16 3xl:space-y-20 dpr-lg:space-y-12">
        {/* Subsection Header */}
        <div ref={subHeaderRef} className="space-y-1">
          <h4 className="sub-heading text-xl text-white 2xl:text-2xl 3xl:text-3xl dpr-lg:text-lg">Get in touch another way</h4>
          <p className="text-gray-200">If you wish, you can contact me using one of following methods as well.</p>
        </div>
        {/* Contact Information */}
        <div ref={contactInformationsRef} className="space-y-8 [&>div]:alt-contact-option sm:space-y-9 dpr-xl:space-y-6">
          <div>
            <AiFillPhone />
            <Link href="tel:+8801777-578493">+880 1777-578493</Link>
          </div>
          <div>
            <MdEmail />
            <Link href="mailto:rahilbinmushfiq@gmail.com">rahilbinmushfiq@gmail.com</Link>
          </div>
          <div>
            <FaLinkedin />
            <Link href="https://www.linkedin.com/in/rahilbinmushfiq/" target="_blank" rel="noopener noreferrer">/rahilbinmushfiq</Link>
          </div>
          <div>
            <FaGithub />
            <Link href="https://github.com/rahilbinmushfiq/" target="_blank" rel="noopener noreferrer">/rahilbinmushfiq</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
