import React from 'react';
import { SectionBlock } from './DocumentLayout';

const ChronicleRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full p-10 pt-14 flex flex-col">
            <div className="text-center mb-10">
                {photo && <img src={photo} className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg" alt="Profile" />}
                {header.enabled && <h1 className="text-3xl font-serif font-bold" style={{ color: styles.primaryColor }}>{header.text}</h1>}
                {overview?.enabled && overview.text && <p className="text-slate-500 text-sm mt-2">{overview.text}</p>}
            </div>
            <div className="flex-1 ml-4 relative">
                <div className="absolute top-0 bottom-0 left-[5px] w-0.5 bg-slate-300/50"></div>
                <div className="space-y-8">{enabledSections.map(s => <div key={s.id} className="relative pl-8"><div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-white shadow-sm z-10" style={{ backgroundColor: styles.primaryColor }}></div><h3 className="text-md font-bold uppercase tracking-wider mb-3" style={{ color: styles.primaryColor }}>{s.title}</h3><div className="grid grid-cols-1 gap-y-1.5">{s.fields.map(f => f.enabled && <div key={f.id} className="flex gap-4"><span className="w-32 text-xs font-semibold text-slate-500 text-right shrink-0">{f.label}</span><span className="flex-1 text-sm font-medium text-slate-900">{f.value}</span></div>)}</div></div>)}</div>
            </div>
        </div>
    );
};

export default ChronicleRenderer;
