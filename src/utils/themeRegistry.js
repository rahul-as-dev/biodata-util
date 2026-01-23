// src/utils/themeRegistry.js

// Import your background assets here
import floralRedBg from '../assets/document-bg/floral-red.png';
import Temp from '../assets/document-bg/rect21.jpg';

export const THEMES = {
    'minimal': {
        id: 'minimal',
        name: 'Minimal White',
        asset: null,
        styles: {
            primaryColor: '#e11d48',
            fontFamily: 'sans-serif',
            // Minimal padding for plain paper
            paddingTop: 40,
            paddingBottom: 40,
            paddingLeft: 80,
            paddingRight: 100
        }
    },
    'floral-red': {
        id: 'floral-red',
        name: 'Floral Frame',
        asset: floralRedBg, // Using the imported image
        styles: {
            primaryColor: '#991b1b',
            fontFamily: 'serif',
            // HIGHER PADDING to push text inside the flower border
            paddingTop: 65,    
            paddingBottom: 65,
            paddingLeft: 130,
            paddingRight: 100
        }
    },
    'temp': {
        id: 'temp',
        name: 'Temp',
        asset: Temp, // Using the imported image
        styles: {
            primaryColor: '#991b1b',
            fontFamily: 'serif',
            // HIGHER PADDING to push text inside the theme
            paddingTop: 65,    
            paddingBottom: 65,
            paddingLeft: 160,
            paddingRight: 100
        }
    },
    // Add more themes...
};

export const getThemeConfig = (themeId) => {
    return THEMES[themeId] || THEMES['minimal'];
};