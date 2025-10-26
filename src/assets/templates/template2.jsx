// src/assets/templates/template2.jsx
import React from 'react';
import { Row, Col, Divider } from 'antd';
import './template2.less'; // Template specific styles

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

    return (
        <div className="biodata-template2-container" style={{
            padding: '30px',
            fontFamily: customizations.fontFamily,
            color: '#333',
        }}>
            {header.enabled && (
                <div className="biodata-header-t2" style={headerStyle}>
                    {header.icon && <img src={header.icon} alt="header icon" style={{ height: '35px', marginRight: '15px' }} />}
                    <span style={{ fontSize: '1.5em', textTransform: 'uppercase' }}>{header.text}</span>
                </div>
            )}

            <Row gutter={24} style={{ marginTop: '20px' }}>
                {photo && customizations.imagePlacement === 'left' && (
                    <Col span={6} style={{ textAlign: 'center' }}>
                        <img
                            src={photo}
                            alt="Profile"
                            style={{
                                width: '120px',
                                height: '120px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: `2px solid ${customizations.primaryColor}`,
                                padding: '3px',
                                marginBottom: '20px',
                            }}
                        />
                    </Col>
                )}
                <Col span={photo && (customizations.imagePlacement === 'left' || customizations.imagePlacement === 'right') ? 18 : 24}>
                    {sections.filter(s => s.enabled).map(section => (
                        <div key={section.id} className="biodata-section-t2" style={{ marginBottom: '25px' }}>
                            <div style={sectionTitleStyle}>
                                {section.title}
                            </div>
                            <div className="biodata-fields-t2" style={{
                                display: 'grid',
                                gridTemplateColumns: '150px 1fr',
                                gap: '5px 15px',
                                textAlign: 'left',
                                // Conditionally render based on field.showLabel
                            }}>
                                {section.fields.filter(f => f.enabled).map(field => (
                                    <React.Fragment key={field.id}>
                                        {field.showLabel && <div className="field-label-t2" style={fieldLabelStyle}>{field.label} :</div>}
                                        <div className
                                            Name="field-value-t2"
                                            style={{
                                                gridColumn: field.showLabel ? '2 / 3' : '1 / -1', // If no label, span full width
                                            }}
                                        >
                                            {renderFieldValue(field.value, field.type)}
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    ))}
                </Col>
                {photo && customizations.imagePlacement === 'right' && (
                    <Col span={6} style={{ textAlign: 'center' }}>
                        <img
                            src={photo}
                            alt="Profile"
                            style={{
                                width: '120px',
                                height: '120px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: `2px solid ${customizations.primaryColor}`,
                                padding: '3px',
                                marginBottom: '20px',
                            }}
                        />
                    </Col>
                )}
            </Row>
            {photo && customizations.imagePlacement === 'center' && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <img
                        src={photo}
                        alt="Profile"
                        style={{
                            width: '120px',
                            height: '120px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            border: `2px solid ${customizations.primaryColor}`,
                            padding: '3px',
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Template2;