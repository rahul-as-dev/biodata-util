import React from 'react';
import { SectionBlock } from './DocumentLayout';

const SwissCleanRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full p-12 flex flex-col">
            <div className="flex justify-between items-start mb-8 border-b-4 pb-6" style={{ borderColor: styles.primaryColor }}>
                <div className="flex-1 pr-8">
                    {header.enabled && ( <>
                        <h1 className="text-5xl font-bold uppercase tracking-tighter leading-none mb-4" style={{ color: styles.primaryColor }}>{header.text}</h1>
                        {header.icon && <img src={header.icon} className="h-10 w-10 object-contain opacity-70" alt="Icon" />}
                    </> )}
                    {overview?.enabled && overview.text && <p className="mt-4 text-slate-600 text-sm font-medium max-w-md">{overview.text}</p>}
                </div>
                {photo && <img src={photo} className="w-32 h-40 object-cover grayscale contrast-125" alt="Profile" />}
            </div>
            <div className="columns-2 gap-12 flex-1">
                {enabledSections.map(s => (
                    <div key={s.id} className="break-inside-avoid mb-10">
                        <h3 className="text-lg font-bold uppercase mb-3 flex items-center gap-2"><span className="w-4 h-1" style={{ backgroundColor: styles.primaryColor }}></span>{s.title}</h3>
                        <div className="space-y-2">{s.fields.map(f => f.enabled && <div key={f.id} className="group"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{f.label}</span><div className="text-sm font-medium text-slate-900 border-b border-slate-200/50 pb-1">{f.value}</div></div>)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SwissCleanRenderer;
