export const LOGO_COLORS = {
  gcs:  '#4285F4',
  s3:   '#FF9900',
  r2:   '#F38020',
  blob: '#0078D4',
};

export const SHORT_NAMES = {
  gcs:  'GCS',
  s3:   'S3',
  r2:   'R2',
  blob: 'Azure',
};

export const IMPLEMENTED_PROVIDERS = ['gcs', 's3', 'r2', 'blob'];

export const MOCK_MONITOR_DATA = {
  gcs: {
    storage: {
      used: 14.2, total: 100, unit: 'GB', objects: 12840,
      buckets: [
        { name: 'vardges-assets',  size: '6.8 GB', pct: 48 },
        { name: 'vardges-uploads', size: '5.1 GB', pct: 36 },
        { name: 'vardges-backups', size: '2.3 GB', pct: 16 },
      ],
      classes: { standard: 62, nearline: 22, coldline: 11, archive: 5 },
    },
    ops: {
      classA: 3820, classALimit: 5000,
      classB: 31400, classBLimit: 50000,
      total: 35220, failed: 0,
    },
    network: {
      ingress: '4.8 GB', egress: '1.2 GB',
      egressPct: 24, interRegion: '320 MB', cdnHitRate: 84,
    },
    cost: {
      total: 1.42, storage: 0.56, ops: 0.31, egress: 0.55,
      projected: 2.10, trend: 'up',
      buckets: [
        { name: 'vardges-assets',  cost: 0.68 },
        { name: 'vardges-uploads', cost: 0.51 },
        { name: 'vardges-backups', cost: 0.23 },
      ],
      isEstimate: true,
    },
    files: {
      recent: [
        { type: 'img', name: 'hero-banner-2024.jpg', size: '2.4 MB', ago: '2h ago' },
        { type: 'pdf', name: 'invoice-00421.pdf',    size: '340 KB', ago: '5h ago' },
        { type: 'img', name: 'product-shot-v3.png',  size: '1.8 MB', ago: '1d ago' },
        { type: 'vid', name: 'promo-reel-final.mp4', size: '84 MB',  ago: '2d ago' },
        { type: 'doc', name: 'q1-report.docx',       size: '218 KB', ago: '3d ago' },
      ],
      largest: [
        { type: 'vid', name: 'promo-reel-final.mp4', size: '84 MB',  ago: '2d ago' },
        { type: 'img', name: 'hero-banner-2024.jpg', size: '2.4 MB', ago: '2h ago' },
        { type: 'img', name: 'product-shot-v3.png',  size: '1.8 MB', ago: '1d ago' },
        { type: 'pdf', name: 'invoice-00421.pdf',    size: '340 KB', ago: '5h ago' },
        { type: 'doc', name: 'q1-report.docx',       size: '218 KB', ago: '3d ago' },
      ],
      typeBreakdown: { images: 58, video: 22, audio: 4, docs: 11, other: 5 },
    },
  },
  s3: {
    storage: {
      used: 0.8, total: 5, unit: 'GB', objects: 324,
      buckets: [
        { name: 'portfolio-global-s3-05-2026', size: '0.8 GB', pct: 100 },
      ],
      classes: { standard: 100, nearline: 0, coldline: 0, archive: 0 },
    },
    ops: {
      classA: 180, classALimit: 2000,
      classB: 4200, classBLimit: 20000,
      total: 4380, failed: 0,
    },
    network: {
      ingress: '820 MB', egress: '340 MB',
      egressPct: 0,
      interRegion: '0 B', cdnHitRate: null,
    },
    cost: {
      total: 0.02, storage: 0.02, ops: 0.00, egress: 0.00,
      projected: 0.03, trend: 'flat',
      buckets: [{ name: 'portfolio-global-s3-05-2026', cost: 0.02 }],
      isEstimate: true,
    },
    files: {
      recent: [
        { type: 'img', name: 's3-test-upload.png', size: '1.1 MB', ago: '1d ago' },
      ],
      largest: [
        { type: 'img', name: 's3-test-upload.png', size: '1.1 MB', ago: '1d ago' },
      ],
      typeBreakdown: { images: 100, video: 0, audio: 0, docs: 0, other: 0 },
    },
  },
  r2: {
    storage: {
      used: 0.4, total: 10, unit: 'GB', objects: 156,
      buckets: [
        { name: 'portfolio-global-r2-05-2026', size: '0.4 GB', pct: 100 },
      ],
      classes: { standard: 100, nearline: 0, coldline: 0, archive: 0 },
    },
    ops: {
      classA: 420,  classALimit: 1000000,
      classB: 8900, classBLimit: 10000000,
      total: 9320,  failed: 0,
    },
    network: {
      ingress:    'N/A',
      egress:     '680 KB',
      egressPct:  0,
      egressFree: true,
      interRegion: '0 B',
      cdnHitRate: null,
    },
    cost: {
      total: 0.01, storage: 0.01, ops: 0.00, egress: 0.00,
      projected: 0.01, trend: 'flat',
      buckets: [{ name: 'portfolio-global-r2-05-2026', cost: 0.01 }],
      isEstimate: true,
    },
    files: {
      recent: [
        { type: 'img', name: 'r2-test-upload.webp', size: '640 KB', ago: '3h ago' },
      ],
      largest: [
        { type: 'img', name: 'r2-test-upload.webp', size: '640 KB', ago: '3h ago' },
      ],
      typeBreakdown: { images: 100, video: 0, audio: 0, docs: 0, other: 0 },
    },
  },
  blob: {
    storage: {
      used: 0.2, total: 5, unit: 'GB', objects: 89,
      buckets: [
        { name: 'portfolio-uploads', size: '0.2 GB', pct: 100 },
      ],
      classes: { standard: 100, nearline: 0, coldline: 0, archive: 0 },
    },
    ops: {
      classA: 250,  classALimit: 10000,
      classB: 1840, classBLimit: 50000,
      total: 2090,  failed: 0,
    },
    network: {
      ingress: '210 MB', egress: '180 MB',
      egressPct: 0,
      interRegion: '0 B', cdnHitRate: null,
    },
    cost: {
      total: 0.00, storage: 0.00, ops: 0.00, egress: 0.00,
      projected: 0.01, trend: 'flat',
      buckets: [{ name: 'portfolio-uploads', cost: 0.00 }],
      isEstimate: true,
    },
    files: {
      recent: [
        { type: 'img', name: 'azure-test-upload.jpg', size: '215 KB', ago: '2h ago' },
      ],
      largest: [
        { type: 'img', name: 'azure-test-upload.jpg', size: '215 KB', ago: '2h ago' },
      ],
      typeBreakdown: { images: 100, video: 0, audio: 0, docs: 0, other: 0 },
    },
  },
};
