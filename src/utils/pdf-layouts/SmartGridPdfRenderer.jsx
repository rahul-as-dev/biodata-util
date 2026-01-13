import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { createBaseStyles, PdfPhoto } from '../PdfPrimitives';

/**
 * Smart Grid PDF Layout
 * Mirrors SmartGridRenderer.jsx for react-pdf
 * Features a Masonry-like grid layout (2 columns) using flexWrap
 */
const SmartGridPdfRenderer = ({ biodata }) => {
    const { header, photo, overview, sections, customizations } = biodata;
    const styles = createBaseStyles(customizations);
    const enabledSections = sections.filter(s => s.enabled);
    const backgroundColor = customizations?.backgroundColor || '#ffffff';
    const scale = 0.85;

    const pdfStyles = StyleSheet.create({
        page: {
            fontFamily: styles.fontFamily,
            fontSize: styles.fontSize * scale,
            color: styles.textColor,
            backgroundColor: backgroundColor,
            lineHeight: 1.4,
            padding: '30 40',
            position: 'relative',
        },
        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        headerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 25 * scale,
            paddingBottom: 15 * scale,
            borderBottomWidth: 2,
            borderBottomColor: styles.primaryColor,
        },
        headerContent: {
            flex: 1,
            paddingRight: 20,
        },
        headerTitle: {
            fontFamily: styles.hindiFont,
            fontSize: 22 * scale,
            fontWeight: 'bold',
            color: styles.primaryColor,
            textTransform: 'uppercase',
            letterSpacing: -0.5,
        },
        overviewText: {
            marginTop: 10 * scale,
            fontSize: styles.fontSize * 0.9 * scale,
            color: styles.textColor,
            opacity: 0.7,
            maxWidth: 300,
        },
        photoShadow: {
            shadowColor: styles.primaryColor,
            shadowOpacity: 0.4,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 0,
        },
        // Grid Container
        gridContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        // Grid Item (Card)
        card: {
            width: '100%', // Full width of column
            marginBottom: 15 * scale,
            padding: 15 * scale,
            backgroundColor: 'rgba(255,255,255,0.7)',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: `${styles.primaryColor}20`,
            borderLeftWidth: 4,
            borderLeftColor: styles.primaryColor,
        },
        cardTitle: {
            fontSize: styles.fontSize * 0.9 * scale,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            marginBottom: 10 * scale,
            color: styles.textColor,
            opacity: 0.9,
        },
        fieldGroup: {
            marginBottom: 8 * scale,
        },
        fieldLabel: {
            fontSize: styles.fontSize * 0.65 * scale,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: styles.textColor,
            opacity: 0.5,
            marginBottom: 2,
        },
        fieldValue: {
            fontSize: styles.fontSize * 0.9 * scale,
            fontWeight: 500,
            color: styles.textColor,
        },
    });

    return (
        <Page size="A4" style={pdfStyles.page}>
            {biodata.processedBg && (
                <Image src={biodata.processedBg} style={pdfStyles.backgroundImage} fixed />
            )}

            {/* Header Area */}
            <View style={pdfStyles.headerContainer}>
                <View style={pdfStyles.headerContent}>
                    {header.enabled && (
                        <Text style={pdfStyles.headerTitle}>{header.text}</Text>
                    )}
                    {overview?.enabled && overview.text && (
                        <Text style={pdfStyles.overviewText}>{overview.text}</Text>
                    )}
                </View>
                {photo && (
                    <PdfPhoto
                        src={photo}
                        styles={styles}
                        size={100 * scale}
                        shape="square" // SmartGrid uses square/rounded photos
                        borderWidth={2}
                    />
                )}
            </View>

            {/* Grid Content - Masonry Layout (2 Columns) */}
            <View style={pdfStyles.gridContainer}>
                {/* Left Column */}
                <View style={{ width: '48%' }}>
                    {enabledSections.map((s, i) => i % 2 === 0 && (
                        <View key={s.id} style={pdfStyles.card} wrap={false}>
                            <Text style={pdfStyles.cardTitle}>{s.title}</Text>
                            {s.fields.filter(f => f.enabled).map(f => (
                                <View key={f.id} style={pdfStyles.fieldGroup}>
                                    <Text style={pdfStyles.fieldLabel}>{f.label}</Text>
                                    <Text style={pdfStyles.fieldValue}>{f.value}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>

                {/* Right Column */}
                <View style={{ width: '48%' }}>
                    {enabledSections.map((s, i) => i % 2 !== 0 && (
                        <View key={s.id} style={pdfStyles.card} wrap={false}>
                            <Text style={pdfStyles.cardTitle}>{s.title}</Text>
                            {s.fields.filter(f => f.enabled).map(f => (
                                <View key={f.id} style={pdfStyles.fieldGroup}>
                                    <Text style={pdfStyles.fieldLabel}>{f.label}</Text>
                                    <Text style={pdfStyles.fieldValue}>{f.value}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    );
};

export default SmartGridPdfRenderer;
