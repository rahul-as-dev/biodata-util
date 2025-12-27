import React from 'react';
import { useBiodata } from '../../contexts/BiodataContext';
import { THEMES } from '../../utils/themeRegistry';
import { cn } from '../../utils/cn';
import { 
    LayoutTemplate, Type, Palette, Check, Image as ImageIcon 
} from 'lucide-react';

const Sidebar = () => {
    const { biodata, updateBiodata } = useBiodata();

    const updateCustomization = (key, value) => {
        updateBiodata(draft => { draft.customizations[key] = value; });
    };

    return (
        <div className="space-y-6 pb-20">
            
            {/* 1. Layout Structure */}
            <Section title="Layout Structure" icon={<LayoutTemplate size={18} />}>
                <div className="grid grid-cols-2 gap-3">
                    {['template1', 'template2'].map((t) => (
                        <button
                            key={t}
                            onClick={() => updateBiodata(d => { d.template = t })}
                            className={cn(
                                "flex flex-col items-center p-3 rounded-lg border-2 transition-all",
                                biodata.template === t 
                                    ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20" 
                                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                            )}
                        >
                             <div className="w-full h-12 bg-slate-200 dark:bg-slate-700 rounded mb-2 overflow-hidden relative opacity-50">
                                <div className={cn("absolute bg-slate-400", t === 'template1' ? "top-2 left-1/2 -translate-x-1/2 w-8 h-1" : "top-2 left-2 w-8 h-1")} />
                             </div>
                            <span className="text-xs font-medium capitalize text-slate-700 dark:text-slate-300">
                                {t === 'template1' ? 'Classic Center' : 'Modern Side'}
                            </span>
                        </button>
                    ))}
                </div>
            </Section>

            {/* 2. Background Color (Paper Color) */}
            <Section title="Paper Color" icon={<Palette size={18} />}>
                 <div className="flex flex-wrap gap-3 mb-4">
                    {['#ffffff', '#fff1f2', '#fdf2f8', '#fffbeb', '#f0f9ff', '#f8fafc'].map(color => (
                        <button
                            key={color}
                            onClick={() => updateCustomization('backgroundColor', color)}
                            className={cn(
                                "w-8 h-8 rounded-full border shadow-sm flex items-center justify-center transition-transform hover:scale-110",
                                biodata.customizations.backgroundColor === color ? "border-brand-500 ring-2 ring-brand-200" : "border-slate-200"
                            )}
                            style={{ backgroundColor: color }}
                        >
                            {biodata.customizations.backgroundColor === color && <Check size={14} className="text-slate-900/50" />}
                        </button>
                    ))}
                     <div className="relative group">
                        <input
                            type="color"
                            value={biodata.customizations.backgroundColor}
                            onChange={(e) => updateCustomization('backgroundColor', e.target.value)}
                            className="w-8 h-8 opacity-0 absolute inset-0 cursor-pointer"
                        />
                        <div className="w-8 h-8 rounded-full border border-dashed border-slate-300 bg-transparent flex items-center justify-center text-slate-500 shadow-sm pointer-events-none">
                            <Palette size={14} />
                        </div>
                    </div>
                </div>
            </Section>

            {/* 3. Decoration Theme */}
            <Section title="Decoration Theme" icon={<ImageIcon size={18} />}>
                <div className="grid grid-cols-2 gap-3">
                    {Object.values(THEMES).map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => updateCustomization('themeId', theme.id)}
                            className={cn(
                                "relative p-2 rounded-lg border-2 text-left transition-all overflow-hidden h-20",
                                biodata.customizations.themeId === theme.id 
                                    ? "border-brand-500 ring-1 ring-brand-500" 
                                    : "border-slate-200 dark:border-slate-700 hover:border-brand-300"
                            )}
                            style={{ backgroundColor: biodata.customizations.backgroundColor }}
                        >
                            {/* Simulate the decoration in the preview button */}
                            {theme.asset && (
                                <img 
                                    src={theme.asset} 
                                    className="absolute inset-0 w-full h-full object-cover opacity-50" 
                                    alt={theme.name}
                                />
                            )}
                            <span className="relative z-10 text-xs font-bold text-slate-800 bg-white/80 px-1 rounded">
                                {theme.name}
                            </span>
                        </button>
                    ))}
                </div>
            </Section>

            {/* 4. Text Color */}
            <Section title="Text/Accent Color" icon={<Palette size={18} />}>
                <div className="flex flex-wrap gap-3">
                    {['#000000', '#e11d48', '#2563eb', '#16a34a', '#d97706', '#7e22ce'].map(color => (
                        <button
                            key={color}
                            onClick={() => updateCustomization('primaryColor', color)}
                            className={cn(
                                "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110",
                                biodata.customizations.primaryColor === color ? "border-slate-400 scale-110" : "border-transparent"
                            )}
                            style={{ backgroundColor: color }}
                        >
                            {biodata.customizations.primaryColor === color && <Check size={14} className="text-white" />}
                        </button>
                    ))}
                     <input
                        type="color"
                        value={biodata.customizations.primaryColor}
                        onChange={(e) => updateCustomization('primaryColor', e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                    />
                </div>
            </Section>
            
            {/* 5. Font Family */}
            <Section title="Typography" icon={<Type size={18} />}>
                 <select
                    value={biodata.customizations.fontFamily}
                    onChange={(e) => updateCustomization('fontFamily', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                >
                    <option value="serif">Times New Roman (Traditional)</option>
                    <option value="sans-serif">Helvetica / Arial (Clean)</option>
                    <option value="monospace">Courier (Minimal)</option>
                </select>
            </Section>
        </div>
    );
};

const Section = ({ title, icon, children }) => (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50/50 dark:bg-slate-800/50">
            <span className="text-brand-600 dark:text-brand-400">{icon}</span>
            <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200">{title}</h3>
        </div>
        <div className="p-4">
            {children}
        </div>
    </div>
);

export default Sidebar;