import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Moon from 'lucide-react/dist/esm/icons/moon';
import Sun from 'lucide-react/dist/esm/icons/sun';
import Menu from 'lucide-react/dist/esm/icons/menu';
import X from 'lucide-react/dist/esm/icons/x';
import { Link, useLocation } from 'react-router-dom';
import { useBiodata } from '../../contexts/BiodataContext';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/templates', label: 'Templates' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }, // Removed as per request to focus on Privacy in footer, though generally Navbar keeps main nav
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          scrolled
            ? "h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200/50 dark:border-slate-800/50 shadow-sm"
            : "h-20 bg-transparent border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

          {/* Logo Area */}
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-3 group relative z-50">
            <div className="relative">
              <div className="absolute -inset-2 bg-linear-to-r from-rose-400 to-amber-400 rounded-full blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
              <img src="/logo.svg" alt="VivahPatra Logo" className="relative h-10 w-10 transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-none">
                Vivah <span className="text-rose-600">Patra</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-amber-600 font-bold mt-0.5">
                Biodata Maker
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-white/50 dark:bg-slate-900/50 px-2 py-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300",
                  isActive(link.path)
                    ? "text-rose-600 dark:text-rose-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                {isActive(link.path) && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-rose-50 dark:bg-rose-900/20 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions Area */}
          <div className="flex items-center gap-3 z-50">
            <button
              onClick={toggleTheme}
              className="cursor-pointer p-2.5 rounded-full text-slate-500 hover:bg-slate-100 hover:text-amber-500 dark:hover:bg-slate-800 dark:hover:text-amber-400 transition-all duration-300"
              aria-label="Toggle Theme"
            >
              <div className="relative overflow-hidden w-5 h-5">
                <div className={cn("absolute inset-0 transition-transform duration-500", isDark ? "translate-y-0" : "translate-y-8")}>
                  <Moon size={20} />
                </div>
                <div className={cn("absolute inset-0 transition-transform duration-500", isDark ? "-translate-y-8" : "translate-y-0")}>
                  <Sun size={20} />
                </div>
              </div>
            </button>

            {!isActive('/create') && (
              <Link
                to="/create"
                className={cn(
                  "hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold tracking-wide text-white shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer",
                  "bg-linear-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600",
                  "shadow-rose-500/30 hover:shadow-rose-500/50"
                )}
              >
                <span>Create Now</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-16 z-40 bg-white dark:bg-slate-950 md:hidden overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-4"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/create"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 bg-rose-600 text-white py-4 rounded-xl text-center font-bold text-lg shadow-xl shadow-rose-200 dark:shadow-none"
              >
                Create Biodata
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;