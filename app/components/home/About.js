import graduationImage from "@/public/graduation.svg";
import Image from "next/image";

export default function About() {
  return (
    <section className="flex flex-col justify-center items-center gap-y-4 2xl:gap-y-12 px-6 h-[calc(100vh_-_(26px_+_24px_+_24px))] sm:gap-y-16 sm:h-[calc(100vh_-_(36px_+_32px_+_32px))] sm:px-12 md:gap-y-20 lg:gap-y-24 lg:h-[calc(100vh_-_(40px_+_32px_+_32px))] lg:px-16 xl:flex-row xl:gap-y-0 xl:pr-0 xl:pl-36 2xl:h-[calc(100vh_-_(44px_+_32px_+_32px))] 2xl:pl-56">
      {/* Section Image */}
      <Image
        className="w-full h-auto xl:order-2 xl:grow xl:w-0 xl:pr-2"
        src={graduationImage}
        alt="Graduation"
      />
      <div className="space-y-6 sm:space-y-8 lg:space-y-10 xl:basis-[45%] xl:pr-16 2xl:basis-[38%] 2xl:space-y-12">
        {/* Section Header */}
        <h3 className="text-2xl/none font-semibold sm:text-3xl/none 2xl:text-4xl/none">About Me</h3>
        <div className="space-y-8 [&>div]:about-subsection lg:space-y-10 2xl:space-y-12">
          {/* Personal Subsection */}
          <div>
            <h4>Personal</h4>
            <p>When I'm not coding, you can find me playing video games, watching football, reading about the latest trends in web development, or exploring new technologies.</p>
          </div>
          {/* Technical Subsection */}
          <div>
            <h4>Technical</h4>
            <div className="space-y-4 lg:space-y-5 2xl:space-y-6">
              <p>In my work, I'm focused on creating interfaces that are both aesthetically pleasing and highly functional, using the latest design trends and best practices.</p>
              <p>I believe in working collaboratively with designers, developers, and other stakeholders to create websites that meet the needs of both clients and users.</p>
            </div>
          </div>
          {/* Education Subsection */}
          <div>
            <h4>Education</h4>
            <p>I earned my Bachelor's degree in Computer Science and Engineering from Brac University, where I graduated with a CGPA of 3.63 out of 4.00.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
