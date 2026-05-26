import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  const { slug, email } = await req.json()

  if (!slug || !email) {
    return NextResponse.json({ error: 'Missing slug or email' }, { status: 400 })
  }

  const admin = createAdminClient()

  const { data: product } = await admin
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

  // Create pending order (guest — no customer_id)
  const { data: order, error: orderError } = await admin
    .from('orders')
    .insert({
      customer_id: null,
      guest_email: email,
      product_id: product.id,
      product_name: product.name,
      product_slug: product.slug,
      amount: product.price,
      status: 'pending',
    })
    .select('id')
    .single()

  if (orderError || !order) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'

  // Create NOWPayments invoice
  const res = await fetch('https://api.nowpayments.io/v1/invoice', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.NOWPAYMENTS_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      price_amount: Number(product.price),
      price_currency: 'usd',
      order_id: order.id,
      order_description: product.name,
      ipn_callback_url: `${baseUrl}/api/webhooks/nowpayments`,
      success_url: `${baseUrl}/checkout/success?order_id=${order.id}`,
      cancel_url: `${baseUrl}/templates/${slug}`,
      is_fixed_rate: false,
      is_fee_paid_by_user: false,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    await admin.from('orders').delete().eq('id', order.id)
    return NextResponse.json({ error: `NOWPayments error: ${err}` }, { status: 500 })
  }

  const invoice = await res.json()
  return NextResponse.json({ invoice_url: invoice.invoice_url })
}
