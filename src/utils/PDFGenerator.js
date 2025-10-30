// src/utils/pdfGenerator.js
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Generate a PDF by cloning the preview element into a fixed A4-width offscreen
// container, rendering it with html2canvas and then slicing it into pages.
export const generatePdf = async (biodataState) => {
    const input = document.getElementById('biodata-pdf-content');
    if (!input) {
        console.error('Element with ID "biodata-pdf-content" not found.');
        return;
    }

    try {
        // Prepare an offscreen clone sized to A4 width (in px). This gives consistent
        // layout independent of the current preview width in the app.
        const MM_TO_INCH = 1 / 25.4;
        const POINTS_PER_INCH = 96; // use 96 DPI as a baseline for html rendering
        const A4_WIDTH_MM = 210;
        const A4_HEIGHT_MM = 297;
        const pxPerMm = POINTS_PER_INCH * MM_TO_INCH; // ~3.78 px per mm
        const targetWidthPx = Math.round(A4_WIDTH_MM * pxPerMm);

        const clone = input.cloneNode(true);
        // Remove box-shadow / extraneous layout that shouldn't appear in PDF
        clone.style.boxShadow = 'none';
        clone.style.margin = '0';
        clone.style.transform = 'none';
        clone.style.width = `${targetWidthPx}px`;
        clone.style.position = 'absolute';
        clone.style.left = '-9999px';
        clone.style.top = '0';

        // If a background image is specified in state, ensure the clone has it
        const bg = biodataState?.customizations?.backgroundImage;
        const prevBg = input.style.backgroundImage;
        if (bg) {
            clone.style.backgroundImage = `url(${bg})`;
            clone.style.backgroundSize = biodataState.customizations?.backgroundSize || 'cover';
            clone.style.backgroundPosition = biodataState.customizations?.backgroundPosition || 'center';
            clone.style.backgroundRepeat = 'no-repeat';
        }

        document.body.appendChild(clone);

        // Render the cloned element. Use a higher scale for better quality.
        const canvas = await html2canvas(clone, {
            scale: 2,
            useCORS: true,
            logging: false,
            windowWidth: clone.scrollWidth,
            windowHeight: clone.scrollHeight
        });

        // Clean up the clone
        document.body.removeChild(clone);

        const imgData = canvas.toDataURL('image/jpeg', 1.0);

        // Create PDF and add image(s) split across pages if necessary.
        const doc = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();

        // Convert canvas dimensions to mm in the PDF using the pdf width as the reference
        const imgWidthMM = pdfWidth;
        const imgHeightMM = (canvas.height * imgWidthMM) / canvas.width;

        let remainingHeightMM = imgHeightMM;
        let positionY = 0;

        // Add first page
        doc.addImage(imgData, 'JPEG', 0, positionY, imgWidthMM, imgHeightMM);
        remainingHeightMM -= pdfHeight;

        // Add additional pages if the rendered image is taller than one page
        while (remainingHeightMM > -0.1) {
            if (remainingHeightMM <= 0) break;
            positionY = positionY - pdfHeight; // negative offset to show next slice
            doc.addPage();
            doc.addImage(imgData, 'JPEG', 0, positionY, imgWidthMM, imgHeightMM);
            remainingHeightMM -= pdfHeight;
        }

        doc.save('marriage_biodata.pdf');
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};