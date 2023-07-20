import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { TbWorldWww, TbCode } from "react-icons/tb";

export default function Project({ projectData: { id, mockupAllDevices, title, summary, techStack, demoLink, codeLink } }) {
  const router = useRouter();

  const handlePageTransition = (event) => {
    event.preventDefault();

    gsap.to('#home', {
      autoAlpha: 0,
      y: -25,
      duration: 0.25,
      ease: 'power1.inOut',
      onComplete: () => router.push(`/project/${id}`),
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-6 min-w-full px-10 sm:gap-y-10 sm:px-36 md:px-[10rem] lg:gap-y-14 lg:px-[11rem] xl:flex-row xl:gap-y-0 xl:gap-x-14 xl:px-36 2xl:gap-x-24 2xl:px-56 3xl:gap-x-32 3xl:px-[28rem]">
      {/* Project Image */}
      <div className="relative select-none w-full h-[30vh] xs:h-1/3 sm:h-2/5 xl:h-3/5 xl:basis-5/6 2xl:basis-4/5 2xl:h-2/3">
        <Image
          className="object-contain"
          src={mockupAllDevices}
          fill
          sizes="1200px"
          alt={`${title} Mockup`}
        />
      </div>
      {/* Project Overview */}
      <div className="landscape:my-auto">
        {/* Description Segment */}
        <div className="select-none pb-6 lg:pb-11 xl:pt-0">
          <h5 className="w-fit mb-1 p-2 text-xs font-medium rounded-sm text-[#5f36b1] bg-[#e8e0f5] sm:mb-2 2xl:text-sm 3xl:text-base">
            {`Project ${id + 1}`}
          </h5>
          <h4 className="sub-heading text-xl 2xl:text-2xl 3xl:text-3xl">
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
          <button className="col-span-2 text-white bg-[#7342D5] hover:bg-[#864DF8] lg:col-span-1">
            <Link href={`/project/${id}`} onClick={handlePageTransition}>
              <p>Learn More</p>
            </Link>
          </button>
          <button className="text-[#7342D5] hover:text-white hover:bg-[#864DF8]">
            <Link href={demoLink} target="_blank" rel="noopener noreferrer">
              <TbWorldWww className="hidden xs:block landscape:block" />
              <p>Live Demo</p>
            </Link>
          </button>
          <button className="text-[#7342D5] hover:text-white hover:bg-[#864DF8]">
            <Link href={codeLink} target="_blank" rel="noopener noreferrer">
              <TbCode className="hidden xs:block landscape:block" />
              <p>Source Code</p>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
