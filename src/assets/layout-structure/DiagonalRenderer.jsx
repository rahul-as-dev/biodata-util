import React from 'react';
import { SectionBlock } from './DocumentLayout';

const DiagonalRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col" style={{ color: styles.textColor, fontSize: styles.fontSize }}>
            <div className="absolute top-0 left-0 w-full z-0" style={{ height: '22em', backgroundColor: styles.primaryColor, clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0% 100%)' }} />
            <div className="relative z-10" style={{ padding: '3em' }}>
                <div className="flex items-center" style={{ gap: '2em', marginBottom: '3em' }}>
                    {photo && (
                        <div className="bg-white rounded-full shadow-xl" style={{ padding: '0.25em' }}>
                            <img src={photo} className="rounded-full object-cover" style={{ width: '10em', height: '10em' }} alt="Profile" />
                        </div>
                    )}
                    <div className="flex-1" style={{ color: '#fff' }}>
                        {header.icon && <header.icon className="mx-auto object-contain" style={{ height: '5em', width: '5em', marginTop: '-1.5em', marginBottom: '-0.3em', color: '#fff' }} />}
                        {header.enabled && <h1 className="font-bold uppercase tracking-widest drop-shadow-md" style={{ fontSize: '2.25em' }}>{header.text}</h1>}
                        {overview?.enabled && overview.text && <p className="font-medium italic border-l-4 border-white/30" style={{ marginTop: '0.5em', paddingLeft: '0.75em', fontSize: '0.9em', opacity: 0.9 }}>{overview.text}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-2" style={{ columnGap: '3em', rowGap: '2em' }}>
                    {enabledSections.map(s => (
                        <div key={s.id} className="break-inside-avoid bg-white/90 rounded-lg shadow-sm border border-slate-100" style={{ padding: '1.5em' }}>
                            <div className="flex items-center border-b" style={{ gap: '0.5em', marginBottom: '1em', paddingBottom: '0.5em', borderColor: `${styles.primaryColor}20` }}>
                                <div className="rounded text-white flex items-center justify-center font-bold" style={{ backgroundColor: styles.primaryColor, padding: '0.35em', fontSize: '0.625em', minWidth: '2.5em' }}>{s.title.substring(0, 2).toUpperCase()}</div>
                                <h3 className="font-bold uppercase tracking-wide" style={{ color: styles.primaryColor, fontSize: '0.85em' }}>{s.title}</h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
                                {s.fields.map(f => f.enabled && (
                                    <div key={f.id} className="flex justify-between" style={{ fontSize: '0.85em' }}>
                                        <span style={{ opacity: 0.6, fontWeight: 500 }}>{f.label}</span>
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

export default DiagonalRenderer;
