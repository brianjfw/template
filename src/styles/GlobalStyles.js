import { createGlobalStyle } from "styled-components";
import "@fontsource/kaushan-script";
import "@fontsource/sirin-stencil";
import { adaptive } from './Themes';

const GlobalStyles = createGlobalStyle`

*,*::before,*::after{
    margin: 0;
    padding: 0;
}

html {
    /* Enable momentum scrolling on iOS */
    -webkit-overflow-scrolling: touch;
    /* Prevent horizontal scroll */
    overflow-x: hidden;
}

body{
    font-family:"Sirin Stencil";
    overflow-x: hidden;
    background: ${adaptive.body};
    color: ${adaptive.text};
    transition: background-color 0.3s ease, color 0.3s ease;
    /* Ensure proper touch scrolling */
    -webkit-overflow-scrolling: touch;
    /* Prevent pull-to-refresh on mobile */
    overscroll-behavior: none;
}

/* Fix for Locomotive Scroll on mobile */
[data-scroll-container] {
    /* Enable momentum scrolling */
    -webkit-overflow-scrolling: touch;
    /* Ensure proper touch behavior */
    touch-action: pan-y;
    /* Prevent horizontal scroll */
    overflow-x: hidden;
    /* Ensure proper mobile scrolling */
    overscroll-behavior: none;
    /* Prevent pull-to-refresh */
    overscroll-behavior-y: none;
}

/* Additional mobile scroll fixes */
.App {
    /* Enable momentum scrolling */
    -webkit-overflow-scrolling: touch;
    /* Ensure proper touch behavior */
    touch-action: pan-y;
    /* Prevent horizontal scroll */
    overflow-x: hidden;
}

/* Ensure smooth scrolling on all devices */
* {
    /* Enable momentum scrolling */
    -webkit-overflow-scrolling: touch;
}

h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
    color: ${adaptive.text};
}

a{
    color: inherit;
    text-decoration: none;
}

/* Ensure good contrast for all text elements */
p, span, div {
    color: ${adaptive.text};
}

/* Secondary text styling */
.text-secondary {
    color: ${adaptive.textSecondary};
}

/* Border and shadow utilities */
.border {
    border-color: ${adaptive.border};
}

.shadow {
    box-shadow: 0 2px 8px rgba(${adaptive.shadow});
}

.shadow-light {
    box-shadow: 0 1px 4px rgba(${adaptive.shadowLight});
}

`
export default GlobalStyles;