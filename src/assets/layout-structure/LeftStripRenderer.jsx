import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const LeftStripRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex">
            {/* The Strip */}
            <div className="w-4 h-full" style={{ backgroundColor: styles.primaryColor }}></div>
            
            <div className="flex-1 p-10 pt-14">
                <div className="flex items-start justify-between mb-12">
                    <div className="flex-1">
                        {header.enabled && (
                            <h1 className="text-5xl font-bold uppercase leading-none text-slate-900 mb-6">
                                {header.text.split(' ').map((word, i) => (
                                    <span key={i} style={{ color: i === 1 ? styles.primaryColor : 'inherit' }}>{word} </span>
                                ))}
                            </h1>
                        )}
                        {overview?.enabled && overview.text && <p className="text-slate-600 text-sm border-l-4 pl-4 border-slate-200">{overview.text}</p>}
                    </div>
                    {photo && <img src={photo} className="w-32 h-40 object-cover shadow-lg -mt-4 mr-4" alt="Profile" />}
                </div>

                <div className="columns-1 gap-12 space-y-10">
                    {enabledSections.map(s => (
                        <div key={s.id} className="break-inside-avoid relative pl-8">
                            {/* Floating Number/Icon Placeholder */}
                            <div className="absolute left-0 top-0 text-3xl font-black opacity-10" style={{ color: styles.primaryColor }}>
                                {s.title.charAt(0)}
                            </div>
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">{s.title}</h3>
                            <div className="space-y-3">
                                {s.fields.map(f => f.enabled && (
                                    <div key={f.id} className="group">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">{f.label}</div>
                                        <div className="text-sm font-medium text-slate-900">{f.value}</div>
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

export default LeftStripRenderer;