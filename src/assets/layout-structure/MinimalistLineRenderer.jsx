import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const MinimalistLineRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full p-12 flex flex-col">
            <div className="text-center mb-12">
                {photo && <img src={photo} className="w-32 h-32 rounded-full object-cover mx-auto mb-6 grayscale hover:grayscale-0 transition-all" alt="Profile" />}
                {header.enabled && <h1 className="text-4xl font-light tracking-[0.2em] uppercase text-slate-900 mb-4">{header.text}</h1>}
                <div className="w-20 h-1 mx-auto" style={{ backgroundColor: styles.primaryColor }}></div>
                {overview?.enabled && overview.text && <p className="mt-6 text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">{overview.text}</p>}
            </div>

            <div className="flex-1 space-y-10">
                {enabledSections.map(s => (
                    <div key={s.id} className="break-inside-avoid">
                        <div className="flex items-end gap-4 mb-4 border-b pb-2" style={{ borderColor: styles.primaryColor }}>
                            <h3 className="text-lg font-bold uppercase tracking-widest text-slate-900">{s.title}</h3>
                            <div className="flex-1"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                            {s.fields.map(f => f.enabled && (
                                <div key={f.id} className="flex justify-between items-baseline">
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{f.label}</span>
                                    <span className="text-sm font-medium text-slate-900 text-right">{f.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MinimalistLineRenderer;