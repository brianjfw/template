import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import TextData from "../TextData.json";

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  touch-action: none;
  overflow: hidden;

  width: 100vw;
  height: 100vh;

  z-index: 6;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};

  img {
    width: 10vw;
    height: auto;

    @media (max-width: 48em) {
      width: 20vw;
    }
  }
`;

// Styled star icon that adapts its color and size responsively
const StarIcon = styled(FaStar)`
  font-size: 10vw;
  color: ${(props) => props.theme.text};

  @media (max-width: 48em) {
    font-size: 20vw;
  }
`;

const Text = styled(motion.span)`
  font-size: ${(props) => props.theme.fontxl};
  color: ${(props) => props.theme.text};
  padding-top: 0.5rem;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontlg};
  }
`;

const textVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,

    transition: {
      duration: 1,
      yoyo: Infinity, // repeats infinite times
      ease: "easeInOut",
    },
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

const Loader = () => {
  return (
    <Container
      initial={{
        y: 0,
        opacity: 1,
      }}
      exit={{
        y: "100%",
        opacity: 0,
      }}
      transition={{
        duration: 2,
      }}
    >
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <StarIcon />
      </motion.div>
      <Text variants={textVariants} initial="hidden" animate="visible">
        {TextData.brand.name}
      </Text>
    </Container>
  );
};

export default Loader;
