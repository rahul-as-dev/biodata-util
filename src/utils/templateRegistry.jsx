import React from 'react';
import { 
    AlignCenter, Sidebar as SidebarIcon, LayoutTemplate, 
    BoxSelect, Grid, GitCommitVertical, RectangleHorizontal, 
    PanelRight, CreditCard, Slash, Frame, Bookmark, Layers,
    PanelLeft, Table, Heading, LayoutList, StickyNote,
    Landmark, Waves, Flower2, Crown, Sun
} from 'lucide-react';
import { cn } from './cn';
import {
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
    DivineMandalaRenderer
} from '../assets/layout-structure/DocumentLayout';


export const LAYOUT_TEMPLATES = [
    { 
        id: 'template1', name: 'Classic Center', icon: <AlignCenter size={14} />, 
        Preview: () => <div className="w-full h-full flex flex-col items-center justify-start pt-2 gap-1"><div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 mb-1"/><div className="w-16 h-1 bg-slate-300 dark:bg-slate-500 rounded-full"/><div className="w-10 h-1 bg-slate-200 dark:bg-slate-600 rounded-full"/></div>,
        Renderer: ClassicRenderer 
    },
    { 
        id: 'template2', name: 'Modern Left', icon: <SidebarIcon size={14} />,
        Preview: ({isActive}) => <div className="w-full h-full flex"><div className={cn("w-[30%] h-full flex flex-col items-center pt-2 gap-1", isActive?"bg-brand-200 dark:bg-brand-900":"bg-slate-200")}></div><div className="w-[70%] h-full flex flex-col pt-2 pl-2 gap-1"><div className="w-12 h-1 bg-slate-300 rounded-full"/></div></div>,
        Renderer: (props) => <SidebarRenderer {...props} isRight={false} /> 
    },
    { 
        id: 'template3', name: 'Modern Right', icon: <SidebarIcon size={14} className="rotate-180" />, 
        Preview: ({isActive}) => <div className="w-full h-full flex flex-row-reverse"><div className={cn("w-[30%] h-full flex flex-col items-center pt-2 gap-1", isActive?"bg-brand-200 dark:bg-brand-900":"bg-slate-200")}></div><div className="w-[70%] h-full flex flex-col pt-2 pl-2 gap-1"><div className="w-12 h-1 bg-slate-300 rounded-full"/></div></div>,
        Renderer: (props) => <SidebarRenderer {...props} isRight={true} /> 
    },
    { 
        id: 'template4', name: 'Elegant Split', icon: <LayoutTemplate size={14} />, 
        Preview: ({isActive}) => <div className="w-full h-full flex flex-col"><div className={cn("w-full h-[30%]", isActive?"bg-brand-100 dark:bg-brand-900/50":"bg-slate-100")}></div></div>,
        Renderer: ElegantSplitRenderer 
    },
    { id: 'template5', name: 'Royal Box', icon: <BoxSelect size={14} />, Preview: ({isActive}) => <div className="w-full h-full p-1.5"><div className={cn("w-full h-full border-2 border-double", isActive?"border-brand-300":"border-slate-300")}></div></div>, Renderer: RoyalBoxRenderer },
    { id: 'template6', name: 'Smart Grid', icon: <Grid size={14} />, Preview: () => <div className="w-full h-full p-2"><div className="grid grid-cols-2 gap-1 h-full"><div className="bg-slate-100"/><div className="bg-slate-100"/></div></div>, Renderer: SmartGridRenderer },
    { id: 'template7', name: 'Chronicle', icon: <GitCommitVertical size={14} />, Preview: () => <div className="w-full h-full flex p-2"><div className="w-2 h-full border-r border-slate-300"></div></div>, Renderer: ChronicleRenderer },
    { id: 'template8', name: 'Bold Band', icon: <RectangleHorizontal size={14} />, Preview: ({isActive}) => <div className="w-full h-full pt-3"><div className={cn("w-full h-6", isActive?"bg-brand-200":"bg-slate-200")}></div></div>, Renderer: BoldBandRenderer },
    { id: 'template9', name: 'Profile Hero', icon: <PanelRight size={14} />, Preview: () => <div className="w-full h-full flex flex-col"><div className="flex h-[40%]"><div className="w-[40%] bg-slate-300"/></div></div>, Renderer: ProfileHeroRenderer },
    { id: 'template10', name: 'Swiss Clean', icon: <CreditCard size={14} />, Preview: () => <div className="w-full h-full p-2"><div className="w-full h-px bg-slate-300 my-2"></div></div>, Renderer: SwissCleanRenderer },
    { id: 'template11', name: 'Diagonal', icon: <Slash size={14} />, Preview: ({isActive}) => <div className="w-full h-full"><div className={cn("w-full h-[40%]", isActive?"bg-brand-200":"bg-slate-300")} style={{clipPath:'polygon(0 0, 100% 0, 100% 70%, 0% 100%)'}}></div></div>, Renderer: DiagonalRenderer },
    { id: 'template12', name: 'Classic Frame', icon: <Frame size={14} />, Preview: ({isActive}) => <div className="w-full h-full p-1"><div className={cn("w-full h-full border-2", isActive?"border-brand-300":"border-slate-300")}><div className="w-full h-full border border-dashed border-slate-200 m-0.5"></div></div></div>, Renderer: ClassicFrameRenderer },
    { id: 'template13', name: 'Ribbon Flow', icon: <Bookmark size={14} />, Preview: ({isActive}) => <div className="w-full h-full pl-4"><div className={cn("w-2 h-full", isActive?"bg-brand-300":"bg-slate-300")}></div></div>, Renderer: RibbonFlowRenderer },
    { id: 'template14', name: 'Stacked Card', icon: <Layers size={14} />, Preview: ({isActive}) => <div className="w-full h-full flex flex-col items-center pt-2"><div className={cn("w-[80%] h-4", isActive?"bg-brand-300":"bg-slate-300")}></div><div className="w-[90%] h-full bg-slate-100 -mt-1 shadow"></div></div>, Renderer: StackedCardRenderer },
    { 
        id: 'template15', name: 'Side Header', icon: <PanelLeft size={14} />, 
        Preview: ({isActive}) => <div className="w-full h-full flex"><div className={cn("w-[35%] h-full", isActive?"bg-brand-200":"bg-slate-300")}></div><div className="flex-1 p-1"><div className="w-full h-1 bg-slate-200 mb-1"/></div></div>, 
        Renderer: SideHeaderRenderer 
    },
    { 
        id: 'template16', name: 'Modern Cards', icon: <LayoutList size={14} />, 
        Preview: () => <div className="w-full h-full bg-slate-100 p-1 flex flex-col gap-1"><div className="w-full h-4 bg-white rounded"/><div className="grid grid-cols-2 gap-1"><div className="h-6 bg-white rounded"/><div className="h-6 bg-white rounded"/></div></div>, 
        Renderer: ModernCardsRenderer 
    },
    { 
        id: 'template17', name: 'Minimal Lines', icon: <Heading size={14} />, 
        Preview: ({isActive}) => <div className="w-full h-full flex flex-col pt-2 px-2 gap-2"><div className={cn("w-1/2 h-1 mx-auto", isActive?"bg-brand-400":"bg-slate-400")}/><div className="w-full h-px bg-slate-300"/><div className="w-full h-px bg-slate-300"/></div>, 
        Renderer: MinimalistLineRenderer 
    },
    { 
        id: 'template18', name: 'Left Strip', icon: <StickyNote size={14} />, 
        Preview: ({isActive}) => <div className="w-full h-full flex pl-1 pt-2"><div className={cn("w-1 h-full mr-1", isActive?"bg-brand-400":"bg-slate-400")}/><div className="flex-1 space-y-1"><div className="w-10 h-1 bg-slate-300"/><div className="w-8 h-1 bg-slate-200"/></div></div>, 
        Renderer: LeftStripRenderer 
    },
    { 
        id: 'template19', name: 'Boxed Elegance', icon: <Table size={14} />, 
        Preview: ({isActive}) => <div className="w-full h-full p-2"><div className={cn("w-full h-full border", isActive?"border-brand-300":"border-slate-300")}></div></div>, 
        Renderer: BoxedEleganceRenderer 
    },
    { 
        id: 'template20', name: 'Mahal Arch', icon: <Table size={14} />, 
        Preview: ({ isActive }) => (
            <div className="w-full h-full flex flex-col pt-1 px-1">
                <div 
                    className={cn("w-full h-1/2 rounded-t-full border-t-4 border-x-4", isActive ? "border-brand-300" : "border-slate-300")}
                    style={{ borderTopLeftRadius: '50%', borderTopRightRadius: '50%' }}
                />
                <div className={cn("w-full h-1/2 border-x-4 border-b-4", isActive ? "border-brand-300" : "border-slate-300")} />
            </div>
        ),
        Renderer: MahalArchRenderer 
    },
    { 
        id: 'template21', name: 'Royal Silk', icon: <Table size={14} />, 
        Preview: ({ isActive }) => (
            <div className="w-full h-full flex flex-col">
                <div className={cn("w-full h-[40%]", isActive ? "bg-brand-200" : "bg-slate-300")} style={{ borderRadius: '0 0 100% 0' }} />
            </div>
        ),
        Renderer: RoyalSilkRenderer
    },
    { 
        id: 'template22', name: 'Vedic Pillars', icon: <Table size={14} />, 
        Preview: ({ isActive }) => (
            <div className="w-full h-full flex justify-between px-1 py-2">
                <div className={cn("w-1 h-full", isActive ? "bg-brand-300" : "bg-slate-300")} />
                <div className="flex-1 flex flex-col items-center gap-1 pt-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200" />
                    <div className="w-12 h-1 bg-slate-300 rounded-full" />
                </div>
                <div className={cn("w-1 h-full", isActive ? "bg-brand-300" : "bg-slate-300")} />
            </div>
        ),
        Renderer: VedicPillarsRenderer
    },
    { 
        id: 'template23', name: 'Rajwada', icon: <Table size={14} />, 
        Preview: ({ isActive }) => (
            <div className="w-full h-full relative p-1">
                <div className={cn("absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2", isActive ? "border-brand-300" : "border-slate-300")} />
                <div className={cn("absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2", isActive ? "border-brand-300" : "border-slate-300")} />
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200" />
                </div>
            </div>
        ),
        Renderer: RajwadaRenderer
    },
    { 
        id: 'template24', name: 'Divine Mandala', icon: <Table size={14} />, 
        Preview: ({ isActive }) => (
            <div className="w-full h-full flex flex-col items-center relative overflow-hidden">
                <div className={cn("absolute -top-4 w-20 h-20 rounded-full opacity-20 border-2 border-dashed", isActive ? "border-brand-500" : "border-slate-500")} />
                <div className="mt-8 w-10 h-1 bg-slate-300 rounded-full" />
                <div className="mt-1 w-6 h-6 bg-slate-200 rounded-full" />
            </div>
        ),
        Renderer: DivineMandalaRenderer
    },
];