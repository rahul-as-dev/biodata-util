// src/utils/PdfDocument.jsx
import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

const PAGE_PADDING = 20;
const HEADER_HEIGHT = 82;
const FOOTER_HEIGHT = 28;

const styles = StyleSheet.create({
  page: {
    padding: PAGE_PADDING,
    fontSize: 10,
    color: '#222',
    lineHeight: 1.25,
    position: 'relative',
    backgroundColor: '#fff',
  },

  // Background image - full page low opacity layer
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.07,
  },

  // Header top area (small)
  headerTop: {
    marginBottom: 6,
  },

  headerText: {
    fontSize: 9,
    color: '#666',
  },

  // Content area starts after header
  content: {
    marginTop: 6,
    marginBottom: FOOTER_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  // Default two-column layout
  halfColumn: {
    width: '50%',
    boxSizing: 'border-box',
    paddingRight: 6,
  },

  fullWidth: {
    width: '100%',
    paddingRight: 0,
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
    color: '#0a47a1',
  },

  fieldRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'flex-start',
  },

  fieldLabel: {
    width: 110,
    fontSize: 9,
    color: '#444',
  },

  fieldValue: {
    flex: 1,
    fontSize: 9.5,
    color: '#111',
    whiteSpace: 'pre-wrap',
  },

  // Personal section special layout when photo on right
  personalRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },

  personalLeft: {
    flex: 1,
  },

  personalRightPhotoWrap: {
    width: 100,
    alignItems: 'center',
  },

  // Photo shapes
  photoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    overflow: 'hidden',
  },

  photoRect: {
    width: 88,
    height: 110,
    borderRadius: 6,
    overflow: 'hidden',
  },

  photoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: PAGE_PADDING - 4,
    left: PAGE_PADDING,
    right: PAGE_PADDING,
    textAlign: 'center',
    fontSize: 8.5,
    color: '#666',
  },
});

// Simple heuristic to force a section full-width
function shouldUseFullWidth(section) {
  if (!section) return false;
  const fields = section.fields || [];
  if (fields.length > 6) return true;
  for (const f of fields) {
    if (typeof f.value === 'string' && (f.value.match(/\n/g) || []).length >= 3) return true;
  }
  return false;
}

function prettyKey(k) {
  if (!k) return '';
  return String(k)
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, (s) => s.toUpperCase());
}

// Section renderer — generic sections
const GenericSection = ({ section }) => {
  if (!section || section.enabled === false) return null;
  const fields = (section.fields || []).filter((f) => f && f.enabled !== false);

  return (
    <View style={shouldUseFullWidth(section) ? styles.fullWidth : styles.halfColumn} key={section.id}>
      <Text style={styles.sectionTitle}>{section.title || 'Section'}</Text>
      {fields.length === 0 ? (
        <Text style={styles.fieldValue}>No data provided.</Text>
      ) : (
        fields.map((f) => (
          <View style={styles.fieldRow} key={f.id}>
            {f.showLabel ? <Text style={styles.fieldLabel}>{f.label ? prettyKey(f.label) : ''}</Text> : <Text style={styles.fieldLabel} />}
            <Text style={styles.fieldValue}>{f.value != null && f.value !== '' ? String(f.value) : '-'}</Text>
          </View>
        ))
      )}
    </View>
  );
};

/**
 * Personal section renderer that places photo inside the personal block
 * either to the right of the fields or above them depending on imagePlacement.
 */
const PersonalSection = ({ section, photo, imagePlacement = 'above', imageShape = 'circle' }) => {
  if (!section || section.enabled === false) return null;
  const fields = (section.fields || []).filter((f) => f && f.enabled !== false);

  // Full-width personal section (we expect personal to be important)
  return (
    <View style={styles.fullWidth} key={section.id}>
      <Text style={styles.sectionTitle}>{section.title || 'Personal Details'}</Text>

      {imagePlacement === 'right' && photo ? (
        // Two-column within the personal block: left = fields, right = photo
        <View style={styles.personalRow}>
          <View style={styles.personalLeft}>
            {fields.map((f) => (
              <View style={styles.fieldRow} key={f.id}>
                {f.showLabel ? <Text style={styles.fieldLabel}>{f.label ? prettyKey(f.label) : ''}</Text> : <Text style={styles.fieldLabel} />}
                <Text style={styles.fieldValue}>{f.value != null && f.value !== '' ? String(f.value) : '-'}</Text>
              </View>
            ))}
          </View>

          <View style={styles.personalRightPhotoWrap}>
            <View style={imageShape === 'circle' ? styles.photoCircle : styles.photoRect}>
              <Image src={photo} style={styles.photoImage} />
            </View>
          </View>
        </View>
      ) : (
        // photo above (centered), then fields below
        <>
          {photo ? (
            <View style={{ width: '100%', alignItems: 'center', marginBottom: 6 }}>
              <View style={imageShape === 'circle' ? styles.photoCircle : styles.photoRect}>
                <Image src={photo} style={styles.photoImage} />
              </View>
            </View>
          ) : null}

          {fields.map((f) => (
            <View style={styles.fieldRow} key={f.id}>
              {f.showLabel ? <Text style={styles.fieldLabel}>{f.label ? prettyKey(f.label) : ''}</Text> : <Text style={styles.fieldLabel} />}
              <Text style={styles.fieldValue}>{f.value != null && f.value !== '' ? String(f.value) : '-'}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
};

/**
 * PdfDocument: main export
 * - Renders background image as a full-page Image (resizeMode="cover")
 * - Personal section contains the photo in the correct place (right/top)
 */
export const PdfDocument = ({ biodata = {} }) => {
  const { header, photo, sections = [], customizations = {} } = biodata;

  const primaryColor = customizations.primaryColor || '#0a47a1';
  const imagePlacement = customizations.imagePlacement || 'above'; // 'right' or 'above'
  const imageShape = customizations.imageShape || 'circle';
  const bgImage = customizations.backgroundImage || null;

  // find personal section
  const personalSection = (sections || []).find((s) => s.id === 'personal') || null;

  // build list of other sections in the original order but excluding personal
  const otherSections = (sections || []).filter((s) => s && s.id !== 'personal' && s.enabled !== false);

  // header short text from state if available
  const headerText = header && header.enabled ? header.text : '';

  return (
    <Document author="Biodata Builder">
      <Page size="A4" style={styles.page} wrap={false}>
        {/* Background image - use Image and cover it */}
        {bgImage ? <Image src={bgImage} style={styles.bgImage} resizeMode="cover" /> : null}

        {/* Small header line / title above content */}
        {headerText ? (
          <View style={styles.headerTop}>
            <Text style={styles.headerText}>{headerText}</Text>
          </View>
        ) : null}

        <View style={styles.content}>
          {/* Personal section is always full-width first */}
          {personalSection && personalSection.enabled !== false ? (
            <PersonalSection
              section={personalSection}
              photo={photo}
              imagePlacement={imagePlacement}
              imageShape={imageShape}
            />
          ) : null}

          {/* Render the rest in two-column flow */}
          {otherSections.map((sec) => (
            <GenericSection section={sec} key={sec.id} />
          ))}
        </View>

        <Text style={styles.footer} fixed>
          Generated by Biodata Builder • {new Date().toLocaleString()}
        </Text>
      </Page>
    </Document>
  );
};
