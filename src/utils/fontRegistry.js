
// We don't import Font at top level to avoid bundling @react-pdf/renderer immediately
// const { Font } = await import('@react-pdf/renderer');

let fontsRegistered = false;

export const registerFonts = async () => {
    if (fontsRegistered) return;

    try {
        const { Font } = await import('@react-pdf/renderer');

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

        fontsRegistered = true;
        console.log('Fonts registered successfully');
    } catch (error) {
        console.error('Failed to register fonts:', error);
    }
};

export default registerFonts;
