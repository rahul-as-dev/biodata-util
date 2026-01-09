import React from 'react';
import { SectionBlock } from './DocumentLayout';

const ElegantSplitRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col">
            {/* Header Block: Uses primaryColor for background */}
            <div className="h-[280px] w-full p-10 flex items-center justify-between" style={{ backgroundColor: styles.primaryColor }}>
                <div className="text-white w-2/3">
                    {header.enabled && (<>
                        {header.icon && <header.icon className="h-26 w-26 mx-auto -mt-10 -mb-2.5 object-contain" style={{ color: styles.primaryColor }} />}                        <h1 className="text-4xl font-bold uppercase tracking-[0.2em] mb-4 text-white">{header.text}</h1>
                    </>)}
                    {overview?.enabled && overview.text && (<div className="text-white/90 text-sm italic border-l-2 border-white/40 pl-4">{overview.text}</div>)}
                </div>
                {photo && (<div className="bg-white p-2 shadow-xl rotate-2 transform transition-transform"><img src={photo} className="w-48 h-56 object-cover" alt="Profile" /></div>)}
            </div>
            {/* Body: Transparent background so paper color shows through */}
            <div className="flex-1 p-12 columns-1">
                {enabledSections.map(s => <SectionBlock key={s.id} section={s} styles={styles} />)}
            </div>
        </div>
    );
};

export default ElegantSplitRenderer;
