import React from 'react';
import { motion } from 'framer-motion';

export const DottedEditorTheme = React.memo(() => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute inset-0 opacity-[0.8] dark:opacity-[0.3]" style={{ backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
        <motion.div animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.9, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-200/60 dark:bg-rose-900/20 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen" />
        <motion.div animate={{ x: [0, -30, 20, 0], y: [0, 40, -20, 0], scale: [1, 1.2, 0.8, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-200/60 dark:bg-amber-900/20 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen" />
        <motion.div animate={{ x: [0, 40, -40, 0], y: [0, -30, 30, 0], scale: [1, 1.1, 0.9, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }} className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen" />
    </div>
));