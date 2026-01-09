import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const DivineMandalaRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col items-center pt-20 px-12">

            {/* Big Background Mandala */}
            <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] opacity-10 pointer-events-none rounded-full border-[20px] border-dotted" style={{ borderColor: styles.primaryColor }}>
                <div className="absolute inset-10 border-[10px] rounded-full border-dashed" style={{ borderColor: styles.primaryColor }}></div>
            </div>

            {/* Header */}
            <div className="text-center z-10 mb-12">
                {photo && (
                    <div className="mx-auto mb-6 p-1.5 rounded-full border-2 border-dashed" style={{ borderColor: styles.primaryColor }}>
                        <img src={photo} className="w-36 h-36 rounded-full object-cover" alt="Profile" />
                    </div>
                )}
                {header.enabled && (
                    <>
                        {header.icon && <header.icon className="h-26 w-26 mx-auto -mt-10 -mb-2.5 object-contain" style={{ color: styles.primaryColor }} />}                        <h1 className="text-4xl font-bold uppercase tracking-widest text-slate-800">{header.text}</h1>
                    </>
                )}
                {overview?.enabled && overview.text && (
                    <div className="mt-6 p-4 border-y border-slate-200 max-w-xl mx-auto">
                        <p className="text-sm font-medium text-slate-600 italic">"{overview.text}"</p>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="w-full grid grid-cols-2 gap-x-16 gap-y-10 z-10">
                {enabledSections.map(s => (
                    <div key={s.id} className="break-inside-avoid text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="h-px w-8 bg-slate-300"></div>
                            <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: styles.primaryColor }}>{s.title}</h3>
                            <div className="h-px w-8 bg-slate-300"></div>
                        </div>
                        <div className="space-y-2">
                            {s.fields.map(f => f.enabled && (
                                <div key={f.id} className="flex flex-col items-center">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase">{f.label}</span>
                                    <span className="text-sm font-medium text-slate-900">{f.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DivineMandalaRenderer;