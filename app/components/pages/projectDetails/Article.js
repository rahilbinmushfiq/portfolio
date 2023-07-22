'use client';

import Cover from "./subcomponents/Cover";
import Hero from "./sections/Hero";
import TechStack from "./sections/TechStack";
import InformativeSection from "./sections/InformativeSection";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Section({ project }) {
  // References of the elements needed for animation
  const articleRef = useRef(null),
    coverRef = useRef(null),
    heroSectionRef = useRef(null),
    techStackSectionRef = useRef(null),
    informativeSectionsRef = useRef([]);

  useLayoutEffect(() => {
    // Get the elements needed for animation from their references
    const articleElement = articleRef.current,
      coverElement = coverRef.current,
      headerElements = heroSectionRef.current.firstChild.children,
      buttonElements = heroSectionRef.current.lastChild.children,
      techHeadingElement = techStackSectionRef.current.firstChild,
      techElements = techStackSectionRef.current.lastChild.children,
      informativeSectionElements = [...informativeSectionsRef.current];

    const ctx = gsap.context(() => {
      // Initialize the timeline for page reveal animation (when component mounts)
      const tl = gsap.timeline({
        defaults: { autoAlpha: 0, ease: 'power1.inOut' },
      });

      // Page reveal animation in timeline
      tl.set(articleElement, { autoAlpha: 1 })
        .from(coverElement, { yPercent: -50, duration: 0.5 }, '<')
        .from(headerElements, { y: 25, stagger: { amount: 0.25 } })
        .from(buttonElements, { x: 50, stagger: 0.125 }, '<0.15')
        .from(techHeadingElement, { y: 25, duration: 0.25 }, '<')
        .from(techElements, { x: 50, stagger: 0.125 }, '<0.15');

      informativeSectionElements.forEach(informativeSectionElement => {
        // Get the elements (heading, description, and points) of the informative section
        const sectionHeadingElement = informativeSectionElement.querySelector('h2'),
          sectionDescriptionElement = informativeSectionElement.querySelector('p'),
          sectionPointElements = informativeSectionElement.querySelectorAll('li');

        // Animate the available elements of the informative section
        tl.from(sectionHeadingElement, { y: 25, duration: 0.5 }, '<');
        sectionDescriptionElement &&
          tl.from(sectionDescriptionElement, { y: 25, duration: 0.5 }, '<');
        sectionPointElements &&
          tl.from(sectionPointElements, { y: 25, stagger: { amount: 0.5 } }, '<');
      });
    });

    return () => ctx.revert(); // Clean up the GSAP animations when the component unmounts
  }, []);

  return (
    <article ref={articleRef} className="invisible overflow-x-hidden">
      {/* Project Cover */}
      <Cover
        coverContainerRef={coverRef}
        projectTitle={project.title}
        projectMockups={project.mockups}
      />
      {/* Project Details */}
      <div className="space-y-14 py-8 px-6 sm:px-12 sm:py-10 md:px-16 lg:py-14 lg:px-20 xl:px-64 2xl:px-0 2xl:max-w-[60rem] 2xl:mx-auto">
        {/* Hero Section */}
        <Hero
          heroSectionRef={heroSectionRef}
          projectTitle={project.title}
          projectSummary={project.summary}
          projectDemoLink={project.demoLink}
          projectCodeLink={project.codeLink}
        />
        {/* Tech Stack Section */}
        <TechStack
          techStackSectionRef={techStackSectionRef}
          projectTechStack={project.techStack}
        />
        {/* Informative Sections - e.g., 'Features', 'Usage', or 'Future Development Plans' */}
        {project.informativeSections.map((informativeSection, sectionIndex) => (
          <InformativeSection
            key={informativeSection.heading}
            sectionsRef={informativeSectionsRef}
            section={informativeSection}
            sectionIndex={sectionIndex}
          />
        ))}
      </div>
    </article>
  );
}
