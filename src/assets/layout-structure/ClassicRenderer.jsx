import React from 'react';
import { SectionBlock } from './DocumentLayout';
import { cn } from '../../utils/cn';

const ClassicRenderer = ({ biodata, styles, themeConfig }) => {
    const { header, photo, overview, sections, customizations } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col p-[40px] pt-[60px]" style={{ paddingLeft: themeConfig.styles.paddingHorizontal, paddingRight: themeConfig.styles.paddingHorizontal, color: styles.textColor }}>
            {header.enabled && (
                <div className="text-center mb-8 pb-4 border-b" style={{ borderColor: `${styles.primaryColor}40` }}>
                    {header.icon && <img src={header.icon} className="h-16 w-16 mx-auto mb-3 object-contain" alt="Icon" />}
                    <h1 className="text-3xl font-bold uppercase tracking-widest" style={{ color: styles.primaryColor }}>{header.text}</h1>
                </div>
            )}
            {photo && customizations.imagePlacement === 'above' && (
                <div className="flex justify-center mb-8"><img src={photo} className="w-40 h-40 object-cover shadow-md" style={{ borderColor: styles.primaryColor, borderWidth: '3px', borderRadius: customizations.imageShape === 'circle' ? '50%' : '6px' }} alt="Profile" /></div>
            )}
            {overview?.enabled && overview.text && (
                <div className="mb-8 text-center px-4"><p className="text-sm italic" style={{ color: styles.textColor }}>{overview.text}</p></div>
            )}
            <div className="flex gap-8 flex-1">
                <div className="flex-1">
                    {enabledSections.map(section => <SectionBlock key={section.id} section={section} styles={styles} />)}
                </div>
                {photo && customizations.imagePlacement === 'right' && (
                    <div className="shrink-0"><img src={photo} className="w-36 h-36 object-cover shadow-md" style={{ borderColor: styles.primaryColor, borderWidth: '3px', borderRadius: customizations.imageShape === 'circle' ? '50%' : '6px' }} alt="Profile" /></div>
                )}
            </div>
        </div>
    );
};

export default ClassicRenderer;
