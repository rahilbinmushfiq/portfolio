import Image from "next/image";

export default function TechStack({ techStackSectionRef, projectTechStack }) {
  return (
    <section ref={techStackSectionRef} className="space-y-7">
      <h2 className="sub-heading">Technologies Used</h2>
      <div className="flex gap-x-6 xs:gap-x-8 sm:gap-x-9">
        {projectTechStack.map(tech => (
          <div key={tech.name} className="flex flex-col items-center gap-y-2.5">
            <div className="relative flex justify-center items-center w-10 h-10 sm:w-11 sm:h-11 dpr-lg:w-10 dpr-lg:h-10">
              <Image
                className="object-contain"
                src={tech.logo}
                alt={tech.name}
                fill
                sizes="300px"
              />
            </div>
            <p className="text-xs font-medium text-gray-600 2xl:text-sm 3xl:text-base dpr-lg:text-xs">{tech.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
