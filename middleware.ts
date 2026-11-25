import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/admin-session'
import { isServiceGuardExcludedPath, isWebsiteServiceAvailable } from '@/lib/service-status'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    const isPublicAdmin = pathname.startsWith('/admin/login') || pathname.startsWith('/admin/logout')
    if (!isPublicAdmin && !request.cookies.get(SESSION_COOKIE)?.value) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      url.searchParams.set('reason', 'unauthorized')
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  if (!isServiceGuardExcludedPath(pathname)) {
    const available = await isWebsiteServiceAvailable(request)
    if (!available) {
      const url = request.nextUrl.clone()
      url.pathname = '/service-expired'
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
