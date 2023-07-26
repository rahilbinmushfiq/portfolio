export const projects = [
  {
    id: 0,
    mockupAllDevices: '/mockups/gameOn/allDevices.webp',
    mockups: [
      '/mockups/gameOn/iPhone12Pro.webp',
      '/mockups/gameOn/iPadPro.webp',
      '/mockups/gameOn/iMacPro.webp',
    ],
    openGraphImage: 'https://www.dropbox.com/scl/fi/rskt7ad29o5oqicch02xw/gameon.png?rlkey=au7cmjd6b3ke5xdxhd3tx063x&raw=1',
    title: 'Game On',
    summary: 'A responsive and interactive game review web app that allows users to browse, search, and filter video games, as well as to read and submit reviews.',
    informativeSections: [
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
            subpoints: [
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
      { name: 'React', logo: '/tech/react.png', },
      { name: 'Next.js', logo: '/tech/nextjs.png', },
      { name: 'Firebase', logo: '/tech/firebase.png', },
      { name: 'Tailwind', logo: '/tech/tailwind.png', },
    ],
    demoLink: 'https://gameon-rahilbinmushfiq.vercel.app/',
    codeLink: 'https://github.com/rahilbinmushfiq/gameon',
  },
  {
    id: 1,
    mockupAllDevices: '/mockups/portfolio/allDevices.webp',
    mockups: [
      '/mockups/portfolio/iPhone12Pro.webp',
      '/mockups/portfolio/iPadPro.webp',
      '/mockups/portfolio/iMacPro.webp',
    ],
    openGraphImage: 'https://www.dropbox.com/scl/fi/5emmjflw1saehvsjqiimj/portfolio.png?rlkey=pmopp1dt3w7rfld2qp9utfyqx&raw=1',
    title: 'My Portfolio',
    summary: 'A responsive portfolio web app where viewers can view my personal projects, as well as learn about me and my skills as a frontend developer.',
    informativeSections: [
      {
        heading: 'Features',
        points: [
          'Dynamic and interactive user interface using React and its reusable components',
          'Optimized with Next.js to develop a fast and SEO-friendly web application',
          'Responsive and modern UI design using Tailwind CSS',
          'Smooth animations and transitions using GSAP (GreenSock Animation Platform)',
        ],
      },
      {
        heading: 'Usage',
        description: 'This web app is built for the users to browse through my portfolio and reach out to me. The app consists of two pages:',
        points: [
          {
            introduction: 'Homepage: Displays an overview of the portfolio and provides easy navigation to different sections.',
            subpoints: [
              'Hero section: Provides a brief introduction and captures viewers\' attention.',
              'Skills section: Highlights my technical skills, such as programming languages, frameworks, and tools I am proficient in.',
              'About section: Shares more information about my background, interests, and passion for frontend development.',
              'Portfolio section: Showcases my personal projects, including their mockup images and brief descriptions. Each project has three call-to-action buttons linking to its respective project-details page, live demo, and GitHub repository.',
              'Contact section: Provides my contact information and a contact form for viewers to get in touch with me.',
            ],
          },
          {
            introduction: 'Project-details page: A dynamic page that displays the details of a project based on the URL parameter. Each project has its own unique page, accessible through the project list on the Portfolio section of homepage. It includes:',
            subpoints: [
              'Brief summary of the selected project.',
              'Mockup images to provide viewers with a visual representation of how the app looks on different devices.',
              'More detailed information about the project, including its features, usage, technologies used, and future development plans.',
              'Links to the project\'s live demo and source code.',
            ],
          },
        ],
      },
      {
        heading: 'Future Development Plans',
        description: 'Although the app is functioning properly, I plan to make further improvements in the near future. These include:',
        points: [
          'Include a demo walkthrough video on the project details page to provide a better understanding of each project.',
          'Continuously improve the UI/UX based on user feedback to enhance the overall user experience and visual appeal.',
          'Add a blog section to share my thoughts and insights on the frontend development topics and trends.',
        ],
      },
    ],
    techStack: [
      { name: 'React', logo: '/tech/react.png', },
      { name: 'Next.js', logo: '/tech/nextjs.png', },
      { name: 'Tailwind', logo: '/tech/tailwind.png', },
      { name: 'GSAP', logo: '/tech/gsap.png', },
    ],
    demoLink: 'https://rahilbinmushfiq.vercel.app/',
    codeLink: 'https://github.com/rahilbinmushfiq/portfolio',
  },
];
