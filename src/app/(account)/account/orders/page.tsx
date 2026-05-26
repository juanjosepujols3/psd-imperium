import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const statusStyles: Record<string, string> = {
  completed: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-yellow-100 text-yellow-700',
  refunded: 'bg-red-100 text-red-600',
}

export default async function MyOrdersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .or(`customer_id.eq.${user.id},guest_email.eq.${user.email}`)
    .order('created_at', { ascending: false })

  const allOrders = orders ?? []

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">My Orders</h1>
      <p className="mt-1 text-sm text-zinc-500">{allOrders.length} orders</p>

      <div className="mt-6 space-y-4">
        {allOrders.map((order) => (
          <div key={order.id} className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
            <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50 px-5 py-3">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-zinc-500">{order.id.slice(0, 8).toUpperCase()}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[order.status] ?? ''}`}>
                  {order.status}
                </span>
              </div>
              <span className="text-xs text-zinc-400">{new Date(order.created_at).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <Link
                  href={`/templates/${order.product_slug}`}
                  className="font-semibold text-zinc-900 hover:text-emerald-700"
                >
                  {order.product_name}
                </Link>
                <p className="mt-0.5 text-sm text-zinc-500">PSD Template · One-time purchase</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-zinc-900">${order.amount}</span>
                {order.status === 'completed' && order.download_url && (
                  <a
                    href={order.download_url}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </a>
                )}
                {order.status === 'pending' && (
                  <span className="rounded-lg bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-700">
                    Processing...
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {allOrders.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-4xl">📦</p>
          <p className="mt-3 font-semibold text-zinc-700">No orders yet</p>
          <Link href="/" className="mt-4 inline-block rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
            Browse Templates
          </Link>
        </div>
      )}
    </div>
  )
}
