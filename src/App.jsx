import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BiodataProvider } from './contexts/BiodataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layouts/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const CreatePage = lazy(() => import('./pages/CreatePage'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <ThemeProvider>
      <BiodataProvider>
        <BrowserRouter>
          <Suspense fallback={
            <div className="h-screen w-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
            </div>
          }>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </BiodataProvider>
    </ThemeProvider>
  );
}

export default App;