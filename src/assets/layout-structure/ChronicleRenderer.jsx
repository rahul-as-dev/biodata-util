import React from 'react';
import { SectionBlock } from './DocumentLayout';

const ChronicleRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col" style={{ padding: '2.5em 2.5em 2.5em 3em', color: styles.textColor, fontSize: styles.fontSize }}>
            <div className="text-center" style={{ marginBottom: '2.5em' }}>
                {photo && <img src={photo} className="rounded-full object-cover mx-auto shadow-lg" style={{ width: '7em', height: '7em', marginBottom: '1em', border: '0.3em solid #fff' }} alt="Profile" />}
                {header.icon && <header.icon className="mx-auto object-contain" style={{ height: '5em', width: '5em', marginTop: '-1.5em', marginBottom: '-0.3em', color: styles.primaryColor }} />}
                {header.enabled && <h1 className="font-serif font-bold" style={{ fontSize: '2em', color: styles.primaryColor }}>{header.text}</h1>}
                {overview?.enabled && overview.text && <p className="mt-[0.5em]" style={{ fontSize: '0.875em', opacity: 0.6 }}>{overview.text}</p>}
            </div>
            <div className="flex-1 relative" style={{ marginLeft: '1em' }}>
                <div className="absolute top-0 bottom-0" style={{ left: '0.35em', width: '0.125em', backgroundColor: `${styles.primaryColor}20` }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2em' }}>
                    {enabledSections.map(s => (
                        <div key={s.id} className="relative" style={{ paddingLeft: '2em' }}>
                            <div className="absolute rounded-full border-2 border-white shadow-sm z-10" style={{ left: 0, top: '0.35em', width: '0.8em', height: '0.8em', backgroundColor: styles.primaryColor }}></div>
                            <h3 className="font-bold uppercase tracking-wider" style={{ fontSize: '1.1em', color: styles.primaryColor, marginBottom: '0.75em' }}>{s.title}</h3>
                            <div className="grid grid-cols-1" style={{ rowGap: '0.5em' }}>
                                {s.fields.map(f => f.enabled && (
                                    <div key={f.id} className="flex" style={{ gap: '1em' }}>
                                        <span className="font-semibold text-right shrink-0" style={{ width: '8em', fontSize: '0.75em', opacity: 0.6, textTransform: 'uppercase' }}>{f.label}</span>
                                        <span className="flex-1 font-medium" style={{ fontSize: '0.875em' }}>{f.value}</span>
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

export default ChronicleRenderer;
