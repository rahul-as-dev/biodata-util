import React from 'react';
import { pdf, Document } from '@react-pdf/renderer';
import { getThemeConfig } from './themeRegistry';
import { convertToHighResPng, convertSvgStringToPng } from './imageHelper';
import './fontRegistry'; // Initialize fonts

// Import PDF Layout Renderers
import ClassicPdfRenderer from './pdf-layouts/ClassicPdfRenderer';
import ProfileHeroPdfRenderer from './pdf-layouts/ProfileHeroPdfRenderer';
import SidebarPdfRenderer from './pdf-layouts/SidebarPdfRenderer';
import ElegantSplitPdfRenderer from './pdf-layouts/ElegantSplitPdfRenderer';
import SmartGridPdfRenderer from './pdf-layouts/SmartGridPdfRenderer';
import BoldBandPdfRenderer from './pdf-layouts/BoldBandPdfRenderer';
import DiagonalPdfRenderer from './pdf-layouts/DiagonalPdfRenderer';
import SwissCleanPdfRenderer from './pdf-layouts/SwissCleanPdfRenderer';
import ClassicFramePdfRenderer from './pdf-layouts/ClassicFramePdfRenderer';
import RibbonFlowPdfRenderer from './pdf-layouts/RibbonFlowPdfRenderer';
import StackedCardPdfRenderer from './pdf-layouts/StackedCardPdfRenderer';
import MinimalLinesPdfRenderer from './pdf-layouts/MinimalLinesPdfRenderer';
import DivineMandalaPdfRenderer from './pdf-layouts/DivineMandalaPdfRenderer';

// Map template IDs to PDF renderers
const PDF_RENDERERS = {
  template1: ClassicPdfRenderer,   // Classic Center
  template2: (props) => <SidebarPdfRenderer {...props} isRight={false} />, // Modern Left
  template3: (props) => <SidebarPdfRenderer {...props} isRight={true} />,  // Modern Right
  template4: ElegantSplitPdfRenderer, // Elegant Split
  template6: SmartGridPdfRenderer,    // Smart Grid
  template8: BoldBandPdfRenderer,     // Bold Band
  template9: ProfileHeroPdfRenderer, // Profile Hero
  template10: SwissCleanPdfRenderer, // Swiss Clean
  template11: DiagonalPdfRenderer,    // Diagonal
  template12: ClassicFramePdfRenderer, // Classic Frame
  template13: RibbonFlowPdfRenderer,   // Ribbon Flow
  template14: StackedCardPdfRenderer,  // Stacked Card
  template17: MinimalLinesPdfRenderer, // Minimal Lines
  template24: DivineMandalaPdfRenderer, // Divine Mandala
  // Add more as needed
};

/**
 * Generates a PDF from biodata using the appropriate layout renderer
 */
export async function generatePdf(biodata) {
  try {
    const safeBiodata = {
      ...biodata,
      customizations: biodata.customizations || { themeId: 'minimal', imageShape: 'circle' },
      sections: biodata.sections || [],
      template: biodata.template || 'template1'
    };

    // 1. Get theme config and convert background if needed
    const themeConfig = getThemeConfig(safeBiodata.customizations.themeId);
    let bgAsset = themeConfig.asset;

    if (bgAsset && bgAsset.endsWith('.svg')) {
      bgAsset = await convertToHighResPng(bgAsset);
    }

    // 2. Convert header icon SVG to PNG with primaryColor baked in
    let headerIconImage = null;
    if (safeBiodata.header?.svgPath) {
      const primaryColor = safeBiodata.customizations?.primaryColor || '#000000';
      try {
        const response = await fetch(safeBiodata.header.svgPath);
        const svgString = await response.text();
        headerIconImage = await convertSvgStringToPng(svgString, primaryColor, 200);
      } catch (err) {
        console.warn('Failed to convert header icon:', err);
      }
    }

    // 3. Prepare biodata with processed assets
    const printBiodata = {
      ...safeBiodata,
      processedBg: bgAsset,
      processedHeaderIcon: headerIconImage,
    };

    // 4. Select appropriate PDF renderer based on template
    const Renderer = PDF_RENDERERS[safeBiodata.template] || ClassicPdfRenderer;

    // 5. Generate PDF
    const doc = (
      <Document title="Marriage Biodata">
        <Renderer biodata={printBiodata} />
      </Document>
    );

    const asPdf = pdf(doc);
    const blob = await asPdf.toBlob();

    // 6. Trigger download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    const name = safeBiodata.sections.find(s => s.id === 'personal')?.fields?.find(f =>
      f.label.toLowerCase().includes('name')
    )?.value || 'Biodata';
    const safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    link.href = url;
    link.download = `${safeName}_biodata.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    return true;
  } catch (err) {
    console.error('PDF Generation Failed:', err);
    throw err;
  }
}