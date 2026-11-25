'use client'

import { useCallback, useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import {
  createInquiryCaptchaScope,
  createLatestCaptchaRequestController,
} from '@/lib/inquiry-captcha-scope'

type CaptchaResponse = {
  svg: string
  token: string
  expiresAt: number
}

type InquiryCaptchaFieldProps = {
  tokenName?: string
  answerName?: string
  scopeName?: string
  refreshKey?: number
  className?: string
  idPrefix?: string
}

export function InquiryCaptchaField({
  tokenName = 'captchaToken',
  answerName = 'captchaAnswer',
  scopeName = 'captchaScope',
  refreshKey = 0,
  className = '',
  idPrefix = 'rfq',
}: InquiryCaptchaFieldProps) {
  const [scope] = useState(() => createInquiryCaptchaScope())
  const [requests] = useState(() => createLatestCaptchaRequestController())
  const [challenge, setChallenge] = useState<CaptchaResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const inputId = `${idPrefix}-${answerName}`

  const refresh = useCallback(async () => {
    const request = requests.begin()
    setLoading(true)
    setError('')
    setChallenge(null)
    try {
      const response = await fetch(`/api/captcha?scope=${encodeURIComponent(scope)}`, {
        cache: 'no-store',
        signal: request.signal,
      })
      if (!response.ok) throw new Error('captcha unavailable')
      const body = (await response.json()) as CaptchaResponse
      if (!body.svg || !body.token) throw new Error('invalid captcha response')
      if (!requests.isCurrent(request)) return
      setChallenge(body)
    } catch {
      if (!requests.isCurrent(request)) return
      setError('Failed to load verification code. Click Refresh to try again.')
    } finally {
      if (requests.isCurrent(request)) setLoading(false)
    }
  }, [requests, scope])

  useEffect(() => {
    void refresh()
    return () => requests.abortCurrent()
  }, [refresh, refreshKey, requests])

  return (
    <div className={className}>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-navy">
        Verification Code <span className="text-primary">*</span>
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex h-12 w-40 items-center justify-center overflow-hidden rounded-lg border border-input bg-slate-50">
          {challenge ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(challenge.svg)}`}
              alt="4-digit verification code"
              width={160}
              height={56}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="px-2 text-center text-xs text-muted-foreground">
              {loading ? 'Loading...' : 'Unavailable'}
            </span>
          )}
        </div>
        <input type="hidden" name={scopeName} value={scope} />
        <input type="hidden" name={tokenName} value={challenge?.token ?? ''} />
        <input
          key={challenge?.token ?? refreshKey}
          id={inputId}
          name={answerName}
          type="text"
          required
          disabled={!challenge}
          minLength={4}
          maxLength={4}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          inputMode="text"
          aria-describedby={error ? `${inputId}-error` : undefined}
          className="h-11 w-32 rounded-lg border border-input bg-white px-3 text-base font-medium uppercase tracking-[0.22em] text-navy outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-slate-100"
          placeholder="4 chars"
        />
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={loading}
          className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-input bg-white px-3.5 text-sm font-medium text-navy transition hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw className={`size-3.5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
          Refresh
        </button>
      </div>
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="mt-1.5 text-xs text-primary">
          {error}
        </p>
      ) : null}
    </div>
  )
}
