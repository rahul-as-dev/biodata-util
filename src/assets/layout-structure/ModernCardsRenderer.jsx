import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const ModernCardsRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col" style={{ padding: '2em', backgroundColor: `${styles.primaryColor}05`, color: styles.textColor, fontSize: styles.fontSize }}>
            {/* Floating Header */}
            <div className="bg-white shadow-sm border border-slate-100 flex items-center" style={{ padding: '1.5em', borderRadius: '1em', marginBottom: '2em', gap: '1.5em' }}>
                {photo && <img src={photo} className="object-cover shadow-sm" style={{ width: '6em', height: '6em', borderRadius: '0.75em' }} alt="Profile" />}
                <div className="flex-1">
                    {header.enabled && <h1 className="font-bold uppercase tracking-tight" style={{ fontSize: '1.875em', color: styles.primaryColor }}>{header.text}</h1>}
                    {overview?.enabled && overview.text && <p className="mt-[0.5em]" style={{ fontSize: '0.875em', opacity: 0.6 }}>{overview.text}</p>}
                </div>
                {header.icon && <header.icon className="opacity-10" style={{ height: '4em', width: '4em', color: styles.primaryColor }} />}
            </div>

            {/* Grid of Cards */}
            <div className="grid grid-cols-2 flex-1 content-start" style={{ gap: '1.5em' }}>
                {enabledSections.map(s => (
                    <div key={s.id} className="bg-white shadow-sm border border-slate-100 break-inside-avoid" style={{ padding: '1.25em', borderRadius: '0.75em' }}>
                        <div className="flex items-center" style={{ gap: '0.5em', marginBottom: '1em' }}>
                            <div className="rounded-full" style={{ width: '0.25em', height: '1em', backgroundColor: styles.primaryColor }}></div>
                            <h3 className="font-bold uppercase tracking-wider" style={{ fontSize: '0.875em', color: styles.textColor, opacity: 0.8 }}>{s.title}</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75em' }}>
                            {s.fields.map(f => f.enabled && (
                                <div key={f.id} className="flex flex-col border-b last:border-0" style={{ paddingBottom: '0.5em', borderColor: `${styles.primaryColor}05` }}>
                                    <span style={{ fontSize: '0.625em', fontWeight: 700, textTransform: 'uppercase', opacity: 0.5, marginBottom: '0.125em' }}>{f.label}</span>
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

export default ModernCardsRenderer;