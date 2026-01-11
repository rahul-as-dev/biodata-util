import React from 'react';
import { SectionBlock } from './DocumentLayout';

const BoldBandRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col" style={{ color: styles.textColor, fontSize: styles.fontSize }}>
            <div className="w-full flex items-center justify-between shadow-sm" style={{ backgroundColor: styles.primaryColor, padding: '2em 2.5em', marginBottom: '2em' }}>
                <div style={{ color: '#fff' }} className="flex flex-col items-center justify-center">
                    {header.icon && <header.icon className="mx-auto object-contain" style={{ height: '6.5em', width: '6.5em', marginTop: '-1.5em', marginBottom: '-0.6em' }} />}
                    {header.enabled && <h1 className="font-bold uppercase tracking-wide" style={{ fontSize: '2.25em' }}>{header.text}</h1>}
                    {overview?.enabled && overview.text && <p className="mt-[0.5em] max-w-[30em]" style={{ fontSize: '0.875em', opacity: 0.8 }}>{overview.text}</p>}
                </div>
                {photo && (
                    <div className="bg-white shadow-lg relative z-20" style={{ width: '8em', height: '8em', padding: '0.25em', borderRadius: '50%', marginBottom: '-5em' }}>
                        <img src={photo} className="w-full h-full rounded-full object-cover" alt="Profile" />
                    </div>
                )}
            </div>
            <div className="flex-1 columns-2" style={{ padding: '4em 2.5em 2.5em 2.5em', gap: '2.5em' }}>
                {enabledSections.map(s => (
                    <div key={s.id} className="break-inside-avoid" style={{ marginBottom: '2em' }}>
                        <div className="flex items-center gap-[0.5em] border-b" style={{ borderColor: `${styles.primaryColor}30`, paddingBottom: '0.5em', marginBottom: '0.75em' }}>
                            <span style={{ color: styles.primaryColor }}>•</span>
                            <h3 className="font-bold uppercase" style={{ color: styles.primaryColor, fontSize: '0.875em' }}>{s.title}</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
                            {s.fields.map(f => f.enabled && (
                                <div key={f.id} className="flex justify-between items-baseline" style={{ fontSize: '0.875em' }}>
                                    <span style={{ opacity: 0.6, fontWeight: 500 }}>{f.label}</span>
                                    <span className="text-right max-w-[60%]" style={{ fontWeight: 600 }}>{f.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BoldBandRenderer;
