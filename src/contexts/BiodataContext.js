// src/contexts/BiodataContext.js
import React, { createContext, useState, useContext } from 'react';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid'; // For unique IDs

const BiodataContext = createContext();

const initialBiodataState = {
    header: {
        icon: '', // URL or base64 of icon
        text: '|| Shree Ganesh ||',
        enabled: true, // New: allow enabling/disabling header
    },
    photo: null, // base64 string or file object
    sections: [
        {
            id: 'personal',
            title: 'PERSONAL DETAILS',
            enabled: true,
            fields: [
                { id: uuidv4(), label: 'Name', value: 'Dr. Vismay', type: 'text', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Date of Birth', value: '5 January 1995', type: 'date', enabled: true, showLabel: true }, // Changed type to 'date'
                { id: uuidv4(), label: 'Place of Birth', value: 'New Delhi', type: 'text', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Rashi', value: 'Tula (Libra)', type: 'text', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Nakshatra', value: 'Rohini', type: 'text', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Complexion', value: 'Very Fair', type: 'text', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Height', value: '5 feet 5 inches', type: 'text', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Education', value: '- MBBS (AIIMS)\n- MD (General Medicine)\n- DM (Neurology)', type: 'textarea', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Occupation', value: 'Doctor (Neurologist)', type: 'text', enabled: true, showLabel: true },
            ],
        },
        {
            id: 'family',
            title: 'FAMILY DETAILS',
            enabled: true,
            fields: [
                { id: uuidv4(), label: 'Father Name', value: 'Dr. Prakash', type: 'text', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Father\'s Occupation', value: 'General Surgeon, Working in BTM Hospital', type: 'text', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Mother Name', value: 'Dr. Priyadarshini', type: 'text', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Mother\'s Occupation', value: 'Gynecologist, Working in Asian Hospital', type: 'text', enabled: true, showLabel: true },
            ],
        },
        {
            id: 'contact',
            title: 'CONTACT DETAILS',
            enabled: true,
            fields: [
                { id: uuidv4(), label: 'Contact Number', value: 'Father: +911234567891\nMother: +911234567892', type: 'textarea', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Address', value: 'House # 123, Plot # 11, Sri Shiva Nilaya, Nation park main road, 1st cross opp.Surya International Hotel, layout Sri MahanEsha Nagar', type: 'textarea', enabled: true, showLabel: true },
            ],
        },
        // New example section
        {
            id: 'expectations',
            title: 'EXPECTATIONS',
            enabled: true,
            fields: [
                { id: uuidv4(), label: 'Partner Preferences', value: 'Looking for a kind, educated, and family-oriented partner.', type: 'textarea', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Location Preferences', value: 'Preferably living in a metro city.', type: 'text', enabled: true, showLabel: true },
            ],
        }
    ],
    template: 'template1',
    customizations: {
        alignment: 'left',
        headerPlacement: 'top',
        imagePlacement: 'center',
        // New customization options
        fontFamily: 'serif',
        primaryColor: '#0056b3', // Example brand color
        // Add more color/font options here
    }
};

export const BiodataProvider = ({ children }) => {
    const [biodata, setBiodata] = useState(initialBiodataState);

    const updateBiodata = (updater) => {
        setBiodata(prev => produce(prev, updater));
    };

    // New helper functions for dynamic section/field management
    const addSection = (title) => {
        updateBiodata(draft => {
            draft.sections.push({
                id: uuidv4(),
                title: title,
                enabled: true,
                fields: [{ id: uuidv4(), label: 'New Field', value: '', type: 'text', enabled: true, showLabel: true }]
            });
        });
    };

    const removeSection = (sectionId) => {
        updateBiodata(draft => {
            draft.sections = draft.sections.filter(s => s.id !== sectionId);
        });
    };

    const toggleSectionEnabled = (sectionId) => {
        updateBiodata(draft => {
            const section = draft.sections.find(s => s.id === sectionId);
            if (section) section.enabled = !section.enabled;
        });
    };

    const addField = (sectionId, label = 'New Field', type = 'text') => {
        updateBiodata(draft => {
            const section = draft.sections.find(s => s.id === sectionId);
            if (section) {
                section.fields.push({
                    id: uuidv4(),
                    label: label,
                    value: '',
                    type: type,
                    enabled: true,
                    showLabel: true
                });
            }
        });
    };

    const removeField = (sectionId, fieldId) => {
        updateBiodata(draft => {
            const section = draft.sections.find(s => s.id === sectionId);
            if (section) {
                section.fields = section.fields.filter(f => f.id !== fieldId);
            }
        });
    };

    const updateFieldValue = (sectionId, fieldId, newValue) => {
        updateBiodata(draft => {
            const section = draft.sections.find(s => s.id === sectionId);
            if (section) {
                const field = section.fields.find(f => f.id === fieldId);
                if (field) field.value = newValue;
            }
        });
    };

    const updateFieldLabel = (sectionId, fieldId, newLabel) => {
        updateBiodata(draft => {
            const section = draft.sections.find(s => s.id === sectionId);
            if (section) {
                const field = section.fields.find(f => f.id === fieldId);
                if (field) field.label = newLabel;
            }
        });
    };

    const toggleFieldEnabled = (sectionId, fieldId) => {
        updateBiodata(draft => {
            const section = draft.sections.find(s => s.id === sectionId);
            if (section) {
                const field = section.fields.find(f => f.id === fieldId);
                if (field) field.enabled = !field.enabled;
            }
        });
    };

    const toggleFieldShowLabel = (sectionId, fieldId) => {
        updateBiodata(draft => {
            const section = draft.sections.find(s => s.id === sectionId);
            if (section) {
                const field = section.fields.find(f => f.id === fieldId);
                if (field) field.showLabel = !field.showLabel;
            }
        });
    };


    const value = {
        biodata,
        updateBiodata,
        addSection,
        removeSection,
        toggleSectionEnabled,
        addField,
        removeField,
        updateFieldValue,
        updateFieldLabel,
        toggleFieldEnabled,
        toggleFieldShowLabel
    };

    return <BiodataContext.Provider value={value}>{children}</BiodataContext.Provider>;
};

export const useBiodata = () => {
    const context = useContext(BiodataContext);
    if (context === undefined) {
        throw new Error('useBiodata must be used within a BiodataProvider');
    }
    return context;
};
