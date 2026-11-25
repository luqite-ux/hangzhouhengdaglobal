import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { NAV_ITEMS, SITE } from '@/lib/site'

const FOOTER_SERIES = [
  { label: 'NMRV Series', href: '/products/nmrv-series-worm-gear-reducer' },
  { label: 'WP Series (WPA/WPO/WPX/WPS)', href: '/products/wp-series-worm-gear-reducer' },
  { label: 'WD Series', href: '/products/wd-worm-gear-reducer' },
]

export function SiteFooter() {
  return (
    <footer className="bg-navy text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Logo tone="dark" />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-400">
            Direct Hangzhou factory manufacturing cylindrical worm gear speed reducers
            since {SITE.founded}. WD, WP, and NMRV series for conveyor drives, with OEM
            and ODM supply.
          </p>
          <dl className="mt-6 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <div>
              <dt className="text-[11px] uppercase tracking-widest text-slate-400">MOQ</dt>
              <dd className="mt-1 font-display text-lg font-semibold tabular text-white">
                {SITE.moq} units
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-widest text-slate-400">Capacity</dt>
              <dd className="mt-1 font-display text-lg font-semibold tabular text-white">
                4,000 / mo
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-widest text-slate-400">Lead time</dt>
              <dd className="mt-1 font-display text-lg font-semibold tabular text-white">
                10 days
              </dd>
            </div>
          </dl>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 lg:col-span-3">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Series
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {FOOTER_SERIES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="hover:text-white">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Factory contact
          </h2>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <address className="not-italic leading-relaxed">{SITE.address}</address>
            </li>
            <li>
              <a href={SITE.phoneHref} className="flex gap-3 tabular hover:text-white">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={SITE.emailHref} className="flex gap-3 break-all hover:text-white">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <p>HD® is a registered trademark of {SITE.brand}.</p>
        </div>
      </div>
    </footer>
  )
}
