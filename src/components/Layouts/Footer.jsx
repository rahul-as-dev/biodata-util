import React from 'react';
import { Heart, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="h-9 shrink-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 text-[11px] text-slate-500 z-40 select-none relative">
      <div className="flex items-center gap-4">
        <span>© {new Date().getFullYear()} VivahPatra.</span>
        <Link to="/about" className="hover:text-rose-600 transition-colors hidden sm:inline">About</Link>
        <Link to="/contact" className="hover:text-rose-600 transition-colors hidden sm:inline">Contact</Link>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
          Made with <Heart size={10} className="text-rose-500 fill-rose-500" /> in India
        </span>
        <div className="h-3 w-px bg-slate-300 dark:bg-slate-700"></div>
        <a href="#" className="flex items-center gap-1 hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
          <Github size={12} />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;