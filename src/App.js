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
import Movement from "./sections/Movement";
import Testimonials from "./sections/Testimonials";
import Testimonials2 from "./sections/Testimonials2";
import Logistics from "./sections/Logistics";
import Pandemics from "./sections/Pandemics";
import MobileNotice from './components/MobileNotice';
import useMobileDetection from './hooks/useMobileDetection';

// Styled component for full-width sections
import styled from "styled-components";

const FullWidthSection = styled.div`
  background: #fff;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  position: relative;
  overflow: hidden;
`;

function App() {
  const containerRef = useRef(null);
  const isMobile = useMobileDetection();

  // If on mobile, show the mobile notice
  if (isMobile) {
    return (
      <>
        <GlobalStyles />
        <MobileNotice />
      </>
    );
  }

  // Desktop view - show the full application
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={dark}>
        <LocomotiveScrollProvider
          options={{
            smooth: true,
            lerp: 0.05,
            multiplier: 0.8,
            reloadOnContextChange: true,
            touchMultiplier: 3,
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
            <FullWidthSection>
              <FeaturedCollection />
            </FullWidthSection>
            <FullWidthSection>
              <Shop />
            </FullWidthSection>
            <Logistics />
            <FullWidthSection>
              <Banner />
            </FullWidthSection>
            <Testimonials2 />
            <Movement />
            <Testimonials />
            <Pandemics />
          </main>
        </LocomotiveScrollProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
