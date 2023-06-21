import thoughtProcessImage from "@/public/thoughtProcess.svg";
import { techStack } from "@/app/data/techStack";
import Image from "next/image";
import Link from "next/link";

export default function Skills() {
  return (
    <section id="skills" className="home-section h-[calc(100vh_-_80px)] bg-neutral-50 lg:h-[calc(100vh_-_86px)]">
      <div className="w-full h-full p-6 sm:px-12 md:px-16 lg:px-20 xl:flex xl:pl-6 xl:pr-36 2xl:pr-56">
        {/* Section Image */}
        <div className="hidden xl:flex xl:justify-center xl:items-center xl:pr-14 2xl:pr-24">
          <Image className="w-full h-auto" src={thoughtProcessImage} alt="Thought Process" priority />
        </div>
        <div className="flex flex-col justify-center gap-y-12 h-full xl:basis-4/5 xl:gap-y-10 2xl:basis-[45%] 2xl:gap-y-14">
          {/* Section Header */}
          <div className="section-header">
            <h3>Skills</h3>
            <p>My attention to detail in design and code results in pixel-perfect websites with beautiful, responsive, and functional interfaces that delight users.</p>
          </div>
          {/* Tech Stack */}
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-5 md:gap-9 lg:gap-11 xl:gap-6 2xl:gap-7">
            {techStack.map(({ techName, techWebsite, techLogo }) => (
              <Link
                key={techName}
                href={techWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-1 flex flex-col items-center gap-y-3 py-5 rounded-sm shadow-lg cursor-pointer bg-white sm:py-8 md:py-9 lg:py-10 xl:py-6 2xl:py-8"
              >
                <div className="relative flex justify-center items-center w-9 h-9 sm:w-11 sm:h-11 xl:max-2xl:w-10 xl:max-2xl:h-10">
                  <Image
                    className="object-contain"
                    src={techLogo}
                    fill
                    sizes="300px"
                    alt={techName}
                  />
                </div>
                <p className="text-xs font-medium text-gray-600 2xl:text-sm">{techName}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
