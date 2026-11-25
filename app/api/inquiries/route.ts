import { NextResponse } from 'next/server'
import { getAdminSupabase } from '@/lib/supabase/server'
import {
  createSupabaseCaptchaContextFromEnv,
  verifyCaptchaSubmission,
} from '@/lib/inquiry-captcha'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 })
  }

  const secret = process.env.CAPTCHA_SECRET?.trim()
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
  if (!secret || !tenantId) {
    return NextResponse.json({ error: 'Inquiry service configuration incomplete.' }, { status: 503 })
  }

  const captchaScope = String(body.captchaScope ?? '').trim()
  const captchaToken = String(body.captchaToken ?? '').trim()
  const captchaAnswer = String(body.captchaAnswer ?? '').trim()

  let captchaContext
  try {
    captchaContext = createSupabaseCaptchaContextFromEnv(process.env)
  } catch {
    return NextResponse.json({ error: 'Verification service unavailable.' }, { status: 503 })
  }

  const captcha = await verifyCaptchaSubmission({
    secret,
    store: captchaContext.store,
    tenantId: captchaContext.tenantId,
    siteScope: captchaContext.siteScope,
    scope: captchaScope,
    token: captchaToken,
    answer: captchaAnswer,
  })

  if (!captcha.ok) {
    const message =
      captcha.code === 'expired'
        ? 'Verification code expired. Please refresh and try again.'
        : 'Invalid verification code. Please check the 4-character image and try again.'
    return NextResponse.json({ error: message, code: captcha.code }, { status: 400 })
  }

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const company = String(body.company ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const model = String(body.model ?? '').trim()
  const quantity = String(body.quantity ?? '').trim()
  const message = String(body.message ?? '').trim()
  const sourcePage = String(body.sourcePage ?? '/contact').trim()

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please provide your name and a valid email address.' }, { status: 400 })
  }
  if (!message && !model) {
    return NextResponse.json({ error: 'Please specify a reducer model or inquiry details.' }, { status: 400 })
  }

  const composedMessage = [
    model ? `Series / Model: ${model}` : null,
    quantity ? `Target Quantity: ${quantity}` : null,
    message || null,
  ]
    .filter(Boolean)
    .join('\n')

  const supabase = getAdminSupabase()
  const { data, error } = await supabase
    .from('inquiries')
    .insert({
      tenant_id: tenantId,
      name,
      email,
      company: company || null,
      phone: phone || null,
      message: composedMessage,
      product_name: model || null,
      source_page: sourcePage,
      status: 'new',
    })
    .select('id')
    .single()

  if (error) {
    return NextResponse.json({ error: 'Unable to submit inquiry at this moment. Please email info@hangzhouhengdaglobal.com directly.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, id: data?.id ?? null })
}
