import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { R2_ASSETS } from '@/lib/backend-data'
import { FACTORY_METRICS } from '@/lib/content'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Hangzhou Hengda Speed Reducer Machinery Factory',
  description:
    'Founded in January 2001 in Xiaoshan District, Hangzhou, Hangzhou Hengda Speed Reducer Machinery Factory specializes in WD, WP, and NMRV cylindrical worm gear speed reducers.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            About Our Factory · Established 2001
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold sm:text-5xl">
            {SITE.legalName}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Founded on January 9, 2001 in Xiaoshan District, Hangzhou, Zhejiang, we specialize in designing, manufacturing, and supplying Hengda-brand cylindrical worm gear speed reducers for industrial conveyor and machinery builders.
          </p>
        </div>
      </section>

      {/* Company Narrative + Workshop Photo */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Who We Are
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy">
              25+ Years Dedicated to Cylindrical Worm Gear Drives
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-steel sm:text-base">
              Guided by the spirit of integrity, innovation, and steady progress, {SITE.legalName} focuses exclusively on cylindrical worm gear speed reducers — spanning the NMRV die-cast aluminum series, the WP cast-iron series (WPA, WPO, WPX, WPS), and the WD cast-iron series.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-steel sm:text-base">
              Operating a ~2,700 m² plant with three workshops and three production lines in Louta Town, Xiaoshan District, Hangzhou, our team combines CNC worm shaft machining, precision bronze worm wheel inventory, and outgoing factory inspection to deliver dependable monthly output of 4,000 units.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-navy">
              {[
                'Direct factory manufacturer established in Hangzhou in 2001',
                'Standard MOQ of 50 units with bulk cooperation pricing',
                '10-day regular order delivery and 30-day bulk / custom production cycle',
                'OEM / ODM customization covering size, material, finish color, and process',
                'Outgoing factory inspection prior to shipment',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
            <figure id="factory" className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm sm:col-span-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={R2_ASSETS.factory[0].src}
                alt={R2_ASSETS.factory[0].alt}
                className="aspect-[16/10] w-full object-cover"
              />
              <figcaption className="px-4 py-3 text-xs text-muted-foreground">
                {R2_ASSETS.factory[0].title} — Xiaoshan District, Hangzhou
              </figcaption>
            </figure>
            <figure id="inventory" className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={R2_ASSETS.factory[6].src}
                alt={R2_ASSETS.factory[6].alt}
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="px-4 py-2.5 text-xs text-muted-foreground">
                {R2_ASSETS.factory[6].title}
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={R2_ASSETS.factory[1].src}
                alt={R2_ASSETS.factory[1].alt}
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="px-4 py-2.5 text-xs text-muted-foreground">
                {R2_ASSETS.factory[1].title}
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Scale KPIs */}
        <Reveal>
          <dl className="mt-16 grid grid-cols-2 gap-6 rounded-2xl border border-border bg-white p-8 shadow-sm lg:grid-cols-4">
            {FACTORY_METRICS.map((m) => (
              <div key={m.label}>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{m.label}</dt>
                <dd className="mt-2 font-display text-3xl font-bold tabular text-navy">{m.value}</dd>
                <p className="mt-1 text-xs text-muted-foreground">{m.detail}</p>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Verified Factory Contact Card */}
        <Reveal>
          <div className="mt-14 grid gap-6 rounded-2xl border border-border bg-white p-8 shadow-sm md:grid-cols-3">
            <div className="flex items-start gap-3">
              <Building2 className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-bold text-navy">Registered Manufacturer</h3>
                <p className="mt-1 text-sm text-muted-foreground">{SITE.legalName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-bold text-navy">Factory Location</h3>
                <p className="mt-1 text-sm text-muted-foreground">{SITE.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-bold text-navy">Direct Contact</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  <a href={SITE.phoneHref} className="hover:text-navy">{SITE.phone}</a>
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  <a href={SITE.emailHref} className="inline-flex items-center gap-1 hover:text-navy">
                    <Mail className="size-3.5" aria-hidden="true" />
                    {SITE.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
          >
            Explore Worm Gear Series
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/manufacturing"
            className="inline-flex h-11 items-center rounded-lg border border-input bg-white px-6 text-sm font-semibold text-navy hover:bg-secondary"
          >
            View Manufacturing Gallery
          </Link>
        </div>
      </section>
    </div>
  )
}
