import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { dark } from "./styles/Themes";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { useRef } from "react";
import 'locomotive-scroll/dist/locomotive-scroll.css'

import Home from "./sections/Home";
import { AnimatePresence } from "framer-motion";
import FeaturedCollection from "./sections/FeaturedCollection";
import Shop from "./sections/Shop";
import ScrollTriggerProxy from './components/ScrollTriggerProxy';
import Banner from "./sections/Banner";
import NewArrival from "./sections/NewArrival";
import Testimonials from "./sections/Testimonials";
import FAQ from "./sections/FAQ";
import Timeline from "./sections/Timeline";
import Footer from './sections/Footer';

function App() {
  const containerRef = useRef(null);

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={dark}>
        <LocomotiveScrollProvider
          options={{
            smooth: true,
            lerp: 0.05,
            multiplier: 0.8,
            smartphone: { 
              smooth: true,
              lerp: 0.05,
              multiplier: 0.8,
              touchMultiplier: 3,
              breakpoint: 768,
              // Disable complex animations on mobile
              smoothMobile: true
            },
            tablet: { 
              smooth: true,
              lerp: 0.05,
              multiplier: 0.8,
              touchMultiplier: 3,
              breakpoint: 1024
            },
            reloadOnContextChange: true,
            touchMultiplier: 3,
            smoothMobile: true,
            getDirection: true,
            getSpeed: true,
            class: "is-revealed"
          }}
          watch={[]}
          containerRef={containerRef}
        >
          <ScrollTriggerProxy />
          <main className='App' data-scroll-container ref={containerRef}>
            <Home />
            <div style={{ background: '#fff', width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
              <FeaturedCollection />
            </div>
            <Shop />
            <div style={{ background: '#fff', width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
              <Banner />
            </div>
            <div style={{ background: '#fff', width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
              <NewArrival />
            </div>
            <Testimonials />
            <Timeline />
            <FAQ />
            <Footer />
          </main>
        </LocomotiveScrollProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
