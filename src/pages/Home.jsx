import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import Services from '../components/Services/Services';
import TechStack from '../components/TechStack/TechStack';
import Projects from '../components/Projects/Projects';
import Certificates from '../components/Certificates/Certificates';
import Contact from '../components/Contact/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <TechStack />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Certificates />
      <Contact />
    </>
  );
}
