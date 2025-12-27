import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Download, Palette, ShieldCheck, 
  Moon, Sun, ChevronRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn'; 
import { useTheme } from '../contexts/ThemeContext'; // Import Global Theme Hook

import ganeshaIcon from '../assets/icon-images/default-ganesha-icon.png';
import bgPattern from '../assets/bg/bg1.svg';

const Landing = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme(); // Use global state
  const [scrolled, setScrolled] = useState(false);

  // Handle Navbar Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-brand-500 selection:text-white bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* --- Navbar --- */}
      <nav className={cn(
        "fixed top-0 w-full z-50 border-b transition-all duration-300",
        scrolled 
          ? "backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800 shadow-sm" 
          : "bg-transparent border-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img src={ganeshaIcon} alt="Ganesha" className="w-8 h-8 opacity-80" />
              <span className="text-xl font-bold bg-gradient-to-r from-brand-500 to-brand-600 bg-clip-text text-transparent">
                VivahBio
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  "hover:bg-slate-200 dark:hover:bg-slate-800",
                  "text-slate-600 dark:text-slate-300"
                )}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button 
                onClick={() => navigate('/create')}
                className={cn(
                  "hidden sm:flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all",
                  "bg-brand-600 hover:bg-brand-700 text-white",
                  "hover:shadow-lg hover:shadow-brand-500/30"
                )}
              >
                Create Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
          {/* Blobs */}
          <div className="absolute top-0 left-10 w-72 h-72 bg-brand-300/30 dark:bg-brand-900/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten animate-blob" />
          <div className="absolute top-0 right-10 w-72 h-72 bg-purple-300/30 dark:bg-purple-900/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300/30 dark:bg-pink-900/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten animate-blob animation-delay-4000" />
          <div className="absolute inset-0 opacity-10 dark:opacity-5" style={{ backgroundImage: `url(${bgPattern})` }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6">
              <Heart size={14} className="fill-brand-500 text-brand-500" />
              <span>Trusted by 10,000+ Families</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
              Create the Perfect <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-600">
                Marriage Biodata
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Design a professional and elegant biodata in minutes. Choose from our premium templates, customize details, and download as high-quality PDF.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/create')}
                className={cn(
                  "flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-lg font-semibold transition-all",
                  "bg-brand-600 hover:bg-brand-700 text-white",
                  "hover:scale-105 hover:shadow-xl hover:shadow-brand-500/20"
                )}
              >
                Create Biodata Free
                <ChevronRight size={20} />
              </button>
              <button className={cn(
                "flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-lg font-medium transition-all",
                "bg-white dark:bg-slate-800 text-slate-700 dark:text-white",
                "border border-slate-200 dark:border-slate-700",
                "hover:bg-slate-50 dark:hover:bg-slate-700"
              )}>
                View Templates
              </button>
            </motion.div>
          </motion.div>

          {/* Right Visual (Mockup) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
             <div className="relative w-full max-w-md mx-auto">
               <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-500/20 rounded-full blur-xl" />
               <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl" />
               
               <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl shadow-slate-400/20 dark:shadow-black/50 p-4 border border-slate-100 dark:border-slate-700 transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                  <div className="aspect-[3/4] bg-slate-50 dark:bg-slate-900 rounded-lg overflow-hidden relative">
                      <div className="h-32 bg-brand-100 dark:bg-brand-900/40 w-full relative">
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-slate-300 dark:bg-slate-700 border-4 border-white dark:border-slate-800 overflow-hidden shadow-sm">
                           <img src={ganeshaIcon} className="w-full h-full object-cover p-2 opacity-50" alt="Avatar" />
                        </div>
                      </div>
                      <div className="mt-12 text-center px-6 space-y-3">
                         <div className="h-6 w-3/4 mx-auto bg-slate-200 dark:bg-slate-700 rounded mb-4" />
                         <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                         <div className="h-3 w-5/6 bg-slate-200 dark:bg-slate-700 rounded" />
                         <div className="h-3 w-4/6 bg-slate-200 dark:bg-slate-700 rounded" />
                      </div>
                      <div className="absolute bottom-4 right-4 bg-brand-500 text-white text-xs px-2 py-1 rounded shadow-md">
                         PDF Ready
                       </div>
                  </div>
               </div>
               {/* Second Card Peeking */}
               <div className="absolute top-4 left-4 -z-10 bg-slate-100 dark:bg-slate-800 rounded-2xl w-full h-full border border-slate-200 dark:border-slate-700 transform rotate-[3deg] opacity-60"></div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why Choose VivahBio?</h2>
            <p className="text-slate-600 dark:text-slate-400">Everything you need to create a biodata that stands out.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Palette className="w-8 h-8 text-brand-500" />}
              title="Premium Templates"
              desc="Choose from a wide variety of culturally tuned, modern, and traditional designs."
              className="hover:border-brand-200"
            />
            <FeatureCard 
              icon={<Download className="w-8 h-8 text-purple-500" />}
              title="Instant PDF Download"
              desc="Get a high-quality print-ready PDF immediately after entering your details."
              className="hover:border-purple-200"
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-emerald-500" />}
              title="Private & Secure"
              desc="We don't store your personal data. Your biodata is generated locally in your browser."
              className="hover:border-emerald-200"
            />
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
             <img src={ganeshaIcon} alt="Ganesha" className="w-8 h-8 grayscale opacity-50" />
             <span className="text-lg font-bold text-slate-700 dark:text-slate-300">VivahBio</span>
          </div>
          <p className="text-slate-500 dark:text-slate-500 text-sm mb-8 text-center">
            Helping families connect through beautiful introductions. <br />Made with ❤️ in India.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-brand-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-500 transition-colors">Contact</a>
          </div>
          <div className="mt-8 text-xs text-slate-300 dark:text-slate-700">
            © {new Date().getFullYear()} VivahBio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Refactored FeatureCard Component using cn()
const FeatureCard = ({ icon, title, desc, className }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={cn(
      "p-8 rounded-2xl shadow-sm hover:shadow-md transition-all",
      "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700",
      className 
    )}
  >
    <div className="bg-slate-50 dark:bg-slate-700/50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
      {desc}
    </p>
  </motion.div>
);

export default Landing;