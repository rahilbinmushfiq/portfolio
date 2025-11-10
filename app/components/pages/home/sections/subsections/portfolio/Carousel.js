import Project from "./subcomponents/Project";
import { projects } from "@/app/data/projects";
import { useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Carousel({ carouselRef, chevronLeftRef, projectRef, chevronRightRef }) {
  const firstProjectId = 0;
  const lastProjectId = projects.length - 1;
  const [activeProjectId, setActiveProjectId] = useState(0); // State to track the ID of currently active project on the carousel

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Function that updates the cursor style on the project carousel
    const updateCursor = (eventType) => {
      projectRef.current.classList.remove(eventType === 'press' ? 'cursor-grab' : 'cursor-grabbing');
      projectRef.current.classList.add(eventType === 'press' ? 'cursor-grabbing' : 'cursor-grab');
    };

    // Function that handles swipe actions during observation
    const handleSwipe = (swipeDirection) => {
      // Exit if swiped left and active project on the carousel is the last one, or vice versa
      if (swipeDirection === -1 && activeProjectId === lastProjectId) return;
      if (swipeDirection === 1 && activeProjectId === firstProjectId) return;

      observer.disable();
      setActiveProjectId(prevActiveProjectId => prevActiveProjectId + swipeDirection * (-1));
      updateCursor('release');
    };

    // Observe left/right swipe and mouse press/release on the project carousel
    const observer = ScrollTrigger.observe({
      target: projectRef.current,
      type: 'touch, pointer',
      tolerance: 75,
      preventDefault: window.screen.width > window.screen.height,
      onLeft: () => handleSwipe(-1),
      onRight: () => handleSwipe(1),
      onPress: () => updateCursor('press'),
      onRelease: () => updateCursor('release'),
    });

    return () => observer.kill();
  }, [activeProjectId, lastProjectId, projectRef]);

  // Function that slides to the previous project on the project carousel
  const slideToPrevProject = () => {
    /* If the curent active project is not the first project,
       slide to the previous project on the carousel,
       otherwise, ignore and do not slide
    */
    if (activeProjectId !== firstProjectId) {
      setActiveProjectId(prevActiveProjectId => prevActiveProjectId - 1);
    }
  };

  // Function that slides to the next project on the project carousel
  const slideToNextProject = () => {
    /* If the curent active project is not the last project,
       slide to the next project on the carousel,
       otherwise, ignore and do not slide
    */
    if (activeProjectId !== lastProjectId) {
      setActiveProjectId(prevActiveProjectId => prevActiveProjectId + 1);
    }
  };

  return (
    <div ref={carouselRef} className="invisible relative grow flex justify-center pt-8 pb-12 overflow-hidden shadow-[0_-6px_36px_0_rgba(0,0,0,0.2)] bg-neutral-100 xs:py-0 landscape:py-0">
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
        className="w-full flex cursor-grab transition-transform ease-in-out duration-500"
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
  );
}
