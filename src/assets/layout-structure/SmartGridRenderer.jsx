import React from 'react';
import { SectionBlock } from './DocumentLayout';

const SmartGridRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full p-10 pt-12 flex flex-col">
            <div className="flex items-start justify-between mb-10 border-b-2 pb-6" style={{ borderColor: styles.primaryColor }}>
                <div className="flex-1">
                    {header.enabled && <h1 className="text-4xl font-bold uppercase tracking-tighter" style={{ color: styles.primaryColor }}>{header.text}</h1>}
                    {overview?.enabled && overview.text && <p className="mt-4 text-slate-600 max-w-md text-sm leading-relaxed">{overview.text}</p>}
                </div>
                {photo && <img src={photo} className="w-32 h-32 object-cover rounded-lg shadow-sm" style={{ boxShadow: `4px 4px 0px ${styles.primaryColor}40` }} alt="Profile" />}
            </div>
            <div className="columns-2 gap-8 space-y-8">
                {enabledSections.map(s => (
                    <div key={s.id} className="break-inside-avoid bg-white/50 p-5 rounded-xl border border-slate-200" style={{ borderLeft: `4px solid ${styles.primaryColor}` }}>
                        <h3 className="text-sm font-bold uppercase tracking-wide mb-4 text-slate-800">{s.title}</h3>
                        <div className="space-y-2">{s.fields.map(f => f.enabled && <div key={f.id} className="flex flex-col"><span className="text-[10px] font-bold text-slate-400 uppercase">{f.label}</span><span className="text-sm font-medium text-slate-900">{f.value}</span></div>)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SmartGridRenderer;
