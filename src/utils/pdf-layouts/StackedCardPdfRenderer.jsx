import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { createBaseStyles, PdfPhoto } from '../PdfPrimitives';

/**
 * Stacked Card PDF Layout
 * Mirrors StackedCardRenderer.jsx for react-pdf
 * Features a colored header block and a floating card container for content
 */
const StackedCardPdfRenderer = ({ biodata }) => {
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
            padding: 30 * scale,
        },
        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        // Colored Header Cap
        headerCap: {
            height: 150 * scale,
            backgroundColor: styles.primaryColor,
            borderTopLeftRadius: 25 * scale,
            borderTopRightRadius: 25 * scale,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
        },
        headerCircleLeft: {
            position: 'absolute',
            left: -30 * scale,
            top: -30 * scale,
            width: 120 * scale,
            height: 120 * scale,
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: 60 * scale,
        },
        headerCircleRight: {
            position: 'absolute',
            right: 60 * scale,
            bottom: 30 * scale,
            width: 60 * scale,
            height: 60 * scale,
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: 30 * scale,
        },
        headerTitle: {
            fontFamily: styles.hindiFont,
            fontSize: 22 * scale, // Slightly smaller as per preview
            fontWeight: 'bold',
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: 2,
            zIndex: 10,
        },
        // Floating Card Body
        cardBody: {
            backgroundColor: 'rgba(255,255,255,0.95)',
            marginTop: -40 * scale, // Overlap header
            marginHorizontal: 15 * scale, // Inset
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 30 * scale,
            paddingTop: 60 * scale, // Space for photo
            flex: 1, // Fill remaining page space? No, let it flow. But we need it to look continuous.
            // In PDF multi-page, this is tricky. 
            // We'll mimic the "start" of the card on page 1.
            // Ideally, the whole content background should be white, but the header cap is only at the top.
            // For multi-page, we might apply a white background to the page and just use the header cap at top?
            // But preview shows a background potentially. Let's stick to the card concept.
            // To support multipage card look, we'd need to extend this view?
            // For now, let's treat it as a long view.
        },
        photoWrapper: {
            position: 'absolute',
            top: 110 * scale, // Adjust based on header cap height overlap
            left: '50%',
            marginLeft: -55 * scale, // Half of size + border
            zIndex: 20,
        },
        overviewText: {
            textAlign: 'center',
            fontStyle: 'italic',
            fontSize: styles.fontSize * 0.9 * scale,
            opacity: 0.6,
            marginBottom: 30 * scale,
            maxWidth: 400 * scale,
            alignSelf: 'center',
        },
        // Section Styles
        sectionContainer: {
            marginBottom: 25 * scale,
        },
        sectionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15 * scale,
            justifyContent: 'center',
        },
        sectionDivider: {
            flex: 1,
            height: 1,
            backgroundColor: `${styles.primaryColor}10`,
        },
        sectionTitleBox: {
            borderWidth: 1,
            borderColor: styles.primaryColor,
            borderRadius: 15 * scale,
            paddingHorizontal: 15 * scale,
            paddingVertical: 4 * scale,
            marginHorizontal: 10 * scale,
        },
        sectionTitle: {
            fontSize: styles.fontSize * 0.8 * scale,
            fontWeight: 'bold',
            color: styles.primaryColor,
            textTransform: 'uppercase',
            letterSpacing: 3,
            textAlign: 'center',
        },
        // Grid Content
        gridContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        fieldItem: {
            width: '48%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderBottomWidth: 1,
            borderBottomColor: `${styles.primaryColor}05`,
            marginBottom: 8 * scale,
            paddingBottom: 4,
        },
        fieldLabel: {
            fontSize: styles.fontSize * 0.75 * scale,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            opacity: 0.5,
            flex: 0.4,
        },
        fieldValue: {
            fontSize: styles.fontSize * 0.85 * scale,
            fontWeight: 'medium',
            textAlign: 'right',
            flex: 0.6,
        },
    });

    return (
        <Page size="A4" style={pdfStyles.page}>
            {biodata.processedBg && (
                <Image src={biodata.processedBg} style={pdfStyles.backgroundImage} fixed />
            )}

            {/* Header Cap */}
            <View style={pdfStyles.headerCap}>
                <View style={pdfStyles.headerCircleLeft} />
                <View style={pdfStyles.headerCircleRight} />
                {biodata.processedHeaderIcon && (
                    <View style={{
                        width: 50 * scale,
                        height: 50 * scale,
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        borderRadius: 25 * scale,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 10 * scale,
                        zIndex: 10,
                    }}>
                        <Image
                            src={biodata.processedHeaderIcon}
                            style={{ width: 30 * scale, height: 30 * scale, opacity: 0.9 }}
                        />
                    </View>
                )}
                {header.enabled && (
                    <Text style={pdfStyles.headerTitle}>{header.text}</Text>
                )}
            </View>

            {/* Photo - Absolutely Positioned */}
            {photo && (
                <View style={pdfStyles.photoWrapper}>
                    <PdfPhoto
                        src={photo}
                        styles={{ ...styles, primaryColor: '#ffffff' }} // White border
                        size={110 * scale}
                        shape="circle"
                        borderWidth={6}
                    />
                </View>
            )}

            {/* Card Body */}
            <View style={pdfStyles.cardBody}>
                {overview?.enabled && overview.text && (
                    <Text style={pdfStyles.overviewText}>{overview.text}</Text>
                )}

                {enabledSections.map(s => (
                    <View key={s.id} style={pdfStyles.sectionContainer} wrap={false}>
                        <View style={pdfStyles.sectionHeader}>
                            <View style={pdfStyles.sectionDivider} />
                            <View style={pdfStyles.sectionTitleBox}>
                                <Text style={pdfStyles.sectionTitle}>{s.title}</Text>
                            </View>
                            <View style={pdfStyles.sectionDivider} />
                        </View>

                        <View style={pdfStyles.gridContainer}>
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

export default StackedCardPdfRenderer;
