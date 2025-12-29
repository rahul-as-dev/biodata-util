import React from 'react';
import { SectionBlock } from './DocumentLayout';

const DiagonalRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col">
            <div className="absolute top-0 left-0 w-full h-[350px] z-0" style={{ backgroundColor: styles.primaryColor, clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0% 100%)' }} />
            <div className="relative z-10 p-12">
                <div className="flex gap-8 items-center mb-12">
                    {photo && <div className="p-1 bg-white rounded-full shadow-xl"><img src={photo} className="w-40 h-40 rounded-full object-cover" alt="Profile" /></div>}
                    <div className="text-white flex-1">
                        {header.enabled && <h1 className="text-4xl font-bold uppercase tracking-widest drop-shadow-md">{header.text}</h1>}
                        {overview?.enabled && overview.text && <p className="mt-2 text-white/90 font-medium italic opacity-90 border-l-4 border-white/30 pl-3">{overview.text}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                    {enabledSections.map(s => (
                        <div key={s.id} className="break-inside-avoid bg-white/90 p-6 rounded-lg shadow-sm border border-slate-100">
                            <div className="flex items-center gap-2 mb-4 border-b pb-2" style={{ borderColor: `${styles.primaryColor}20` }}>
                                <div className="p-1.5 rounded text-white" style={{ backgroundColor: styles.primaryColor }}><span className="text-[10px] font-bold">{s.title.substring(0,2)}</span></div>
                                <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: styles.primaryColor }}>{s.title}</h3>
                            </div>
                            <div className="space-y-2">{s.fields.map(f => f.enabled && <div key={f.id} className="flex justify-between text-sm"><span className="text-slate-500 font-medium">{f.label}</span><span className="text-slate-900 font-semibold text-right">{f.value}</span></div>)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DiagonalRenderer;
