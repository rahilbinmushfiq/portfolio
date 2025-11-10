import Main from "./components/pages/home/Main";
import Hero from "./components/pages/home/sections/Hero";
import Skills from "./components/pages/home/sections/Skills";
import About from "./components/pages/home/sections/About";
import Portfolio from "./components/pages/home/sections/Portfolio";
import Contact from "./components/pages/home/sections/Contact";

export const metadata = {
  title: 'Rahil Bin Mushfiq | Web Developer',
  description: 'I\'m Rahil Bin Mushfiq, a web developer who loves crafting unique and intuitive web experiences with a focus on clean code and user-centered design.',
  alternates: {
    canonical: `https://rahilbinmushfiq.vercel.app`,
  },
  openGraph: {
    title: 'Rahil Bin Mushfiq | Web Developer',
    description: 'I\'m Rahil Bin Mushfiq, a web developer who loves crafting unique and intuitive web experiences with a focus on clean code and user-centered design.',
    url: 'https://rahilbinmushfiq.vercel.app',
    siteName: 'Rahil Bin Mushfiq',
    images: [
      {
        url: 'https://www.dropbox.com/scl/fi/2k9nmpqvln1sty6z4ywjp/home.png?rlkey=dt8cd1wjb9fmzd5c4s28rww1g&raw=1',
        width: 900,
        height: 600,
        alt: 'developer coding',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rahil Bin Mushfiq | Web Developer',
    description: 'I\'m Rahil Bin Mushfiq, a web developer who loves crafting unique and intuitive web experiences with a focus on clean code and user-centered design.',
    domain: 'https://rahilbinmushfiq.vercel.app',
    url: `https://rahilbinmushfiq.vercel.app`,
    images: [
      {
        url: 'https://www.dropbox.com/scl/fi/2k9nmpqvln1sty6z4ywjp/home.png?rlkey=dt8cd1wjb9fmzd5c4s28rww1g&raw=1',
        width: 900,
        height: 600,
        alt: 'developer coding',
      },
    ],
  },
};

export default function Home() {
  return (
    <Main >
      <Hero />
      <Skills />
      <About />
      <Portfolio />
      <Contact />
    </Main>
  );
}
