import Form from "./subcomponents/Form";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactForm() {
  // References of the elements needed for animation
  const subsectionRef = useRef(null),
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
      subsectionElement = subsectionRef.current,
      headerElements = headerRef.current.children,
      headingUnderlineElement = headerRef.current.firstChild.firstChild,
      formElements = formRef.current.children;

    const ctx = gsap.context(() => {
      // Initialize the timeline for on-scroll reveal animation (when the subsection comes into view)
      const tl = gsap.timeline({
        delay: 0.5,
        scrollTrigger: {
          trigger: isMobileScreenTooSmall ? '#home' : subsectionElement,
          start: `top-=${headerOffsetHeight} bottom`,
          end: `bottom-=${headerOffsetHeight} top`,
          toggleActions: 'restart reset restart reset',
        },
        defaults: { autoAlpha: 0, duration: 0.5, ease: 'power1.out' },
      });

      // The on-scroll reveal animation of subsection in timeline
      tl.set(subsectionElement, { autoAlpha: 1 })
        .from(headerElements, { [axis]: 25, stagger: { amount: 0.2 }, delay: isMobile ? 0 : 0.35 })
        .from(formElements, { [axis]: 50, stagger: { amount: 0.5 } }, '<')
        .from(headingUnderlineElement, { transformOrigin: 'center left', scaleX: 0 }, '<0.35');
    });

    return () => ctx.revert(); // Clean up the GSAP animations when the component unmounts
  }, []);

  return (
    <div ref={subsectionRef} className="home-section flex items-center min-h-[calc(100dvh_-_80px)] px-6 py-12 xs:invisible xs:min-h-0 xs:h-[calc(100dvh_-_80px)] xs:py-0 sm:basis-1/2 sm:pl-12 sm:pr-8 md:pl-16 lg:pl-20 lg:pr-12 xl:basis-[55%] xl:pl-36 xl:pr-16 2xl:basis-1/2 2xl:pl-56 2xl:pr-20 3xl:pl-[28rem] 3xl:pr-28 dpr-lg:basis-[55%] dpr-lg:pr-16 dpr-xl:basis-1/2 dpr-xl:pr-12 landscape:invisible landscape:min-h-0 landscape:py-0">
      <div className="space-y-14 sm:space-y-20 xl:space-y-6 2xl:space-y-16 3xl:space-y-20 dpr-lg:space-y-10 dpr-xl:space-y-6">
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
