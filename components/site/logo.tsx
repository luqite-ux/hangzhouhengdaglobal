import Link from 'next/link'
import { R2_ASSETS } from '@/lib/backend-data'
import { cn } from '@/lib/utils'

interface LogoProps {
  tone?: 'light' | 'dark'
  className?: string
}

export function Logo({ tone = 'light', className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Hengda SpeedReducer home"
      className={cn('group inline-flex items-center gap-3', className)}
    >
      <span
        className={cn(
          'flex shrink-0 items-center justify-center rounded-md',
          tone === 'dark' ? 'bg-white px-2 py-1' : 'p-0',
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={R2_ASSETS.logo}
          alt="HD registered trademark logo"
          width={46}
          height={40}
          className="h-9 w-auto object-contain"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-lg font-bold tracking-tight',
            tone === 'dark' ? 'text-white' : 'text-navy',
          )}
        >
          Hengda SpeedReducer
        </span>
        <span
          className={cn(
            'mt-1 text-[11px] font-medium uppercase tracking-[0.14em]',
            tone === 'dark' ? 'text-slate-400' : 'text-muted-foreground',
          )}
        >
          Hangzhou Factory · Since 2001
        </span>
      </span>
    </Link>
  )
}
