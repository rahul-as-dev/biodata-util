import React from 'react';
import { Page, View, Text, Image, StyleSheet, Svg, Polygon } from '@react-pdf/renderer';
import { createBaseStyles, PdfPhoto } from '../PdfPrimitives';

/**
 * Diagonal PDF Layout
 * Mirrors DiagonalRenderer.jsx for react-pdf
 * Features a diagonal background shape using SVG
 */
const DiagonalPdfRenderer = ({ biodata }) => {
    const { header, photo, overview, sections, customizations } = biodata;
    const styles = createBaseStyles(customizations);
    const enabledSections = sections.filter(s => s.enabled);
    const backgroundColor = customizations?.backgroundColor || '#ffffff';
    const scale = 0.95;

    const pdfStyles = StyleSheet.create({
        page: {
            fontFamily: styles.fontFamily,
            fontSize: styles.fontSize * scale,
            color: styles.textColor,
            backgroundColor: backgroundColor,
            // lineHeight: 1.4,
            position: 'relative',
        },
        backgroundLayer: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        },
        backgroundImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        // Diagonal SVG Background
        diagonalBg: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 300,
        },
        headerContainer: {
            padding: 40 * scale,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20 * scale,
        },
        headerContent: {
            flex: 1,
            paddingLeft: 30 * scale,
            color: '#ffffff',
        },
        headerTitle: {
            fontFamily: styles.hindiFont,
            fontSize: 24 * scale,
            fontWeight: 'bold',
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: 2,
            marginBottom: 5,
        },
        overviewText: {
            fontSize: styles.fontSize * 0.9 * scale,
            fontStyle: 'italic',
            color: '#ffffff',
            opacity: 0.9,
            paddingLeft: 10,
            borderLeftWidth: 3,
            borderLeftColor: 'rgba(255,255,255,0.4)',
            marginTop: 8,
        },
        // Photo
        photoContainer: {
            backgroundColor: '#ffffff',
            padding: 4,
            borderRadius: 75 * scale,
        },
        // Grid cards
        gridContainer: {
            padding: '0 40',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 20 * scale, // react-pdf gap support is decent now, but manual spacing safer? 
            // Better to use space-between and width logic
            justifyContent: 'space-between',
        },
        card: {
            width: '100%',
            backgroundColor: 'rgba(255,255,255,0.9)',
            padding: 15 * scale,
            borderRadius: 6,
            marginBottom: 20 * scale,
            borderWidth: 1,
            borderColor: '#e2e8f0',
        },
        cardHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: `${styles.primaryColor}20`,
            paddingBottom: 6,
            marginBottom: 8 * scale,
        },
        iconBox: {
            backgroundColor: styles.primaryColor,
            padding: '2 4',
            borderRadius: 2,
            marginRight: 6,
        },
        iconText: {
            color: '#ffffff',
            fontSize: 7 * scale,
            fontWeight: 'bold',
        },
        cardTitle: {
            fontSize: styles.fontSize * 0.9 * scale,
            fontWeight: 'bold',
            color: styles.primaryColor,
            textTransform: 'uppercase',
        },
        fieldRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 4 * scale,
        },
        fieldLabel: {
            fontSize: styles.fontSize * 0.8 * scale,
            color: styles.textColor,
            opacity: 0.6,
            fontWeight: 500,
        },
        fieldValue: {
            fontSize: styles.fontSize * 0.85 * scale,
            fontWeight: 'bold',
            textAlign: 'right',
        },
    });

    return (
        <Page size="A4" style={pdfStyles.page}>
            {biodata.processedBg && (
                <View style={pdfStyles.backgroundLayer} fixed>
                    <Image src={biodata.processedBg} style={pdfStyles.backgroundImage} />
                </View>
            )}

            {/* Diagonal Shape Background */}
            <View style={pdfStyles.diagonalBg} fixed>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <Polygon
                        points="0,0 100,0 100,75 0,100"
                        fill={styles.primaryColor}
                    />
                </Svg>
            </View>

            <View style={pdfStyles.headerContainer}>
                {photo && (
                    <View style={pdfStyles.photoContainer}>
                        <PdfPhoto
                            src={photo}
                            styles={styles}
                            size={120 * scale}
                            shape="circle"
                            borderWidth={2}
                        />
                    </View>
                )}

                <View style={pdfStyles.headerContent}>
                    {header.enabled && (
                        <>
                            {biodata.processedHeaderIcon && (
                                <Image
                                    src={biodata.processedHeaderIcon}
                                    style={{ width: 60 * scale, height: 60 * scale, marginBottom: 5, alignSelf: 'flex-start', tintColor: '#ffffff' }}
                                />
                            )}
                            <Text style={pdfStyles.headerTitle}>{header.text}</Text>
                        </>
                    )}
                    {overview?.enabled && overview.text && (
                        <Text style={pdfStyles.overviewText}>{overview.text}</Text>
                    )}
                </View>
            </View>

            <View style={pdfStyles.gridContainer}>
                {/* Left Column */}
                <View style={{ width: '48%' }}>
                    {enabledSections.map((s, i) => i % 2 === 0 && (
                        <View key={s.id} style={pdfStyles.card} wrap={false}>
                            <View style={pdfStyles.cardHeader}>
                                <View style={pdfStyles.iconBox}>
                                    <Text style={pdfStyles.iconText}>{s.title.substring(0, 2).toUpperCase()}</Text>
                                </View>
                                <Text style={pdfStyles.cardTitle}>{s.title}</Text>
                            </View>
                            {s.fields.filter(f => f.enabled).map(f => (
                                <View key={f.id} style={pdfStyles.fieldRow}>
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
                            <View style={pdfStyles.cardHeader}>
                                <View style={pdfStyles.iconBox}>
                                    <Text style={pdfStyles.iconText}>{s.title.substring(0, 2).toUpperCase()}</Text>
                                </View>
                                <Text style={pdfStyles.cardTitle}>{s.title}</Text>
                            </View>
                            {s.fields.filter(f => f.enabled).map(f => (
                                <View key={f.id} style={pdfStyles.fieldRow}>
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

export default DiagonalPdfRenderer;
