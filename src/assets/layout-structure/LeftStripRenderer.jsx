import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const LeftStripRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex" style={{ color: styles.textColor, fontSize: styles.fontSize }}>
            {/* The Strip */}
            <div className="h-full" style={{ width: '1em', backgroundColor: styles.primaryColor }}></div>

            <div className="flex-1" style={{ padding: '2.5em', paddingTop: '3.5em' }}>
                <div className="flex items-start justify-between" style={{ marginBottom: '3em' }}>
                    <div className="flex-1">
                        {header.icon && <header.icon className="mx-auto object-contain" style={{ height: '5em', width: '5em', marginTop: '-1.5em', marginBottom: '-0.3em', color: styles.primaryColor }} />}
                        {header.enabled && (
                            <h1 className="font-bold uppercase leading-none" style={{ fontSize: '3em', marginBottom: '0.5em', color: styles.textColor }}>
                                {header.text.split(' ').map((word, i) => (
                                    <span key={i} style={{ color: i === 1 ? styles.primaryColor : 'inherit' }}>{word} </span>
                                ))}
                            </h1>
                        )}
                        {overview?.enabled && overview.text && <p className="border-l-4" style={{ fontSize: '0.875em', paddingLeft: '1em', borderColor: `${styles.primaryColor}20`, color: styles.textColor, opacity: 0.7 }}>{overview.text}</p>}
                    </div>
                    {photo && <img src={photo} className="object-cover shadow-lg" style={{ width: '8em', height: '10em', marginTop: '-1em', marginRight: '1em' }} alt="Profile" />}
                </div>

                <div className="flex flex-col" style={{ gap: '2.5em' }}>
                    {enabledSections.map(s => (
                        <div key={s.id} className="break-inside-avoid relative" style={{ paddingLeft: '2em' }}>
                            {/* Floating Number/Icon Placeholder */}
                            <div className="absolute left-0 top-0 font-black opacity-10" style={{ fontSize: '1.875em', color: styles.primaryColor }}>
                                {s.title.charAt(0)}
                            </div>
                            <h3 className="font-bold uppercase tracking-widest border-b" style={{ fontSize: '0.875em', color: styles.primaryColor, marginBottom: '1em', paddingBottom: '0.5em', borderColor: `${styles.primaryColor}10` }}>{s.title}</h3>
                            <div className="flex flex-col" style={{ gap: '0.75em' }}>
                                {s.fields.map(f => f.enabled && (
                                    <div key={f.id} className="group">
                                        <div className="font-bold uppercase" style={{ fontSize: '0.625em', color: styles.textColor, opacity: 0.5, marginBottom: '0.125em' }}>{f.label}</div>
                                        <div className="font-medium" style={{ fontSize: '0.875em' }}>{f.value}</div>
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

export default LeftStripRenderer;