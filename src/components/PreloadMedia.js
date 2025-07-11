import { useEffect } from 'react';
import MediaData from '../MediaData.json';

// Component that preloads all media assets (images & videos) on first mount
const PreloadMedia = () => {
  useEffect(() => {
    // Preload images
    Object.keys(MediaData)
      .filter((key) => key.startsWith('image'))
      .forEach((key) => {
        const src = MediaData[key];
        if (typeof src === 'string') {
          const img = new Image();
          img.src = src;
        }
      });

    // Preload videos using <link rel="preload"> for better caching
    if (Array.isArray(MediaData.videos)) {
      MediaData.videos.forEach((video) => {
        if (video?.link) {
          const linkEl = document.createElement('link');
          linkEl.rel = 'preload';
          linkEl.as = 'video';
          linkEl.href = video.link;
          // Fallback to video/mp4 if file_type is missing
          linkEl.type = video.file_type || 'video/mp4';
          // Avoid duplicating identical preload tags
          if (!document.head.querySelector(`link[rel='preload'][href='${video.link}']`)) {
            document.head.appendChild(linkEl);
          }
        }
      });
    }
  }, []);

  // This component does not render anything visible
  return null;
};

export default PreloadMedia; 