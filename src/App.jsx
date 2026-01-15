import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BiodataProvider } from './contexts/BiodataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layouts/Layout';
import PageLoader from './components/common/PageLoader';

const HomePage = lazy(() => import('./pages/HomePage'));
const CreatePage = lazy(() => import('./pages/CreatePage'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const TemplatesPage = lazy(() => import('./pages/TemplatesPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

function App() {
  return (
    <ThemeProvider>
      <BiodataProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/templates" element={<TemplatesPage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </BiodataProvider>
    </ThemeProvider>
  );
}

export default App;