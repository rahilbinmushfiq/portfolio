import hero from "@/public/hero.svg";
import Image from "next/image";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function Hero() {
  return (
    <section id="hero" className="home-section flex flex-col justify-center h-[calc(100vh_-_80px)] lg:h-[calc(100vh_-_86px)]">
      <div className="grow flex flex-col gap-y-4 xl:flex-row xl:gap-y-0">
        <div className="max-xl:grow sm:max-h-[25rem] lg:max-h-[30rem] xl:max-h-none flex flex-col justify-center gap-y-12 px-6 sm:px-12 md:px-16 lg:px-20 xl:basis-[40%] xl:gap-y-16 xl:pr-0 xl:pl-36 2xl:basis-[38%] 2xl:gap-y-20 2xl:pl-56">
          {/* Hero Section Header */}
          <div className="space-y-3 lg:space-y-5 xl:space-y-7">
            <h2 className="-mb-2 text-base font-medium sm:max-xl:text-xl xl:-mb-4 xl:font-medium xl:text-lg">
              Hi, I'm <span className="text-[#7342D5]">Rahil Bin Mushfiq</span>.
            </h2>
            <h1 className="text-[3.5rem]/[1.15] font-semibold lg:text-7xl xl:text-6xl 2xl:text-[5.5rem]/[1.15]">
              Frontend Developer.
            </h1>
            <p className="text-gray-600">
              I create unique and intuitive web experiences with a focus on clean code and user-centered design.
            </p>
          </div>
          {/* Hero Section Buttons */}
          <div className="flex gap-x-4 [&>button]:hero-button xl:gap-x-6">
            <button className="bg-[#7342D5] text-white hover:bg-[#864DF8]">See my work</button>
            <button className="text-[#7342D5] hover:bg-[#864DF8] hover:text-white">Contact me</button>
          </div>
        </div>
        {/* Hero Section Image */}
        <div className="flex justify-center items-center px-6 sm:px-12 md:px-16 xl:grow xl:pr-0 xl:pl-16 2xl:px-24">
          <Image className="w-full h-auto" src={hero} alt="developer-working" priority />
        </div>
      </div>
      {/* Mobile Swipe-Indicator */}
      <div className="indicator-wrapper flex xl:hidden">
        <p>SWIPE UP</p>
        <FaChevronUp size={18} />
      </div>
      {/* Desktop Scroll-Indicator */}
      <div className="indicator-wrapper hidden xl:flex">
        <p>SCROLL DOWN</p>
        <FaChevronDown size={18} />
      </div>
    </section>
  );
}
