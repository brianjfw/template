import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

import TextData from "../TextData.json";
import MediaData from "../MediaData.json";
import { dark as darkTheme } from "../styles/Themes";

// Helper to determine if a hex color is light
const isColorLight = (hex) => {
  // Fallback for rgba or invalid values
  if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return false;
  let c = hex.substring(1);
  // Support shorthand e.g., #fff
  if (c.length === 3) {
    c = c.split('').map(ch => ch + ch).join('');
  }
  const bigint = parseInt(c, 16);
  if (Number.isNaN(bigint)) return false;
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
  return brightness > 186; // threshold, tweak if needed
};

const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  margin: 0 auto;
  padding: 2rem 0;
  background: #ffffff; /* Force white background */
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxxl};
  font-family: "Kaushan Script";
  font-weight: 300;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  /* Force dark color; if theme text is light choose manual dark */
  color: ${({ theme }) => (isColorLight(theme.text) ? "#1a1a1a" : theme.text)};
  margin-bottom: 3rem;
  text-align: center;
  z-index: 10;

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Subtitle = styled.p`
  font-size: ${(props) => props.theme.fontlg};
  color: ${({ theme }) => (isColorLight(theme.text) ? "#2c2c2c" : theme.text)}; /* Force dark */
  text-align: center;
  max-width: 600px;
  margin-bottom: 4rem;
  opacity: 0.8;
  z-index: 10;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontmd};
    padding: 0 2rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  width: 90%;
  z-index: 10;

  @media (max-width: 64em) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  @media (max-width: 48em) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const GridItem = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  background: ${(props) => props.theme.body};
  
  /* Enhanced dark overlay with gradient */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.6) 100%
    );
    opacity: 1;
    transition: all 0.4s ease;
    z-index: 1;
    border-radius: 20px;
  }

  /* Enhanced shimmer effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 25%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0.1) 75%,
      transparent 100%
    );
    opacity: 0;
    transform: translateX(-100%) skewX(-15deg);
    transition: all 0.6s ease;
    z-index: 2;
    pointer-events: none;
    border-radius: 20px;
  }

  &:hover::before {
    opacity: 1;
    transform: translateX(100%) skewX(-15deg);
  }

  /* Enhanced hover overlay */
  &:hover::after {
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.7) 100%
    );
    opacity: 1;
  }

  /* Enhanced hover effects */
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.25),
      0 8px 16px rgba(0, 0, 0, 0.15),
      inset 0 0 60px rgba(0, 0, 0, 0.1);
  }

  /* Add subtle border on hover */
  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 20px;

  @media (max-width: 48em) {
    height: 250px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 20px;
  
  /* Enhanced hover effects */
  ${GridItem}:hover & {
    transform: scale(1.08) rotate(1deg);
    filter: brightness(1.1) contrast(1.05);
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  /* Force white text for better readability */
  color: #ffffff;
  padding: 2rem 1.5rem 1.5rem;
  transform: translateY(0);
  transition: all 0.3s ease;
  z-index: 2;
  border-radius: 0 0 20px 20px;
`;

const ItemTitle = styled.h3`
  font-size: ${(props) => props.theme.fontlg};
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #ffffff;

  /* Keep white text on hover */
  ${GridItem}:hover & {
    color: #ffffff;
    transform: translateY(-2px);
  }
`;

const ItemDescription = styled.p`
  font-size: ${(props) => props.theme.fontsm};
  opacity: 0.9;
  line-height: 1.4;
  color: #ffffff;

  ${GridItem}:hover & {
    color: #ffffff;
    opacity: 1;
  }
`;

const Price = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, ${(props) => props.theme.text}, ${(props) => props.theme.text}dd);
  color: ${(props) => props.theme.body};
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: ${(props) => props.theme.fontsm};
  transform: scale(0) rotate(-10deg);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  
  ${GridItem}:hover & {
    transform: scale(1) rotate(0deg);
    background: linear-gradient(135deg, ${(props) => props.theme.body}, ${(props) => props.theme.body}dd);
    color: ${(props) => props.theme.text};
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 48em) {
    transform: scale(1) rotate(0deg);
  }
`;

const ProductCard = ({ img, title, description, price }) => {
  return (
    <GridItem
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -10 }}
    >
      <ImageContainer>
        <Image src={img} alt={title} loading="eager" decoding="async" />
        <Price>${price}</Price>
      </ImageContainer>
      <Overlay>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </Overlay>
    </GridItem>
  );
};

const FeaturedCollection = () => {
  gsap.registerPlugin(ScrollTrigger);
  const ref = useRef(null);

  useLayoutEffect(() => {
    let element = ref.current;

    if (!element) return;

    let t1 = gsap.timeline();

    const setupAnimation = () => {
      // Clear any existing triggers for this component
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });

      t1.fromTo(
        element.querySelectorAll(".floating-element"),
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 0.1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: element,
            start: "top center",
            end: "bottom center",
            scroller: ".App",
            scrub: 1,
            refreshPriority: -1,
          },
        }
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
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Map images to products
  const images = [
    MediaData.image1,
    MediaData.image2,
    MediaData.image3,
    MediaData.image4,
    MediaData.image5,
    MediaData.image6
  ];
  const featuredCollection = TextData.featuredCollection;
  const featuredProducts = featuredCollection.products.map((product, idx) => ({
    ...product,
    img: images[idx]
  }));

  return (
    <Section ref={ref} id="featured-collection">
      <Title
        data-scroll
        data-scroll-speed="-2"
        data-scroll-direction="horizontal"
      >
        {featuredCollection.title}
      </Title>
      
      <Subtitle
        data-scroll
        data-scroll-speed="-1"
      >
        {featuredCollection.description}
      </Subtitle>

      <GridContainer>
        {featuredProducts.map((product, index) => (
          <ProductCard
            key={index}
            img={product.img}
            title={product.title}
            description={product.description}
            price={product.price}
          />
        ))}
      </GridContainer>
    </Section>
  );
};

export default FeaturedCollection; 