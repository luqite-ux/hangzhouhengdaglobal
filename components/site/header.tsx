'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mail, Menu, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Logo } from '@/components/site/logo'
import { NAV_ITEMS, SITE } from '@/lib/site'
import { cn } from '@/lib/utils'

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="hidden bg-navy text-slate-300 lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-xs">
          <p className="tracking-wide">
            Direct factory supply of worm gear speed reducers · MOQ {SITE.moq} units
          </p>
          <div className="flex items-center gap-6">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-1.5 tabular hover:text-white"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              {SITE.phone}
            </a>
            <a
              href={SITE.emailHref}
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              <Mail className="size-3.5" aria-hidden="true" />
              {SITE.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex h-10 items-center px-3.5 text-sm font-medium transition-colors',
                      active ? 'text-navy' : 'text-steel hover:text-navy',
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3.5 -bottom-[13px] h-0.5 bg-primary transition-opacity',
                        active ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/contact#rfq">Request a Quote</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm gap-0 p-0">
              <SheetHeader className="border-b border-border p-5 text-left">
                <SheetTitle className="font-display">Hengda SpeedReducer</SheetTitle>
                <SheetDescription>
                  Direct Hangzhou factory · Since {SITE.founded}
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-3">
                <ul className="flex flex-col">
                  {NAV_ITEMS.map((item) => {
                    const active = isActive(pathname, item.href)
                    return (
                      <li key={item.href}>
                        <SheetClose asChild>
                          <Link
                            href={item.href}
                            aria-current={active ? 'page' : undefined}
                            className={cn(
                              'flex h-12 items-center justify-between rounded-md px-3 text-base font-medium',
                              active
                                ? 'bg-secondary text-navy'
                                : 'text-steel hover:bg-secondary',
                            )}
                          >
                            {item.label}
                            {active && (
                              <span
                                aria-hidden="true"
                                className="size-2 rounded-full bg-primary"
                              />
                            )}
                          </Link>
                        </SheetClose>
                      </li>
                    )
                  })}
                </ul>
              </nav>
              <div className="space-y-3 border-t border-border p-5">
                <SheetClose asChild>
                  <Button asChild className="w-full">
                    <Link href="/contact#rfq">Request a Quote</Link>
                  </Button>
                </SheetClose>
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-2 text-sm text-steel tabular"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {SITE.phone}
                </a>
                <a
                  href={SITE.emailHref}
                  className="flex items-center gap-2 break-all text-sm text-steel"
                >
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  {SITE.email}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
