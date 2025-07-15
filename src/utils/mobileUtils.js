import gsap from "gsap";

// Mobile detection utility
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
};

// Touch event handling
export const preventScrollOnTouch = (element) => {
  if (!isMobile()) return;

  const preventDefault = (e) => {
    e.preventDefault();
  };

  element.addEventListener('touchstart', preventDefault, { passive: false });
  element.addEventListener('touchmove', preventDefault, { passive: false });

  return () => {
    element.removeEventListener('touchstart', preventDefault);
    element.removeEventListener('touchmove', preventDefault);
  };
};

// Mobile-optimized animation settings
export const getMobileAnimationSettings = () => {
  return {
    scrub: isMobile() ? 0.5 : 1, // Faster scrub on mobile
    pin: isMobile() ? false : true, // Disable pin on mobile for better performance
    duration: isMobile() ? 0.5 : 1, // Faster animations on mobile
    ease: isMobile() ? "power2.out" : "power3.out" // Smoother easing on mobile
  };
};

// Mobile-specific scroll behavior
export const getMobileScrollBehavior = () => {
  return isMobile() ? 'auto' : 'smooth';
};

// Prevent zoom on input focus (iOS)
export const preventZoomOnFocus = () => {
  if (!isMobile()) return;

  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.style.fontSize = '16px';
    });
  });
};

// Optimize GSAP animations for mobile
export const optimizeGSAPForMobile = () => {
  if (!isMobile()) return;
  
  // Reduce GSAP ticker frequency on mobile for better performance
  gsap.ticker.lagSmoothing(0);
  gsap.ticker.fps(30); // Lower FPS on mobile
}; 