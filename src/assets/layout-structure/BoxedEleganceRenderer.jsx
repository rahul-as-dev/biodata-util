import { SectionBlock } from './DocumentLayout';
import React from 'react';

const BoxedEleganceRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full p-10 flex flex-col">
            <div className="flex-1 border border-slate-300 p-8 relative flex flex-col">
                {/* Title Box intersecting top border */}
                {header.enabled && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-8 py-2">
                        {header.icon && <header.icon className="h-26 w-26 mx-auto -mt-10 -mb-2.5 object-contain" style={{ color: styles.primaryColor }}/>}
                        <h1 className="text-3xl font-serif font-bold uppercase tracking-widest text-center whitespace-nowrap" style={{ color: styles.primaryColor }}>
                            {header.text}
                        </h1>
                    </div>
                )}

                <div className="mt-8 flex gap-8 mb-10 items-center border-b border-slate-100 pb-8">
                    {photo && <img src={photo} className="w-32 h-32 rounded-full object-cover shadow-md" alt="Profile" />}
                    <div className="flex-1 text-center">
                        {header.icon && <img src={header.icon} className="h-10 w-10 mx-auto mb-2 opacity-50" alt="Icon" />}
                        {overview?.enabled && overview.text && <p className="text-slate-600 italic font-serif">{overview.text}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-10 flex-1 content-start">
                    {enabledSections.map(s => (
                        <div key={s.id} className="break-inside-avoid">
                            <h3 className="text-center text-xs font-bold uppercase tracking-[0.2em] mb-4 bg-slate-50 py-1" style={{ color: styles.primaryColor }}>{s.title}</h3>
                            <div className="space-y-2 px-2">
                                {s.fields.map(f => f.enabled && (
                                    <div key={f.id} className="flex justify-between items-baseline text-sm">
                                        <span className="text-slate-400 font-medium text-xs uppercase">{f.label}</span>
                                        <span className="text-slate-900 font-semibold text-right">{f.value}</span>
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

export default BoxedEleganceRenderer;