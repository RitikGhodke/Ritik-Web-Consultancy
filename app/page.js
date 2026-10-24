// import Navbar from "@/components/Navbar";
// import Hero from "@/components/Hero";
// import TechMarquee from "@/components/TechMarquee";
// import Services from "@/components/Services";
// import Projects from "@/components/Projects";
// import Process from "@/components/Process";
// import Stats from "@/components/Stats";
// import Blog from "@/components/Blog";
// import Contact from "@/components/Contact";
// import Footer from "@/components/Footer";
// import ScrollProgress from "@/components/ScrollProgress";
// import WhatsAppButton from "@/components/WhatsAppButton";

// export default function Home() {
//   return (
//     <main>
//       <ScrollProgress />
//       <Navbar />
//       <Hero />
//       <TechMarquee />
//       <Services />
//       <Projects />
//       <Process />
//       <Stats />
//       <Blog />
//       <Contact />
//       <Footer />
//       <WhatsAppButton />
//     </main>
//   );
// }







import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getPublicProjects } from "@/lib/projects";

// admin se save karte hi page refresh hota hai, ye backup hai
export const revalidate = 60;

export default async function Home() {
  const projects = await getPublicProjects();

  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <TechMarquee />
      <Services />
      <Projects projects={projects} />
      <Process />
      <Stats />
      <Blog />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}