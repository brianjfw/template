import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaMapPin } from "react-icons/fa";
import TextData from "../TextData.json";
import MediaData from "../MediaData.json";

const VideoContainer = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  overflow: hidden;

  /* Dark overlay that sits above the video but below foreground content */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    pointer-events: none; /* Ensure clicks pass through */
    z-index: 2;
  }

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    object-position: center;
    transition: opacity 1.5s ease-in-out;
  }

  @media (max-width: 48em) {
    video {
      object-position: center 10%;
    }
  }
  @media (max-width: 30em) {
    video {
      object-position: center 50%;
    }
  }
`;

const Title = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.text};

  .words-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0;
    
    @media (max-width: 48em) {
      gap: 0;
    }
    
    @media (max-width: 30em) {
      flex-direction: row;
      justify-content: center;
      gap: 0;
    }
  }

  h1 {
    font-family: "Kaushan Script";
    font-size: ${(props) => props.theme.fontBig};
    text-shadow: 1px 1px 1px ${(props) => props.theme.body};
    letter-spacing: normal;
    margin: 0;
    padding: 0;
    
    @media (max-width: 48em) {
      font-size: calc(3rem + 6vw);
      letter-spacing: 0.04em;
      margin: 0 -0.02em;
      padding: 0;
    }
    @media (max-width: 30em) {
      font-size: calc(2.5rem + 7vw);
      letter-spacing: 0.04em;
      margin: 0 -0.03em;
      padding: 0;
      flex: none;
      width: auto;
      min-width: auto;
      max-width: none;
      text-align: center;
    }
  }
  h2 {
    font-family: "Sirin Stencil";
    font-size: ${(props) => props.theme.fontlg};
    font-weight: 300;
    text-transform: capitalize;

    @media (max-width: 48em) {
      font-size: ${(props) => props.theme.fontmd};
    }
    @media (max-width: 30em) {
      font-size: ${(props) => props.theme.fontsm};
      margin-top: -1.5rem;
      margin-top: 1.2rem;
    }
  }
`;

const LocationTag = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: "Sirin Stencil";
  font-size: ${(props) => props.theme.fontlg};
  font-weight: 300;
  text-transform: capitalize;
  
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  background-color: ${(props) => props.theme.brandColor};
  border: 1px solid ${(props) => props.theme.brandColor};
  color: ${(props) => props.theme.text};
  text-shadow: none;

  margin-bottom: 1rem;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontmd};
  }
  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontsm};
    margin-bottom: 0.5rem;
    padding: 0.4rem 1rem;
  }
`;

const CTAButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 5;
  
  background: transparent;
  color: ${(props) => props.theme.text};
  border: 2px solid ${(props) => props.theme.text};
  padding: 0.8rem 1.5rem;
  font-size: ${(props) => props.theme.fontsm};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  border-radius: 25px;
  
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  &:hover {
    background: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
    transform: translateX(-10px);
    box-shadow: 10px 0 20px rgba(0, 0, 0, 0.3);
    letter-spacing: 3px;
  }
  
  &:active {
    transform: translateX(-5px);
    box-shadow: 5px 0 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 48em) {
    top: 0.8rem;
    right: 0.8rem;
    padding: 0.6rem 1rem;
    font-size: ${(props) => props.theme.fontsm};
    border: none;
    
    &:hover {
      transform: translateX(-6px);
      letter-spacing: 2px;
    }
    
    &:active {
      transform: translateX(-3px);
    }
  }
  
  @media (max-width: 40em) {
    top: 0.6rem;
    right: 0.6rem;
    padding: 0.5rem 0.8rem;
    font-size: ${(props) => props.theme.fontxs};
    letter-spacing: 1px;
    
    &:hover {
      transform: translateX(-4px);
      letter-spacing: 1.5px;
    }
    
    &:active {
      transform: translateX(-2px);
    }
  }
`;

const container = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,

    transition: {
      delayChildren: 5, // 2
      staggerChildren: 0.3,
    },
  },
};
const item = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const CoverVideo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const primaryVideoRef = useRef(null);
  const secondaryVideoRef = useRef(null);
  const videoPlayStartTimeRef = useRef(Date.now());

  const brandName = TextData.brand.name;
  const brandTagline = TextData.brand.tagline;
  const brandLocation = TextData.brand.location;

  const uniqueVideos = useMemo(() => {
    const localVideos = MediaData.videos.filter(v => v.link.startsWith('assets/'));
    console.log(`Found ${localVideos.length} unique videos:`, localVideos.map(v => v.link));
    return localVideos;
  }, []);

  const primarySrc = useMemo(() => {
    if (uniqueVideos.length === 0) return '';
    return uniqueVideos[currentIndex % uniqueVideos.length]?.link;
  }, [currentIndex, uniqueVideos]);

  const secondarySrc = useMemo(() => {
    if (uniqueVideos.length === 0) return '';
    return uniqueVideos[(currentIndex + 1) % uniqueVideos.length]?.link;
  }, [currentIndex, uniqueVideos]);

  const handleVideoEnded = useCallback(() => {
    const minPlayTime = 8000;
    const elapsedTime = Date.now() - videoPlayStartTimeRef.current;
    if (elapsedTime < minPlayTime && uniqueVideos.length > 1) {
      if (primaryVideoRef.current) {
        primaryVideoRef.current.play().catch(console.error);
      }
      return;
    }
    if (uniqueVideos.length > 1) {
      setIsFading(true);
    }
  }, [uniqueVideos.length]);

  const handleFadeComplete = useCallback(() => {
    if (!isFading) return;
    
    setCurrentIndex((prevIndex) => (prevIndex + 1) % uniqueVideos.length);
    setIsFading(false);
  }, [isFading, uniqueVideos.length]);
  
  const handlePrimaryVideoLoad = useCallback(() => {
    videoPlayStartTimeRef.current = Date.now();
  }, []);

  const handleVideoError = useCallback((e) => {
    console.warn(`Error with video ${e.target.src}, skipping.`);
    setCurrentIndex(prev => (prev + 1) % uniqueVideos.length);
  }, [uniqueVideos.length]);

  useEffect(() => {
    if (isFading) {
      secondaryVideoRef.current?.play().catch(e => {
        console.error("Secondary video play failed", e);
        handleFadeComplete();
      });
    }
  }, [isFading, handleFadeComplete]);

  useEffect(() => {
    const handleResize = () => {
      console.log('Screen resized, resetting video sequence.');
      setIsFading(false);
      setCurrentIndex(0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleCTAClick = useCallback(() => {
    const footerSection = document.querySelector('footer');
    if (footerSection) {
      footerSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <VideoContainer>
      <video
        ref={primaryVideoRef}
        src={primarySrc}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        onLoadedData={handlePrimaryVideoLoad}
        onError={handleVideoError}
        style={{
          opacity: isFading ? 0 : 1,
          zIndex: 1
        }}
      />
      <video
        ref={secondaryVideoRef}
        src={secondarySrc}
        autoPlay
        muted
        playsInline
        onTransitionEnd={handleFadeComplete}
        onError={handleVideoError}
        style={{
          opacity: isFading ? 1 : 0,
          zIndex: 0
        }}
      />
      
      <CTAButton
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 6, duration: 0.8 }}
        onClick={handleCTAClick}
      >
        Shop Now
      </CTAButton>
      <Title variants={container} initial="hidden" animate="show">
        <LocationTag
          variants={item}
          data-scroll
          data-scroll-delay="0.04"
          data-scroll-speed="2"
        >
          <FaMapPin />
          <span>{brandLocation}</span>
        </LocationTag>
        <div className="words-row">
          {[...brandName].map((char, charIdx) => {
            // Start delay at 0.05 so the first letter animates
            const delay = (0.05 + 0.05 * charIdx).toFixed(2);
            
            // Handle spaces with proper styling
            if (char === ' ') {
              return (
                <motion.h1
                  variants={item}
                  data-scroll
                  data-scroll-delay={delay}
                  data-scroll-speed="4"
                  key={charIdx}
                  style={{ width: '1rem' }}
                >
                  &nbsp;
                </motion.h1>
              );
            }
            
            return (
              <motion.h1
                variants={item}
                data-scroll
                data-scroll-delay={delay}
                data-scroll-speed="4"
                key={charIdx}
              >
                {char}
              </motion.h1>
            );
          })}
        </div>
        <motion.h2
          variants={item}
          data-scroll
          data-scroll-delay="0.04"
          data-scroll-speed="2"
        >
          {brandTagline}
        </motion.h2>
      </Title>
    </VideoContainer>
  );
};

export default CoverVideo;
