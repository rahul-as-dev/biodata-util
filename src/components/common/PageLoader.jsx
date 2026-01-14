import React from 'react';
import { motion } from 'framer-motion';
import Heart from 'lucide-react/dist/esm/icons/heart';

const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="relative flex items-center justify-center mb-8">
                {/* Pulsing Rings */}
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-full bg-rose-200/50 dark:bg-rose-900/30 blur-xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 0, 0.8],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                    }}
                    className="absolute w-24 h-24 rounded-full bg-rose-300/30 dark:bg-rose-800/20 blur-lg"
                />

                {/* Central Icon */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 bg-white dark:bg-slate-800 p-6 rounded-full shadow-lg shadow-rose-200/50 dark:shadow-rose-900/20 border border-slate-100 dark:border-slate-700"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Heart
                            size={48}
                            className="text-rose-500 fill-rose-500"
                            strokeWidth={1.5}
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* Loading Text */}
            <div className="flex flex-col items-center gap-2">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100"
                >
                    Vivah<span className="text-rose-600">Patra</span>
                </motion.h2>

                <motion.div
                    className="flex items-center gap-1 h-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                        Loading
                    </span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
                        className="text-rose-500 font-bold"
                    >.</motion.span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2, times: [0, 0.5, 1] }}
                        className="text-rose-500 font-bold"
                    >.</motion.span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4, times: [0, 0.5, 1] }}
                        className="text-rose-500 font-bold"
                    >.</motion.span>
                </motion.div>
            </div>
        </div>
    );
};

export default PageLoader;
