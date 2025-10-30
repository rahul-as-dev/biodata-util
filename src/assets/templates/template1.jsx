// src/assets/templates/template1.jsx
import React from 'react';
import { Divider } from 'antd';
import './template1.less'; // Template specific styles

const Template1 = ({ biodata }) => {
    const { header, photo, sections, customizations } = biodata;

    // Helper to render field value, especially for multiline textareas
    const renderFieldValue = (value, type) => {
        if (type === 'textarea') {
            return value.split('\n').map((line, i) => <span key={i}>{line}<br /></span>);
        }
        return value;
    };

    // Apply header styles based on customizations
    const headerWrapperStyle = {
        display: 'flex',
        justifyContent: customizations.headerPlacement === 'top' ? customizations.alignment : 'center',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '10px',
        borderBottom: `1px solid ${customizations.primaryColor}50`, // Semi-transparent line
        color: customizations.primaryColor,
    };

    const headerTextStyle = {
        fontWeight: 'bold',
        fontSize: '1.4em',
        textTransform: 'uppercase',
    };

    // Apply photo wrapper styles based on customizations
    const isCircle = customizations.imageShape === 'circle';
    const photoWrapperStyle = {
        textAlign: 'center',
        marginBottom: '12px',
        display: 'inline-block',
        padding: '3px',
        background: customizations.primaryColor,
        // wrapper borderRadius should match outer shape
        borderRadius: isCircle ? '50%' : '8px',
    };

    const photoStyle = {
        width: isCircle ? '150px' : '120px',
        height: isCircle ? '150px' : '160px',
        objectFit: 'cover',
        borderRadius: isCircle ? '50%' : '6px',
        display: 'block',
        // remove border/padding from the img itself; wrapper provides the colored ring
    };

    // Style for section dividers
    const sectionDividerStyle = {
        color: customizations.primaryColor,
        borderColor: customizations.primaryColor,
        fontWeight: 'bold',
        fontSize: '1.2em',
    };

    const fieldLabelStyle = {
        fontWeight: '600',
        color: '#555',
        marginRight: '10px',
    };


    return (
        <div className="biodata-template1-container"
             style={{
                 textAlign: customizations.alignment, // Apply global text alignment
                 fontFamily: customizations.fontFamily,
                 color: '#333', // Default text color for the template
             }}
        >
            {/* Header */}
            {header.enabled && (
                <div className="biodata-header" style={headerWrapperStyle}>
                    {header.icon && <img src={header.icon} alt="header icon" style={{ height: '35px', marginRight: '15px' }} />}
                    <span style={headerTextStyle}>{header.text}</span>
                </div>
            )}

            {/* Sections */}
            {sections.filter(s => s.enabled).map(section => {
                // If this is the Personal Details section, place the photo above or to the right
                if (section.id === 'personal') {
                    if (customizations.imagePlacement === 'above' && photo) {
                        return (
                            <div key={section.id} className="biodata-section" style={{ marginBottom: '25px' }}>
                                <div className="biodata-photo-wrapper" style={photoWrapperStyle}>
                                    <img src={photo} alt="Profile" style={photoStyle} />
                                </div>
                                <Divider orientation="left">
                                    <span style={sectionDividerStyle}>{section.title}</span>
                                </Divider>
                                <div className="biodata-fields" style={{
                                    display: 'grid',
                                    gridTemplateColumns: customizations.alignment === 'left' ? '150px 1fr' : 'max-content 1fr',
                                    gap: '5px 15px',
                                    textAlign: 'left',
                                    maxWidth: '80%',
                                }}>
                                    {section.fields.filter(f => f.enabled).map(field => (
                                        <React.Fragment key={field.id}>
                                            {field.showLabel && <div className="field-label" style={fieldLabelStyle}>{field.label} :</div>}
                                            <div className="field-value" style={{ gridColumn: field.showLabel ? '2 / 3' : '1 / -1' }}>
                                                {renderFieldValue(field.value, field.type)}
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        );
                    }

                    if (customizations.imagePlacement === 'right' && photo) {
                        return (
                            <div key={section.id} className="biodata-section" style={{ marginBottom: '25px' }}>
                                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                    <div style={{ flex: 1 }}>
                                        <Divider orientation="left">
                                            <span style={sectionDividerStyle}>{section.title}</span>
                                        </Divider>
                                        <div className="biodata-fields" style={{
                                            display: 'grid',
                                            gridTemplateColumns: customizations.alignment === 'left' ? '150px 1fr' : 'max-content 1fr',
                                            gap: '5px 15px',
                                            textAlign: 'left',
                                        }}>
                                            {section.fields.filter(f => f.enabled).map(field => (
                                                <React.Fragment key={field.id}>
                                                    {field.showLabel && <div className="field-label" style={fieldLabelStyle}>{field.label} :</div>}
                                                    <div className="field-value" style={{ gridColumn: field.showLabel ? '2 / 3' : '1 / -1' }}>
                                                        {renderFieldValue(field.value, field.type)}
                                                    </div>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ width: isCircle ? 170 : 140, textAlign: 'center' }}>
                                        <div style={photoWrapperStyle}>
                                            <img src={photo} alt="Profile" style={photoStyle} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }

                // Default rendering for other sections and cases where no photo
                return (
                    <div key={section.id} className="biodata-section" style={{ marginBottom: '25px' }}>
                        <Divider orientation="left">
                            <span style={sectionDividerStyle}>{section.title}</span>
                        </Divider>
                        <div className="biodata-fields" style={{
                            display: 'grid',
                            // If center/right alignment, labels might still be left-aligned with values
                            gridTemplateColumns: customizations.alignment === 'left' ? '150px 1fr' : 'max-content 1fr',
                            gap: '5px 15px',
                            textAlign: 'left', // Keep field labels/values left aligned usually
                            marginLeft: customizations.alignment === 'center' ? 'auto' : (customizations.alignment === 'right' ? 'auto' : '0'),
                            marginRight: customizations.alignment === 'center' ? 'auto' : (customizations.alignment === 'left' ? 'auto' : '0'),
                            maxWidth: '80%', // Limit width for centered sections
                        }}>
                            {section.fields.filter(f => f.enabled).map(field => (
                                <React.Fragment key={field.id}>
                                    {field.showLabel && <div className="field-label" style={fieldLabelStyle}>{field.label} :</div>}
                                    <div
                                        className="field-value"
                                        style={{
                                            gridColumn: field.showLabel ? '2 / 3' : '1 / -1', // If no label, span full width
                                            // Adjust value alignment if needed
                                        }}
                                    >
                                        {renderFieldValue(field.value, field.type)}
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Template1;