import { projects } from "@/app/data/projects";
import Cover from "@/app/components/projectDetails/cover";
import Image from "next/image";
import Link from "next/link";
import { TbCode, TbWorldWww } from "react-icons/tb";

export default function ProjectDetails({ params: { projectId } }) {
  const [project] = projects.filter(project => project.id === Number(projectId));

  return (
    <section>
      {/* Project Cover */}
      <Cover
        projectTitle={project.title}
        projectMockups={project.mockups}
      />
      {/* Project Details */}
      <div className="space-y-14 py-8 px-6 sm:px-12 sm:py-10 md:px-16 lg:py-14 lg:px-20 xl:px-64 2xl:px-0 2xl:max-w-[60rem] 2xl:mx-auto">
        <div className="space-y-7">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold xl:text-4xl">{project.title}</h1>
            <p className="text-gray-600">{project.summary}</p>
          </div>
          {/* Call-to-Action Buttons */}
          <div className="flex gap-x-4 [&>button]:project-page-btn">
            <button>
              <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                <TbWorldWww />
                <p>Live Demo</p>
              </Link>
            </button>
            <button>
              <Link href={project.codeLink} target="_blank" rel="noopener noreferrer">
                <TbCode />
                <p>Source Code</p>
              </Link>
            </button>
          </div>
        </div>
        {/* Tech Stack */}
        <div className="space-y-7">
          <h2 className="text-lg/none font-semibold sm:text-xl/none 2xl:text-2xl/none">Technologies Used</h2>
          <div className="flex gap-x-10 sm:gap-x-12">
            {project.techStack.map(tech => (
              <div key={tech.name} className="flex flex-col items-center gap-y-4">
                <div className="flex justify-center items-center w-10 h-10 sm:w-11 sm:h-11 2xl:w-12 2xl:h-12">
                  <Image
                    className={`${tech.isImageOrientationPortrait ? 'w-auto h-10 sm:h-11 2xl:h-12' : 'w-10 h-auto sm:w-11 2xl:w-12'}`}
                    src={tech.logo}
                    alt={tech.name}
                  />
                </div>
                <h4 className="text-xs font-medium text-gray-600 sm:text-sm 2xl:text-base">{tech.name}</h4>
              </div>
            ))}
          </div>
        </div>
        {/* Subsections - e.g., 'features', 'usage', or 'future development plans' */}
        {project.subsections.map(subsection => (
          <div className="space-y-3">
            {/* Heading */}
            <h2 className="text-lg/none font-semibold sm:text-xl/none 2xl:text-2xl/none">
              {subsection.heading}
            </h2>
            {/* Brief Description (if available) */}
            {subsection.description && (
              <p className="text-gray-600">
                {subsection.description}
              </p>
            )}
            {/* Bullet Points (if available) */}
            {subsection.points?.length && (
              <ul className={`${subsection.description ? 'pt-4' : 'pt-1'} space-y-4 leading-relaxed text-gray-600`}>
                {subsection.points.map((point, index) => (
                  <div key={index} className="space-y-3">
                    <li className="bullet-point">
                      <span>&#9679;</span> {point.introduction || point}
                    </li>
                    {/* Sub-bullet Points (if available) */}
                    {point.subPoints?.length && (
                      <ul className="space-y-2 pl-5 xl:pl-6 2xl:pl-7">
                        {point.subPoints.map((subPoint, index) => (
                          <li key={index} className="bullet-point">
                            <span>&#9675;</span> {subPoint}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
