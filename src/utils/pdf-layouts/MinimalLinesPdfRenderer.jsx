import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { createBaseStyles } from '../PdfPrimitives';

/**
 * Minimalist Lines PDF Layout
 * Mirrors MinimalistLineRenderer.jsx
 * Features clean lines, centered alignment, and minimalist typography
 */
const MinimalLinesPdfRenderer = ({ biodata }) => {
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
            padding: 40 * scale,
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
            marginBottom: 40 * scale,
        },
        photo: {
            width: 110 * scale,
            height: 110 * scale,
            borderRadius: 55 * scale,
            marginBottom: 20 * scale,
            objectFit: 'cover',
        },
        headerTitle: {
            fontFamily: styles.hindiFont,
            fontSize: 32 * scale,
            fontWeight: 'light',
            color: styles.textColor,
            textTransform: 'uppercase',
            letterSpacing: 2,
            marginBottom: 10 * scale,
        },
        decorLine: {
            width: 70 * scale,
            height: 3,
            backgroundColor: styles.primaryColor,
            marginBottom: 20 * scale,
        },
        overviewText: {
            fontSize: styles.fontSize * 0.9 * scale,
            textAlign: 'center',
            maxWidth: 400 * scale,
            opacity: 0.7,
            lineHeight: 1.6,
        },
        // Section
        sectionContainer: {
            marginBottom: 30 * scale,
        },
        sectionHeader: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginBottom: 15 * scale,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: `${styles.primaryColor}50`,
            gap: 10,
        },
        sectionTitle: {
            fontSize: styles.fontSize * 1.1 * scale,
            fontWeight: 'bold',
            color: styles.textColor,
            textTransform: 'uppercase',
            letterSpacing: 2,
        },
        spacer: {
            flex: 1,
        },
        // Grid
        fieldGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 30 * scale,
        },
        fieldItem: {
            width: '45%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
        },
        fieldLabel: {
            fontSize: styles.fontSize * 0.75 * scale,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            opacity: 0.5,
            width: '35%',
        },
        fieldValue: {
            fontSize: styles.fontSize * 0.875 * scale,
            fontWeight: 'medium',
            textAlign: 'right',
            width: '65%',
        },
    });

    return (
        <Page size="A4" style={pdfStyles.page}>
            {biodata.processedBg && (
                <Image src={biodata.processedBg} style={pdfStyles.backgroundImage} fixed />
            )}

            <View style={pdfStyles.headerContainer}>
                {photo && (
                    <Image
                        src={photo}
                        style={pdfStyles.photo}
                    />
                )}
                {header.enabled && (
                    <Text style={pdfStyles.headerTitle}>{header.text}</Text>
                )}
                <View style={pdfStyles.decorLine} />
                {overview?.enabled && overview.text && (
                    <Text style={pdfStyles.overviewText}>{overview.text}</Text>
                )}
            </View>

            {enabledSections.map(s => (
                <View key={s.id} style={pdfStyles.sectionContainer} wrap={false}>
                    <View style={pdfStyles.sectionHeader}>
                        <Text style={pdfStyles.sectionTitle}>{s.title}</Text>
                        <View style={pdfStyles.spacer} />
                    </View>

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
        </Page>
    );
};

export default MinimalLinesPdfRenderer;
