import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { createBaseStyles, PdfPhoto } from '../PdfPrimitives';

/**
 * Sidebar PDF Layout (Modern Left / Modern Right)
 * Mirrors SidebarRenderer.jsx for react-pdf
 * Features a sidebar with photo/contact and main content area
 */
const SidebarPdfRenderer = ({ biodata, isRight = false }) => {
    const { header, photo, overview, sections, customizations } = biodata;
    const styles = createBaseStyles(customizations);
    const enabledSections = sections.filter(s => s.enabled);

    // Sidebar sections (contact) vs main sections
    const sidebarSectionIds = ['contact'];
    const sidebarSections = enabledSections.filter(s => sidebarSectionIds.includes(s.id));
    const mainSections = enabledSections.filter(s => !sidebarSectionIds.includes(s.id));

    const backgroundColor = customizations?.backgroundColor || '#ffffff';
    const scale = 0.85;
    const photoSize = 85 * scale;

    const pdfStyles = StyleSheet.create({
        page: {
            fontFamily: styles.fontFamily,
            fontSize: styles.fontSize * scale,
            color: styles.textColor,
            backgroundColor: backgroundColor,
            lineHeight: 1.4,
            position: 'relative',
            flexDirection: isRight ? 'row-reverse' : 'row',
        },
        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        // Sidebar (32% width)
        sidebar: {
            width: '32%',
            padding: 20,
            backgroundColor: `${styles.primaryColor}08`,
            borderRightWidth: isRight ? 0 : 1,
            borderLeftWidth: isRight ? 1 : 0,
            borderColor: `${styles.primaryColor}20`,
            gap: 15,
        },
        // Main content area (68% width)
        mainContent: {
            width: '68%',
            padding: '25 15 15 15',
            flexDirection: 'column',
            gap: 15,
        },
        // Photo container in sidebar
        photoContainer: {
            alignItems: 'center',
            marginBottom: 10,
        },
        // Overview in sidebar
        overviewTitle: {
            fontSize: styles.fontSize * 0.75 * scale,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: styles.primaryColor,
            textAlign: 'center',
            paddingBottom: 4,
            borderBottomWidth: 2,
            borderBottomColor: styles.primaryColor,
            marginBottom: 6,
        },
        overviewText: {
            fontSize: styles.fontSize * 0.85 * scale,
            fontStyle: 'italic',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 1.5,
        },
        // Header in main area
        headerContainer: {
            alignItems: 'center',
            marginBottom: 15 * scale,
            paddingBottom: 6,
            borderBottomWidth: 2,
            borderBottomColor: styles.primaryColor,
        },
        headerText: {
            fontFamily: styles.hindiFont,
            fontSize: 16 * scale,
            fontWeight: 'bold',
            color: styles.primaryColor,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
        },
        // Section styling
        sectionContainer: {
            marginBottom: 10 * scale,
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
            marginBottom: 5,
        },
        fieldRow: {
            flexDirection: 'row',
            marginBottom: 2 * scale,
        },
        fieldLabel: {
            width: '35%',
            fontSize: styles.fontSize * 0.7 * scale,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: styles.textColor,
            opacity: 0.7,
        },
        fieldValue: {
            width: '65%',
            fontSize: styles.fontSize * scale,
            color: styles.textColor,
        },
    });

    const renderSection = (section) => (
        <View key={section.id} style={pdfStyles.sectionContainer} wrap={false}>
            <Text style={pdfStyles.sectionTitle}>{section.title}</Text>
            {section.fields.filter(f => f.enabled).map(f => (
                <View key={f.id} style={pdfStyles.fieldRow}>
                    <Text style={pdfStyles.fieldLabel}>{f.showLabel !== false ? f.label : ''}</Text>
                    <Text style={pdfStyles.fieldValue}>{f.value}</Text>
                </View>
            ))}
        </View>
    );

    return (
        <Page size="A4" style={pdfStyles.page}>
            {/* Background */}
            {biodata.processedBg && (
                <Image src={biodata.processedBg} style={pdfStyles.backgroundImage} fixed />
            )}

            {/* Sidebar */}
            <View style={pdfStyles.sidebar}>
                {/* Photo */}
                {photo && (
                    <Image src={photo} style={pdfStyles.photo} />
                )}

                {/* Overview */}
                {overview?.enabled && overview.text && (
                    <View style={{ marginTop: 15 }}>
                        <Text style={pdfStyles.overviewTitle}>{overview.title || 'About'}</Text>
                        <Text style={pdfStyles.overviewText}>{overview.text}</Text>
                    </View>
                )}

                {/* Sidebar Sections (Contact) */}
                <View style={{ marginTop: 15, gap: 15 }}>
                    {sidebarSections.map(section => renderSection(section))}
                </View>
            </View>

            {/* Main Content */}
            <View style={pdfStyles.mainContent}>
                {/* Header */}
                {header.enabled && (
                    <View style={pdfStyles.headerContainer}>
                        {biodata.processedHeaderIcon && (
                            <Image
                                src={biodata.processedHeaderIcon}
                                style={{ width: 50 * scale, height: 50 * scale, marginBottom: 6, marginTop: -20 * scale, objectFit: 'contain' }}
                            />
                        )}
                        <Text style={pdfStyles.headerText}>{header.text}</Text>
                    </View>
                )}

                {/* Main Sections */}
                <View style={{ gap: 12 }}>
                    {mainSections.map(section => renderSection(section))}
                </View>
            </View>
        </Page>
    );
};

export default SidebarPdfRenderer;
