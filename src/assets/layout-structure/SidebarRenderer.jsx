import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const SidebarRenderer = ({ biodata, styles, themeConfig, isRight = false }) => {
    const { header, photo, overview, sections, customizations } = biodata;
    const enabledSections = sections.filter(s => s.enabled);
    const sidebarSectionIds = ['contact'];
    const sidebarSections = enabledSections.filter(s => sidebarSectionIds.includes(s.id));
    const mainSections = enabledSections.filter(s => !sidebarSectionIds.includes(s.id));

    return (
        <div className={cn("relative z-10 h-full flex", isRight ? "flex-row-reverse pl-16 pr-8" : "flex-row pr-2")} style={{ color: styles.textColor, fontSize: styles.fontSize }}>
            <div className="flex flex-col border-r" style={{ width: '32%', padding: '2em', gap: '1.5em', backgroundColor: `${styles.primaryColor}08`, borderColor: `${styles.primaryColor}20` }}>
                {photo && (
                    <div className="flex justify-center" style={{ marginBottom: '0.5em' }}>
                        <img src={photo} className="object-cover shadow-md" style={{ width: '10em', height: '10em', borderColor: styles.primaryColor, borderWidth: '0.25em', borderRadius: customizations.imageShape === 'circle' ? '50%' : '0.4em' }} alt="Profile" />
                    </div>
                )}
                {overview?.enabled && overview.text && (
                    <div className="text-center mt-10">
                        <h3 className="font-bold uppercase tracking-widest border-b-2" style={{ fontSize: '0.75em', marginBottom: '0.5em', color: styles.primaryColor, paddingBottom: '0.25em', borderColor: `${styles.primaryColor}` }}>{overview.title}</h3>
                        <p className="italic leading-relaxed font-bold" style={{ fontSize: '0.875em'}}>{overview.text}</p>
                    </div>
                )}
                <div className="flex-1 flex flex-col mt-10" style={{ gap: '2em' }}>
                    {sidebarSections.map(s => <SectionBlock key={s.id} section={s} styles={styles} />)}
                </div>
            </div>
            <div className="flex-1 flex flex-col" style={{ padding: '3em 1em 1em 1em' }}>
                {header.enabled && (
                    <div className="text-center border-b-2" style={{ marginBottom: '2em', paddingBottom: '0.3em', borderColor: styles.primaryColor }}>
                        {header.icon && <header.icon className="mx-auto" style={{ height: '6em', width: '6em', marginTop: '-2em', marginBottom: '-0.2em', color: styles.primaryColor }} />}
                        <h1 className="font-bold uppercase tracking-wider" style={{ fontSize: '1.8em', color: styles.primaryColor }}>{header.text}</h1>
                    </div>
                )}
                <div className="flex flex-col" style={{ gap: '2em' }}>
                    {mainSections.map(s => <SectionBlock key={s.id} section={s} styles={styles} />)}
                </div>
            </div>
        </div>
    );
};

export default SidebarRenderer;
