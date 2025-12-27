// src/assets/templates/template2.jsx
import React from 'react';

const Template2 = ({ biodata }) => {
    const { header, photo, sections, customizations } = biodata;

    const renderFieldValue = (value, type) => {
        if (type === 'textarea') {
            return value.split('\n').map((line, i) => <span key={i}>{line}<br /></span>);
        }
        return value;
    };

    const headerStyle = {
        textAlign: customizations.alignment,
        color: customizations.primaryColor,
        marginBottom: '20px',
        paddingBottom: '10px',
        borderBottom: `1px solid ${customizations.primaryColor}`,
    };

    const sectionTitleStyle = {
        color: customizations.primaryColor,
        fontSize: '1.15em',
        fontWeight: 'bold',
        marginBottom: '10px',
        borderLeft: `3px solid ${customizations.primaryColor}`,
        paddingLeft: '10px',
    };

    const fieldLabelStyle = {
        fontWeight: '600',
        color: '#666',
        marginRight: '10px',
    };

    const isCircle = customizations.imageShape === 'circle';
    const photoWrapperStyle = {
        display: 'inline-block',
        padding: '3px',
        background: customizations.primaryColor,
        borderRadius: isCircle ? '50%' : '8px',
    };
    const photoStyle = {
        width: isCircle ? '120px' : '110px',
        height: isCircle ? '120px' : '150px',
        objectFit: 'cover',
        borderRadius: isCircle ? '50%' : '6px',
        marginBottom: '12px',
        display: 'block',
    };

    return (
        <div className="biodata-template2-container p-8" style={{
            fontFamily: customizations.fontFamily,
            color: '#333',
        }}>
            {header.enabled && (
                <div className="biodata-header-t2 pb-3 mb-5 border-b" style={headerStyle}>
                    {header.icon && <img src={header.icon} alt="header icon" className="h-9 mr-4 inline" />}
                    <span style={{ fontSize: '1.5em', textTransform: 'uppercase' }}>{header.text}</span>
                </div>
            )}

            {sections.filter(s => s.enabled).map(section => {
                if (section.id === 'personal') {
                    // Place the photo above or to the right of the personal section
                    if (customizations.imagePlacement === 'above' && photo) {
                        return (
                            <div key={section.id} className="mt-5 mb-6">
                                <div className="text-center">
                                    <div style={photoWrapperStyle}>
                                        <img src={photo} alt="Profile" style={photoStyle} />
                                    </div>
                                </div>
                                <div className="biodata-section-t2 mt-3">
                                    <div style={sectionTitleStyle}>{section.title}</div>
                                    <div className="biodata-fields-t2 grid gap-y-1 gap-x-4 text-left" style={{ gridTemplateColumns: '150px 1fr' }}>
                                        {section.fields.filter(f => f.enabled).map(field => (
                                            <React.Fragment key={field.id}>
                                                {field.showLabel && <div className="field-label-t2 font-semibold text-gray-600" style={fieldLabelStyle}>{field.label} :</div>}
                                                <div className="field-value-t2" style={{ gridColumn: field.showLabel ? '2 / 3' : '1 / -1' }}>{renderFieldValue(field.value, field.type)}</div>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    if (customizations.imagePlacement === 'right' && photo) {
                        return (
                            <div key={section.id} className="mt-5 mb-6">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-2">
                                        <div className="biodata-section-t2">
                                            <div style={sectionTitleStyle}>{section.title}</div>
                                            <div className="biodata-fields-t2 grid gap-y-1 gap-x-4 text-left" style={{ gridTemplateColumns: '150px 1fr' }}>
                                                {section.fields.filter(f => f.enabled).map(field => (
                                                    <React.Fragment key={field.id}>
                                                        {field.showLabel && <div className="field-label-t2 font-semibold text-gray-600" style={fieldLabelStyle}>{field.label} :</div>}
                                                        <div className="field-value-t2" style={{ gridColumn: field.showLabel ? '2 / 3' : '1 / -1' }}>{renderFieldValue(field.value, field.type)}</div>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div style={photoWrapperStyle}>
                                            <img src={photo} alt="Profile" style={photoStyle} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }

                // Default section rendering
                return (
                    <div key={section.id} className="biodata-section-t2 mb-6">
                        <div style={sectionTitleStyle}>{section.title}</div>
                        <div className="biodata-fields-t2 grid gap-y-1 gap-x-4 text-left" style={{ gridTemplateColumns: '150px 1fr' }}>
                            {section.fields.filter(f => f.enabled).map(field => (
                                <React.Fragment key={field.id}>
                                    {field.showLabel && <div className="field-label-t2 font-semibold text-gray-600" style={fieldLabelStyle}>{field.label} :</div>}
                                    <div className="field-value-t2" style={{ gridColumn: field.showLabel ? '2 / 3' : '1 / -1' }}>{renderFieldValue(field.value, field.type)}</div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Template2;