import React from 'react';
import { SectionBlock } from './DocumentLayout';

const BoldBandRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col pt-12">
            <div className="w-full py-8 px-10 flex items-center justify-between mb-8 shadow-sm" style={{ backgroundColor: styles.primaryColor }}>
                <div className="text-white">
                    {header.icon && <header.icon className="h-26 w-26 mx-auto -mt-10 -mb-2.5 object-contain" style={{ color: styles.primaryColor }}/>}
                    {header.enabled && <h1 className="text-4xl font-bold uppercase tracking-wide">{header.text}</h1>}
                    {overview?.enabled && overview.text && <p className="text-white/80 text-sm mt-2 max-w-lg">{overview.text}</p>}
                </div>
                {photo && <div className="w-32 h-32 bg-white p-1 rounded-full shadow-lg -mb-20 z-20 relative"><img src={photo} className="w-full h-full rounded-full object-cover" alt="Profile" /></div>}
            </div>
            <div className="flex-1 p-10 pt-16 columns-2 gap-10">
                {enabledSections.map(s => (
                    <div key={s.id} className="break-inside-avoid mb-8">
                        <div className="flex items-center gap-2 mb-3 border-b pb-2" style={{ borderColor: `${styles.primaryColor}30` }}>
                            <span style={{ color: styles.primaryColor }}>•</span>
                            <h3 className="text-sm font-bold uppercase" style={{ color: styles.primaryColor }}>{s.title}</h3>
                        </div>
                        <div className="space-y-2">{s.fields.map(f => f.enabled && <div key={f.id} className="flex justify-between items-baseline text-sm"><span className="text-slate-500 font-medium">{f.label}</span><span className="text-slate-900 font-semibold text-right max-w-[60%]">{f.value}</span></div>)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BoldBandRenderer;
