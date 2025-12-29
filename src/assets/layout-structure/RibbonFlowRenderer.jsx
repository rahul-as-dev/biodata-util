import React from 'react';
import { SectionBlock } from './DocumentLayout';

const RibbonFlowRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex">
            <div className="w-16 h-full flex flex-col items-center pt-10" style={{ backgroundColor: styles.primaryColor }}>
                {header.icon && <img src={header.icon} className="h-10 w-10 brightness-0 invert opacity-80" alt="Icon" />}
                <div className="flex-1 w-px bg-white/20 my-6"></div>
            </div>
            <div className="flex-1 p-12 flex flex-col">
                <div className="flex items-center gap-8 mb-10">
                    {photo && <img src={photo} className="w-32 h-32 rounded-lg object-cover shadow-lg" alt="Profile" />}
                    <div>
                        {header.enabled && <h1 className="text-4xl font-bold uppercase text-slate-900 tracking-tight">{header.text}</h1>}
                        {overview?.enabled && overview.text && <div className="mt-3 flex items-start gap-2"><div className="w-1 h-full min-h-[2rem]" style={{ backgroundColor: styles.primaryColor }}></div><p className="text-sm text-slate-600">{overview.text}</p></div>}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-10">{enabledSections.map(s => <div key={s.id} className="relative pl-6"><div className="absolute left-0 top-1 w-1 h-4" style={{ backgroundColor: styles.primaryColor }}></div><h3 className="text-lg font-bold uppercase tracking-wider mb-4 text-slate-800">{s.title}</h3><div className="grid grid-cols-2 gap-x-8 gap-y-3">{s.fields.map(f => f.enabled && <div key={f.id} className="flex flex-col border-l pl-3 border-slate-200"><span className="text-[10px] text-slate-400 font-bold uppercase">{f.label}</span><span className="text-sm font-medium text-slate-900">{f.value}</span></div>)}</div></div>)}</div>
            </div>
        </div>
    );
};

export default RibbonFlowRenderer;
