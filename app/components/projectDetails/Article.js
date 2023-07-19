'use client';

import Cover from "@/app/components/projectDetails/Cover";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { TbCode, TbWorldWww } from "react-icons/tb";

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
        <section ref={heroSectionRef} className="space-y-7">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold 2xl:text-4xl 3xl:text-5xl">{project.title}</h1>
            <p className="text-gray-600">{project.summary}</p>
          </div>
          {/* Call-to-Action Buttons */}
          <div className="flex gap-x-3 [&>button]:project-page-btn">
            <button className="text-white bg-[#7342D5] hover:bg-[#864DF8]">
              <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                <TbWorldWww className="hidden xs:block landscape:block" />
                <p>Live Demo</p>
              </Link>
            </button>
            <button className="text-[#7342D5] hover:text-white hover:bg-[#864DF8]">
              <Link href={project.codeLink} target="_blank" rel="noopener noreferrer">
                <TbCode className="hidden xs:block landscape:block" />
                <p>Source Code</p>
              </Link>
            </button>
          </div>
        </section>
        {/* Tech Stack Section */}
        <section ref={techStackSectionRef} className="space-y-7">
          <h2 className="sub-heading">Technologies Used</h2>
          <div className="flex gap-x-6 xs:gap-x-8 sm:gap-x-9">
            {project.techStack.map(tech => (
              <div key={tech.name} className="flex flex-col items-center gap-y-2.5">
                <div className="relative flex justify-center items-center w-10 h-10 sm:w-11 sm:h-11">
                  <Image
                    className="object-contain"
                    src={tech.logo}
                    fill
                    sizes="300px"
                    alt={tech.name}
                  />
                </div>
                <p className="text-xs font-medium text-gray-600 2xl:text-sm 3xl:text-base">{tech.name}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Informative Sections - e.g., 'Features', 'Usage', or 'Future Development Plans' */}
        {project.informativeSections.map((informativeSection, sectionIndex) => (
          <section
            key={informativeSection.heading}
            ref={element => { if (informativeSectionsRef.current) informativeSectionsRef.current[sectionIndex] = element }}
            className="space-y-3"
          >
            {/* Heading */}
            <h2 className="sub-heading">
              {informativeSection.heading}
            </h2>
            {/* Brief Description (if available) */}
            {informativeSection.description && (
              <p className="text-gray-600">
                {informativeSection.description}
              </p>
            )}
            {/* Bullet Points (if available) */}
            {informativeSection.points?.length && (
              <ul className={`${informativeSection.description ? 'pt-4' : 'pt-1'} space-y-4 leading-relaxed text-gray-600`}>
                {informativeSection.points.map((point, pointIndex) => (
                  <div key={pointIndex} className="space-y-3">
                    <li className="bullet-point">
                      <span>&#9679;</span> {point.introduction || point}
                    </li>
                    {/* Bullet Subpoints (if available) */}
                    {point.subpoints?.length && (
                      <ul className="space-y-2 pl-5 xl:pl-6 2xl:pl-7">
                        {point.subpoints.map((subpoint, subpointIndex) => (
                          <li key={subpointIndex} className="bullet-point">
                            <span>&#9675;</span> {subpoint}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
