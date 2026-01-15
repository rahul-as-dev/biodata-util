import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronLeft, ArrowRight } from 'lucide-react';
// import * as Renderers from '../assets/layout-structure';

import { LAYOUT_TEMPLATES } from '../utils/templateRegistry';

const TemplatesPage = () => {
    const navigate = useNavigate();
    const { isDark } = useTheme();

    const handleSelectTemplate = (templateId) => {
        navigate(`/create?layout=${templateId}`);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-slate-500 hover:text-brand-500 transition-colors mb-6"
                    >
                        <ChevronLeft size={20} /> Back to Home
                    </button>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Choose Your Perfect Layout</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                        Select a template to get started. You can always change this later while editing your biodata.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {LAYOUT_TEMPLATES.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 cursor-pointer"
                            onClick={() => handleSelectTemplate(t.id)}
                        >
                            {/* Visual Placeholder using the registry's Preview component */}
                            <div className={`h-64 bg-slate-100 dark:bg-slate-700/50 relative flex items-center justify-center group-hover:bg-brand-50/50 transition-colors duration-500`}>
                                <div className="w-[140px] h-[200px] bg-white dark:bg-slate-900 shadow-md rounded border border-slate-200 dark:border-slate-600 p-2 transform group-hover:scale-105 transition-transform">
                                    {t.Preview && <t.Preview isActive={false} />}
                                </div>

                                {/* Overlay on hover (Desktop) / Always Visible indicator (Mobile) */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colors flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10 transition-opacity duration-300">
                                    <span className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2 rounded-full font-medium shadow-lg transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform">
                                        Use Template
                                    </span>
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-between group-hover:text-brand-500 transition-colors">
                                    {t.name}
                                    <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-brand-500" />
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplatesPage;
