import React, { Suspense } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { FaStar, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import TextData from "../TextData.json";

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
  top: 50%;
  left: 1.5rem;
  transform: translateY(-50%);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  animation: ${slideUp} 1s ease-out forwards;
  animation-delay: 6s;
  opacity: 0;

  a {
    font-size: ${(props) => props.theme.fontlg};
    transition: all 0.2s ease;
    display: flex;
    align-items: center;

    &:hover {
      transform: scale(1.2);
    }

    &:nth-child(1) {
      color: #1877F2; /* Facebook blue */
    }

    &:nth-child(2) {
      color: #1DA1F2; /* Twitter blue */
    }

    &:nth-child(3) {
      color: #E4405F; /* Instagram pink */
    }
  }
`;

const BottomLeftContent = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  z-index: 5;
  color: white;
  animation: ${slideUp} 1s ease-out forwards;
  animation-delay: 6s;
  opacity: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const EventTitle = styled.h3`
  font-size: ${(props) => props.theme.fontlg};
  font-weight: 600;
  margin: 0;
  color: ${(props) => props.theme.brandColor};
`;

const EventDate = styled.div`
  font-size: ${(props) => props.theme.fontsm};
  color: rgba(255, 255, 255, 0.8);
`;

const Divider = styled.div`
  width: 2px;
  height: 40px;
  background: ${(props) => props.theme.brandColor};
`;

const EventDetails = styled.div`
  font-size: ${(props) => props.theme.fontsm};
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
  max-width: 300px;
  min-width: 150px;
  height: 2.8em;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RightSidebar = styled.div`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 5;
  color: #FFD700;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  animation: ${slideUp} 1s ease-out forwards;
  animation-delay: 6s;
  opacity: 0;
`;

const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Star = styled.div`
  font-size: ${(props) => props.theme.fontlg};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  color: #FFD700;

  &:hover {
    transform: scale(1.2);
  }
`;

const ReviewText = styled.div`
  font-size: ${(props) => props.theme.fontsm};
  color: rgba(255, 255, 255, 0.8);
  text-align: right;
  line-height: 1.2;
`;

const RatingText = styled.div`
  font-size: ${(props) => props.theme.fontlg};
  color: rgba(255, 255, 255, 0.9);
  text-align: right;
  font-weight: 600;
`;

const RightDivider = styled.div`
  width: 120px;
  height: 2px;
  background: #FFD700;
  align-self: center;
`;

const NavigationDots = styled.div`
  position: absolute;
  top: 50%;
  right: 1.5rem;
  transform: translateY(-50%);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  animation: ${slideUp} 1s ease-out forwards;
  animation-delay: 6s;
  opacity: 0;

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.6);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 1);
      transform: scale(1.2);
    }

    &.active {
      background-color: rgba(255, 255, 255, 1);
      transform: scale(1.3);
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

      <BottomLeftContent>
        <EventInfo>
          <EventTitle>{TextData.eventInfo.title}</EventTitle>
          <EventDate>{TextData.eventInfo.date}</EventDate>
        </EventInfo>
        <Divider />
        <EventDetails>
          {TextData.eventInfo.description}
        </EventDetails>
      </BottomLeftContent>

      <RightSidebar>
        <ReviewText>
          <RatingText>5.0 Rating</RatingText>
          <div>Based on 127 reviews</div>
        </ReviewText>
        <RightDivider />
        <StarsContainer>
          <Star><FaStar /></Star>
          <Star><FaStar /></Star>
          <Star><FaStar /></Star>
          <Star><FaStar /></Star>
          <Star><FaStar /></Star>
        </StarsContainer>
      </RightSidebar>

      <NavigationDots>
        <div className="dot active"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </NavigationDots>

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
