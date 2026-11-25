import Link from 'next/link'
import { ArrowRight, Boxes, CheckCircle2, Cog, Factory, PackageCheck, Route } from 'lucide-react'
import { HeroBannerCarousel } from '@/components/site/hero-banner-carousel'
import { WormGear3DExplorer } from '@/components/site/worm-gear-3d-explorer'
import { BalancedRfqSection } from '@/components/site/balanced-rfq-section'
import { Reveal } from '@/components/site/reveal'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { getLiveCategories, getLiveProducts, R2_ASSETS } from '@/lib/backend-data'
import { APPLICATIONS, FACTORY_METRICS, FAQS, WORKFLOW_STEPS } from '@/lib/content'

const APP_ICONS = {
  route: Route,
  'package-check': PackageCheck,
  boxes: Boxes,
  cog: Cog,
} as const

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getLiveCategories('en'),
    getLiveProducts('en'),
  ])

  const primaryCategory = categories[0]
  const featuredFactory = R2_ASSETS.factory.slice(0, 4)
  const leftFaqs = FAQS.slice(0, 4)
  const rightFaqs = FAQS.slice(4, 8)

  return (
    <>
      {/* 1. Hero Banner Carousel (All 3 Customer 3840x1600 Banners) */}
      <HeroBannerCarousel />

      {/* 2. Factory Metrics Bar */}
      <section id="factory-metrics-bar" className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <Reveal>
            <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:divide-x lg:divide-border">
              {FACTORY_METRICS.map((metric, idx) => (
                <div key={metric.label} className={idx > 0 ? 'lg:pl-8' : ''}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {metric.label}
                  </dt>
                  <dd className="mt-2 font-display text-3xl font-bold tracking-tight text-navy tabular sm:text-4xl">
                    {metric.value}
                  </dd>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* 3. Core Reducer Series (Backend-Driven Products & Category Entry) */}
      <section id="core-reducer-series" className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {primaryCategory?.name || 'Worm Gear Speed Reducers'}
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
                  Core Cylindrical Worm Gear Series
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Compare aluminum and cast-iron housings across NMRV, WP (WPA/WPO/WPX/WPS), and WD series. Every model is supplied directly from our Hangzhou factory at MOQ 50 units.
                </p>
              </div>
              <Link
                href={`/products?category=${primaryCategory?.slug || 'worm-gear-speed-reducers'}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Browse {primaryCategory?.name || 'All Reducers'}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {products.map((product, idx) => (
              <Reveal key={product.slug} delay={idx * 90} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-navy/30 hover:shadow-lg">
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
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {product.categoryName}
                    </p>
                    <h3 className="mt-1.5 font-display text-xl font-bold text-navy">
                      <Link href={`/products/${product.slug}`} className="hover:text-primary">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>
                    <dl className="mt-4 grid grid-cols-2 gap-2 rounded-lg bg-secondary/70 p-3 text-xs">
                      <div>
                        <dt className="text-muted-foreground">Finish</dt>
                        <dd className="font-semibold text-navy">{product.specs['Housing Finish'] || 'Industrial'}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">MOQ</dt>
                        <dd className="font-semibold text-navy tabular">{product.specs['MOQ'] || '50 Units'}</dd>
                      </div>
                    </dl>
                    <div className="mt-auto pt-5">
                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition group-hover:text-primary"
                      >
                        View Specifications
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Three.js 3D Worm Gear Meshing Explorer */}
      <section id="interactive-3d-worm-gear-explorer" className="blueprint-grid border-y border-border bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-8 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Interactive Mechanical Visualization
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
                3D Cylindrical Worm &amp; Wheel Meshing Explorer
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Explore the 90-degree right-angle reduction principle behind Hengda speed reducers. Toggle housing cutaway mode, switch between NMRV, WP, and WD enclosures, and adjust reduction ratios in real time.
              </p>
            </div>
            <WormGear3DExplorer />
          </Reveal>
        </div>
      </section>

      {/* 5. Conveyor & Industrial Applications */}
      <section id="conveyor-industrial-applications" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Built for Industrial Drives
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
                Engineered for Conveyors &amp; Machinery
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Quiet operation, wear-resistant bronze meshing, and compact right-angle layouts tailored for continuous industrial conveyor and OEM equipment lines.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {APPLICATIONS.map((app, idx) => {
              const Icon = APP_ICONS[app.icon]
              return (
                <Reveal key={app.title} delay={idx * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-slate-50/70 p-6 transition hover:-translate-y-1 hover:border-navy/25 hover:bg-white hover:shadow-md">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-navy text-white">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-navy">{app.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{app.text}</p>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                      {app.series.map((s) => (
                        <span
                          key={s}
                          className="rounded bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-navy ring-1 ring-border"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. Manufacturing Workshop Evidence (Curated Real Hangzhou Factory Photos) */}
      <section id="manufacturing-workshop-evidence" className="border-y border-border bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Xiaoshan, Hangzhou Facility
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
                  Inside Our 2,700 m² Reducer Factory
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Three dedicated workshops and three production lines handling CNC worm shaft machining, bronze wheel staging, precision assembly, and outgoing factory inspection.
                </p>
              </div>
              <Link
                href="/manufacturing"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                <Factory className="size-4" aria-hidden="true" />
                Explore All 8 Factory Scenes
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featuredFactory.map((photo, idx) => (
              <Reveal key={photo.id} delay={idx * 80}>
                <figure className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="p-5">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                      {photo.group}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold text-navy">{photo.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{photo.caption}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. OEM / ODM & Customization Workflow */}
      <section id="oem-customization-workflow" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Order &amp; Customization Process
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
                From Specification to Outgoing Inspection
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Clear factory scheduling for standard, bulk, and customized OEM/ODM worm gear reducer orders.
              </p>
            </div>
          </Reveal>

          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW_STEPS.map((step, idx) => (
              <Reveal key={step.title} delay={idx * 80} className="h-full">
                <li className="flex h-full flex-col rounded-2xl border border-border bg-slate-50/70 p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-bold text-primary tabular">
                      0{idx + 1}
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-navy ring-1 ring-border">
                      {step.meta}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  <div className="mt-auto pt-4 text-xs font-medium text-emerald-700 inline-flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5" aria-hidden="true" />
                    Direct Hangzhou Factory
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. Procurement FAQ Section (Balanced 2-Column Accordion) */}
      <section id="procurement-faq-section" className="border-y border-border bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Procurement Questions
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Verified factory details on available series, MOQ 50, OEM/ODM customization, lead times, and outgoing inspection.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Accordion type="single" collapsible className="space-y-3">
                {leftFaqs.map((item, idx) => (
                  <AccordionItem
                    key={item.q}
                    value={`left-${idx}`}
                    className="rounded-xl border border-border bg-white px-5"
                  >
                    <AccordionTrigger className="py-4 text-left text-sm font-semibold text-navy hover:no-underline sm:text-base">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Accordion type="single" collapsible className="space-y-3">
                {rightFaqs.map((item, idx) => (
                  <AccordionItem
                    key={item.q}
                    value={`right-${idx}`}
                    className="rounded-xl border border-border bg-white px-5"
                  >
                    <AccordionTrigger className="py-4 text-left text-sm font-semibold text-navy hover:no-underline sm:text-base">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. Direct RFQ & Contact Section */}
      <section id="direct-rfq-contact-section" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <BalancedRfqSection sourcePage="/" idPrefix="home-rfq" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
