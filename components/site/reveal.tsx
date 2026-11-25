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
 * Content renders fully visible on the server (progressive enhancement).
 * After hydration, only elements starting below the fold are armed, and they
 * reveal strictly when scrolled into or past the real viewport (no global timer).
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
    if (rect.top < window.innerHeight * 0.96) return

    setArmed(true)

    let revealed = false
    const trigger = () => {
      if (revealed) return
      revealed = true
      setShown(true)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight)) {
          trigger()
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px 0px 0px' },
    )

    const onScroll = () => {
      const r = node.getBoundingClientRect()
      if (r.top < window.innerHeight * 0.98) {
        trigger()
      }
    }

    observer.observe(node)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <Tag
      ref={ref}
      style={armed && delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        armed && 'transition-[opacity,transform] duration-600 ease-out',
        armed && !shown && 'translate-y-5 opacity-0',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
