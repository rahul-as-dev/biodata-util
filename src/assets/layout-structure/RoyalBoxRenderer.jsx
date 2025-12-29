import React from 'react';
import { SectionBlock } from './DocumentLayout';

const RoyalBoxRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full p-8 flex flex-col">
            <div className="flex-1 border-[3px] border-double p-8 flex flex-col items-center" style={{ borderColor: styles.primaryColor }}>
                {header.enabled && ( <div className="text-center mb-6">{header.icon && <img src={header.icon} className="h-14 w-14 mx-auto mb-2 object-contain" alt="Icon" />}<h1 className="text-2xl font-serif font-bold uppercase tracking-widest" style={{ color: styles.primaryColor }}>{header.text}</h1><div className="w-24 h-0.5 mx-auto mt-2" style={{ backgroundColor: styles.primaryColor }}></div></div>)}
                {photo && <div className="mb-6 p-1 border rounded-full" style={{ borderColor: styles.primaryColor }}><img src={photo} className="w-32 h-32 rounded-full object-cover" alt="Profile" /></div>}
                {overview?.enabled && overview.text && <div className="text-center max-w-lg mb-8 italic text-sm text-slate-600">"{overview.text}"</div>}
                <div className="w-full grid grid-cols-1 gap-8">{enabledSections.map(s => <div key={s.id} className="text-center"><h3 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: styles.primaryColor }}>~ {s.title} ~</h3><div className="space-y-1">{s.fields.map(f => f.enabled && <div key={f.id} className="text-sm"><span className="text-slate-500 text-xs uppercase mr-2">{f.label}:</span><span className="font-medium text-slate-800">{f.value}</span></div>)}</div></div>)}</div>
            </div>
        </div>
    );
};

export default RoyalBoxRenderer;
