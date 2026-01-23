import React from 'react';
import { Page, View, Text, Image, Svg, Circle, StyleSheet } from '@react-pdf/renderer';
import { createBaseStyles, PdfPhoto } from '../PdfPrimitives';

/**
 * Divine Mandala PDF Layout
 * Mirrors DivineMandalaRenderer.jsx
 * Features decorative circular borders, centered layout, and spiritual aesthetic
 */
const DivineMandalaPdfRenderer = ({ biodata }) => {
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
            paddingTop: 60 * scale,
            paddingHorizontal: 40 * scale,
            alignItems: 'center',
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
        // Decorative Background Mandala - Fixed
        mandalaBg: {
            position: 'absolute',
            top: -160 * scale,
            left: '50%',
            marginLeft: -250 * scale, // Center 500width
            width: 500 * scale,
            height: 500 * scale,
            opacity: 0.1,
            zIndex: -1,
        },
        headerContainer: {
            alignItems: 'center',
            marginBottom: 40 * scale,
            width: '100%',
        },
        photoWrapper: {
            padding: 5,
            borderWidth: 2,
            borderStyle: 'dashed',
            borderColor: styles.primaryColor,
            borderRadius: 100 * scale, // circle
            marginBottom: 20 * scale,
        },
        headerIcon: {
            width: 60 * scale,
            height: 60 * scale,
            marginBottom: 5,
            tintColor: styles.primaryColor,
        },
        headerTitle: {
            fontFamily: styles.hindiFont,
            fontSize: 28 * scale,
            fontWeight: 'bold',
            color: styles.primaryColor,
            textTransform: 'uppercase',
            letterSpacing: 3,
            textAlign: 'center',
            marginBottom: 20 * scale,
        },
        overviewBox: {
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: `${styles.primaryColor}30`,
            paddingVertical: 15 * scale,
            paddingHorizontal: 10 * scale,
            maxWidth: 400 * scale,
        },
        overviewText: {
            fontSize: styles.fontSize * 0.9 * scale,
            fontStyle: 'italic',
            textAlign: 'center',
            opacity: 0.8,
        },
        // Sections
        sectionContainer: {
            marginBottom: 25 * scale,
            alignItems: 'center',
            width: '45%', // For 2 column grid effect in layout
        },
        sectionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10 * scale,
            gap: 10,
        },
        sectionDecorLine: {
            width: 25 * scale,
            height: 1,
            backgroundColor: `${styles.primaryColor}30`,
        },
        sectionTitle: {
            fontSize: styles.fontSize * 0.85 * scale,
            fontWeight: 'bold',
            color: styles.primaryColor,
            textTransform: 'uppercase',
            letterSpacing: 2,
        },
        // Fields - Centered stack
        fieldStack: {
            alignItems: 'center',
            gap: 4,
        },
        fieldGroup: {
            alignItems: 'center',
            marginBottom: 6 * scale,
        },
        fieldLabel: {
            fontSize: styles.fontSize * 0.65 * scale,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            opacity: 0.6,
        },
        fieldValue: {
            fontSize: styles.fontSize * 0.875 * scale,
            fontWeight: 'medium',
            textAlign: 'center',
        },
        // Container for sections to mimic masonry/grid
        gridContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            width: '100%',
        },
    });

    return (
        <Page size="A4" style={pdfStyles.page}>
            {biodata.processedBg && (
                <View style={pdfStyles.backgroundLayer} fixed>
                    <Image src={biodata.processedBg} style={pdfStyles.backgroundImage} />
                </View>
            )}

            {/* Mandala SVG Background */}
            <View style={pdfStyles.mandalaBg} fixed>
                <Svg viewBox="0 0 100 100">
                    <Circle cx="50" cy="50" r="48" stroke={styles.primaryColor} strokeWidth="1" strokeDasharray="2 2" fill="none" />
                    <Circle cx="50" cy="50" r="35" stroke={styles.primaryColor} strokeWidth="0.5" strokeDasharray="3 1" fill="none" />
                </Svg>
            </View>

            <View style={pdfStyles.headerContainer}>
                {photo && (
                    <View style={pdfStyles.photoWrapper}>
                        <PdfPhoto
                            src={photo}
                            styles={styles}
                            size={120 * scale}
                            shape="circle"
                            borderWidth={0}
                        />
                    </View>
                )}
                {header.enabled && (
                    <>
                        {biodata.processedHeaderIcon && (
                            <Image src={biodata.processedHeaderIcon} style={pdfStyles.headerIcon} />
                        )}
                        <Text style={pdfStyles.headerTitle}>{header.text}</Text>
                    </>
                )}
                {overview?.enabled && overview.text && (
                    <View style={pdfStyles.overviewBox}>
                        <Text style={pdfStyles.overviewText}>"{overview.text}"</Text>
                    </View>
                )}
            </View>

            <View style={pdfStyles.gridContainer}>
                {enabledSections.map(s => (
                    <View key={s.id} style={pdfStyles.sectionContainer} wrap={false}>
                        <View style={pdfStyles.sectionHeader}>
                            <View style={pdfStyles.sectionDecorLine} />
                            <Text style={pdfStyles.sectionTitle}>{s.title}</Text>
                            <View style={pdfStyles.sectionDecorLine} />
                        </View>

                        <View style={pdfStyles.fieldStack}>
                            {s.fields.filter(f => f.enabled).map(f => (
                                <View key={f.id} style={pdfStyles.fieldGroup}>
                                    <Text style={pdfStyles.fieldLabel}>{f.label}</Text>
                                    <Text style={pdfStyles.fieldValue}>{f.value}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        </Page>
    );
};

export default DivineMandalaPdfRenderer;
