import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar } from 'lucide-react'
import { getLiveArticleBySlug } from '@/lib/backend-data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getLiveArticleBySlug(slug, 'en')
  if (!article) return { title: 'Article Not Found' }
  return {
    title: article.title,
    description: article.excerpt || article.title,
    alternates: { canonical: `/news/${article.slug}` },
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getLiveArticleBySlug(slug, 'en')
  if (!article) notFound()

  return (
    <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-navy">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to News
      </Link>

      <header className="mt-6">
        {article.publishedAt ? (
          <time dateTime={article.publishedAt} className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Calendar className="size-3.5" aria-hidden="true" />
            {new Date(article.publishedAt).toISOString().slice(0, 10)}
          </time>
        ) : null}
        <h1 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
          {article.title}
        </h1>
      </header>

      {article.featuredImage ? (
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.featuredImage} alt={article.title} className="w-full object-cover" />
        </div>
      ) : null}

      <div
        className="prose prose-slate mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  )
}
