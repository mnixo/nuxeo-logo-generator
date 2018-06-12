export const TEMPLATES = {
  'Avatar-01': {
    viewBox: `0 0 225 225`,
    size: {
      width: 250,
      height: 250,
    },
    colors: [
      {
        id: 'primary',
        label: 'Primary',
        fill: '#0066FF',
        opacity: 1.0,
      },
      {
        id: 'background',
        label: 'Background',
        fill: '#FFFFFF',
        opacity: 0.0,
      },
    ],
    geometry: `
      <polygon class="primary" points="32.25 32.25 32.25 64.85 79.9 112.5 32.25 160.15 32.25 192.75 64.85 192.75 112.5 145.1 160.15 192.75 192.75 192.75 192.75 160.15 145.1 112.5 192.75 64.85 192.75 32.25 160.15 32.25 112.5 79.9 64.85 32.25 32.25 32.25"/>
    `,
  },
  'Avatar-02': {
    viewBox: `0 0 16 16`,
    size: {
      width: 250,
      height: 250,
    },
    colors: [
      {
        id: 'primary',
        label: 'Primary',
        fill: '#FFFFFF',
        opacity: 1.0,
      },
      {
        id: 'secondary',
        label: 'Secondary',
        fill: '#1F28BF',
        opacity: 1.0,
      },
      {
        id: 'background',
        label: 'Background',
        fill: '#FFFFFF',
        opacity: 0.0,
      },
    ],
    geometry: `
      <defs>
        <mask id="mask">
          <rect fill="white" width="100%" height="100%"/>
          <polygon fill="black" points="2.32 2.33 2.32 4.64 5.69 8.01 2.32 11.38 2.32 13.68 4.63 13.68 8 10.31 11.37 13.68 13.68 13.68 13.68 11.38 10.31 8.01 13.68 4.64 13.68 2.33 11.37 2.33 8 5.7 4.63 2.33 2.32 2.33"/>
        </mask>
      </defs>
      <rect class="secondary" width="100%" height="100%" rx="1" ry="1" mask="url(#mask)"/>
      <polygon class="primary" points="2.32 2.33 2.32 4.64 5.69 8.01 2.32 11.38 2.32 13.68 4.63 13.68 8 10.31 11.37 13.68 13.68 13.68 13.68 11.38 10.31 8.01 13.68 4.64 13.68 2.33 11.37 2.33 8 5.7 4.63 2.33 2.32 2.33"/>
    `,
  },
  'Avatar-03': {
    viewBox: `0 0 16 16`,
    size: {
      width: 250,
      height: 250,
    },
    colors: [
      {
        id: 'primary',
        label: 'Primary',
        fill: '#0066FF',
        opacity: 1.0,
      },
      {
        id: 'secondary',
        label: 'Secondary',
        fill: '#73D2CF',
        opacity: 1.0,
      },
      {
        id: 'background',
        label: 'Background',
        fill: '#FFFFFF',
        opacity: 0.0,
      },
    ],
    geometry: `
      <defs>
        <mask id="mask">
          <rect fill="white" width="100%" height="100%"/>
          <polygon fill="black" points="2.98 2.98 2.98 5.02 5.96 8 2.98 10.99 2.98 13.03 5.02 13.03 8 10.04 10.98 13.03 13.02 13.03 13.02 10.99 10.04 8 13.02 5.02 13.02 2.98 10.98 2.98 8 5.96 5.02 2.98 2.98 2.98"/>
        </mask>
      </defs>
      <rect class="secondary" width="100%" height="100%" rx="8" ry="8" mask="url(#mask)"/>
      <polygon class="primary" points="2.98 2.98 2.98 5.02 5.96 8 2.98 10.99 2.98 13.03 5.02 13.03 8 10.04 10.98 13.03 13.02 13.03 13.02 10.99 10.04 8 13.02 5.02 13.02 2.98 10.98 2.98 8 5.96 5.02 2.98 2.98 2.98"/>
    `,
  },
  'NUXEO-LOGO-1': {
    viewBox: `0 0 362.98 68.06`,
    size: {
      width: 533,
      height: 100,
    },
    colors: [
      {
        id: 'primary',
        label: 'Primary',
        fill: '#1F28BF',
        opacity: 1.0,
      },
      {
        id: 'secondary',
        label: 'Secondary',
        fill: '#0066FF',
        opacity: 1.0,
      },
      {
        id: 'background',
        label: 'Background',
        fill: '#FFFFFF',
        opacity: 0.0,
      },
    ],
    geometry: `
      <polygon class="primary" points="147.46 0 147.46 13.82 167.67 34.03 147.46 54.23 147.46 68.06 161.29 68.06 181.49 47.85 201.7 68.06 215.52 68.06 215.52 54.23 195.32 34.03 215.52 13.82 215.52 0 201.7 0 181.49 20.2 161.29 0 147.46 0"/>
      <polygon class="secondary" points="124.78 0 124.78 51.75 90.75 51.75 90.75 0 73.73 0 73.73 51.05 90.75 68.06 141.79 68.06 141.79 0 124.78 0"/>
      <polygon class="secondary" points="51.05 0 0 0 0 68.06 17.02 68.06 17.02 16.31 51.05 16.31 51.05 68.06 68.06 68.06 68.06 17.02 51.05 0"/>
      <path class="secondary" d="M346,0h-51V51l17,17h51V17Zm0,51.75h-34V16.31h34Z"/>
      <polygon class="secondary" points="289.25 16.31 289.25 0 221.19 0 221.19 68.06 289.25 68.06 289.25 51.75 238.21 51.75 238.21 41.95 288.55 41.95 288.55 25.76 238.21 25.76 238.21 16.31 289.25 16.31"/>
    `,
  },
  'NUXEO-LOGO-3': {
    viewBox: `0 0 215.52 214.28`,
    size: {
      width: 250,
      height: 250,
    },
    colors: [
      {
        id: 'primary',
        label: 'Primary',
        fill: '#1F28BF',
        opacity: 1.0,
      },
      {
        id: 'secondary',
        label: 'Secondary',
        fill: '#0066FF',
        opacity: 1.0,
      },
      {
        id: 'background',
        label: 'Background',
        fill: '#FFFFFF',
        opacity: 0.0,
      },
    ],
    geometry: `
      <polygon class="primary" points="0 146.22 0 160.04 20.2 180.25 0 200.45 0 214.28 13.82 214.28 34.03 194.07 54.23 214.28 68.06 214.28 68.06 200.45 47.85 180.25 68.06 160.04 68.06 146.22 54.23 146.22 34.03 166.42 13.82 146.22 0 146.22"/>
      <polygon class="primary" points="147.46 0 147.46 13.82 167.67 34.03 147.46 54.23 147.46 68.06 161.29 68.06 181.49 47.85 201.7 68.06 215.52 68.06 215.52 54.23 195.32 34.03 215.52 13.82 215.52 0 201.7 0 181.49 20.2 161.29 0 147.46 0"/>
      <polygon class="secondary" points="51.05 73.26 51.05 125.02 17.02 125.02 17.02 73.26 0 73.26 0 124.31 17.02 141.32 68.06 141.32 68.06 73.26 51.05 73.26"/>
      <polygon class="secondary" points="124.78 0 124.78 51.75 90.75 51.75 90.75 0 73.73 0 73.73 51.05 90.75 68.06 141.79 68.06 141.79 0 124.78 0"/>
      <polygon class="secondary" points="51.05 0 0 0 0 68.06 17.02 68.06 17.02 16.31 51.05 16.31 51.05 68.06 68.06 68.06 68.06 17.02 51.05 0"/>
      <path class="secondary" d="M198.51,146.22h-51v51l17,17h51v-51Zm0,51.75h-34V162.52h34Z"/>
      <polygon class="secondary" points="141.79 162.52 141.79 146.22 73.73 146.22 73.73 214.28 141.79 214.28 141.79 197.97 90.75 197.97 90.75 188.16 141.08 188.16 141.08 171.97 90.75 171.97 90.75 162.52 141.79 162.52"/>
      <polygon class="secondary" points="215.13 89.18 215.13 72.88 147.07 72.88 147.07 140.93 215.13 140.93 215.13 124.63 164.09 124.63 164.09 114.82 214.43 114.82 214.43 98.63 164.09 98.63 164.09 89.18 215.13 89.18"/>
    `,
  },
  'NUXEO-LOGO-3-BL': {
    viewBox: `0 0 215.52 214.28`,
    size: {
      width: 250,
      height: 250,
    },
    colors: [
      {
        id: 'primary',
        label: 'Primary',
        fill: '#1F28BF',
        opacity: 1.0,
      },
      {
        id: 'secondary',
        label: 'Secondary',
        fill: '#0066FF',
        opacity: 1.0,
      },
      {
        id: 'background',
        label: 'Background',
        fill: '#FFFFFF',
        opacity: 0.0,
      },
    ],
    geometry: `
      <polygon class="primary" points="0 146.22 0 160.04 20.2 180.25 0 200.45 0 214.28 13.82 214.28 34.03 194.07 54.23 214.28 68.06 214.28 68.06 200.45 47.85 180.25 68.06 160.04 68.06 146.22 54.23 146.22 34.03 166.42 13.82 146.22 0 146.22"/>
      <polygon class="secondary" points="51.05 73.26 51.05 125.02 17.02 125.02 17.02 73.26 0 73.26 0 124.31 17.02 141.32 68.06 141.32 68.06 73.26 51.05 73.26"/>
      <polygon class="secondary" points="51.05 0 0 0 0 68.06 17.02 68.06 17.02 16.31 51.05 16.31 51.05 68.06 68.06 68.06 68.06 17.02 51.05 0"/>
      <path class="secondary" d="M198.51,146.22h-51v51l17,17h51v-51Zm0,51.75h-34V162.52h34Z"/>
      <polygon class="secondary" points="141.79 162.52 141.79 146.22 73.73 146.22 73.73 214.28 141.79 214.28 141.79 197.97 90.75 197.97 90.75 188.16 141.08 188.16 141.08 171.97 90.75 171.97 90.75 162.52 141.79 162.52"/>
    `,
  },
  'NUXEO-LOGO-3-TR': {
    viewBox: `0 0 215.52 214.28`,
    size: {
      width: 250,
      height: 250,
    },
    colors: [
      {
        id: 'primary',
        label: 'Primary',
        fill: '#1F28BF',
        opacity: 1.0,
      },
      {
        id: 'secondary',
        label: 'Secondary',
        fill: '#0066FF',
        opacity: 1.0,
      },
      {
        id: 'background',
        label: 'Background',
        fill: '#FFFFFF',
        opacity: 0.0,
      },
    ],
    geometry: `
      <polygon class="primary" points="147.46 0 147.46 13.82 167.67 34.03 147.46 54.23 147.46 68.06 161.29 68.06 181.49 47.85 201.7 68.06 215.52 68.06 215.52 54.23 195.32 34.03 215.52 13.82 215.52 0 201.7 0 181.49 20.2 161.29 0 147.46 0"/>
      <polygon class="secondary" points="124.78 0 124.78 51.75 90.75 51.75 90.75 0 73.73 0 73.73 51.05 90.75 68.06 141.79 68.06 141.79 0 124.78 0"/>
      <polygon class="secondary" points="51.05 0 0 0 0 68.06 17.02 68.06 17.02 16.31 51.05 16.31 51.05 68.06 68.06 68.06 68.06 17.02 51.05 0"/>
      <path class="secondary" d="M198.51,146.22h-51v51l17,17h51v-51Zm0,51.75h-34V162.52h34Z"/>
      <polygon class="secondary" points="215.13 89.18 215.13 72.88 147.07 72.88 147.07 140.93 215.13 140.93 215.13 124.63 164.09 124.63 164.09 114.82 214.43 114.82 214.43 98.63 164.09 98.63 164.09 89.18 215.13 89.18"/>
    `,
  },
  'NUXEO-X': {
    viewBox: `0 0 450 450`,
    size: {
      width: 250,
      height: 250,
    },
    colors: [
      {
        id: 'primary',
        label: 'Primary',
        fill: '#0066FF',
        opacity: 1.0,
      },
      {
        id: 'background',
        label: 'Background',
        fill: '#FFFFFF',
        opacity: 0.0,
      },
    ],
    geometry: `
      <polygon class="primary" points="113.08 112.62 113.08 158.27 179.84 225.03 113.08 291.76 113.08 337.44 158.76 337.44 225.49 270.68 292.25 337.44 337.9 337.44 337.9 291.76 271.17 225.03 337.9 158.27 337.9 112.62 292.25 112.62 225.49 179.35 158.76 112.62 113.08 112.62"/>
    `,
  },
};


export const getSkeleton = (template, size, colors) => {
  if (!template || !size) {
    return '';
  }
  const viewBox = TEMPLATES[template].viewBox;
  const geometry = TEMPLATES[template].geometry;
  let styles = '';
  colors.forEach(color => {
    styles += `
      .${color.id} {
        fill: ${color.fill};
        opacity: ${color.opacity};
      }
    `;
  });
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size.width}px" height="${size.height}px" viewBox="${viewBox}">
      <defs>
        <style>${styles}</style>
      </defs>
      <rect class="background" width="100%" height="100%"/>
      ${geometry}
    </svg>
  `;
};
