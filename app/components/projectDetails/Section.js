'use client';

import Cover from "@/app/components/projectDetails/Cover";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { TbCode, TbWorldWww } from "react-icons/tb";

export default function Section({ project }) {
  // References of the elements needed for animation
  const sectionRef = useRef(null),
    coverRef = useRef(null),
    headingRef = useRef(null),
    buttonsRef = useRef(null),
    techStackRef = useRef(null),
    subsectionsRef = useRef([]);

  useLayoutEffect(() => {
    // Get the elements needed for animation from their references
    const sectionElement = sectionRef.current,
      coverElement = coverRef.current,
      headingElements = headingRef.current.children,
      buttonElements = buttonsRef.current.children,
      techHeadingElement = techStackRef.current.firstChild,
      techElements = techStackRef.current.lastChild.children,
      subsectionElements = [...subsectionsRef.current];

    const ctx = gsap.context(() => {
      // Initialize the timeline for page reveal animation (when component mounts)
      const tl = gsap.timeline({
        defaults: { autoAlpha: 0, ease: 'power1.inOut' },
      });

      // Page reveal animation in timeline
      tl.set(sectionElement, { autoAlpha: 1 })
        .from(coverElement, { yPercent: -50, duration: 0.5 }, '<')
        .from(headingElements, { y: 25, stagger: { amount: 0.25 } })
        .from(buttonElements, { x: 50, stagger: 0.125 }, '<0.15')
        .from(techHeadingElement, { y: 25, duration: 0.25 }, '<')
        .from(techElements, { x: 50, stagger: 0.125 }, '<0.15');

      subsectionElements.forEach(subsectionElement => {
        // Get the elements (heading, description, and points) of the subsection
        const subHeadingElement = subsectionElement.querySelector('h2'),
          subDescriptionElement = subsectionElement.querySelector('p'),
          subPointElements = subsectionElement.querySelectorAll('li');

        // Animate the available elements of the subsection
        tl.from(subHeadingElement, { y: 25, duration: 0.5 }, '<');
        subDescriptionElement &&
          tl.from(subDescriptionElement, { y: 25, duration: 0.5 }, '<');
        subPointElements &&
          tl.from(subPointElements, { y: 25, stagger: { amount: 0.5 } }, '<');
      });
    });

    return () => ctx.revert(); // Clean up the GSAP animations when the component unmounts
  }, []);

  return (
    <section ref={sectionRef} className="invisible overflow-x-hidden">
      {/* Project Cover */}
      <Cover
        coverContainerRef={coverRef}
        projectTitle={project.title}
        projectMockups={project.mockups}
      />
      {/* Project Details */}
      <div className="space-y-14 py-8 px-6 sm:px-12 sm:py-10 md:px-16 lg:py-14 lg:px-20 xl:px-64 2xl:px-0 2xl:max-w-[60rem] 2xl:mx-auto">
        <div className="space-y-7">
          {/* Header */}
          <div ref={headingRef} className="space-y-2">
            <h1 className="text-3xl font-semibold 2xl:text-4xl">{project.title}</h1>
            <p className="text-gray-600">{project.summary}</p>
          </div>
          {/* Call-to-Action Buttons */}
          <div ref={buttonsRef} className="flex gap-x-4 [&>button]:project-page-btn">
            <button>
              <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                <TbWorldWww />
                <p>Live Demo</p>
              </Link>
            </button>
            <button>
              <Link href={project.codeLink} target="_blank" rel="noopener noreferrer">
                <TbCode />
                <p>Source Code</p>
              </Link>
            </button>
          </div>
        </div>
        {/* Tech Stack */}
        <div ref={techStackRef} className="space-y-7">
          <h2 className="sub-heading">Technologies Used</h2>
          <div className="flex gap-x-10 sm:gap-x-12">
            {project.techStack.map(tech => (
              <div key={tech.name} className="flex flex-col items-center gap-y-2.5">
                <div className="relative flex justify-center items-center w-11 h-11">
                  <Image
                    className="object-contain"
                    src={tech.logo}
                    fill
                    sizes="300px"
                    alt={tech.name}
                  />
                </div>
                <p className="text-xs font-medium text-gray-600 2xl:text-sm">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Subsections - e.g., 'features', 'usage', or 'future development plans' */}
        {project.subsections.map((subsection, index) => (
          <div
            key={subsection.heading}
            ref={element => { if (subsectionsRef.current) subsectionsRef.current[index] = element }}
            className="space-y-3"
          >
            {/* Heading */}
            <h2 className="sub-heading">
              {subsection.heading}
            </h2>
            {/* Brief Description (if available) */}
            {subsection.description && (
              <p className="text-gray-600">
                {subsection.description}
              </p>
            )}
            {/* Bullet Points (if available) */}
            {subsection.points?.length && (
              <ul className={`${subsection.description ? 'pt-4' : 'pt-1'} space-y-4 leading-relaxed text-gray-600`}>
                {subsection.points.map((point, index) => (
                  <div key={index} className="space-y-3">
                    <li className="bullet-point">
                      <span>&#9679;</span> {point.introduction || point}
                    </li>
                    {/* Sub-bullet Points (if available) */}
                    {point.subPoints?.length && (
                      <ul className="space-y-2 pl-5 xl:pl-6 2xl:pl-7">
                        {point.subPoints.map((subPoint, index) => (
                          <li key={index} className="bullet-point">
                            <span>&#9675;</span> {subPoint}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
