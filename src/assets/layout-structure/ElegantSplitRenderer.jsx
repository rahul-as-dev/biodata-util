import React from 'react';
import { SectionBlock } from './DocumentLayout';

const ElegantSplitRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col" style={{ color: styles.textColor, fontSize: styles.fontSize }}>
            {/* Header Block: Uses primaryColor for background */}
            <div className="w-full flex items-center justify-between" style={{ backgroundColor: styles.primaryColor, height: '17.5em', padding: '2.5em' }}>
                <div className="w-2/3" style={{ color: '#fff' }}>
                    {header.enabled && (<>
                        {header.icon && <header.icon className="mx-auto object-contain" style={{ height: '5em', width: '5em', marginTop: '-1.5em', marginBottom: '-0.3em', color: '#fff' }} />}
                        <h1 className="font-bold uppercase tracking-[0.2em]" style={{ fontSize: '2.25em', marginBottom: '0.5em' }}>{header.text}</h1>
                    </>)}
                    {overview?.enabled && overview.text && (
                        <div className="italic border-l-2 border-white/40" style={{ fontSize: '0.875em', paddingLeft: '1em', opacity: 0.9 }}>{overview.text}</div>
                    )}
                </div>
                {photo && (
                    <div className="bg-white shadow-xl rotate-2 transform transition-transform" style={{ padding: '0.5em' }}>
                        <img src={photo} className="object-cover" style={{ width: '12em', height: '14em' }} alt="Profile" />
                    </div>
                )}
            </div>
            {/* Body: Transparent background so paper color shows through */}
            <div className="flex-1" style={{ padding: '3em' }}>
                {enabledSections.map(s => <SectionBlock key={s.id} section={s} styles={styles} />)}
            </div>
        </div>
    );
};

export default ElegantSplitRenderer;
