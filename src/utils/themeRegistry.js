// src/utils/themeRegistry.js
import bg1 from '../assets/bg/bg1.svg'; 
import bg2 from '../assets/bg/bg2.svg';

export const THEMES = {
  'minimal': {
    id: 'minimal',
    name: 'Clean Minimal',
    asset: null,
    padding: 30,
  },
  'floral': {
    id: 'floral',
    name: 'Floral Frame',
    asset: bg1, // This is the raw SVG
    padding: 55, // Extra padding to not overlap floral borders
  },
  'geometric': {
    id: 'geometric',
    name: 'Modern Geometric',
    asset: bg2, // This is the raw SVG
    padding: 45,
  }
};

export const getThemeConfig = (themeId) => {
  return THEMES[themeId] || THEMES['minimal'];
};