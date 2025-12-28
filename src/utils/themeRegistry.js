// src/utils/themeRegistry.js

// Import your background assets here
import floralRedBg from '../assets/bg/floral-red.png'; 
// import royalGoldBg from '../assets/bg/royal-gold.png';

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
            paddingHorizontal: 40,
        }
    },
    'floral-red': {
        id: 'floral-red',
        name: 'Ganesh Floral',
        asset: floralRedBg, // Using the imported image
        styles: {
            primaryColor: '#991b1b',
            fontFamily: 'serif',
            // HIGHER PADDING to push text inside the flower border
            paddingTop: 65,    
            paddingBottom: 65,
            paddingHorizontal: 145, 
        }
    },
    // Add more themes...
};

export const getThemeConfig = (themeId) => {
    return THEMES[themeId] || THEMES['minimal'];
};