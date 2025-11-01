// src/utils/pdfGenerator.js
import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { PdfDocument } from './PdfDocument';

/**
 * generatePdf(biodata)
 * - Renders the PdfDocument to a Blob and triggers download.
 * - Uses data-URL (base64) images reliably; remote images may need CORS.
 */
export async function generatePdf(biodata) {
  try {
  // Precompute values that may not be available during PDF render
  const generatedAt = new Date().toLocaleString();

  // Create the document element and render to a blob.
  // Prefer passing the element to `pdf()` directly which is the supported pattern
  // across react-pdf versions instead of using updateContainer.
  const doc = <PdfDocument biodata={biodata} generatedAt={generatedAt} />;
  const asPdf = pdf(doc);
  const blob = await asPdf.toBlob();

  const filename = sanitizeFilename((biodata?.name || 'marriage_biodata')) + '.pdf';
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  // append to DOM to make click() work in all browsers
  document.body.appendChild(a);
  a.click();
  // remove the anchor immediately
  document.body.removeChild(a);
  // revoke the object URL shortly after to avoid interfering with download in some browsers
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (err) {
    // Surface error to caller for potential UI notification
    console.error('Failed to generate PDF', err);
    throw err;
  }
}

function sanitizeFilename(name = '') {
  return String(name)
    .replace(/[^\w\- ]+/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 120);
}
