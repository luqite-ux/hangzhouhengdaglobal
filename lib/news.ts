export interface NewsArticle {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  body: string[]
}

export const NEWS_ARTICLES: NewsArticle[] = []

export function getArticle(slug: string) {
  return NEWS_ARTICLES.find((a) => a.slug === slug)
}
