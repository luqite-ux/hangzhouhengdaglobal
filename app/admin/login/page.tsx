import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Sign In | Hengda SpeedReducer',
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; reason?: string }>
}) {
  const params = await searchParams
  const errorMessage = params.error?.trim() || (params.reason === 'unauthorized' ? 'Please sign in to access the admin portal.' : '')

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-xl border border-border bg-white p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Hengda SpeedReducer</p>
          <h1 className="mt-2 font-display text-2xl font-bold text-navy">Admin Portal Sign In</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage products, news articles, inquiries, and site settings.
          </p>
        </div>

        {errorMessage ? (
          <div role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {errorMessage}
          </div>
        ) : null}

        <form action="/api/auth/login" method="post" className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="info@hangzhouhengdaglobal.com"
              className="h-11 w-full rounded-lg border border-input bg-white px-3.5 text-sm text-navy outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="h-11 w-full rounded-lg border border-input bg-white px-3.5 text-sm text-navy outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            type="submit"
            className="h-11 w-full rounded-lg bg-primary text-sm font-semibold text-white transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
