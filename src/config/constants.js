import { DashedFrame, ElegantBorder, IndianArch, MandalaWatermark, OmIcon1Component, GaneshaSimple1Component, GaneshaSimple2Component, GaneshaSimple3Component, OmIcon2Component, Swastika1Component, SimpleOm1Component } from "../assets/SVGAssets";
export const lightToMediumColors = [
    "#FFFFFF", // White
    "#F5F5F5", // White Smoke
    "#E0E0E0", // Light Gray
    "#FFCDD2", // Light Red
    "#F8BBD0", // Light Pink
    "#E1BEE7", // Light Purple
    "#D1C4E9", // Deep Purple Tint
    "#C5CAE9", // Indigo Tint
    "#BBDEFB", // Blue Tint
    "#B3E5FC", // Light Blue
    "#B2EBF2", // Cyan Tint
    "#B2DFDB", // Teal Tint
    "#C8E6C9", // Green Tint
    "#DCEDC8", // Light Green
    "#F0F4C3", // Lime Tint
    "#FFF9C4", // Yellow Tint
    "#FFECB3", // Amber Tint
    "#FFE0B2", // Orange Tint
    "#FFCCBC", // Deep Orange Tint
    "#D7CCC8", // Light Brown
];
export const mediumToDarkColors = [
    "#000000", // Black
    "#424242", // Dark Gray
    "#B71C1C", // Dark Red
    "#880E4F", // Dark Pink / Maroon
    "#4A148C", // Dark Purple
    "#311B92", // Deep Violet
    "#1A237E", // Dark Indigo
    "#0D47A1", // Dark Blue
    "#01579B", // Navy Blue
    "#006064", // Dark Cyan
    "#004D40", // Dark Teal
    "#1B5E20", // Dark Green
    "#33691E", // Forest Green
    "#827717", // Olive
    "#F57F17", // Dark Yellow / Gold
    "#FF6F00", // Dark Amber
    "#E65100", // Dark Orange
    "#BF360C", // Burnt Orange
    "#3E2723", // Dark Brown
    "#37474F", // Blue Gray
];
export const textColorsLight = [
    "#FFFFFF", // Pure White (High Emphasis)
    "#E2E8F0", // Off-White / Slate 200
    "#CBD5E1", // Light Gray / Slate 300
    "#94A3B8", // Medium Gray (Low Emphasis/Placeholder)
    "#FCA5A5", // Soft Red (Error on dark)
    "#FDBA74", // Soft Orange (Warning on dark)
    "#FDE047", // Soft Yellow
    "#86EFAC", // Soft Green (Success on dark)
    "#67E8F9", // Soft Cyan
    "#93C5FD", // Soft Blue (Links on dark)
    "#A5B4FC", // Soft Indigo
    "#D8B4FE", // Soft Purple
    "#F0ABFC", // Soft Pink
    "#E5E7EB", // Cool Gray
    "#D1D5DB", // Neutral Gray
    "#FEF3C7", // Pale Amber
    "#D1FAE5", // Pale Emerald
    "#CFFAFE", // Pale Cyan
    "#E0E7FF", // Pale Indigo
    "#FAE8FF", // Pale Fuchsia
];

export const textColorsDark = [
    "#000000", // Pure Black
    "#111827", // Rich Black / Gray 900
    "#374151", // Dark Gray / Gray 700
    "#4B5563", // Medium Gray (Subtitles)
    "#DC2626", // Strong Red (Error)
    "#EA580C", // Deep Orange
    "#D97706", // Dark Amber (Warning)
    "#65A30D", // Olive Green
    "#166534", // Dark Green (Success)
    "#0891B2", // Dark Cyan
    "#0284C7", // Strong Blue
    "#2563EB", // Standard Link Blue
    "#4F46E5", // Deep Indigo
    "#7C3AED", // Deep Violet
    "#9333EA", // Deep Purple
    "#C026D3", // Deep Magenta
    "#BE185D", // Dark Pink
    "#991B1B", // Darkest Red
    "#0F172A", // Navy / Slate 900
    "#334155", // Slate 700
];

export const HEADER_ICONS = [
    {
        Icon: undefined,
        text: '',
        svgPath: null,
    },
    {
        Icon: SimpleOm1Component,
        text: '|| ॐ नमो नारायणाय ||',
        svgPath: '/src/assets/svg-assets/SimpleOm1.svg',
    },
    {
        Icon: OmIcon1Component,
        text: '|| मंगलम् ||',
        svgPath: null, // Inline SVG in SVGAssets.jsx, handled separately
    },
    {
        Icon: OmIcon2Component,
        text: '|| शुभे शोभन मंगलम् ||',
        svgPath: '/src/assets/svg-assets/OmIcon2.svg',
    },
    {
        Icon: GaneshaSimple1Component,
        text: '|| ॐ श्री गणेशाय नमः ||',
        svgPath: '/src/assets/svg-assets/SimpleGanesha1.svg',
    },
    {
        Icon: GaneshaSimple2Component,
        text: '|| ॐ गं गणपतये नमः ||',
        svgPath: '/src/assets/svg-assets/SimpleGanesha2.svg',
    },
    {
        Icon: GaneshaSimple3Component,
        text: '|| श्री गणेशाय नमः ||',
        svgPath: '/src/assets/svg-assets/SimpleGanesha3.svg',
    },
    {
        Icon: Swastika1Component,
        text: '|| शुभ लाभ ||',
        svgPath: '/src/assets/svg-assets/Swastika1.svg',
    }
]