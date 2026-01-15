import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, FileText, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-slate-500 hover:text-brand-500 transition-colors mb-8"
                >
                    <ChevronLeft size={20} /> Back to Home
                </button>

                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">Privacy Policy & Terms</h1>

                <div className="space-y-8">
                    <Section
                        icon={<Lock className="w-6 h-6 text-emerald-500" />}
                        title="1. Data Privacy (Zero-Storage Policy)"
                    >
                        <p>
                            At VivahPatra, we take your privacy seriously. We operate on a <strong>client-side only</strong> model.
                            This means:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>All biodata details you enter remain in your browser's local storage or memory.</li>
                            <li>We <strong>do not</strong> upload, store, or process your personal data (names, phone numbers, photos, etc.) on any external server.</li>
                            <li>When you close your browser or clear your cache, the specific session data might vary based on local storage persistence, but it is never in our possession.</li>
                        </ul>
                    </Section>

                    <Section
                        icon={<ShieldCheck className="w-6 h-6 text-blue-500" />}
                        title="2. Secure PDF Generation"
                    >
                        <p>
                            The PDF generation happens locally relative to your device. We use standard web technologies to render the HTML structure into a downloadable PDF file directly in your browser.
                        </p>
                    </Section>

                    <Section
                        icon={<FileText className="w-6 h-6 text-purple-500" />}
                        title="3. Usage Terms"
                    >
                        <p>
                            By using VivahPatra, you agree to:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Use the generated biodata for lawful personal or family purposes.</li>
                            <li>Not hold VivahPatra liable for any inaccuracies in the data you provide.</li>
                            <li>Understand that templates are intellectual property of VivahPatra and provided for your personal use.</li>
                        </ul>
                    </Section>

                    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 mt-8">
                        <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                            Last Updated: January 2026. If you have any questions, you can reach out through our community channels.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Section = ({ icon, title, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-slate-900 md:p-8 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
    >
        <div className="flex items-center gap-3 mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                {icon}
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h2>
        </div>
        <div className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
            {children}
        </div>
    </motion.div>
);

export default PrivacyPolicy;
