// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { Layout, Row, Col, Card, Tabs, Button, Input, Modal, Form, message, Tooltip } from 'antd';
import { DownloadOutlined, PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import Sidebar from '../components/Layouts/Sidebar';
import BiodataPreview from '../components/BiodataPreview';
import { useBiodata } from '../contexts/BiodataContext';
import { generatePdf } from '../utils/PDFGenerator';
import DraggableList from '../components/common/DraggableList';
import PhotoUpload from '../components/Forms/PhotoUpload';
import moment from 'moment'; // For date handling with Ant Design

const { Content } = Layout;
const { TabPane } = Tabs;

// Helper component for editing individual fields
const FieldEditor = ({ sectionId, field }) => {
    const { updateFieldValue, updateFieldLabel, toggleFieldEnabled, removeField, toggleFieldShowLabel } = useBiodata();

    const renderInput = () => {
        switch (field.type) {
            case 'text':
                return <Input
                    value={field.value}
                    onChange={(e) => updateFieldValue(sectionId, field.id, e.target.value)}
                    placeholder={field.label}
                />;
            case 'textarea':
                return <Input.TextArea
                    value={field.value}
                    onChange={(e) => updateFieldValue(sectionId, field.id, e.target.value)}
                    rows={3}
                    placeholder={field.label}
                />;
            case 'date':
                return <Input
                    type="text" // Display as text for simplicity, could use AntD DatePicker
                    value={field.value}
                    onChange={(e) => updateFieldValue(sectionId, field.id, e.target.value)}
                    placeholder="e.g., 5 January 1995"
                />
            // Add more input types (number, select, etc.) as needed
            default:
                return <Input
                    value={field.value}
                    onChange={(e) => updateFieldValue(sectionId, field.id, e.target.value)}
                    placeholder={field.label}
                />;
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: '1px dashed #eee' }}>
            <Input
                style={{ width: '150px' }}
                value={field.label}
                onChange={(e) => updateFieldLabel(sectionId, field.id, e.target.value)}
                placeholder="Field Label"
            />
            <div style={{ flexGrow: 1 }}>
                {renderInput()}
            </div>
            <Tooltip title={field.enabled ? 'Hide Field' : 'Show Field'}>
                <Button
                    icon={field.enabled ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    onClick={() => toggleFieldEnabled(sectionId, field.id)}
                    size="small"
                    type={field.enabled ? 'default' : 'dashed'}
                />
            </Tooltip>
            <Tooltip title="Remove Field">
                <Button
                    icon={<DeleteOutlined />}
                    onClick={() => removeField(sectionId, field.id)}
                    danger
                    size="small"
                />
            </Tooltip>
            {/* Optional: button to toggle label visibility */}
            <Tooltip title={field.showLabel ? 'Hide Label' : 'Show Label'}>
                <Button
                    icon={field.showLabel ? <EditOutlined /> : <EyeInvisibleOutlined />}
                    onClick={() => toggleFieldShowLabel(sectionId, field.id)}
                    size="small"
                    type={field.showLabel ? 'default' : 'dashed'}
                />
            </Tooltip>
        </div>
    );
};

// Component for managing a single biodata section
const SectionEditor = ({ section }) => {
    const { updateBiodata, addField, removeSection, toggleSectionEnabled } = useBiodata();

    const onFieldOrderChange = (newFields) => {
        updateBiodata(draft => {
            const targetSection = draft.sections.find(s => s.id === section.id);
            if (targetSection) {
                targetSection.fields = newFields;
            }
        });
    };

    return (
        <Card
            title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Input
                        value={section.title}
                        onChange={(e) => updateBiodata(draft => {
                            const sec = draft.sections.find(s => s.id === section.id);
                            if (sec) sec.title = e.target.value;
                        })}
                        style={{ width: 'calc(100% - 100px)' }}
                    />
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Tooltip title={section.enabled ? 'Hide Section' : 'Show Section'}>
                            <Button
                                icon={section.enabled ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                onClick={() => toggleSectionEnabled(section.id)}
                                type={section.enabled ? 'default' : 'dashed'}
                                size="small"
                            />
                        </Tooltip>
                        <Tooltip title="Remove Section">
                            <Button
                                icon={<DeleteOutlined />}
                                onClick={() => removeSection(section.id)}
                                danger
                                size="small"
                            />
                        </Tooltip>
                    </div>
                </div>
            }
            size="small"
            style={{ marginBottom: 16 }}
        >
            <DraggableList
                items={section.fields}
                onSortEnd={onFieldOrderChange}
                renderItem={(field) => <FieldEditor sectionId={section.id} field={field} />}
            />
            <Button
                type="dashed"
                block
                icon={<PlusOutlined />}
                onClick={() => addField(section.id)}
                style={{ marginTop: 16 }}
            >
                Add New Field
            </Button>
        </Card>
    );
};


const HomePage = () => {
    const { biodata, updateBiodata, addSection } = useBiodata();
    const [isAddSectionModalVisible, setIsAddSectionModalVisible] = useState(false);
    const [newSectionTitle, setNewSectionTitle] = useState('');

    const handleDownloadPdf = async () => {
        message.loading({ content: 'Generating PDF...', key: 'pdf_gen' });
        try {
            await generatePdf(biodata);
            message.success({ content: 'PDF generated successfully!', key: 'pdf_gen', duration: 2 });
        } catch (error) {
            console.error(error);
            message.error({ content: 'Failed to generate PDF.', key: 'pdf_gen', duration: 2 });
        }
    };

    const onSectionListSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
            updateBiodata(draft => {
                const [removed] = draft.sections.splice(oldIndex, 1);
                draft.sections.splice(newIndex, 0, removed);
            });
        }
    };

    const handleAddSection = () => {
        if (newSectionTitle.trim()) {
            addSection(newSectionTitle.trim().toUpperCase());
            setNewSectionTitle('');
            setIsAddSectionModalVisible(false);
        } else {
            message.error('Section title cannot be empty.');
        }
    };

    return (
        <Layout style={{ padding: '24px 0', background: '#f0f2f5' }}>
            <Row gutter={24}>
                {/* Left Panel: Forms and Customization */}
                <Col span={10}>
                    <Card title="Biodata Editor" style={{ marginBottom: 24 }}>
                        <Tabs defaultActiveKey="1" tabPosition="left">
                            <TabPane tab="Biodata Sections" key="1">
                                <DraggableList
                                    items={biodata.sections}
                                    onSortEnd={onSectionListSortEnd}
                                    renderItem={(section) => <SectionEditor section={section} />}
                                />
                                <Button
                                    type="dashed"
                                    block
                                    icon={<PlusOutlined />}
                                    onClick={() => setIsAddSectionModalVisible(true)}
                                    style={{ marginTop: 16 }}
                                >
                                    Add New Section
                                </Button>
                            </TabPane>
                            <TabPane tab="Photo" key="2">
                                <PhotoUpload />
                            </TabPane>
                            <TabPane tab="Templates & Styles" key="3">
                                <Sidebar />
                            </TabPane>
                        </Tabs>
                        <Button
                            type="primary"
                            icon={<DownloadOutlined />}
                            size="large"
                            onClick={handleDownloadPdf}
                            style={{ marginTop: 24, width: '100%' }}
                        >
                            Download Biodata as PDF
                        </Button>
                    </Card>
                </Col>

                {/* Right Panel: Live Preview */}
                <Col span={14}>
                    <Card title="Live Preview" style={{ minHeight: '700px' }}>
                        <BiodataPreview biodata={biodata} />
                    </Card>
                </Col>
            </Row>

            <Modal
                title="Add New Section"
                open={isAddSectionModalVisible}
                onOk={handleAddSection}
                onCancel={() => setIsAddSectionModalVisible(false)}
                okText="Add Section"
            >
                <Form layout="vertical">
                    <Form.Item label="Section Title">
                        <Input
                            value={newSectionTitle}
                            onChange={(e) => setNewSectionTitle(e.target.value)}
                            placeholder="e.g., EDUCATION, HOBBIES, EXPECTATIONS"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default HomePage;