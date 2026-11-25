import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { getLiveCategories, getLiveProducts } from '@/lib/backend-data'

export const metadata: Metadata = {
  title: 'Worm Gear Speed Reducers Catalog',
  description:
    'Browse Hengda WD, WP (WPA/WPO/WPX/WPS), and NMRV cylindrical worm gear speed reducers manufactured in Hangzhou, China. MOQ 50 units, OEM/ODM supported.',
  alternates: { canonical: '/products' },
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const activeCategory = params.category?.trim() || ''
  const [categories, allProducts] = await Promise.all([
    getLiveCategories('en'),
    getLiveProducts('en'),
  ])

  const products = activeCategory
    ? allProducts.filter((p) => p.categorySlug === activeCategory)
    : allProducts

  return (
    <div className="bg-background">
      {/* Page Hero */}
      <section className="border-b border-border bg-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Product Catalog
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
            Worm Gear Speed Reducers
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Direct factory supply of WD, WP (WPA/WPO/WPX/WPS), and NMRV cylindrical worm gear speed reducers built for low-noise, high-efficiency conveyor and industrial drive applications.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href="/products"
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                !activeCategory
                  ? 'bg-primary text-white'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              All Series ({allProducts.length})
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  activeCategory === cat.slug
                    ? 'bg-primary text-white'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                {cat.name} ({allProducts.filter((p) => p.categorySlug === cat.slug).length})
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {products.map((product, idx) => (
            <Reveal key={product.slug} delay={idx * 90} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <Link
                  href={`/products/${product.slug}`}
                  className="relative flex aspect-square items-center justify-center bg-white p-6"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-md bg-navy px-2.5 py-1 font-mono text-xs font-semibold text-white">
                    {product.model}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col border-t border-border p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    {product.categoryName}
                  </p>
                  <h2 className="mt-1.5 font-display text-xl font-bold text-navy">
                    <Link href={`/products/${product.slug}`} className="hover:text-primary">
                      {product.name}
                    </Link>
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-steel">
                    {product.features.slice(0, 3).map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 text-sm font-semibold text-white transition hover:bg-primary"
                    >
                      View Technical Details
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Series Comparison Matrix */}
        <Reveal delay={100}>
          <div className="mt-16 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="border-b border-border px-6 py-5">
              <h2 className="font-display text-xl font-bold text-navy">
                Quick Series Selection Comparison
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Side-by-side overview of housing finish, mounting options, and order terms across our three standard series.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary/70 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-6 py-3.5 font-semibold">Series</th>
                    <th className="px-6 py-3.5 font-semibold">Models</th>
                    <th className="px-6 py-3.5 font-semibold">Housing Finish</th>
                    <th className="px-6 py-3.5 font-semibold">Primary Application</th>
                    <th className="px-6 py-3.5 font-semibold">MOQ</th>
                    <th className="px-6 py-3.5 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {products.map((p) => (
                    <tr key={p.slug} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-navy">{p.name}</td>
                      <td className="px-6 py-4 font-mono text-xs text-steel">{p.model}</td>
                      <td className="px-6 py-4 text-steel">{p.specs['Housing Finish'] || '-'}</td>
                      <td className="px-6 py-4 text-steel">{p.specs['Primary Application'] || 'Conveyor belts'}</td>
                      <td className="px-6 py-4 font-mono tabular text-navy">{p.specs['MOQ'] || '50 Units'}</td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/products/${p.slug}`}
                          className="font-semibold text-primary hover:underline"
                        >
                          Details &rarr;
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
