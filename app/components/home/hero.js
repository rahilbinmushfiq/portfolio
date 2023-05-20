import hero from "@/public/hero.svg";
import Image from "next/image";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";

export default function Hero() {
  return (
    <section className="flex flex-col justify-center h-[calc(100vh_-_(26px_+_24px_+_24px))] pb-4 sm:h-[calc(100vh_-_(36px_+_32px_+_32px))] sm:pb-6 md:pb-8 lg:h-[calc(100vh_-_(40px_+_32px_+_32px))] xl:pb-10 2xl:h-[calc(100vh_-_(44px_+_32px_+_32px))]">
      <div className="grow flex flex-col gap-y-4 xl:flex-row xl:gap-y-0">
        <div className="flex flex-col justify-center gap-y-12 p-6 sm:px-12 md:px-16 lg:px-20 xl:basis-[45%] xl:gap-y-16 xl:pr-0 xl:pl-36 2xl:basis-[38%] 2xl:gap-y-20 2xl:pl-56">
          {/* Hero Section Header */}
          <div className="space-y-3 lg:space-y-5 xl:space-y-7">
            <h2 className="-mb-2 text-base font-medium sm:text-xl xl:-mb-4 xl:font-semibold">Hi, I'm <span className="text-[#7342D5]">Rahil Bin Mushfiq</span>.</h2>
            <h1 className="text-[3.5rem]/[1.15] font-semibold lg:text-7xl 2xl:text-[5.5rem]/[1.15]">Frontend Developer.</h1>
            <p className="text-gray-600">I create unique and intuitive web experiences with a focus on clean code and user-centered design.</p>
          </div>
          {/* Hero Section Buttons */}
          <div className="flex gap-x-4 [&>button]:hero-button xl:gap-x-6">
            <button className="bg-[#7342D5] text-white hover:bg-[#864DF8]">See my work</button>
            <button className="text-[#7342D5] hover:bg-[#864DF8] hover:text-white">Contact me</button>
          </div>
        </div>
        {/* Hero Section Image */}
        <div className="grow flex justify-center items-center xl:pl-8 2xl:pl-24">
          <Image className="w-full h-auto" src={hero} alt="developer-working" priority />
        </div>
      </div>
      {/* Mobile Swipe-Indicator */}
      <div className="indicator-wrapper flex md:pt-6 xl:hidden">
        <p>SWIPE UP</p>
        <BsArrowUp size={20} />
      </div>
      {/* Desktop Scroll-Indicator */}
      <div className="indicator-wrapper hidden xl:flex">
        <p>SCROLL DOWN</p>
        <BsArrowDown size={20} />
      </div>
    </section>
  );
}
