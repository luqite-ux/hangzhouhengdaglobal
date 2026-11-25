import type { MetadataRoute } from 'next'
import { getLiveArticles, getLiveProducts } from '@/lib/backend-data'

const BASE_URL = 'https://hangzhouhengdaglobal.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, articles] = await Promise.all([
    getLiveProducts('en'),
    getLiveArticles('en'),
  ])

  const staticRoutes = ['', '/products', '/manufacturing', '/about', '/news', '/contact'].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' || route === '/products' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: route === '' ? 1.0 : route === '/products' ? 0.9 : 0.7,
  }))

  const productRoutes = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  const articleRoutes = articles.map((a) => ({
    url: `${BASE_URL}/news/${a.slug}`,
    lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  return [...staticRoutes, ...productRoutes, ...articleRoutes]
}
