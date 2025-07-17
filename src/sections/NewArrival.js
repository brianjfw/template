import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import TextData from "../TextData.json";
import MediaData from "../MediaData.json";
import { LightningBolt, HandDrawnArrow, Squiggle, FourPetals, StarIcon } from "../components/Icons";

// Helper to determine if a hex color is light (same as FeaturedCollection)
const isColorLight = (hex) => {
  if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return false;
  let c = hex.substring(1);
  if (c.length === 3) {
    c = c.split('').map(ch => ch + ch).join('');
  }
  const bigint = parseInt(c, 16);
  if (Number.isNaN(bigint)) return false;
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
  return brightness > 186;
};

const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  overflow: hidden;

  /* background-color: yellow; */
`;

const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30vw;
  height: 100vh;
  z-index: 11;

  @media (max-width: 70em) {
    width: 40vw;
    height: 100vh;
  }
  @media (max-width: 64em) {
    width: 50vw;
    height: 100vh;
  }
  @media (max-width: 48em) {
    width: 60vw;
    height: 100vh;
  }
  @media (max-width: 30em) {
    width: 80vw;
    height: 100vh;
  }
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxxl};
  font-family: "Kaushan Script";
  font-weight: 300;
  text-shadow: 1px 1px 1px ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  position: absolute;
  top: 1rem;
  left: 5%;
  z-index: 11;

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const LeftContainer = styled.div`
  width: 25%;
  position: absolute;
  left: 5%;
  top: 20%;
  z-index: 11;
  color: ${({ theme }) => (isColorLight(theme.text) ? '#2c2c2c' : theme.text)};

  @media (max-width: 48em) {
    display: none;
  }
`;

const RightContainer = styled.div`
  width: 25%;
  position: absolute;
  right: 5%;
  top: 25%;
  z-index: 11;
  color: ${({ theme }) => (isColorLight(theme.text) ? '#2c2c2c' : theme.text)};

  @media (max-width: 48em) {
    display: none;
  }
`;

const Discount = styled.div`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.fontxl};
  font-weight: 600;
  margin-bottom: 1rem;

  svg {
    margin-right: 0.5rem;
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
`;

const Description = styled.p`
  font-size: ${(props) => props.theme.fontsm};
  line-height: 1.5;
  margin-bottom: 2rem;
`;

const CircleButton = styled.div`
  display: flex;
  align-items: center;
  
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: -15px;
  }

  .explore-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #ff7f50;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 10px;
    text-align: center;
    line-height: 1.2;
    cursor: pointer;
  }
`;

const ShopNowButton = styled.button`
  background-color: transparent;
  border: 1px solid currentColor;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
  font-size: ${(props) => props.theme.fontmd};
  cursor: pointer;
  display: flex;
  align-items: center;
  
  svg {
    margin-left: 0.5rem;
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: auto;
    z-index: 5;
  }
`;

const Product = ({ img, title = "" }) => {
  return (
    <Item>
      <img src={img} alt={title} loading="eager" decoding="async" />
    </Item>
  );
};

const NewArrival = () => {
  gsap.registerPlugin(ScrollTrigger);

  const ref = useRef(null);
  const ScrollingRef = useRef(null);

  const newArrivals = TextData.newArrivals;
  const productImages = [
    MediaData.image19,
    MediaData.image20,
    MediaData.image21,
    MediaData.image22
  ];

  useLayoutEffect(() => {
    let element = ref.current;
    let scrollingElement = ScrollingRef.current;

    if (!element || !scrollingElement) return;

    let t1 = gsap.timeline();

    const setupAnimation = () => {
      // Clear any existing triggers for this component
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element || trigger.trigger === scrollingElement) {
          trigger.kill();
        }
      });

      t1.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: "bottom+=100% top-=100%",
          scroller: ".App",
          scrub: 1,
          pin: true,
          refreshPriority: -1,
        },
        ease: "none",
      });

      // Vertical Scrolling
      t1.fromTo(
        scrollingElement,
        {
          y: "0",
        },
        {
          y: "-100%",
          scrollTrigger: {
            trigger: scrollingElement,
            start: "top top",
            end: "bottom top",
            scroller: ".App",
            scrub: 1,
            refreshPriority: -1,
          },
        }
      );

      // Title horizontal movement animation
      t1.fromTo(
        ".new-arrival-title",
        {
          x: 0,
        },
        {
          x: 200,
          scrollTrigger: {
            trigger: element,
            start: "top top",
            end: "bottom+=100% top-=100%",
            scroller: ".App",
            scrub: 1,
            refreshPriority: -1,
          },
        },
        0 // Start at the same time as other animations
      );

      // Text vertical movement animation (right side - goes down)
      t1.fromTo(
        ".new-arrival-text",
        {
          y: 0,
        },
        {
          y: 400,
          scrollTrigger: {
            trigger: element,
            start: "top top",
            end: "bottom+=100% top-=100%",
            scroller: ".App",
            scrub: 1,
            refreshPriority: -1,
          },
        },
        0 // Start at the same time as other animations
      );

      // Left text vertical movement animation (left side - goes up)
      t1.fromTo(
        ".new-arrival-left-text",
        {
          y: 400,
        },
        {
          y: -400,
          scrollTrigger: {
            trigger: element,
            start: "top top",
            end: "bottom+=100% top-=100%",
            scroller: ".App",
            scrub: 1,
            refreshPriority: -1,
          },
        },
        0 // Start at the same time as other animations
      );

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
    <Section ref={ref} id="new-arrival">
      <Container ref={ScrollingRef}>
        {productImages.map((img, idx) => (
          <Product key={idx} img={img} title={newArrivals.products[idx] || ""} />
        ))}
      </Container>
      <Title className="new-arrival-title">
        {newArrivals.title}
      </Title>

      <LeftContainer className="new-arrival-left-text">
        <Discount>
          <LightningBolt /> 25% OFF
        </Discount>
        <Description>
          Buy from our range of 34 different styles of Backpacks.
        </Description>
        <CircleButton>
          <img src={MediaData.image23} alt="User" />
          <div className="explore-circle">
            LET'S<br/>EXPLORE<br/>MORE
            <StarIcon />
          </div>
        </CircleButton>
        <Squiggle style={{ marginTop: '2rem' }} />
      </LeftContainer>

      <RightContainer className="new-arrival-text">
        <FourPetals style={{ marginBottom: '1rem' }} />
        <HandDrawnArrow style={{ marginBottom: '2rem' }} />
        <ShopNowButton>
          Shop Now 
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ShopNowButton>
        <Description style={{ marginTop: '1rem' }}>
          Buy from our range of 34 different styles of Backpacks. Discover hundreds more styles and options and all with Free Delivery* options and hassle free Returns at the Back Pack Shop.
        </Description>
      </RightContainer>
    </Section>
  );
};

export default NewArrival;
