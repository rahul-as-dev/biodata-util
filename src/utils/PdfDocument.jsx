import React from 'react';
import {
  Document, Page, View, Text, Image, StyleSheet
} from '@react-pdf/renderer';
import { getThemeConfig } from './themeRegistry';

// Safe helper
const safe = (val, fallback) => (val === undefined || val === null ? fallback : val);

const createStyles = (customizations, template, themeConfig) => {
  const primaryColor = safe(customizations?.primaryColor, themeConfig.styles.primaryColor);
  const backgroundColor = safe(customizations?.backgroundColor, '#ffffff');
  const fontFamily = safe(customizations?.fontFamily, themeConfig.styles.fontFamily);
  const imageShape = safe(customizations?.imageShape, 'circle');

  // Dynamic Padding based on the Theme's border thickness
  const paddingTop = themeConfig.styles.paddingTop || 30;
  const paddingBottom = themeConfig.styles.paddingBottom || 30;
  const paddingH = themeConfig.styles.paddingHorizontal || 40;

  const headerFont = fontFamily === 'sans-serif' ? 'Helvetica-Bold' : 'Times-Bold';
  const bodyFont = fontFamily === 'monospace' ? 'Courier' : (fontFamily === 'sans-serif' ? 'Helvetica' : 'Times-Roman');

  return StyleSheet.create({
    page: {
      backgroundColor: backgroundColor,
      fontFamily: bodyFont,
      fontSize: 10,
      color: '#334155',
      lineHeight: 1.5,
      position: 'relative', // Essential for layering
    },
    // LAYER 1: Background Decoration
    decorationLayer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1, // Push to back
    },
    decorationImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover', // Ensures it covers the A4 page
    },
    // LAYER 2: Content
    contentContainer: {
      flex: 1,
      // READ FROM REGISTRY EXACTLY LIKE THE HTML PREVIEW DOES
      paddingTop: themeConfig.styles.paddingTop,
      paddingBottom: themeConfig.styles.paddingBottom,
      paddingLeft: themeConfig.styles.paddingHorizontal,
      paddingRight: themeConfig.styles.paddingHorizontal,
    },
    
    // Layout Logic (Template 1 vs Template 2)
    headerContainer: {
      marginBottom: 20,
      borderBottomWidth: template === 'template2' ? 0 : 1,
      borderBottomColor: primaryColor,
      paddingBottom: 15,
      alignItems: template === 'template2' ? 'flex-start' : 'center',
      flexDirection: template === 'template2' ? 'row' : 'column',
      gap: 15,
    },
    headerIcon: { width: 40, height: 40, objectFit: 'contain' },
    headerText: { 
      fontSize: 18, fontFamily: headerFont, color: primaryColor, textTransform: 'uppercase', letterSpacing: 1.5, textAlign: 'center' 
    },
    section: { marginBottom: 12 },
    sectionTitleContainer: {
      marginBottom: 8,
      alignSelf: 'stretch',
      backgroundColor: template === 'template2' ? primaryColor : 'transparent',
      paddingVertical: template === 'template2' ? 4 : 2,
      paddingHorizontal: template === 'template2' ? 8 : 0,
      borderBottomWidth: template === 'template2' ? 0 : 1,
      borderBottomColor: '#cbd5e1',
      borderRadius: template === 'template2' ? 3 : 1,
    },
    sectionTitleText: {
      fontSize: 11,
      fontFamily: headerFont,
      color: template === 'template2' ? '#ffffff' : primaryColor,
      textTransform: 'uppercase',
      letterSpacing: 1,
      textAlign: template === 'template1' ? 'center' : 'left'
    },
    row: { 
        flexDirection: 'row', marginBottom: 4, 
        borderBottomWidth: template === 'template2' ? 0.5 : 0, 
        borderBottomColor: '#f1f5f9',
        paddingBottom: template === 'template2' ? 2 : 0 
    },
    labelCol: { width: '35%', fontSize: 9, color: '#64748b', fontWeight: 'bold' },
    valueCol: { width: '65%', fontSize: 10, color: '#0f172a' },
    
    personalContainer: { 
      flexDirection: template === 'template2' ? 'row-reverse' : 'row', 
      marginBottom: 20, gap: 20, 
      borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingBottom: 20 
    },
    photo: {
      width: 110, height: 110, objectFit: 'cover',
      borderWidth: 3, borderColor: primaryColor,
      borderRadius: imageShape === 'circle' ? 55 : 4,
    },
    footer: { 
      position: 'absolute', bottom: 15, left: 0, right: 0, 
      textAlign: 'center', fontSize: 8, color: '#94a3b8', opacity: 0.7 
    }
  });
};

const FieldRow = ({ label, value, styles }) => (
  <View style={styles.row}>
    <Text style={styles.labelCol}>{label}</Text>
    <Text style={styles.valueCol}>{value}</Text>
  </View>
);

export const PdfDocument = ({ biodata }) => {
  const header = biodata?.header || { enabled: false };
  const photo = biodata?.photo || null;
  const sections = biodata?.sections || [];
  const template = biodata?.template || 'template1';
  const customizations = biodata?.customizations || {};
  
  // 1. Get Theme Data
  const themeConfig = getThemeConfig(customizations.themeId);
  const styles = createStyles(customizations, template, themeConfig);

  // 2. Resolve Assets
  // Prefer the processedBg (from Generator) if available, otherwise use theme asset
  const bgImage = biodata.processedBg || themeConfig.asset;

  const personalSection = sections.find(s => s.id === 'personal');
  const otherSections = sections.filter(s => s.id !== 'personal');

  return (
    <Document title="Marriage Biodata">
      <Page size="A4" style={styles.page}>
        
        {/* === LAYER 1: DECORATIVE FRAME === */}
        {bgImage && (
            <View style={styles.decorationLayer} fixed>
                <Image src={bgImage} style={styles.decorationImage} />
            </View>
        )}

        {/* === LAYER 2: TEXT CONTENT === */}
        <View style={styles.contentContainer}>
            
            {/* Header */}
            {header.enabled && (
                <View style={styles.headerContainer}>
                    {header.icon && <Image src={header.icon} style={styles.headerIcon} />}
                    <Text style={styles.headerText}>{header.text}</Text>
                </View>
            )}

            {/* Personal Details & Photo */}
            {personalSection && personalSection.enabled && (
                <View style={styles.personalContainer}>
                    <View style={{flex: 1}}>
                         {/* Personal Section Title removed in Personal Grid usually, but adding for consistency if needed */}
                         {/* <Text style={styles.sectionTitleText}>{personalSection.title}</Text> */}
                        {personalSection.fields.map(f => f.enabled && (
                            <FieldRow key={f.id} label={f.label} value={f.value} styles={styles} />
                        ))}
                    </View>
                    {photo && <Image src={photo} style={styles.photo} />}
                </View>
            )}

            {/* All Other Sections */}
            {otherSections.map(section => section.enabled && (
                <View key={section.id} style={styles.section} wrap={false}>
                    <View style={styles.sectionTitleContainer}>
                        <Text style={styles.sectionTitleText}>{section.title}</Text>
                    </View>
                    {section.fields.map(f => f.enabled && (
                        <FieldRow key={f.id} label={f.label} value={f.value} styles={styles} />
                    ))}
                </View>
            ))}

            <Text style={styles.footer} fixed>Created with BiodataMaker • Free Tool</Text>
        </View>
      </Page>
    </Document>
  );
};