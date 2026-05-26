import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'admin_session'
const COOKIE_VALUE = 'psd-admin-authenticated'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const from = req.nextUrl.searchParams.get('from') ?? '/dashboard'
  const res = NextResponse.redirect(new URL(from, req.url), { status: 302 })

  res.cookies.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return res
}
