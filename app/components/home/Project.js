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
      className={`min-w-full px-10 ${isMouseOnHold ? 'cursor-grabbing' : 'cursor-grab'} sm:px-36 md:px-[10rem] lg:px-[11rem] xl:flex xl:gap-x-16 xl:px-36 2xl:gap-x-24 2xl:px-56`}
      onMouseDown={(event) => handleMouseButtonClick(event.pageX)}
      onMouseUp={(event) => handleCarouselSwipe(event, event.pageX)}
      onTouchStart={(event) => setSwipeStartX(event.changedTouches[0].clientX)}
      onTouchEnd={(event) => handleCarouselSwipe(event, event.changedTouches[0].clientX)}
    >
      {/* Project Image */}
      <div className="xl:basis-[45%] 2xl:basis-1/2">
        <Image className="xl:h-full" src={mockup} alt={`${title} Mockup`} draggable={false} />
      </div>
      {/* Project Overview */}
      <div className="xl:basis-[55%] xl:my-auto 2xl:basis-1/2">
        {/* Description Segment */}
        <div className="select-none space-y-2 py-10 md:pt-14 lg:space-y-3 lg:pt-20 lg:pb-11 xl:pt-0">
          <h5 className="-mb-1 text-[11px] font-bold tracking-[2px] text-[#7342D5] sm:text-xs">
            PROJECT {id + 1}
          </h5>
          <h4 className="text-xl/none font-bold sm:text-2xl/none 2xl:text-3xl/none">
            {title}
          </h4>
          <p className="text-gray-600">
            {summary}
          </p>
          <p className="pt-2 text-gray-600 lg:pt-3">
            <span className="font-semibold">Tech Stack: </span>
            {techStack.map(tech => tech.name).join(", ")}
          </p>
        </div>
        {/* Button Segment */}
        <div className="project-btn">
          <button className="col-span-2 text-neutral-100 bg-[#7342D5] hover:text-[#7342D5] hover:bg-transparent lg:col-span-1">
            <Link href={`/project/${id}`}>
              Learn More
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
