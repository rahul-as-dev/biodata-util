/**
 * Universally converts an SVG URL to a High-Quality PNG Data URL.
 * Preserves transparency for borders/frames.
 * Normalizes dimensions to ensure canvas drawing works across browsers.
 */
export const convertToHighResPng = async (url) => {
  if (!url) return null;

  try {
    // 1. Return if already a data URL
    if (url.startsWith('data:')) return url;

    // 2. Fetch the SVG content
    const response = await fetch(url);
    const svgText = await response.text();

    // 3. Parse SVG to normalize dimensions
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, "image/svg+xml");
    const svgElement = doc.documentElement;

    // 4. Determine Dimensions (Crucial for Canvas)
    // Browsers need explicit pixel values to draw SVGs correctly.
    let width = 1200; 
    let height = 1600;

    // Try to get natural dimensions
    if (svgElement.hasAttribute('width') && svgElement.hasAttribute('height')) {
        const w = parseFloat(svgElement.getAttribute('width'));
        const h = parseFloat(svgElement.getAttribute('height'));
        if (!isNaN(w) && !isNaN(h)) {
            width = w;
            height = h;
        }
    } 
    // Fallback to viewBox
    else if (svgElement.hasAttribute('viewBox')) {
        const viewBox = svgElement.getAttribute('viewBox').split(/[\s,]+/).map(Number);
        if (viewBox.length === 4) {
            width = viewBox[2];
            height = viewBox[3];
        }
    }

    // Force absolute pixel dimensions into the SVG string for consistency
    svgElement.setAttribute('width', `${width}px`);
    svgElement.setAttribute('height', `${height}px`);

    // 5. Serialize back to Base64
    const serializer = new XMLSerializer();
    const newSvgText = serializer.serializeToString(doc);
    const base64Svg = btoa(unescape(encodeURIComponent(newSvgText)));
    const dataUrl = `data:image/svg+xml;base64,${base64Svg}`;

    // 6. Rasterize via Canvas
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        // 2x Scale for crisp print quality
        const scale = 2; 
        
        canvas.width = width * scale;
        canvas.height = height * scale;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            resolve(null);
            return;
        }

        // REMOVED: ctx.fillRect('#ffffff') 
        // We want to preserve transparency so borders/frames works correctly.
        // The PDF page background (Layer 1) will provide the white base if needed.

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Export as PNG with transparency preserved
        resolve(canvas.toDataURL('image/png', 1.0));
      };

      img.onerror = (e) => {
        console.warn("Image conversion failed", e);
        resolve(null);
      };

      img.src = dataUrl;
    });

  } catch (error) {
    console.error("Error converting SVG to PNG:", error);
    return null;
  }
};