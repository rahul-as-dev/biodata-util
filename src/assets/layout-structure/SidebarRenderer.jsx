import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const SidebarRenderer = ({ biodata, styles, isRight = false }) => {
    const { header, photo, overview, sections, customizations } = biodata;
    const enabledSections = sections.filter(s => s.enabled);
    const sidebarSectionIds = ['contact'];
    const sidebarSections = enabledSections.filter(s => sidebarSectionIds.includes(s.id));
    const mainSections = enabledSections.filter(s => !sidebarSectionIds.includes(s.id));

    return (
        <div className={cn("relative z-10 h-full flex", isRight ? "flex-row-reverse" : "flex-row")}> 
            <div className="w-[32%] p-8 flex flex-col gap-6 border-r border-slate-200" style={{ backgroundColor: `${styles.primaryColor}10`, borderColor: `${styles.primaryColor}20` }}>
                {photo && ( <div className="flex justify-center mb-2"><img src={photo} className="w-40 h-40 object-cover shadow-md" style={{ borderColor: styles.primaryColor, borderWidth: '4px', borderRadius: customizations.imageShape === 'circle' ? '50%' : '6px' }} alt="Profile" /></div> )}
                {overview?.enabled && overview.text && ( <div className="text-center"><h3 className="text-xs font-bold uppercase tracking-widest mb-2 border-b border-slate-300/50 pb-1" style={{ color: styles.primaryColor }}>{overview.title}</h3><p className="text-sm text-slate-700 italic leading-relaxed">{overview.text}</p></div> )}
                <div className="flex-1 space-y-8">{sidebarSections.map(s => <SectionBlock key={s.id} section={s} styles={styles} />)}</div>
            </div>
            <div className="flex-1 p-10 pt-12">
                {header.enabled && ( <div className="mb-10 flex items-center gap-4 border-b border-slate-100 pb-6"><div><h1 className="text-3xl font-bold uppercase tracking-widest leading-tight" style={{ color: styles.primaryColor }}>{header.text}</h1></div></div> )}
                <div className="space-y-8">{mainSections.map(s => <SectionBlock key={s.id} section={s} styles={styles} />)}</div>
            </div>
        </div>
    );
};

export default SidebarRenderer;
