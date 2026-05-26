import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'admin_session'
const COOKIE_VALUE = 'psd-admin-authenticated'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const from = (formData.get('from') as string) || '/dashboard'

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    const loginUrl = new URL('/admin-login', req.url)
    loginUrl.searchParams.set('from', from)
    loginUrl.searchParams.set('error', '1')
    return NextResponse.redirect(loginUrl, { status: 303 })
  }

  const res = NextResponse.redirect(new URL(from, req.url), { status: 303 })
  res.cookies.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  return res
}
