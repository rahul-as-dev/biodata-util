import React from 'react';
import { 
    AlignCenter, Sidebar as SidebarIcon, LayoutTemplate, 
    BoxSelect, Grid, GitCommitVertical, RectangleHorizontal, 
    PanelRight, CreditCard, Slash, Frame, Bookmark, Layers 
} from 'lucide-react';
import { cn } from './cn';

// --- HELPER COMPONENT ---
// Standardizes how section titles and fields look across most templates
const SectionBlock = ({ section, styles, isGrid = false, isTimeline = false }) => (
    <div key={section.id} className={cn("break-inside-avoid mb-6", isGrid ? "mb-4" : "")}>
        <div className={cn("mb-2", isTimeline ? "flex items-center gap-3" : "text-left")}>
            {isTimeline && (
                <div className="w-3 h-3 rounded-full shrink-0 outline outline-2 outline-offset-2" style={{ backgroundColor: styles.primaryColor, outlineColor: styles.primaryColor }}></div>
            )}
            <h2 
                className="text-xs font-bold uppercase tracking-widest inline-block border-b-2 pb-1"
                style={{ 
                    color: styles.primaryColor, 
                    borderColor: `${styles.primaryColor}60`
                }}
            >
                {section.title}
            </h2>
        </div>
        <div className={cn("flex flex-col space-y-1.5", isTimeline ? "pl-6 border-l-2 ml-1.5" : "")} style={{ borderColor: isTimeline ? `${styles.primaryColor}20` : 'transparent' }}>
            {section.fields.map(f => f.enabled && (
                <div key={f.id} className="flex items-baseline text-sm">
                    <span className="w-1/3 text-slate-500 text-[10px] font-bold uppercase tracking-wide shrink-0">
                        {f.showLabel ? f.label : ''}
                    </span>
                    <span className="w-2/3 font-medium text-slate-900 break-words whitespace-pre-wrap">
                        {f.value}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

// --- RENDERERS ---

const ClassicRenderer = ({ biodata, styles, themeConfig }) => {
    const { header, photo, overview, sections, customizations } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col p-[40px] pt-[60px]" style={{ paddingLeft: themeConfig.styles.paddingHorizontal, paddingRight: themeConfig.styles.paddingHorizontal }}>
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
                <div className="mb-8 text-center px-4"><p className="text-sm italic text-slate-600">{overview.text}</p></div>
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

const SidebarRenderer = ({ biodata, styles, isRight = false }) => {
    const { header, photo, overview, sections, customizations } = biodata;
    const enabledSections = sections.filter(s => s.enabled);
    const sidebarSectionIds = ['personal', 'contact'];
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

const ElegantSplitRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col">
            {/* Header Block: Uses primaryColor for background */}
            <div className="h-[280px] w-full p-10 flex items-center justify-between" style={{ backgroundColor: styles.primaryColor }}>
                <div className="text-white w-2/3">
                    {header.enabled && ( <> {header.icon && <img src={header.icon} className="h-16 w-16 mb-4 brightness-0 invert opacity-90" alt="Icon" />} <h1 className="text-4xl font-bold uppercase tracking-[0.2em] mb-4 text-white">{header.text}</h1> </> )}
                    {overview?.enabled && overview.text && ( <div className="text-white/90 text-sm italic border-l-2 border-white/40 pl-4">{overview.text}</div> )}
                </div>
                {photo && ( <div className="bg-white p-2 shadow-xl rotate-2 transform transition-transform"><img src={photo} className="w-48 h-56 object-cover" alt="Profile" /></div> )}
            </div>
            {/* Body: Transparent background so paper color shows through */}
            <div className="flex-1 p-12 columns-1">
                {enabledSections.map(s => <SectionBlock key={s.id} section={s} styles={styles} />)}
            </div>
        </div>
    );
};

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

const SmartGridRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full p-10 pt-12 flex flex-col">
            <div className="flex items-start justify-between mb-10 border-b-2 pb-6" style={{ borderColor: styles.primaryColor }}>
                <div className="flex-1">
                    {header.enabled && <h1 className="text-4xl font-bold uppercase tracking-tighter" style={{ color: styles.primaryColor }}>{header.text}</h1>}
                    {overview?.enabled && overview.text && <p className="mt-4 text-slate-600 max-w-md text-sm leading-relaxed">{overview.text}</p>}
                </div>
                {photo && <img src={photo} className="w-32 h-32 object-cover rounded-lg shadow-sm" style={{ boxShadow: `4px 4px 0px ${styles.primaryColor}40` }} alt="Profile" />}
            </div>
            <div className="columns-2 gap-8 space-y-8">
                {enabledSections.map(s => (
                    <div key={s.id} className="break-inside-avoid bg-white/50 p-5 rounded-xl border border-slate-200" style={{ borderLeft: `4px solid ${styles.primaryColor}` }}>
                        <h3 className="text-sm font-bold uppercase tracking-wide mb-4 text-slate-800">{s.title}</h3>
                        <div className="space-y-2">{s.fields.map(f => f.enabled && <div key={f.id} className="flex flex-col"><span className="text-[10px] font-bold text-slate-400 uppercase">{f.label}</span><span className="text-sm font-medium text-slate-900">{f.value}</span></div>)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ChronicleRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full p-10 pt-14 flex flex-col">
            <div className="text-center mb-10">
                {photo && <img src={photo} className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg" alt="Profile" />}
                {header.enabled && <h1 className="text-3xl font-serif font-bold" style={{ color: styles.primaryColor }}>{header.text}</h1>}
                {overview?.enabled && overview.text && <p className="text-slate-500 text-sm mt-2">{overview.text}</p>}
            </div>
            <div className="flex-1 ml-4 relative">
                <div className="absolute top-0 bottom-0 left-[5px] w-0.5 bg-slate-300/50"></div>
                <div className="space-y-8">{enabledSections.map(s => <div key={s.id} className="relative pl-8"><div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-white shadow-sm z-10" style={{ backgroundColor: styles.primaryColor }}></div><h3 className="text-md font-bold uppercase tracking-wider mb-3" style={{ color: styles.primaryColor }}>{s.title}</h3><div className="grid grid-cols-1 gap-y-1.5">{s.fields.map(f => f.enabled && <div key={f.id} className="flex gap-4"><span className="w-32 text-xs font-semibold text-slate-500 text-right shrink-0">{f.label}</span><span className="flex-1 text-sm font-medium text-slate-900">{f.value}</span></div>)}</div></div>)}</div>
            </div>
        </div>
    );
};

const BoldBandRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col pt-12">
            <div className="w-full py-8 px-10 flex items-center justify-between mb-8 shadow-sm" style={{ backgroundColor: styles.primaryColor }}>
                <div className="text-white">
                    {header.enabled && <h1 className="text-4xl font-bold uppercase tracking-wide">{header.text}</h1>}
                    {overview?.enabled && overview.text && <p className="text-white/80 text-sm mt-2 max-w-lg">{overview.text}</p>}
                </div>
                {photo && <div className="w-32 h-32 bg-white p-1 rounded-full shadow-lg -mb-20 z-20 relative"><img src={photo} className="w-full h-full rounded-full object-cover" alt="Profile" /></div>}
            </div>
            <div className="flex-1 p-10 pt-16 columns-2 gap-10">
                {enabledSections.map(s => (
                    <div key={s.id} className="break-inside-avoid mb-8">
                        <div className="flex items-center gap-2 mb-3 border-b pb-2" style={{ borderColor: `${styles.primaryColor}30` }}>
                            <span style={{ color: styles.primaryColor }}>•</span>
                            <h3 className="text-sm font-bold uppercase" style={{ color: styles.primaryColor }}>{s.title}</h3>
                        </div>
                        <div className="space-y-2">{s.fields.map(f => f.enabled && <div key={f.id} className="flex justify-between items-baseline text-sm"><span className="text-slate-500 font-medium">{f.label}</span><span className="text-slate-900 font-semibold text-right max-w-[60%]">{f.value}</span></div>)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProfileHeroRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col">
            <div className="flex h-[35%]">
                <div className="w-[40%] relative bg-slate-200">
                    {photo ? <img src={photo} className="w-full h-full object-cover" alt="Profile" /> : <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">No Photo</div>}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <div className="text-white">{header.enabled && <h1 className="text-2xl font-bold uppercase leading-tight">{header.text}</h1>}</div>
                    </div>
                </div>
                <div className="w-[60%] p-8 flex flex-col justify-center" style={{ backgroundColor: `${styles.primaryColor}15` }}>
                    {overview?.enabled && overview.text && <div className="border-l-4 pl-4" style={{ borderColor: styles.primaryColor }}><h3 className="text-xs font-bold uppercase mb-2 text-slate-500">{overview.title || 'Introduction'}</h3><p className="text-lg font-serif italic text-slate-800 leading-relaxed">{overview.text}</p></div>}
                </div>
            </div>
            <div className="flex-1 p-10 columns-2 gap-10">
                {enabledSections.map(s => (
                    <div key={s.id} className="break-inside-avoid mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 bg-white/60 inline-block px-2 py-1 rounded" style={{ color: styles.primaryColor }}>{s.title}</h3>
                        <div className="space-y-2">{s.fields.map(f => f.enabled && <div key={f.id} className="grid grid-cols-12 gap-2 text-sm"><span className="col-span-4 text-slate-400 font-bold uppercase text-[10px] pt-0.5">{f.label}</span><span className="col-span-8 text-slate-900 font-medium">{f.value}</span></div>)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SwissCleanRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full p-12 flex flex-col">
            <div className="flex justify-between items-start mb-8 border-b-4 pb-6" style={{ borderColor: styles.primaryColor }}>
                <div className="flex-1 pr-8">
                    {header.enabled && ( <> <h1 className="text-5xl font-bold uppercase tracking-tighter leading-none mb-4" style={{ color: styles.primaryColor }}>{header.text}</h1> {header.icon && <img src={header.icon} className="h-10 w-10 object-contain opacity-70" alt="Icon" />} </> )}
                    {overview?.enabled && overview.text && <p className="mt-4 text-slate-600 text-sm font-medium max-w-md">{overview.text}</p>}
                </div>
                {photo && <img src={photo} className="w-32 h-40 object-cover grayscale contrast-125" alt="Profile" />}
            </div>
            <div className="columns-2 gap-12 flex-1">
                {enabledSections.map(s => (
                    <div key={s.id} className="break-inside-avoid mb-10">
                        <h3 className="text-lg font-bold uppercase mb-3 flex items-center gap-2"><span className="w-4 h-1" style={{ backgroundColor: styles.primaryColor }}></span>{s.title}</h3>
                        <div className="space-y-2">{s.fields.map(f => f.enabled && <div key={f.id} className="group"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{f.label}</span><div className="text-sm font-medium text-slate-900 border-b border-slate-200/50 pb-1">{f.value}</div></div>)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const DiagonalRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col">
            <div className="absolute top-0 left-0 w-full h-[350px] z-0" style={{ backgroundColor: styles.primaryColor, clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0% 100%)' }} />
            <div className="relative z-10 p-12">
                <div className="flex gap-8 items-center mb-12">
                    {photo && <div className="p-1 bg-white rounded-full shadow-xl"><img src={photo} className="w-40 h-40 rounded-full object-cover" alt="Profile" /></div>}
                    <div className="text-white flex-1">
                        {header.enabled && <h1 className="text-4xl font-bold uppercase tracking-widest drop-shadow-md">{header.text}</h1>}
                        {overview?.enabled && overview.text && <p className="mt-2 text-white/90 font-medium italic opacity-90 border-l-4 border-white/30 pl-3">{overview.text}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                    {enabledSections.map(s => (
                        <div key={s.id} className="break-inside-avoid bg-white/90 p-6 rounded-lg shadow-sm border border-slate-100">
                            <div className="flex items-center gap-2 mb-4 border-b pb-2" style={{ borderColor: `${styles.primaryColor}20` }}>
                                <div className="p-1.5 rounded text-white" style={{ backgroundColor: styles.primaryColor }}><span className="text-[10px] font-bold">{s.title.substring(0,2)}</span></div>
                                <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: styles.primaryColor }}>{s.title}</h3>
                            </div>
                            <div className="space-y-2">{s.fields.map(f => f.enabled && <div key={f.id} className="flex justify-between text-sm"><span className="text-slate-500 font-medium">{f.label}</span><span className="text-slate-900 font-semibold text-right">{f.value}</span></div>)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ClassicFrameRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full p-6 flex flex-col">
            <div className="flex-1 border-[3px] p-1" style={{ borderColor: styles.primaryColor }}>
                <div className="h-full w-full border border-dashed p-8 flex flex-col items-center" style={{ borderColor: styles.primaryColor }}>
                    {header.enabled && <div className="text-center mb-8">{header.icon && <img src={header.icon} className="h-12 w-12 mx-auto mb-2" alt="Icon" />}<h1 className="text-3xl font-serif font-bold uppercase tracking-widest text-slate-800">{header.text}</h1><div className="w-16 h-1 mx-auto mt-3" style={{ backgroundColor: styles.primaryColor }} /></div>}
                    <div className="flex gap-10 w-full flex-1">
                        <div className="w-1/3 flex flex-col items-center text-center">
                            {photo && <div className="p-1 border rounded-full mb-6" style={{ borderColor: styles.primaryColor }}><img src={photo} className="w-40 h-40 rounded-full object-cover" alt="Profile" /></div>}
                            {overview?.enabled && overview.text && <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/50"><p className="text-sm italic text-slate-600 font-serif leading-relaxed">"{overview.text}"</p></div>}
                        </div>
                        <div className="flex-1 space-y-8">{enabledSections.map(s => <div key={s.id}><h3 className="text-center text-sm font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2" style={{ color: styles.primaryColor, borderColor: `${styles.primaryColor}30` }}>{s.title}</h3><div className="space-y-2">{s.fields.map(f => f.enabled && <div key={f.id} className="grid grid-cols-12 gap-2 text-sm"><span className="col-span-4 text-slate-500 font-serif italic text-right pr-2">{f.label}</span><span className="col-span-8 text-slate-900 font-medium">{f.value}</span></div>)}</div></div>)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RibbonFlowRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex">
            <div className="w-16 h-full flex flex-col items-center pt-10" style={{ backgroundColor: styles.primaryColor }}>
                {header.icon && <img src={header.icon} className="h-10 w-10 brightness-0 invert opacity-80" alt="Icon" />}
                <div className="flex-1 w-px bg-white/20 my-6"></div>
            </div>
            <div className="flex-1 p-12 flex flex-col">
                <div className="flex items-center gap-8 mb-10">
                    {photo && <img src={photo} className="w-32 h-32 rounded-lg object-cover shadow-lg" alt="Profile" />}
                    <div>
                        {header.enabled && <h1 className="text-4xl font-bold uppercase text-slate-900 tracking-tight">{header.text}</h1>}
                        {overview?.enabled && overview.text && <div className="mt-3 flex items-start gap-2"><div className="w-1 h-full min-h-[2rem]" style={{ backgroundColor: styles.primaryColor }}></div><p className="text-sm text-slate-600">{overview.text}</p></div>}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-10">{enabledSections.map(s => <div key={s.id} className="relative pl-6"><div className="absolute left-0 top-1 w-1 h-4" style={{ backgroundColor: styles.primaryColor }}></div><h3 className="text-lg font-bold uppercase tracking-wider mb-4 text-slate-800">{s.title}</h3><div className="grid grid-cols-2 gap-x-8 gap-y-3">{s.fields.map(f => f.enabled && <div key={f.id} className="flex flex-col border-l pl-3 border-slate-200"><span className="text-[10px] text-slate-400 font-bold uppercase">{f.label}</span><span className="text-sm font-medium text-slate-900">{f.value}</span></div>)}</div></div>)}</div>
            </div>
        </div>
    );
};

const StackedCardRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full p-8 flex flex-col items-center">
            <div className="w-full h-48 rounded-t-3xl shadow-sm flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: styles.primaryColor }}>
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
                <div className="absolute right-20 bottom-10 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="text-center text-white z-10">{header.enabled && <h1 className="text-3xl font-bold uppercase tracking-widest">{header.text}</h1>}</div>
            </div>
            <div className="w-[90%] flex-1 bg-white/95 -mt-12 rounded-t-lg shadow-2xl p-10 relative z-20 flex flex-col backdrop-blur-sm">
                {photo && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"><img src={photo} className="w-36 h-36 rounded-full object-cover border-8 border-white shadow-md" alt="Profile" /></div>}
                <div className="mt-16 text-center mb-10">{overview?.enabled && overview.text && <p className="text-slate-500 italic max-w-lg mx-auto">{overview.text}</p>}</div>
                <div className="grid grid-cols-1 gap-12">{enabledSections.map(s => <div key={s.id} className="break-inside-avoid"><div className="flex items-center gap-4 mb-6"><div className="flex-1 h-px bg-slate-200"></div><h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 px-4 py-1 border rounded-full" style={{ borderColor: styles.primaryColor, color: styles.primaryColor }}>{s.title}</h3><div className="flex-1 h-px bg-slate-200"></div></div><div className="grid grid-cols-2 gap-x-12 gap-y-4 px-8">{s.fields.map(f => f.enabled && <div key={f.id} className="flex justify-between items-baseline border-b border-slate-50 pb-1"><span className="text-xs font-bold text-slate-400 uppercase">{f.label}</span><span className="text-sm font-medium text-slate-900 text-right">{f.value}</span></div>)}</div></div>)}</div>
            </div>
        </div>
    );
};

// --- EXPORT ---

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
    { id: 'template14', name: 'Stacked Card', icon: <Layers size={14} />, Preview: ({isActive}) => <div className="w-full h-full flex flex-col items-center pt-2"><div className={cn("w-[80%] h-4", isActive?"bg-brand-300":"bg-slate-300")}></div><div className="w-[90%] h-full bg-slate-100 -mt-1 shadow"></div></div>, Renderer: StackedCardRenderer }
];