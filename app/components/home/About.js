import graduationImage from "@/public/graduation.svg";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="home-section flex flex-col justify-center items-center gap-y-4 px-6 h-[calc(100vh_-_80px)] sm:gap-y-12 sm:px-12 md:px-16 lg:gap-y-24 lg:h-[calc(100vh_-_86px)] lg:px-20 xl:flex-row xl:gap-y-0 xl:pr-0 xl:pl-36 2xl:pl-56 2xl:gap-x-12">
      {/* Desktop Section Image */}
      <Image
        className="hidden w-full h-auto xl:block xl:order-2 xl:grow xl:w-0"
        src={graduationImage}
        alt="Graduation"
      />
      <div className="space-y-6 sm:space-y-8 lg:space-y-10 xl:basis-[48%] xl:pr-16 2xl:basis-[42%]">
        {/* Section Header */}
        <div className="section-header">
          <h3>About</h3>
          <p>In this section, you can take a quick look at my life as a frontend developer.</p>
        </div>
        {/* Tablet Section Image */}
        <Image
          className="w-full h-auto sm:pb-6 lg:pb-12 xl:hidden"
          src={graduationImage}
          alt="Graduation"
        />
        <div className="space-y-4 [&>div]:about-subsection lg:space-y-10 xl:space-y-6 2xl:space-y-7">
          {/* Personal Subsection */}
          <div>
            <h4>Personal</h4>
            <p>When I'm not coding, you can find me playing video games, watching football, reading about the latest trends in web development, or exploring new technologies.</p>
          </div>
          {/* Technical Subsection */}
          <div>
            <h4>Technical</h4>
            <p>In my work, I focus on creating aesthetic and functional interfaces using the latest trends and best practices. I believe in collaboration with other developers and designers to create websites that satisfy the users.</p>
          </div>
          {/* Education Subsection */}
          <div>
            <h4>Education</h4>
            <p>I earned my Bachelor's degree in Computer Science and Engineering from Brac University, graduating with a CGPA of 3.63 out of 4.00.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
