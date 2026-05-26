import { cookies } from 'next/headers'

const COOKIE_NAME = 'admin_session'
const COOKIE_VALUE = 'psd-admin-authenticated'

export async function isAdminLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(COOKIE_NAME)
  return session?.value === COOKIE_VALUE
}
