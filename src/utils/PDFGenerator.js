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
        const canvas = await html2canvas(input, {
            scale: 2, // Increase scale for better quality
            useCORS: true, // Important if images are from external URLs
            logging: true,
            width: input.offsetWidth,
            height: input.offsetHeight,
            windowWidth: input.scrollWidth,
            windowHeight: input.scrollHeight
        });

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