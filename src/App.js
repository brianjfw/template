import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { dark } from "./styles/Themes";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { useRef } from "react";
import 'locomotive-scroll/dist/locomotive-scroll.css'
import { isMobile } from "./utils/mobileUtils";

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
            smooth: !isMobile(), // Disable smooth scrolling on mobile
            smartphone: { 
              smooth: false, // Disable smooth scrolling on smartphones
              horizontalGesture: false, // Disable horizontal gestures
              touchMultiplier: 2.5, // Increase touch sensitivity
            },
            tablet: { 
              smooth: false, // Disable smooth scrolling on tablets
              horizontalGesture: false,
              touchMultiplier: 2.5,
            },
            lerp: isMobile() ? 0 : 0.1, // Disable lerp on mobile for better performance
            multiplier: isMobile() ? 1 : 0.8, // Adjust scroll multiplier for mobile
            firefoxMultiplier: isMobile() ? 1 : 50, // Firefox specific multiplier
            scrollFromAnywhere: false, // Disable scroll from anywhere on mobile
            reloadOnContextChange: true, // Reload on orientation change
            touchMultiplier: isMobile() ? 2.5 : 2, // Increase touch sensitivity on mobile
          }}
          watch={[]}
          containerRef={containerRef}
        >
          <ScrollTriggerProxy />
          <main className='App' data-scroll-container ref={containerRef}>
            <Home />
            <div style={{ background: '#fff', width: '100%', position: 'relative' }}>
              <FeaturedCollection />
            </div>
            <Shop />
            <div style={{ background: '#fff', width: '100%', position: 'relative' }}>
              <Banner />
            </div>
            <div style={{ background: '#fff', width: '100%', position: 'relative' }}>
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
