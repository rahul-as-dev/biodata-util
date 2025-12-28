import React from 'react';
import { motion } from 'framer-motion';

export const GoldenMandala = React.memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#fdfbf7]">
      
      {/* 1. Cream/Gold Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-[#fff8e1] to-amber-100" />

      {/* 2. Rotating Mandala (SVG) - Top Right Corner */}
      <motion.div
        className="absolute -top-40 -right-40 text-amber-900/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <svg width="600" height="600" viewBox="0 0 100 100" fill="currentColor">
           {/* Simple Geometric Mandala Path */}
           <path d="M50 0 L55 35 L90 35 L60 55 L75 90 L50 70 L25 90 L40 55 L10 35 L45 35 Z" />
           <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" fill="none" />
           <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" fill="none" />
           <path d="M50 10 Q 60 10 65 20 T 80 50 T 65 80 T 50 90 T 35 80 T 20 50 T 35 20 T 50 10" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </svg>
      </motion.div>

      {/* 3. Rotating Mandala (SVG) - Bottom Left Corner (Smaller, Counter-Rotate) */}
      <motion.div
        className="absolute -bottom-20 -left-20 text-rose-900/5"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
         <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor">
           <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" strokeDasharray="10 5" fill="none" />
           <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" stroke="currentColor" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* 4. Gold Dust Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ 
            backgroundImage: `radial-gradient(#d97706 0.5px, transparent 0.5px)`, 
            backgroundSize: '20px 20px' 
        }} 
      />
      
      {/* 5. Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(120,53,15,0.05)_100%)]" />
    </div>
  );
});