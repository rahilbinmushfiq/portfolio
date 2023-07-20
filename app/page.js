import Main from "./components/pages/home/Main";
import About from "./components/pages/home/sections/About";
import Contact from "./components/pages/home/sections/Contact";
import Hero from "./components/pages/home/sections/Hero";
import Portfolio from "./components/pages/home/sections/Portfolio";
import Skills from "./components/pages/home/sections/Skills";

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
