import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Button, Space, Radio, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useBiodata } from '../../contexts/BiodataContext';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const PhotoUpload = () => {
  const { biodata, updateBiodata } = useBiodata();

  const [imgSrc, setImgSrc] = useState('');
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const initialAspect = biodata?.customizations?.imageShape === 'circle' ? 1 : undefined;
  const [crop, setCrop] = useState(
    initialAspect ? { unit: '%', width: 50, aspect: initialAspect } : { unit: '%', width: 60 }
  );
  const [completedCrop, setCompletedCrop] = useState(null);

  const { Dragger } = Upload;

  // Accept either a File (from antd) or an input event (if you later switch to <input/>)
  const onSelectFile = (fileOrEvent) => {
    let file;
    if (fileOrEvent && fileOrEvent.target && fileOrEvent.target.files) {
      file = fileOrEvent.target.files[0];
    } else {
      // antd's beforeUpload gives a File directly
      file = fileOrEvent;
    }
    if (!file) return false;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImgSrc(reader.result || '');
      setCrop(initialAspect ? { unit: '%', width: 50, aspect: initialAspect } : { unit: '%', width: 60 });
      setCompletedCrop(null);
    });
    reader.readAsDataURL(file);

    // prevent antd from uploading the file to any server
    return false;
  };

  const onImageLoad = useCallback(() => {
    // no-op but kept in case we want to auto-adjust crop to image on load
  }, []);

  // Draw the completed crop into the preview canvas
  useEffect(() => {
    if (!completedCrop || !imgRef.current || !previewCanvasRef.current) return;

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const cropObj = completedCrop;

    // guard: ensure numerical values
    const cropWidth = Number(cropObj.width || 0);
    const cropHeight = Number(cropObj.height || 0);
    const cropX = Number(cropObj.x || 0);
    const cropY = Number(cropObj.y || 0);

    if (cropWidth <= 0 || cropHeight <= 0) {
      // nothing to draw
      return;
    }

    // scale from displayed image to natural image
    const displayedWidth = image.width || image.offsetWidth || 1;
    const displayedHeight = image.height || image.offsetHeight || 1;
    const scaleX = image.naturalWidth / displayedWidth;
    const scaleY = image.naturalHeight / displayedHeight;

    const pixelRatio = window.devicePixelRatio || 1;

    // Set canvas size (in CSS pixels)
    canvas.width = Math.round(cropWidth * pixelRatio);
    canvas.height = Math.round(cropHeight * pixelRatio);
    canvas.style.width = `${cropWidth}px`;
    canvas.style.height = `${cropHeight}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, cropWidth, cropHeight);

    const sx = Math.round(cropX * scaleX);
    const sy = Math.round(cropY * scaleY);
    const sWidth = Math.round(cropWidth * scaleX);
    const sHeight = Math.round(cropHeight * scaleY);

    try {
      ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, cropWidth, cropHeight);
    } catch (err) {
      // defensive: in rare cases drawImage can throw if sizes are invalid
      // console.error('drawImage failed', err);
    }
  }, [completedCrop]);

  const handleSaveCroppedImage = async () => {
    if (!completedCrop || !previewCanvasRef.current) {
      message.error('Please select a crop before saving.');
      return;
    }

    const canvas = previewCanvasRef.current;

    // Export as JPEG (change to 'image/png' if you prefer)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

    updateBiodata((draft) => {
      draft.photo = dataUrl;
    });

    message.success('Photo saved.');
    // clear the temporary UI
    setImgSrc('');
    setCrop(null);
    setCompletedCrop(null);
  };

  const handlePlacementChange = (e) => {
    updateBiodata((draft) => {
      if (!draft.customizations) draft.customizations = {};
      draft.customizations.imagePlacement = e.target.value;
    });
  };

  const handleShapeChange = (e) => {
    const newShape = e.target.value;
    updateBiodata((draft) => {
      if (!draft.customizations) draft.customizations = {};
      draft.customizations.imageShape = newShape;
    });

    // adjust crop aspect when shape changes
    setCrop((prev) =>
      newShape === 'circle' ? { unit: '%', width: 50, aspect: 1 } : { unit: '%', width: 60 }
    );
  };

  const handleRemovePhoto = () => {
    updateBiodata((draft) => {
      draft.photo = null;
    });
    message.info('Photo removed.');
  };

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ marginBottom: 8 }}>
          <strong>Shape:</strong>
          <Radio.Group
            onChange={handleShapeChange}
            value={biodata?.customizations?.imageShape || 'circle'}
            style={{ marginLeft: 12 }}
          >
            <Radio.Button value="circle">Circle</Radio.Button>
            <Radio.Button value="rect">Rectangle</Radio.Button>
          </Radio.Group>
        </div>

        <div style={{ marginBottom: 8 }}>
          <strong>Placement (Personal Details):</strong>
          <Radio.Group
            onChange={handlePlacementChange}
            value={biodata?.customizations?.imagePlacement || 'above'}
            style={{ marginLeft: 12 }}
          >
            <Radio.Button value="above">Above</Radio.Button>
            <Radio.Button value="right">Right</Radio.Button>
          </Radio.Group>
        </div>
      </div>

      {biodata?.photo ? (
        (() => {
          const isCircle = biodata?.customizations?.imageShape === 'circle';
          return (
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  display: 'inline-block',
                  padding: '3px',
                  background: biodata?.customizations?.primaryColor || '#1890ff',
                  borderRadius: isCircle ? '50%' : '8px',
                }}
              >
                <img
                  src={biodata.photo}
                  alt="Profile Preview"
                  style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: isCircle ? '50%' : '6px',
                    display: 'block',
                  }}
                />
              </div>
              <Button onClick={handleRemovePhoto} danger style={{ marginLeft: 16 }}>
                Remove Photo
              </Button>
            </div>
          );
        })()
      ) : (
        <Dragger
          accept="image/*"
          showUploadList={false}
          // beforeUpload receives the file; return false to prevent upload
          beforeUpload={(file) => onSelectFile(file)}
          style={{ marginBottom: 12 }}
        >
          <Space direction="vertical" align="center" style={{ width: '100%' }}>
            <UploadOutlined style={{ fontSize: 24 }} />
            <div>Click or drag image here to upload</div>
          </Space>
        </Dragger>
      )}

      {!!imgSrc && (
        <div>
          <ReactCrop
            crop={crop ?? undefined}
            onChange={(newCrop, percentCrop) => setCrop(percentCrop || newCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            ruleOfThirds
            circularCrop={biodata?.customizations?.imageShape === 'circle'}
          >
            <img
              ref={imgRef}
              alt="To be cropped"
              src={imgSrc}
              onLoad={onImageLoad}
              style={{ maxWidth: '100%', maxHeight: 480 }}
            />
          </ReactCrop>

          <div style={{ marginTop: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
            <Button type="primary" onClick={handleSaveCroppedImage} disabled={!completedCrop}>
              Save Cropped Photo
            </Button>

            <Button
              onClick={() => {
                setImgSrc('');
                setCrop(null);
                setCompletedCrop(null);
              }}
            >
              Cancel
            </Button>

            <div style={{ marginLeft: 'auto', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Preview</div>
              <canvas
                ref={previewCanvasRef}
                style={{
                  maxWidth: 120,
                  maxHeight: 120,
                  borderRadius: biodata?.customizations?.imageShape === 'circle' ? '50%' : 6,
                  boxShadow: '0 0 0 2px rgba(0,0,0,0.05)',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
