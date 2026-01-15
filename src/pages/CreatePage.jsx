import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useIsDesktop } from '../hooks/useIsDesktop';
import { useBiodata } from '../contexts/BiodataContext';
import { useTheme } from '../contexts/ThemeContext';
import BiodataPreview from '../components/BiodataPreview';
import PhotoUpload from '../components/Forms/PhotoUpload';
import Sidebar from '../components/Layouts/Sidebar';
import DraggableList from '../components/common/DraggableList';
import { cn } from '../utils/cn';
import { generatePdf } from '../utils/PDFGenerator';

import Plus from 'lucide-react/dist/esm/icons/plus';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import Eye from 'lucide-react/dist/esm/icons/eye';
import EyeOff from 'lucide-react/dist/esm/icons/eye-off';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import Image from 'lucide-react/dist/esm/icons/image';
import PaletteIcon from 'lucide-react/dist/esm/icons/palette';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import GripVertical from 'lucide-react/dist/esm/icons/grip-vertical';
import ArrowUp from 'lucide-react/dist/esm/icons/arrow-up';
import ArrowDown from 'lucide-react/dist/esm/icons/arrow-down';
import ZoomIn from 'lucide-react/dist/esm/icons/zoom-in';
import ZoomOut from 'lucide-react/dist/esm/icons/zoom-out';
import Maximize from 'lucide-react/dist/esm/icons/maximize';
import Minimize2 from 'lucide-react/dist/esm/icons/minimize-2';
import Maximize2 from 'lucide-react/dist/esm/icons/maximize-2';
import Download from 'lucide-react/dist/esm/icons/download';
import { motion, AnimatePresence } from 'framer-motion';
import { EnchantedFireflies as PreviewTheme } from '../assets/background-theme/EnchantedFireflies';
import { DottedEditorTheme as EditorTheme } from '../assets/background-theme/DottedEditorTheme';

// --- FieldEditor ---
const FieldEditor = ({ sectionId, field }) => {
    const { updateFieldValue, updateFieldLabel, toggleFieldEnabled, removeField } = useBiodata();
    return (
        <div className={cn("grid grid-cols-12 gap-3 items-start p-3 rounded-lg border transition-all relative z-10 group/field", field.enabled ? "bg-white/40 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:bg-white/60 dark:hover:bg-slate-800/60 backdrop-blur-sm shadow-sm" : "bg-slate-50/30 dark:bg-slate-900/30 border-dashed border-slate-300 opacity-60")}>
            <div className="col-span-4 sm:col-span-3">
                <input type="text" value={field.label} onChange={(e) => updateFieldLabel(sectionId, field.id, e.target.value)} className="w-full text-xs font-bold uppercase text-slate-500 bg-transparent border-b border-transparent focus:border-rose-500 focus:text-rose-600 outline-none pb-1 transition-colors" placeholder="LABEL" />
            </div>
            <div className="col-span-6 sm:col-span-7">
                {field.type === 'textarea' ? (
                    <textarea rows={2} value={field.value} onChange={(e) => updateFieldValue(sectionId, field.id, e.target.value)} className="w-full text-sm text-slate-800 dark:text-slate-200 bg-transparent outline-none resize-y placeholder:text-slate-400 font-medium" placeholder="Details..." />
                ) : (
                    <input type="text" value={field.value} onChange={(e) => updateFieldValue(sectionId, field.id, e.target.value)} className="w-full text-sm text-slate-800 dark:text-slate-200 bg-transparent outline-none placeholder:text-slate-400 font-medium" placeholder="Value..." />
                )}
            </div>
            <div className="col-span-2 flex justify-end gap-1 opacity-0 group-hover/field:opacity-100 transition-opacity">
                <button onClick={() => toggleFieldEnabled(sectionId, field.id)} className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors">{field.enabled ? <Eye size={14} /> : <EyeOff size={14} />}</button>
                <button onClick={() => removeField(sectionId, field.id)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
            </div>
        </div>
    );
};

// --- SectionEditor ---
const SectionEditor = ({ section, isFirst, isLast, onMoveUp, onMoveDown }) => {
    const { updateBiodata, addField, removeSection, toggleSectionEnabled } = useBiodata();
    const [isExpanded, setIsExpanded] = useState(true);
    const onFieldOrderChange = (newFields) => { updateBiodata(draft => { const s = draft.sections.find(sec => sec.id === section.id); if (s) s.fields = newFields; }); };

    return (
        <div className={cn("rounded-xl overflow-hidden mb-4 transition-all hover:shadow-lg group relative z-10", "bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 shadow-sm")}>
            <div className="flex items-center gap-2 p-3 border-b border-slate-200/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40">
                <button onClick={() => setIsExpanded(!isExpanded)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                    <ChevronRight size={18} className={cn("transition-transform duration-200", isExpanded && "rotate-90")} />
                </button>
                <input value={section.title} onChange={(e) => updateBiodata(d => { d.sections.find(s => s.id === section.id).title = e.target.value })} className="flex-1 font-bold text-slate-700 dark:text-slate-200 bg-transparent outline-none uppercase text-sm sm:text-base" />
                <div className="flex items-center gap-0.5 bg-slate-100/50 dark:bg-slate-700/50 rounded-lg p-0.5 mr-2">
                    <button onClick={(e) => { e.stopPropagation(); onMoveUp(); }} disabled={isFirst} className="p-1.5 text-slate-500 hover:text-rose-600 rounded-md disabled:opacity-30 transition-all"><ArrowUp size={14} /></button>
                    <button onClick={(e) => { e.stopPropagation(); onMoveDown(); }} disabled={isLast} className="p-1.5 text-slate-500 hover:text-rose-600 rounded-md disabled:opacity-30 transition-all"><ArrowDown size={14} /></button>
                </div>
                <button onClick={() => toggleSectionEnabled(section.id)} className="p-2 text-slate-400 hover:text-rose-600 transition-colors">{section.enabled ? <Eye size={16} /> : <EyeOff size={16} />}</button>
                {section?.id != 'contact' && (<button onClick={() => removeSection(section.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>)}
            </div>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="p-3">
                        <DraggableList items={section.fields} onSortEnd={onFieldOrderChange} renderItem={(field) => <FieldEditor sectionId={section.id} field={field} />} />
                        <div className="mt-3 flex gap-2">
                            <button onClick={() => addField(section.id, 'New Field', 'text')} className="flex-1 py-2 text-xs font-semibold text-rose-600 bg-rose-50/50 border border-rose-200 border-dashed rounded-lg hover:bg-rose-100/50 transition-colors">+ TEXT</button>
                            <button onClick={() => addField(section.id, 'Details', 'textarea')} className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-white/50 border border-slate-300 border-dashed rounded-lg hover:bg-slate-50/50 transition-colors">+ PARAGRAPH</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const OverviewEditor = () => {
    const { biodata, updateOverview } = useBiodata();
    const [isExpanded, setIsExpanded] = useState(true);

    if (!biodata.overview) return null;

    return (
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden mb-4 shadow-sm group">
            <div className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <button onClick={() => setIsExpanded(!isExpanded)} className="text-slate-400">
                    <ChevronRight size={18} className={cn("transition-transform duration-200", isExpanded && "rotate-90")} />
                </button>
                <span className="flex-1 font-bold text-slate-700 dark:text-slate-200 text-sm uppercase">
                    Introduction / Overview
                </span>
                <button onClick={() => updateOverview('enabled', !biodata.overview.enabled)} className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
                    {biodata.overview.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="p-3">
                        <input
                            value={biodata.overview.title}
                            onChange={(e) => updateOverview('title', e.target.value)}
                            className="w-full text-xs font-bold uppercase text-slate-500 bg-transparent border-b border-transparent focus:border-rose-500 outline-none pb-1 mb-2"
                            placeholder="TITLE (e.g. ABOUT ME)"
                        />
                        <textarea
                            rows={3}
                            value={biodata.overview.text}
                            onChange={(e) => updateOverview('text', e.target.value)}
                            className="w-full text-sm text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-950/50 p-2 rounded-lg border border-transparent focus:border-rose-500 outline-none resize-y placeholder:text-slate-400"
                            placeholder="Write a brief introduction..."
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Main Page ---
const CreatePage = () => {
    const { biodata, updateBiodata, addSection } = useBiodata();
    const { isDark } = useTheme();
    const [searchParams] = useSearchParams();

    // Handle Layout Selection from URL
    useEffect(() => {
        const layoutParam = searchParams.get('layout');
        if (layoutParam && layoutParam !== biodata.template) {
            updateBiodata(draft => {
                draft.template = layoutParam;
            });
        }
    }, [searchParams, updateBiodata, biodata.template]);

    // UI State
    const [activeTab, setActiveTab] = useState('sections');
    const [newSectionTitle, setNewSectionTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // Custom Hook for Responsive Logic
    const isDesktop = useIsDesktop(); // Replaces local state & effect

    // Zoom & View State
    const [zoom, setZoom] = useState(typeof window !== 'undefined' && window.innerWidth < 768 ? 0.40 : 0.65);
    const [isFullScreen, setIsFullScreen] = useState(false);

    // Resizer Logic
    const [leftWidth, setLeftWidth] = useState(45);
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDownload = async () => {
        try {
            await generatePdf(biodata);
        } catch (error) {
            alert('Failed to generate PDF');
        }
    };

    const handleMouseDown = (e) => { setIsDragging(true); e.preventDefault(); };
    const handleTouchStart = (e) => { setIsDragging(true); };

    useEffect(() => {
        const handleMove = (clientX) => {
            if (!isDragging || !containerRef.current) return;
            const containerRect = containerRef.current.getBoundingClientRect();
            // Calculate percentage based on desktop width only.
            // On mobile this logic isn't used for layout, but good to have robust.
            const newWidth = ((clientX - containerRect.left) / containerRect.width) * 100;
            if (newWidth > 30 && newWidth < 70) setLeftWidth(newWidth);
        };

        const handleMouseMove = (e) => handleMove(e.clientX);
        const handleTouchMove = (e) => handleMove(e.touches[0].clientX);

        const handleMouseUp = () => setIsDragging(false);

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging]);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.35));
    const handleFitScreen = () => setZoom(0.65);
    const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

    const moveSection = (index, direction) => {
        updateBiodata(draft => {
            const newIndex = index + direction;
            if (newIndex < 0 || newIndex >= draft.sections.length) return;
            const [removed] = draft.sections.splice(index, 1);
            draft.sections.splice(newIndex, 0, removed);
        });
    };

    const tabs = [
        { id: 'sections', label: 'Details', icon: <FileText size={20} /> },
        { id: 'photo', label: 'Photo', icon: <Image size={20} /> },
        { id: 'design', label: 'Design', icon: <PaletteIcon size={20} /> },
    ];

    const handleTogglePreview = () => {
        if (!isDesktop) {
            setActiveTab(activeTab === 'preview' ? 'sections' : 'preview');
        } else {
            setIsFullScreen(!isFullScreen);
        }
    };

    return (
        // REMOVED 'z-0' from here to avoid creating a lower stacking context
        // Added pt-20 to account for fixed navbar
        <div ref={containerRef} className={cn("flex flex-col md:flex-row relative pt-20", isDesktop ? "h-full overflow-hidden" : "h-auto min-h-screen overflow-y-auto")}>

            {/* --- LEFT PANEL --- */}
            <div
                style={{ width: isDesktop ? (isFullScreen ? '0%' : `${leftWidth}%`) : '100%' }}
                className={cn(
                    "relative flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] z-10",
                    isFullScreen && "min-w-0 w-0 overflow-hidden border-none",
                    !isDesktop && "border-b border-slate-200 dark:border-slate-800", // Mobile border fix
                    // Hide Left Panel content if Mobile Preview is active
                    (!isDesktop && activeTab === 'preview') ? "hidden" : "flex"
                )}
            >
                <EditorTheme />
                <div className="relative z-10 flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 py-3 px-4 gap-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md shrink-0">
                    <div className="flex px-1 gap-2 overflow-x-auto scrollbar-hide">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("cursor-pointer p-2 text-sm font-medium flex items-center justify-center gap-2 rounded-lg transition-all shrink-0", activeTab === tab.id ? "text-rose-600 bg-white/80 dark:bg-slate-700 shadow-sm ring-1 ring-slate-200 dark:ring-slate-600" : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700")} title={tab.label}>{tab.icon} <span className="hidden xl:inline">{tab.label}</span></button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Preview Button (Mobile Only) */}
                        {!isDesktop && activeTab !== 'preview' && (
                            <button
                                onClick={() => setActiveTab('preview')}
                                className="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-200 shadow-sm active:scale-95 transition-all"
                            >
                                <Eye size={16} />
                                <span>Preview</span>
                            </button>
                        )}

                        <button
                            onClick={handleDownload}
                            className="cursor-pointer group flex items-center gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 shadow-md hover:shadow-lg transition-all active:scale-95"
                        >
                            <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                            <span className="hidden sm:inline">Download PDF</span>
                            <span className="sm:hidden">PDF</span>
                        </button>
                    </div>
                </div>
                <div className={cn("relative z-10 flex-1 p-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent", isDesktop ? "overflow-y-auto" : "overflow-visible h-auto")}>
                    <AnimatePresence mode="wait">
                        {activeTab === 'sections' && (
                            <motion.div key="sections" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
                                <OverviewEditor />
                                <div className="flex flex-col">
                                    {biodata.sections.map((section, index) => (
                                        <SectionEditor key={section.id} section={section} isFirst={index === 0} isLast={index === biodata.sections.length - 1} onMoveUp={() => moveSection(index, -1)} onMoveDown={() => moveSection(index, 1)} />
                                    ))}
                                </div>
                                <button onClick={() => setIsModalOpen(true)} className="w-full py-3 mt-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-500 hover:border-rose-500 hover:text-rose-600 hover:bg-rose-50/50 dark:hover:bg-slate-800/50 flex items-center justify-center gap-2 transition-all duration-300 group backdrop-blur-sm">
                                    <div className="bg-slate-200 dark:bg-slate-700 group-hover:bg-rose-200 rounded-full p-1 transition-colors"><Plus size={16} /></div>
                                    <span className="font-semibold">Add New Section</span>
                                </button>
                            </motion.div>
                        )}
                        {activeTab === 'photo' && <motion.div key="photo" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}><PhotoUpload /></motion.div>}
                        {activeTab === 'design' && <motion.div key="design" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}><Sidebar /></motion.div>}
                    </AnimatePresence>
                </div>
            </div>

            {/* --- RESIZER HANDLE --- */}
            <div
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                className={cn("w-1 cursor-col-resize bg-slate-100 dark:bg-slate-800 hover:bg-rose-400 active:bg-rose-600 transition-colors hidden md:flex items-center justify-center z-20 relative -ml-[2px]", isDragging && "bg-rose-600 w-1.5", isFullScreen && "hidden")}
            >
                <div className={cn("h-8 w-4 bg-white dark:bg-slate-700 rounded-full shadow-md flex items-center justify-center border border-slate-200 dark:border-slate-600 absolute", isDragging && "border-rose-500")}><GripVertical size={10} className="text-slate-400" /></div>
            </div>

            {/* --- RIGHT PANEL --- */}
            <div
                style={{ width: isDesktop ? (isFullScreen ? '100%' : `${100 - leftWidth}%`) : '100%' }}
                className={cn(
                    "relative overflow-hidden flex flex-col transition-all duration-300",
                    // FIX: !fixed and !z-[9999] force it above everything in the entire DOM
                    // Added bg-slate-900 to ensure opacity doesn't show background nav
                    isFullScreen ? "!fixed !inset-0 !z-[9999] h-screen w-screen bg-slate-900" : "relative",
                    // Mobile Visibility Logic: Only show when 'preview' tab is active
                    (!isDesktop && activeTab !== 'preview') ? "hidden" : "flex",
                    // Ensure it takes full height on mobile when active
                    (!isDesktop && activeTab === 'preview') && "h-[calc(100vh-80px)]"
                )}
            >
                <PreviewTheme />

                {/* EXIT BUTTON: Z-Index higher than container */}
                <div className="absolute top-6 right-6 z-[10000]">
                    <button onClick={handleTogglePreview} className={cn("flex items-center gap-2.5 px-4 py-2 rounded-full border shadow-lg transition-all duration-300 group backdrop-blur-md cursor-pointer", "bg-white/90 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-slate-700 hover:border-rose-200")}>
                        <span className="relative flex h-2 w-2">
                            <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-green-500")}></span>
                            <span className={cn("relative inline-flex rounded-full h-2 w-2 bg-green-500")}></span>
                        </span>
                        <span className={cn("text-xs font-bold tracking-wide select-none text-slate-600 dark:text-slate-300 uppercase")}>
                            {(!isDesktop && activeTab === 'preview') ? 'Exit Preview' : (isFullScreen ? 'Exit Full Screen' : 'Live Preview')}
                        </span>
                        {(!isDesktop || isFullScreen) ? <Minimize2 size={16} className="ml-1" /> : <Maximize2 size={16} className="ml-1" />}
                    </button>
                </div>

                {/* WORKSPACE: Added pt-24 in full screen to push PDF down */}
                <div className={cn("flex-1 w-full h-full flex items-start justify-center custom-scrollbar z-10 relative", isFullScreen ? "p-12 pt-24" : "p-4 md:p-12", isDesktop ? "overflow-auto" : "overflow-visible h-auto")}>
                    <div
                        style={{
                            transform: `scale(${zoom})`,
                            transformOrigin: 'top left',
                            height: `calc(297mm * ${zoom})`,
                            width: `calc(210mm * ${zoom})`
                        }}
                        className="transition-transform duration-200 ease-out will-change-transform mt-4"
                    >
                        <div className="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-black/5 dark:ring-white/10" style={{ width: '210mm', height: '297mm' }}>
                            <BiodataPreview biodata={biodata} />
                        </div>
                    </div>
                </div>

                {/* ZOOM TOOLBAR: Consistent spacing */}
                <div className="absolute bottom-8 right-8 z-[10000]">
                    <div className="flex items-center gap-1 p-1.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-full shadow-xl shadow-slate-300/20 dark:shadow-black/40">
                        <button onClick={handleZoomOut} className="cursor-pointer p-2.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-500 dark:text-slate-400 transition-colors" title="Zoom Out"><ZoomOut size={18} /></button>
                        <div className="w-px h-4 bg-slate-300 dark:bg-slate-600 mx-1"></div>
                        <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 w-12 text-center select-none">{Math.round(zoom * 100)}%</span>
                        <div className="w-px h-4 bg-slate-300 dark:bg-slate-600 mx-1"></div>
                        <button onClick={handleZoomIn} className="cursor-pointer p-2.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-500 dark:text-slate-400 transition-colors" title="Zoom In"><ZoomIn size={18} /></button>
                        <button onClick={handleFitScreen} className="cursor-pointer p-2.5 ml-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-500 dark:text-slate-400 transition-colors" title="Fit to Screen"><Maximize size={16} /></button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-slate-900 p-6 rounded-2xl w-full max-w-sm shadow-2xl border border-slate-200 dark:border-slate-800">
                        <h3 className="font-serif font-bold text-xl mb-1 dark:text-white">Add New Section</h3>
                        <p className="text-xs text-slate-500 mb-4">Create a customized category for your biodata.</p>
                        <input autoFocus value={newSectionTitle} onChange={(e) => setNewSectionTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddSection()} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg mb-5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50" placeholder="e.g. Hobbies..." />
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg transition-colors">Cancel</button>
                            <button onClick={() => { if (newSectionTitle) { addSection(newSectionTitle); setIsModalOpen(false); setNewSectionTitle(''); } }} className="px-4 py-2 text-sm font-medium bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-lg shadow-rose-200 dark:shadow-none transition-all">Create Section</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default CreatePage;