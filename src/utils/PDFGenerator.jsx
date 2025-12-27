import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { PdfDocument } from './PdfDocument';
import { getThemeConfig } from './themeRegistry';
import { convertToHighResPng } from './imageHelper';

export async function generatePdf(biodata) {
  try {
    const safeBiodata = {
        ...biodata,
        customizations: biodata.customizations || { themeId: 'minimal', imageShape: 'circle' },
        sections: biodata.sections || [],
        template: biodata.template || 'template1'
    };

    const themeConfig = getThemeConfig(safeBiodata.customizations.themeId);
    let bgAsset = themeConfig.asset;

    if (bgAsset && bgAsset.endsWith('.svg')) {
       bgAsset = await convertToHighResPng(bgAsset);
    }

    const printBiodata = {
      ...safeBiodata,
      processedBg: bgAsset 
    };

    const doc = <PdfDocument biodata={printBiodata} />;
    const asPdf = pdf(doc);
    const blob = await asPdf.toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const name = safeBiodata.sections.find(s => s.id === 'personal')?.fields?.find(f => f.label.toLowerCase().includes('name'))?.value || 'Biodata';
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