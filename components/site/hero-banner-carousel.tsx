'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { R2_ASSETS } from '@/lib/backend-data'
import { cn } from '@/lib/utils'

interface BannerSlide {
  id: string
  image: string
  alt: string
  eyebrow: string
  headline: string
  copy: string
  ctaLabel: string
  ctaHref: string
  secondaryLabel: string
  secondaryHref: string
  copySide: 'left' | 'right'
  theme: 'light' | 'dark'
  objectPosition: string
}

const SLIDES: BannerSlide[] = [
  {
    id: 'banner-1',
    image: R2_ASSETS.banners[0],
    alt: 'NMRV silver die-cast aluminum worm gear speed reducer engineered for compact conveyor drives',
    eyebrow: 'Hengda SpeedReducer · Since 2001',
    headline: 'NMRV Aluminum Worm Gear Speed Reducers for Compact Conveyor Drives',
    copy: 'Die-cast silver aluminum housings engineered for low-noise, high-efficiency right-angle power transmission.',
    ctaLabel: 'Explore NMRV Series',
    ctaHref: '/products/nmrv-series-worm-gear-reducer',
    secondaryLabel: 'Request a Quote',
    secondaryHref: '/contact#rfq',
    copySide: 'right',
    theme: 'light',
    objectPosition: 'object-[22%_center]',
  },
  {
    id: 'banner-2',
    image: R2_ASSETS.banners[1],
    alt: 'Industrial cast-iron worm gear speed reducers and precision gears for high-torque transmission',
    eyebrow: 'WP (WPA / WPO / WPX / WPS) & WD Series',
    headline: 'Cast-Iron Cylindrical Worm Reducers Built for High-Torque Transmission',
    copy: 'Complete WPA, WPO, WPX, WPS, and WD configurations with wear-resistant bronze worm wheels and OEM/ODM options.',
    ctaLabel: 'Compare All Series',
    ctaHref: '/products',
    secondaryLabel: 'Request a Quote',
    secondaryHref: '/contact#rfq',
    copySide: 'left',
    theme: 'dark',
    objectPosition: 'object-[76%_center]',
  },
  {
    id: 'banner-3',
    image: R2_ASSETS.banners[2],
    alt: 'Hangzhou direct worm gear speed reducer manufacturing workshop and technical precision assembly',
    eyebrow: 'Direct Hangzhou Manufacturer',
    headline: '2,700 m² Dedicated Factory — 4,000 Reducers Monthly with 10-Day Regular Delivery',
    copy: 'Three workshops and three machining lines in Xiaoshan, Hangzhou supplying industrial machinery builders at MOQ 50 with outgoing factory inspection.',
    ctaLabel: 'Tour Our Factory',
    ctaHref: '/manufacturing',
    secondaryLabel: 'Request a Quote',
    secondaryHref: '/contact#rfq',
    copySide: 'left',
    theme: 'dark',
    objectPosition: 'object-[72%_center]',
  },
]

export function HeroBannerCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setPaused(true)
      return
    }
    if (paused) return
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [paused])

  const prev = () => setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length)
  const next = () => setActive((i) => (i + 1) % SLIDES.length)
  const slide = SLIDES[active]

  return (
    <section
      id="hero-banner-carousel"
      aria-roledescription="carousel"
      aria-label="Hengda SpeedReducer Featured Highlights"
      className="relative overflow-hidden border-b border-border bg-slate-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Desktop (>= 768px): Full-bleed adaptive safe-zone hero */}
      <div className="relative hidden min-h-[540px] w-full md:block lg:min-h-[600px]">
        {SLIDES.map((item, idx) => (
          <div
            key={item.id}
            aria-hidden={idx !== active}
            className={cn(
              'absolute inset-0 transition-opacity duration-700 ease-out',
              idx === active ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0',
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.alt}
              className={cn('absolute inset-0 h-full w-full object-cover', item.copySide === 'right' ? 'object-left' : 'object-right')}
            />
            {/* Minimal localized scrim ONLY behind left copy zone on dark slides; keep right product showcase 100% clear */}
            {item.theme === 'dark' ? (
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,19,42,0.72)_0%,rgba(9,19,42,0.36)_38%,rgba(9,19,42,0)_54%)]"
              />
            ) : null}

            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 py-16">
              <div
                className={cn(
                  'max-w-xl',
                  item.copySide === 'right' ? 'ml-auto text-left' : 'mr-auto text-left',
                )}
              >
                <p
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em]',
                    item.theme === 'light'
                      ? 'bg-navy/10 text-navy'
                      : 'bg-white/15 text-slate-100 backdrop-blur-sm',
                  )}
                >
                  <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                  {item.eyebrow}
                </p>
                {idx === 0 ? (
                  <h1
                    className={cn(
                      'mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight lg:text-5xl',
                      item.theme === 'light' ? 'text-navy' : 'text-white',
                    )}
                  >
                    {item.headline}
                  </h1>
                ) : (
                  <h2
                    className={cn(
                      'mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight lg:text-5xl',
                      item.theme === 'light' ? 'text-navy' : 'text-white',
                    )}
                  >
                    {item.headline}
                  </h2>
                )}
                <p
                  className={cn(
                    'mt-4 text-base leading-relaxed lg:text-lg',
                    item.theme === 'light' ? 'text-slate-700' : 'text-slate-200',
                  )}
                >
                  {item.copy}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    href={item.ctaHref}
                    className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
                  >
                    {item.ctaLabel}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={item.secondaryHref}
                    className={cn(
                      'inline-flex h-12 items-center rounded-lg border px-6 text-sm font-semibold transition',
                      item.theme === 'light'
                        ? 'border-navy/25 bg-white/80 text-navy hover:bg-white'
                        : 'border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20',
                    )}
                  >
                    {item.secondaryLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile (390px): Stacked visual-top (subject focused) + clean high-contrast copy below */}
      <div className="md:hidden">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            alt={slide.alt}
            className={cn('h-full w-full object-cover', slide.objectPosition)}
          />
        </div>
        <div
          className={cn(
            'px-5 py-7',
            slide.theme === 'light' ? 'bg-slate-50 text-navy' : 'bg-navy text-white',
          )}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            {slide.eyebrow}
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold leading-snug">
            {slide.headline}
          </h1>
          <p
            className={cn(
              'mt-3 text-sm leading-relaxed',
              slide.theme === 'light' ? 'text-slate-700' : 'text-slate-300',
            )}
          >
            {slide.copy}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={slide.ctaHref}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white"
            >
              {slide.ctaLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href={slide.secondaryHref}
              className={cn(
                'inline-flex h-11 items-center rounded-lg border px-5 text-sm font-semibold',
                slide.theme === 'light'
                  ? 'border-navy/25 bg-white text-navy'
                  : 'border-white/25 bg-white/10 text-white',
              )}
            >
              {slide.secondaryLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* Unified Carousel Controls */}
      <div className="relative z-20 border-t border-white/10 bg-navy/95 px-4 py-3 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(idx)}
                aria-label={`Show slide ${idx + 1}: ${s.eyebrow}`}
                aria-current={idx === active ? 'true' : undefined}
                className={cn(
                  'h-2.5 rounded-full transition-all',
                  idx === active ? 'w-8 bg-primary' : 'w-2.5 bg-slate-500 hover:bg-slate-300',
                )}
              />
            ))}
            <span className="ml-2 font-mono text-xs text-slate-400 tabular">
              0{active + 1} / 0{SLIDES.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Play banner rotation' : 'Pause banner rotation'}
              className="inline-flex size-9 items-center justify-center rounded-md border border-white/15 bg-white/5 text-slate-200 hover:bg-white/15"
            >
              {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="inline-flex size-9 items-center justify-center rounded-md border border-white/15 bg-white/5 text-slate-200 hover:bg-white/15"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="inline-flex size-9 items-center justify-center rounded-md border border-white/15 bg-white/5 text-slate-200 hover:bg-white/15"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
