import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
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

  /* Theme-adaptive overlay that sits above the video but below foreground content */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(${(props) => props.theme.bodyRgba}, 0.4);
    pointer-events: none; /* Ensure clicks pass through */
    z-index: 1;
  }

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    object-position: center;
    transition: opacity 1s ease-in-out;
    z-index: 0; /* Stay below overlay */
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
      font-size: calc(2.5rem + 5vw);
      letter-spacing: normal;
      margin: 0 -0.02em;
      padding: 0;
    }
    @media (max-width: 30em) {
      font-size: calc(2rem + 6vw);
      letter-spacing: normal;
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
    text-shadow: 1px 1px 1px ${(props) => props.theme.body};
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

const CTAButton = styled(motion.button)`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
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
  border-radius: 0;
  
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
    top: 1rem;
    right: 1rem;
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
    top: 0.8rem;
    right: 0.8rem;
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

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  cursor: pointer;
  
  svg {
    width: 2rem;
    height: 2rem;
    color: ${(props) => props.theme.text};
  }
  
  @media (max-width: 48em) {
    bottom: 1.5rem;
    
    svg {
      width: 1.5rem;
      height: 1.5rem;
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
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoStartTime, setVideoStartTime] = useState(Date.now());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextVideoIndex, setNextVideoIndex] = useState(1);
  const [nextVideoLoaded, setNextVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const nextVideoRef = useRef(null);
  const transitionTimeoutRef = useRef(null);
  
  // Split brand name into individual characters including spaces for animation
  const brandName = TextData.brand.name;
  const brandTagline = TextData.brand.tagline;

  // Cleanup function for transitions
  const cleanupTransition = useCallback(() => {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
  }, []);

  // Memoize unique videos to prevent recalculation on every render
  const uniqueVideos = useMemo(() => {
    const videos = MediaData.videos;
    const videoList = [];
    const seenIds = new Set();
    
    // Filter to get best quality version of each unique video
    videos.forEach(video => {
      if (!seenIds.has(video.id)) {
        seenIds.add(video.id);
        // Find the best quality version of this video ID
        const allVersions = videos.filter(v => v.id === video.id);
        const bestVersion = allVersions.reduce((best, current) => {
          // Prefer HD over SD, and higher resolution within same quality
          if (best.quality !== current.quality) {
            return best.quality === 'hd' ? best : current;
          }
          return best.width > current.width ? best : current;
        });
        videoList.push(bestVersion);
      }
    });
    
    console.log(`Found ${videoList.length} unique videos:`, videoList.map(v => `ID:${v.id} ${v.width}x${v.height} ${v.quality}`));
    return videoList;
  }, []);

  // Get video URL by index
  const getVideoUrl = useCallback((index) => {
    const video = uniqueVideos[index % uniqueVideos.length];
    return video?.link || MediaData.videos[0]?.link;
  }, [uniqueVideos]);

  // Get the current video URL - memoized to prevent unnecessary recalculations
  const currentVideoUrl = useMemo(() => {
    const video = uniqueVideos[currentVideoIndex % uniqueVideos.length];
    console.log(`Current video: ${currentVideoIndex}, ID: ${video?.id}, URL: ${video?.link}`);
    return video?.link || MediaData.videos[0]?.link;
  }, [currentVideoIndex, uniqueVideos]);

  // Get the next video URL
  const nextVideoUrl = useMemo(() => {
    return getVideoUrl(nextVideoIndex);
  }, [nextVideoIndex, getVideoUrl]);

  // Handle video end event to chain to next video (creates seamless looping)
  const handleVideoEnded = useCallback(() => {
    const minPlayTime = 8000; // Minimum 8 seconds per video
    const playTime = Date.now() - videoStartTime;
    
    if (playTime < minPlayTime) {
      console.log(`Video too short (${playTime}ms), letting it loop once more`);
      return;
    }

    const nextIndex = (currentVideoIndex + 1) % uniqueVideos.length;
    console.log(`Video ended after ${playTime}ms. Switching from index ${currentVideoIndex} to ${nextIndex} (${uniqueVideos.length} unique videos)`);
    
    // Start crossfade transition
    setIsTransitioning(true);
    setNextVideoIndex(nextIndex);
    setNextVideoLoaded(false);
    
    // Clean up any existing transition
    cleanupTransition();
    
    // Complete the transition after the next video loads and crossfade completes
    transitionTimeoutRef.current = setTimeout(() => {
      setCurrentVideoIndex(nextIndex);
      setIsTransitioning(false);
      setVideoStartTime(Date.now());
      
      // Prepare the next video for future transition
      const futureNext = (nextIndex + 1) % uniqueVideos.length;
      setNextVideoIndex(futureNext);
      setNextVideoLoaded(false);
      
      transitionTimeoutRef.current = null;
    }, 1500); // Allow time for crossfade
  }, [currentVideoIndex, uniqueVideos.length, videoStartTime, cleanupTransition]);

  // Handle main video load event
  const handleVideoLoaded = useCallback(() => {
    setIsVideoLoaded(true);
    setVideoStartTime(Date.now());
    console.log(`Video loaded successfully: index ${currentVideoIndex}`);
  }, [currentVideoIndex]);

  // Handle next video load event
  const handleNextVideoLoaded = useCallback(() => {
    setNextVideoLoaded(true);
    console.log(`Next video loaded successfully: index ${nextVideoIndex}`);
  }, [nextVideoIndex]);

  // Handle video error
  const handleVideoError = useCallback(() => {
    console.warn('Video failed to load, trying next video...');
    const nextIndex = (currentVideoIndex + 1) % uniqueVideos.length;
    setCurrentVideoIndex(nextIndex);
  }, [currentVideoIndex, uniqueVideos.length]);

  // Handle next video error
  const handleNextVideoError = useCallback(() => {
    console.warn('Next video failed to load, trying another...');
    const futureNext = (nextVideoIndex + 1) % uniqueVideos.length;
    setNextVideoIndex(futureNext);
  }, [nextVideoIndex, uniqueVideos.length]);

  // Reset video index when screen size changes
  useEffect(() => {
    const handleResize = () => {
      setCurrentVideoIndex(0);
      setNextVideoIndex(1);
      setIsTransitioning(false);
      console.log('Screen resized, reset to first video');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle video transitions - only reset loaded state when index changes
  useEffect(() => {
    console.log(`Video index changed to: ${currentVideoIndex}, URL: ${currentVideoUrl}`);
    // Only reset loaded state if we're not in the middle of a transition
    if (!isTransitioning) {
      setIsVideoLoaded(false);
    }
  }, [currentVideoIndex, isTransitioning]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupTransition();
    };
  }, [cleanupTransition]);

  const handleCTAClick = useCallback(() => {
    // Scroll to footer section
    const footerSection = document.querySelector('footer');
    if (footerSection) {
      footerSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleScrollDown = useCallback(() => {
    // Scroll to the next section (featured collection)
    const nextSection = document.querySelector('#featured-collection');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <VideoContainer>
      {/* Main video */}
      <video 
        key={`video-${currentVideoIndex}`}
        ref={videoRef}
        src={currentVideoUrl} 
        type="video/mp4" 
        autoPlay 
        muted 
        playsInline
        onEnded={handleVideoEnded}
        onLoadedData={handleVideoLoaded}
        onError={handleVideoError}
        style={{ 
          opacity: isVideoLoaded && !isTransitioning ? 1 : (isTransitioning ? 0 : 0),
          transition: 'opacity 1s ease-in-out',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      />
      
      {/* Next video for crossfade transitions */}
      {isTransitioning && (
        <video 
          key={`next-video-${nextVideoIndex}`}
          ref={nextVideoRef}
          src={nextVideoUrl} 
          type="video/mp4" 
          autoPlay 
          muted 
          playsInline
          onLoadedData={handleNextVideoLoaded}
          onError={handleNextVideoError}
          style={{ 
            opacity: nextVideoLoaded ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1
          }}
        />
      )}
      
      <CTAButton
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 6, duration: 0.8 }}
        onClick={handleCTAClick}
      >
        Shop Now
      </CTAButton>
      <Title variants={container} initial="hidden" animate="show">
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
      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          delay: 8, 
          duration: 1,
          scale: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }
        }}
        onClick={handleScrollDown}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </ScrollIndicator>
    </VideoContainer>
  );
};

export default CoverVideo;
