import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const SideHeaderRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex">
            {/* Left Header Panel */}
            <div className="w-[35%] h-full p-8 flex flex-col text-white" style={{ backgroundColor: styles.primaryColor }}>
                <div className="text-center mb-8">
                    {photo && (
                        <div className="inline-block p-1 bg-white/20 rounded-full mb-6">
                            <img src={photo} className="w-32 h-32 rounded-full object-cover" alt="Profile" />
                        </div>
                    )}
                    {header.enabled && (
                        <div>
                            {header.icon && <img src={header.icon} className="h-12 w-12 mx-auto mb-4 brightness-0 invert opacity-90" alt="Icon" />}
                            <h1 className="text-2xl font-bold uppercase tracking-widest leading-relaxed mb-2">{header.text}</h1>
                            <div className="w-10 h-1 bg-white/50 mx-auto rounded-full" />
                        </div>
                    )}
                </div>
                {overview?.enabled && overview.text && (
                    <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                        <p className="text-sm italic text-white/90 leading-relaxed text-center">"{overview.text}"</p>
                    </div>
                )}
                {/* Decoration at bottom */}
                <div className="mt-auto opacity-20">
                    <div className="w-full h-32 border-l-2 border-b-2 border-white rounded-bl-3xl ml-4 mb-4"></div>
                </div>
            </div>

            {/* Right Content Panel */}
            <div className="flex-1 p-10 pt-12 overflow-hidden">
                <div className="columns-1 space-y-8">
                    {enabledSections.map(s => (
                        <div key={s.id} className="break-inside-avoid mb-8">
                            <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest mb-3" style={{ color: styles.primaryColor }}>
                                {s.title}
                                <div className="flex-1 h-px bg-slate-200"></div>
                            </h3>
                            <div className="space-y-2 pl-1">
                                {s.fields.map(f => f.enabled && (
                                    <div key={f.id} className="grid grid-cols-12 gap-2 text-sm">
                                        <span className="col-span-4 text-slate-500 font-semibold uppercase text-[10px] pt-0.5">{f.label}</span>
                                        <span className="col-span-8 text-slate-900 font-medium">{f.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SideHeaderRenderer;