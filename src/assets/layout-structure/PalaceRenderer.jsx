import { MandalaWatermark } from "../SVGAssets";
import { SectionBlock } from "./DocumentLayout";

export const PalaceRenderer = ({ biodata, styles }) => {
    const { header, photo, overview, sections } = biodata;
    const enabledSections = sections.filter(s => s.enabled);

    return (
        <div className="relative z-10 h-full flex flex-col items-center overflow-hidden" style={{ fontSize: styles.fontSize, padding: '3em', color: styles.textColor }}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <MandalaWatermark className="w-[150%] h-[150%] opacity-[0.08] animate-spin-slow" style={{ color: styles.primaryColor }} />
            </div>
            <div className="text-center z-10 relative" style={{ marginBottom: '3em', marginTop: '2em' }}>
                {header.enabled && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-full border shadow-sm" style={{ padding: '0.8em 2.5em', borderColor: `${styles.primaryColor}30` }}>
                        <h1 className="font-bold uppercase tracking-[0.2em]" style={{ fontSize: '2em', color: styles.primaryColor }}>{header.text}</h1>
                    </div>
                )}
                <div className="flex justify-center items-center" style={{ marginTop: '1.5em', gap: '1.5em' }}>
                    {photo && <img src={photo} className="object-cover shadow-md transform -rotate-2 border-white" style={{ width: '8em', height: '8em', borderRadius: '0.75em', borderWidth: '0.3em' }} alt="Profile" />}
                    {overview?.enabled && overview.text && (
                        <div className="max-w-[20em] text-left bg-white/60 rounded-lg border" style={{ padding: '1em', borderColor: `${styles.primaryColor}10` }}>
                            <p className="font-medium leading-relaxed" style={{ fontSize: '0.9em', opacity: 0.8 }}>"{overview.text}"</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full grid grid-cols-2 z-10" style={{ gap: '2em', padding: '0 1em' }}>
                {enabledSections.map(s => (
                    <div key={s.id} className="bg-white/70 backdrop-blur-sm rounded-lg border shadow-sm break-inside-avoid" style={{ padding: '1.5em', borderColor: `${styles.primaryColor}05` }}>
                        <SectionBlock section={s} styles={styles} />
                    </div>
                ))}
            </div>
        </div>
    );
};