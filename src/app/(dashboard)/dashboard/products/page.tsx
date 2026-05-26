import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { deleteProduct } from '@/lib/actions/products'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; featured?: string }>
}) {
  const { category, featured } = await searchParams
  const admin = createAdminClient()

  let query = admin.from('products').select('*').order('created_at', { ascending: false })

  if (category) query = query.eq('category_slug', category)
  if (featured === 'true') query = query.eq('featured', true)

  const { data: products } = await query
  const { data: categories } = await admin.from('categories').select('slug, label, emoji').eq('active', true).order('"order"')

  const all = products ?? []

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Products</h1>
          <p className="mt-1 text-sm text-zinc-500">{all.length} templates</p>
        </div>
        <Link href="/dashboard/products/new" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
          + Add Product
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/dashboard/products" className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${!category && !featured ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'}`}>
          All
        </Link>
        {(categories ?? []).map((cat) => (
          <Link key={cat.slug} href={`/dashboard/products?category=${cat.slug}`}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${category === cat.slug ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'}`}>
            {cat.emoji} {cat.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {all.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
              {p.image_url && <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />}
              {p.featured && (
                <span className="absolute left-2 top-2 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white">Featured</span>
              )}
            </div>
            <div className="p-4">
              <p className="text-xs uppercase tracking-wide text-emerald-600">{p.category_slug}</p>
              <h3 className="mt-1 text-sm font-semibold text-zinc-900 line-clamp-2">{p.name}</h3>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-bold text-zinc-900">${p.price}</span>
                <div className="flex gap-2">
                  <Link href={`/dashboard/products/${p.id}`} className="rounded-md bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-200">Edit</Link>
                  <Link href={`/templates/${p.slug}`} target="_blank" className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100">Preview</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {all.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-4xl">🗂️</p>
          <p className="mt-3 font-semibold text-zinc-700">No products yet</p>
          <Link href="/dashboard/products/new" className="mt-4 inline-block rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">Add Product</Link>
        </div>
      )}
    </div>
  )
}
