import { createGlobalStyle } from "styled-components";
import "@fontsource/kaushan-script";
import "@fontsource/sirin-stencil";
import { adaptive } from './Themes';

const GlobalStyles = createGlobalStyle`

*,*::before,*::after{
    margin: 0;
    padding: 0;
}

body{
    font-family:"Sirin Stencil";
    overflow-x: hidden;
    background: ${adaptive.body};
    color: ${adaptive.text};
    transition: background-color 0.3s ease, color 0.3s ease;
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