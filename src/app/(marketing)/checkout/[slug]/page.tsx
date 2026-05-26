import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import CheckoutClient from './checkout-client'

export default async function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const admin = createAdminClient()
  const { data: product } = await admin.from('products').select('id, name, slug, price, category_slug, image_url').eq('slug', slug).single()
  if (!product) notFound()

  return <CheckoutClient product={product} />
}
