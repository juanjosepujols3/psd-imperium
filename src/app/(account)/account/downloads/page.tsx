import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'

export default async function DownloadsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .or(`customer_id.eq.${user.id},guest_email.eq.${user.email}`)
    .eq('status', 'completed')
    .order('created_at', { ascending: false })

  const downloads = orders ?? []

  let productImages: Record<string, string | null> = {}
  if (downloads.length > 0) {
    const slugs = downloads.map((o) => o.product_slug).filter(Boolean)
    const admin = createAdminClient()
    const { data: prods } = await admin.from('products').select('slug, image_url').in('slug', slugs)
    for (const p of prods ?? []) productImages[p.slug] = p.image_url
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">My Downloads</h1>
      <p className="mt-1 text-sm text-zinc-500">{downloads.length} files available</p>

      <div className="mt-6 space-y-3">
        {downloads.map((order) => (
          <div key={order.id} className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4">
            <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
              {productImages[order.product_slug] ? (
                <img
                  src={productImages[order.product_slug]!}
                  alt={order.product_name}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl text-zinc-300">🗂️</div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <Link href={`/templates/${order.product_slug}`} className="font-semibold text-zinc-900 hover:text-emerald-700 line-clamp-1">
                {order.product_name}
              </Link>
              <p className="mt-0.5 text-xs text-zinc-400">Purchased {new Date(order.created_at).toLocaleDateString()} · PSD File</p>
            </div>

            {order.download_url && (
              <a
                href={order.download_url}
                className="flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PSD
              </a>
            )}
          </div>
        ))}
      </div>

      {downloads.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-4xl">⬇️</p>
          <p className="mt-3 font-semibold text-zinc-700">No downloads yet</p>
          <Link href="/" className="mt-4 inline-block rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
            Browse Templates
          </Link>
        </div>
      )}
    </div>
  )
}
