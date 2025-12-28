import React from 'react';
import { cn } from '../utils/cn';
import { getThemeConfig } from '../utils/themeRegistry';

const BiodataPreview = ({ biodata }) => {
    const { header, photo, sections, template, customizations } = biodata;
    
    // 1. Get Theme Config
    const themeConfig = getThemeConfig(customizations.themeId);
    
    // 2. Extract Styles
    const primaryColor = customizations.primaryColor || themeConfig.styles.primaryColor;
    const backgroundColor = customizations.backgroundColor || '#ffffff';
    
    // Font Mapping
    const getFontClass = (font) => {
        if (font === 'serif') return 'font-serif';
        if (font === 'monospace') return 'font-mono';
        return 'font-sans';
    };
    const fontClass = getFontClass(customizations.fontFamily);

    // 3. Dynamic Padding
    const containerStyle = {
        paddingTop: `${themeConfig.styles.paddingTop}px`,
        paddingBottom: `${themeConfig.styles.paddingBottom}px`,
        paddingLeft: `${themeConfig.styles.paddingHorizontal}px`,
        paddingRight: `${themeConfig.styles.paddingHorizontal}px`,
    };

    const modernTitleStyle = template === 'template2' 
        ? { backgroundColor: primaryColor, color: 'white', padding: '4px 12px', display: 'inline-block', borderRadius: '4px' }
        : { color: primaryColor, borderBottom: `1px solid ${primaryColor}40`, paddingBottom: '4px', display: 'block' };

    // --- RENDER ---
    // Note: No outer flex container. No outer shadow. Just the A4 block.
    return (
        <div 
            className={cn("relative overflow-hidden bg-white transition-all duration-300", fontClass)}
            style={{
                width: '210mm',   // Exact A4 Width
                height: '297mm', // Exact A4 Height
                backgroundColor: backgroundColor,
                color: '#334155',
                fontSize: '11pt',
                lineHeight: '1.6'
            }}
        >
            {/* LAYER 1: Decoration Background */}
            {themeConfig.asset && (
                <div 
                    className="absolute inset-0 z-0 pointer-events-none print:block"
                    style={{ 
                        backgroundImage: `url("${themeConfig.asset}")`, 
                        backgroundSize: '100% 100%', 
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                />
            )}

            {/* LAYER 2: Content (Safe Zone) */}
            <div className="relative z-10 h-full flex flex-col" style={containerStyle}>
                
                {/* Header */}
                {header.enabled && (
                    <div className={cn("mb-8 pb-4", template === 'template1' ? "text-center border-b" : "flex gap-6 items-center border-b")} style={{ borderColor: `${primaryColor}40` }}>
                        {header.icon && (
                            <img 
                                src={header.icon} 
                                className={cn("object-contain", template === 'template1' ? 'h-16 w-16 mx-auto mb-3' : 'h-20 w-20')} 
                                alt="Om/Ganesh" 
                            />
                        )}
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold uppercase tracking-widest" style={{ color: primaryColor }}>
                                {header.text}
                            </h1>
                        </div>
                    </div>
                )}

                {/* Content Sections */}
                <div className="space-y-6 flex-1">
                        {sections.map(section => {
                            if(!section.enabled) return null;
                            const isPersonal = section.id === 'personal';
                            
                            return (
                            <div key={section.id} className="break-inside-avoid">
                                {/* Section Title */}
                                <div className="mb-3 text-left">
                                    <h2 className="text-sm font-bold uppercase tracking-widest" style={modernTitleStyle}>
                                        {section.title}
                                    </h2>
                                </div>

                                {/* Section Body */}
                                <div className={cn("flex gap-6", template === 'template2' && isPersonal ? "flex-row-reverse" : "flex-row")}>
                                    
                                    {/* Fields List */}
                                    <div className="flex-1 space-y-1.5">
                                        {section.fields.map(f => f.enabled && (
                                            <div key={f.id} className="flex items-baseline">
                                                <span className="w-1/3 text-slate-500 text-[10px] font-bold uppercase tracking-wide shrink-0">
                                                    {f.showLabel ? f.label : ''}
                                                </span>
                                                <span className="w-2/3 text-slate-900 font-medium text-sm whitespace-pre-wrap break-words">
                                                    {f.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Photo */}
                                    {isPersonal && photo && (
                                        <div className="shrink-0">
                                            <img 
                                                src={photo} 
                                                className="w-32 h-32 object-cover shadow-md" 
                                                style={{ 
                                                    borderColor: primaryColor, 
                                                    borderWidth: '3px',
                                                    borderRadius: customizations.imageShape === 'circle' ? '50%' : '6px' 
                                                }} 
                                                alt="Profile"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            )
                        })}
                </div>
            </div>
        </div>
    );
};

export default BiodataPreview;