import { unstable_cache } from 'next/cache'
import { getPublicSupabase } from '@/lib/supabase/server'
import { SITE } from '@/lib/site'

export const R2_BASE = 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/hangzhouhengdaglobal'

export const R2_ASSETS = {
  logo: `${R2_BASE}/brand/hd-logo.png`,
  favicon: `${R2_BASE}/brand/hd-favicon.png`,
  banners: [
    `${R2_BASE}/banners/banner-1.jpg`,
    `${R2_BASE}/banners/banner-2.jpg`,
    `${R2_BASE}/banners/banner-3.jpg`,
  ],
  factory: [
    {
      id: 'factory-4',
      src: `${R2_BASE}/factory/factory-4.jpeg`,
      group: 'Machining Workshop',
      role: 'primary',
      title: 'Main Machining Workshop Hall',
      caption: 'Full-span view of the 2,700 m² manufacturing facility operating three dedicated worm gear machining lines in Xiaoshan, Hangzhou.',
      alt: 'Main machining workshop hall at Hangzhou Hengda Speed Reducer Machinery Factory',
    },
    {
      id: 'factory-5',
      src: `${R2_BASE}/factory/factory-5.jpeg`,
      group: 'CNC Machining',
      role: 'primary',
      title: 'CNC Worm Shaft Processing Center',
      caption: 'Operator machining hardened worm shafts on CNC equipment with staged component bins for batch repeatability.',
      alt: 'CNC machining center and operator processing worm shafts at Hangzhou factory',
    },
    {
      id: 'factory-3',
      src: `${R2_BASE}/factory/factory-3.jpeg`,
      group: 'Assembly Line',
      role: 'secondary',
      title: 'Precision Reducer Assembly Workbench',
      caption: 'Dedicated assembly station with lined aluminum housings and pneumatic fastening tools for NMRV and cast-iron builds.',
      alt: 'Precision worm gear reducer assembly workbench with staged aluminum housings',
    },
    {
      id: 'factory-8',
      src: `${R2_BASE}/factory/factory-8.jpeg`,
      group: 'Gear Components',
      role: 'secondary',
      title: 'Machined Bronze Worm Wheels Staging Area',
      caption: 'Precision-cut bronze worm wheels stacked in the workshop prior to meshing inspection and final housing assembly.',
      alt: 'Machined bronze worm wheels staged in workshop for final assembly',
    },
    {
      id: 'factory-2',
      src: `${R2_BASE}/factory/factory-2.jpeg`,
      group: 'Casting Stock',
      role: 'secondary',
      title: 'Primed Cast-Iron Housing Inventory',
      caption: 'High-volume stock of primed cast-iron WP and WD reducer housings ready for rapid machining and order fulfillment.',
      alt: 'Stacked red-primed cast-iron worm gear reducer housings in factory yard',
    },
    {
      id: 'factory-1',
      src: `${R2_BASE}/factory/factory-1.jpeg`,
      group: 'Component Warehouse',
      role: 'secondary',
      title: 'Worm Wheel & Sub-Assembly Racking',
      caption: 'Organized multi-tier steel racking holding finished bronze worm wheels to support 10-day regular order delivery.',
      alt: 'Multi-tier warehouse racks stocked with bronze worm wheel assemblies',
    },
    {
      id: 'factory-7',
      src: `${R2_BASE}/factory/factory-7.jpeg`,
      group: 'Component Warehouse',
      role: 'secondary',
      title: 'Finished Parts Storage Hall',
      caption: 'Clean multi-aisle component warehouse maintaining safety stock of machined shafts, flanges, and worm wheels.',
      alt: 'Finished components warehouse with steel shelving aisles',
    },
    {
      id: 'factory-6',
      src: `${R2_BASE}/factory/factory-6.jpeg`,
      group: 'Inspection & Dispatch',
      role: 'secondary',
      title: 'Outgoing Inspection & Export Packaging Bay',
      caption: 'Completed worm gear speed reducers verified, cartoned, and staged for domestic and international dispatch.',
      alt: 'Finished worm gear speed reducers inspected and packed in cartons for dispatch',
    },
  ],
} as const

export interface LiveCategory {
  id: string
  slug: string
  name: string
  description: string
  coverImage: string
}

export interface LiveProduct {
  id: string
  slug: string
  model: string
  name: string
  categorySlug: string
  categoryName: string
  description: string
  overview: string
  imageUrl: string
  gallery: string[]
  features: string[]
  applications: string[]
  advantages: string[]
  specs: Record<string, string>
  seoTitle?: string
  seoDescription?: string
}

export interface LiveArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage: string | null
  publishedAt: string | null
  category: string | null
}

export interface LiveTenantSettings {
  brandName: string
  legalName: string
  logoUrl: string
  faviconUrl: string
  phone: string
  email: string
  address: string
  addressShort: string
  tagline: string
  description: string
  defaultLanguage: string
  supportedLanguages: string[]
}

function pickI18nString(
  map: Record<string, unknown> | null | undefined,
  locale: string,
  defaultLocale: string,
  fallback: string,
): string {
  if (map && typeof map === 'object') {
    const req = map[locale]
    if (typeof req === 'string' && req.trim()) return req.trim()
    const def = map[defaultLocale]
    if (typeof def === 'string' && def.trim()) return def.trim()
    for (const val of Object.values(map)) {
      if (typeof val === 'string' && val.trim()) return val.trim()
    }
  }
  return fallback
}

function pickI18nArray(
  map: Record<string, unknown> | null | undefined,
  locale: string,
  defaultLocale: string,
  fallback: string[],
): string[] {
  if (map && typeof map === 'object') {
    const req = map[locale]
    if (Array.isArray(req) && req.length) return req.map(String)
    const def = map[defaultLocale]
    if (Array.isArray(def) && def.length) return def.map(String)
  }
  return fallback
}

const TENANT_ID = () => process.env.NEXT_PUBLIC_TENANT_ID?.trim() || '848c5c8e-f10d-4553-9bf3-6914db25f18f'

const fetchTenantSettingsCached = unstable_cache(
  async (tenantId: string, locale: string): Promise<LiveTenantSettings> => {
    const fallback: LiveTenantSettings = {
      brandName: SITE.brand,
      legalName: SITE.legalName,
      logoUrl: R2_ASSETS.logo,
      faviconUrl: R2_ASSETS.favicon,
      phone: SITE.phone,
      email: SITE.email,
      address: SITE.address,
      addressShort: 'Xiaoshan District, Hangzhou, Zhejiang, China',
      tagline: 'Direct Cylindrical Worm Gear Speed Reducer Manufacturer Since 2001',
      description: 'Founded in 2001 in Hangzhou, China, Hangzhou Hengda Speed Reducer Machinery Factory manufactures WD, WP (WPA/WPO/WPX/WPS), and NMRV worm gear speed reducers.',
      defaultLanguage: 'en',
      supportedLanguages: ['en'],
    }
    const sb = getPublicSupabase()
    if (!sb) return fallback
    const { data } = await sb
      .from('tenants')
      .select('name,logo_url,favicon_url,contact_phone,contact_email,public_contact_email,contact_address_i18n,contact_address_short,site_tagline_i18n,site_description_i18n,default_language,supported_languages,extra_settings')
      .eq('id', tenantId)
      .maybeSingle()
    if (!data) return fallback
    const defLang = data.default_language || 'en'
    const extra = (data.extra_settings && typeof data.extra_settings === 'object' ? data.extra_settings : {}) as Record<string, unknown>
    return {
      brandName: data.name || fallback.brandName,
      legalName: (typeof extra.official_legal_name_en === 'string' && extra.official_legal_name_en.trim()) || fallback.legalName,
      logoUrl: data.logo_url || fallback.logoUrl,
      faviconUrl: data.favicon_url || fallback.faviconUrl,
      phone: data.contact_phone || fallback.phone,
      email: data.public_contact_email || data.contact_email || fallback.email,
      address: pickI18nString(data.contact_address_i18n as Record<string, unknown>, locale, defLang, fallback.address),
      addressShort: data.contact_address_short || fallback.addressShort,
      tagline: pickI18nString(data.site_tagline_i18n as Record<string, unknown>, locale, defLang, fallback.tagline),
      description: pickI18nString(data.site_description_i18n as Record<string, unknown>, locale, defLang, fallback.description),
      defaultLanguage: defLang,
      supportedLanguages: Array.isArray(data.supported_languages) && data.supported_languages.length ? data.supported_languages : ['en'],
    }
  },
  ['hengda-tenant-settings'],
  { revalidate: 60 },
)

const fetchCategoriesCached = unstable_cache(
  async (tenantId: string, locale: string): Promise<LiveCategory[]> => {
    const sb = getPublicSupabase()
    if (!sb) return []
    const { data } = await sb
      .from('product_categories')
      .select('id,slug,name,name_en,name_i18n,description,description_en,description_i18n,extra_data')
      .eq('tenant_id', tenantId)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
    return (data || []).map((c) => {
      const extra = (c.extra_data && typeof c.extra_data === 'object' ? c.extra_data : {}) as Record<string, unknown>
      return {
        id: c.id,
        slug: c.slug,
        name: pickI18nString(c.name_i18n as Record<string, unknown>, locale, 'en', c.name_en || c.name),
        description: pickI18nString(c.description_i18n as Record<string, unknown>, locale, 'en', c.description_en || c.description || ''),
        coverImage: typeof extra.cover_image === 'string' && extra.cover_image ? extra.cover_image : `${R2_BASE}/products/nmrv-series-cover.jpg`,
      }
    })
  },
  ['hengda-categories'],
  { revalidate: 60 },
)

const fetchProductsCached = unstable_cache(
  async (tenantId: string, locale: string): Promise<LiveProduct[]> => {
    const sb = getPublicSupabase()
    if (!sb) return []
    const { data } = await sb
      .from('products')
      .select('id,slug,model,name,name_en,name_i18n,category,category_slug,description,description_en,description_i18n,overview,overview_en,overview_i18n,image_url,features,features_i18n,applications,applications_i18n,advantages,advantages_i18n,specs,extra_data')
      .eq('tenant_id', tenantId)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
    return (data || []).map((p) => {
      const extra = (p.extra_data && typeof p.extra_data === 'object' ? p.extra_data : {}) as Record<string, unknown>
      const gallery = Array.isArray(extra.gallery) && extra.gallery.length
        ? extra.gallery.map(String)
        : (p.image_url ? [p.image_url] : [])
      const specsObj: Record<string, string> = {}
      if (p.specs && typeof p.specs === 'object' && !Array.isArray(p.specs)) {
        for (const [k, v] of Object.entries(p.specs as Record<string, unknown>)) {
          if (v !== null && v !== undefined && String(v).trim()) specsObj[k] = String(v)
        }
      }
      return {
        id: p.id,
        slug: p.slug,
        model: p.model || p.slug.toUpperCase(),
        name: pickI18nString(p.name_i18n as Record<string, unknown>, locale, 'en', p.name_en || p.name),
        categorySlug: p.category_slug || 'worm-gear-speed-reducers',
        categoryName: p.category || 'Worm Gear Speed Reducers',
        description: pickI18nString(p.description_i18n as Record<string, unknown>, locale, 'en', p.description_en || p.description || ''),
        overview: pickI18nString(p.overview_i18n as Record<string, unknown>, locale, 'en', p.overview_en || p.overview || p.description_en || ''),
        imageUrl: p.image_url || gallery[0] || '',
        gallery,
        features: pickI18nArray(p.features_i18n as Record<string, unknown>, locale, 'en', Array.isArray(p.features) ? p.features.map(String) : []),
        applications: pickI18nArray(p.applications_i18n as Record<string, unknown>, locale, 'en', Array.isArray(p.applications) ? p.applications.map(String) : []),
        advantages: pickI18nArray(p.advantages_i18n as Record<string, unknown>, locale, 'en', Array.isArray(p.advantages) ? p.advantages.map(String) : []),
        specs: specsObj,
        seoTitle: pickI18nString(extra.seo_title_i18n as Record<string, unknown>, locale, 'en', ''),
        seoDescription: pickI18nString(extra.seo_description_i18n as Record<string, unknown>, locale, 'en', ''),
      }
    })
  },
  ['hengda-products'],
  { revalidate: 60 },
)

const fetchArticlesCached = unstable_cache(
  async (tenantId: string, locale: string): Promise<LiveArticle[]> => {
    const sb = getPublicSupabase()
    if (!sb) return []
    const { data } = await sb
      .from('articles')
      .select('id,slug,title,title_i18n,excerpt,excerpt_i18n,content,content_i18n,featured_image,published_at,category')
      .eq('tenant_id', tenantId)
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('id', { ascending: true })
    return (data || []).map((a) => ({
      id: a.id,
      slug: a.slug,
      title: pickI18nString(a.title_i18n as Record<string, unknown>, locale, 'en', a.title || ''),
      excerpt: pickI18nString(a.excerpt_i18n as Record<string, unknown>, locale, 'en', a.excerpt || ''),
      content: pickI18nString(a.content_i18n as Record<string, unknown>, locale, 'en', a.content || ''),
      featuredImage: a.featured_image || null,
      publishedAt: a.published_at || null,
      category: a.category || null,
    }))
  },
  ['hengda-articles'],
  { revalidate: 60 },
)

export async function getTenantSettings(locale = 'en') {
  return fetchTenantSettingsCached(TENANT_ID(), locale)
}

export async function getLiveCategories(locale = 'en') {
  return fetchCategoriesCached(TENANT_ID(), locale)
}

export async function getLiveProducts(locale = 'en') {
  return fetchProductsCached(TENANT_ID(), locale)
}

export async function getLiveProductBySlug(slug: string, locale = 'en') {
  const products = await getLiveProducts(locale)
  return products.find((p) => p.slug === slug) || null
}

export async function getLiveArticles(locale = 'en') {
  return fetchArticlesCached(TENANT_ID(), locale)
}

export async function getLiveArticleBySlug(slug: string, locale = 'en') {
  const articles = await getLiveArticles(locale)
  return articles.find((a) => a.slug === slug) || null
}
