import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  className?: string
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'left',
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <p
        className={cn(
          'flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]',
          align === 'center' && 'justify-center',
          tone === 'dark' ? 'text-red-400' : 'text-primary',
        )}
      >
        <span aria-hidden="true" className="h-px w-8 bg-current" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          'mt-4 text-balance text-3xl font-bold leading-tight sm:text-4xl',
          tone === 'dark' ? 'text-white' : 'text-navy',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-pretty text-base leading-relaxed sm:text-lg',
            tone === 'dark' ? 'text-slate-300' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
