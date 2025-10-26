// src/components/BiodataPreview.jsx
import React from 'react';
import Template1 from '../assets/templates/template1';
import Template2 from '../assets/templates/template2'; // New template

const templateComponents = {
    template1: Template1,
    template2: Template2,
};

const BiodataPreview = ({ biodata }) => {
    const Template = templateComponents[biodata.template] || Template1;

    return (
        <div id="biodata-pdf-content" style={{
            border: '1px solid #ddd',
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            minHeight: '600px',
            // Apply global customizations here to the outer container
            fontFamily: biodata.customizations.fontFamily,
            color: '#333', // Default text color
        }}>
            <Template biodata={biodata} />
        </div>
    );
};

export default BiodataPreview;