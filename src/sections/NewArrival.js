import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import TextData from "../TextData.json";
import MediaData from "../MediaData.json";

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

  /* background-color: yellow; */
`;

const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  height: 100vh;

  /* Removed outline */
  box-shadow: none;
  border: none;
  z-index: 11;
  overflow: visible;

  @media (max-width: 70em) {
    width: 40vw;
    height: 100vh;
  }
  @media (max-width: 64em) {
    width: 50vw;
    /* Removed outline */
    box-shadow: none;
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

const Text = styled.div`
  width: 20%;
  font-size: ${(props) => props.theme.fontlg};
  font-weight: 300;
  color: ${({ theme }) => (isColorLight(theme.text) ? '#2c2c2c' : theme.text)};
  position: absolute;
  padding: 2rem;
  top: 0;
  right: 0;
  z-index: 11;

  p {
    color: ${({ theme }) => (isColorLight(theme.text) ? '#2c2c2c' : theme.text)};
  }

  @media (max-width: 48em) {
    display: none;
  }

  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontxs};
  }
`;
const Container = styled.div`
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 64em) {
    width: 100%;
  }
  @media (max-width: 48em) {
    width: 100%;
  }
  @media (max-width: 30em) {
    width: 100%;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5rem 0;
  img {
    width: 100%;
    height: auto;
    z-index: 5;
    border-radius: 20px;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  &:hover img {
    transform: scale(1.05);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
  }
  
  h2 {
    text-align: center;
    color: ${(props) => props.theme.greyDark};
    margin-top: 1rem;
  }
`;

const Product = ({ img, title = "" }) => {
  return (
    <Item>
      <img src={img} alt={title} loading="eager" decoding="async" />
      <h2>{title}</h2>
    </Item>
  );
};

const NewArrival = () => {
  gsap.registerPlugin(ScrollTrigger);

  const ref = useRef(null);
  const ScrollingRef = useRef(null);

  // Check if device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

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

      // Mobile-optimized settings
      const scrubValue = isMobile ? 0.5 : 1; // Faster scrub on mobile
      const pinValue = isMobile ? false : true; // Disable pin on mobile for better performance

      t1.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: "bottom+=100% top-=100%",
          scroller: ".App",
          scrub: scrubValue,
          pin: pinValue,
          refreshPriority: -1,
          onToggle: self => {
            // Force refresh on toggle for mobile
            if (window.innerWidth <= 768) {
              ScrollTrigger.refresh();
            }
          }
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
            scrub: scrubValue,
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
            scrub: scrubValue,
            refreshPriority: -1,
          },
        },
        0 // Start at the same time as other animations
      );

      // Text vertical movement animation (desktop only)
      if (window.innerWidth > 768) {
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
              scrub: scrubValue,
              refreshPriority: -1,
            },
          },
          0 // Start at the same time as other animations
        );
      }

      ScrollTrigger.refresh();
    };

    // Setup with a small delay to ensure elements are ready
    const timeoutId = setTimeout(setupAnimation, 1000);

    // Handle resize for mobile orientation changes
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 250);
      }
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
  }, [isMobile]);

  return (
    <Section ref={ref} id="new-arrival">
      <Overlay>
        <Container ref={ScrollingRef}>
          {productImages.map((img, idx) => (
            <Product key={idx} img={img} title={newArrivals.products[idx] || ""} />
          ))}
        </Container>
      </Overlay>
      <Title className="new-arrival-title">
        {newArrivals.title}
      </Title>

      <Text className="new-arrival-text">
        {newArrivals.description.split("\n\n").map((para, idx) => (
          <p key={idx} style={{ marginBottom: '1em' }}>{para}</p>
        ))}
      </Text>
    </Section>
  );
};

export default NewArrival;
