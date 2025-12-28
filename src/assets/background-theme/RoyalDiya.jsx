import React from 'react';
import { motion } from 'framer-motion';

export const RoyalDiya = React.memo(() => {
  // Generate random embers
  const embers = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 5 + 5, // Random speed between 5-10s
    delay: Math.random() * 5,
    size: Math.random() * 4 + 2, // Size 2px - 6px
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#2a0a0a]">
      {/* 1. Deep Red Base */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 via-rose-950/80 to-[#1a0505]" />

      {/* 2. The "Flame" Pulse (Bottom Center) */}
      <motion.div
        animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-500/20 rounded-full blur-[100px]"
      />

      {/* 3. Rising Golden Embers */}
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          initial={{ y: "110vh", x: 0, opacity: 0 }}
          animate={{ 
            y: "-10vh", 
            x: [0, Math.random() * 50 - 25, 0], // Slight wobble
            opacity: [0, 1, 0] 
          }}
          transition={{
            duration: ember.duration,
            repeat: Infinity,
            delay: ember.delay,
            ease: "linear",
          }}
          style={{
            left: ember.left,
            width: ember.size,
            height: ember.size,
          }}
          className="absolute bg-amber-300 rounded-full blur-[1px] shadow-[0_0_10px_#fbbf24]"
        />
      ))}

      {/* 4. Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
});