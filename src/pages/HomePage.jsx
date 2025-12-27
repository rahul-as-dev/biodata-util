import React, { useState, useRef, useEffect } from 'react';
import { useBiodata } from '../contexts/BiodataContext';
import { useTheme } from '../contexts/ThemeContext';
import { generatePdf } from '../utils/PDFGenerator'; // PDF Generator
import BiodataPreview from '../components/BiodataPreview';
import DraggableList from '../components/common/DraggableList';
import PhotoUpload from '../components/Forms/PhotoUpload';
import Sidebar from '../components/Layouts/Sidebar';
import { cn } from '../utils/cn';
import { 
    Plus, Trash2, Eye, EyeOff, FileText, Image, 
    Palette as PaletteIcon, Download, ChevronRight, X,
    Sun, Moon, GripVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- FieldEditor and SectionEditor (Paste your existing ones here to save space) ---
// Note: Keep the exact same FieldEditor/SectionEditor logic as previous response
// ... 
const FieldEditor = ({ sectionId, field }) => {
    const { updateFieldValue, updateFieldLabel, toggleFieldEnabled, removeField } = useBiodata();

    return (
        <div className={cn(
            "grid grid-cols-12 gap-3 items-start p-3 rounded-lg border transition-all",
            field.enabled 
                ? "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700" 
                : "bg-slate-50 dark:bg-slate-900 border-dashed border-slate-300 opacity-70"
        )}>
            {/* Label */}
            <div className="col-span-4 sm:col-span-3">
                <input
                    type="text"
                    value={field.label}
                    onChange={(e) => updateFieldLabel(sectionId, field.id, e.target.value)}
                    className="w-full text-xs font-bold uppercase text-slate-500 bg-transparent border-b border-transparent focus:border-brand-500 focus:text-brand-600 outline-none pb-1"
                    placeholder="LABEL"
                />
            </div>
            {/* Value */}
            <div className="col-span-6 sm:col-span-7">
                {field.type === 'textarea' ? (
                    <textarea
                        rows={2}
                        value={field.value}
                        onChange={(e) => updateFieldValue(sectionId, field.id, e.target.value)}
                        className="w-full text-sm text-slate-800 dark:text-slate-200 bg-transparent outline-none resize-y placeholder:text-slate-300"
                        placeholder="Details..."
                    />
                ) : (
                    <input
                        type="text"
                        value={field.value}
                        onChange={(e) => updateFieldValue(sectionId, field.id, e.target.value)}
                        className="w-full text-sm text-slate-800 dark:text-slate-200 bg-transparent outline-none placeholder:text-slate-300"
                        placeholder="Value..."
                    />
                )}
            </div>
            {/* Actions */}
            <div className="col-span-2 flex justify-end gap-1">
                <button onClick={() => toggleFieldEnabled(sectionId, field.id)} className="p-1.5 text-slate-400 hover:text-brand-500">
                     {field.enabled ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button onClick={() => removeField(sectionId, field.id)} className="p-1.5 text-slate-400 hover:text-red-500">
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
};

const SectionEditor = ({ section }) => {
    const { updateBiodata, addField, removeSection, toggleSectionEnabled } = useBiodata();
    const [isExpanded, setIsExpanded] = useState(true);

    const onFieldOrderChange = (newFields) => {
        updateBiodata(draft => {
            const s = draft.sections.find(sec => sec.id === section.id);
            if(s) s.fields = newFields;
        });
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden mb-4 shadow-sm">
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <button onClick={() => setIsExpanded(!isExpanded)} className="text-slate-400">
                    <ChevronRight size={18} className={cn("transition-transform", isExpanded && "rotate-90")} />
                </button>
                <input 
                    value={section.title}
                    onChange={(e) => updateBiodata(d => { d.sections.find(s => s.id === section.id).title = e.target.value })}
                    className="flex-1 font-bold text-slate-700 dark:text-slate-200 bg-transparent outline-none uppercase"
                />
                <button onClick={() => toggleSectionEnabled(section.id)} className="p-2 text-slate-400 hover:text-brand-600">
                    {section.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button onClick={() => removeSection(section.id)} className="p-2 text-slate-400 hover:text-red-600">
                    <Trash2 size={16} />
                </button>
            </div>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="p-3">
                        <DraggableList items={section.fields} onSortEnd={onFieldOrderChange} renderItem={(field) => <FieldEditor sectionId={section.id} field={field} />} />
                        <div className="mt-3 flex gap-2">
                            <button onClick={() => addField(section.id, 'New Field', 'text')} className="flex-1 py-2 text-xs font-semibold text-brand-600 bg-brand-50 border border-brand-200 border-dashed rounded-lg">
                                + TEXT
                            </button>
                            <button onClick={() => addField(section.id, 'Details', 'textarea')} className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-300 border-dashed rounded-lg">
                                + PARAGRAPH
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Resizable Home Page ---
const HomePage = () => {
    const { biodata, updateBiodata, addSection } = useBiodata();
    const { isDark, toggleTheme } = useTheme();
    
    // UI State
    const [activeTab, setActiveTab] = useState('sections');
    const [newSectionTitle, setNewSectionTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // Resizable Logic
    const [leftWidth, setLeftWidth] = useState(40); // Percentage
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        e.preventDefault();
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging || !containerRef.current) return;
            const containerRect = containerRef.current.getBoundingClientRect();
            const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
            // Limit min/max width
            if (newWidth > 20 && newWidth < 80) setLeftWidth(newWidth);
        };
        const handleMouseUp = () => setIsDragging(false);

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const handleDownload = async () => {
        setIsGenerating(true);
        try {
            await generatePdf(biodata);
        } catch (error) {
            alert('Failed to generate PDF');
        } finally {
            setIsGenerating(false);
        }
    };

    const tabs = [
        { id: 'sections', label: 'Details', icon: <FileText size={18} /> },
        { id: 'photo', label: 'Photo', icon: <Image size={18} /> },
        { id: 'design', label: 'Design', icon: <PaletteIcon size={18} /> },
    ];

    const onSectionSort = ({ oldIndex, newIndex }) => {
        if (oldIndex === newIndex) return;
        updateBiodata(draft => {
            const [removed] = draft.sections.splice(oldIndex, 1);
            draft.sections.splice(newIndex, 0, removed);
        });
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
            {/* Header */}
            <header className="h-14 shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 z-20">
                <div className="flex items-center gap-2 font-bold text-lg">
                   <div className="w-7 h-7 bg-brand-600 rounded flex items-center justify-center text-white text-sm">V</div>
                   VivahBio
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <button 
                        onClick={handleDownload}
                        disabled={isGenerating}
                        className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all disabled:opacity-50"
                    >
                        {isGenerating ? 'Generating...' : <><Download size={16} /> Download PDF</>}
                    </button>
                </div>
            </header>

            {/* Main Workspace (Resizable) */}
            <div ref={containerRef} className="flex-1 flex overflow-hidden relative">
                
                {/* Left Panel: Editor */}
                <div style={{ width: `${leftWidth}%` }} className="flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 min-w-[300px]">
                    {/* Tabs */}
                    <div className="flex border-b border-slate-200 dark:border-slate-800">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors",
                                    activeTab === tab.id 
                                        ? "border-brand-600 text-brand-600 bg-brand-50/50 dark:bg-brand-900/10" 
                                        : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                )}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>
                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
                        <AnimatePresence mode="wait">
                            {activeTab === 'sections' && (
                                <motion.div key="sections" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <DraggableList items={biodata.sections} onSortEnd={onSectionSort} renderItem={(section) => <SectionEditor section={section} />} />
                                    <button onClick={() => setIsModalOpen(true)} className="w-full py-3 mt-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-500 hover:border-brand-500 hover:text-brand-600 flex items-center justify-center gap-2 transition-colors">
                                        <Plus size={18} /> Add New Section
                                    </button>
                                </motion.div>
                            )}
                            {activeTab === 'photo' && <motion.div key="photo" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><PhotoUpload /></motion.div>}
                            {activeTab === 'design' && <motion.div key="design" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Sidebar /></motion.div>}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Resizer Handle */}
                <div
                    onMouseDown={handleMouseDown}
                    className={cn(
                        "w-1.5 cursor-col-resize bg-slate-100 dark:bg-slate-800 hover:bg-brand-400 active:bg-brand-600 transition-colors flex items-center justify-center z-10",
                        isDragging && "bg-brand-600 w-2"
                    )}
                >
                    <GripVertical size={12} className="text-slate-400" />
                </div>

                {/* Right Panel: Preview */}
                <div style={{ width: `${100 - leftWidth}%` }} className="bg-slate-100 dark:bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center min-w-[400px]">
                     {/* Scale Controls Overlay (Optional but nice) */}
                     <div className="absolute top-4 right-4 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur px-3 py-1 rounded-full text-xs font-mono text-slate-500 border border-slate-200 dark:border-slate-700">
                        A4 Preview
                     </div>
                     
                     <div className="w-full h-full overflow-auto p-8 flex justify-center">
                        <div className="origin-top scale-[0.85] lg:scale-[0.65] xl:scale-[0.8] 2xl:scale-[0.9] transition-transform">
                            <BiodataPreview biodata={biodata} />
                        </div>
                     </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl w-full max-w-sm shadow-2xl">
                        <h3 className="font-bold text-lg mb-4 dark:text-white">Add Section</h3>
                        <input autoFocus value={newSectionTitle} onChange={(e) => setNewSectionTitle(e.target.value)} onKeyDown={(e)=>e.key==='Enter'&& handleAddSection()} className="w-full px-4 py-2 border rounded-lg mb-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white" placeholder="Section Name" />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                            <button onClick={() => { if(newSectionTitle) { addSection(newSectionTitle); setIsModalOpen(false); setNewSectionTitle(''); } }} className="px-4 py-2 bg-brand-600 text-white rounded-lg">Add</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;