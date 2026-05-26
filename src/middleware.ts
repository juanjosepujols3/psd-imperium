import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin dashboard: cookie-based auth (unchanged)
  if (pathname.startsWith('/dashboard')) {
    const session = request.cookies.get('admin_session')
    const isValid = session?.value === process.env.ADMIN_SECRET
    if (!isValid) {
      const loginUrl = new URL('/admin-login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  // Customer account: Supabase session required
  if (pathname.startsWith('/account')) {
    const { response, user } = await updateSession(request)
    if (!user) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
    return response
  }

  // Refresh Supabase session on all other routes
  const { response } = await updateSession(request)
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/|auth/).*)'],
}
