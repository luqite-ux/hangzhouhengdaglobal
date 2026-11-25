import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface Crumb {
  label: string
  href?: string
}

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  crumbs: Crumb[]
  children?: ReactNode
}

export function PageHero({ eyebrow, title, description, crumbs, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="blueprint-grid absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary/15 to-transparent"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
            {crumbs.map((crumb, index) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="size-3.5" aria-hidden="true" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-slate-200">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
          <span aria-hidden="true" className="h-px w-8 bg-current" />
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-slate-300">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}
