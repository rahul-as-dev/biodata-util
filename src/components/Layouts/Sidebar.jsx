// src/components/Layout/Sidebar.jsx
import React from 'react';
import { Card, Select, Radio, Divider, Input, Switch, Button, Tooltip, Upload, message } from 'antd';
import { UploadOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
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

                <Divider orientation="left" style={{ marginTop: 24 }}>Image Placement</Divider>
                <Radio.Group
                    onChange={handleImagePlacementChange}
                    value={biodata.customizations.imagePlacement}
                    buttonStyle="solid"
                >
                    <Radio.Button value="left">Left</Radio.Button>
                    <Radio.Button value="center">Center</Radio.Button>
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
        </div>
    );
};

export default Sidebar;