import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const VedicPillarsRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex">
            {/* Left Pillar */}
            <div className="w-12 h-full flex flex-col items-center py-4" style={{ backgroundColor: `${styles.primaryColor}15`, borderRight: `1px solid ${styles.primaryColor}30` }}>
                <div className="h-full w-2 border-x border-double" style={{ borderColor: styles.primaryColor }}></div>
            </div>

            {/* Content */}
            <div className="flex-1 py-12 px-10 flex flex-col items-center">
                {header.enabled && (
                    <div className="text-center mb-8">
                        {header.icon && <img src={header.icon} className="h-16 w-16 mx-auto mb-3" alt="Icon" />}
                        <h1 className="text-3xl font-bold uppercase tracking-[0.3em]" style={{ color: styles.primaryColor }}>{header.text}</h1>
                        <div className="flex items-center justify-center gap-2 mt-2 opacity-60">
                            <span className="h-px w-8 bg-slate-400"></span>
                            <span className="text-xs">♦</span>
                            <span className="h-px w-8 bg-slate-400"></span>
                        </div>
                    </div>
                )}

                {photo && (
                    <div className="p-2 border-2 border-dashed rounded-full mb-10" style={{ borderColor: styles.primaryColor }}>
                        <img src={photo} className="w-36 h-36 rounded-full object-cover" alt="Profile" />
                    </div>
                )}

                <div className="w-full grid grid-cols-2 gap-12 text-center">
                    {enabledSections.map(s => (
                        <div key={s.id} className="break-inside-avoid">
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 bg-slate-50 py-1" style={{ color: styles.primaryColor }}>{s.title}</h3>
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

            {/* Right Pillar */}
            <div className="w-12 h-full flex flex-col items-center py-4" style={{ backgroundColor: `${styles.primaryColor}15`, borderLeft: `1px solid ${styles.primaryColor}30` }}>
                <div className="h-full w-2 border-x border-double" style={{ borderColor: styles.primaryColor }}></div>
            </div>
        </div>
    );
}

export default VedicPillarsRenderer;