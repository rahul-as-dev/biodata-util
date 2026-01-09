import React from 'react';
import ClassicRenderer from './ClassicRenderer';
import SidebarRenderer from './SidebarRenderer';
import ElegantSplitRenderer from './ElegantSplitRenderer';
import RoyalBoxRenderer from './RoyalBoxRenderer';
import SmartGridRenderer from './SmartGridRenderer';
import ChronicleRenderer from './ChronicleRenderer';
import BoldBandRenderer from './BoldBandRenderer';
import ProfileHeroRenderer from './ProfileHeroRenderer';
import SwissCleanRenderer from './SwissCleanRenderer';
import DiagonalRenderer from './DiagonalRenderer';
import ClassicFrameRenderer from './ClassicFrameRenderer';
import RibbonFlowRenderer from './RibbonFlowRenderer';
import StackedCardRenderer from './StackedCardRenderer';
import SideHeaderRenderer from './SideHeaderRenderer';
import ModernCardsRenderer from './ModernCardsRenderer';
import MinimalistLineRenderer from './MinimalistLineRenderer';
import LeftStripRenderer from './LeftStripRenderer';
import BoxedEleganceRenderer from './BoxedEleganceRenderer';
import MahalArchRenderer from './MahalArchRenderer';
import RoyalSilkRenderer from './RoyalSilkRenderer';
import VedicPillarsRenderer from './VedicPillarsRenderer';
import RajwadaRenderer from './RajwadaRenderer';
import DivineMandalaRenderer from './DivineMandalaRenderer';
import { PalaceRenderer } from './PalaceRenderer';


// Standardizes how section titles and fields look across most templates
export const SectionBlock = ({ section, styles, isGrid = false, isTimeline = false }) => (
    <div key={section.id} className={"break-inside-avoid mb-6" + (isGrid ? " mb-4" : "") }>
        <div className={"mb-2" + (isTimeline ? " flex items-center gap-3" : " text-left") }>
            {isTimeline && (
                <div className="w-3 h-3 rounded-full shrink-0 outline outline-2 outline-offset-2" style={{ backgroundColor: styles.primaryColor, outlineColor: styles.primaryColor }}></div>
            )}
            <div
                className="text-xs font-bold uppercase tracking-widest inline-block border-b-2 pb-1"
                style={{ 
                    color: styles.primaryColor,
                    borderColor: `${styles.primaryColor}60`,
                    fontSize: `calc(${styles.fontSize} + 3px)`
                }}
            >
                {section.title}
            </div>
        </div>
        <div className={"flex flex-col space-y-1.5" + (isTimeline ? " pl-6 border-l-2 ml-1.5" : "")} style={{ borderColor: isTimeline ? `${styles.primaryColor}20` : 'transparent', color: styles.textColor, fontSize: styles.fontSize }}>
            {section.fields.map(f => f.enabled && (
                <div key={f.id} className="flex items-baseline text-sm" style={{ color: styles.textColor, fontSize: styles.fontSize }}>
                    <span className="w-1/3 text-[10px] font-bold uppercase tracking-wide shrink-0" style={{ color: styles.textColor, fontSize: `calc(${styles.fontSize} - 2px)` }}>
                        {f.showLabel ? f.label : ''}
                    </span>
                    <span className="w-2/3 font-medium break-words whitespace-pre-wrap" style={{ color: styles.textColor, fontSize: styles.fontSize }}>
                        {f.value}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

export {
    ClassicRenderer,
    SidebarRenderer,
    ElegantSplitRenderer,
    RoyalBoxRenderer,
    SmartGridRenderer,
    ChronicleRenderer,
    BoldBandRenderer,
    ProfileHeroRenderer,
    SwissCleanRenderer,
    DiagonalRenderer,
    ClassicFrameRenderer,
    RibbonFlowRenderer,
    StackedCardRenderer,
    SideHeaderRenderer,
    ModernCardsRenderer,
    MinimalistLineRenderer,
    LeftStripRenderer,
    BoxedEleganceRenderer,
    MahalArchRenderer,
    RoyalSilkRenderer,
    VedicPillarsRenderer,
    RajwadaRenderer,
    DivineMandalaRenderer,
    PalaceRenderer
};
