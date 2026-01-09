import React from 'react';
import { useBiodata } from '../../contexts/BiodataContext';
import { THEMES } from '../../utils/themeRegistry';
import { LAYOUT_TEMPLATES } from '../../utils/templateRegistry';
import { cn } from '../../utils/cn';
import { Type, Palette, Check, Image as ImageIcon, Columns } from 'lucide-react';
import ColorPicker from '../common/ColorPicker';
import { lightToMediumColors, mediumToDarkColors, textColorsDark, HEADER_ICONS } from '../../config/constants';

const Sidebar = () => {
    const { biodata, updateBiodata } = useBiodata();

    const updateCustomization = (key, value) => {
        updateBiodata(draft => { draft.customizations[key] = value; });
    };

    return (
        <div className="space-y-6 pb-20">
            {/* 3. Paper Color */}
            <Section title="Background Color" icon={<Palette size={18} />}>
                <div className="flex flex-wrap gap-3 items-center">
                    {lightToMediumColors.slice(0, 10).map(color => (
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
                    {/* Custom Color Picker */}
                    <ColorPicker
                        value={biodata.customizations.backgroundColor}
                        onChange={color => updateCustomization('backgroundColor', color)}
                        ColorPicker={lightToMediumColors}
                        className={"ml-2"}
                    />
                </div>
            </Section>

            {/* 3. Text Color */}
            <Section title="Text Color" icon={<Palette size={18} />}>
                <div className="flex flex-wrap gap-3 items-center">
                    {textColorsDark.slice(0, 10).map(color => (
                        <button
                            key={color}
                            onClick={() => updateCustomization('textColor', color)}
                            className={cn(
                                "w-9 h-9 rounded-full border shadow-sm flex items-center justify-center transition-all hover:scale-110 relative",
                                biodata.customizations.textColor === color ? "border-brand-500 ring-2 ring-brand-200 dark:ring-brand-900 scale-110" : "border-slate-200 dark:border-slate-600"
                            )}
                            style={{ backgroundColor: color }}
                            title={color}
                        >
                            {biodata.customizations.textColor === color && <Check size={14} className="text-slate-900/60" />}
                        </button>
                    ))}
                    {/* Custom Color Picker */}
                    <ColorPicker
                        value={biodata.customizations.textColor}
                        onChange={color => updateCustomization('textColor', color)}
                        ColorPicker={textColorsDark}
                        className={"ml-2"}
                    />
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
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 block uppercase">Font Size</label>
                        <select
                            value={biodata.customizations.fontSize || '12px'}
                            onChange={e => updateCustomization('fontSize', e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/20 transition-all dark:text-white"
                        >
                            {Array.from({ length: 25 }, (_, i) => {
                                const size = 2 + i * 2;
                                return (
                                    <option key={size} value={`${size}px`}>
                                        {size}px
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 block uppercase">Primary Color</label>
                        <div className="flex flex-wrap gap-3 items-center">
                            {mediumToDarkColors.slice(0, 10).map(color => (
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
                            <ColorPicker
                                value={biodata.customizations.primaryColor}
                                onChange={color => updateCustomization('primaryColor', color)}
                                className={"ml-2"}
                            />
                        </div>
                    </div>
                </div>
            </Section>
            
            {/* Header Icon Catalouge */}
            <Section title="Header Icon">
                {/* Scrollable Container */}
                <div className="max-h-[320px] overflow-y-auto pr-1 -mr-2 custom-scrollbar">
                    {/* Compact Grid */}
                    <div className="grid grid-cols-4 gap-2">
                        {HEADER_ICONS.map(( {Icon, text} ) => {
                            const isActive = biodata.header.icon === Icon;

                            return (
                                <button
                                    key={text.length}
                                    onClick={() =>
                                        updateBiodata(d => {
                                            d.header.icon = Icon;
                                            d.header.text = text;
                                            d.header.enabled = true;
                                        })
                                    }
                                    className={cn(
                                        "flex flex-col items-center justify-center aspect-square rounded-lg border transition-all relative",
                                        isActive
                                            ? "border-brand-500 bg-brand-50/50 dark:bg-brand-900/10"
                                            : "border-slate-100 dark:border-slate-700 hover:border-brand-200 dark:hover:border-slate-600 bg-white dark:bg-slate-800"
                                    )}
                                >
                                    {/* Icon */}
                                    {Icon && <Icon
                                        className={cn(
                                            "w-6 h-6 transition-colors",
                                            isActive
                                                ? "text-brand-600 dark:text-brand-400"
                                                : "text-slate-500 dark:text-slate-400"
                                        )}
                                    />}

                                    {/* Active Dot */}
                                    {isActive && (
                                        <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-brand-500 shadow-sm" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </Section>


            {/* 1. LAYOUT STRUCTURE (Updated for Scroll & Compactness) */}
            <Section title="Layout Structure" icon={<Columns size={18} />}>
                {/* Scrollable Container */}
                <div className="max-h-[320px] overflow-y-auto pr-1 -mr-2 custom-scrollbar">
                    {/* Compact 3-Column Grid */}
                    <div className="grid grid-cols-3 gap-2">
                        {LAYOUT_TEMPLATES.map((layout) => {
                            const isActive = biodata.template === layout.id;
                            return (
                                <button
                                    key={layout.id}
                                    onClick={() => updateBiodata(d => { d.template = layout.id })}
                                    className={cn(
                                        "flex flex-col gap-1.5 p-1.5 rounded-lg border-2 transition-all hover:shadow-sm text-left group relative",
                                        isActive
                                            ? "border-brand-500 bg-brand-50/50 dark:bg-brand-900/10"
                                            : "border-slate-100 dark:border-slate-700 hover:border-brand-200 dark:hover:border-slate-600 bg-white dark:bg-slate-800"
                                    )}
                                    title={layout.name}
                                >
                                    {/* Smaller Preview Canvas (h-14) */}
                                    <div className={cn(
                                        "w-full h-14 rounded overflow-hidden border",
                                        isActive ? "border-brand-200 dark:border-brand-800 bg-white dark:bg-slate-900" : "border-slate-50 dark:border-slate-600 bg-slate-50 dark:bg-slate-800"
                                    )}>
                                        <layout.Preview isActive={isActive} />
                                    </div>

                                    {/* Minimal Label */}
                                    <div className="flex items-center justify-center w-full">
                                        <span className={cn(
                                            "text-[10px] font-medium truncate w-full text-center",
                                            isActive ? "text-brand-700 dark:text-brand-400 font-bold" : "text-slate-500 dark:text-slate-400"
                                        )}>
                                            {layout.name}
                                        </span>
                                    </div>

                                    {/* Active Dot (Absolute top-right) */}
                                    {isActive && (
                                        <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-brand-500 shadow-sm" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
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
                                if (theme.styles.primaryColor) {
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