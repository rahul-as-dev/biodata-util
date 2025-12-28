import React from 'react';
import { useTheme } from '../../contexts/ThemeContext'; // Adjust path as needed
import { Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useBiodata } from '../../contexts/BiodataContext';
import { generatePdf } from '../../utils/PDFGenerator';
import { cn } from '../../utils/cn';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const { biodata } = useBiodata();

  const handleDownload = async () => {
    try {
        await generatePdf(biodata);
    } catch (error) {
        alert('Failed to generate PDF');
    }
  };

  const isActive = (path) => location.pathname === path 
    ? "text-rose-600 dark:text-rose-400 font-semibold" 
    : "text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400";

  return (
    <nav className="h-16 shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-40 relative">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
          <img src="/logo.svg" alt="VivahPatra Logo" className="relative h-10 w-10 transition-transform duration-300 group-hover:scale-105" />
        </div>
        <div className="flex flex-col">
          <span className="font-serif text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-none">
            Vivah<span className="text-rose-600">Patra</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-amber-600 font-bold mt-0.5">
            Biodata Maker
          </span>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <Link to="/" className={`text-sm transition-colors ${isActive('/')}`}>Home</Link>
        <Link to="/about" className={`text-sm transition-colors ${isActive('/about')}`}>About</Link>
        <Link to="/contact" className={`text-sm transition-colors ${isActive('/contact')}`}>Contact</Link>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-all"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        
        {location.pathname === '/create' ? (<button
          onClick={handleDownload}
          className={cn("cursor-pointer bg-brand-600 hover:bg-brand-700 text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all disabled:opacity-50")}
        >Download PDF</button>) :
        (<Link to="/create" className="hidden sm:flex bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-lg shadow-rose-200 dark:shadow-none">
          Create Biodata
        </Link>)}
        
      </div>
    </nav>
  );
};

export default Navbar;