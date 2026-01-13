import React from 'react';
import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';

/**
 * Creates base style values from customizations
 * All PDF renderers use this for consistent styling
 */
export const createBaseStyles = (customizations = {}) => {
    const textColor = customizations.textColor || '#334155';
    const primaryColor = customizations.primaryColor || '#e11d48';
    const fontSize = parseFloat(customizations.fontSize) || 10;

    // Map font family to PDF-compatible fonts
    let fontFamily = 'Helvetica';
    if (customizations.fontFamily === 'serif') fontFamily = 'Times-Roman';
    else if (customizations.fontFamily === 'monospace') fontFamily = 'Courier';

    return {
        textColor,
        primaryColor,
        fontSize,
        fontFamily,
        hindiFont: 'NotoSansDevanagari',
    };
};

/**
 * Creates common StyleSheet styles used across renderers
 */
export const createCommonStyles = (baseStyles) => StyleSheet.create({
    page: {
        fontFamily: baseStyles.fontFamily,
        fontSize: baseStyles.fontSize,
        color: baseStyles.textColor,
        lineHeight: 1.5,
        position: 'relative',
    },
    absoluteFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    labelCol: {
        width: '35%',
        fontSize: baseStyles.fontSize * 0.9,
        color: '#64748b',
        fontWeight: 'bold',
    },
    valueCol: {
        width: '65%',
        fontSize: baseStyles.fontSize,
        color: baseStyles.textColor,
    },
});

/**
 * Header component with optional icon
 */
export const PdfHeader = ({ text, iconImage, styles, align = 'center' }) => (
    <View style={{ alignItems: align, marginBottom: 20 }}>
        {iconImage && (
            <Image
                src={iconImage}
                style={{ width: 40, height: 40, marginBottom: 8, objectFit: 'contain' }}
            />
        )}
        <Text style={{
            fontFamily: styles.hindiFont,
            fontSize: 18,
            color: styles.primaryColor,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
        }}>
            {text}
        </Text>
    </View>
);

/**
 * Section title with optional variants
 */
export const PdfSectionTitle = ({ children, styles, variant = 'default' }) => {
    const isFilled = variant === 'filled';

    return (
        <View style={{
            marginBottom: 8,
            backgroundColor: isFilled ? styles.primaryColor : 'transparent',
            paddingVertical: isFilled ? 4 : 2,
            paddingHorizontal: isFilled ? 8 : 0,
            borderBottomWidth: isFilled ? 0 : 1,
            borderBottomColor: '#cbd5e1',
            borderRadius: isFilled ? 3 : 0,
        }}>
            <Text style={{
                fontSize: 11,
                fontWeight: 'bold',
                color: isFilled ? '#ffffff' : styles.primaryColor,
                textTransform: 'uppercase',
                letterSpacing: 1,
            }}>
                {children}
            </Text>
        </View>
    );
};

/**
 * Field row - label: value pair
 */
export const PdfFieldRow = ({ label, value, styles, labelWidth = '35%' }) => (
    <View style={{ flexDirection: 'row', marginBottom: 4 }}>
        <Text style={{
            width: labelWidth,
            fontSize: styles.fontSize * 0.9,
            color: '#64748b',
            fontWeight: 'bold'
        }}>
            {label}
        </Text>
        <Text style={{
            width: `${100 - parseInt(labelWidth)}%`,
            fontSize: styles.fontSize,
            color: styles.textColor
        }}>
            {value}
        </Text>
    </View>
);

/**
 * Photo component with border styling
 * react-pdf Image doesn't support border, so we wrap in View
 */
export const PdfPhoto = ({ src, styles, size = 110, shape = 'circle', borderWidth = 3 }) => {
    const isCircle = shape === 'circle';
    const borderRadius = isCircle ? size / 2 : 4;
    // Ensure borderWidth is a number, default to 0 if undefined/null
    const validBorderWidth = typeof borderWidth === 'number' ? borderWidth : 1;

    return (
        <View style={{
            width: size,
            height: size,
            borderWidth: validBorderWidth,
            borderColor: styles.primaryColor,
            borderRadius: borderRadius,
            overflow: 'hidden',
        }}>
            <Image
                src={src}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: borderRadius,
                }}
            />
        </View>
    );
};

/**
 * Section wrapper with wrap control
 */
export const PdfSection = ({ title, fields, styles, variant = 'default', wrap = false }) => (
    <View wrap={wrap} style={{ marginBottom: 12 }}>
        <PdfSectionTitle styles={styles} variant={variant}>
            {title}
        </PdfSectionTitle>
        {fields.filter(f => f.enabled).map(f => (
            <PdfFieldRow key={f.id} label={f.label} value={f.value} styles={styles} />
        ))}
    </View>
);
