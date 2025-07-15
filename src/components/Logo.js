import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaGem } from "react-icons/fa";

const Container = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;

  width: 100%;
  color: ${(props) => props.theme.text};
  z-index: 5;

  @media (max-width: 48em) {
    top: 0.8rem;
    left: 0.8rem;
  }
  
  @media (max-width: 30em) {
    top: 0.6rem;
    left: 0.6rem;
  }

  a {
    display: flex;
    align-items: flex-end;
  }

  img {
    width: 4rem;
    height: auto;

    @media (max-width: 48em) {
      width: 3rem;
    }
    
    @media (max-width: 30em) {
      width: 2.5rem;
    }
  }
`;

const Text = styled(motion.span)`
  font-size: ${(props) => props.theme.fontlg};
  color: ${(props) => props.theme.text};
  padding-bottom: 0.5rem;
`;

const GemIcon = styled(FaGem)`
  font-size: 4rem;
  color: ${(props) => props.theme.text};

  @media (max-width: 48em) {
    font-size: 3rem;
  }

  @media (max-width: 30em) {
    font-size: 2.5rem;
  }
`;

const textVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: -5,

    transition: {
      duration: 2, // 2
      delay: 5,
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
      delay: 3,
      ease: "easeInOut",
    },
  },
};

const Logo = () => {
  return (
    <Container>
      <Link to="/">
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <GemIcon />
        </motion.div>
      </Link>
    </Container>
  );
};

export default Logo;
