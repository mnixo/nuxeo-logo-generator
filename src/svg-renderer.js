const DOMURL = window.URL || window.webkitURL || window;

export const renderSVG = (svg, mimetype = 'image/png') => {
  if (!svg.trim()) {
    return;
  }

  // Replace style tag
  svg = svg.replace(/svg-style>/gmi, 'style>');
  // Parse the SVG
  const holder = document.createElement('div');
  holder.style.display = 'none';
  holder.innerHTML = svg;
  const svgElement = holder.firstElementChild;
  if (svgElement && svgElement.nodeName.toLowerCase() != 'svg') {
    throw new Error('Is not an SVG');
  }

  // Move the SVG to shadow DOM to get its size or use as is
  document.body.appendChild(svgElement);
  svgElement.style.display = '';
  svgElement.style.opacity = '1';

  // Get the size. This requires that the element is visible
  const w = svgElement.clientWidth;
  const h = svgElement.clientHeight;

  svgElement.style.display = 'none';

  // Draw on canvas
  const canvas = document.createElement('canvas');
  canvas.style.display = 'none';
  canvas.width = w * window.devicePixelRatio;
  canvas.height = h * window.devicePixelRatio;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';

  // Convert into an image element through createObjectURL

  const blob = new Blob([ svg ], {
    type: 'image/svg+xml',
  });
  const url = DOMURL.createObjectURL(blob);
  const img = new Image();

  const promise = new Promise((resolve, reject) => {
    // Update the load handler
    img.onload = () => {
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      DOMURL.revokeObjectURL(url);
      document.body.removeChild(svgElement);
      resolve(canvas.toDataURL(mimetype));
    };
    img.onerror = () => {
      reject('Cannot render SVG');
    };
  });

  img.src = url;

  return promise;
};
