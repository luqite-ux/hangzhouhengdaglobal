export interface ProductVariant {
  code: string
  label: string
  note: string
}

export interface ProductGalleryItem {
  src: string
  alt: string
  caption: string
  fit: 'contain' | 'cover'
}

export interface Product {
  slug: 'wd-series' | 'wp-series' | 'nmrv-series'
  code: string
  name: string
  category: string
  tagline: string
  summary: string
  housing: string
  finish: string
  mounting: string
  image: string
  imageAlt: string
  swatch: string
  highlights: string[]
  variants: ProductVariant[]
  variantLabel: string
  specs: { label: string; value: string }[]
  gallery: ProductGalleryItem[]
}

const sharedSpecs = [
  { label: 'Reducer type', value: 'Cylindrical worm gear speed reducer' },
  { label: 'Noise level', value: 'Low noise' },
  { label: 'Transmission efficiency', value: 'High transmission efficiency' },
  { label: 'Designed for', value: 'Conveyor belt drives' },
  { label: 'Minimum order quantity', value: '50 units' },
  { label: 'Regular order lead time', value: '10 days' },
  { label: 'Bulk / custom production cycle', value: '30 days' },
  {
    label: 'Customization',
    value: 'Custom size, material, color and process (OEM / ODM)',
  },
  { label: 'Dispatch', value: 'Outgoing factory inspection before shipment' },
]

export const PRODUCTS: Product[] = [
  {
    slug: 'wd-series',
    code: 'WD',
    name: 'WD Series Cylindrical Worm Gear Speed Reducer',
    category: 'worm-gear-speed-reducers',
    tagline: 'Army-yellow / olive cast-iron housing for conveyor belt drives.',
    summary:
      'The WD series is a cylindrical worm gear speed reducer in an army-yellow / olive cast-iron housing. It is built for low noise and high transmission efficiency on conveyor belt drives, and is supplied direct from our Hangzhou factory with a 50-unit MOQ.',
    housing: 'Cast iron',
    finish: 'Army-yellow / olive',
    mounting: 'Standard foot-mounted housing',
    image: '/images/products/wd-series.jpg',
    imageAlt:
      'WD series olive cast-iron cylindrical worm gear speed reducer on a white background',
    swatch: '#55602b',
    highlights: [
      'Army-yellow / olive cast-iron housing',
      'Low noise running',
      'High transmission efficiency',
      'Designed for conveyor belt drives',
    ],
    variantLabel: 'Configuration',
    variants: [
      {
        code: 'WD',
        label: 'WD standard',
        note: 'Standard cast-iron housing in army-yellow / olive.',
      },
      {
        code: 'WD-OEM',
        label: 'WD custom (OEM / ODM)',
        note: 'Custom size, material, color or process built to your drawing or specification.',
      },
    ],
    specs: [
      { label: 'Series', value: 'WD' },
      { label: 'Housing material', value: 'Cast iron' },
      { label: 'Housing color', value: 'Army-yellow / olive' },
      ...sharedSpecs,
    ],
    gallery: [
      {
        src: '/images/products/wd-series.jpg',
        alt: 'WD series olive cast-iron worm gear speed reducer',
        caption: 'WD series reducer',
        fit: 'contain',
      },
      {
        src: '/images/factory/cnc-machining.jpg',
        alt: 'CNC machining bay with worm shafts on racks at the Hangzhou factory',
        caption: 'CNC machining of worm shafts',
        fit: 'cover',
      },
      {
        src: '/images/factory/workshop-hall.jpg',
        alt: 'Main workshop hall at the Hangzhou factory',
        caption: 'Main workshop hall',
        fit: 'cover',
      },
    ],
  },
  {
    slug: 'wp-series',
    code: 'WP',
    name: 'WP Series Cast-Iron Worm Gear Speed Reducer',
    category: 'worm-gear-speed-reducers',
    tagline: 'Zhenyu-green cast-iron housing in WPA / WPO / WPX / WPS configurations.',
    summary:
      'The WP series is a cast-iron worm gear speed reducer in a Zhenyu-green housing, available in WPA, WPO, WPX and WPS mounting configurations. Low noise and high transmission efficiency make it a fit for conveyor belt drives.',
    housing: 'Cast iron',
    finish: 'Zhenyu green',
    mounting: 'WPA / WPO / WPX / WPS',
    image: '/images/products/wp-series.jpg',
    imageAlt:
      'WP series green cast-iron worm gear speed reducer on a white background',
    swatch: '#5a7d55',
    highlights: [
      'Zhenyu-green cast-iron housing',
      'WPA / WPO / WPX / WPS mounting configurations',
      'Low noise, high transmission efficiency',
      'Designed for conveyor belt drives',
    ],
    variantLabel: 'Mounting model',
    variants: [
      {
        code: 'WPA',
        label: 'WPA',
        note: 'WPA mounting configuration. Confirm shaft and mounting details with our sales team.',
      },
      {
        code: 'WPO',
        label: 'WPO',
        note: 'WPO mounting configuration. Confirm shaft and mounting details with our sales team.',
      },
      {
        code: 'WPX',
        label: 'WPX',
        note: 'WPX mounting configuration. Confirm shaft and mounting details with our sales team.',
      },
      {
        code: 'WPS',
        label: 'WPS',
        note: 'WPS mounting configuration. Confirm shaft and mounting details with our sales team.',
      },
    ],
    specs: [
      { label: 'Series', value: 'WP (WPA / WPO / WPX / WPS)' },
      { label: 'Housing material', value: 'Cast iron' },
      { label: 'Housing color', value: 'Zhenyu green' },
      { label: 'Mounting configurations', value: 'WPA, WPO, WPX, WPS' },
      ...sharedSpecs,
    ],
    gallery: [
      {
        src: '/images/products/wp-series.jpg',
        alt: 'WP series green cast-iron worm gear speed reducer',
        caption: 'WP series reducer',
        fit: 'contain',
      },
      {
        src: '/images/factory/cnc-machining.jpg',
        alt: 'CNC machining bay with worm shafts on racks at the Hangzhou factory',
        caption: 'CNC machining of worm shafts',
        fit: 'cover',
      },
      {
        src: '/images/factory/workshop-hall.jpg',
        alt: 'Main workshop hall at the Hangzhou factory',
        caption: 'Main workshop hall',
        fit: 'cover',
      },
    ],
  },
  {
    slug: 'nmrv-series',
    code: 'NMRV',
    name: 'NMRV Series Aluminum Worm Gear Speed Reducer',
    category: 'worm-gear-speed-reducers',
    tagline: 'Silver die-cast aluminum housing with compact right-angle mounting.',
    summary:
      'The NMRV series is an aluminum worm gear speed reducer in a silver die-cast housing with compact right-angle mounting. It runs with low noise and high transmission efficiency and is designed for conveyor belt drives where space is limited.',
    housing: 'Die-cast aluminum',
    finish: 'Silver',
    mounting: 'Compact right-angle',
    image: '/images/products/nmrv-series.jpg',
    imageAlt:
      'NMRV series silver die-cast aluminum worm gear speed reducer on a white background',
    swatch: '#c3cad3',
    highlights: [
      'Silver die-cast aluminum housing',
      'Compact right-angle mounting',
      'Low noise, high transmission efficiency',
      'Designed for conveyor belt drives',
    ],
    variantLabel: 'Configuration',
    variants: [
      {
        code: 'NMRV',
        label: 'NMRV standard',
        note: 'Standard die-cast aluminum housing in silver with right-angle mounting.',
      },
      {
        code: 'NMRV-OEM',
        label: 'NMRV custom (OEM / ODM)',
        note: 'Custom size, material, color or process built to your specification.',
      },
    ],
    specs: [
      { label: 'Series', value: 'NMRV' },
      { label: 'Housing material', value: 'Die-cast aluminum' },
      { label: 'Housing color', value: 'Silver' },
      { label: 'Mounting', value: 'Compact right-angle' },
      ...sharedSpecs,
    ],
    gallery: [
      {
        src: '/images/products/nmrv-series.jpg',
        alt: 'NMRV series silver die-cast aluminum worm gear speed reducer',
        caption: 'NMRV series reducer',
        fit: 'contain',
      },
      {
        src: '/images/factory/assembly-bench.jpg',
        alt: 'Assembly workbench with NMRV aluminum housings at the Hangzhou factory',
        caption: 'NMRV housings on the assembly bench',
        fit: 'cover',
      },
      {
        src: '/images/factory/workshop-hall.jpg',
        alt: 'Main workshop hall at the Hangzhou factory',
        caption: 'Main workshop hall',
        fit: 'cover',
      },
    ],
  },
]

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function rfqModelFor(slug: string, variantCode?: string) {
  if (slug === 'wp-series') {
    return variantCode && ['WPA', 'WPO', 'WPX', 'WPS'].includes(variantCode)
      ? variantCode
      : 'WPA'
  }
  if (slug === 'wd-series') return 'WD'
  if (slug === 'nmrv-series') return 'NMRV'
  return ''
}
