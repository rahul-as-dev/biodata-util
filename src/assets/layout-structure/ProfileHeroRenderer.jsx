import React from 'react';
import { SectionBlock } from './DocumentLayout';

const ProfileHeroRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col" style={{ color: styles.textColor, fontSize: styles.fontSize }}>
            <div className="flex" style={{ height: '35%' }}>
                <div className="relative" style={{ width: '40%', backgroundColor: `${styles.primaryColor}10` }}>
                    {photo ? <img src={photo} className="w-full h-full object-cover" alt="Profile" /> : <div className="w-full h-full flex items-center justify-center bg-slate-100" style={{ color: styles.textColor, opacity: 0.4 }}>No Photo</div>}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end" style={{ padding: '1.5em' }}>
                        <div style={{ color: '#fff' }}>{header.enabled && <h1 className="font-bold uppercase leading-tight" style={{ fontSize: '1.5em' }}>{header.text}</h1>}</div>
                    </div>
                </div>
                <div className="flex flex-col justify-center" style={{ width: '60%', padding: '2em', backgroundColor: `${styles.primaryColor}08` }}>
                    {overview?.enabled && overview.text && (
                        <div className="border-l-4" style={{ paddingLeft: '1em', borderColor: styles.primaryColor }}>
                            <h3 className="font-bold uppercase" style={{ fontSize: '0.75em', marginBottom: '0.5em', opacity: 0.6 }}>{overview.title || 'Introduction'}</h3>
                            <p className="font-serif italic leading-relaxed" style={{ fontSize: '1.1em' }}>{overview.text}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex-1 columns-2" style={{ padding: '2.5em', gap: '2.5em' }}>
                {enabledSections.map(s => (
                    <div key={s.id} className="break-inside-avoid" style={{ marginBottom: '2em' }}>
                        <h3 className="font-bold uppercase tracking-widest bg-white/60 rounded" style={{ fontSize: '0.85em', color: styles.primaryColor, marginBottom: '1em', padding: '0.25em 0.5em', display: 'inline-block' }}>{s.title}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
                            {s.fields.map(f => f.enabled && (
                                <div key={f.id} className="grid grid-cols-12" style={{ gap: '0.5em', fontSize: '0.85em' }}>
                                    <span className="col-span-4 font-bold uppercase" style={{ fontSize: '0.625em', color: styles.textColor, opacity: 0.4, paddingTop: '0.125em' }}>{f.label}</span>
                                    <span className="col-span-8 font-medium">{f.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileHeroRenderer;
