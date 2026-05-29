import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  const { bucket, filename } = await req.json()
  if (!bucket || !filename) {
    return NextResponse.json({ error: 'Missing bucket or filename' }, { status: 400 })
  }

  const ext = filename.split('.').pop()?.toLowerCase() ?? 'bin'
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const admin = createAdminClient()
  const { data, error } = await admin.storage.from(bucket).createSignedUploadUrl(path)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const publicUrl = admin.storage.from(bucket).getPublicUrl(path).data.publicUrl

  return NextResponse.json({ signedUrl: data.signedUrl, publicUrl })
}
