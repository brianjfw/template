import { useState, useEffect } from 'react';

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const checkMobile = () => {
      // Check screen width (mobile breakpoint at 768px)
      const isMobileWidth = window.innerWidth < 768;
      
      // Check user agent for mobile devices
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      // Consider it mobile if either condition is true
      setIsMobile(isMobileWidth || isMobileUserAgent);
    };

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      checkMobile();
    }, 100);

    // Check on window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Return false during SSR to prevent hydration mismatch
  if (!isClient) {
    return false;
  }

  return isMobile;
};

export default useMobileDetection; 