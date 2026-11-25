export const SITE = {
  brand: 'Hengda SpeedReducer',
  legalName: 'Hangzhou Hengda Speed Reducer Machinery Factory',
  founded: 2001,
  address:
    'No. 30, Guancun Development Zone, Louta Town, Xiaoshan District, Hangzhou, Zhejiang, China',
  phone: '+86 13967166823',
  phoneHref: 'tel:+8613967166823',
  email: 'info@hangzhouhengdaglobal.com',
  emailHref: 'mailto:info@hangzhouhengdaglobal.com',
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=Guancun+Development+Zone+Louta+Town+Xiaoshan+District+Hangzhou+Zhejiang+China',
  moq: 50,
  capacity: 4000,
  regularLeadDays: 10,
  bulkLeadDays: 30,
  areaM2: 2700,
} as const

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'About', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
] as const

export const PRODUCT_CATEGORY = {
  slug: 'worm-gear-speed-reducers',
  label: 'Worm Gear Speed Reducers',
} as const
