import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import { useRef } from "react";

import { motion } from "framer-motion";

import TextData from "../TextData.json";
import MediaData from "../MediaData.json";
import { dark as darkTheme } from "../styles/Themes";

const Section = styled.section`
  min-height: 100vh;
  height: auto;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  position: relative;
  
  /* Brand color background that shows after content scrolls */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 35%;
    width: 65%;
    height: 100%;
    background-color: ${(props) => props.theme.body};
    z-index: 1;
    pointer-events: none;
  }
`;
const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxxl};
  font-family: "Kaushan Script";
  font-weight: 300;
  text-shadow: 1px 1px 1px ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  position: absolute;
  top: 3rem;
  left: 5%;
  z-index: 11;

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Left = styled.div`
  width: 35%;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};

  min-height: 100vh;
  z-index: 5;

  position: fixed;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 2rem;

  p {
    font-size: ${(props) => props.theme.fontlg};
    font-weight: 300;
    width: 80%;
    margin: 0 auto;
  }

  @media (max-width: 64em) {
    p {
      font-size: ${(props) => props.theme.fontmd};
    }
  }

  @media (max-width: 48em) {
    width: 40%;
    p {
      font-size: ${(props) => props.theme.fontsm};
    }
  }

  @media (max-width: 30em) {
    p {
      font-size: ${(props) => props.theme.fontxs};
    }
  }
`;
const Right = styled.div`
  position: absolute;
  left: 35%;
  padding-left: 30%;
  min-height: 100vh;

  background-color: #fff;
  /* width: 65%; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 2;

  h1 {
    width: 5rem;
    margin: 0 2rem;
  }
`;

const Item = styled(motion.div)`
  width: 20rem;
  margin-right: 6rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: auto;
    cursor: pointer;
    border-radius: 20px;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  &:hover img {
    transform: scale(1.05);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
  }
  
  h1 {
    display: inline-block;
    width: fit-content;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    margin-top: 1rem;
    /* Always use a dark color for product titles */
    color: ${() => (isColorLight(darkTheme.text) ? "#1a1a1a" : darkTheme.text)};
  }

  @media (max-width: 48em) {
    width: 15rem;
  }
`;

// Helper to determine if a hex color is light (same logic used elsewhere)
const isColorLight = (hex) => {
  if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return false;
  let c = hex.substring(1);
  if (c.length === 3) c = c.split('').map(ch => ch + ch).join('');
  const bigint = parseInt(c, 16);
  if (Number.isNaN(bigint)) return false;
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
  return brightness > 186;
};

const Product = ({ img, title = "" }) => {
  return (
    <Item
      initial={{ filter: "grayscale(100%)" }}
      whileInView={{ filter: "grayscale(0%)" }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, amount: 0.3, margin: "0px 0px -100px 0px" }}
    >
      <img src={img} alt={title} loading="eager" decoding="async" />
      <h1>{title}</h1>
    </Item>
  );
};

const Shop = () => {
  gsap.registerPlugin(ScrollTrigger);

  const ref = useRef(null);
  const horizontalRef = useRef(null);

  const newCollection = TextData.newCollection;
  const shopProductTitles = newCollection.shopProducts?.map(p => p.title) || [];
  const productImages = [
    MediaData.image9,
    MediaData.image10,
    MediaData.image11,
    MediaData.image12,
    MediaData.image13,
    MediaData.image14,
    MediaData.image15,
    MediaData.image16,
    MediaData.image17,
    MediaData.image18
  ];

  useLayoutEffect(() => {
    let element = ref.current;
    let scrollingElement = horizontalRef.current;

    if (!element || !scrollingElement) return;

    let t1 = gsap.timeline();

    const setupAnimation = () => {
      // Clear any existing triggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element || trigger.trigger === scrollingElement) {
          trigger.kill();
        }
      });

      // Use the full width of the scrolling content
      const scrollDistance = scrollingElement.scrollWidth;
      const endValue = `+=${scrollDistance}`;

      t1.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: endValue,
          scroller: ".App",
          scrub: 1,
          pin: true,
          refreshPriority: -1,
        },
        height: `${scrollingElement.scrollWidth}px`,
        ease: "none",
      });

      // Horizontal Scrolling
      t1.to(scrollingElement, {
        scrollTrigger: {
          trigger: scrollingElement,
          start: "top top",
          end: endValue,
          scroller: ".App",
          scrub: 1,
          refreshPriority: -1,
        },
        x: -scrollDistance,
        ease: "none",
      });

      ScrollTrigger.refresh();
    };

    // Setup with a small delay to ensure elements are ready
    const timeoutId = setTimeout(setupAnimation, 1000);

    // Handle resize
    const handleResize = () => {
      // Refresh animations on resize
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      t1.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element || trigger.trigger === scrollingElement) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <Section ref={ref} id="shop">
      <Title data-scroll data-scroll-speed="-1">
        {newCollection.title}
      </Title>
      <Left>
        {newCollection.description.split("\n\n").map((para, idx) => (
          <p key={idx} style={{ marginBottom: '1em' }}>{para}</p>
        ))}
      </Left>
      <Right ref={horizontalRef}>
        {productImages.map((img, idx) => (
          <Product key={idx} img={img} title={shopProductTitles[idx] || ""} />
        ))}
      </Right>
    </Section>
  );
};

export default Shop;
