import React from 'react';
import { motion } from 'framer-motion';

export const EnchantedFireflies = React.memo(() => {
  // Generate random fireflies
  const fireflies = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    moveX: Math.random() * 100 - 50,
    moveY: Math.random() * 100 - 50,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-slate-950">
      
      {/* 1. Midnight Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#311b92] to-[#4a044e] opacity-80" />

      {/* 2. Floating Fireflies */}
      {fireflies.map((fly) => (
        <motion.div
          key={fly.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0.5, 1, 0], // Twinkle effect
            scale: [0, 1, 1.5, 0],
            x: [0, fly.moveX],
            y: [0, fly.moveY],
          }}
          transition={{
            duration: Math.random() * 10 + 10, // Slow movement (10-20s)
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1]
          }}
          style={{ top: fly.top, left: fly.left }}
          className="absolute w-2 h-2 bg-yellow-100 rounded-full blur-[2px] shadow-[0_0_15px_rgba(253,224,71,0.6)]"
        />
      ))}

      {/* 3. Ambient Glows */}
      <motion.div 
         animate={{ rotate: 360 }}
         transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
         className="absolute -top-[20%] -right-[20%] w-[80%] h-[80%] opacity-20 bg-gradient-to-b from-purple-500 to-transparent rounded-full blur-3xl"
      />
      
       {/* 4. Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
});