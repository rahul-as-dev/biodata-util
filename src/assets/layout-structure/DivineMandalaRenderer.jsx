import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const DivineMandalaRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col items-center" style={{ paddingTop: '5em', paddingLeft: '3em', paddingRight: '3em', color: styles.textColor, fontSize: styles.fontSize }}>

            {/* Big Background Mandala */}
            <div className="absolute left-1/2 -translate-x-1/2 opacity-10 pointer-events-none rounded-full border-dotted" style={{ top: '-12.5em', width: '37.5em', height: '37.5em', borderWidth: '1.25em', borderColor: styles.primaryColor }}>
                <div className="absolute border-dashed rounded-full" style={{ top: '2.5em', right: '2.5em', bottom: '2.5em', left: '2.5em', borderWidth: '0.625em', borderColor: styles.primaryColor }}></div>
            </div>

            {/* Header */}
            <div className="text-center z-10" style={{ marginBottom: '3em' }}>
                {photo && (
                    <div className="mx-auto border-2 border-dashed rounded-full" style={{ marginBottom: '1.5em', padding: '0.375em', borderColor: styles.primaryColor }}>
                        <img src={photo} className="rounded-full object-cover" style={{ width: '9em', height: '9em' }} alt="Profile" />
                    </div>
                )}
                {header.enabled && (
                    <>
                        {header.icon && <header.icon className="mx-auto object-contain" style={{ height: '5em', width: '5em', marginTop: '-1.5em', marginBottom: '-0.3em', color: styles.primaryColor }} />}
                        <h1 className="font-bold uppercase tracking-widest" style={{ fontSize: '2.25em', color: styles.primaryColor }}>{header.text}</h1>
                    </>
                )}
                {overview?.enabled && overview.text && (
                    <div className="mx-auto border-y" style={{ marginTop: '1.5em', padding: '1em', maxWidth: '30em', borderColor: `${styles.primaryColor}20` }}>
                        <p className="font-medium italic" style={{ fontSize: '0.875em', opacity: 0.7 }}>"{overview.text}"</p>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="w-full grid grid-cols-2 z-10" style={{ columnGap: '4em', rowGap: '2.5em' }}>
                {enabledSections.map(s => (
                    <div key={s.id} className="break-inside-avoid text-center">
                        <div className="flex items-center justify-center" style={{ gap: '0.75em', marginBottom: '1em' }}>
                            <div className="h-px w-8" style={{ width: '2em', backgroundColor: `${styles.primaryColor}30` }}></div>
                            <h3 className="font-bold uppercase tracking-widest" style={{ fontSize: '0.85em', color: styles.primaryColor }}>{s.title}</h3>
                            <div className="h-px w-8" style={{ width: '2em', backgroundColor: `${styles.primaryColor}30` }}></div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
                            {s.fields.map(f => f.enabled && (
                                <div key={f.id} className="flex flex-col items-center">
                                    <span style={{ fontSize: '0.625em', opacity: 0.6, fontWeight: 700, textTransform: 'uppercase' }}>{f.label}</span>
                                    <span style={{ fontSize: '0.875em', fontWeight: 500 }}>{f.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DivineMandalaRenderer;