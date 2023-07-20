import Form from "./subcomponents/Form";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactForm() {
  // References of the elements needed for animation
  const formSubsectionRef = useRef(null),
    headerRef = useRef(null),
    formRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const headerOffsetHeight = document.querySelector('header').offsetHeight,
      isMobileScreen = window.screen.width < window.screen.height,
      isScreenTooSmall = (window.screen.width < 350) || (window.screen.height < 800),
      isMobileScreenTooSmall = isMobileScreen && isScreenTooSmall,
      isMobile = window.screen.width < 640,
      axis = isMobile ? 'y' : 'x',
      // Get the elements needed for animation from their references
      formSubsectionElement = formSubsectionRef.current,
      headingElements = headerRef.current.children,
      headingUnderlineElement = headerRef.current.firstChild.firstChild,
      formElements = formRef.current.children;

    const ctx = gsap.context(() => {
      // Initialize the timeline for on-scroll reveal animation (when the form subsection comes into view)
      const tl = gsap.timeline({
        delay: 0.5,
        scrollTrigger: {
          trigger: isMobileScreenTooSmall ? '#home' : formSubsectionElement,
          start: `top-=${headerOffsetHeight} bottom`,
          end: `bottom-=${headerOffsetHeight} top`,
          toggleActions: 'restart reset restart reset',
        },
        defaults: { autoAlpha: 0, duration: 0.5, ease: 'power1.out' },
      });

      // The on-scroll reveal animation of form subsection in timeline
      tl.set(formSubsectionElement, { autoAlpha: 1 })
        .from(headingElements, { [axis]: 25, stagger: { amount: 0.2 }, delay: isMobile ? 0 : 0.35 })
        .from(formElements, { [axis]: 50, stagger: { amount: 0.5 } }, '<')
        .from(headingUnderlineElement, { transformOrigin: 'center left', scaleX: 0 }, '<0.35');
    });

    return () => ctx.revert(); // Clean up the GSAP animations when the component unmounts
  }, []);

  return (
    <div ref={formSubsectionRef} className="home-section flex items-center min-h-[calc(100vh_-_80px)] px-6 py-12 xs:invisible xs:py-0 xs:min-h-0 xs:h-[calc(100vh_-_80px)] sm:basis-1/2 sm:pl-12 sm:pr-8 md:pl-16 lg:pl-20 lg:pr-12 xl:pl-36 xl:pr-16 xl:max-2xl:basis-[55%] 2xl:pl-56 2xl:pr-20 3xl:pl-[28rem] 3xl:pr-28 landscape:invisible landscape:min-h-0 landscape:py-0">
      <div className="space-y-14 sm:space-y-20 xl:space-y-14 2xl:space-y-16 3xl:space-y-20">
        {/* Section Header */}
        <div ref={headerRef} className="section-header">
          <h3><span />Contact</h3>
          <p>Seeking a dedicated frontend developer? Feel free to send me a message to discuss how I can contribute to your success.</p>
        </div>
        {/* Contact Form */}
        <Form formRef={formRef} />
      </div>
    </div>
  );
}
