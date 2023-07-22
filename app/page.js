import Main from "./components/pages/home/Main";
import Hero from "./components/pages/home/sections/Hero";
import Skills from "./components/pages/home/sections/Skills";
import About from "./components/pages/home/sections/About";
import Portfolio from "./components/pages/home/sections/Portfolio";
import Contact from "./components/pages/home/sections/Contact";

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
