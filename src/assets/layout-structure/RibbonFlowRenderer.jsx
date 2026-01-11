import React from 'react';
import { SectionBlock } from './DocumentLayout';

const RibbonFlowRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex" style={{ color: styles.textColor, fontSize: styles.fontSize }}>
            <div className="flex flex-col items-center" style={{ width: '4em', paddingTop: '2.5em', backgroundColor: styles.primaryColor }}>
                {header.icon && <header.icon className="brightness-0 invert opacity-80" style={{ height: '2.5em', width: '2.5em' }} />}
                <div className="flex-1 w-px" style={{ backgroundColor: 'rgba(255,255,255,0.2)', margin: '1.5em 0' }}></div>
            </div>
            <div className="flex-1 flex flex-col" style={{ padding: '3em' }}>
                <div className="flex items-center" style={{ gap: '2em', marginBottom: '2.5em' }}>
                    {photo && <img src={photo} className="object-cover shadow-lg rounded-lg" style={{ width: '8em', height: '8em' }} alt="Profile" />}
                    <div>
                        {header.enabled && <h1 className="font-bold uppercase tracking-tight" style={{ fontSize: '2.25em', color: styles.primaryColor }}>{header.text}</h1>}
                        {overview?.enabled && overview.text && (
                            <div className="flex items-start" style={{ marginTop: '0.75em', gap: '0.5em' }}>
                                <div style={{ width: '0.25em', minHeight: '1.5em', backgroundColor: styles.primaryColor, borderRadius: '0.125em' }}></div>
                                <p style={{ fontSize: '0.875em', opacity: 0.7 }}>{overview.text}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col" style={{ gap: '2.5em' }}>
                    {enabledSections.map(s => (
                        <div key={s.id} className="relative" style={{ paddingLeft: '1.5em' }}>
                            <div className="absolute left-0 top-1" style={{ width: '0.25em', height: '1em', backgroundColor: styles.primaryColor, borderRadius: '0.125em' }}></div>
                            <h3 className="font-bold uppercase tracking-wider" style={{ fontSize: '1.175em', color: styles.textColor, marginBottom: '1em' }}>{s.title}</h3>
                            <div className="grid grid-cols-2" style={{ columnGap: '2em', rowGap: '1em' }}>
                                {s.fields.map(f => f.enabled && (
                                    <div key={f.id} className="flex flex-col border-l" style={{ paddingLeft: '0.75em', borderColor: `${styles.primaryColor}20` }}>
                                        <span style={{ fontSize: '0.625em', fontWeight: 700, textTransform: 'uppercase', opacity: 0.5 }}>{f.label}</span>
                                        <span style={{ fontSize: '0.875em', fontWeight: 500 }}>{f.value}</span>
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

export default RibbonFlowRenderer;
