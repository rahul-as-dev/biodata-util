import React, { createContext, useState, useContext, useEffect } from 'react';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

const BiodataContext = createContext();

const STORAGE_KEY = 'vivahpatra_biodata';

const initialBiodataState = {
    header: {
        icon: '', 
        text: '|| Shree Ganesh ||',
        enabled: true,
    },
    // --- NEW: Overview Field ---
    overview: {
        enabled: true,
        // title: 'About Me',
        text: 'Believing in family values and modern thinking. Looking for a partner who is understanding and caring.'
    },
    photo: null, 
    sections: [
        {
            id: 'personal',
            title: 'PERSONAL DETAILS',
            enabled: true,
            fields: [
                { id: uuidv4(), label: 'Name', value: 'Dr. Vismay', type: 'text', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Date of Birth', value: '5 January 1995', type: 'date', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Place of Birth', value: 'New Delhi', type: 'text', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Rashi', value: 'Tula (Libra)', type: 'text', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Complexion', value: 'Very Fair', type: 'text', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Height', value: '5 ft 5 in', type: 'text', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Education', value: '- MBBS (AIIMS)\n- MD (General Medicine)', type: 'textarea', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Occupation', value: 'Doctor (Neurologist)', type: 'text', enabled: true, showLabel: true },
            ],
        },
        {
            id: 'family',
            title: 'FAMILY DETAILS',
            enabled: true,
            fields: [
                { id: uuidv4(), label: 'Father Name', value: 'Dr. Prakash', type: 'text', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Father\'s Job', value: 'General Surgeon', type: 'text', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Mother Name', value: 'Dr. Priyadarshini', type: 'text', enabled: true, showLabel: true },
            ],
        },
        {
            id: 'contact',
            title: 'CONTACT DETAILS',
            enabled: true,
            fields: [
                { id: uuidv4(), label: 'Contact', value: '+91 98765 43210', type: 'text', enabled: true, showLabel: true },
                { id: uuidv4(), label: 'Address', value: '123, Green Park, New Delhi', type: 'textarea', enabled: true, showLabel: true },
            ],
        },
    ],
    template: 'template1',
    customizations: {
        themeId: 'minimal', // <--- NEW: Controls the decoration asset
        backgroundColor: '#ffffff', // <--- NEW: Controls the PDF paper color
        primaryColor: '#e11d48',
        fontFamily: 'serif',
        imagePlacement: 'right',
        imageShape: 'circle',
        textColor: '#000000'
    }
};

export const BiodataProvider = ({ children }) => {

    // 1. Initialize State from LocalStorage
    const [biodata, setBiodata] = useState(() => {
        if (typeof window !== 'undefined') {
            try {
                const savedData = localStorage.getItem(STORAGE_KEY);
                if (savedData) {
                    const parsedData = JSON.parse(savedData);
                    // Merge with initial state to ensure new structure changes don't break old saves
                    // Note: We prefer saved data, but fallback to initial for deep properties if missing
                    return { ...initialBiodataState, ...parsedData, 
                        // Ensure customizations object exists even if old save didn't have it
                        customizations: { ...initialBiodataState.customizations, ...parsedData.customizations } 
                    };
                }
            } catch (error) {
                console.error("Failed to load biodata from local storage:", error);
            }
        }
        // Fallback to initial default
        // Note: We use static IDs above for initial state to avoid hydration mismatch if SSR (though this is likely SPA)
        // If generating fresh state, we might want to regenerate UUIDs, but static is fine for default example.
        return initialBiodataState;
    });

    // 2. Persist State on Change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(biodata));
        } catch (error) {
            console.error("Failed to save biodata to local storage:", error);
        }
    }, [biodata]);

    const updateBiodata = (updater) => {
        setBiodata(prev => produce(prev, updater));
    };

    // --- Actions ---
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
                    label,
                    value: '',
                    type,
                    enabled: true,
                    showLabel: true
                });
            }
        });
    };

    const removeField = (sectionId, fieldId) => {
        updateBiodata(draft => {
            const section = draft.sections.find(s => s.id === sectionId);
            if (section) section.fields = section.fields.filter(f => f.id !== fieldId);
        });
    };

    const updateFieldValue = (sectionId, fieldId, newValue) => {
        updateBiodata(draft => {
            const field = draft.sections.find(s => s.id === sectionId)?.fields.find(f => f.id === fieldId);
            if (field) field.value = newValue;
        });
    };

    const updateFieldLabel = (sectionId, fieldId, newLabel) => {
        updateBiodata(draft => {
            const field = draft.sections.find(s => s.id === sectionId)?.fields.find(f => f.id === fieldId);
            if (field) field.label = newLabel;
        });
    };

    const toggleFieldEnabled = (sectionId, fieldId) => {
        updateBiodata(draft => {
            const field = draft.sections.find(s => s.id === sectionId)?.fields.find(f => f.id === fieldId);
            if (field) field.enabled = !field.enabled;
        });
    };

    const toggleFieldShowLabel = (sectionId, fieldId) => {
        updateBiodata(draft => {
            const field = draft.sections.find(s => s.id === sectionId)?.fields.find(f => f.id === fieldId);
            if (field) field.showLabel = !field.showLabel;
        });
    };

    // --- NEW: Helper to update overview ---
    const updateOverview = (key, value) => {
        updateBiodata(draft => {
            draft.overview[key] = value;
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
        toggleFieldShowLabel,
        updateOverview
    };

    return <BiodataContext.Provider value={value}>{children}</BiodataContext.Provider>;
};

export const useBiodata = () => {
    const context = useContext(BiodataContext);
    if (context === undefined) throw new Error('useBiodata must be used within a BiodataProvider');
    return context;
};