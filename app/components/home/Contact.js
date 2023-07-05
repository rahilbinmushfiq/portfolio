'use client';

import Link from "next/link";
import { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AiOutlineLoading3Quarters, AiFillPhone } from "react-icons/ai";
import { FaPaperPlane, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [isProcessing, setIsProcessing] = useState(false); // State hook to keep track of ongoing form submission process

  // References for contact form inputs
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  // References of the elements needed for animation
  const sectionRef = useRef(null),
    formSubsectionRef = useRef(null),
    headerRef = useRef(null),
    formRef = useRef(null),
    altSubsectionRef = useRef(null),
    subHeaderRef = useRef(null),
    altOptionsRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const headerOffsetHeight = document.querySelector('header').offsetHeight,
      isMobile = window.screen.width < 640,
      axis = isMobile ? 'y' : 'x',
      // Get the elements needed for animation from their references
      formSubsectionElement = formSubsectionRef.current,
      headingElements = headerRef.current.children,
      headingUnderlineElement = headerRef.current.firstChild.firstChild,
      formElements = formRef.current.children,
      altSubsectionElement = altSubsectionRef.current,
      subHeadingElements = subHeaderRef.current.children,
      altOptionsElements = altOptionsRef.current.children;

    const ctx = gsap.context(() => {
      // Initialize the timeline for on-scroll reveal animation (when the form subsection comes into view)
      const formSubsectionTimeline = gsap.timeline({
        delay: 0.5,
        scrollTrigger: {
          trigger: formSubsectionElement,
          start: `top-=${headerOffsetHeight} bottom`,
          end: `bottom-=${headerOffsetHeight} top`,
          toggleActions: 'restart reset restart reset',
        },
        defaults: { autoAlpha: 0, duration: 0.5, ease: 'power1.out' },
      });

      // The on-scroll reveal animation of form subsection in timeline
      formSubsectionTimeline
        .set(formSubsectionElement, { autoAlpha: 1 })
        .from(headingElements, { [axis]: 25, stagger: { amount: 0.2 }, delay: isMobile ? 0 : 0.35 })
        .from(formElements, { [axis]: 50, stagger: { amount: 0.5 } }, '<')
        .from(headingUnderlineElement, { transformOrigin: 'center left', scaleX: 0 }, '<0.35');

      // Initialize the timeline for on-scroll reveal animation (when the alternative subsection comes into view)
      const altSubsectionTimeline = gsap.timeline({
        delay: 0.5,
        scrollTrigger: {
          trigger: altSubsectionElement,
          start: `top-=${headerOffsetHeight}px bottom-=100px`,
          end: `bottom-=${headerOffsetHeight}px top+=100px`,
          toggleActions: 'restart reset restart reset',
        },
        defaults: { autoAlpha: 0, duration: 0.5, ease: 'power1.out' },
      });

      // If user-device is tablet or desktop, animate the container of alternative subsection first
      if (!isMobile) {
        altSubsectionTimeline
          .set(altSubsectionElement, { autoAlpha: 1 })
          .from(altSubsectionElement, { xPercent: 100, duration: 0.35 });
      }

      // The on-scroll reveal animation of alternative subsection in timeline
      altSubsectionTimeline
        .from(subHeadingElements, { [axis]: isMobile ? 25 : -25, stagger: { amount: 0.2 } })
        .from(altOptionsElements, { [axis]: isMobile ? 50 : -50, stagger: { amount: 0.5 } }, '<');
    });

    return () => ctx.revert(); // Clean up the GSAP animations when the component unmounts
  }, []);

  // Function to handle form submission
  const handleFormSubmission = async (event) => {
    event.preventDefault(); // Prevent browser's default form submission behavior

    // Extract form data from input fields
    let formData = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      message: messageRef.current?.value,
    };

    // Validate form input fields
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill up the form first.");
      return;
    } else if (!(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(formData.email))) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Animate the form submit button on the start of the submission process
    const submitButtonTween = await gsap.to('form button p, form button div', {
      keyframes: {
        '0%': { autoAlpha: 1, y: 0 },
        '50%': { autoAlpha: 0, y: 15, onComplete: () => setIsProcessing(prevState => !prevState) },
        '100%': { autoAlpha: 1, y: 0 },
        easeEach: 'power1.inOut',
        ease: 'power1.inOut',
      },
      duration: 0.6,
    });

    try {
      // Send the form data to the server using a POST request
      const clientResponse = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Parse the response from the server
      const serverResponse = await clientResponse.json();

      // Based on the client and server response status codes, display a success/error message
      if (clientResponse.status === 200 && serverResponse.status === 200) {
        toast.success("Your message is received. Thank you.");

        // Clear the form input fields
        nameRef.current.value = '';
        emailRef.current.value = '';
        messageRef.current.value = '';
      } else {
        toast.error("Unable to send message.");
      }
    } catch (error) {
      toast.error("Unable to send message.");
    } finally {
      submitButtonTween.restart(); // Animate the button again after the form submission success/error
    }
  };

  return (
    <>
      <section ref={sectionRef} id="contact" className="overflow-hidden sm:flex sm:h-[calc(100vh_-_(80px_+_60px))] sm:[&>div]:h-full sm:[&>div]:w-min lg:h-[calc(100vh_-_(86px_+_60px))]">
        {/* Contact Form Subsection */}
        <div ref={formSubsectionRef} className="invisible home-section flex items-center h-[calc(100vh_-_80px)] p-6 sm:basis-1/2 sm:pl-12 sm:pr-8 md:pl-16 lg:pl-20 lg:pr-12 xl:pl-36 xl:pr-16 xl:max-2xl:basis-[55%] 2xl:pl-56 2xl:pr-20">
          <div className="space-y-14 sm:space-y-20 xl:space-y-14 2xl:space-y-16">
            {/* Section Header */}
            <div ref={headerRef} className="section-header">
              <h3><span />Contact</h3>
              <p>Seeking a dedicated frontend developer? Feel free to send me a message to discuss how I can contribute to your success.</p>
            </div>
            {/* Contact Form */}
            <form ref={formRef} className="space-y-7 [&>div]:form-field-wrapper sm:space-y-9 xl:grid xl:grid-cols-2 xl:gap-8 xl:space-y-0 2xl:gap-10" onSubmit={handleFormSubmission}>
              <div className="xl:col-span-1">
                <label htmlFor="name">Name</label>
                <input ref={nameRef} type="text" id="name" autoComplete="off" />
              </div>
              <div className="xl:col-span-1">
                <label htmlFor="email">Email</label>
                <input ref={emailRef} type="email" id="email" autoComplete="off" />
              </div>
              <div className="xl:col-span-2">
                <label htmlFor="message">Message</label>
                <textarea className="resize-none h-[20vh]" ref={messageRef} id="message" />
              </div>
              <button
                className={`flex items-center justify-center gap-x-2 w-full overflow-hidden py-3.5 rounded-sm font-medium transition-colors duration-100 ${isProcessing ? 'cursor-not-allowed bg-[#e2d2ff] text-black hover:bg-[#e9deff]' : 'cursor-pointer bg-[#7342D5] text-white hover:bg-[#864DF8]'} xl:gap-x-3 xl:w-1/3 xl:col-span-2`}
                disabled={isProcessing} // Disable button if form submission is ongoing
              >
                <p className={isProcessing ? 'order-1' : ''}>
                  {isProcessing ? 'Processing' : 'Send Message'}
                </p>
                <div>
                  {isProcessing ? <AiOutlineLoading3Quarters className="animate-spin" /> : <FaPaperPlane />}
                </div>
              </button>
            </form>
          </div>
        </div>
        {/* Alternative Contact Subsection */}
        <div ref={altSubsectionRef} className="home-section flex items-center h-[calc(100vh_-_(80px_+_56px))] p-6 bg-[#7342D5] sm:invisible sm:grow sm:pl-8 sm:pr-12 md:pr-16 lg:pl-12 lg:pr-20 xl:pl-16 xl:pr-36 2xl:pl-20 2xl:pr-56">
          <div className="space-y-20 sm:max-xl:space-y-24 xl:max-2xl:space-y-16">
            {/* Subsection Header */}
            <div ref={subHeaderRef} className="space-y-1">
              <h4 className="sub-heading text-xl text-white 2xl:text-2xl">Get in touch another way</h4>
              <p className="text-gray-200">If you wish, you can contact me using one of following methods as well.</p>
            </div>
            {/* Alternative Contact Options */}
            <div ref={altOptionsRef} className="space-y-8 [&>div]:alt-contact-option sm:space-y-9">
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
      </section>
      <ToastContainer
        className="text-sm mt-[80px] lg:mt-[86px]"
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
