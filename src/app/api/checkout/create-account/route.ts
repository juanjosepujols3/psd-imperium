import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
  }

  const admin = createAdminClient()

  // Check if user already exists
  const { data: existing } = await admin.auth.admin.listUsers()
  const alreadyExists = existing?.users?.some((u) => u.email === email)

  if (alreadyExists) {
    return NextResponse.json({ error: 'Ya existe una cuenta con ese email. Inicia sesión.' }, { status: 409 })
  }

  const { error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // skip verification — they already confirmed by paying
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
