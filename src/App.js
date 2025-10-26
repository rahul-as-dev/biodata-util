// src/App.js
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { BiodataProvider } from './contexts/BiodataContext';
import HomePage from './pages/HomePage';
import Landing from './pages/Landing';
import './assets/styles/main.less'; // Custom styles

// No need for AntD's Header/Content/Sider here if HomePage takes full control
// const { Header, Content, Sider } = Layout;

function App() {
    // If the user navigates directly to /app we should open the app, otherwise show landing
    const [showApp, setShowApp] = useState(false);

    useEffect(() => {
        if (window && window.location && window.location.pathname === '/app') {
            setShowApp(true);
        }
    }, []);

    function enterApp() {
        // push a nice URL so users can bookmark the editor
        try {
            window.history.pushState({}, '', '/app');
        } catch (e) {
            // ignore
        }
        setShowApp(true);
    }

    return (
        <BiodataProvider>
            {/* The Layout component ensures proper styling and structure for the whole app */}
            <Layout style={{ minHeight: '100vh' }}>
                {showApp ? <HomePage /> : <Landing onEnterApp={enterApp} />}
            </Layout>
        </BiodataProvider>
    );
}

export default App;