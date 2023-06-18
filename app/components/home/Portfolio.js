"use client";

import Project from "./Project";
import { projects } from "@/app/data/projects";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Portfolio() {
  const firstProjectId = 0;
  const lastProjectId = projects.length - 1;
  const [activeProjectId, setActiveProjectId] = useState(0); // State to track the ID of currently active project on the carousel

  // Function to handle the swipe-left action on the project carousel
  const handleSwipeLeft = () => {
    /* If the curent active project is not the first project,
       slide to the previous project on the carousel,
       otherwise, ignore and do not slide
    */
    if (activeProjectId !== firstProjectId) {
      setActiveProjectId(prevActiveProjectId => prevActiveProjectId - 1);
    }
  };

  // Function to handle the swipe-right action on the project carousel
  const handleSwipeRight = () => {
    /* If the curent active project is not the last project,
       slide to the next project on the carousel,
       otherwise, ignore and do not slide
    */
    if (activeProjectId !== lastProjectId) {
      setActiveProjectId(prevActiveProjectId => prevActiveProjectId + 1);
    }
  };

  return (
    <section id="portfolio" className="home-section flex flex-col h-[calc(100vh_-_80px)] lg:h-[calc(100vh_-_86px)]">
      {/* Section Header */}
      <div className="space-y-2 py-8 px-6 sm:px-12 md:px-16 lg:py-14 lg:px-20 xl:px-36 2xl:px-56">
        <h3 className="text-3xl font-semibold xl:text-4xl">Portfolio</h3>
        <p className="text-gray-600">In this section, you can view my featured projects. Swipe left or right to view other projects.</p>
      </div>
      {/* Project Carousel */}
      <div className="relative grow flex flex-col justify-center bg-neutral-100 overflow-hidden">
        {/* Left Chevron */}
        <div className="portfolio-chevron-wrapper left-0">
          <FaChevronLeft
            onClick={handleSwipeLeft}
            color={activeProjectId === firstProjectId ? "#bdbdbd" : "#7342D5"}
          />
        </div>
        {/* Projects */}
        <div
          className="flex transition-transform ease-in-out duration-500"
          style={{ transform: `translateX(calc(-${activeProjectId * 100}%))` }}
        >
          {projects.map(project => (
            <Project
              key={project.id}
              projectData={project}
              handleSwipeLeft={handleSwipeLeft}
              handleSwipeRight={handleSwipeRight}
            />
          ))}
        </div>
        {/* Right Chevron */}
        <div className="portfolio-chevron-wrapper right-0">
          <FaChevronRight
            onClick={handleSwipeRight}
            color={activeProjectId === lastProjectId ? "#bdbdbd" : "#7342D5"}
          />
        </div>
      </div>
    </section>
  );
}
