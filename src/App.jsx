import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BiodataProvider } from './contexts/BiodataContext';
import { ThemeProvider } from './contexts/ThemeContext'; // Import ThemeProvider
import Landing from './pages/Landing';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ThemeProvider>
      <BiodataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/create" element={<HomePage />} />
          </Routes>
        </Router>
      </BiodataProvider>
    </ThemeProvider>
  );
}

export default App;