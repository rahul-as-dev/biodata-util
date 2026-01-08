import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const MahalArchRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full p-6 flex flex-col">
            {/* The Arch Border */}
            <div className="flex-1 border-[4px] relative flex flex-col mt-4" style={{ borderColor: styles.primaryColor, borderRadius: '150px 150px 0 0' }}>

                {/* Decorative Top Keystone */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rotate-45 border-4 bg-white z-20" style={{ borderColor: styles.primaryColor }}></div>

                {/* Header Content */}
                <div className="pt-20 pb-8 px-10 text-center relative border-b" style={{ borderColor: `${styles.primaryColor}20` }}>
                    {photo && (
                        <div className="mx-auto mb-4 p-1 border-2 rounded-full inline-block" style={{ borderColor: styles.primaryColor }}>
                            <img src={photo} className="w-32 h-32 rounded-full object-cover" alt="Profile" />
                        </div>
                    )}
                    {header.enabled && (
                        <>
                            <h1 className="text-3xl font-serif font-bold uppercase tracking-widest text-slate-800">{header.text}</h1>
                            {header.icon && <img src={header.icon} className="h-8 w-8 mx-auto mt-2 opacity-60" alt="Icon" />}
                        </>
                    )}
                </div>

                {/* Body Content */}
                <div className="flex-1 p-10 pt-8 columns-2 gap-10">
                    {enabledSections.map(s => (
                        <div key={s.id} className="break-inside-avoid mb-8 text-center">
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-2 inline-block border-b-2 pb-1" style={{ color: styles.primaryColor, borderColor: styles.primaryColor }}>
                                {s.title}
                            </h3>
                            <div className="space-y-1 mt-2">
                                {s.fields.map(f => f.enabled && (
                                    <div key={f.id} className="text-sm flex flex-col" style={{ color: styles.textColor }}>
                                        <span className="text-[10px] font-bold uppercase" style={{ color: styles.textColor }}>{f.label}</span>
                                        <span className="font-medium" style={{ color: styles.textColor }}>{f.value}</span>
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

export default MahalArchRenderer;