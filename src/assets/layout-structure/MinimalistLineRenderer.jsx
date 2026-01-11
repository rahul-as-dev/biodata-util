import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const MinimalistLineRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col" style={{ padding: '3em', color: styles.textColor, fontSize: styles.fontSize }}>
            <div className="text-center" style={{ marginBottom: '3em' }}>
                {photo && <img src={photo} className="rounded-full object-cover mx-auto grayscale hover:grayscale-0 transition-all shadow-sm" style={{ width: '8em', height: '8em', marginBottom: '1.5em' }} alt="Profile" />}
                {header.enabled && <h1 className="font-light tracking-[0.2em] uppercase" style={{ fontSize: '2.5em', marginBottom: '0.5em', color: styles.textColor }}>{header.text}</h1>}
                <div className="mx-auto" style={{ width: '5em', height: '0.2em', backgroundColor: styles.primaryColor }}></div>
                {overview?.enabled && overview.text && <p className="mx-auto leading-relaxed" style={{ marginTop: '1.5em', fontSize: '0.875em', maxWidth: '30em', opacity: 0.7 }}>{overview.text}</p>}
            </div>

            <div className="flex-1 flex flex-col" style={{ gap: '2.5em' }}>
                {enabledSections.map(s => (
                    <div key={s.id} className="break-inside-avoid">
                        <div className="flex items-end border-b" style={{ gap: '1em', marginBottom: '1em', paddingBottom: '0.5em', borderColor: `${styles.primaryColor}50` }}>
                            <h3 className="font-bold uppercase tracking-widest" style={{ fontSize: '1.1em', color: styles.textColor }}>{s.title}</h3>
                            <div className="flex-1"></div>
                        </div>
                        <div className="grid grid-cols-2" style={{ columnGap: '3em', rowGap: '1em' }}>
                            {s.fields.map(f => f.enabled && (
                                <div key={f.id} className="flex justify-between items-baseline" style={{ fontSize: '0.875em' }}>
                                    <span style={{ fontSize: '0.75em', fontWeight: 600, textTransform: 'uppercase', opacity: 0.5 }}>{f.label}</span>
                                    <span style={{ fontWeight: 500 }} className="text-right">{f.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MinimalistLineRenderer;