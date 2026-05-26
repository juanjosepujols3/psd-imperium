import { createAdminClient } from '@/lib/supabase/admin'

const statusStyles: Record<string, string> = {
  completed: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-yellow-100 text-yellow-700',
  refunded: 'bg-red-100 text-red-600',
}

export default async function OrdersPage() {
  const admin = createAdminClient()

  const { data: orders } = await admin
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  const all = orders ?? []
  const completed = all.filter((o) => o.status === 'completed')
  const pending = all.filter((o) => o.status === 'pending')
  const refunded = all.filter((o) => o.status === 'refunded')
  const revenue = completed.reduce((s, o) => s + o.amount, 0)

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Orders</h1>
          <p className="mt-1 text-sm text-zinc-500">{all.length} total orders</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-right">
          <p className="text-xs text-emerald-600 font-medium">Total Revenue</p>
          <p className="text-2xl font-bold text-emerald-700">${revenue}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4">
        {[
          { label: 'Completed', value: completed.length, color: 'text-emerald-600' },
          { label: 'Pending', value: pending.length, color: 'text-yellow-600' },
          { label: 'Refunded', value: refunded.length, color: 'text-red-600' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-zinc-200 bg-white p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-zinc-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        {all.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-4xl">📦</p>
            <p className="mt-3 font-semibold text-zinc-700">No orders yet</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Order ID</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Customer</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Product</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Date</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Amount</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {all.map((order) => (
                <tr key={order.id} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50">
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500">{order.id.slice(0, 8).toUpperCase()}</td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-zinc-400">{order.guest_email ?? '—'}</p>
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <p className="truncate text-zinc-700">{order.product_name}</p>
                  </td>
                  <td className="px-4 py-3 text-zinc-500">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 font-semibold text-zinc-900">${order.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[order.status] ?? ''}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
