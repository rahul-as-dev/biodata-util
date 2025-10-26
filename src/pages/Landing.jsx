import React from 'react';
import { Layout, Typography, Button, Space } from 'antd';
import { DeploymentUnitOutlined, DownloadOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function Landing({ onEnterApp }) {
  return (
    <Layout style={{ minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <Content style={{ maxWidth: 900, padding: 24 }}>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <DeploymentUnitOutlined style={{ fontSize: 64, color: '#1890ff' }} />
          <Title style={{ marginTop: 16 }}>Marriage Biodata Maker</Title>
          <Paragraph style={{ fontSize: 16, color: '#555' }}>
            Create, edit and export beautiful biodata documents with a live preview.
            Reorder sections, upload photos, choose templates and download a PDF-ready file.
          </Paragraph>

          <Space size="large" style={{ marginTop: 24 }}>
            <Button type="primary" size="large" onClick={onEnterApp}>
              Open App
            </Button>
            <Button
              type="default"
              size="large"
              icon={<DownloadOutlined />}
              href="/build"
              target="_blank"
            >
              View Build (if deployed)
            </Button>
          </Space>

          <div style={{ marginTop: 32, textAlign: 'left' }}>
            <Title level={4}>About this project</Title>
            <Paragraph>
              This small React app helps you compose a marriage biodata (resume-like profile)
              with editable sections and PDF export powered by html2canvas and jsPDF.
            </Paragraph>
            <Paragraph>
              The app is built with React 18 and Ant Design. To deploy, build the app and serve
              the generated static files from a web server (nginx, Google Cloud Run, etc.).
            </Paragraph>
          </div>
        </div>
      </Content>
    </Layout>
  );
}
