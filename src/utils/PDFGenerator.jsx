import React from 'react';
import { getThemeConfig } from './themeRegistry';
import { convertToHighResPng, convertSvgStringToPng } from './imageHelper';

// Fonts will be registered lazily inside generatePdf


// Map template IDs to PDF renderer import paths
const PDF_RENDERERS_MAP = {
  template1: () => import('./pdf-layouts/ClassicPdfRenderer'),
  template2: () => import('./pdf-layouts/SidebarPdfRenderer'),
  template3: () => import('./pdf-layouts/SidebarPdfRenderer'),
  template4: () => import('./pdf-layouts/ElegantSplitPdfRenderer'),
  template6: () => import('./pdf-layouts/SmartGridPdfRenderer'),
  template8: () => import('./pdf-layouts/BoldBandPdfRenderer'),
  template9: () => import('./pdf-layouts/ProfileHeroPdfRenderer'),
  template10: () => import('./pdf-layouts/SwissCleanPdfRenderer'),
  template11: () => import('./pdf-layouts/DiagonalPdfRenderer'),
  template12: () => import('./pdf-layouts/ClassicFramePdfRenderer'),
  template13: () => import('./pdf-layouts/RibbonFlowPdfRenderer'),
  template14: () => import('./pdf-layouts/StackedCardPdfRenderer'),
  template17: () => import('./pdf-layouts/MinimalLinesPdfRenderer'),
  template24: () => import('./pdf-layouts/DivineMandalaPdfRenderer'),
};

/**
 * Generates a PDF from biodata using the appropriate layout renderer
 */
export async function generatePdf(biodata) {
  try {
    // 1. Dynamic import heavy libraries
    const [{ pdf, Document }, SidebarPdfRenderer, { registerFonts }] = await Promise.all([
      import('@react-pdf/renderer'),
      biodata.template === 'template2' || biodata.template === 'template3'
        ? import('./pdf-layouts/SidebarPdfRenderer').then(m => m.default)
        : Promise.resolve(null),
      import('./fontRegistry')
    ]);

    // Ensure fonts are registered before rendering
    await registerFonts();

    const safeBiodata = {
      ...biodata,
      customizations: biodata.customizations || { themeId: 'minimal', imageShape: 'circle' },
      sections: biodata.sections || [],
      template: biodata.template || 'template1'
    };

    // 2. Resolve theme config and convert background if needed
    const themeConfig = getThemeConfig(safeBiodata.customizations.themeId);
    let bgAsset = themeConfig.asset;

    if (bgAsset && bgAsset.endsWith('.svg')) {
      bgAsset = await convertToHighResPng(bgAsset);
    }

    // 3. Convert header icon SVG to PNG with primaryColor baked in
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

    // 4. Prepare biodata with processed assets
    const printBiodata = {
      ...safeBiodata,
      processedBg: bgAsset,
      processedHeaderIcon: headerIconImage,
    };

    // 5. Select appropriate PDF renderer based on template
    let Renderer;
    if (safeBiodata.template === 'template2' || safeBiodata.template === 'template3') {
      const isRight = safeBiodata.template === 'template3';
      Renderer = (props) => <SidebarPdfRenderer {...props} isRight={isRight} />;
    } else {
      const importFn = PDF_RENDERERS_MAP[safeBiodata.template] || PDF_RENDERERS_MAP.template1;
      Renderer = (await importFn()).default;
    }

    // 6. Generate PDF
    const doc = (
      <Document title="Marriage Biodata">
        <Renderer biodata={printBiodata} />
      </Document>
    );

    const asPdf = pdf(doc);
    const blob = await asPdf.toBlob();

    // 7. Trigger download
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