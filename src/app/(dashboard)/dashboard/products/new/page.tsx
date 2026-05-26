import { ProductForm } from '../product-form'
import { createAdminClient } from '@/lib/supabase/admin'

export default async function NewProductPage() {
  const admin = createAdminClient()
  const { data: categories } = await admin.from('categories').select('slug, label, emoji').eq('active', true).order('"order"')

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Add New Product</h1>
        <p className="mt-1 text-sm text-zinc-500">Upload a new PSD template to the catalog</p>
      </div>
      <ProductForm categories={categories ?? []} />
    </div>
  )
}
