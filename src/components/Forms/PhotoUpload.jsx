// src/components/Forms/PhotoUpload.jsx
import React, { useState, useRef, useCallback } from 'react';
import { Upload, Button, Modal, Slider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useBiodata } from '../../contexts/BiodataContext';

const PhotoUpload = () => {
    const { biodata, updateBiodata } = useBiodata();
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ unit: '%', width: 90, aspect: 1 }); // Aspect ratio 1:1 for profile pic
    const imgRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [zoom, setZoom] = useState(1);

    const onSelectFile = (file) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => setImageSrc(reader.result));
        reader.readAsDataURL(file);
        setModalVisible(true);
        return false; // Prevent Ant Design's default upload
    };

    const onImageLoaded = useCallback((img) => {
        imgRef.current = img;
        return false; // Return false to set crop with a new image.
    }, []);

    // makeClientCrop removed (unused). createCropPreview is called directly when needed.

    const createCropPreview = async (image, crop, fileName) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Canvas is empty'));
                    return;
                }
                blob.name = fileName;
                const fileUrl = window.URL.createObjectURL(blob);
                updateBiodata(draft => {
                    draft.photo = fileUrl; // Store as URL for preview, convert to base64 for PDF
                });
                resolve(fileUrl);
            }, 'image/jpeg');
        });
    };

    const handleSaveCroppedImage = async () => {
        if (imgRef.current && crop && crop.width && crop.height) {
            try {
                await createCropPreview(imgRef.current, crop, 'photo.jpg');
            } catch (err) {
                console.error('Failed to create crop preview', err);
            }
        }
        setModalVisible(false);
    };

    const handleRemovePhoto = () => {
        updateBiodata(draft => {
            draft.photo = null;
        });
    };

    return (
        <div>
            {biodata.photo ? (
                <div style={{ marginBottom: 16 }}>
                    <img src={biodata.photo} alt="Profile Preview" style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '8px' }} />
                    <Button onClick={handleRemovePhoto} danger style={{ marginLeft: 16 }}>Remove Photo</Button>
                </div>
            ) : (
                <Upload
                    accept="image/*"
                    showUploadList={false}
                    beforeUpload={onSelectFile}
                >
                    <Button icon={<UploadOutlined />}>Upload Photo</Button>
                </Upload>
            )}

            <Modal
                title="Crop Image"
                open={modalVisible}
                onOk={handleSaveCroppedImage}
                onCancel={() => setModalVisible(false)}
                width={700}
            >
                {imageSrc && (
                    <>
                        <div style={{ marginBottom: 16 }}>
                            <label>Zoom: </label>
                            <Slider
                                min={1}
                                max={3}
                                step={0.1}
                                value={zoom}
                                onChange={setZoom}
                                style={{ width: '80%', marginLeft: 10 }}
                            />
                        </div>
                        <ReactCrop
                            src={imageSrc}
                            onImageLoaded={onImageLoaded}
                            crop={crop}
                            onChange={(c) => setCrop(c)}
                            crossorigin="anonymous"
                            style={{ maxWidth: '100%', maxHeight: '400px' }}
                            imageStyle={{ transform: `scale(${zoom})` }} // Apply zoom
                        />
                    </>
                )}
            </Modal>
        </div>
    );
};

export default PhotoUpload;