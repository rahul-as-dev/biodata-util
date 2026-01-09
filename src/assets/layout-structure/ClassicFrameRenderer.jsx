import React from 'react';
import { SectionBlock } from './DocumentLayout';

const ClassicFrameRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full p-6 flex flex-col">
            <div className="flex-1 border-[3px] p-1" style={{ borderColor: styles.primaryColor }}>
                <div className="h-full w-full border border-dashed p-8 flex flex-col items-center" style={{ borderColor: styles.primaryColor }}>
                    {header.icon && <header.icon className="h-26 w-26 mx-auto -mt-10 -mb-2.5 object-contain" style={{ color: styles.primaryColor }} />}                    <div className="flex gap-10 w-full flex-1">
                        <div className="w-1/3 flex flex-col items-center text-center">
                            {photo && <div className="p-1 border rounded-full mb-6" style={{ borderColor: styles.primaryColor }}><img src={photo} className="w-40 h-40 rounded-full object-cover" alt="Profile" /></div>}
                            {overview?.enabled && overview.text && <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/50"><p className="text-sm italic text-slate-600 font-serif leading-relaxed">"{overview.text}"</p></div>}
                        </div>
                        <div className="flex-1 space-y-8">{enabledSections.map(s => <div key={s.id}><h3 className="text-center text-sm font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2" style={{ color: styles.primaryColor, borderColor: `${styles.primaryColor}30` }}>{s.title}</h3><div className="space-y-2">{s.fields.map(f => f.enabled && <div key={f.id} className="grid grid-cols-12 gap-2 text-sm"><span className="col-span-4 text-slate-500 font-serif italic text-right pr-2">{f.label}</span><span className="col-span-8 text-slate-900 font-medium">{f.value}</span></div>)}</div></div>)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassicFrameRenderer;
