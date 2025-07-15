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
  display: flex;
  justify-content: flex-start;
  align-items: center;

  h1 {
    width: 5rem;
    margin: 0 2rem;
  }

  @media (max-width: 48em) {
    left: 40%;
    padding-left: 20%;
  }
`;

const Product = styled.div`
  width: 30rem;
  margin: 0 2rem;
  position: relative;

  @media (max-width: 64em) {
    width: 25rem;
    margin: 0 1rem;
  }
  @media (max-width: 48em) {
    width: 20rem;
    margin: 0 0.5rem;
  }
`;

const ProductImg = styled.div`
  width: 100%;
  height: 60vh;
  background-color: ${(props) => props.theme.text};
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 48em) {
    height: 40vh;
  }
`;

const ProductTitle = styled.h1`
  font-weight: 500;
  font-size: ${(props) => props.theme.fontlg};
  margin-top: 1rem;
  display: flex;
  justify-content: left;
  align-items: center;
  color: ${(props) => props.theme.text};

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontmd};
  }
`;

const ProductPrice = styled.span`
  font-weight: 700;
  font-size: ${(props) => props.theme.fontmd};
  color: ${(props) => props.theme.accent};

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontsm};
  }
`;

const Shop = () => {
  gsap.registerPlugin(ScrollTrigger);

  const ref = useRef(null);
  const horizontalRef = useRef(null);

  // Check if device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

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

    let pinWrapWidth = scrollingElement.offsetWidth;
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

      // Mobile-optimized settings
      const scrubValue = isMobile ? 0.5 : 1; // Faster scrub on mobile
      const pinValue = isMobile ? false : true; // Disable pin on mobile for better performance

      t1.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: endValue,
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
        height: pinValue ? `${scrollingElement.scrollWidth}px` : "auto",
        ease: "none",
      });

      // Horizontal Scrolling (only if not pinned on mobile)
      if (!isMobile || !pinValue) {
        t1.to(scrollingElement, {
          scrollTrigger: {
            trigger: scrollingElement,
            start: "top top",
            end: endValue,
            scroller: ".App",
            scrub: scrubValue,
            refreshPriority: -1,
          },
          x: -scrollDistance,
          ease: "none",
        });
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
          <Product key={idx}>
            <ProductImg>
              <img src={img} alt={shopProductTitles[idx] || ""} />
            </ProductImg>
            <ProductTitle>{shopProductTitles[idx] || ""}</ProductTitle>
          </Product>
        ))}
      </Right>
    </Section>
  );
};

export default Shop;
