import React from 'react';
import { SectionBlock } from './DocumentLayout';

const ProfileHeroRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col">
            <div className="flex h-[35%]">
                <div className="w-[40%] relative bg-slate-200">
                    {photo ? <img src={photo} className="w-full h-full object-cover" alt="Profile" /> : <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">No Photo</div>}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <div className="text-white">{header.enabled && <h1 className="text-2xl font-bold uppercase leading-tight">{header.text}</h1>}</div>
                    </div>
                </div>
                <div className="w-[60%] p-8 flex flex-col justify-center" style={{ backgroundColor: `${styles.primaryColor}15` }}>
                    {overview?.enabled && overview.text && <div className="border-l-4 pl-4" style={{ borderColor: styles.primaryColor }}><h3 className="text-xs font-bold uppercase mb-2 text-slate-500">{overview.title || 'Introduction'}</h3><p className="text-lg font-serif italic text-slate-800 leading-relaxed">{overview.text}</p></div>}
                </div>
            </div>
            <div className="flex-1 p-10 columns-2 gap-10">
                {enabledSections.map(s => (
                    <div key={s.id} className="break-inside-avoid mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 bg-white/60 inline-block px-2 py-1 rounded" style={{ color: styles.primaryColor }}>{s.title}</h3>
                        <div className="space-y-2">{s.fields.map(f => f.enabled && <div key={f.id} className="grid grid-cols-12 gap-2 text-sm"><span className="col-span-4 text-slate-400 font-bold uppercase text-[10px] pt-0.5">{f.label}</span><span className="col-span-8 text-slate-900 font-medium">{f.value}</span></div>)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileHeroRenderer;
