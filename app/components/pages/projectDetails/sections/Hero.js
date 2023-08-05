import Link from "next/link";
import { TbCode, TbWorldWww } from "react-icons/tb";

export default function Hero({ heroSectionRef, projectTitle, projectSummary, projectDemoLink, projectCodeLink }) {
  return (
    <section ref={heroSectionRef} className="space-y-7">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold 2xl:text-4xl 3xl:text-5xl dpr-lg:text-2xl">{projectTitle}</h1>
        <p className="text-gray-600">{projectSummary}</p>
      </div>
      {/* Call-to-Action Buttons */}
      <div className="flex gap-x-3 [&>button]:project-page-btn">
        <button className="text-white bg-primary-base hover:bg-primary-light">
          <Link href={projectDemoLink} target="_blank" rel="noopener noreferrer">
            <TbWorldWww className="hidden xs:block landscape:block" />
            <p>Live Demo</p>
          </Link>
        </button>
        <button className="text-primary-base hover:text-white hover:bg-primary-light">
          <Link href={projectCodeLink} target="_blank" rel="noopener noreferrer">
            <TbCode className="hidden xs:block landscape:block" />
            <p>Source Code</p>
          </Link>
        </button>
      </div>
    </section>
  );
}
