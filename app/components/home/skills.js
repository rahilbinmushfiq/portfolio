import thoughtProcessImage from "@/public/thoughtProcess.svg";
import { techStack } from "@/app/data/techStack";
import Image from "next/image";

export default function Skills() {
  return (
    <section id="skills" className="home-section h-[calc(100vh_-_80px)] bg-neutral-50 lg:h-[calc(100vh_-_86px)]">
      <div className="w-full h-full p-6 sm:px-12 md:px-16 lg:px-20 xl:flex xl:pl-6 xl:pr-36 2xl:pr-56">
        {/* Section Image */}
        <div className="hidden xl:flex xl:justify-center xl:items-center xl:pr-14 2xl:pr-24">
          <Image className="w-full h-auto" src={thoughtProcessImage} alt="Thought Process" priority />
        </div>
        <div className="flex flex-col justify-center gap-y-12 h-full xl:basis-4/5 xl:gap-y-10 2xl:basis-3/5 2xl:gap-y-16">
          {/* Section Header */}
          <div className="space-y-2">
            <h3 className="text-3xl font-semibold xl:text-4xl">Skills</h3>
            <p className="text-gray-600">I pay attention to every detail in design and code to deliver pixel-perfect websites. My focus is on creating beautiful, responsive, and functional interfaces that engage and delight users.</p>
          </div>
          {/* Tech Stack */}
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-5 md:gap-9 lg:gap-11 xl:gap-6 2xl:gap-10">
            {techStack.map(({ techName, techLogo, isImageOrientationPortrait }) => (
              <div key={techName} className="col-span-1 flex flex-col items-center gap-y-4 py-6 rounded-sm drop-shadow-xl bg-white sm:py-8 md:py-9 lg:py-10 xl:py-6 2xl:py-8">
                <div className="flex justify-center items-center w-10 h-10 sm:w-11 sm:h-11 2xl:w-12 2xl:h-12">
                  <Image
                    className={`${isImageOrientationPortrait ? 'w-auto h-10 sm:h-11 2xl:h-12' : 'w-10 h-auto sm:w-11 2xl:w-12'}`}
                    src={techLogo}
                    alt={techName}
                  />
                </div>
                <h4 className="text-xs font-semibold text-gray-600 sm:text-sm 2xl:text-base">{techName}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
