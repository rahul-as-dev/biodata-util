import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { createBaseStyles } from '../PdfPrimitives';

/**
 * Profile Hero PDF Layout
 * Mirrors ProfileHeroRenderer.jsx for react-pdf
 * Features a large photo area with gradient overlay and 2-column content
 */
const ProfileHeroPdfRenderer = ({ biodata }) => {
    const { header, photo, overview, sections, customizations } = biodata;
    const styles = createBaseStyles(customizations);
    const enabledSections = sections.filter(s => s.enabled);

    // Get backgroundColor from customizations
    const backgroundColor = customizations?.backgroundColor || '#ffffff';

    // Scale factor to make PDF content more compact
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
        heroContainer: {
            flexDirection: 'row',
            height: 250,
        },
        photoContainer: {
            width: '40%',
            position: 'relative',
        },
        photo: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        photoPlaceholder: {
            width: '100%',
            height: '100%',
            backgroundColor: '#f1f5f9',
            justifyContent: 'center',
            alignItems: 'center',
        },
        photoOverlay: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 12,
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        headerText: {
            fontFamily: styles.hindiFont,
            fontSize: 14 * scale,
            fontWeight: 'bold',
            color: '#ffffff',
            textTransform: 'uppercase',
        },
        overviewContainer: {
            width: '60%',
            padding: 20,
            backgroundColor: `${styles.primaryColor}08`,
            justifyContent: 'center',
        },
        overviewBorder: {
            borderLeftWidth: 3,
            borderLeftColor: styles.primaryColor,
            paddingLeft: 10,
        },
        overviewTitle: {
            fontSize: 7 * scale,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginBottom: 5,
            color: styles.textColor,
            opacity: 0.6,
        },
        overviewText: {
            fontSize: styles.fontSize * 1.05 * scale,
            fontStyle: 'italic',
            lineHeight: 1.5,
            color: styles.textColor,
        },
        // 2-column content area
        contentContainer: {
            flex: 1,
            padding: 25,
            paddingTop: 20,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
        },
        // Each section takes ~48% width for 2-column layout
        sectionWrapper: {
            width: '48%',
            marginBottom: 15 * scale,
            marginRight: '2%',
        },
        sectionTitle: {
            fontSize: styles.fontSize * 0.8 * scale,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: styles.primaryColor,
            marginBottom: 8 * scale,
            backgroundColor: 'rgba(255,255,255,0.6)',
            padding: '2 5',
            borderRadius: 2,
        },
        fieldRow: {
            flexDirection: 'row',
            marginBottom: 3 * scale,
        },
        fieldLabel: {
            width: '40%',
            fontSize: styles.fontSize * 0.55 * scale,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: styles.textColor,
            opacity: 0.5,
            paddingTop: 1,
        },
        fieldValue: {
            width: '60%',
            fontSize: styles.fontSize * 0.8 * scale,
            color: styles.textColor,
        },
    });

    return (
        <Page size="A4" style={pdfStyles.page}>
            {/* Background - fixed View wrapper for proper full-page coverage */}
            {biodata.processedBg && (
                <View style={pdfStyles.backgroundLayer} fixed>
                    <Image src={biodata.processedBg} style={pdfStyles.backgroundImage} />
                </View>
            )}

            {/* Hero Section */}
            <View style={pdfStyles.heroContainer}>
                {/* Photo with Overlay */}
                <View style={pdfStyles.photoContainer}>
                    {photo ? (
                        <Image src={photo} style={pdfStyles.photo} />
                    ) : (
                        <View style={pdfStyles.photoPlaceholder}>
                            <Text style={{ color: '#94a3b8' }}>No Photo</Text>
                        </View>
                    )}
                    {header.enabled && (
                        <View style={pdfStyles.photoOverlay}>
                            <Text style={pdfStyles.headerText}>{header.text}</Text>
                        </View>
                    )}
                </View>

                {/* Overview */}
                <View style={pdfStyles.overviewContainer}>
                    {overview?.enabled && overview.text && (
                        <View style={pdfStyles.overviewBorder}>
                            <Text style={pdfStyles.overviewTitle}>{overview.title || 'Introduction'}</Text>
                            <Text style={pdfStyles.overviewText}>{overview.text}</Text>
                        </View>
                    )}
                </View>
            </View>

            {/* Content - 2 Column Layout with flexWrap */}
            <View style={pdfStyles.contentContainer}>
                {enabledSections.map(section => (
                    <View key={section.id} style={pdfStyles.sectionWrapper} wrap={false}>
                        <Text style={pdfStyles.sectionTitle}>{section.title}</Text>
                        {section.fields.filter(f => f.enabled).map(f => (
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

export default ProfileHeroPdfRenderer;
