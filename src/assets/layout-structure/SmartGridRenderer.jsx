import React from 'react';
import { SectionBlock } from './DocumentLayout';

const SmartGridRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col" style={{ padding: '2.5em', paddingTop: '3em', color: styles.textColor, fontSize: styles.fontSize }}>
            <div className="flex items-start justify-between border-b-2" style={{ marginBottom: '2.5em', paddingBottom: '1.5em', borderColor: styles.primaryColor }}>
                <div className="flex-1">
                    {header.enabled && <h1 className="font-bold uppercase tracking-tighter" style={{ fontSize: '2.25em', color: styles.primaryColor }}>{header.text}</h1>}
                    {overview?.enabled && overview.text && <p className="leading-relaxed" style={{ marginTop: '1em', fontSize: '0.875em', maxWidth: '30em', opacity: 0.7 }}>{overview.text}</p>}
                </div>
                {photo && <img src={photo} className="object-cover rounded-lg shadow-sm" style={{ width: '8em', height: '8em', boxShadow: `0.25em 0.25em 0px ${styles.primaryColor}40` }} alt="Profile" />}
            </div>
            <div className="columns-2" style={{ gap: '2em' }}>
                {enabledSections.map(s => (
                    <div key={s.id} className="break-inside-avoid bg-white/50 border" style={{ padding: '1.25em', borderRadius: '0.75em', borderColor: `${styles.primaryColor}10`, borderLeft: `0.25em solid ${styles.primaryColor}`, marginBottom: '1.5em' }}>
                        <h3 className="font-bold uppercase tracking-wide" style={{ fontSize: '0.875em', marginBottom: '1em', opacity: 0.8 }}>{s.title}</h3>
                        <div className="flex flex-col" style={{ gap: '0.75em' }}>
                            {s.fields.map(f => f.enabled && (
                                <div key={f.id} className="flex flex-col">
                                    <span style={{ fontSize: '0.625em', fontWeight: 700, textTransform: 'uppercase', opacity: 0.5 }}>{f.label}</span>
                                    <span style={{ fontSize: '0.875em', fontWeight: 500 }}>{f.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SmartGridRenderer;
