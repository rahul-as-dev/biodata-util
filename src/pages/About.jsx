import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Zap, Coffee, Star } from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-20 pb-12 font-sans selection:bg-rose-100 selection:text-rose-900">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-6 text-center mb-16"
      >
        <div className="inline-block p-2 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 mb-4">
           <Heart size={24} className="fill-rose-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
          We Help You Write Your <span className="text-rose-600">Perfect Story</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          VivahPatra is designed to make creating Indian marriage biodatas simple, elegant, and culturally attuned. 
          We believe the first impression should be beautiful.
        </p>
      </motion.div>

      {/* Stats / Features Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
      >
        {[
          { icon: <Zap size={32} />, title: "Instant Generation", desc: "Create professional PDFs in minutes with our drag-and-drop builder." },
          { icon: <Shield size={32} />, title: "Privacy First", desc: "Your data stays in your browser. We don't store your personal photos." },
          { icon: <Star size={32} />, title: "Premium Designs", desc: "Hand-crafted templates that reflect Indian tradition and modern aesthetics." }
        ].map((feature, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-rose-100 dark:hover:shadow-none transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-amber-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-amber-600 group-hover:bg-rose-600 group-hover:text-white transition-colors mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-white">{feature.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Mission Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-6 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl dark:shadow-none border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row"
      >
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
           <h2 className="text-3xl font-serif font-bold mb-6 dark:text-white">Our Mission</h2>
           <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
             In the arranged marriage tradition, a biodata is more than just a resume; it's a representation of family values, personal achievements, and hopes for the future.
           </p>
           <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
             We built VivahPatra to replace clunky Word documents with a tool that respects the sanctity of the occasion while leveraging modern technology.
           </p>
        </div>
        <div className="md:w-1/2 bg-gradient-to-br from-rose-100 to-amber-100 dark:from-slate-800 dark:to-slate-800 flex items-center justify-center relative p-12">
            {/* Abstract Decorative SVG */}
            <svg viewBox="0 0 200 200" className="w-64 h-64 text-rose-600 opacity-20 animate-spin-slow">
               <path fill="currentColor" d="M45.7,29.9C15.1,56.3,-26.8,47.4,-49.2,19.3C-71.6,-8.8,-74.6,-56.1,-52.1,-75.4C-29.6,-94.7,18.4,-86,47.2,-61.8C76,-37.6,85.6,2,71.7,31.7C57.9,61.4,20.6,81.2,-7,84.1C-34.6,87,-52.5,73,45.7,29.9Z" transform="translate(100 100)" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
               <Coffee size={48} className="text-rose-900 dark:text-rose-400" />
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;