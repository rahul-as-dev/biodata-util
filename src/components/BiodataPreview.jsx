import React from 'react';
import { cn } from '../utils/cn';
import { getThemeConfig } from '../utils/themeRegistry';
import { LAYOUT_TEMPLATES } from '../utils/templateRegistry';

const BiodataPreview = ({ biodata }) => {
    const { customizations, template } = biodata;
    
    // 1. Resolve Theme Config (for background assets like frames/flowers)
    const themeConfig = getThemeConfig(customizations.themeId);
    
    // We prioritize User Selection -> Theme Default -> System Default
    const styles = {
        primaryColor: customizations.primaryColor || themeConfig.styles.primaryColor || '#e11d48',
        fontSize: customizations.fontSize || '12px',
        backgroundColor: customizations.backgroundColor || '#ffffff',
        textColor: customizations.textColor || '#000000',
        fontClass: customizations.fontFamily === 'serif' ? 'font-serif' : customizations.fontFamily === 'monospace' ? 'font-mono' : 'font-sans'
    };

    // 3. Identify Active Template Renderer
    const activeTemplate = LAYOUT_TEMPLATES.find(t => t.id === template) || LAYOUT_TEMPLATES[0];
    const ActiveRenderer = activeTemplate.Renderer;

    return (
        <div 
            className={cn("relative overflow-hidden transition-all duration-300", styles.fontClass)}
            style={{
                width: '210mm',   
                height: '297mm',
                backgroundColor: styles.backgroundColor,
                textColor: styles.textColor,
                color: '#334155',
                fontSize: styles.fontSize,
                lineHeight: '1.6'
            }}
        >
            {/* Global Decoration Layer (Background Image/Frame) */}
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

            {/* 4. Pass computed styles to the Template Renderer */}
            {biodata.header.icon && <biodata.header.icon className="h-26 w-26 mx-auto -mb-2.5 object-contain border-b-4" style={{ color: styles.primaryColor }}/>}
            <ActiveRenderer 
                biodata={biodata} 
                styles={styles} 
                themeConfig={themeConfig} 
            />
        </div>
    );
};

export default BiodataPreview;