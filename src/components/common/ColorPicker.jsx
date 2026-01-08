import React, { useRef } from 'react';

/**
 * Simple color picker using native input[type=color] with presets.
 * @param {string} value - Current color value
 * @param {function} onChange - Handler for color change
 * @param {string} [className] - Optional className
 */
const ColorPicker = ({ value, onChange, colorPreset = [], className = '' }) => {
    const inputRef = useRef(null);

    const lightToMediumColors = [
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
    const mediumToDarkColors = [
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
    const textColorsLight = [
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

    const textColorsDark = [
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

    const handleClick = () => {
        if (inputRef.current) inputRef.current.click();
    };

    return (
        <div
            className={className + ' w-12 h-12 rounded-full border shadow-sm flex items-center justify-center cursor-pointer relative'}
            style={{ background: 'conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)' }}
            title="Pick Custom Color"
            onClick={handleClick}
        >
            <div
                className="w-7 h-7 rounded-full border-2 border-white shadow-inner"
                style={{ background: value }}
            />

            <input
                ref={inputRef}
                type="color"
                value={value}
                onChange={e => onChange(e.target.value)}
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: '100%', height: '100%' }}
                tabIndex={-1}
                aria-label="Color picker"
                // 2. Link the input to the datalist ID
                list="light-color-presets"
            />

            {/* 3. Create the datalist with the presets */}
            <datalist id="light-color-presets">
                {colorPreset.map((color) => (
                    <option key={color} value={color} />
                ))}
            </datalist>
        </div>
    );
};

export default ColorPicker;