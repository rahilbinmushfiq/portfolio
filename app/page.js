import About from "./components/home/About";
import Contact from "./components/home/Contact";
import Hero from "./components/home/Hero";
import Portfolio from "./components/home/Portfolio";
import Skills from "./components/home/Skills";

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <About />
      <Portfolio />
      <Contact />
    </main>
  );
}
