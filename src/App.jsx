import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BiodataProvider } from './contexts/BiodataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layouts/Layout';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <ThemeProvider>
      <BiodataProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BiodataProvider>
    </ThemeProvider>
  );
}

export default App;