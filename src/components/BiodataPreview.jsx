import React from 'react';
import { cn } from '../utils/cn';
import { getThemeConfig } from '../utils/themeRegistry';

const BiodataPreview = ({ biodata }) => {
    // ... destructure biodata ...
    const { header, photo, sections, template, customizations } = biodata;
    const themeConfig = getThemeConfig(customizations.themeId);
    
    // Style Variables
    const primaryColor = customizations.primaryColor || '#e11d48';
    const backgroundColor = customizations.backgroundColor || '#ffffff';
    const fontFamily = customizations.fontFamily === 'serif' ? 'font-serif' : customizations.fontFamily === 'monospace' ? 'font-mono' : 'font-sans';
    const padding = themeConfig.padding || 40; 
    
    // Helper Styles
    const modernTitleStyle = template === 'template2' 
        ? { backgroundColor: primaryColor, color: 'white', padding: '4px 12px', display: 'inline-block', borderRadius: '4px' }
        : { color: primaryColor, borderBottom: `1px solid ${primaryColor}40`, paddingBottom: '4px', display: 'block' };

    return (
        <div className="flex justify-center items-start min-h-full py-8">
            <div 
                className={cn("shadow-2xl relative overflow-hidden transition-all duration-300 bg-white", fontFamily)}
                style={{
                    width: '210mm',
                    minHeight: '297mm',
                    backgroundColor: backgroundColor,
                    color: '#334155',
                    fontSize: '11pt',
                    lineHeight: '1.6'
                }}
            >
                {/* 
                   LAYER 2: Decoration (SVG) 
                   Browsers render SVGs natively as background images perfectly.
                */}
                {themeConfig.asset && (
                    <div 
                        className="absolute inset-0 z-0 pointer-events-none"
                        style={{ 
                            backgroundImage: `url("${themeConfig.asset}")`, 
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center',
                        }}
                    />
                )}

                {/* LAYER 3: Content */}
                <div className="relative z-10 h-full flex flex-col" style={{ padding: `${padding}px` }}>
                    
                    {/* Header */}
                    {header.enabled && (
                        <div className={cn("mb-8 pb-4", template === 'template1' ? "text-center border-b" : "flex gap-6 items-center border-b")} style={{ borderColor: primaryColor }}>
                            {header.icon && <img src={header.icon} className={cn("object-contain", template==='template1'?'h-16 w-16 mx-auto mb-3':'h-20 w-20')} alt="Header Icon" />}
                            <div>
                                <h1 className="text-3xl font-bold uppercase tracking-widest" style={{ color: primaryColor }}>{header.text}</h1>
                                {template === 'template2' && <p className="text-slate-500 font-medium tracking-wide">Marriage Biodata</p>}
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="space-y-8">
                         {sections.map(section => {
                             if(!section.enabled) return null;
                             const isPersonal = section.id === 'personal';
                             return (
                                <div key={section.id} className="break-inside-avoid">
                                    <div className="mb-3">
                                        <h2 className="text-sm font-bold uppercase tracking-widest" style={modernTitleStyle}>
                                            {section.title}
                                        </h2>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="flex-1 space-y-2">
                                            {section.fields.map(f => f.enabled && (
                                                <div key={f.id} className="flex">
                                                    <span className="w-1/3 text-slate-500 text-xs font-bold uppercase pt-1">{f.showLabel ? f.label : ''}</span>
                                                    <span className="w-2/3 text-slate-900 font-medium whitespace-pre-wrap">{f.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {isPersonal && photo && (
                                            <div className="shrink-0">
                                                <img src={photo} className="w-32 h-32 object-cover border-4 border-white shadow-md" style={{ borderColor: primaryColor, borderRadius: customizations.imageShape === 'circle' ? '50%' : '6px' }} alt="Profile" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                             )
                         })}
                    </div>
                    
                    <div className="mt-auto pt-10 text-center text-[10px] text-slate-400">Created with VivahBio</div>
                </div>
            </div>
        </div>
    );
};

export default BiodataPreview;