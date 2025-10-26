// src/App.js
import React from 'react';
import { Layout } from 'antd';
import { BiodataProvider } from './contexts/BiodataContext';
import HomePage from './pages/HomePage';
import './assets/styles/main.less'; // Custom styles

// No need for AntD's Header/Content/Sider here if HomePage takes full control
// const { Header, Content, Sider } = Layout;

function App() {
    return (
        <BiodataProvider>
            {/* The Layout component ensures proper styling and structure for the whole app */}
            <Layout style={{ minHeight: '100vh' }}>
                <HomePage />
            </Layout>
        </BiodataProvider>
    );
}

export default App;