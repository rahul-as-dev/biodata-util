import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const VedicPillarsRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex" style={{ color: styles.textColor, fontSize: styles.fontSize }}>
            {/* Left Pillar */}
            <div className="h-full flex flex-col items-center" style={{ width: '3em', padding: '1em 0', backgroundColor: `${styles.primaryColor}08`, borderRight: `1px solid ${styles.primaryColor}20` }}>
                <div className="h-full border-x border-double" style={{ width: '0.5em', borderColor: styles.primaryColor }}></div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center" style={{ padding: '3em 2.5em' }}>
                {header.enabled && (
                    <div className="text-center" style={{ marginBottom: '2em' }}>
                        {header.icon && <header.icon className="mx-auto" style={{ height: '4em', width: '4em', marginBottom: '0.5em', color: styles.primaryColor }} />}
                        <h1 className="font-bold uppercase tracking-[0.3em]" style={{ fontSize: '1.875em', color: styles.primaryColor }}>{header.text}</h1>
                        <div className="flex items-center justify-center opacity-60" style={{ gap: '0.5em', marginTop: '0.5em' }}>
                            <span className="h-px w-8" style={{ width: '2em', backgroundColor: `${styles.primaryColor}40` }}></span>
                            <span style={{ fontSize: '0.75em' }}>♦</span>
                            <span className="h-px w-8" style={{ width: '2em', backgroundColor: `${styles.primaryColor}40` }}></span>
                        </div>
                    </div>
                )}

                {photo && (
                    <div className="border-2 border-dashed rounded-full" style={{ padding: '0.5em', marginBottom: '2.5em', borderColor: styles.primaryColor }}>
                        <img src={photo} className="rounded-full object-cover" style={{ width: '9em', height: '9em' }} alt="Profile" />
                    </div>
                )}

                {overview?.enabled && overview.text && (
                    <div className="text-center italic" style={{ fontSize: '0.9em', opacity: 0.7, maxWidth: '30em', marginBottom: '3em' }}>"{overview.text}"</div>
                )}

                <div className="w-full grid grid-cols-2 text-center" style={{ gap: '3em' }}>
                    {enabledSections.map(s => (
                        <div key={s.id} className="break-inside-avoid">
                            <h3 className="font-bold uppercase tracking-widest" style={{ fontSize: '0.85em', color: styles.primaryColor, marginBottom: '1em', padding: '0.25em 0', backgroundColor: `${styles.primaryColor}05` }}>{s.title}</h3>
                            <div className="flex flex-col" style={{ gap: '0.75em' }}>
                                {s.fields.map(f => f.enabled && (
                                    <div key={f.id} className="flex flex-col items-center">
                                        <span style={{ fontSize: '0.625em', fontWeight: 700, textTransform: 'uppercase', opacity: 0.5 }}>{f.label}</span>
                                        <span style={{ fontSize: '0.875em', fontWeight: 500 }}>{f.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Pillar */}
            <div className="h-full flex flex-col items-center" style={{ width: '3em', padding: '1em 0', backgroundColor: `${styles.primaryColor}08`, borderLeft: `1px solid ${styles.primaryColor}20` }}>
                <div className="h-full border-x border-double" style={{ width: '0.5em', borderColor: styles.primaryColor }}></div>
            </div>
        </div>
    );
}

export default VedicPillarsRenderer;