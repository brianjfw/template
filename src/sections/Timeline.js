import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import TextData from "../TextData.json";

const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  margin: 0 auto;
  padding: 6rem 0 4rem 0;
  background: #fff;
  color: #222;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 10;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxxl};
  font-family: "Kaushan Script";
  font-weight: 300;
  text-align: center;
  color: #222;
  margin-bottom: 2.5rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #222, transparent);
  }

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const TimelineWrapper = styled.div`
  position: relative;
  margin: 4rem 0 0 0;
  min-height: 60vh;
`;

const Line = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 0;
  width: 6px;
  height: 100%;
  background: ${(props) => props.theme.brandColor};
  border-radius: 3px;
  transform: translateX(-50%);
  z-index: 1;
`;

const StepRow = styled.div`
  display: flex;
  justify-content: ${({ align }) => (align === "left" ? "flex-start" : "flex-end")};
  align-items: flex-start;
  position: relative;
  margin-bottom: 5rem;
  z-index: 2;

  @media (max-width: 48em) {
    justify-content: center;
    margin-bottom: 3rem;
  }
`;

const StepCard = styled(motion.div)`
  background: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  box-shadow: 0 8px 32px rgba(${(props) => props.theme.shadow});
  padding: 2.5rem 2rem 2rem 2rem;
  max-width: 370px;
  min-width: 270px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  margin-left: ${({ align }) => (align === "left" ? "0" : "2.5rem")};
  margin-right: ${({ align }) => (align === "left" ? "2.5rem" : "0")};
  border: 1.5px solid rgba(0,0,0,0.06);
  backdrop-filter: blur(6px);
  border-radius: 20px;
  z-index: 2;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 40px rgba(${(props) => props.theme.shadow}, 0.3);
  }

  @media (max-width: 48em) {
    margin: 0;
    min-width: 0;
    width: 90%;
    max-width: 100%;
  }
`;

const IconCircle = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 1.5rem;
  transform: translateX(-50%);
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${(props) => props.theme.brandColor};
  z-index: 3;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  @media (max-width: 48em) {
    left: 50%;
    transform: translateX(-50%);
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const StepTitle = styled.h2`
  font-size: ${(props) => props.theme.fontxl};
  color: ${(props) => props.theme.text};
  margin-bottom: 0.5rem;
  font-weight: 700;
  margin-top: 0;
`;

const StepDesc = styled.p`
  font-size: ${(props) => props.theme.fontmd};
  color: ${(props) => props.theme.textSecondary};
`;

const fadeIn = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.25,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const float = keyframes`
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-30px) scale(1.08); }
`;

const FloatingShape = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.08;
  z-index: 0;
  animation: ${float} 8s ease-in-out infinite;
  background: ${(props) => props.theme.text};

  &:nth-child(1) {
    width: 120px;
    height: 120px;
    top: 10%;
    left: 12%;
    animation-delay: 0s;
  }
  &:nth-child(2) {
    width: 80px;
    height: 80px;
    top: 60%;
    right: 10%;
    animation-delay: 2s;
  }
  &:nth-child(3) {
    width: 160px;
    height: 160px;
    bottom: 10%;
    left: 60%;
    animation-delay: 4s;
  }
`;

const Timeline = () => {
  const storySection = TextData.storySection;
  return (
    <Section id="timeline">
      <Container>
        <Title>{storySection.title}</Title>
        <TimelineWrapper>
          <Line
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          {storySection.steps.map((step, idx) => {
            const align = idx % 2 === 0 ? "left" : "right";
            return (
              <StepRow key={idx} align={align}>
                <StepCard
                  align={align}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={fadeIn}
                >
                  <StepTitle>{step.title}</StepTitle>
                  <StepDesc>{step.desc}</StepDesc>
                </StepCard>
              </StepRow>
            );
          })}
        </TimelineWrapper>
      </Container>
    </Section>
  );
};

export default Timeline; 