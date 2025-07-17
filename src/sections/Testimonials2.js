import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { motion, useTransform } from "framer-motion";
import { useLocomotiveScroll } from "react-locomotive-scroll";

import TextData from "../TextData.json";
import MediaData from "../MediaData.json";

const TestimonialSection = styled.section`
  min-height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  background: transparent;
  background-color: transparent;
  color: #000;
  position: relative;
  overflow: visible;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  
  .subheading {
    font-size: 1rem;
    color: ${MediaData.color};
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.5rem;
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border: 1px solid ${MediaData.color};
    border-radius: 12px;
  }

  h2 {
    font-size: 3.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 1rem;
    line-height: 1.2;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  p {
    font-size: 1.125rem;
    color: #555;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .cta-button {
    margin-top: 2rem;
    padding: 0.8rem 2rem;
    background: ${MediaData.color};
    color: #fff;
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

const PhotoGrid = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const Photo = styled(motion.div)`
  position: absolute;
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  overflow: hidden;
`;

const DottedLine = styled(motion.div)`
  position: absolute;
  width: 1px;
  height: 100px;
  background-image: linear-gradient(to bottom, #f9a825 33%, transparent 0%);
  background-position: left;
  background-size: 1px 10px;
  background-repeat: repeat-y;
  z-index: -1;
`;

const Testimonials2 = () => {
  const testimonials = TextData.testimonialsSection.testimonials.slice(0, 12);
  const sectionRef = useRef(null);
  const { scroll } = useLocomotiveScroll();
  
  // State to track scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const photoPositions = [
    // Left column - enhanced parallax rates for more dramatic effect
    { top: '10%', left: '5%', width: '10vw', height: '10vw', image: MediaData.image1, parallaxRate: 0.8, line: { from: 'bottom', to: { top: '38%', left: '10%' } } },
    { top: '30%', left: '8%', width: '12vw', height: '12vw', image: MediaData.image2, parallaxRate: 1.2 },
    { top: '55%', left: '5%', width: '11vw', height: '11vw', image: MediaData.image3, parallaxRate: 0.6 },
    { top: '75%', left: '10%', width: '9vw', height: '9vw', image: MediaData.image4, parallaxRate: 1.0 },
    
    // Top Row - enhanced parallax rates
    { top: '8%', left: '20%', width: '8vw', height: '8vw', image: MediaData.image5, parallaxRate: 1.5 },
    { top: '12%', left: '35%', width: '13vw', height: '13vw', image: MediaData.image6, parallaxRate: 0.4 },
    { top: '10%', left: '55%', width: '10vw', height: '10vw', image: MediaData.image7, parallaxRate: 1.8 },
    
    // Right Column - enhanced parallax rates
    { top: '8%', right: '5%', width: '11vw', height: '11vw', image: MediaData.image8, parallaxRate: 1.1 },
    { top: '30%', right: '8%', width: '9vw', height: '9vw', image: MediaData.image9, parallaxRate: 1.6 },
    { top: '50%', right: '6%', width: '14vw', height: '14vw', image: MediaData.image10, parallaxRate: 0.7, line: { from: 'bottom', to: { top: '78%', right: '10%' } } },
    { top: '78%', right: '12%', width: '10vw', height: '10vw', image: MediaData.image11, parallaxRate: 1.3 }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      }
    },
  };

  // Use Locomotive Scroll events instead of Framer Motion's useScroll
  useEffect(() => {
    if (!scroll || !sectionRef.current) return;

    const handleScroll = (args) => {
      const element = sectionRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress based on element position
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Progress from 0 to 1 as element moves through viewport
      let progress = 0;
      
      if (elementTop <= windowHeight && elementTop + elementHeight >= 0) {
        // Element is in viewport
        progress = 1 - (elementTop + elementHeight) / (windowHeight + elementHeight);
        progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
      } else if (elementTop > windowHeight) {
        // Element is below viewport
        progress = 0;
      } else if (elementTop + elementHeight < 0) {
        // Element is above viewport
        progress = 1;
      }
      
      setScrollProgress(progress);
      console.log('Scroll progress:', progress);
    };

    scroll.on("scroll", handleScroll);
    
    return () => {
      scroll.off("scroll", handleScroll);
    };
  }, [scroll]);

  // Calculate parallax transforms based on scroll progress
  const getParallaxTransform = (rate) => {
    return -600 * rate * scrollProgress;
  };
  
  return (
    <TestimonialSection ref={sectionRef}>
      <PhotoGrid variants={containerVariants} initial="hidden" animate="show">
        {photoPositions.map((pos, index) => {
          const parallaxRate = pos.parallaxRate || 0.3;
          const yTransform = getParallaxTransform(parallaxRate);
          
          return (
            <React.Fragment key={index}>
              <Photo
                variants={itemVariants}
                style={{
                  top: pos.top,
                  left: pos.left,
                  right: pos.right,
                  bottom: pos.bottom,
                  width: pos.width,
                  height: pos.height,
                  backgroundImage: `url(${pos.image})`,
                  zIndex: pos.zIndex,
                  translateY: yTransform,
                }}
                whileHover={{ scale: 1.05, zIndex: 10, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              />
            {pos.line && (
              <DottedLine 
                style={{
                  top: `calc(${pos.top} + ${pos.height})`,
                  left: pos.line.to.left,
                  right: pos.line.to.right,
                  height: `calc(${pos.line.to.top} - (${pos.top} + ${pos.height}))`
                }}
                initial={{ height: 0 }}
                animate={{ height: `calc(${pos.line.to.top} - (${pos.top} + ${pos.height}))` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              />
            )}
          </React.Fragment>
        );
        })}
      </PhotoGrid>

      <Header
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="subheading">{TextData.testimonials2Section.subheading}</span>
        <h2>
          {TextData.testimonials2Section.title}
        </h2>
        <p>
          {TextData.testimonials2Section.description}
        </p>
        <button className="cta-button">
          {TextData.testimonials2Section.ctaButton}
        </button>
      </Header>
    </TestimonialSection>
  );
};

export default Testimonials2;