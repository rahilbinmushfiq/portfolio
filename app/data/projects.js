// Import project mockup images
import gameonMockup from "@/public/mockups/gameonMockup.svg";
import gameonIPhone12ProMockup from "@/public/mockups/gameonIPhone12ProMockup.png";
import gameonIPadProMockup from "@/public/mockups/gameonIPadProMockup.png";
import gameonIMacProMockup from "@/public/mockups/gameonIMacProMockup.png";
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
    mockups: [
      gameonIPhone12ProMockup, gameonIPadProMockup, gameonIMacProMockup,
    ],
    title: 'Game On',
    summary: 'A responsive and interactive game review web app that allows users to browse, search, and filter video games, as well as to read and submit reviews.',
    subsections: [
      {
        heading: 'Features',
        points: [
          'Single-page web application built with reusable React components',
          'Server-side rendering and image optimization using Next.js',
          'Dynamic and responsive user interface using React and Tailwind CSS',
          'Data management using Firebase Storage and Cloud Firestore',
          'User authentication using Firebase Authentication',
          'User authorization using token ID verification with Firebase Admin SDK',
          'User session management using Authentication context with React Context API',
        ],
      },
      {
        heading: 'Usage',
        description: 'Game On is a game review web app that allows users to browse and search for video game reviews. It is accessible to all users, where they can:',
        points: [
          'Browse through the diverse range of games.',
          'Search for games using keywords and filters, such as platform and release date with sorting option.',
          {
            introduction: 'Visit a specific game page to learn more about the game:',
            subPoints: [
              'Get an overview of the game, including its summary, release date, genre, and platforms, as well as its average user and critic ratings.',
              'Read critic reviews submitted by experts, as well as submit your own review if you are an expert reviewer or connected to an online media company.',
              'Read user reviews submitted by other users, as well as submit your own review to share your personal experience on the game.',
              'Read the game\'s system requirements to see if your device can run this game.',
            ],
          },
          'Sign in with Google or email/password, reset your password if you forget it, and sign out when you\'re done.',
          'Visit your user profile to see your information and update your profile, password, or delete your account if necessary.',
        ],
      },
      {
        heading: 'Future Development Plans',
        description: 'Although the app is functioning properly, I plan to make further improvements in the near future. These include:',
        points: [
          'Allow users to edit or delete their own reviews.',
          'Implement the functionality to keep critic reviews on pending after submission and review the post\'s validity before accepting. This feature will ensure that only high-quality critic reviews are published on the site, making it a more trustworthy source of information for users.',
        ],
      },
    ],
    techStack: [
      { name: 'React', logo: reactLogo, isImageOrientationPortrait: false, },
      { name: 'Next.js', logo: nextjsLogo, isImageOrientationPortrait: false, },
      { name: 'Firebase', logo: firebaseLogo, isImageOrientationPortrait: true, },
      { name: 'Tailwind', logo: tailwindLogo, isImageOrientationPortrait: false, },
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
      { name: 'React', logo: reactLogo, isImageOrientationPortrait: false, },
      { name: 'Next.js', logo: nextjsLogo, isImageOrientationPortrait: false, },
      { name: 'Tailwind', logo: tailwindLogo, isImageOrientationPortrait: false, },
    ],
    demoLink: 'https://portfolio-rahilbinmushfiq.vercel.app/',
    codeLink: 'https://github.com/rahilbinmushfiq/portfolio',
  },
];
