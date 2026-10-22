import { MotionConfig } from "framer-motion";
import Nav from "./components/Nav";
import ScrollProgress from "./components/ScrollProgress";
import CinematicHero from "./components/CinematicHero";
import TurningServices from "./components/TurningServices";
import MachinePark from "./components/MachinePark";
import ProductionLine from "./components/ProductionLine";
import { AmbientLight, Cursor, IndustryMarquee } from "./components/Ambient";
import Stats from "./components/Stats";
import TechnicalDrawing from "./components/TechnicalDrawing";
import About from "./components/About";
import Capabilities from "./components/Capabilities";
import Process from "./components/Process";
import Products from "./components/Products";
import Materials from "./components/Materials";
import ShopFloor from "./components/ShopFloor";
import WhyRai from "./components/WhyRai";
import FinalCTA from "./components/FinalCTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    // reducedMotion="user" makes every Framer Motion animation in the app
    // respect the OS-level "reduce motion" setting automatically.
    <MotionConfig reducedMotion="user">
      <div className="bg-ink text-paper">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-brass focus:text-ink focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.15em]"
        >
          Skip to content
        </a>
        <AmbientLight />
        <Cursor />
        <Nav />
        <ScrollProgress />
        <main id="main" className="relative z-[2]">
          <CinematicHero />
          <Stats />
          <IndustryMarquee />
          <TurningServices />
          <ProductionLine />
          <TechnicalDrawing />
          <About />
          <Capabilities />
          <MachinePark />
          <Process />
          <Products />
          <Materials />
          <ShopFloor />
          <WhyRai />
          <FinalCTA />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
