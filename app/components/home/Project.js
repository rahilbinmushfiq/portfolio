import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TbWorldWww, TbCode } from "react-icons/tb";

export default function Project({ projectData, handleSwipeLeft, handleSwipeRight }) {
  const { id, mockup, title, summary, techStack, demoLink, codeLink } = projectData;
  const [swipeStartX, setSwipeStartX] = useState(0); // State to track the starting position of touch or mouse button click along the x-axis
  const [isMouseOnHold, setIsMouseOnHold] = useState(false); // State to track whether the mouse button is clicked and being held

  // Function to handle mouse button click event
  const handleMouseButtonClick = (newSwipeStartX) => {
    setIsMouseOnHold(true); // Set the mouse being held state to true
    setSwipeStartX(newSwipeStartX); // Set new starting position of mouse click
  };

  // Function to handle project sliding based on user touch or mouse click event
  const handleCarouselSwipe = (event, swipeEnd) => {
    const totalPixelSwiped = swipeStartX - swipeEnd; // Calculate the number of pixels swiped from the starting to the ending position along the x-axis

    /* If it's a mouse event, it needs to be confirmed whether
       the mouse button was clicked, held, and released on the project element.
       If so, reset the mouse being held state to false,
       otherwise, cancel carousel swiping
    */
    if (event.type.includes('mouse')) {
      if (isMouseOnHold) {
        setIsMouseOnHold(false);
      } else {
        return;
      }
    }

    /* If user swiped at least 20 pixels to the left or right,
       slide to the previous or next project on the carousel
    */
    if (totalPixelSwiped <= -20) {
      handleSwipeLeft();
    } else if (totalPixelSwiped >= 20) {
      handleSwipeRight();
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center gap-y-6 min-w-full px-10 ${isMouseOnHold ? 'cursor-grabbing' : 'cursor-grab'} sm:gap-y-10 sm:px-36 md:px-[10rem] lg:gap-y-14 lg:px-[11rem] xl:flex-row xl:gap-y-0 xl:gap-x-16 xl:px-36 2xl:gap-x-24 2xl:px-56`}
      onMouseDown={(event) => handleMouseButtonClick(event.pageX)}
      onMouseUp={(event) => handleCarouselSwipe(event, event.pageX)}
      onTouchStart={(event) => setSwipeStartX(event.changedTouches[0].clientX)}
      onTouchEnd={(event) => handleCarouselSwipe(event, event.changedTouches[0].clientX)}
    >
      {/* Project Image */}
      <div className="relative w-full h-1/3 sm:h-2/5 xl:h-3/5 xl:basis-[45%] 2xl:h-2/3 2xl:basis-1/2">
        <Image
          className="object-contain"
          src={mockup}
          fill
          sizes="1200px"
          alt={`${title} Mockup`}
          draggable={false}
        />
      </div>
      {/* Project Overview */}
      <div className="xl:basis-[55%] xl:my-auto 2xl:basis-1/2">
        {/* Description Segment */}
        <div className="select-none pb-6 lg:pb-11 xl:pt-0">
          <h5 className="w-fit mb-1 p-2 text-xs font-medium rounded-sm text-[#5f36b1] bg-[#e8e0f5] sm:mb-2">
            {`Project ${id + 1}`}
          </h5>
          <h4 className="sub-heading text-xl 2xl:text-2xl">
            {title}
          </h4>
          <p className="text-gray-600">
            {summary}
          </p>
          <p className="pt-2 text-gray-600 sm:pt-4">
            <span className="font-semibold">Tech Stack: </span>
            {techStack.map(tech => tech.name).join(", ")}
          </p>
        </div>
        {/* Button Segment */}
        <div className="project-btn">
          <button className="col-span-2 text-neutral-100 bg-[#7342D5] hover:text-[#7342D5] hover:bg-transparent lg:col-span-1">
            <Link href={`/project/${id}`}>
              <p>Learn More</p>
            </Link>
          </button>
          <button className="text-[#7342D5] hover:text-neutral-100 hover:bg-[#7342D5]">
            <Link href={demoLink} target="_blank" rel="noopener noreferrer">
              <TbWorldWww />
              <p>Live Demo</p>
            </Link>
          </button>
          <button className="text-[#7342D5] hover:text-neutral-100 hover:bg-[#7342D5]">
            <Link href={codeLink} target="_blank" rel="noopener noreferrer">
              <TbCode />
              <p>Source Code</p>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
