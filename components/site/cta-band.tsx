import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/site'

interface CtaBandProps {
  title?: string
  description?: string
}

export function CtaBand({
  title = 'Send us your reducer specification',
  description = 'Tell us the series, mounting model and quantity. Our factory sales team replies with a quotation for MOQ 50 units and up.',
}: CtaBandProps) {
  return (
    <section className="bg-secondary py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-xl bg-navy px-6 py-10 text-white sm:px-12 sm:py-14">
          <div aria-hidden="true" className="blueprint-grid absolute inset-0 opacity-50" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-bold sm:text-4xl">{title}</h2>
              <p className="mt-3 text-pretty text-slate-300">{description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact#rfq">
                  Request a Quote
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white hover:text-navy"
              >
                <a href={SITE.phoneHref}>
                  <Phone aria-hidden="true" />
                  <span className="tabular">{SITE.phone}</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
