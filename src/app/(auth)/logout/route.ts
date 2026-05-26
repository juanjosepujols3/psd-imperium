import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { logoutAdmin } from '@/lib/auth'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') ?? 'customer'

  if (type === 'admin') {
    await logoutAdmin()
  } else {
    const supabase = await createClient()
    await supabase.auth.signOut()
  }

  return NextResponse.redirect(new URL('/login', request.url))
}
