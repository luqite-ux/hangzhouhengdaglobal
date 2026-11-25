'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
}

/**
 * Content renders fully visible on the server. After hydration, only elements
 * that start below the fold are hidden, then revealed once on first entry.
 */
export function Reveal({ children, as: Tag = 'div', className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [armed, setArmed] = useState(false)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (typeof IntersectionObserver === 'undefined') return

    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.95) return

    setArmed(true)
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={armed && delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        armed && 'transition-[opacity,transform] duration-700 ease-out',
        armed && !shown && 'translate-y-5 opacity-0',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
