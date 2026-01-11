import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const RajwadaRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    // Simple Corner SVG pattern
    const CornerPattern = ({ className, style }) => (
        <svg viewBox="0 0 100 100" className={cn("absolute text-opacity-40", className)} style={{ width: '8em', height: '8em', color: styles.primaryColor, ...style }} fill="currentColor">
            <path d="M0 0 L100 0 L100 10 L20 10 L10 20 L10 100 L0 100 Z" />
            <circle cx="20" cy="20" r="5" />
            <path d="M30 0 Q 70 30 0 70" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
    );

    return (
        <div className="relative z-10 h-full flex flex-col items-center" style={{ padding: '4em', color: styles.textColor, fontSize: styles.fontSize }}>
            {/* Corners */}
            <CornerPattern style={{ top: '1.5em', left: '1.5em' }} />
            <CornerPattern className="rotate-90" style={{ top: '1.5em', right: '1.5em' }} />
            <CornerPattern className="-rotate-90" style={{ bottom: '1.5em', left: '1.5em' }} />
            <CornerPattern className="rotate-180" style={{ bottom: '1.5em', right: '1.5em' }} />

            {/* Border Frame */}
            <div className="absolute border border-double pointer-events-none" style={{ top: '2.5em', right: '2.5em', bottom: '2.5em', left: '2.5em', borderColor: `${styles.primaryColor}40` }}></div>

            {/* Header */}
            <div className="text-center z-20" style={{ marginBottom: '2.5em' }}>
                {header.enabled && (
                    <>
                        {header.icon && <header.icon className="mx-auto" style={{ height: '2.5em', width: '2.5em', marginBottom: '0.5em', color: styles.primaryColor, opacity: 0.8 }} />}
                        <h1 className="font-serif font-bold uppercase tracking-widest" style={{ fontSize: '2em', color: styles.primaryColor }}>{header.text}</h1>
                    </>
                )}
                {overview?.enabled && overview.text && (
                    <p className="italic mx-auto" style={{ marginTop: '0.5em', fontSize: '0.9em', opacity: 0.7, maxWidth: '30em' }}>{overview.text}</p>
                )}
            </div>

            {/* Center Layout */}
            <div className="flex w-full flex-1 z-20" style={{ gap: '3em' }}>
                {/* Left Column */}
                <div className="flex-1 text-right flex flex-col" style={{ gap: '2.5em' }}>
                    {enabledSections.filter((_, i) => i % 2 === 0).map(s => (
                        <div key={s.id}>
                            <h3 className="font-bold uppercase" style={{ fontSize: '0.85em', color: styles.primaryColor, marginBottom: '0.5em' }}>{s.title}</h3>
                            <div className="flex flex-col" style={{ gap: '0.25em' }}>
                                {s.fields.map(f => f.enabled && (
                                    <div key={f.id} style={{ fontSize: '0.85em' }}>
                                        <span className="font-medium mr-[0.5em]" style={{ opacity: 0.6 }}>{f.label}</span>
                                        <span style={{ fontWeight: 700 }}>{f.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Center Photo Spine */}
                <div className="w-px relative flex flex-col items-center" style={{ backgroundColor: `${styles.primaryColor}20` }}>
                    {photo ? (
                        <div className="absolute top-0 rounded-full border-white shadow-lg bg-white overflow-hidden" style={{ width: '8em', height: '8em', borderWidth: '0.25em', outline: `2px solid ${styles.primaryColor}` }}>
                            <img src={photo} className="w-full h-full object-cover" alt="Profile" />
                        </div>
                    ) : <div className="absolute top-0 rounded-full" style={{ width: '1em', height: '1em', backgroundColor: styles.primaryColor }} />}
                </div>

                {/* Right Column */}
                <div className="flex-1 text-left flex flex-col" style={{ gap: '2.5em' }}>
                    {enabledSections.filter((_, i) => i % 2 !== 0).map(s => (
                        <div key={s.id}>
                            <h3 className="font-bold uppercase" style={{ fontSize: '0.85em', color: styles.primaryColor, marginBottom: '0.5em' }}>{s.title}</h3>
                            <div className="flex flex-col" style={{ gap: '0.25em' }}>
                                {s.fields.map(f => f.enabled && (
                                    <div key={f.id} style={{ fontSize: '0.85em' }}>
                                        <span className="font-medium mr-[0.5em]" style={{ opacity: 0.6 }}>{f.label}</span>
                                        <span style={{ fontWeight: 700 }}>{f.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RajwadaRenderer;