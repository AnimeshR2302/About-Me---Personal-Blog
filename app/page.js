import About from "@/components/About";
import Contact from "@/components/Contact";
import Github from "@/components/Github";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Github />
        <Contact />
      </main>
    </>
  );
}
