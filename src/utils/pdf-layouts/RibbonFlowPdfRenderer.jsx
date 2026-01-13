import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { createBaseStyles, PdfPhoto } from '../PdfPrimitives';

/**
 * Ribbon Flow PDF Layout
 * Mirrors RibbonFlowRenderer.jsx for react-pdf
 * Features a left-side color strip with icon, and content flowing on the right
 */
const RibbonFlowPdfRenderer = ({ biodata }) => {
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
            paddingTop: 30 * scale,
            paddingBottom: 30 * scale,
            paddingRight: 30 * scale,
            paddingLeft: 0, // Left strip handled separately
            flexDirection: 'row',
        },
        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        // Left Ribbon Strip - Fixed & Absolute to full height
        leftStrip: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 50 * scale,
            backgroundColor: styles.primaryColor,
            alignItems: 'center',
            paddingTop: 30 * scale,
        },
        stripIcon: {
            width: 30 * scale,
            height: 30 * scale,
            marginBottom: 20 * scale,
            tintColor: '#ffffff',
            opacity: 0.8,
        },
        stripLine: {
            width: 1,
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.2)',
            marginBottom: 30 * scale,
        },
        // Main Content Area
        mainContent: {
            flex: 1,
            marginLeft: 50 * scale, // Offset for strip
            paddingLeft: 30 * scale,
            // Header content needs to be offset
        },
        // Header Section
        headerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 30 * scale,
            gap: 25 * scale,
        },
        headerTextParams: {
            flex: 1,
        },
        headerTitle: {
            fontFamily: styles.hindiFont,
            fontSize: 28 * scale,
            fontWeight: 'bold',
            color: styles.primaryColor,
            textTransform: 'uppercase',
            letterSpacing: -0.5,
            lineHeight: 1,
        },
        overviewContainer: {
            flexDirection: 'row',
            marginTop: 10 * scale,
            gap: 8,
        },
        overviewBar: {
            width: 3,
            minHeight: 15 * scale,
            backgroundColor: styles.primaryColor,
            borderRadius: 2,
        },
        overviewText: {
            fontSize: styles.fontSize * 0.9 * scale,
            opacity: 0.7,
            flex: 1,
        },
        // Section Styles
        sectionContainer: {
            marginBottom: 30 * scale,
            paddingLeft: 20 * scale,
            position: 'relative',
        },
        sectionBar: {
            position: 'absolute',
            left: 0,
            top: 4,
            width: 3,
            height: 12 * scale,
            backgroundColor: styles.primaryColor,
            borderRadius: 2,
        },
        sectionTitle: {
            fontSize: styles.fontSize * 1.2 * scale,
            fontWeight: 'bold',
            color: styles.textColor,
            marginBottom: 12 * scale,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
        },
        // Grid for fields
        fieldGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 20 * scale,
        },
        fieldItem: {
            width: '45%', // 2 columns roughly
            borderLeftWidth: 1,
            borderLeftColor: `${styles.primaryColor}20`,
            paddingLeft: 8,
            marginBottom: 10 * scale,
        },
        fieldLabel: {
            fontSize: styles.fontSize * 0.65 * scale,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            opacity: 0.5,
            marginBottom: 2,
        },
        fieldValue: {
            fontSize: styles.fontSize * 0.9 * scale,
            fontWeight: 'medium',
        },
    });

    return (
        <Page size="A4" style={pdfStyles.page}>
            {biodata.processedBg && (
                <Image src={biodata.processedBg} style={pdfStyles.backgroundImage} fixed />
            )}

            {/* Left Strip - Fixed position */}
            <View style={pdfStyles.leftStrip} fixed>
                {biodata.processedHeaderIcon && (
                    <View style={{
                        width: 40 * scale,
                        height: 40 * scale,
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        borderRadius: 20 * scale,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20 * scale,
                    }}>
                        <Image
                            src={biodata.processedHeaderIcon}
                            style={{ width: 24 * scale, height: 24 * scale, opacity: 0.9 }}
                        />
                    </View>
                )}
                <View style={pdfStyles.stripLine} />
            </View>

            {/* Main Content */}
            <View style={pdfStyles.mainContent}>
                <View style={pdfStyles.headerContainer} wrap={false}>
                    {photo && (
                        <PdfPhoto
                            src={photo}
                            styles={styles}
                            size={100 * scale}
                            shape="square"
                            borderWidth={1}
                        />
                    )}
                    <View style={pdfStyles.headerTextParams}>
                        {header.enabled && (
                            <Text style={pdfStyles.headerTitle}>{header.text}</Text>
                        )}
                        {overview?.enabled && overview.text && (
                            <View style={pdfStyles.overviewContainer}>
                                <View style={pdfStyles.overviewBar} />
                                <Text style={pdfStyles.overviewText}>{overview.text}</Text>
                            </View>
                        )}
                    </View>
                </View>

                {enabledSections.map(s => (
                    <View key={s.id} style={pdfStyles.sectionContainer} wrap={false}>
                        <View style={pdfStyles.sectionBar} />
                        <Text style={pdfStyles.sectionTitle}>{s.title}</Text>

                        <View style={pdfStyles.fieldGrid}>
                            {s.fields.filter(f => f.enabled).map(f => (
                                <View key={f.id} style={pdfStyles.fieldItem}>
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

export default RibbonFlowPdfRenderer;
