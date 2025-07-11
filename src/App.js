import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { dark } from "./styles/Themes";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { useEffect, useRef, useState } from "react";
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
import Loader from "./components/Loader";
import PreloadMedia from './components/PreloadMedia';


function App() {
  const containerRef = useRef(null);
  const [showLoader, setShowLoader] = useState(true);

  // Show loader for 3s, then trigger exit
  useEffect(() => {
    setShowLoader(true);
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Handler for after Loader exit animation
  const handleLoaderExitComplete = () => {
    // Scroll to top
    const scrollContainer = containerRef.current;
    if (scrollContainer && scrollContainer.scrollTo) {
      scrollContainer.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
    // Force LocomotiveScroll to recalculate
    window.dispatchEvent(new Event('resize'));
    if (window.locomotive) {
      window.locomotive.update();
    }
  };

  return (
    <>
      <GlobalStyles />
      <PreloadMedia />
      <ThemeProvider theme={dark}>
        <LocomotiveScrollProvider
          options={{
            smooth: true,
            smartphone: { smooth: false },
            tablet: { smooth: false }
          }}
          watch={[]}
          containerRef={containerRef}
        >
          <ScrollTriggerProxy />
          <AnimatePresence onExitComplete={handleLoaderExitComplete}>
            {showLoader && <Loader key="loader" />}
          </AnimatePresence>
          <AnimatePresence>
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
          </AnimatePresence>
        </LocomotiveScrollProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
