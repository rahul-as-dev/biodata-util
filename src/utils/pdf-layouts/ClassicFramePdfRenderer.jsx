import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { createBaseStyles, PdfPhoto } from '../PdfPrimitives';

/**
 * Classic Frame PDF Layout
 * Mirrors ClassicFrameRenderer.jsx for react-pdf
 * Features a double border frame (solid + dashed) and centralized layout
 */
const ClassicFramePdfRenderer = ({ biodata }) => {
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
            padding: 20 * scale,
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
        // Outer Frame
        outerFrame: {
            borderWidth: 4,
            borderColor: styles.primaryColor,
            padding: 4,
            height: '100%',
        },
        // Inner Frame (Dashed)
        innerFrame: {
            borderWidth: 1,
            borderColor: styles.primaryColor,
            borderStyle: 'dashed',
            padding: 30 * scale,
            height: '100%',
            alignItems: 'center',
        },
        headerIcon: {
            width: 60 * scale,
            height: 60 * scale,
            marginBottom: 10 * scale,
            marginTop: -10 * scale,
            objectFit: 'contain',
        },
        headerTitle: {
            fontFamily: styles.hindiFont,
            fontSize: 24 * scale,
            fontWeight: 'bold',
            color: styles.primaryColor,
            textTransform: 'uppercase',
            letterSpacing: 2,
            textAlign: 'center',
            marginBottom: 20 * scale,
        },
        mainContent: {
            flexDirection: 'row',
            width: '100%',
            gap: 30 * scale,
        },
        leftColumn: {
            width: '33%',
            alignItems: 'center',
        },
        rightColumn: {
            flex: 1,
        },
        // Photo with frame
        photoFrame: {
            borderWidth: 1,
            borderColor: styles.primaryColor,
            padding: 4,
            borderRadius: 75 * scale, // Circle
            marginBottom: 20 * scale,
        },
        overviewBox: {
            borderWidth: 1,
            borderColor: `${styles.primaryColor}20`,
            backgroundColor: `${styles.primaryColor}05`,
            padding: 15 * scale,
            borderRadius: 8,
        },
        overviewText: {
            fontSize: styles.fontSize * 0.9 * scale,
            fontStyle: 'italic',
            textAlign: 'center',
            opacity: 0.8,
            fontFamily: 'Times-Roman', // Serif feel
        },
        // Section Styles
        sectionContainer: {
            marginBottom: 20 * scale,
        },
        sectionTitle: {
            fontSize: styles.fontSize * 0.9 * scale,
            fontWeight: 'bold',
            color: styles.primaryColor,
            textTransform: 'uppercase',
            letterSpacing: 2,
            textAlign: 'center',
            borderBottomWidth: 1,
            borderBottomColor: `${styles.primaryColor}40`,
            paddingBottom: 4,
            marginBottom: 10 * scale,
        },
        fieldRow: {
            flexDirection: 'row',
            marginBottom: 6 * scale,
            fontSize: styles.fontSize * 0.85 * scale,
        },
        fieldLabel: {
            width: '30%',
            textAlign: 'right',
            paddingRight: 10,
            fontStyle: 'italic',
            opacity: 0.7,
            fontFamily: 'Times-Roman',
        },
        fieldValue: {
            width: '70%',
            fontWeight: 'medium',
        },
    });

    return (
        <Page size="A4" style={pdfStyles.page}>
            {biodata.processedBg && (
                <Image src={biodata.processedBg} style={pdfStyles.backgroundImage} fixed />
            )}

            <View style={pdfStyles.outerFrame}>
                <View style={pdfStyles.innerFrame}>
                    {biodata.processedHeaderIcon && (
                        <Image
                            src={biodata.processedHeaderIcon}
                            style={pdfStyles.headerIcon}
                        />
                    )}
                    {header.enabled && (
                        <Text style={pdfStyles.headerTitle}>{header.text}</Text>
                    )}

                    <View style={pdfStyles.mainContent}>
                        {/* Left Column: Photo & Overview */}
                        <View style={pdfStyles.leftColumn}>
                            {photo && (
                                <View style={pdfStyles.photoFrame}>
                                    <PdfPhoto
                                        src={photo}
                                        styles={styles}
                                        size={120 * scale}
                                        shape="circle"
                                        borderWidth={1} // Outer frame handles border
                                    />
                                </View>
                            )}
                            {overview?.enabled && overview.text && (
                                <View style={pdfStyles.overviewBox}>
                                    <Text style={pdfStyles.overviewText}>"{overview.text}"</Text>
                                </View>
                            )}
                        </View>

                        {/* Right Column: Details */}
                        <View style={pdfStyles.rightColumn}>
                            {enabledSections.map(s => (
                                <View key={s.id} style={pdfStyles.sectionContainer} wrap={false}>
                                    <Text style={pdfStyles.sectionTitle}>{s.title}</Text>
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
                </View>
            </View>
        </Page>
    );
};

export default ClassicFramePdfRenderer;
