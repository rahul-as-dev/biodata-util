import { MandalaWatermark } from "../SVGAssets";
import { SectionBlock } from "./DocumentLayout";

export const PalaceRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full p-10 flex flex-col items-center">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"><MandalaWatermark className="w-[150%] h-[150%] opacity-[0.08] animate-spin-slow" style={{ color: styles.primaryColor }} /></div>
            <div className="text-center z-10 mb-10 mt-6 relative">
                {header.enabled && ( <div className="bg-white/80 backdrop-blur-sm py-3 px-10 rounded-full border shadow-sm" style={{ borderColor: `${styles.primaryColor}30` }}><h1 className="text-2xl font-bold uppercase tracking-[0.2em]" style={{ color: styles.primaryColor }}>{header.text}</h1></div> )}
                <div className="flex justify-center mt-6 gap-6 items-center">
                    {photo && <img src={photo} className="w-32 h-32 rounded-xl object-cover shadow-md transform -rotate-2 border-4 border-white" alt="Profile" />}
                    {overview?.enabled && overview.text && ( <div className="max-w-xs text-left bg-white/60 p-3 rounded-lg border border-slate-100"><p className="text-xs text-slate-600 font-medium leading-relaxed">"{overview.text}"</p></div> )}
                </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-8 z-10 px-4">{enabledSections.map(s => <div key={s.id} className="bg-white/70 backdrop-blur-sm p-5 rounded-lg border border-slate-100 shadow-sm break-inside-avoid"><SectionBlock section={s} styles={styles} /></div>)}</div>
        </div>
    );
};