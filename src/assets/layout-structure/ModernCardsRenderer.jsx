import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const ModernCardsRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full bg-slate-50 flex flex-col p-8">
            {/* Floating Header */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 flex items-center gap-6">
                {photo && <img src={photo} className="w-24 h-24 rounded-xl object-cover shadow-sm" alt="Profile" />}
                <div className="flex-1">
                    {header.enabled && <h1 className="text-3xl font-bold uppercase tracking-tight text-slate-800" style={{ color: styles.primaryColor }}>{header.text}</h1>}
                    {overview?.enabled && overview.text && <p className="text-slate-500 text-sm mt-2 max-w-xl">{overview.text}</p>}
                </div>
                {header.icon && <img src={header.icon} className="h-16 w-16 opacity-10" alt="Icon" />}
            </div>

            {/* Grid of Cards */}
            <div className="grid grid-cols-2 gap-6 flex-1 content-start">
                {enabledSections.map(s => (
                    <div key={s.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 break-inside-avoid">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-1 h-4 rounded-full" style={{ backgroundColor: styles.primaryColor }}></div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">{s.title}</h3>
                        </div>
                        <div className="space-y-3">
                            {s.fields.map(f => f.enabled && (
                                <div key={f.id} className="flex flex-col border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">{f.label}</span>
                                    <span className="text-sm font-medium text-slate-800">{f.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ModernCardsRenderer;