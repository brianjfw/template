import { useEffect } from 'react';
import MediaData from '../MediaData.json';

// Component that preloads all media assets (images & videos) on first mount
const PreloadMedia = () => {
  useEffect(() => {
    const origins = new Set();

    // --- Helper to create or skip duplicate link tags ---
    const appendUniqueLink = (attributes = {}) => {
      if (!attributes.href) return;
      const selectorParts = Object.entries(attributes)
        .map(([k, v]) => `[${k}='${v}']`)
        .join('');
      if (!document.head.querySelector(`link${selectorParts}`)) {
        const link = document.createElement('link');
        Object.entries(attributes).forEach(([k, v]) => (link[k] = v));
        document.head.appendChild(link);
      }
    };

    // Preload and cache images dynamically
    Object.keys(MediaData)
      .filter((key) => key.startsWith('image'))
      .forEach((key) => {
        const src = MediaData[key];
        if (typeof src === 'string') {
          // Initiate fetch via Image() – keeps behaviour if JS loads first
          const img = new Image();
          img.src = src;

          // Add preload link tag so browser fetches early on HTML parse
          appendUniqueLink({ rel: 'preload', as: 'image', href: src, crossOrigin: '' });

          // Track origin for preconnect
          try {
            origins.add(new URL(src).origin);
          } catch (_) {}
        }
      });

    // Preload videos using <link rel="preload"> for better caching
    if (Array.isArray(MediaData.videos)) {
      MediaData.videos.forEach((video) => {
        if (video?.link) {
          appendUniqueLink({ rel: 'preload', as: 'video', href: video.link, type: video.file_type || 'video/mp4', crossOrigin: '' });
          try {
            origins.add(new URL(video.link).origin);
          } catch (_) {}
        }
      });
    }

    // Add preconnect hints for each unique origin (images/videos CDNs)
    origins.forEach((origin) => {
      appendUniqueLink({ rel: 'preconnect', href: origin, crossOrigin: '' });
    });
  }, []);

  // This component does not render anything visible
  return null;
};

export default PreloadMedia; 