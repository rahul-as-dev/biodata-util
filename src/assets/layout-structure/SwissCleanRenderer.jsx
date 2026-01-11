import React from 'react';
import { SectionBlock } from './DocumentLayout';

const SwissCleanRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col" style={{ padding: '3em', color: styles.textColor, fontSize: styles.fontSize }}>
            <div className="flex justify-between items-start border-b" style={{ marginBottom: '2em', paddingBottom: '1.5em', borderBottomWidth: '0.25em', borderColor: styles.primaryColor }}>
                <div className="flex-1" style={{ paddingRight: '2em' }}>
                    {header.enabled && (<>
                        <h1 className="font-bold uppercase tracking-tighter leading-none" style={{ fontSize: '3em', color: styles.primaryColor, marginBottom: '0.3em' }}>{header.text}</h1>
                        {header.icon && <header.icon className="object-contain opacity-70" style={{ height: '2.5em', width: '2.5em', color: styles.primaryColor }} />}
                    </>)}
                    {overview?.enabled && overview.text && <p className="font-medium" style={{ marginTop: '1em', fontSize: '0.875em', maxWidth: '30em', opacity: 0.7 }}>{overview.text}</p>}
                </div>
                {photo && <img src={photo} className="object-cover grayscale contrast-125 shadow-sm" style={{ width: '8em', height: '10em' }} alt="Profile" />}
            </div>
            <div className="columns-2 flex-1" style={{ gap: '3em' }}>
                {enabledSections.map(s => (
                    <div key={s.id} className="break-inside-avoid" style={{ marginBottom: '2.5em' }}>
                        <h3 className="font-bold uppercase flex items-center" style={{ fontSize: '1.1em', gap: '0.5em', marginBottom: '0.75em' }}>
                            <span style={{ width: '1em', height: '0.25em', backgroundColor: styles.primaryColor }}></span>
                            {s.title}
                        </h3>
                        <div className="flex flex-col" style={{ gap: '0.75em' }}>
                            {s.fields.map(f => f.enabled && (
                                <div key={f.id}>
                                    <span style={{ fontSize: '0.625em', fontWeight: 700, textTransform: 'uppercase', tracking: '0.1em', opacity: 0.5 }}>{f.label}</span>
                                    <div className="font-medium border-b" style={{ fontSize: '0.875em', paddingBottom: '0.125em', borderColor: `${styles.primaryColor}10` }}>{f.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SwissCleanRenderer;
