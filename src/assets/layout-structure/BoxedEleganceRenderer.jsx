import { SectionBlock } from './DocumentLayout';
import React from 'react';

const BoxedEleganceRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col" style={{ padding: '2.5em', color: styles.textColor, fontSize: styles.fontSize }}>
            <div className="flex-1 border p-[2em] relative flex flex-col" style={{ borderColor: `${styles.primaryColor}30` }}>
                {/* Title Box intersecting top border */}
                {header.enabled && (
                    <div className="absolute left-1/2 -translate-x-1/2 bg-white" style={{ top: '-1.2em', padding: '0.5em 2em' }}>
                        {header.icon && <header.icon className="mx-auto object-contain" style={{ height: '5em', width: '5em', marginTop: '-2em', marginBottom: '-0.5em', color: styles.primaryColor }} />}
                        <h1 className="font-serif font-bold uppercase tracking-widest text-center whitespace-nowrap" style={{ fontSize: '1.8em', color: styles.primaryColor }}>
                            {header.text}
                        </h1>
                    </div>
                )}

                <div className="flex items-center border-b" style={{ marginTop: '2em', gap: '2em', marginBottom: '2.5em', paddingBottom: '2em', borderColor: `${styles.primaryColor}10` }}>
                    {photo && <img src={photo} className="object-cover shadow-md" style={{ width: '8em', height: '8em', borderRadius: '50%' }} alt="Profile" />}
                    <div className="flex-1 text-center">
                        {overview?.enabled && overview.text && <p className="italic font-serif" style={{ color: styles.textColor, opacity: 0.8 }}>{overview.text}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-2 flex-1 content-start" style={{ gap: '2.5em' }}>
                    {enabledSections.map(s => (
                        <div key={s.id} className="break-inside-avoid">
                            <h3 className="text-center font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.75em', color: styles.primaryColor, marginBottom: '1em', backgroundColor: `${styles.primaryColor}05`, padding: '0.25em 0' }}>{s.title}</h3>
                            <div className="flex flex-col gap-[0.5em]" style={{ padding: '0 0.5em' }}>
                                {s.fields.map(f => f.enabled && (
                                    <div key={f.id} className="flex justify-between items-baseline" style={{ fontSize: '0.85em' }}>
                                        <span style={{ color: styles.textColor, opacity: 0.5, fontWeight: 500, fontSize: '0.75em', textTransform: 'uppercase' }}>{f.label}</span>
                                        <span className="text-right" style={{ fontWeight: 600 }}>{f.value}</span>
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

export default BoxedEleganceRenderer;