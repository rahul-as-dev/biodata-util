import React from 'react';
import { SectionBlock } from './DocumentLayout';

const StackedCardRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col items-center" style={{ padding: '2em', color: styles.textColor, fontSize: styles.fontSize }}>
            <div className="w-full shadow-sm flex items-center justify-center relative overflow-hidden" style={{ height: '12em', borderRadius: '2em 2em 0 0', backgroundColor: styles.primaryColor }}>
                <div className="absolute rounded-full" style={{ left: '-2.5em', top: '-2.5em', width: '10em', height: '10em', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                <div className="absolute rounded-full" style={{ right: '5em', bottom: '2.5em', width: '5em', height: '5em', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                <div className="text-center z-10" style={{ color: '#fff' }}>{header.enabled && <h1 className="font-bold uppercase tracking-widest" style={{ fontSize: '1.5em' }}>{header.text}</h1>}</div>
            </div>
            <div className="w-[90%] flex-1 bg-white/95 rounded-t-lg shadow-2xl relative z-20 flex flex-col backdrop-blur-sm" style={{ marginTop: '-3em', padding: '2.5em' }}>
                {photo && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <img src={photo} className="rounded-full object-cover shadow-md" style={{ width: '9em', height: '9em', borderWidth: '0.5em', borderStyle: 'solid', borderColor: '#fff' }} alt="Profile" />
                    </div>
                )}
                <div className="text-center" style={{ marginTop: '4em', marginBottom: '2.5em' }}>
                    {overview?.enabled && overview.text && <p className="italic mx-auto" style={{ fontSize: '0.9em', opacity: 0.6, maxWidth: '30em' }}>{overview.text}</p>}
                </div>
                <div className="flex flex-col" style={{ gap: '3em' }}>
                    {enabledSections.map(s => (
                        <div key={s.id} className="break-inside-avoid">
                            <div className="flex items-center" style={{ gap: '1em', marginBottom: '1.5em' }}>
                                <div className="flex-1 h-px" style={{ backgroundColor: `${styles.primaryColor}10` }}></div>
                                <h3 className="font-bold uppercase tracking-widest border rounded-full px-4" style={{ fontSize: '0.75em', padding: '0.25em 1em', borderColor: styles.primaryColor, color: styles.primaryColor }}>{s.title}</h3>
                                <div className="flex-1 h-px" style={{ backgroundColor: `${styles.primaryColor}10` }}></div>
                            </div>
                            <div className="grid grid-cols-2" style={{ columnGap: '3em', rowGap: '1em', padding: '0 2em' }}>
                                {s.fields.map(f => f.enabled && (
                                    <div key={f.id} className="flex justify-between items-baseline border-b" style={{ fontSize: '0.85em', paddingBottom: '0.25em', borderColor: `${styles.primaryColor}05` }}>
                                        <span style={{ fontSize: '0.75em', fontWeight: 700, textTransform: 'uppercase', opacity: 0.5 }}>{f.label}</span>
                                        <span className="text-right" style={{ fontWeight: 500 }}>{f.value}</span>
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

export default StackedCardRenderer;
