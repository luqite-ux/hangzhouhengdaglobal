import type { Metadata } from 'next'
import { BalancedRfqSection } from '@/components/site/balanced-rfq-section'
import { Reveal } from '@/components/site/reveal'

export const metadata: Metadata = {
  title: 'Contact & Request a Quote',
  description:
    'Contact Hangzhou Hengda Speed Reducer Machinery Factory in Xiaoshan, Hangzhou. Request factory quotes for WD, WP (WPA/WPO/WPX/WPS), and NMRV worm gear speed reducers.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Direct Factory Inquiry
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
            Contact Our Hangzhou Factory
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Send your reducer series, mounting arrangement, target quantity (MOQ 50), or OEM/ODM drawing directly to our sales engineering desk.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <BalancedRfqSection sourcePage="/contact" idPrefix="contact-rfq" />
        </Reveal>
      </section>
    </div>
  )
}
