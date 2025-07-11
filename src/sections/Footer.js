import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

import { motion } from "framer-motion";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import TextData from "../TextData.json";

const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  margin: 2rem auto 5rem auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};

  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    width: 15vw;
    height: auto;
    color: ${(props) => props.theme.text};

    @media (max-width: 48em) {
      width: 20vw;
    }

    @media (max-width: 30em) {
      width: 25vw;
    }
  }
  h3 {
    font-size: ${(props) => props.theme.fontxxl};
    font-family: "Kaushan Script";

    @media (max-width: 48em) {
      font-size: ${(props) => props.theme.fontxl};
    }
  }
`;

const FooterComponent = styled(motion.footer)`
  width: 80vw;

  @media (max-width: 48em) {
    width: 90vw;
  }

  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 2rem;
    margin-top: 4rem;
    padding: 0 1rem;
    border-top: 1px solid ${(props) => props.theme.text};
    border-bottom: 1px solid ${(props) => props.theme.text};

    @media (max-width: 48em) {
      justify-content: center;
    }
  }

  li {
    padding: 2rem;
    font-size: ${(props) => props.theme.fontlg};
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }

    @media (max-width: 48em) {
      padding: 1rem;
      font-size: ${(props) => props.theme.fontmd};
    }
  }
`;

const Bottom = styled.div`
  padding: 0.5rem 0;
  margin: 0 4rem;
  font-size: ${(props) => props.theme.fontlg};

  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    text-decoration: underline;
  }

  @media (max-width: 64em) {
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: 0;
    span {
      transform: none !important;
    }
  }

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontmd};
  }
`;

const StarIcon = styled(FaStar)``;

const Footer = () => {
  const { scroll } = useLocomotiveScroll();

  const handleScroll = (id) => {
    let elem = document.querySelector(id);

    scroll.scrollTo(elem, {
      offset: "-100",
      duration: "2000",
      easing: [0.25, 0.0, 0.35, 1.0],
    });
  };

  const sectionLinks = [
    { title: TextData.sectionTitles[0], target: "#home" },
    { title: TextData.sectionTitles[2], target: "#featured-collection" },
    { title: TextData.sectionTitles[3], target: "#shop" },
    { title: TextData.sectionTitles[4], target: "#new-arrival" },
    { title: TextData.sectionTitles[5], target: "#timeline" },
    { title: TextData.sectionTitles[6], target: "#testimonials" },
    { title: TextData.sectionTitles[7], target: "#faq" }
  ];

  return (
    <Section>
      <LogoContainer>
        <StarIcon data-scroll data-scroll-speed="2" />
        <h3 data-scroll data-scroll-speed="-1">
          {TextData.brand.name}
        </h3>
      </LogoContainer>
      <FooterComponent
        initial={{ y: "-400px" }}
        whileInView={{ y: 0 }}
        viewport={{ once: false }}
        transition={{
          duration: 1.5,
        }}
      >
        <ul>
          {sectionLinks.map((section) => (
            <li key={section.title} onClick={() => handleScroll(section.target)}>{section.title}</li>
          ))}
        </ul>
        <Bottom>
          <span
            data-scroll
            data-scroll-speed="2"
            data-scroll-direction="horizontal"
          >
            &copy; {new Date().getFullYear()}. {TextData.footer.copyrightText}
          </span>
          <span
            data-scroll
            data-scroll-speed="-2"
            data-scroll-direction="horizontal"
          >
            {TextData.footer.brandText}
          </span>
        </Bottom>
      </FooterComponent>
    </Section>
  );
};

export default Footer;
