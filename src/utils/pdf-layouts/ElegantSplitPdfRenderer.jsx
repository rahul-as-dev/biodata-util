import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { createBaseStyles, PdfPhoto } from '../PdfPrimitives';

/**
 * Elegant Split PDF Layout
 * Mirrors ElegantSplitRenderer.jsx for react-pdf
 * Features a split header colored primary with photo, and simple body
 */
const ElegantSplitPdfRenderer = ({ biodata }) => {
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
        // Header block: Primary color background
        headerBlock: {
            flexDirection: 'row',
            backgroundColor: styles.primaryColor,
            height: 220 * scale,
            padding: 30 * scale,
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        headerContent: {
            width: '65%',
            color: '#ffffff',
        },
        headerTitle: {
            fontFamily: styles.hindiFont,
            fontSize: 22 * scale,
            fontWeight: 'bold',
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: 2,
            marginBottom: 8 * scale,
        },
        overviewText: {
            fontSize: styles.fontSize * 0.9 * scale,
            fontStyle: 'italic',
            color: '#ffffff',
            opacity: 0.9,
            paddingLeft: 10,
            borderLeftWidth: 2,
            borderLeftColor: 'rgba(255,255,255,0.4)',
        },
        // Photo container with rotation and shadow effect
        photoWrapper: {
            backgroundColor: '#ffffff',
            padding: 6,
            transform: 'rotate(2deg)',
        },
        // Main content area
        contentContainer: {
            padding: 40 * scale,
            flex: 1,
        },
        sectionContainer: {
            marginBottom: 20 * scale,
        },
        sectionTitle: {
            fontSize: styles.fontSize * 1.2 * scale,
            fontWeight: 'bold',
            color: styles.primaryColor,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            paddingBottom: 2,
            borderBottomWidth: 1.5,
            borderBottomColor: `${styles.primaryColor}70`,
            marginBottom: 8 * scale,
        },
        fieldRow: {
            flexDirection: 'row',
            marginBottom: 3 * scale,
        },
        fieldLabel: {
            width: '35%',
            fontSize: styles.fontSize * 0.75 * scale,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: styles.textColor,
            opacity: 0.8,
        },
        fieldValue: {
            width: '65%',
            fontSize: styles.fontSize * scale,
            color: styles.textColor,
        },
    });

    return (
        <Page size="A4" style={pdfStyles.page}>
            {biodata.processedBg && (
                <Image src={biodata.processedBg} style={pdfStyles.backgroundImage} fixed />
            )}

            {/* Header Block */}
            <View style={pdfStyles.headerBlock}>
                <View style={pdfStyles.headerContent}>
                    {header.enabled && (
                        <View>
                            {biodata.processedHeaderIcon && (
                                <Image
                                    src={biodata.processedHeaderIcon}
                                    style={{ width: 50 * scale, height: 50 * scale, marginBottom: 5, marginTop: -15, alignSelf: 'center' }}
                                />
                            )}
                            <Text style={pdfStyles.headerTitle}>{header.text}</Text>
                        </View>
                    )}
                    {overview?.enabled && overview.text && (
                        <Text style={pdfStyles.overviewText}>{overview.text}</Text>
                    )}
                </View>

                {/* Photo with frame effect */}
                {photo && (
                    <View style={pdfStyles.photoWrapper}>
                        <PdfPhoto
                            src={photo}
                            styles={styles}
                            size={120 * scale}
                            shape="square" // ElegantSplit forces square-ish photo
                            borderWidth={2} // Wrapper provides the frame
                        />
                    </View>
                )}
            </View>

            {/* Body Content */}
            <View style={pdfStyles.contentContainer}>
                {enabledSections.map(s => (
                    <View key={s.id} style={pdfStyles.sectionContainer} wrap={false}>
                        <Text style={pdfStyles.sectionTitle}>{s.title}</Text>
                        {s.fields.filter(f => f.enabled).map(f => (
                            <View key={f.id} style={pdfStyles.fieldRow}>
                                <Text style={pdfStyles.fieldLabel}>{f.showLabel !== false ? f.label : ''}</Text>
                                <Text style={pdfStyles.fieldValue}>{f.value}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </Page>
    );
};

export default ElegantSplitPdfRenderer;
