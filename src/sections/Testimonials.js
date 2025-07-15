import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import TextData from "../TextData.json";

// --- STYLED COMPONENTS (with responsive adjustments) ---

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
  justify-content: center;
  align-items: center;

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
`;

const TestimonialCard = styled(motion.div)`
  width: 30rem;
  min-height: 400px;
  background: ${(props) => props.theme.body};
  padding: 2.5rem;
  margin-right: 3rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 50px rgba(0,0,0,0.25);
    border: 1px solid ${(props) => props.theme.text};
  }

  @media (max-width: 64em) {
    width: 28rem;
    padding: 2.25rem;
    margin-right: 2.5rem;
    min-height: 380px;
  }

  @media (max-width: 48em) {
    width: 80vw;
    max-width: 22rem;
    min-width: 18rem;
    padding: 1.5rem;
    margin-right: 1.5rem;
    min-height: 320px;
  }

  @media (max-width: 30em) {
    width: 85vw;
    max-width: 20rem;
    min-width: 16rem;
    padding: 1.25rem;
    margin-right: 1rem;
    min-height: 280px;
  }
`;

const QuoteIcon = styled.div`
  font-size: 3rem;
  color: ${(props) => props.theme.text};
  opacity: 0.3;
  margin-bottom: 1rem;
  font-family: serif;
  
  @media (max-width: 48em) {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }
  
  @media (max-width: 30em) {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }
`;

const TestimonialText = styled.p`
  font-size: ${(props) => props.theme.fontmd};
  line-height: 1.6;
  color: ${(props) => props.theme.text};
  margin-bottom: 2rem;
  font-style: italic;
  flex-grow: 1; // Allows the text to take up available space
  
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontsm};
    line-height: 1.5;
    margin-bottom: 1.25rem;
  }
  
  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontxs};
    line-height: 1.4;
    margin-bottom: 1rem;
  }
`;

const CustomerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto; // Pushes this to the bottom of the card
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(45deg, ${(props) => props.theme.text}, ${(props) => props.theme.grey});
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${(props) => props.theme.body};
  font-size: ${(props) => props.theme.fontlg};
  flex-shrink: 0;
  
  @media (max-width: 48em) {
    width: 40px;
    height: 40px;
    font-size: ${(props) => props.theme.fontmd};
  }
  
  @media (max-width: 30em) {
    width: 35px;
    height: 35px;
    font-size: ${(props) => props.theme.fontsm};
  }
`;

const CustomerDetails = styled.div`
  flex: 1;
`;

const CustomerName = styled.h4`
  font-size: ${(props) => props.theme.fontmd};
  font-weight: 600;
  color: ${(props) => props.theme.text};
  margin-bottom: 0.25rem;
  
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontsm};
  }
  
  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontxs};
  }
`;

const CustomerLocation = styled.p`
  font-size: ${(props) => props.theme.fontsm};
  color: ${(props) => props.theme.text};
  opacity: 0.7;
  
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxs};
  }
  
  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontxxs};
  }
`;

const Rating = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
`;

const Star = styled.span`
  color: #ffd700;
  font-size: ${(props) => props.theme.fontsm};
`;








// --- MAIN COMPONENT (with responsive logic) ---

const Testimonials = () => {
  gsap.registerPlugin(ScrollTrigger);
  const ref = useRef(null);
  const horizontalRef = useRef(null);

  const sectionData = TextData.testimonialsSection;
  const testimonials = sectionData.testimonials;
  const stats = sectionData.stats;
  
  // GSAP animations
  useLayoutEffect(() => {
    let element = ref.current;
    let scrollingElement = horizontalRef.current;

    if (!element || !scrollingElement) return;

    let pinWrapWidth = scrollingElement.offsetWidth;
    let t1 = gsap.timeline();

    const setupAnimation = () => {
      // Clear any existing triggers for this component
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element || trigger.trigger === scrollingElement) {
          trigger.kill();
        }
      });

      // Use the full width of the scrolling content
      let scrollDistance = scrollingElement.scrollWidth;
      // More natural end value calculation based on actual content width
      let endValue = `+=${scrollDistance}`;

      // Pin the section and set up the horizontal scroll
      ScrollTrigger.create({
        trigger: element,
        start: "top top",
        end: endValue,
        scroller: ".App",
        scrub: 0.5, // Slower, more controlled scrub
        pin: true,
        anticipatePin: 1,
        refreshPriority: -1,
        onToggle: self => {
          // Force refresh on toggle for mobile
          if (window.innerWidth <= 768) {
            ScrollTrigger.refresh();
          }
        },
        animation: gsap.to(scrollingElement, {
          x: -scrollDistance,
          ease: "none",
        })
      });

      ScrollTrigger.refresh();
    };

    // A small delay to ensure other elements are loaded
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
  }, []);

  const renderTestimonialCard = (testimonial, index) => (
    <TestimonialCard
      key={index}
      initial={{ filter: "grayscale(100%)" }}
      whileInView={{ filter: "grayscale(0%)" }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, amount: 0.3, margin: "0px 0px -100px 0px" }}
    >
      <QuoteIcon>"</QuoteIcon>
      <TestimonialText>{testimonial.text}</TestimonialText>
      <CustomerInfo>
        <Avatar>{testimonial.avatar}</Avatar>
        <CustomerDetails>
          <CustomerName>{testimonial.name}</CustomerName>
          <CustomerLocation>{testimonial.location}</CustomerLocation>
          <Rating>
            {[...Array(testimonial.rating)].map((_, i) => <Star key={i}>★</Star>)}
          </Rating>
        </CustomerDetails>
      </CustomerInfo>
    </TestimonialCard>
  );

  return (
    <Section ref={ref} id="testimonials">
      <Title data-scroll data-scroll-speed="-1">
        {sectionData.title}
      </Title>
      <Left>
        <p>{sectionData.subtitle}</p>
      </Left>
      <Right ref={horizontalRef}>
        {testimonials.map((testimonial, idx) => (
          renderTestimonialCard(testimonial, idx)
        ))}
      </Right>
    </Section>
  );
};

export default Testimonials;