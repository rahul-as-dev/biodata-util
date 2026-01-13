import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { createBaseStyles, PdfPhoto } from '../PdfPrimitives';

/**
 * Bold Band PDF Layout
 * Mirrors BoldBandRenderer.jsx for react-pdf
 * Features a bold primary color header band with overlapping photo
 */
const BoldBandPdfRenderer = ({ biodata }) => {
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
            paddingBottom: 30,
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
        // Header Band
        headerBand: {
            backgroundColor: styles.primaryColor,
            padding: '30 40 50 40', // Extra bottom padding for overlap
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 40 * scale, // Spacing for overlapping photo
        },
        headerContent: {
            flex: 1,
            alignItems: 'center',
            paddingRight: photo ? 20 : 0,
        },
        headerTitle: {
            fontFamily: styles.hindiFont,
            fontSize: 24 * scale,
            fontWeight: 'bold',
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            textAlign: 'center',
            marginTop: 5,
        },
        overviewText: {
            fontSize: styles.fontSize * 0.9 * scale,
            color: '#ffffff',
            opacity: 0.9,
            textAlign: 'center',
            marginTop: 8 * scale,
            maxWidth: 350,
        },
        // Overlapping Photo
        photoWrapper: {
            position: 'absolute',
            right: 40 * scale,
            bottom: -50 * scale, // Negative margin logic simulated with absolute positioning
            backgroundColor: '#ffffff',
            padding: 4,
            borderRadius: 60 * scale, // Circle
        },
        // Content Columns
        contentContainer: {
            padding: '20 40',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        sectionContainer: {
            width: '48%',
            marginBottom: 20 * scale,
        },
        sectionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: `${styles.primaryColor}40`,
            paddingBottom: 4,
            marginBottom: 8 * scale,
        },
        bullet: {
            color: styles.primaryColor,
            marginRight: 6,
            fontSize: 14,
        },
        sectionTitle: {
            fontSize: styles.fontSize * scale,
            fontWeight: 'bold',
            color: styles.primaryColor,
            textTransform: 'uppercase',
        },
        fieldRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 4 * scale,
        },
        fieldLabel: {
            fontSize: styles.fontSize * 0.85 * scale,
            color: styles.textColor,
            opacity: 0.7,
            fontWeight: 500,
        },
        fieldValue: {
            fontSize: styles.fontSize * 0.9 * scale,
            fontWeight: 'bold',
            textAlign: 'right',
            maxWidth: '60%',
        },
    });

    return (
        <Page size="A4" style={pdfStyles.page}>
            {biodata.processedBg && (
                <Image src={biodata.processedBg} style={pdfStyles.backgroundImage} fixed />
            )}

            <View style={pdfStyles.headerBand}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    {header.enabled && (
                        <>
                            {biodata.processedHeaderIcon && (
                                <Image
                                    src={biodata.processedHeaderIcon}
                                    style={{ width: 60 * scale, height: 60 * scale, marginBottom: 5, tintColor: '#ffffff' }}
                                />
                            )}
                            <Text style={pdfStyles.headerTitle}>{header.text}</Text>
                        </>
                    )}
                    {overview?.enabled && overview.text && (
                        <Text style={pdfStyles.overviewText}>{overview.text}</Text>
                    )}
                </View>

                {/* Overlapping Photo */}
                {photo && (
                    <View style={pdfStyles.photoWrapper}>
                        <PdfPhoto
                            src={photo}
                            styles={styles}
                            size={110 * scale}
                            shape="circle"
                            borderWidth={2} // Explicit non-zero border per user request
                        />
                    </View>
                )}
            </View>

            <View style={pdfStyles.contentContainer}>
                {enabledSections.map(s => (
                    <View key={s.id} style={pdfStyles.sectionContainer} wrap={false}>
                        <View style={pdfStyles.sectionHeader}>
                            <Text style={pdfStyles.bullet}>•</Text>
                            <Text style={pdfStyles.sectionTitle}>{s.title}</Text>
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
        </Page>
    );
};

export default BoldBandPdfRenderer;
