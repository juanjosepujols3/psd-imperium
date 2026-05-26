'use server'

import { cookies } from 'next/headers'

const COOKIE_NAME = 'admin_session'

export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, process.env.ADMIN_SECRET!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    return { success: true }
  }
  return { success: false, error: 'Invalid email or password' }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function isAdminLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(COOKIE_NAME)
  return session?.value === process.env.ADMIN_SECRET
}
