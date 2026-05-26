import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import crypto from 'crypto'

const COMPLETED_STATUSES = ['finished', 'confirmed']

function verifySignature(body: Record<string, unknown>, signature: string): boolean {
  const secret = process.env.NOWPAYMENTS_IPN_SECRET
  if (!secret) return false

  // Sort keys alphabetically, stringify, then HMAC-SHA512
  const sorted = Object.keys(body)
    .sort()
    .reduce<Record<string, unknown>>((acc, key) => { acc[key] = body[key]; return acc }, {})

  const hmac = crypto
    .createHmac('sha512', secret)
    .update(JSON.stringify(sorted))
    .digest('hex')

  return hmac === signature
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const signature = req.headers.get('x-nowpayments-sig') ?? ''

  if (!verifySignature(body, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const { payment_status, order_id } = body

  if (!order_id) return NextResponse.json({ ok: true })

  const admin = createAdminClient()

  if (COMPLETED_STATUSES.includes(payment_status)) {
    // Get the order to find the product
    const { data: order } = await admin
      .from('orders')
      .select('product_id, product_slug')
      .eq('id', order_id)
      .single()

    if (order) {
      const { data: product } = await admin
        .from('products')
        .select('file_url')
        .eq('id', order.product_id)
        .single()

      await admin.from('orders').update({
        status: 'completed',
        download_url: product?.file_url ?? null,
      }).eq('id', order_id)

      revalidatePath('/account/downloads')
      revalidatePath('/account/orders')
      revalidatePath('/dashboard/orders')
    }
  }

  return NextResponse.json({ ok: true })
}
