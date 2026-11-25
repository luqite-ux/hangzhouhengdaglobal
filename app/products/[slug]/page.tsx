import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import { ProductGallery } from '@/components/site/product-gallery'
import { BalancedRfqSection } from '@/components/site/balanced-rfq-section'
import { Reveal } from '@/components/site/reveal'
import { getLiveProductBySlug, getLiveProducts } from '@/lib/backend-data'
import { SITE } from '@/lib/site'

export async function generateStaticParams() {
  const products = await getLiveProducts('en')
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getLiveProductBySlug(slug, 'en')
  if (!product) return { title: 'Product Not Found' }
  return {
    title: product.seoTitle || product.name,
    description: product.seoDescription || product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.seoTitle || product.name,
      description: product.seoDescription || product.description,
      images: product.imageUrl ? [product.imageUrl] : undefined,
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getLiveProductBySlug(slug, 'en')
  if (!product) notFound()

  const allProducts = await getLiveProducts('en')
  const related = allProducts.filter((p) => p.slug !== product.slug)

  const defaultModel = product.slug.includes('wp')
    ? 'WPA'
    : product.slug.includes('wd')
      ? 'WD'
      : 'NMRV'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.overview || product.description,
    image: product.gallery,
    brand: { '@type': 'Brand', name: SITE.brand },
    manufacturer: { '@type': 'Organization', name: SITE.legalName },
    category: product.categoryName,
  }

  return (
    <div className="bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-white">
        <nav aria-label="Breadcrumb" className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3.5 text-xs text-muted-foreground sm:px-6">
          <Link href="/" className="hover:text-navy">Home</Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <Link href="/products" className="hover:text-navy">Products</Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span className="font-medium text-navy">{product.name}</span>
        </nav>
      </div>

      {/* Top Product Overview */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ProductGallery name={product.name} images={product.gallery} />
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {product.categoryName} · {product.model}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-steel">
              {product.overview || product.description}
            </p>

            {/* Key Highlights */}
            {product.features.length ? (
              <div className="mt-6 rounded-2xl border border-border bg-white p-6">
                <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Key Mechanical Highlights
                </h2>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {product.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-navy">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Structured Technical Specification Table */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white">
              <div className="border-b border-border bg-secondary/50 px-6 py-3.5">
                <h2 className="font-display text-base font-bold text-navy">
                  Technical Specifications &amp; Supply Terms
                </h2>
              </div>
              <dl className="divide-y divide-border text-sm">
                {Object.entries(product.specs).map(([label, value]) => (
                  <div key={label} className="grid grid-cols-1 gap-1 px-6 py-3.5 sm:grid-cols-3">
                    <dt className="font-medium text-muted-foreground">{label}</dt>
                    <dd className="font-semibold text-navy sm:col-span-2">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#product-rfq"
                className="inline-flex h-12 items-center rounded-lg bg-primary px-6 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
              >
                Request Quote for {product.model}
              </a>
              <Link
                href="/products"
                className="inline-flex h-12 items-center rounded-lg border border-input bg-white px-6 text-sm font-semibold text-navy hover:bg-secondary"
              >
                Compare All Series
              </Link>
            </div>
          </div>
        </div>

        {/* Applications & Factory Advantages */}
        <Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white p-7">
              <h2 className="font-display text-xl font-bold text-navy">Typical Applications</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-steel">
                {product.applications.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-white p-7">
              <h2 className="font-display text-xl font-bold text-navy">Direct Factory Advantages</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-steel">
                {product.advantages.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Related Series */}
        {related.length ? (
          <Reveal>
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold text-navy">Other Worm Gear Series</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/products/${item.slug}`}
                    className="group flex items-center gap-5 rounded-2xl border border-border bg-white p-5 transition hover:-translate-y-0.5 hover:border-navy/30 hover:shadow-md"
                  >
                    <div className="flex size-24 shrink-0 items-center justify-center rounded-xl bg-white p-2 ring-1 ring-border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.imageUrl} alt={item.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-semibold text-primary">{item.model}</span>
                      <h3 className="mt-1 font-display text-lg font-bold text-navy group-hover:text-primary">
                        {item.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        ) : null}

        {/* Product-context RFQ */}
        <Reveal>
          <div id="product-rfq" className="mt-16">
            <BalancedRfqSection
              defaultModel={defaultModel}
              sourcePage={`/products/${product.slug}`}
              idPrefix={`prod-${product.slug}`}
            />
          </div>
        </Reveal>
      </section>
    </div>
  )
}
