import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";

const ScrollTriggerProxy = () => {
  const { scroll } = useLocomotiveScroll();
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    // If the scroll instance isn't ready, do nothing
    if (!scroll) {
      return;
    }

    const locomotiveElement = scroll.el;
    const isMobile = window.innerWidth <= 768;

    // Set up the scroller proxy
    ScrollTrigger.scrollerProxy(locomotiveElement, {
      scrollTop(value) {
        return arguments.length
          ? scroll.scrollTo(value, { 
              duration: 0, 
              disableLerp: true
            })
          : scroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // LocomotiveScroll handles things differently on mobile, so we use a different pinType
      pinType: locomotiveElement.style.transform ? "transform" : "fixed",
    });

    // --- SETUP EVENT LISTENERS ---

    // 1. Update ScrollTrigger on Locomotive Scroll's "scroll" event
    const handleScroll = (args) => {
      ScrollTrigger.update(args);
    };
    scroll.on("scroll", handleScroll);

    // 2. Update Locomotive Scroll on ScrollTrigger's "refresh" event
    const handleRefresh = () => {
      scroll.update();
    };
    ScrollTrigger.addEventListener("refresh", handleRefresh);

    // 3. Handle mobile orientation changes and resize
    const handleResize = () => {
      // Refresh ScrollTrigger after a small delay to ensure proper mobile handling
      setTimeout(() => {
        ScrollTrigger.refresh();
        scroll.update();
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Initial refresh to sync everything
    ScrollTrigger.refresh();

    // --- CLEANUP ---
    return () => {
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
      scroll.off("scroll", handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      
      // Kill all ScrollTrigger instances
      ScrollTrigger.killAll();
    };
  }, [scroll]);

  return null;
};

export default ScrollTriggerProxy;