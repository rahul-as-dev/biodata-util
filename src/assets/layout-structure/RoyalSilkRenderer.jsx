import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const RoyalSilkRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col" style={{ color: styles.textColor, fontSize: styles.fontSize }}>
            {/* The Wave Background */}
            <div className="absolute top-0 left-0 w-full h-[35%] overflow-hidden z-0">
                <div className="w-[150%] h-[150%] -ml-[25%] -mt-[30%] rounded-[50%]" style={{ backgroundColor: styles.primaryColor }}></div>
            </div>

            <div className="relative z-10" style={{ padding: '3em' }}>
                <div className="flex justify-between items-start" style={{ marginBottom: '4em' }}>
                    <div className="pt-[2em] pl-[1em]" style={{ color: '#fff' }}>
                        {header.enabled && <h1 className="font-serif font-bold leading-tight" style={{ fontSize: '3em' }}>{header.text}</h1>}
                        {overview?.enabled && overview.text && <p className="italic" style={{ marginTop: '1em', fontSize: '0.875em', maxWidth: '20em', opacity: 0.9 }}>{overview.text}</p>}
                    </div>
                    {photo && (
                        <img src={photo} className="rounded-full object-cover shadow-xl" style={{ width: '10em', height: '10em', border: '0.25em solid #fff' }} alt="Profile" />
                    )}
                </div>

                <div className="grid grid-cols-2" style={{ columnGap: '4em', rowGap: '2.5em' }}>
                    {enabledSections.map(s => (
                        <div key={s.id} className="break-inside-avoid">
                            <div className="flex items-center" style={{ gap: '0.5em', marginBottom: '1em' }}>
                                <div className="rotate-45" style={{ width: '0.5em', height: '0.5em', backgroundColor: styles.primaryColor }}></div>
                                <h3 className="font-bold uppercase tracking-widest" style={{ fontSize: '1.1em', color: styles.textColor }}>{s.title}</h3>
                                <div className="flex-1 h-px" style={{ backgroundColor: `${styles.primaryColor}20` }}></div>
                            </div>
                            <div className="flex flex-col" style={{ gap: '0.5em', paddingLeft: '1em' }}>
                                {s.fields.map(f => f.enabled && (
                                    <div key={f.id} className="flex justify-between border-b" style={{ fontSize: '0.85em', paddingBottom: '0.25em', borderColor: `${styles.primaryColor}05` }}>
                                        <span style={{ fontWeight: 600, opacity: 0.5 }}>{f.label}</span>
                                        <span className="text-right" style={{ fontWeight: 700 }}>{f.value}</span>
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

export default RoyalSilkRenderer;