import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { WormGear3DExplorer } from '@/components/site/worm-gear-3d-explorer'
import { R2_ASSETS } from '@/lib/backend-data'
import { FACTORY_METRICS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Manufacturing Facility & Production Capacity',
  description:
    'Tour Hangzhou Hengda Speed Reducer Machinery Factory in Xiaoshan, Hangzhou: 2,700 m² plant, 3 workshops, 3 production lines, CNC worm shaft machining, bronze worm wheel inventory, and 4,000 units/month capacity.',
  alternates: { canonical: '/manufacturing' },
}

export default function ManufacturingPage() {
  const leadPhotos = R2_ASSETS.factory.slice(0, 2)
  const workshopAndStock = R2_ASSETS.factory.slice(2)

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Hangzhou Production Base · Since 2001
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
            Manufacturing &amp; Inventory Readiness
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Located at No. 30, Guancun Development Zone, Louta Town, Xiaoshan District, Hangzhou, our 2,700 m² facility operates three workshops and three production lines producing up to 4,000 cylindrical worm gear speed reducers each month.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {FACTORY_METRICS.map((m) => (
              <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <dt className="text-[11px] uppercase tracking-wider text-slate-400">{m.label}</dt>
                <dd className="mt-1 font-display text-2xl font-bold tabular text-white">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Primary Machining & CNC Showcase */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Core Workshops
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy">
              Machining Hall &amp; CNC Worm Shaft Processing
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {leadPhotos.map((photo) => (
              <figure
                key={photo.id}
                id={photo.id}
                className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
                </div>
                <figcaption className="p-6">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    {photo.group}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold text-navy">{photo.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{photo.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        {/* Remaining 6 Curated Factory, Assembly, Stock & Dispatch Scenes (All 8 Photos Published!) */}
        <Reveal delay={80}>
          <div className="mt-16 mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Assembly, Stock &amp; Dispatch
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy">
              End-to-End Component Stock &amp; Outgoing Inspection
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Dedicated inventory of primed cast-iron housings and machined bronze worm wheels allows us to fulfill regular orders in 10 days and bulk custom orders in 30 days.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workshopAndStock.map((photo, idx) => (
              <Reveal key={photo.id} delay={idx * 70}>
                <figure
                  id={photo.id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
                  </div>
                  <figcaption className="flex flex-1 flex-col p-5">
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
        </Reveal>

        {/* Interactive 3D Mechanics */}
        <Reveal>
          <div className="mt-20">
            <WormGear3DExplorer />
          </div>
        </Reveal>

        {/* Bottom CTA */}
        <Reveal>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl bg-navy p-8 text-white sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="font-display text-2xl font-bold">Need Custom OEM / ODM Reducers?</h2>
              <p className="mt-2 text-sm text-slate-300">
                Share your drawings, target ratio, housing finish, and order volume (MOQ 50) directly with our Hangzhou factory.
              </p>
            </div>
            <Link
              href="/contact#rfq"
              className="inline-flex h-12 shrink-0 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
            >
              Request Factory Quote
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
