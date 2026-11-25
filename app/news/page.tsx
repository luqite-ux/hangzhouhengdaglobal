import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Newspaper } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { getLiveArticles } from '@/lib/backend-data'

export const metadata: Metadata = {
  title: 'News',
  description:
    'Factory announcements, worm gear technical notes, and manufacturing updates from Hangzhou Hengda Speed Reducer Machinery Factory.',
  alternates: { canonical: '/news' },
}

export default async function NewsPage() {
  const articles = await getLiveArticles('en')

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            News
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
            Factory News &amp; Technical Updates
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Official product releases, cylindrical worm gear engineering notes, and production updates from our Hangzhou facility.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        {articles.length === 0 ? (
          <Reveal>
            <div className="mx-auto max-w-xl rounded-2xl border border-border bg-white p-10 text-center shadow-sm">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary text-navy">
                <Newspaper className="size-6" aria-hidden="true" />
              </div>
              <h2 className="mt-4 font-display text-xl font-bold text-navy">
                No Published Articles Yet
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Factory updates and technical articles published from our content system will appear here automatically. In the meantime, explore our worm gear speed reducer series or contact our sales desk directly.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/products"
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-primary/90"
                >
                  Browse Products
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact#rfq"
                  className="inline-flex h-10 items-center rounded-lg border border-input bg-white px-5 text-sm font-semibold text-navy hover:bg-secondary"
                >
                  Contact Factory
                </Link>
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {articles.map((article, idx) => (
              <Reveal key={article.id} delay={idx * 70} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  {article.featuredImage ? (
                    <Link href={`/news/${article.slug}`} className="block aspect-[16/10] overflow-hidden bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                  ) : null}
                  <div className="flex flex-1 flex-col p-6">
                    {article.publishedAt ? (
                      <time
                        dateTime={article.publishedAt}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground"
                      >
                        <Calendar className="size-3.5" aria-hidden="true" />
                        {new Date(article.publishedAt).toISOString().slice(0, 10)}
                      </time>
                    ) : null}
                    <h2 className="mt-2 line-clamp-2 font-display text-lg font-bold text-navy">
                      <Link href={`/news/${article.slug}`} className="hover:text-primary">
                        {article.title}
                      </Link>
                    </h2>
                    {article.excerpt ? (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {article.excerpt}
                      </p>
                    ) : null}
                    <div className="mt-auto pt-5">
                      <Link
                        href={`/news/${article.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                      >
                        Read Article
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
