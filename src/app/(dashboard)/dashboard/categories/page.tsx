import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'

export default async function CategoriesPage() {
  const admin = createAdminClient()
  const { data: categories } = await admin.from('categories').select('*').order('"order"')
  const all = categories ?? []

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Categories</h1>
          <p className="mt-1 text-sm text-zinc-500">Manage your product categories</p>
        </div>
        <Link href="/dashboard/categories/new" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
          + Add Category
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50">
              <th className="px-4 py-3 text-left font-medium text-zinc-600">Order</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-600">Category</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-600">Slug</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-600">Description</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-600">Status</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {all.map((cat) => (
              <tr key={cat.id} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50">
                <td className="px-4 py-3 text-zinc-400">{cat.order}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{cat.emoji}</span>
                    <span className="font-medium text-zinc-900">{cat.label}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-500">{cat.slug}</td>
                <td className="px-4 py-3 max-w-xs"><p className="truncate text-zinc-500">{cat.description}</p></td>
                <td className="px-4 py-3">
                  {cat.active
                    ? <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">Active</span>
                    : <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500">Hidden</span>}
                </td>
                <td className="px-4 py-3">
                  <Link href={`/dashboard/categories/${cat.id}`} className="text-emerald-600 hover:underline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
