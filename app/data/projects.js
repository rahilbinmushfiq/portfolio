// Import project mockup images
import gameonMockup from "@/public/mockups/gameonMockup.svg";
import portfolioMockup from "@/public/mockups/portfolioMockup.svg";

// Import the technology logos used in projects
import reactLogo from "@/public/tech/react.png";
import nextjsLogo from "@/public/tech/nextjs.png";
import firebaseLogo from "@/public/tech/firebase.png";
import tailwindLogo from "@/public/tech/tailwind.png";

export const projects = [
  {
    id: 0,
    mockup: gameonMockup,
    title: 'Game On',
    summary: 'A responsive and interactive game review web app that allows users to browse, search, and filter video games, as well as to read and submit reviews.',
    techStack: [
      { name: 'React', logo: reactLogo },
      { name: 'Next.js', logo: nextjsLogo },
      { name: 'Firebase', logo: firebaseLogo },
      { name: 'Tailwind', logo: tailwindLogo },
    ],
    demoLink: 'https://gameon-rahilbinmushfiq.vercel.app/',
    codeLink: 'https://github.com/rahilbinmushfiq/gameon',
  },
  {
    id: 1,
    mockup: portfolioMockup,
    title: 'Portfolio',
    summary: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt animi numquam cumque in sed similique eum consequuntur optio.',
    techStack: [
      { name: 'React', logo: reactLogo },
      { name: 'Next.js', logo: nextjsLogo },
      { name: 'Tailwind', logo: tailwindLogo },
    ],
    demoLink: 'https://portfolio-rahilbinmushfiq.vercel.app/',
    codeLink: 'https://github.com/rahilbinmushfiq/portfolio',
  },
];
