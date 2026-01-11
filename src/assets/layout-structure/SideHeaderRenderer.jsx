import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const SideHeaderRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex" style={{ color: styles.textColor, fontSize: styles.fontSize }}>
            {/* Left Header Panel */}
            <div className="h-full flex flex-col" style={{ width: '35%', padding: '2em', backgroundColor: styles.primaryColor, color: '#fff' }}>
                <div className="text-center" style={{ marginBottom: '2em' }}>
                    {photo && (
                        <div className="inline-block bg-white/20 rounded-full" style={{ padding: '0.25em', marginBottom: '1.5em' }}>
                            <img src={photo} className="rounded-full object-cover" style={{ width: '8em', height: '8em' }} alt="Profile" />
                        </div>
                    )}
                    {header.enabled && (
                        <div>
                            {header.icon && <header.icon className="mx-auto brightness-0 invert opacity-90" style={{ height: '3em', width: '3em', marginBottom: '1em' }} />}
                            <h1 className="font-bold uppercase tracking-widest leading-relaxed" style={{ fontSize: '1.5em', marginBottom: '0.5em' }}>{header.text}</h1>
                            <div className="mx-auto rounded-full" style={{ width: '2.5em', height: '0.2em', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                        </div>
                    )}
                </div>
                {overview?.enabled && overview.text && (
                    <div className="bg-white/10 rounded-lg backdrop-blur-sm" style={{ padding: '1em' }}>
                        <p className="italic text-center leading-relaxed" style={{ fontSize: '0.875em', opacity: 0.9 }}>"{overview.text}"</p>
                    </div>
                )}
                {/* Decoration at bottom */}
                <div className="mt-auto opacity-20">
                    <div className="w-full border-l-2 border-b-2 border-white rounded-bl-3xl" style={{ height: '8em', marginLeft: '1em', marginBottom: '1em' }}></div>
                </div>
            </div>

            {/* Right Content Panel */}
            <div className="flex-1 overflow-hidden" style={{ padding: '2.5em', paddingTop: '3em' }}>
                <div className="flex flex-col" style={{ gap: '2em' }}>
                    {enabledSections.map(s => (
                        <div key={s.id} className="break-inside-avoid">
                            <h3 className="flex items-center" style={{ gap: '0.75em', fontSize: '0.875em', fontWeight: 700, uppercase: true, letterSpacing: '0.1em', color: styles.primaryColor, marginBottom: '0.75em' }}>
                                <span className="uppercase tracking-widest">{s.title}</span>
                                <div className="flex-1 h-px" style={{ backgroundColor: `${styles.primaryColor}10` }}></div>
                            </h3>
                            <div className="flex flex-col" style={{ gap: '0.5em', paddingLeft: '0.25em' }}>
                                {s.fields.map(f => f.enabled && (
                                    <div key={f.id} className="grid grid-cols-12" style={{ gap: '0.5em', fontSize: '0.875em' }}>
                                        <span className="col-span-4 font-semibold uppercase" style={{ fontSize: '0.625em', opacity: 0.5, paddingTop: '0.125em' }}>{f.label}</span>
                                        <span className="col-span-8 font-medium">{f.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SideHeaderRenderer;