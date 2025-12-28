import React from 'react';
import { useBiodata } from '../../contexts/BiodataContext';
import { THEMES } from '../../utils/themeRegistry';
import { LAYOUT_TEMPLATES } from '../../utils/templateRegistry';
import { cn } from '../../utils/cn';
import { Type, Palette, Check, Image as ImageIcon, Columns } from 'lucide-react';

const Sidebar = () => {
    const { biodata, updateBiodata } = useBiodata();

    const updateCustomization = (key, value) => {
        updateBiodata(draft => { draft.customizations[key] = value; });
    };

    return (
        <div className="space-y-6 pb-20">
            {/* 3. Paper Color */}
            <Section title="Background Color" icon={<Palette size={18} />}>
                 <div className="flex flex-wrap gap-3">
                    {['#ffffff', '#fff1f2', '#fdf2f8', '#fffbeb', '#f0f9ff', '#f5f5f4'].map(color => (
                        <button
                            key={color}
                            onClick={() => updateCustomization('backgroundColor', color)}
                            className={cn(
                                "w-9 h-9 rounded-full border shadow-sm flex items-center justify-center transition-all hover:scale-110 relative",
                                biodata.customizations.backgroundColor === color ? "border-brand-500 ring-2 ring-brand-200 dark:ring-brand-900 scale-110" : "border-slate-200 dark:border-slate-600"
                            )}
                            style={{ backgroundColor: color }}
                            title={color}
                        >
                            {biodata.customizations.backgroundColor === color && <Check size={14} className="text-slate-900/60" />}
                        </button>
                    ))}
                </div>
            </Section>

            {/* 4. Typography */}
            <Section title="Typography" icon={<Type size={18} />}>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 block uppercase">Font Style</label>
                        <select
                            value={biodata.customizations.fontFamily}
                            onChange={(e) => updateCustomization('fontFamily', e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/20 transition-all dark:text-white"
                        >
                            <option value="serif">Times New Roman (Traditional)</option>
                            <option value="sans-serif">Helvetica (Modern)</option>
                            <option value="monospace">Courier (Minimal)</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 block uppercase">Primary Color</label>
                        <div className="flex flex-wrap gap-2">
                            {['#000000', '#e11d48', '#be123c', '#b45309', '#15803d', '#1e40af', '#6b21a8'].map(color => (
                                <button
                                    key={color}
                                    onClick={() => updateCustomization('primaryColor', color)}
                                    className={cn(
                                        "w-7 h-7 rounded-full flex items-center justify-center transition-all",
                                        biodata.customizations.primaryColor === color 
                                            ? "ring-2 ring-offset-2 ring-brand-500 dark:ring-offset-slate-900 scale-110" 
                                            : "hover:scale-110 border border-black/5"
                                    )}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Section>
            
            {/* 1. LAYOUT STRUCTURE */}
            <Section title="Layout Structure" icon={<Columns size={18} />}>
                <div className="grid grid-cols-2 gap-3">
                    {LAYOUT_TEMPLATES.map((layout) => {
                        const isActive = biodata.template === layout.id;
                        return (
                            <button
                                key={layout.id}
                                onClick={() => updateBiodata(d => { d.template = layout.id })}
                                className={cn(
                                    "flex flex-col gap-2 p-2 rounded-xl border-2 transition-all hover:shadow-md text-left",
                                    isActive
                                        ? "border-brand-500 bg-brand-50/50 dark:bg-brand-900/10" 
                                        : "border-slate-200 dark:border-slate-700 hover:border-brand-200 dark:hover:border-slate-600 bg-white dark:bg-slate-800"
                                )}
                            >
                                {/* Preview Canvas */}
                                <div className={cn(
                                    "w-full h-20 rounded-lg overflow-hidden border shadow-sm",
                                    isActive ? "border-brand-200 dark:border-brand-800 bg-white dark:bg-slate-900" : "border-slate-100 dark:border-slate-600 bg-slate-50 dark:bg-slate-800"
                                )}>
                                    <layout.Preview isActive={isActive} />
                                </div>
                                
                                {/* Footer Label */}
                                <div className="flex items-center justify-between w-full px-1">
                                    <span className={cn(
                                        "text-xs font-semibold", 
                                        isActive ? "text-brand-700 dark:text-brand-400" : "text-slate-600 dark:text-slate-400"
                                    )}>
                                        {layout.name}
                                    </span>
                                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </Section>

            {/* 2. THEME (Decoration) */}
            <Section title="Decorative Theme" icon={<ImageIcon size={18} />}>
                <div className="grid grid-cols-2 gap-3">
                    {Object.values(THEMES).map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => {
                                updateCustomization('themeId', theme.id);
                                if(theme.styles.primaryColor) {
                                    updateCustomization('primaryColor', theme.styles.primaryColor);
                                }
                            }}
                            className={cn(
                                "relative rounded-lg border-2 text-left transition-all overflow-hidden h-24 group hover:shadow-md",
                                biodata.customizations.themeId === theme.id 
                                    ? "border-brand-500 ring-2 ring-brand-200 dark:ring-brand-900" 
                                    : "border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-slate-600"
                            )}
                        >
                            <div className="absolute inset-0 bg-white dark:bg-slate-800">
                                {theme.asset ? (
                                    <img 
                                        src={theme.asset} 
                                        className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110" 
                                        alt={theme.name}
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 text-slate-400 gap-1">
                                        <div className="w-8 h-8 rounded border-2 border-dashed border-slate-300 dark:border-slate-600" />
                                        <span className="text-[10px]">Minimal</span>
                                    </div>
                                )}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 p-2 border-t border-slate-100 dark:border-slate-700 backdrop-blur-sm">
                                <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 block text-center truncate uppercase tracking-wide">
                                    {theme.name}
                                </span>
                            </div>
                            {biodata.customizations.themeId === theme.id && (
                                <div className="absolute top-1 right-1 bg-brand-500 text-white rounded-full p-0.5 shadow-sm">
                                    <Check size={10} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </Section>
        </div>
    );
};

const Section = ({ title, icon, children }) => (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2.5 bg-slate-50/80 dark:bg-slate-800/50 backdrop-blur-sm">
            <span className="text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 p-1.5 rounded-md">{icon}</span>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 tracking-wide uppercase">{title}</h3>
        </div>
        <div className="p-5">{children}</div>
    </div>
);

export default Sidebar;