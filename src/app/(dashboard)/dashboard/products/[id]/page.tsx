import { ProductForm } from '../product-form'
import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import { deleteProduct } from '@/lib/actions/products'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const admin = createAdminClient()

  const [{ data: product }, { data: categories }] = await Promise.all([
    admin.from('products').select('*').eq('id', id).single(),
    admin.from('categories').select('slug, label, emoji').eq('active', true).order('"order"'),
  ])

  if (!product) notFound()

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Edit Product</h1>
          <p className="mt-1 text-sm text-zinc-500">{product.name}</p>
        </div>
        <form action={async () => { 'use server'; await deleteProduct(product.id) }}>
          <button type="submit" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors">
            Delete
          </button>
        </form>
      </div>
      <ProductForm product={product} categories={categories ?? []} />
    </div>
  )
}
