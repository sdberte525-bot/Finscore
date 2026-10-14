import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Research } from "@/components/Research";
import { RevealObserver } from "@/components/RevealObserver";
import { SelectedWork } from "@/components/SelectedWork";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Experience />
        <SelectedWork />
        <Research />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
