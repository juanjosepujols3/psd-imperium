import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { ProductCard } from '../../components/product-card'

export const revalidate = 60

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const admin = createAdminClient()

  const [{ data: category }, { data: allCategories }, { data: allProducts }] = await Promise.all([
    admin.from('categories').select('*').eq('slug', slug).single(),
    admin.from('categories').select('*').eq('active', true).order('"order"'),
    admin.from('products').select('*').eq('category_slug', slug).order('created_at', { ascending: false }),
  ])

  if (!category) notFound()

  const products = allProducts ?? []
  const categories = allCategories ?? []

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-900">Home</Link>
            <span>/</span>
            <span className="text-zinc-900">{category.label}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-emerald-900 py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <span className="text-5xl">{category.emoji}</span>
            <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{category.label}</h1>
            {category.description && (
              <p className="mt-1 text-zinc-300">{category.description}</p>
            )}
            <p className="mt-3 text-sm text-zinc-400">{products.length} templates available</p>
          </div>
        </div>
      </div>

      {/* Category filter bar */}
      <div className="border-b border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <Link
              href="/"
              className="shrink-0 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-600 hover:border-emerald-300 hover:text-emerald-700"
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`shrink-0 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                  cat.slug === slug
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-zinc-200 bg-white text-zinc-600 hover:border-emerald-300 hover:text-emerald-700'
                }`}
              >
                {cat.emoji} {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {products.length === 0 ? (
          <div className="py-20 text-center">
            <span className="text-5xl">{category.emoji}</span>
            <p className="mt-4 text-lg font-semibold text-zinc-700">No templates yet in this category</p>
            <p className="mt-2 text-sm text-zinc-500">Check back soon — we&apos;re adding new templates every week.</p>
            <Link href="/" className="mt-6 inline-block rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
              Browse all templates
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
