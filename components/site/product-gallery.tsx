'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
  name: string
  images: string[]
}

export function ProductGallery({ name, images }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0)
  const safeImages = images.length ? images : []
  const current = safeImages[selected] || safeImages[0]

  return (
    <div className="space-y-4">
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm">
        {current ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={current}
            alt={`${name} view ${selected + 1}`}
            className="max-h-full max-w-full object-contain"
          />
        ) : null}
      </div>

      {safeImages.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {safeImages.map((src, idx) => (
            <button
              key={src}
              type="button"
              onClick={() => setSelected(idx)}
              aria-label={`View ${name} photo ${idx + 1}`}
              aria-current={idx === selected ? 'true' : undefined}
              className={cn(
                'flex aspect-square items-center justify-center overflow-hidden rounded-xl border bg-white p-2 transition',
                idx === selected
                  ? 'border-primary ring-2 ring-primary/25'
                  : 'border-border hover:border-navy/40',
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${name} thumbnail ${idx + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
