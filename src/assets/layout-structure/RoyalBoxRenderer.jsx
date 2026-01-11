import React from 'react';
import { SectionBlock } from './DocumentLayout';

const RoyalBoxRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col" style={{ padding: '2em', color: styles.textColor, fontSize: styles.fontSize }}>
            <div className="flex-1 border-double flex flex-col items-center" style={{ borderColor: styles.primaryColor, borderWidth: '0.25em', padding: '2em' }}>
                {header.enabled && (
                    <div className="text-center" style={{ marginBottom: '1.5em' }}>
                        {header.icon && <header.icon className="mx-auto object-contain" style={{ height: '3.5em', width: '3.5em', marginBottom: '0.5em', color: styles.primaryColor }} />}
                        <h1 className="font-serif font-bold uppercase tracking-widest" style={{ fontSize: '1.5em', color: styles.primaryColor }}>{header.text}</h1>
                        <div className="mx-auto" style={{ width: '6em', height: '0.1em', marginTop: '0.5em', backgroundColor: styles.primaryColor }}></div>
                    </div>
                )}
                {photo && (
                    <div className="border rounded-full" style={{ marginBottom: '1.5em', padding: '0.25em', borderColor: styles.primaryColor }}>
                        <img src={photo} className="rounded-full object-cover" style={{ width: '8em', height: '8em' }} alt="Profile" />
                    </div>
                )}
                {overview?.enabled && overview.text && (
                    <div className="text-center italic" style={{ fontSize: '0.875em', maxWidth: '30em', marginBottom: '2em', opacity: 0.7 }}>"{overview.text}"</div>
                )}
                <div className="w-full grid grid-cols-1" style={{ gap: '2em' }}>
                    {enabledSections.map(s => (
                        <div key={s.id} className="text-center">
                            <h3 className="font-bold uppercase tracking-widest" style={{ fontSize: '0.85em', color: styles.primaryColor, marginBottom: '0.75em' }}>~ {s.title} ~</h3>
                            <div className="flex flex-col" style={{ gap: '0.25em' }}>
                                {s.fields.map(f => f.enabled && (
                                    <div key={f.id} style={{ fontSize: '0.85em' }}>
                                        <span className="uppercase mr-2" style={{ fontSize: '0.75em', fontWeight: 700, opacity: 0.5 }}>{f.label}:</span>
                                        <span style={{ fontWeight: 500 }}>{f.value}</span>
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

export default RoyalBoxRenderer;
