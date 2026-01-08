import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const RajwadaRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    // Simple Corner SVG pattern
    const CornerPattern = ({ className }) => (
        <svg viewBox="0 0 100 100" className={cn("w-32 h-32 absolute text-opacity-40", className)} style={{ color: styles.primaryColor }} fill="currentColor">
            <path d="M0 0 L100 0 L100 10 L20 10 L10 20 L10 100 L0 100 Z" />
            <circle cx="20" cy="20" r="5" />
            <path d="M30 0 Q 70 30 0 70" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
    );

    return (
        <div className="relative z-10 h-full p-16 flex flex-col items-center">
            {/* Corners */}
            <CornerPattern className="top-6 left-6" />
            <CornerPattern className="top-6 right-6 rotate-90" />
            <CornerPattern className="bottom-6 left-6 -rotate-90" />
            <CornerPattern className="bottom-6 right-6 rotate-180" />

            {/* Border Frame */}
            <div className="absolute inset-10 border border-double pointer-events-none" style={{ borderColor: `${styles.primaryColor}40` }}></div>

            {/* Header */}
            <div className="text-center z-20 mb-10">
                {header.enabled && (
                    <>
                        <h1 className="text-4xl font-serif font-bold uppercase tracking-widest text-slate-800">{header.text}</h1>
                        {header.icon && <img src={header.icon} className="h-10 w-10 mx-auto mt-2 opacity-80" alt="Icon" />}
                    </>
                )}
            </div>

            {/* Center Layout */}
            <div className="flex gap-12 w-full flex-1 z-20">
                {/* Left Column */}
                <div className="flex-1 space-y-10 text-right">
                    {enabledSections.filter((_, i) => i % 2 === 0).map(s => (
                        <div key={s.id}>
                            <h3 className="text-sm font-bold uppercase mb-2" style={{ color: styles.primaryColor }}>{s.title}</h3>
                            {s.fields.map(f => f.enabled && (
                                <div key={f.id} className="text-sm mb-1">
                                    <span className="text-slate-500 font-medium mr-2">{f.label}</span>
                                    <span className="font-bold text-slate-900">{f.value}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Center Photo Spine */}
                <div className="w-px bg-slate-200 relative flex flex-col items-center">
                    {photo ? (
                        <div className="absolute top-0 w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white overflow-hidden" style={{ outline: `2px solid ${styles.primaryColor}` }}>
                            <img src={photo} className="w-full h-full object-cover" alt="Profile" />
                        </div>
                    ) : <div className="absolute top-0 w-4 h-4 rounded-full" style={{ backgroundColor: styles.primaryColor }} />}
                </div>

                {/* Right Column */}
                <div className="flex-1 space-y-10 text-left">
                    {enabledSections.filter((_, i) => i % 2 !== 0).map(s => (
                        <div key={s.id}>
                            <h3 className="text-sm font-bold uppercase mb-2" style={{ color: styles.primaryColor }}>{s.title}</h3>
                            {s.fields.map(f => f.enabled && (
                                <div key={f.id} className="text-sm mb-1">
                                    <span className="font-bold text-slate-900 mr-2">{f.value}</span>
                                    {/* <span className="text-slate-500 font-medium">{f.label}</span> */}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RajwadaRenderer;