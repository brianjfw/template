import MediaData from '../MediaData.json';

// Helper function to convert hex to rgba
const hexToRgba = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result 
        ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
        : '0,0,0';
};

// Helper function to convert hex to HSL
const hexToHsl = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 0, l: 0 };
    
    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    return { h: h * 360, s: s * 100, l: l * 100 };
};

// Helper function to convert HSL to hex
const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
};

// Determine if a color is light or dark based on luminance
const isLightColor = (hex) => {
    const { l } = hexToHsl(hex);
    return l > 50;
};

// Get relative luminance for better contrast calculations
const getLuminance = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return 0;
    
    const [r, g, b] = [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
    ].map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

// Generate intelligent color palette based on brand color
const generateColorPalette = (brandHex) => {
    const { h, s, l } = hexToHsl(brandHex);
    const isLight = isLightColor(brandHex);
    const luminance = getLuminance(brandHex);
    
    // Adjust saturation and lightness for better harmony
    const adjustedSaturation = Math.max(15, Math.min(s, 70));
    
    if (isLight) {
        // For light brand colors
        return {
            body: brandHex,
            text: hslToHex(h, Math.min(adjustedSaturation + 20, 80), 15), // Very dark but warm
            textSecondary: hslToHex(h, adjustedSaturation, 25), // Slightly lighter text
            grey: hslToHex(h, Math.max(10, adjustedSaturation * 0.3), 75), // Light warm grey
            greyDark: hslToHex(h, adjustedSaturation * 0.5, 45), // Medium grey
            greyLight: hslToHex(h, adjustedSaturation * 0.2, 85), // Very light grey
            accent: hslToHex((h + 180) % 360, adjustedSaturation, 40), // Complementary dark
            accentLight: hslToHex((h + 180) % 360, adjustedSaturation * 0.7, 70), // Complementary light
        };
    } else {
        // For dark brand colors
        return {
            body: brandHex,
            text: hslToHex(h, Math.max(10, adjustedSaturation * 0.4), 95), // Very light but warm
            textSecondary: hslToHex(h, adjustedSaturation * 0.6, 85), // Slightly darker text
            grey: hslToHex(h, adjustedSaturation * 0.3, 35), // Dark warm grey
            greyDark: hslToHex(h, adjustedSaturation * 0.4, 20), // Very dark grey
            greyLight: hslToHex(h, adjustedSaturation * 0.2, 50), // Medium grey
            accent: hslToHex((h + 180) % 360, adjustedSaturation, 80), // Complementary light
            accentLight: hslToHex((h + 180) % 360, adjustedSaturation * 0.7, 60), // Complementary medium
        };
    }
};

// Generate the intelligent theme
const brandColor = MediaData.color || '#F5E6E0';
const palette = generateColorPalette(brandColor);

// Light theme that always uses dark text
export const light = {
    body: '#ffffff',
    text: '#2d3748',
    textSecondary: '#718096',
    bodyRgba: '255,255,255',
    textRgba: '45,55,72',
    brandColor: brandColor,
    brandColorRgba: hexToRgba(brandColor),
    
    grey: '#f7fafc',
    greyDark: '#a0aec0',
    greyLight: '#e2e8f0',
    accent: brandColor,
    accentLight: hexToRgba(brandColor) + ',0.1',
    
    // Shadows and borders
    shadow: '0,0,0,0.1',
    shadowLight: '0,0,0,0.05',
    border: '#e2e8f0',
    
    fontxs: '0.75em',
    fontsm: '0.875em', 
    fontmd: '1em', 
    fontlg: '1.25em', 
    fontxl: '2em', 
    fontxxl: '3em', 
    fontxxxl: '5em', 
    fontBig: '10em', 

    navHeight: '5rem'
};

// Main adaptive theme
export const adaptive = {
    body: palette.body,
    text: palette.text,
    textSecondary: palette.textSecondary,
    bodyRgba: hexToRgba(palette.body),
    textRgba: hexToRgba(palette.text),
    brandColor: brandColor,
    brandColorRgba: hexToRgba(brandColor),
    
    grey: palette.grey,
    greyDark: palette.greyDark,
    greyLight: palette.greyLight,
    accent: palette.accent,
    accentLight: palette.accentLight,
    
    // Shadows and borders
    shadow: hexToRgba(palette.text) + ',0.1',
    shadowLight: hexToRgba(palette.greyDark) + ',0.05',
    border: palette.greyLight,
    
    fontxs: '0.75em',
    fontsm: '0.875em', 
    fontmd: '1em', 
    fontlg: '1.25em', 
    fontxl: '2em', 
    fontxxl: '3em', 
    fontxxxl: '5em', 
    fontBig: '10em', 

    navHeight: '5rem'
};

// Alternative themes for variety
export const warm = {
    ...adaptive,
    body: hslToHex(hexToHsl(brandColor).h + 10, Math.min(hexToHsl(brandColor).s + 15, 100), hexToHsl(brandColor).l),
    accent: hslToHex(hexToHsl(brandColor).h + 30, 60, 45),
};

export const cool = {
    ...adaptive,
    body: hslToHex(hexToHsl(brandColor).h - 10, Math.min(hexToHsl(brandColor).s + 10, 100), hexToHsl(brandColor).l),
    accent: hslToHex(hexToHsl(brandColor).h - 30, 60, 45),
};

export const minimal = {
    ...adaptive,
    grey: hslToHex(0, 0, isLightColor(brandColor) ? 80 : 30),
    greyDark: hslToHex(0, 0, isLightColor(brandColor) ? 60 : 20),
    greyLight: hslToHex(0, 0, isLightColor(brandColor) ? 90 : 40),
};

// Export adaptive as default (backwards compatibility)
export const dark = adaptive; 