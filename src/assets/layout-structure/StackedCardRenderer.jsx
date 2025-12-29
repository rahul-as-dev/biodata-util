import React from 'react';
import { SectionBlock } from './DocumentLayout';

const StackedCardRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full p-8 flex flex-col items-center">
            <div className="w-full h-48 rounded-t-3xl shadow-sm flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: styles.primaryColor }}>
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
                <div className="absolute right-20 bottom-10 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="text-center text-white z-10">{header.enabled && <h1 className="text-3xl font-bold uppercase tracking-widest">{header.text}</h1>}</div>
            </div>
            <div className="w-[90%] flex-1 bg-white/95 -mt-12 rounded-t-lg shadow-2xl p-10 relative z-20 flex flex-col backdrop-blur-sm">
                {photo && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"><img src={photo} className="w-36 h-36 rounded-full object-cover border-8 border-white shadow-md" alt="Profile" /></div>}
                <div className="mt-16 text-center mb-10">{overview?.enabled && overview.text && <p className="text-slate-500 italic max-w-lg mx-auto">{overview.text}</p>}</div>
                <div className="grid grid-cols-1 gap-12">{enabledSections.map(s => <div key={s.id} className="break-inside-avoid"><div className="flex items-center gap-4 mb-6"><div className="flex-1 h-px bg-slate-200"></div><h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 px-4 py-1 border rounded-full" style={{ borderColor: styles.primaryColor, color: styles.primaryColor }}>{s.title}</h3><div className="flex-1 h-px bg-slate-200"></div></div><div className="grid grid-cols-2 gap-x-12 gap-y-4 px-8">{s.fields.map(f => f.enabled && <div key={f.id} className="flex justify-between items-baseline border-b border-slate-50 pb-1"><span className="text-xs font-bold text-slate-400 uppercase">{f.label}</span><span className="text-sm font-medium text-slate-900 text-right">{f.value}</span></div>)}</div></div>)}</div>
            </div>
        </div>
    );
};

export default StackedCardRenderer;
