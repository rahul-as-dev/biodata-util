import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const ClassicRenderer = ({ biodata, styles, themeConfig }) => {
    const { header, photo, overview, sections, customizations } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col" style={{ paddingTop: themeConfig.styles.paddingTop || '3em', paddingBottom: themeConfig.styles.paddingBottom || '3em', paddingLeft: themeConfig.styles.paddingLeft || '6em', paddingRight: themeConfig.styles.paddingRight || '6em', color: styles.textColor, fontSize: styles.fontSize }}>
            {header.enabled && (
                <div className="text-center mb-[2em] pb-[0.5em] border-b-[0.15em]" style={{ borderColor: `${styles.primaryColor}` }}>
                    {header.icon && <header.icon className="h-[6em] w-[6em] mx-auto -mt-[3em] -mb-[0.2em]" style={{ color: styles.primaryColor }} />}
                    <h1 className="text-[1.8em] font-bold uppercase" style={{ color: styles.primaryColor }}>{header.text}</h1>
                </div>
            )}
            {photo && customizations.imagePlacement === 'above' && (
                <div className="flex justify-center mb-[0.5em] -mt-[1.5em]"><img src={photo} className="w-[12em] h-[12em] object-cover shadow-md" style={{ borderColor: styles.primaryColor, borderWidth: '0.2em', borderRadius: customizations.imageShape === 'circle' ? '50%' : '0.4em' }} alt="Profile" /></div>
            )}
            {overview?.enabled && overview.text && (
                <div className="mb-[0.5em] -mt-[0.5em] text-center px-[1em]"><p className="text-[1.1em] italic leading-relaxed" style={{ color: styles.textColor }}>{overview.text}</p></div>
            )}
            <div className="flex gap-[0.5em] flex-1">
                <div className="flex-1">
                    {enabledSections.map(section => <SectionBlock key={section.id} section={section} styles={styles} />)}
                </div>
                {photo && customizations.imagePlacement === 'right' && (
                    <div className="shrink-0"><img src={photo} className="w-[11em] h-[11em] object-cover shadow-md" style={{ borderColor: styles.primaryColor, borderWidth: '0.2em', borderRadius: customizations.imageShape === 'circle' ? '50%' : '0.4em' }} alt="Profile" /></div>
                )}
            </div>
        </div>
    );
};

export default ClassicRenderer;
