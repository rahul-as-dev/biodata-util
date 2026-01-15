import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Heart, Download, Palette, ShieldCheck,
  ChevronRight, Star, Sparkles, CheckCircle,
  MousePointerClick, FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';
import { useTheme } from '../contexts/ThemeContext';

import SimpleGanesha from '../assets/svg-assets/SimpleGanesha1.svg';
import bgPattern from '../assets/document-bg/bg1.svg';

const HomePage = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500 selection:bg-brand-500 selection:text-white font-sans">

      {/* --- Ambient Background --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-400/20 dark:bg-brand-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-400/20 dark:bg-purple-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-pink-400/20 dark:bg-pink-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: `url(${bgPattern})`, backgroundSize: '400px' }} />
      </div>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">

          <motion.div
            initial="hidden" animate="visible"
            variants={staggerContainer}
            className="text-center lg:text-left z-10"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-brand-100 dark:border-brand-900/50 shadow-sm mb-8">
              <div className="flex -space-x-2 mr-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 bg-brand-${i * 100} flex items-center justify-center text-[10px] font-bold text-brand-900`}>
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Trusted by <span className="font-bold text-brand-600 dark:text-brand-400">10,000+</span> couples
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
              Craft Your Perfect <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-purple-500 to-brand-600 animate-gradient-x">
                Marriage Biodata
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Design professional, culturally-tuned biodata in minutes. Select from premium templates and download instant high-quality PDFs.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate('/create')}
                className="group relative px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-full text-lg font-bold shadow-xl shadow-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/40 transition-all hover:-translate-y-1 overflow-hidden flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Create For Free <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>

              <button
                onClick={() => navigate('/templates')}
                className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-full text-lg font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:-translate-y-1 shadow-sm hover:shadow-lg"
              >
                View Templates
              </button>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1"><CheckCircle size={16} className="text-emerald-500" /> No Signup Required</div>
              <div className="flex items-center gap-1"><CheckCircle size={16} className="text-emerald-500" /> Free PDF Download</div>
            </motion.div>
          </motion.div>

          {/* Optimized Hero Visual */}
          <div className="relative hidden lg:block h-[600px] w-full perspective-[2000px]">
            {/* Floating Elements with Parallax */}
            <motion.div style={{ y: y1, rotate: -5 }} className="absolute top-0 right-10 z-20">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 w-64 backdrop-blur-xl bg-opacity-90 dark:bg-opacity-90">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center">
                    <Heart size={20} className="text-brand-500 fill-brand-500" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Perfect Match</p>
                    <p className="text-xs text-slate-500">Just Now</p>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full w-full overflow-hidden">
                  <div className="h-full bg-brand-500 w-[85%]" />
                </div>
              </div>
            </motion.div>

            <motion.div style={{ y: y2, rotate: 3 }} className="absolute bottom-20 left-10 z-20">
              <div className="bg-white dark:bg-slate-800 px-6 py-4 rounded-full shadow-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 backdrop-blur-xl bg-opacity-90 dark:bg-opacity-90">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <ShieldCheck size={20} className="text-green-600 dark:text-green-400" />
                </div>
                <span className="font-bold text-slate-900 dark:text-white">100% Secure & Private</span>
              </div>
            </motion.div>

            {/* Main Card */}
            <motion.div
              initial={{ rotateY: 15, rotateX: 5, scale: 0.9, opacity: 0 }}
              animate={{ rotateY: -5, rotateX: 2, scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute inset-x-12 inset-y-8 bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] border-[8px] border-slate-100 dark:border-slate-800 overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-br from-brand-400 to-purple-600 opacity-90" />
              <div className="relative pt-20 px-8 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden bg-white relative z-10 flex items-center justify-center">
                  <img src={SimpleGanesha} className="w-20 h-20 object-contain opacity-90" alt="Ganesha" />
                </div>
                <div className="mt-4 text-center space-y-2 w-full max-w-xs">
                  <div className="h-6 w-3/4 mx-auto bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                  <div className="h-4 w-1/2 mx-auto bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                </div>
                <div className="mt-8 w-full space-y-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex gap-4">
                      <div className="h-8 w-8 rounded bg-slate-100 dark:bg-slate-800" />
                      <div className="h-8 flex-1 rounded bg-slate-50 dark:bg-slate-800/50" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- How It Works Section --- */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-600 dark:text-brand-400 font-bold tracking-wider uppercase text-sm">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2 mb-4">Create in 3 Easy Steps</h2>
            <div className="w-20 h-1.5 bg-brand-500 rounded-full mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 dark:bg-slate-800 border-t-2 border-dashed border-slate-300 dark:border-slate-700 -z-10" />

            <StepCard
              number="1"
              icon={<FileText className="w-6 h-6 text-brand-600" />}
              title="Enter Details"
              desc="Fill in your personal, family, and professional details in our easy form."
            />
            <StepCard
              number="2"
              icon={<Palette className="w-6 h-6 text-purple-600" />}
              title="Choose Template"
              desc="Select from our wide range of professional single & multi-page designs."
            />
            <StepCard
              number="3"
              icon={<Download className="w-6 h-6 text-green-600" />}
              title="Download PDF"
              desc="Get your high-quality, print-ready biodata instantly. No watermarks."
            />
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Why Choose Vivah Patra?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              We combine traditional aesthetics with modern design technology to help you make the best first impression.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Star className="w-8 h-8 text-amber-500" />}
              title="Premium Templates"
              desc="Access a library of handcrafted designs suitable for every culture and preference."
            />
            <FeatureCard
              icon={<MousePointerClick className="w-8 h-8 text-blue-500" />}
              title="Instant Preview"
              desc="See changes in real-time as you type. No guesswork needed."
            />
            <FeatureCard
              icon={<Download className="w-8 h-8 text-brand-500" />}
              title="HD PDF Export"
              desc="Download crisp, high-resolution PDFs that look great on any screen or paper."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8 text-emerald-500" />}
              title="Privacy First"
              desc="Your data stays in your browser. We don't store or share your personal information."
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8 text-purple-500" />}
              title="Ad-Free Experience"
              desc="Focus on creating your biodata without distracting advertisements."
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8 text-pink-500" />}
              title="Made with Love"
              desc="Culturally tuned fields and icons designed specifically for Indian marriages."
            />
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-brand-600 dark:bg-brand-900 shadow-2xl px-6 py-16 md:px-16 md:py-20 text-center">
            {/* Decorative Circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to create your biodata?</h2>
              <p className="text-brand-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of users who have successfully created their marriage biodata with us. It's fast, easy, and free.
              </p>
              <button
                onClick={() => navigate('/create')}
                className="bg-white text-brand-600 hover:bg-brand-50 font-bold py-4 px-10 rounded-full shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-brand-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <img src="/logo.svg" alt="VivahPatra Logo" className="relative h-10 w-10 transition-transform duration-300 group-hover:scale-105" />
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-slate-200">Vivah Patra</span>
          </div>
          <p className="text-slate-500 dark:text-slate-500 text-sm mb-8 text-center max-w-md">
            Helping families connect through beautiful introductions. <br />
            Crafted with ❤️ for Indian traditions.
          </p>
          <div className="flex gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
            <a href="/privacy" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Privacy Policy</a>
          </div>
          <div className="mt-12 text-xs text-slate-400 dark:text-slate-600">
            © {new Date().getFullYear()} Vivah Patra. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Helper Components ---

const StepCard = ({ number, icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative flex flex-col items-center text-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all z-10"
  >
    <div className="absolute -top-6 bg-white dark:bg-slate-800 p-1 rounded-full border border-slate-100 dark:border-slate-700 shadow-sm">
      <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-slate-800 flex items-center justify-center font-bold text-brand-600 dark:text-brand-400">
        {number}
      </div>
    </div>
    <div className="mt-6 mb-4 p-3 bg-brand-50 dark:bg-slate-800 rounded-xl">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">{desc}</p>
  </motion.div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all group"
  >
    <div className="bg-slate-50 dark:bg-slate-700/50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
      {desc}
    </p>
  </motion.div>
);

export default HomePage;