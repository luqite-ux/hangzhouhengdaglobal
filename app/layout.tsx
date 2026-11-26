import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { R2_ASSETS } from '@/lib/backend-data'
import { SITE } from '@/lib/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const SITE_URL = 'https://hangzhouhengdaglobal.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Hengda SpeedReducer | Worm Gear Speed Reducer Factory in Hangzhou',
    template: '%s | Hengda SpeedReducer',
  },
  description:
    'Direct Hangzhou factory since 2001 supplying WD, WP (WPA/WPO/WPX/WPS), and NMRV cylindrical worm gear speed reducers for conveyor drives. MOQ 50 units, OEM/ODM supported, 10-day regular lead time.',
  applicationName: SITE.brand,
  alternates: {
    canonical: '/',
  },
  keywords: [
    'worm gear speed reducer',
    'NMRV worm gear reducer',
    'WP worm gear reducer',
    'WD worm gear reducer',
    'conveyor drive speed reducer',
    'Hangzhou speed reducer factory',
    'OEM worm gear speed reducer',
  ],
  openGraph: {
    title: 'Hengda SpeedReducer | Worm Gear Speed Reducer Factory',
    description:
      'WD, WP, and NMRV cylindrical worm gear speed reducers from a direct Hangzhou factory since 2001. 4,000 units/month capacity, OEM/ODM supported.',
    siteName: SITE.brand,
    url: SITE_URL,
    type: 'website',
    images: [R2_ASSETS.banners[0]],
  },
}

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.legalName,
    alternateName: SITE.brand,
    url: SITE_URL,
    logo: R2_ASSETS.logo,
    foundingDate: '2001-01-09',
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No. 30, Guancun Development Zone, Louta Town, Xiaoshan District',
      addressLocality: 'Hangzhou',
      addressRegion: 'Zhejiang',
      addressCountry: 'CN',
    },
  }

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          async
          src={`https://admin.globle-trade.com/api/public/analytics.js?tenantId=${encodeURIComponent(process.env.NEXT_PUBLIC_TENANT_ID || "848c5c8e-f10d-4553-9bf3-6914db25f18f")}`}
        />
      </body>
    </html>
  )
}
