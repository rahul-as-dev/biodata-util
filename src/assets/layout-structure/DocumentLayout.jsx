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
    <div key={section.id} className="break-inside-avoid" style={{ marginBottom: isGrid ? '1.2em' : '1.8em' }}>
        <div style={{ marginBottom: '0.6em', textAlign: 'left', display: isTimeline ? 'flex' : 'block', alignItems: 'center', gap: '0.2em' }}>
            {isTimeline && (
                <div className="rounded-full shrink-0 outline-[0.1em] outline-offset-[0.1em]" style={{ width: '0.6em', height: '0.6em', backgroundColor: styles.primaryColor, outlineColor: styles.primaryColor }}></div>
            )}
            <div
                className="font-bold uppercase tracking-widest inline-block border-b-[0.15em]"
                style={{
                    color: styles.primaryColor,
                    borderColor: `${styles.primaryColor}70`,
                    fontSize: '1.2em',
                    paddingBottom: '0.15em'
                }}
            >
                {section.title}
            </div>
        </div>
        <div
            className="flex flex-col"
            style={{
                rowGap: '0.2em',
                paddingLeft: isTimeline ? '1.2em' : '0',
                borderLeft: isTimeline ? '0.12em solid' : 'none',
                marginLeft: isTimeline ? '0.3em' : '0',
                borderColor: `${styles.primaryColor}20`,
            }}
        >
            {section.fields.map(f => f.enabled && (
                <div key={f.id} className="flex items-baseline" style={{ fontSize: '1em' }}>
                    <span className="w-1/3 font-bold uppercase tracking-wide shrink-0" style={{ fontSize: '0.75em', opacity: 0.7 }}>
                        {f.showLabel ? f.label : ''}
                    </span>
                    <span className="w-2/3 font-medium overflow-wrap-anywhere whitespace-pre-wrap">
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
