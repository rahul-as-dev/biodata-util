import React from 'react';
import { SectionBlock } from './DocumentLayout';

const ClassicFrameRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col" style={{ padding: '1.5em', color: styles.textColor, fontSize: styles.fontSize }}>
            <div className="flex-1 border" style={{ borderColor: styles.primaryColor, borderWidth: '0.25em', padding: '0.25em' }}>
                <div className="h-full w-full border border-dashed flex flex-col items-center" style={{ borderColor: styles.primaryColor, padding: '2em' }}>
                    {header.icon && <header.icon className="mx-auto object-contain" style={{ height: '5em', width: '5em', marginTop: '-1.5em', marginBottom: '-0.3em', color: styles.primaryColor }} />}
                    {header.enabled && <h1 className="font-bold uppercase tracking-widest text-center" style={{ fontSize: '2em', color: styles.primaryColor, marginBottom: '1em' }}>{header.text}</h1>}
                    <div className="flex w-full flex-1" style={{ gap: '2.5em' }}>
                        <div className="flex flex-col items-center text-center" style={{ width: '33.333%' }}>
                            {photo && (
                                <div className="border rounded-full" style={{ borderColor: styles.primaryColor, padding: '0.25em', marginBottom: '1.5em' }}>
                                    <img src={photo} className="rounded-full object-cover" style={{ width: '10em', height: '10em' }} alt="Profile" />
                                </div>
                            )}
                            {overview?.enabled && overview.text && (
                                <div className="rounded-lg border" style={{ backgroundColor: `${styles.primaryColor}05`, borderColor: `${styles.primaryColor}10`, padding: '1em' }}>
                                    <p className="italic font-serif leading-relaxed" style={{ fontSize: '0.875em', opacity: 0.7 }}>"{overview.text}"</p>
                                </div>
                            )}
                        </div>
                        <div className="flex-1" style={{ display: 'flex', flexDirection: 'column', gap: '2em' }}>
                            {enabledSections.map(s => (
                                <div key={s.id}>
                                    <h3 className="text-center font-bold uppercase tracking-[0.2em] border-b" style={{ fontSize: '0.85em', color: styles.primaryColor, borderColor: `${styles.primaryColor}30`, marginBottom: '1em', paddingBottom: '0.5em' }}>{s.title}</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
                                        {s.fields.map(f => f.enabled && (
                                            <div key={f.id} className="grid grid-cols-12" style={{ gap: '0.5em', fontSize: '0.85em' }}>
                                                <span className="col-span-4 font-serif italic text-right" style={{ paddingRight: '0.5em', opacity: 0.6 }}>{f.label}</span>
                                                <span className="col-span-8 font-medium">{f.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassicFrameRenderer;
