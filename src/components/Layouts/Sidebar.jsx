import React from 'react';
import { useBiodata } from '../../contexts/BiodataContext';
import { THEMES } from '../../utils/themeRegistry';
import { cn } from '../../utils/cn';
import { LayoutTemplate, Type, Palette, Check, Image as ImageIcon } from 'lucide-react';

const Sidebar = () => {
    const { biodata, updateBiodata } = useBiodata();

    const updateCustomization = (key, value) => {
        updateBiodata(draft => { draft.customizations[key] = value; });
    };

    return (
        <div className="space-y-6 pb-20">
            
            {/* 1. LAYOUT (Structure) */}
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
                                {/* Visual representation of Center vs Side Layout */}
                                <div className={cn("absolute bg-slate-400", t === 'template1' ? "top-2 left-1/2 -translate-x-1/2 w-8 h-1" : "top-2 left-2 w-8 h-1")} />
                                <div className={cn("absolute bg-slate-400/50", "top-5 left-2 right-2 h-1")} />
                                <div className={cn("absolute bg-slate-400/50", "top-7 left-2 right-2 h-1")} />
                            </div>
                            <span className="text-xs font-medium capitalize text-slate-700 dark:text-slate-300">
                                {t === 'template1' ? 'Classic Center' : 'Modern Side'}
                            </span>
                        </button>
                    ))}
                </div>
            </Section>

            {/* 2. THEME (Decoration) - The Core Feature */}
            <Section title="Decorative Theme" icon={<ImageIcon size={18} />}>
                <div className="grid grid-cols-2 gap-3">
                    {Object.values(THEMES).map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => {
                                updateCustomization('themeId', theme.id);
                                // Optional: Auto-switch primary color to match theme
                                if(theme.styles.primaryColor) {
                                    updateCustomization('primaryColor', theme.styles.primaryColor);
                                }
                            }}
                            className={cn(
                                "relative rounded-lg border-2 text-left transition-all overflow-hidden h-24 group",
                                biodata.customizations.themeId === theme.id 
                                    ? "border-brand-500 ring-2 ring-brand-200" 
                                    : "border-slate-200 dark:border-slate-700 hover:border-brand-300"
                            )}
                        >
                            {/* Theme Preview */}
                            <div className="absolute inset-0 bg-white">
                                {theme.asset ? (
                                    <img 
                                        src={theme.asset} 
                                        className="w-full h-full object-cover opacity-80" 
                                        alt={theme.name}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300 text-xs">No Frame</div>
                                )}
                            </div>
                            
                            {/* Label */}
                            <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-1.5 border-t border-slate-100">
                                <span className="text-xs font-bold text-slate-800 block text-center truncate">
                                    {theme.name}
                                </span>
                            </div>

                            {/* Active Checkmark */}
                            {biodata.customizations.themeId === theme.id && (
                                <div className="absolute top-1 right-1 bg-brand-500 text-white rounded-full p-0.5">
                                    <Check size={12} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </Section>

            {/* 3. Paper Color */}
            <Section title="Background Color" icon={<Palette size={18} />}>
                 <div className="flex flex-wrap gap-2">
                    {['#ffffff', '#fff1f2', '#fdf2f8', '#fffbeb', '#f0f9ff'].map(color => (
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
                </div>
            </Section>

            {/* 4. Text Color & Fonts */}
            <Section title="Typography" icon={<Type size={18} />}>
                <div className="space-y-3">
                    <select
                        value={biodata.customizations.fontFamily}
                        onChange={(e) => updateCustomization('fontFamily', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm outline-none"
                    >
                        <option value="serif">Times New Roman (Traditional)</option>
                        <option value="sans-serif">Helvetica (Modern)</option>
                        <option value="monospace">Courier (Minimal)</option>
                    </select>

                    <div className="flex flex-wrap gap-2">
                        {['#000000', '#e11d48', '#b45309', '#15803d', '#1e40af'].map(color => (
                            <button
                                key={color}
                                onClick={() => updateCustomization('primaryColor', color)}
                                className={cn(
                                    "w-6 h-6 rounded border flex items-center justify-center",
                                    biodata.customizations.primaryColor === color ? "border-slate-400 ring-1 ring-slate-300" : "border-transparent"
                                )}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>
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