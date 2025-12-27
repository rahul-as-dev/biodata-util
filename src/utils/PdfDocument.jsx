import React from 'react';
import {
  Document, Page, View, Text, Image, StyleSheet
} from '@react-pdf/renderer';
import { getThemeConfig } from './themeRegistry';

// NOTE: We are using Standard Fonts (Times-Roman, Helvetica) to prevent 404 errors.
// These are built-in to PDF readers and highly reliable.

const safe = (val, fallback) => (val === undefined || val === null ? fallback : val);

const createStyles = (customizations, template, themeConfig) => {
  const primaryColor = safe(customizations?.primaryColor, '#e11d48');
  const backgroundColor = safe(customizations?.backgroundColor, '#ffffff');
  const fontFamily = safe(customizations?.fontFamily, 'sans-serif');
  const imageShape = safe(customizations?.imageShape, 'circle');
  const padding = safe(themeConfig?.padding, 40);

  // Map to Standard PDF Fonts
  const headerFont = fontFamily === 'sans-serif' ? 'Helvetica-Bold' : 'Times-Bold';
  const bodyFont = fontFamily === 'monospace' ? 'Courier' : (fontFamily === 'sans-serif' ? 'Helvetica' : 'Times-Roman');

  return StyleSheet.create({
    page: {
      backgroundColor: backgroundColor,
      fontFamily: bodyFont,
      fontSize: 10,
      color: '#334155',
      lineHeight: 1.5,
    },
    decorationLayer: {
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1,
    },
    decorationImage: {
      width: '100%', height: '100%', objectFit: 'cover',
    },
    contentContainer: {
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: padding,
    },
    
    headerContainer: {
      marginBottom: 20,
      borderBottomWidth: template === 'template2' ? 0 : 1,
      borderBottomColor: primaryColor,
      paddingBottom: 15,
      alignItems: template === 'template2' ? 'flex-start' : 'center',
      flexDirection: template === 'template2' ? 'row' : 'column',
      gap: 15,
    },
    headerIcon: { width: 45, height: 45, objectFit: 'contain' },
    headerText: { 
      fontSize: 20, fontFamily: headerFont, color: primaryColor, textTransform: 'uppercase', letterSpacing: 2 
    },

    section: { marginBottom: 12 },
    
    // Container for Section Title (Box Model)
    sectionTitleContainer: {
      marginBottom: 8,
      alignSelf: 'flex-start',
      backgroundColor: template === 'template2' ? primaryColor : 'transparent',
      paddingVertical: template === 'template2' ? 4 : 0,
      paddingHorizontal: template === 'template2' ? 8 : 0,
      borderBottomWidth: template === 'template2' ? 0 : 0.5,
      borderBottomColor: '#cbd5e1',
      // Conditional Spread for BorderRadius
      ...(template === 'template2' && { borderRadius: 3 }),
    },
    // Text for Section Title (Font)
    sectionTitleText: {
      fontSize: 11,
      fontFamily: headerFont,
      color: template === 'template2' ? '#ffffff' : primaryColor,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },

    row: { flexDirection: 'row', marginBottom: 5 },
    labelCol: { width: '35%', fontSize: 9, color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' },
    valueCol: { width: '65%', fontSize: 10, color: '#0f172a' },
    
    personalContainer: { 
      flexDirection: 'row', marginBottom: 20, gap: 20, 
      borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingBottom: 20 
    },
    photo: {
      width: 100, height: 100, objectFit: 'cover',
      borderWidth: 2, borderColor: primaryColor,
      // Conditional Spread for Radius
      ...(imageShape === 'circle' ? { borderRadius: 50 } : { borderRadius: 4 }),
    },
    footer: { 
      position: 'absolute', bottom: 20, left: 0, right: 0, 
      textAlign: 'center', fontSize: 8, color: '#94a3b8' 
    }
  });
};

const FieldRow = ({ label, value, styles }) => (
  <View style={styles.row}>
    <Text style={styles.labelCol}>{label} {label ? ':' : ''}</Text>
    <Text style={styles.valueCol}>{value}</Text>
  </View>
);

export const PdfDocument = ({ biodata }) => {
  const header = biodata?.header || { enabled: false };
  const photo = biodata?.photo || null;
  const sections = biodata?.sections || [];
  const template = biodata?.template || 'template1';
  const customizations = biodata?.customizations || {};
  const processedBg = biodata?.processedBg || null;

  const themeConfig = getThemeConfig(customizations.themeId);
  const styles = createStyles(customizations, template, themeConfig);

  // Background Selection
  const finalBg = processedBg || (themeConfig.asset && !themeConfig.asset.endsWith('.svg') ? themeConfig.asset : null);

  const personalSection = sections.find(s => s.id === 'personal');
  const otherSections = sections.filter(s => s.id !== 'personal');

  return (
    <Document title="Marriage Biodata">
      <Page size="A4" style={styles.page}>
        
        {/* Fix: Check for truthy finalBg to avoid rendering empty string */}
        {finalBg ? (
            <View style={styles.decorationLayer} fixed>
                <Image src={finalBg} style={styles.decorationImage} />
            </View>
        ) : null}

        <View style={styles.contentContainer}>
            {header.enabled ? (
            <View style={styles.headerContainer}>
                {header.icon ? <Image src={header.icon} style={styles.headerIcon} /> : null}
                <Text style={styles.headerText}>{header.text}</Text>
            </View>
            ) : null}

            {/* Personal Section */}
            {personalSection && personalSection.enabled ? (
            <View style={styles.personalContainer}>
                <View style={{flex: 1}}>
                    <View style={styles.sectionTitleContainer}>
                        <Text style={styles.sectionTitleText}>{personalSection.title}</Text>
                    </View>
                    {personalSection.fields.map(f => f.enabled ? (
                        <FieldRow key={f.id} label={f.label} value={f.value} styles={styles} />
                    ) : null)}
                </View>
                {/* Fix: Check photo string length to avoid empty string render */}
                {photo ? <Image src={photo} style={styles.photo} /> : null}
            </View>
            ) : null}

            {/* Other Sections */}
            {otherSections.map(section => section.enabled ? (
            <View key={section.id} style={styles.section} wrap={false}>
                <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitleText}>{section.title}</Text>
                </View>
                {section.fields.map(f => f.enabled ? (
                <FieldRow key={f.id} label={f.label} value={f.value} styles={styles} />
                ) : null)}
            </View>
            ) : null)}

            <Text style={styles.footer} fixed>Created with VivahBio</Text>
        </View>
      </Page>
    </Document>
  );
};