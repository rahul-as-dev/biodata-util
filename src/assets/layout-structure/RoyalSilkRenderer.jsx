import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const RoyalSilkRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col">
            {/* The Wave Background */}
            <div className="absolute top-0 left-0 w-full h-[35%] overflow-hidden z-0">
                <div className="w-[150%] h-[150%] -ml-[25%] -mt-[30%] rounded-[50%]" style={{ backgroundColor: styles.primaryColor }}></div>
            </div>

            <div className="relative z-10 p-12">
                <div className="flex justify-between items-start mb-16">
                    <div className="text-white pt-8 pl-4">
                        {header.enabled && <h1 className="text-5xl font-serif font-bold leading-tight">{header.text}</h1>}
                        {overview?.enabled && overview.text && <p className="mt-4 text-white/90 text-sm italic max-w-sm">{overview.text}</p>}
                    </div>
                    {photo && (
                        <img src={photo} className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl" alt="Profile" />
                    )}
                </div>

                <div className="grid grid-cols-2 gap-x-16 gap-y-10">
                    {enabledSections.map(s => (
                        <div key={s.id} className="break-inside-avoid">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rotate-45" style={{ backgroundColor: styles.primaryColor }}></div>
                                <h3 className="text-lg font-bold uppercase tracking-widest text-slate-800">{s.title}</h3>
                                <div className="flex-1 h-px bg-slate-200"></div>
                            </div>
                            <div className="space-y-2 pl-4">
                                {s.fields.map(f => f.enabled && (
                                    <div key={f.id} className="flex justify-between text-sm border-b border-slate-50 pb-1">
                                        <span className="text-slate-500 font-semibold">{f.label}</span>
                                        <span className="text-slate-900 font-bold text-right">{f.value}</span>
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