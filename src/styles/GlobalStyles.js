import { createGlobalStyle } from "styled-components";
import "@fontsource/kaushan-script";
import "@fontsource/sirin-stencil";
import { adaptive } from './Themes';

const GlobalStyles = createGlobalStyle`

*,*::before,*::after{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    /* Prevent horizontal scroll on mobile */
    overflow-x: hidden;
    /* Improve touch scrolling on iOS */
    -webkit-overflow-scrolling: touch;
    /* Prevent zoom on input focus on iOS */
    -webkit-text-size-adjust: 100%;
}

body{
    font-family:"Sirin Stencil";
    overflow-x: hidden;
    background: ${adaptive.body};
    color: ${adaptive.text};
    transition: background-color 0.3s ease, color 0.3s ease;
    /* Improve touch scrolling */
    -webkit-overflow-scrolling: touch;
    /* Prevent pull-to-refresh on mobile */
    overscroll-behavior: none;
    /* Prevent horizontal scroll */
    max-width: 100vw;
}

/* Improve scrolling performance on mobile */
.App {
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: none;
}

/* Prevent text selection on interactive elements */
button, a, [data-scroll] {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Allow text selection on content areas */
p, h1, h2, h3, h4, h5, h6, span {
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
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

/* Mobile-specific improvements */
@media (max-width: 768px) {
    /* Keep smooth scrolling for Framer Motion animations */
    [data-framer-motion] {
        scroll-behavior: smooth !important;
    }
    
    /* Improve touch targets */
    button, a, [role="button"] {
        min-height: 44px;
        min-width: 44px;
    }
    
    /* Prevent horizontal overflow */
    body, html {
        overflow-x: hidden;
        width: 100%;
    }
    
    /* Optimize animations for mobile */
    * {
        /* Reduce motion for better performance */
        animation-duration: 0.5s !important;
        transition-duration: 0.3s !important;
    }
}

`
export default GlobalStyles;