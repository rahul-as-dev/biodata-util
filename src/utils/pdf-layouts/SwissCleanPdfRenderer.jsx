import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { createBaseStyles, PdfPhoto } from '../PdfPrimitives';

/**
 * Swiss Clean PDF Layout
 * Mirrors SwissCleanRenderer.jsx for react-pdf
 * Features a clean, minimalist design with bold typography
 */
const SwissCleanPdfRenderer = ({ biodata }) => {
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
            padding: '40 50',
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
            borderBottomWidth: 3,
            borderBottomColor: styles.primaryColor,
            paddingBottom: 20 * scale,
            marginBottom: 30 * scale,
        },
        headerContent: {
            flex: 1,
            paddingRight: 30 * scale,
        },
        headerTitle: {
            fontFamily: styles.hindiFont,
            fontSize: 36 * scale,
            fontWeight: 'bold',
            color: styles.primaryColor,
            textTransform: 'uppercase',
            letterSpacing: -1,
            lineHeight: 1,
            marginBottom: 5,
        },
        overviewText: {
            marginTop: 15 * scale,
            fontSize: styles.fontSize * 0.9 * scale,
            fontWeight: 'medium',
            color: styles.textColor,
            opacity: 0.7,
            maxWidth: 350,
        },
        // Grid Container - 2 Column Masonry
        gridContainer: {
            flexDirection: 'row',
            gap: 40 * scale,
        },
        column: {
            width: '48%',
        },
        sectionContainer: {
            marginBottom: 30 * scale,
        },
        sectionTitle: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10 * scale,
        },
        sectionTitleBar: {
            width: 15 * scale,
            height: 4 * scale,
            backgroundColor: styles.primaryColor,
            marginRight: 8,
        },
        sectionTitleText: {
            fontSize: styles.fontSize * 1.1 * scale,
            fontWeight: 'bold',
            textTransform: 'uppercase',
        },
        fieldGroup: {
            marginBottom: 10 * scale,
        },
        fieldLabel: {
            fontSize: styles.fontSize * 0.65 * scale,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 1,
            opacity: 0.5,
            marginBottom: 2,
        },
        fieldValue: {
            fontSize: styles.fontSize * 0.9 * scale,
            fontWeight: 'medium',
            paddingBottom: 2,
            borderBottomWidth: 1,
            borderBottomColor: `${styles.primaryColor}20`,
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
                        <>
                            <Text style={pdfStyles.headerTitle}>{header.text}</Text>
                            {biodata.processedHeaderIcon && (
                                <Image
                                    src={biodata.processedHeaderIcon}
                                    style={{ width: 40 * scale, height: 40 * scale, marginTop: 5, opacity: 0.7 }}
                                />
                            )}
                        </>
                    )}
                    {overview?.enabled && overview.text && (
                        <Text style={pdfStyles.overviewText}>{overview.text}</Text>
                    )}
                </View>
                {photo && (
                    <PdfPhoto
                        src={photo}
                        styles={styles}
                        size={120 * scale}
                        shape="square" // Swiss Clean usually implies sharp edges
                        borderWidth={2}
                    />
                    // Note: SwissClean preview applies grayscale/contrast. 
                    // react-pdf doesn't support filters easily without canvas preprocessing.
                    // Providing standard photo for now.
                )}
            </View>

            {/* Content - Masonry Layout */}
            <View style={pdfStyles.gridContainer}>
                {/* Left Column */}
                <View style={pdfStyles.column}>
                    {enabledSections.map((s, i) => i % 2 === 0 && (
                        <View key={s.id} style={pdfStyles.sectionContainer} wrap={false}>
                            <View style={pdfStyles.sectionTitle}>
                                <View style={pdfStyles.sectionTitleBar} />
                                <Text style={pdfStyles.sectionTitleText}>{s.title}</Text>
                            </View>
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
                <View style={pdfStyles.column}>
                    {enabledSections.map((s, i) => i % 2 !== 0 && (
                        <View key={s.id} style={pdfStyles.sectionContainer} wrap={false}>
                            <View style={pdfStyles.sectionTitle}>
                                <View style={pdfStyles.sectionTitleBar} />
                                <Text style={pdfStyles.sectionTitleText}>{s.title}</Text>
                            </View>
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

export default SwissCleanPdfRenderer;
