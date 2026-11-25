import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Website Temporarily Unavailable',
  robots: { index: false, follow: false },
}

export default function ServiceExpiredPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Service Notice</p>
      <h1 className="mt-3 font-display text-3xl font-bold text-navy">
        Website Service Temporarily Paused
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        This website is currently paused pending service renewal. Site administrators may still sign in via the admin portal.
      </p>
    </section>
  )
}
