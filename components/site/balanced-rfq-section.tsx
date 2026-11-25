'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { InquiryCaptchaField } from '@/components/inquiry-captcha-field'
import { RFQ_MODELS } from '@/lib/content'
import { SITE } from '@/lib/site'

interface RfqSectionProps {
  defaultModel?: string
  sourcePage?: string
  idPrefix?: string
}

export function BalancedRfqSection({
  defaultModel = '',
  sourcePage = '/',
  idPrefix = 'home-rfq',
}: RfqSectionProps) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess(false)

    const fd = new FormData(e.currentTarget)
    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      company: String(fd.get('company') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      model: String(fd.get('model') ?? ''),
      quantity: String(fd.get('quantity') ?? ''),
      message: String(fd.get('message') ?? ''),
      captchaScope: String(fd.get('captchaScope') ?? ''),
      captchaToken: String(fd.get('captchaToken') ?? ''),
      captchaAnswer: String(fd.get('captchaAnswer') ?? ''),
      sourcePage,
    }

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok || !json.ok) {
        setError(json.error || 'Unable to submit inquiry. Please try again.')
        setRefreshKey((k) => k + 1)
        return
      }
      setSuccess(true)
      ;(e.target as HTMLFormElement).reset()
      setRefreshKey((k) => k + 1)
    } catch {
      setError('Network error while submitting. Please email info@hangzhouhengdaglobal.com directly.')
      setRefreshKey((k) => k + 1)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div id="rfq" className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
      {/* Left column: Rich verified Hangzhou factory profile & contact details (balanced height with form) */}
      <div className="flex flex-col justify-between rounded-2xl border border-border bg-navy p-7 text-white sm:p-9 lg:col-span-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Direct Factory Desk
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
            Request a Factory Quote
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Established in 2001 in Xiaoshan District, Hangzhou, {SITE.legalName} supplies WD, WP (WPA/WPO/WPX/WPS), and NMRV cylindrical worm gear speed reducers directly to machinery builders and industrial distributors worldwide.
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-slate-400">Minimum Order</dt>
              <dd className="mt-1 font-display text-lg font-bold tabular text-white">50 Units</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-slate-400">Monthly Output</dt>
              <dd className="mt-1 font-display text-lg font-bold tabular text-white">4,000 Units</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-slate-400">Regular Lead Time</dt>
              <dd className="mt-1 font-display text-lg font-bold tabular text-white">10 Days</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-slate-400">OEM / ODM</dt>
              <dd className="mt-1 font-display text-lg font-bold text-white">Supported</dd>
            </div>
          </dl>
        </div>

        <ul className="mt-8 space-y-4 border-t border-white/10 pt-6 text-sm">
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-slate-400">Factory Address</span>
              <address className="mt-0.5 not-italic text-slate-200">{SITE.address}</address>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-slate-400">Official Phone</span>
              <a href={SITE.phoneHref} className="mt-0.5 block font-mono text-slate-200 hover:text-white">
                {SITE.phone}
              </a>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-slate-400">Sales Email</span>
              <a href={SITE.emailHref} className="mt-0.5 block break-all text-slate-200 hover:text-white">
                {SITE.email}
              </a>
            </div>
          </li>
        </ul>
      </div>

      {/* Right column: Structured RFQ Form with 4-digit Image CAPTCHA */}
      <div className="rounded-2xl border border-border bg-white p-7 shadow-sm sm:p-9 lg:col-span-7">
        {success ? (
          <div role="status" className="flex h-full flex-col items-center justify-center py-10 text-center">
            <CheckCircle2 className="size-12 text-emerald-600" aria-hidden="true" />
            <h4 className="mt-4 font-display text-xl font-bold text-navy">Inquiry Received</h4>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Thank you for contacting {SITE.brand}. Our Hangzhou factory sales desk has received your specification and will reply via email.
            </p>
            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="mt-6 rounded-lg border border-input px-4 py-2 text-sm font-medium text-navy hover:bg-secondary"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${idPrefix}-name`} className="mb-1.5 block text-sm font-medium text-navy">
                  Your Name <span className="text-primary">*</span>
                </label>
                <input
                  id={`${idPrefix}-name`}
                  name="name"
                  type="text"
                  required
                  placeholder="Full name"
                  className="h-11 w-full rounded-lg border border-input bg-white px-3.5 text-sm text-navy outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor={`${idPrefix}-email`} className="mb-1.5 block text-sm font-medium text-navy">
                  Work Email <span className="text-primary">*</span>
                </label>
                <input
                  id={`${idPrefix}-email`}
                  name="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="h-11 w-full rounded-lg border border-input bg-white px-3.5 text-sm text-navy outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${idPrefix}-company`} className="mb-1.5 block text-sm font-medium text-navy">
                  Company Name
                </label>
                <input
                  id={`${idPrefix}-company`}
                  name="company"
                  type="text"
                  placeholder="Optional"
                  className="h-11 w-full rounded-lg border border-input bg-white px-3.5 text-sm text-navy outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor={`${idPrefix}-phone`} className="mb-1.5 block text-sm font-medium text-navy">
                  Phone / WhatsApp
                </label>
                <input
                  id={`${idPrefix}-phone`}
                  name="phone"
                  type="tel"
                  placeholder="+1 / +49 / +86 ..."
                  className="h-11 w-full rounded-lg border border-input bg-white px-3.5 text-sm text-navy outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${idPrefix}-model`} className="mb-1.5 block text-sm font-medium text-navy">
                  Reducer Series / Model
                </label>
                <select
                  id={`${idPrefix}-model`}
                  name="model"
                  defaultValue={defaultModel}
                  className="h-11 w-full rounded-lg border border-input bg-white px-3.5 text-sm text-navy outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select series or model</option>
                  {RFQ_MODELS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`${idPrefix}-quantity`} className="mb-1.5 block text-sm font-medium text-navy">
                  Target Quantity (MOQ 50)
                </label>
                <input
                  id={`${idPrefix}-quantity`}
                  name="quantity"
                  type="text"
                  placeholder="e.g. 100 units"
                  className="h-11 w-full rounded-lg border border-input bg-white px-3.5 text-sm text-navy outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor={`${idPrefix}-message`} className="mb-1.5 block text-sm font-medium text-navy">
                Specification &amp; Delivery Requirements <span className="text-primary">*</span>
              </label>
              <textarea
                id={`${idPrefix}-message`}
                name="message"
                rows={4}
                required
                placeholder="Share ratio, mounting type (WPA/WPO/WPX/WPS/WD/NMRV), conveyor load, custom finish, or target delivery date..."
                className="w-full rounded-lg border border-input bg-white p-3.5 text-sm text-navy outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <InquiryCaptchaField idPrefix={idPrefix} refreshKey={refreshKey} />

            {error ? (
              <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="size-4" aria-hidden="true" />
              {submitting ? 'Submitting Inquiry...' : 'Submit Factory Inquiry'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
