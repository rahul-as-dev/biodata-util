// src/components/Layout/Sidebar.jsx
import React from 'react';
import { Card, Select, Radio, Divider, Input, Switch, Button, Upload, message, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import bg1 from '../../assets/bg/bg1.svg';
import bg2 from '../../assets/bg/bg2.svg';
import defaultGanesha from '../../assets/icon-images/default-ganesha-icon.png';
import { useBiodata } from '../../contexts/BiodataContext';

const { Option } = Select;

const Sidebar = () => {
    const { biodata, updateBiodata } = useBiodata();

    const handleTemplateChange = (value) => {
        updateBiodata(draft => {
            draft.template = value;
        });
    };

    const handleAlignmentChange = (e) => {
        updateBiodata(draft => {
            draft.customizations.alignment = e.target.value;
        });
    };

    const handleImagePlacementChange = (e) => {
        updateBiodata(draft => {
            draft.customizations.imagePlacement = e.target.value;
        });
    };

    const handleFontFamilyChange = (value) => {
        updateBiodata(draft => {
            draft.customizations.fontFamily = value;
        });
    };

    const handlePrimaryColorChange = (e) => {
        updateBiodata(draft => {
            draft.customizations.primaryColor = e.target.value;
        });
    };

    const handleHeaderIconUpload = (info) => {
        if (info.file.status === 'done') {
            const reader = new FileReader();
            reader.readAsDataURL(info.file.originFileObj);
            reader.onload = () => {
                updateBiodata(draft => {
                    draft.header.icon = reader.result;
                });
                message.success(`${info.file.name} file uploaded successfully`);
            };
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        return false; // Prevent Ant Design's default upload
    };

    const handleRemoveHeaderIcon = () => {
        updateBiodata(draft => {
            draft.header.icon = '';
        });
    };

    return (
        <div style={{ padding: '0 16px' }}>
            <Card title="Choose Template" size="small" style={{ marginBottom: 16 }}>
                <Select
                    value={biodata.template}
                    style={{ width: '100%' }}
                    onChange={handleTemplateChange}
                >
                    <Option value="template1">Classic Template</Option>
                    <Option value="template2">Modern Template</Option>
                </Select>
            </Card>

            <Card title="Layout Customization" size="small" style={{ marginBottom: 16 }}>
                <Divider orientation="left">Text Alignment</Divider>
                <Radio.Group
                    onChange={handleAlignmentChange}
                    value={biodata.customizations.alignment}
                    buttonStyle="solid"
                >
                    <Radio.Button value="left">Left</Radio.Button>
                    <Radio.Button value="center">Center</Radio.Button>
                    <Radio.Button value="right">Right</Radio.Button>
                </Radio.Group>

                <Divider orientation="left" style={{ marginTop: 24 }}>Image Placement (Personal Details)</Divider>
                <Radio.Group
                    onChange={handleImagePlacementChange}
                    value={biodata.customizations.imagePlacement}
                    buttonStyle="solid"
                >
                    <Radio.Button value="above">Above</Radio.Button>
                    <Radio.Button value="right">Right</Radio.Button>
                </Radio.Group>

                <Divider orientation="left" style={{ marginTop: 24 }}>Font Family</Divider>
                <Select
                    value={biodata.customizations.fontFamily}
                    style={{ width: '100%' }}
                    onChange={handleFontFamilyChange}
                >
                    <Option value="serif">Serif (e.g., Times New Roman)</Option>
                    <Option value="sans-serif">Sans-serif (e.g., Arial)</Option>
                    <Option value="monospace">Monospace</Option>
                    {/* Could add more specific fonts by importing them */}
                </Select>

                <Divider orientation="left" style={{ marginTop: 24 }}>Primary Color</Divider>
                <Input
                    type="color"
                    value={biodata.customizations.primaryColor}
                    onChange={handlePrimaryColorChange}
                    style={{ width: '100%', height: '32px' }}
                />
            </Card>

            <Card title="Header Options" size="small">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16, justifyContent: 'space-between' }}>
                    <span>Show Header:</span>
                    <Switch
                        checked={biodata.header.enabled}
                        onChange={(checked) => updateBiodata(draft => { draft.header.enabled = checked; })}
                    />
                </div>
                {biodata.header.enabled && (
                    <>
                        <div style={{ marginBottom: 10 }}>
                            <label>Header Text:</label>
                            <Input
                                value={biodata.header.text}
                                onChange={(e) => updateBiodata(draft => { draft.header.text = e.target.value; })}
                                style={{ width: '100%', padding: '5px', border: '1px solid #d9d9d9', borderRadius: '2px' }}
                            />
                        </div>
                        <Divider orientation="left">Header Icon</Divider>
                        {biodata.header.icon ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <img src={biodata.header.icon} alt="Header Icon" style={{ maxHeight: '30px', maxWidth: '30px' }} />
                                <Button danger size="small" onClick={handleRemoveHeaderIcon}>Remove Icon</Button>
                            </div>
                        ) : (
                            <Upload
                                accept="image/*"
                                showUploadList={false}
                                beforeUpload={(file) => {
                                    handleHeaderIconUpload({ file: { status: 'done', originFileObj: file, name: file.name } });
                                    return false;
                                }}
                            >
                                <Button icon={<UploadOutlined />}>Upload Header Icon</Button>
                            </Upload>
                        )}
                    </>
                )}
            </Card>

            <Card title="Background (PDF)" size="small" style={{ marginTop: 16 }}>
                <div style={{ marginBottom: 8 }}>Pick background for PDF export / preview:</div>
                <Space>
                    {[{src: bg1, name: 'Subtle 1'}, {src: bg2, name: 'Subtle 2'}, {src: defaultGanesha, name: 'Ganesha'}].map(b => (
                        <div key={b.name} style={{ textAlign: 'center' }}>
                            <img
                                src={b.src}
                                alt={b.name}
                                style={{ width: 80, height: 120, objectFit: 'cover', cursor: 'pointer', border: biodata.customizations.backgroundImage === b.src ? '2px solid #1890ff' : '1px solid #eee' }}
                                onClick={() => updateBiodata(draft => { draft.customizations.backgroundImage = b.src; })}
                            />
                        </div>
                    ))}
                    <div>
                        <Button onClick={() => updateBiodata(draft => { draft.customizations.backgroundImage = ''; })}>Clear</Button>
                    </div>
                </Space>
            </Card>
        </div>
    );
};

export default Sidebar;