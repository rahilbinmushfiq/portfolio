"use client";

import Project from "./Project";
import { projects } from "@/app/data/projects";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Portfolio() {
  const firstProjectId = 0;
  const lastProjectId = projects.length - 1;
  const [activeProjectId, setActiveProjectId] = useState(0); // State to track the ID of currently active project on the carousel

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
          trigger: sectionElement,
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

  useLayoutEffect(() => {
    // Function that handles swipe actions during observation
    const handleSwipe = (slideToTargetedProject) => {
      observer.disable();
      slideToTargetedProject();
      observer.enable();
    };

    // Observe left/right swiping on the project carousel
    const observer = ScrollTrigger.observe({
      target: projectRef.current,
      type: 'touch, pointer',
      tolerance: 75,
      preventDefault: true,
      onLeft: () => handleSwipe(slideToNextProject),
      onRight: () => handleSwipe(slideToPrevProject),
      onPress: displayGrabbingCursor,
      onRelease: displayGrabCursor,
    });

    return () => observer.kill();
  }, [activeProjectId]);

  // Function that slides onto the previous project to perform a right-swipe on the project carousel
  const slideToPrevProject = (event) => {
    /* If the curent active project is not the first project,
       slide to the previous project on the carousel,
       otherwise, ignore and do not slide
    */
    if (activeProjectId !== firstProjectId) {
      setActiveProjectId(prevActiveProjectId => prevActiveProjectId - 1);
      !event && displayGrabCursor(); // If swiped (not a button event), update cursor to cursor-grab
    }
  };

  // Function that slides onto the next project to perform a left-swipe on the project carousel
  const slideToNextProject = (event) => {
    /* If the curent active project is not the last project,
       slide to the next project on the carousel,
       otherwise, ignore and do not slide
    */
    if (activeProjectId !== lastProjectId) {
      setActiveProjectId(prevActiveProjectId => prevActiveProjectId + 1);
      !event && displayGrabCursor(); // If swiped (not a button event), update cursor to cursor-grab
    }
  };

  // Function that updates cursor style to display a grabbing-cursor on the project carousel
  const displayGrabbingCursor = () => {
    projectRef.current.classList.remove('cursor-grab');
    projectRef.current.classList.add('cursor-grabbing');
  };

  // Function that updates cursor style to display a grab-cursor on the project carousel
  const displayGrabCursor = () => {
    projectRef.current.classList.remove('cursor-grabbing');
    projectRef.current.classList.add('cursor-grab');
  };

  return (
    <section id="portfolio" ref={sectionRef} className="home-section flex flex-col h-[calc(100vh_-_80px)] bg-neutral-100 lg:h-[calc(100vh_-_86px)]">
      {/* Section Header */}
      <div ref={headerRef} className="section-header invisible py-8 px-6 sm:px-12 md:px-16 sm:py-14 lg:px-20 lg:max-xl:py-20 xl:px-36 2xl:px-56 2xl:py-20">
        <h3><span />Portfolio</h3>
        <p>In this section, you can view my featured projects. Swipe left or right to view other projects.</p>
      </div>
      {/* Project Carousel */}
      <div ref={carouselRef} className="relative grow invisible flex justify-center overflow-hidden shadow-[0_-6px_36px_0_rgba(0,0,0,0.2)] bg-neutral-100">
        {/* Left Chevron */}
        <div ref={chevronLeftRef} className="portfolio-chevron-wrapper left-0">
          <FaChevronLeft
            onClick={slideToPrevProject}
            color={activeProjectId === firstProjectId ? "#bdbdbd" : "#7342D5"}
          />
        </div>
        {/* Projects */}
        <div
          ref={projectRef}
          className="flex cursor-grab transition-transform ease-in-out duration-500"
          style={{ transform: `translateX(calc(-${activeProjectId * 100}%))` }}
        >
          {projects.map(project => (
            <Project
              key={project.id}
              projectData={project}
            />
          ))}
        </div>
        {/* Right Chevron */}
        <div ref={chevronRightRef} className="portfolio-chevron-wrapper right-0">
          <FaChevronRight
            onClick={slideToNextProject}
            color={activeProjectId === lastProjectId ? "#bdbdbd" : "#7342D5"}
          />
        </div>
      </div>
    </section>
  );
}
