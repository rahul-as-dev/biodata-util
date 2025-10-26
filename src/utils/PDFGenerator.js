// src/utils/pdfGenerator.js
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generatePdf = async (biodataState) => {
    const input = document.getElementById('biodata-pdf-content');
    if (!input) {
        console.error('Element with ID "biodata-pdf-content" not found.');
        return;
    }

    try {
        // If a backgroundImage is specified in the state, apply it temporarily to the
        // element so html2canvas captures it as part of the rendering.
        const bg = biodataState?.customizations?.backgroundImage;
        const prevBg = input.style.backgroundImage;
        const prevBgSize = input.style.backgroundSize;
        const prevBgPos = input.style.backgroundPosition;
        const prevBgRepeat = input.style.backgroundRepeat;
        if (bg) {
            input.style.backgroundImage = `url(${bg})`;
            input.style.backgroundSize = biodataState.customizations.backgroundSize || 'cover';
            input.style.backgroundPosition = biodataState.customizations.backgroundPosition || 'center';
            input.style.backgroundRepeat = 'no-repeat';
        }

        const canvas = await html2canvas(input, {
            scale: 2, // Increase scale for better quality
            useCORS: true, // Important if images are from external URLs
            logging: true,
            width: input.offsetWidth,
            height: input.offsetHeight,
            windowWidth: input.scrollWidth,
            windowHeight: input.scrollHeight
        });

        // restore previous inline styles
        if (bg) {
            input.style.backgroundImage = prevBg;
            input.style.backgroundSize = prevBgSize;
            input.style.backgroundPosition = prevBgPos;
            input.style.backgroundRepeat = prevBgRepeat;
        }

        const imgData = canvas.toDataURL('image/jpeg', 1.0); // High quality JPEG

        // Calculate PDF dimensions
        const imgWidth = 210; // A4 width in mm
        const pageHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = pageHeight;
        const doc = new jsPDF('p', 'mm', 'a4');
        let position = 0;

        doc.addImage(imgData, 'JPEG', 0, position, imgWidth, pageHeight);
        heightLeft -= doc.internal.pageSize.getHeight();

        while (heightLeft >= 0) {
            position = heightLeft - pageHeight;
            doc.addPage();
            doc.addImage(imgData, 'JPEG', 0, position, imgWidth, pageHeight);
            heightLeft -= doc.internal.pageSize.getHeight();
        }

        doc.save('marriage_biodata.pdf');
    } catch (error) {
        console.error('Error generating PDF:', error);
        // Display an error message to the user using Ant Design's message component
        // message.error('Failed to generate PDF. Please try again.');
    }
};