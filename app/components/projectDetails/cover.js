'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Cover({ projectTitle, projectMockups }) {
  const [activeCoverId, setActiveCoverId] = useState(0); // State to track the active cover image ID

  useEffect(() => {
    // Set up an interval to cycle through the cover images every 3 seconds
    const coverInterval = setInterval(() => {
      /* If the last cover image is reached, reset to the first cover image,
         otherwise, move to the next cover image
      */
      if (activeCoverId === projectMockups.length - 1) {
        setActiveCoverId(0);
      } else {
        setActiveCoverId(prevActiveCover => prevActiveCover + 1);
      }
    }, 3000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(coverInterval);
  }, [activeCoverId]);

  return (
    <div className="flex justify-center items-center h-[50vh] w-full px-6 py-12 bg-neutral-100 sm:px-12 md:px-16 lg:px-20 xl:px-0">
      <Image
        className={`${activeCoverId === 0 ? "w-fit h-auto" : "h-full w-auto"} xl:w-auto xl:h-full`}
        src={projectMockups[activeCoverId]}
        alt={`${projectTitle} Cover`}
        priority
      />
    </div>
  );
}
