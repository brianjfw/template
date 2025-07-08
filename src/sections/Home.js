import React, { Suspense } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const CoverVideo = React.lazy(() => import("../components/CoverVideo"));
const NavBar = React.lazy(() => import("../components/NavBar"));
const Logo = React.lazy(() => import("../components/Logo"));

const Section = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeIn 1.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;



const Home = () => {
  return (
    <Section id="home">
      <Suspense fallback={<></>}>
        <CoverVideo />
      </Suspense>
      <Content>
        <Suspense fallback={<></>}>
          <Logo />
          <NavBar />
        </Suspense>
      </Content>

      {/* Testimonials removed from here */}
    </Section>
  );
};

export default Home;
