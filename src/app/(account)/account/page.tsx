import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_id', user.id)
    .order('created_at', { ascending: false })

  const allOrders = orders ?? []
  const completedOrders = allOrders.filter((o) => o.status === 'completed')
  const totalSpent = allOrders.reduce((s: number, o: { amount: number }) => s + o.amount, 0)
  const recentOrders = allOrders.slice(0, 5)

  const name = user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'User'
  const initial = name[0].toUpperCase()

  return (
    <div>
      {/* Welcome */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-2xl font-bold text-white">
          {initial}
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Welcome back, {name}</h1>
          <p className="text-sm text-zinc-500">{user.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 text-center">
          <p className="text-2xl font-bold text-zinc-900">{allOrders.length}</p>
          <p className="text-xs text-zinc-500">Total Orders</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5 text-center">
          <p className="text-2xl font-bold text-emerald-600">{completedOrders.length}</p>
          <p className="text-xs text-zinc-500">Downloads</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5 text-center">
          <p className="text-2xl font-bold text-zinc-900">${totalSpent}</p>
          <p className="text-xs text-zinc-500">Total Spent</p>
        </div>
      </div>

      {/* Recent orders */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-zinc-900">Recent Orders</h2>
          <Link href="/account/orders" className="text-sm text-emerald-600 hover:underline">View all</Link>
        </div>
        <div className="mt-3 space-y-3">
          {recentOrders.length === 0 && (
            <p className="text-sm text-zinc-400 py-4">No orders yet. <Link href="/" className="text-emerald-600 hover:underline">Browse templates</Link></p>
          )}
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4">
              <div>
                <p className="font-medium text-zinc-900">{order.product_name}</p>
                <p className="text-xs text-zinc-400">{order.id.slice(0, 8).toUpperCase()} · {new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-zinc-900">${order.amount}</span>
                {order.status === 'completed' && order.download_url && (
                  <a
                    href={order.download_url}
                    className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
                  >
                    ⬇️ Download
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
