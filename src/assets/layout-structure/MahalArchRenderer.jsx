import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const MahalArchRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col" style={{ padding: '1.5em', color: styles.textColor, fontSize: styles.fontSize }}>
            {/* The Arch Border */}
            <div className="flex-1 border relative flex flex-col mt-[1em]" style={{ borderColor: styles.primaryColor, borderRadius: '9.375em 9.375em 0 0', borderWidth: '0.25em' }}>

                {/* Decorative Top Keystone */}
                <div className="absolute left-1/2 -translate-x-1/2 rotate-45 border bg-white z-20" style={{ top: '-1.5em', width: '3em', height: '3em', borderColor: styles.primaryColor, borderWidth: '0.25em' }}></div>

                {/* Header Content */}
                <div className="text-center relative border-b" style={{ paddingTop: '5em', paddingBottom: '2em', paddingLeft: '2.5em', paddingRight: '2.5em', borderColor: `${styles.primaryColor}20` }}>
                    {photo && (
                        <div className="mx-auto border-2 rounded-full inline-block" style={{ marginBottom: '1em', padding: '0.25em', borderColor: styles.primaryColor }}>
                            <img src={photo} className="rounded-full object-cover" style={{ width: '8em', height: '8em' }} alt="Profile" />
                        </div>
                    )}
                    {header.enabled && (
                        <>
                            <h1 className="font-serif font-bold uppercase tracking-widest" style={{ fontSize: '1.875em', color: styles.primaryColor }}>{header.text}</h1>
                            {header.icon && <header.icon className="mx-auto" style={{ height: '2em', width: '2em', marginTop: '0.5em', color: styles.primaryColor, opacity: 0.6 }} />}
                        </>
                    )}
                    {overview?.enabled && overview.text && (
                        <p className="italic" style={{ marginTop: '1em', fontSize: '0.9em', opacity: 0.7 }}>{overview.text}</p>
                    )}
                </div>

                {/* Body Content */}
                <div className="flex-1 columns-2" style={{ padding: '2.5em', paddingTop: '2em', gap: '2.5em' }}>
                    {enabledSections.map(s => (
                        <div key={s.id} className="break-inside-avoid text-center" style={{ marginBottom: '2em' }}>
                            <h3 className="font-bold uppercase tracking-widest inline-block border-b-2" style={{ fontSize: '0.85em', color: styles.primaryColor, borderColor: styles.primaryColor, marginBottom: '0.5em', paddingBottom: '0.25em' }}>
                                {s.title}
                            </h3>
                            <div className="flex flex-col" style={{ gap: '0.75em', marginTop: '0.5em' }}>
                                {s.fields.map(f => f.enabled && (
                                    <div key={f.id} className="flex flex-col" style={{ fontSize: '0.85em' }}>
                                        <span style={{ fontSize: '0.625em', fontWeight: 700, textTransform: 'uppercase', opacity: 0.5 }}>{f.label}</span>
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
}

export default MahalArchRenderer;