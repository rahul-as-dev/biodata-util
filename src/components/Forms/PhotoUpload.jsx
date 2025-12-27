import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useBiodata } from '../../contexts/BiodataContext';
import { cn } from '../../utils/cn';
import ReactCrop from 'react-image-crop';
import { UploadCloud, Check, X, Trash2, Image as ImageIcon } from 'lucide-react';
import 'react-image-crop/dist/ReactCrop.css';

const PhotoUpload = () => {
    const { biodata, updateBiodata } = useBiodata();
    const [imgSrc, setImgSrc] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const fileInputRef = useRef(null);

    // Initial config logic
    const initialAspect = biodata?.customizations?.imageShape === 'circle' ? 1 : undefined;
    const [crop, setCrop] = useState({ unit: '%', width: 50, aspect: initialAspect });
    const [completedCrop, setCompletedCrop] = useState(null);

    const onSelectFile = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setImgSrc(reader.result || '');
            setCrop(initialAspect ? { unit: '%', width: 50, aspect: initialAspect } : { unit: '%', width: 60 });
        };
        reader.readAsDataURL(file);
    };

    // --- Logic for Canvas Drawing (Kept mostly same, just wrapped in useEffect) ---
    useEffect(() => {
        if (!completedCrop || !imgRef.current || !previewCanvasRef.current) return;
        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio || 1;

        canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
        canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

        ctx.scale(pixelRatio, pixelRatio);
        ctx.imageSmoothingQuality = 'high';

        const cropX = crop.x * scaleX;
        const cropY = crop.y * scaleY;
        const cropW = crop.width * scaleX;
        const cropH = crop.height * scaleY;

        ctx.drawImage(image, cropX, cropY, cropW, cropH, 0, 0, crop.width * scaleX, crop.height * scaleY);
    }, [completedCrop]);

    const handleSave = () => {
        if (!completedCrop || !previewCanvasRef.current) return;
        const dataUrl = previewCanvasRef.current.toDataURL('image/jpeg', 0.9);
        updateBiodata(d => { d.photo = dataUrl; });
        setImgSrc(''); // Reset UI
    };

    const updateShape = (shape) => {
        updateBiodata(d => { d.customizations.imageShape = shape });
        setCrop(prev => ({ ...prev, aspect: shape === 'circle' ? 1 : undefined }));
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
            <h3 className="font-semibold text-lg mb-4 text-slate-800 dark:text-white flex items-center gap-2">
                <ImageIcon className="text-brand-500" size={20} /> Profile Photo
            </h3>

            {/* Config Controls */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-2">Shape</label>
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        {['circle', 'rect'].map(s => (
                            <button 
                                key={s} 
                                onClick={() => updateShape(s)}
                                className={cn(
                                    "flex-1 py-1.5 text-sm rounded-md capitalize transition-colors",
                                    biodata.customizations.imageShape === s 
                                        ? "bg-white dark:bg-slate-600 shadow text-brand-600 font-medium" 
                                        : "text-slate-500"
                                )}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-2">Placement</label>
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        {['above', 'right'].map(p => (
                            <button 
                                key={p} 
                                onClick={() => updateBiodata(d => d.customizations.imagePlacement = p)}
                                className={cn(
                                    "flex-1 py-1.5 text-sm rounded-md capitalize transition-colors",
                                    biodata.customizations.imagePlacement === p
                                        ? "bg-white dark:bg-slate-600 shadow text-brand-600 font-medium" 
                                        : "text-slate-500"
                                )}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Display / Upload Area */}
            {!imgSrc && (
                biodata.photo ? (
                    <div className="flex flex-col items-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300">
                        <img 
                            src={biodata.photo} 
                            alt="Profile" 
                            className={cn(
                                "w-32 h-32 object-cover border-4 border-white dark:border-slate-700 shadow-md mb-4",
                                biodata.customizations.imageShape === 'circle' ? 'rounded-full' : 'rounded-lg'
                            )} 
                        />
                        <button 
                            onClick={() => updateBiodata(d => d.photo = null)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-2"
                        >
                            <Trash2 size={16} /> Remove Photo
                        </button>
                    </div>
                ) : (
                    <div 
                        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={(e) => { e.preventDefault(); setIsDragOver(false); if(e.dataTransfer.files[0]) onSelectFile(e.dataTransfer.files[0]); }}
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                            "border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer transition-all",
                            isDragOver 
                                ? "border-brand-500 bg-brand-50 dark:bg-brand-900/10" 
                                : "border-slate-300 dark:border-slate-700 hover:border-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                        )}
                    >
                        <input type="file" className="hidden" ref={fileInputRef} accept="image/*" onChange={(e) => onSelectFile(e.target.files?.[0])} />
                        <div className="w-12 h-12 bg-brand-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-brand-600 mb-3">
                            <UploadCloud size={24} />
                        </div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Click to upload or drag & drop</p>
                        <p className="text-xs text-slate-500 mt-1">JPG, PNG up to 5MB</p>
                    </div>
                )
            )}

            {/* Cropping UI */}
            {imgSrc && (
                <div className="mt-6 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                    <ReactCrop 
                        crop={crop} 
                        onChange={(_, pc) => setCrop(pc)} 
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={biodata.customizations.imageShape === 'circle' ? 1 : undefined}
                        circularCrop={biodata.customizations.imageShape === 'circle'}
                        className="max-h-[400px] mx-auto"
                    >
                        <img ref={imgRef} src={imgSrc} alt="Crop" />
                    </ReactCrop>
                    
                    <div className="mt-4 flex justify-end gap-3">
                         <button 
                            onClick={() => setImgSrc('')}
                            className="px-4 py-2 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={!completedCrop}
                            className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg shadow-sm shadow-brand-500/30 flex items-center gap-2"
                        >
                            <Check size={18} /> Save Photo
                        </button>
                    </div>
                    {/* Hidden canvas for processing */}
                    <canvas ref={previewCanvasRef} className="hidden" />
                </div>
            )}
        </div>
    );
};

export default PhotoUpload;