import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'

export default async function DashboardPage() {
  const admin = createAdminClient()

  const [
    { count: totalProducts },
    { count: featuredCount },
    { count: totalCategories },
    { count: totalOrders },
    { data: recentProducts },
    { data: orders },
  ] = await Promise.all([
    admin.from('products').select('*', { count: 'exact', head: true }),
    admin.from('products').select('*', { count: 'exact', head: true }).eq('featured', true),
    admin.from('categories').select('*', { count: 'exact', head: true }),
    admin.from('orders').select('*', { count: 'exact', head: true }),
    admin.from('products').select('*').order('created_at', { ascending: false }).limit(8),
    admin.from('orders').select('amount').eq('status', 'completed'),
  ])

  const revenue = (orders ?? []).reduce((s: number, o: { amount: number }) => s + o.amount, 0)

  const stats = [
    { label: 'Total Products', value: totalProducts ?? 0, icon: '🗂️', href: '/dashboard/products' },
    { label: 'Featured', value: featuredCount ?? 0, icon: '⭐', href: '/dashboard/products?featured=true' },
    { label: 'Categories', value: totalCategories ?? 0, icon: '📂', href: '/dashboard/categories' },
    { label: 'Revenue', value: `$${revenue}`, icon: '💵', href: '/dashboard/orders' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-500">Manage your PSD templates</p>
        </div>
        <Link href="/dashboard/products/new" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
          + Add Product
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-sm">
            <div className="text-2xl">{s.icon}</div>
            <div className="mt-2 text-2xl font-bold text-zinc-900">{s.value}</div>
            <div className="text-sm text-zinc-500">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-zinc-900">Recent Products</h2>
          <Link href="/dashboard/products" className="text-sm text-emerald-600 hover:underline">View all</Link>
        </div>
        <div className="mt-3 overflow-hidden rounded-xl border border-zinc-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Name</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Category</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Price</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Featured</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(recentProducts ?? []).map((p) => (
                <tr key={p.id} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50">
                  <td className="px-4 py-3 font-medium text-zinc-900">{p.name}</td>
                  <td className="px-4 py-3 text-zinc-500 capitalize">{p.category_slug}</td>
                  <td className="px-4 py-3 font-semibold text-zinc-900">${p.price}</td>
                  <td className="px-4 py-3">
                    {p.featured
                      ? <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">Yes</span>
                      : <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500">No</span>}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/products/${p.id}`} className="text-emerald-600 hover:underline">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
