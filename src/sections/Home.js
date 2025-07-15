import React, { Suspense } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { FaStar, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const CoverVideo = React.lazy(() => import("../components/CoverVideo"));
const NavBar = React.lazy(() => import("../components/NavBar"));
const Logo = React.lazy(() => import("../components/Logo"));

const Section = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const slideUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const LeftSidebar = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: ${slideUp} 1s ease-out forwards;
  animation-delay: 6s;
  opacity: 0;

  a {
    color: ${(props) => props.theme.text};
    font-size: ${(props) => props.theme.fontlg};
    transition: all 0.2s ease;
    display: flex;
    align-items: center;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

const RightSidebar = styled.div`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 5;
  color: ${(props) => props.theme.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: ${slideUp} 1s ease-out forwards;
  animation-delay: 6s;
  opacity: 0;

  div {
    font-size: ${(props) => props.theme.fontlg};
    transition: all 0.2s ease;
    display: flex;
    align-items: center;

    &:hover {
      transform: scale(1.2);
    }
  }
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
      
      <LeftSidebar>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
      </LeftSidebar>

      <RightSidebar>
        <div><FaStar /></div>
        <div><FaStar /></div>
        <div><FaStar /></div>
        <div><FaStar /></div>
        <div><FaStar /></div>
      </RightSidebar>

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
