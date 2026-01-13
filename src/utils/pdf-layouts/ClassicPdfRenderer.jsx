import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { createBaseStyles, PdfPhoto } from '../PdfPrimitives';

/**
 * Classic Center PDF Layout
 * Mirrors ClassicRenderer.jsx for react-pdf
 */
const ClassicPdfRenderer = ({ biodata }) => {
    const { header, photo, overview, sections, customizations } = biodata;
    const styles = createBaseStyles(customizations);
    const enabledSections = sections.filter(s => s.enabled);

    // Get backgroundColor from customizations
    const backgroundColor = customizations?.backgroundColor || '#ffffff';

    // Scale factor to make PDF content more compact (matching preview proportions)
    const scale = 0.85;
    const photoSize = 90 * scale;

    const pdfStyles = StyleSheet.create({
        page: {
            fontFamily: styles.fontFamily,
            fontSize: styles.fontSize * scale,
            color: styles.textColor,
            backgroundColor: backgroundColor,
            lineHeight: 1.4,
            padding: '30 50',
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
            alignItems: 'center',
            marginBottom: 15 * scale,
            paddingBottom: 8 * scale,
            borderBottomWidth: 2,
            borderBottomColor: styles.primaryColor,
        },
        headerText: {
            fontFamily: styles.hindiFont,
            fontSize: 16 * scale,
            color: styles.primaryColor,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
        },
        personalContainer: {
            flexDirection: 'row',
            marginBottom: 15 * scale,
            gap: 15,
        },
        overviewText: {
            fontSize: styles.fontSize * 1.05 * scale,
            fontStyle: 'italic',
            textAlign: 'center',
            marginBottom: 12 * scale,
            paddingHorizontal: 15,
            color: styles.textColor,
        },
        sectionContainer: {
            marginBottom: 12 * scale,
        },
        sectionTitleWrapper: {
            marginBottom: 4 * scale,
            textAlign: 'left',
        },
        sectionTitle: {
            fontSize: styles.fontSize * 1.1 * scale,
            fontWeight: 'bold',
            color: styles.primaryColor,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            paddingBottom: 2,
            borderBottomWidth: 1.5,
            borderBottomColor: `${styles.primaryColor}70`,
        },
        fieldsContainer: {
            flexDirection: 'column',
            gap: 1,
        },
        fieldRow: {
            flexDirection: 'row',
            alignItems: 'baseline',
            marginBottom: 2 * scale,
        },
        fieldLabel: {
            width: '33%',
            fontSize: styles.fontSize * 0.7 * scale,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 0.3,
            color: styles.textColor,
            opacity: 0.7,
        },
        fieldValue: {
            width: '67%',
            fontSize: styles.fontSize * scale,
            color: styles.textColor,
        },
    });

    return (
        <Page size="A4" style={pdfStyles.page}>
            {/* Background - fixed to repeat on all pages */}
            {biodata.processedBg && (
                <Image src={biodata.processedBg} style={pdfStyles.backgroundImage} fixed />
            )}

            {/* Header with Icon */}
            {header.enabled && (
                <View style={pdfStyles.headerContainer}>
                    {biodata.processedHeaderIcon && (
                        <Image
                            src={biodata.processedHeaderIcon}
                            style={{ width: 50 * scale, height: 50 * scale, marginBottom: 6, marginTop: -25 * scale, objectFit: 'contain' }}
                        />
                    )}
                    <Text style={pdfStyles.headerText}>{header.text}</Text>
                </View>
            )}

            {/* Photo Above (if configured) */}
            {photo && customizations?.imagePlacement === 'above' && (
                <View style={{ alignItems: 'center', marginBottom: 8 * scale, marginTop: -10 * scale }}>
                    <PdfPhoto
                        src={photo}
                        styles={styles}
                        size={photoSize}
                        shape={customizations.imageShape}
                        borderWidth={3}
                    />
                </View>
            )}

            {/* Overview */}
            {overview?.enabled && overview.text && (
                <Text style={pdfStyles.overviewText}>{overview.text}</Text>
            )}

            {/* All Sections including Personal */}
            {enabledSections.map((section) => {
                // For personal section with photo on right
                if (section.id === 'personal' && photo && customizations?.imagePlacement === 'right') {
                    return (
                        <View key={section.id} style={pdfStyles.sectionContainer} wrap={false}>
                            <View style={pdfStyles.sectionTitleWrapper}>
                                <Text style={pdfStyles.sectionTitle}>{section.title}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 15 }}>
                                <View style={{ flex: 1 }}>
                                    {section.fields.filter(f => f.enabled).map(f => (
                                        <View key={f.id} style={pdfStyles.fieldRow}>
                                            <Text style={pdfStyles.fieldLabel}>{f.showLabel !== false ? f.label : ''}</Text>
                                            <Text style={pdfStyles.fieldValue}>{f.value}</Text>
                                        </View>
                                    ))}
                                </View>
                                <PdfPhoto
                                    src={photo}
                                    styles={styles}
                                    size={photoSize}
                                    shape={customizations.imageShape}
                                    borderWidth={3}
                                />
                            </View>
                        </View>
                    );
                }

                // Regular section
                return (
                    <View key={section.id} style={pdfStyles.sectionContainer} wrap={false}>
                        <View style={pdfStyles.sectionTitleWrapper}>
                            <Text style={pdfStyles.sectionTitle}>{section.title}</Text>
                        </View>
                        <View style={pdfStyles.fieldsContainer}>
                            {section.fields.filter(f => f.enabled).map(f => (
                                <View key={f.id} style={pdfStyles.fieldRow}>
                                    <Text style={pdfStyles.fieldLabel}>{f.showLabel !== false ? f.label : ''}</Text>
                                    <Text style={pdfStyles.fieldValue}>{f.value}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                );
            })}
        </Page>
    );
};

export default ClassicPdfRenderer;
