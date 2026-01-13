import { Font } from '@react-pdf/renderer';

// Register Noto Sans for Latin text
Font.register({
    family: 'NotoSans',
    fonts: [
        { src: '/fonts/NotoSans-Regular.ttf', fontWeight: 'normal' },
        { src: '/fonts/NotoSans-Bold.ttf', fontWeight: 'bold' },
    ]
});

// Register Noto Sans Devanagari for Hindi text
Font.register({
    family: 'NotoSansDevanagari',
    fonts: [
        { src: '/fonts/NotoSansDevanagari-Regular.ttf', fontWeight: 'normal' },
        { src: '/fonts/NotoSansDevanagari-Bold.ttf', fontWeight: 'bold' },
    ]
});

// Prevent hyphenation issues with Hindi text
Font.registerHyphenationCallback(word => [word]);

export default {};
