import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, Button, Modal, Slider, Radio, Space, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useBiodata } from '../../contexts/BiodataContext';

const { Dragger } = Upload;

const PhotoUpload = () => {
    const { biodata, updateBiodata } = useBiodata();
    const [imageSrc, setImageSrc] = useState(null);
    // crop state for react-image-crop (percentage-based for display)
    const [crop, setCrop] = useState(); // Start as undefined to let ReactCrop initialize
    const imgRef = useRef(null); // Reference to the actual <img> element for natural dimensions
    const [modalVisible, setModalVisible] = useState(false);
    const [scale, setScale] = useState(1); // Renamed from zoom to scale for clarity with ReactCrop
    // This state holds the final crop values (pixel-based) that we'll use for saving.
    const [completedCrop, setCompletedCrop] = useState(null);

    // Determine aspect ratio based on selected shape
    const selectedShape = biodata.customizations?.imageShape || 'circle';
    const cropAspect = selectedShape === 'circle' ? 1 : undefined;

    // Reset crop, scale, and imageSrc when modal opens for a new image or closes
    useEffect(() => {
        if (!modalVisible) {
            setImageSrc(null);
            setScale(1);
            setCompletedCrop(null);
            setCrop(undefined); // Reset crop to undefined to re-initialize ReactCrop
        }
    }, [modalVisible]);

    const onSelectFile = (file) => {
        const actualFile = file.file || file;
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setImageSrc(reader.result);
            setModalVisible(true);
        });
        reader.readAsDataURL(actualFile);
        return false; // Prevent AntD from uploading
    };

    // Callback when the image inside ReactCrop loads.
    const onImageLoaded = useCallback((img) => {
        imgRef.current = img; // Store reference to the actual image element
        // When image is loaded, set the initial crop to cover the image
        const { naturalWidth, naturalHeight } = img;
        let initialCrop;

        if (cropAspect === 1) {
            // Center a square crop using pixel units relative to natural image
            const minDim = Math.min(naturalWidth, naturalHeight);
            const x = (naturalWidth - minDim) / 2;
            const y = (naturalHeight - minDim) / 2;
            initialCrop = { unit: 'px', x, y, width: minDim, height: minDim, aspect: 1 };
        } else {
            // Default to full image for rectangle
            initialCrop = { unit: 'px', x: 0, y: 0, width: naturalWidth, height: naturalHeight };
        }
        // ReactCrop expects percentage units for its `crop` prop for dynamic resizing with container.
        // Convert initial pixel crop to percentage relative to natural image size for ReactCrop.
        const percentageCrop = {
            unit: '%',
            x: (initialCrop.x / naturalWidth) * 100,
            y: (initialCrop.y / naturalHeight) * 100,
            width: (initialCrop.width / naturalWidth) * 100,
            height: (initialCrop.height / naturalHeight) * 100,
            aspect: cropAspect
        };
        setCrop(percentageCrop);
        // Also set completedCrop in displayed pixels (what ReactCrop reports in onComplete)
        // so we keep the same units that ReactCrop provides during interactions.
        const displayScaleX = img.width / naturalWidth || 1;
        const displayScaleY = img.height / naturalHeight || 1;
        setCompletedCrop({
            x: Math.round(initialCrop.x * displayScaleX),
            y: Math.round(initialCrop.y * displayScaleY),
            width: Math.round(initialCrop.width * displayScaleX),
            height: Math.round(initialCrop.height * displayScaleY),
            aspect: cropAspect
        });
        return false; // Keep crop state
    }, [cropAspect]);

    // This is called when the user drags the crop area or on initial mount
    const onCropChange = useCallback((newCrop) => {
        setCrop(newCrop);
    }, []);

    // This is called when the user finishes dragging the crop area
    const onCropComplete = useCallback((completedPercentageCrop, completedPixelCrop) => {
        // Store the pixel crop reported by ReactCrop (pixels relative to displayed image size)
        setCompletedCrop(completedPixelCrop);
    }, []);

    // Create cropped image preview logic
    const createCropPreview = async (image, completedCropObj, shape = 'circle') => {
        if (!completedCropObj || !image) {
            throw new Error('No crop selected or image not loaded.');
        }

        // ReactCrop provides pixel crop values relative to the displayed image size.
        // Convert those to natural image pixels for accurate canvas drawing.
        const displayW = image.width;
        const displayH = image.height;
        const naturalW = image.naturalWidth;
        const naturalH = image.naturalHeight;

        if (!displayW || !displayH || !naturalW || !naturalH) {
            throw new Error('Image dimensions not available yet');
        }

        const scaleX = naturalW / displayW;
        const scaleY = naturalH / displayH;

        const sx = Math.max(0, Math.round((completedCropObj.x || 0) * scaleX));
        const sy = Math.max(0, Math.round((completedCropObj.y || 0) * scaleY));
        let sWidth = Math.round((completedCropObj.width || 0) * scaleX);
        let sHeight = Math.round((completedCropObj.height || 0) * scaleY);

        // Clamp
        if (sx + sWidth > naturalW) sWidth = naturalW - sx;
        if (sy + sHeight > naturalH) sHeight = naturalH - sy;
        if (sWidth <= 0 || sHeight <= 0) throw new Error('Invalid crop size');

        const canvas = document.createElement('canvas');
        canvas.width = sWidth;
        canvas.height = sHeight;
        const ctx = canvas.getContext('2d');

        if (shape === 'circle') {
            ctx.beginPath();
            const cx = sWidth / 2;
            const cy = sHeight / 2;
            const r = Math.min(sWidth, sHeight) / 2;
            ctx.arc(cx, cy, r, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
        }

        ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);

        return new Promise((resolve, reject) => {
            const type = shape === 'circle' ? 'image/png' : 'image/jpeg';
            canvas.toBlob((blob) => {
                if (!blob) return reject(new Error('Canvas is empty'));
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }, type, 0.95);
        });
    };

    const handleSaveCroppedImage = async () => {
        // imgRef.current should be the actual <img> element inside ReactCrop
        if (!imgRef.current || !completedCrop || completedCrop.width === 0 || completedCrop.height === 0) {
            message.error("Please select a valid crop area first.");
            return;
        }
        try {
            const shape = biodata.customizations?.imageShape || 'circle';
            const base64 = await createCropPreview(imgRef.current, completedCrop, shape);
            updateBiodata(draft => { draft.photo = base64; });
            message.success("Photo uploaded successfully!");
        } catch (err) {
            console.error('Failed to create crop preview', err);
            message.error("Failed to crop image. Please try again.");
        }
        setModalVisible(false); // This will trigger the useEffect cleanup
    };

    const handleRemovePhoto = () => {
        updateBiodata(draft => { draft.photo = null; });
        message.info("Photo removed.");
    };

    const handleShapeChange = (e) => {
        const newShape = e.target.value;
        updateBiodata(draft => {
            if (!draft.customizations) draft.customizations = {};
            draft.customizations.imageShape = newShape;
        });

        // Adjust crop aspect ratio instantly
        setCrop(currentCrop => {
            const newAspect = newShape === 'circle' ? 1 : undefined;
            if (currentCrop) {
                return {
                    ...currentCrop,
                    aspect: newAspect
                };
            }
            // If there's no current crop (e.g., first time loading or image not yet loaded),
            // set a default 100% crop with the new aspect.
            return { unit: '%', x: 0, y: 0, width: 100, height: 100, aspect: newAspect };
        });
    };

    const handlePlacementChange = (e) => {
        updateBiodata(draft => {
            if (!draft.customizations) draft.customizations = {};
            draft.customizations.imagePlacement = e.target.value;
        });
    };

    return (
        <div>
            <div style={{ marginBottom: 12 }}>
                <div style={{ marginBottom: 8 }}>
                    <strong>Shape:</strong>
                    <Radio.Group onChange={handleShapeChange} value={selectedShape} style={{ marginLeft: 12 }}>
                        <Radio.Button value="circle">Circle</Radio.Button>
                        <Radio.Button value="rect">Rectangle</Radio.Button>
                    </Radio.Group>
                </div>
                <div style={{ marginBottom: 8 }}>
                    <strong>Placement (Personal Details):</strong>
                    <Radio.Group onChange={handlePlacementChange} value={biodata.customizations?.imagePlacement || 'above'} style={{ marginLeft: 12 }}>
                        <Radio.Button value="above">Above</Radio.Button>
                        <Radio.Button value="right">Right</Radio.Button>
                    </Radio.Group>
                </div>
            </div>

            {biodata.photo ? (
                (() => {
                    const isCircle = biodata.customizations?.imageShape === 'circle';
                    return (
                        <div style={{ marginBottom: 16 }}>
                            <div style={{ display: 'inline-block', padding: '3px', background: biodata.customizations?.primaryColor || '#1890ff', borderRadius: isCircle ? '50%' : '8px' }}>
                                <img
                                    src={biodata.photo}
                                    alt="Profile Preview"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        objectFit: 'cover',
                                        borderRadius: isCircle ? '50%' : '6px',
                                        display: 'block'
                                    }}
                                />
                            </div>
                            <Button onClick={handleRemovePhoto} danger style={{ marginLeft: 16 }}>Remove Photo</Button>
                        </div>
                    );
                })()
            ) : (
                <Dragger accept="image/*" showUploadList={false} beforeUpload={onSelectFile} style={{ marginBottom: 12 }}>
                    <Space direction="vertical" align="center" style={{ width: '100%' }}>
                        <UploadOutlined style={{ fontSize: 24 }} />
                        <div>Click or drag image here to upload</div>
                    </Space>
                </Dragger>
            )}

            <Modal
                title="Crop Image"
                open={modalVisible}
                onOk={handleSaveCroppedImage}
                onCancel={() => {
                    setModalVisible(false); // This will trigger the useEffect cleanup
                }}
                width={800}
                okButtonProps={{ disabled: !imgRef.current || !completedCrop }}
                destroyOnClose={true}
            >
                {imageSrc && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ marginRight: 10 }}>Scale (Zoom)</label>
                                <Slider min={1} max={3} step={0.01} value={scale} onChange={setScale} />
                            </div>
                        </div>

                        <div style={{ position: 'relative', width: '100%', height: 500, background: '#f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            <ReactCrop
                                crop={crop}
                                onChange={onCropChange}
                                onComplete={onCropComplete}
                                aspect={cropAspect}
                                keepSelection={false}
                                ruleOfThirds
                                style={{ maxHeight: '100%', maxWidth: '100%' }}
                            >
                                <img
                                    ref={imgRef}
                                    alt="Crop me"
                                    src={imageSrc}
                                    onLoad={onImageLoaded}
                                    style={{
                                        // Use width percentage relative to container to implement zoom.
                                        // This lets ReactCrop measure the displayed image size correctly
                                        // so crop handles remain interactive and coordinates map properly.
                                        width: `${scale * 100}%`,
                                        height: 'auto',
                                        display: 'block',
                                        maxWidth: 'none',
                                    }}
                                />
                            </ReactCrop>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default PhotoUpload;