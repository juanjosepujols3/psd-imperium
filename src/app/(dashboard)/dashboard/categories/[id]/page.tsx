import { createAdminClient } from '@/lib/supabase/admin'
import { CategoryForm } from '../category-form'
import { notFound } from 'next/navigation'
import { deleteCategory } from '@/lib/actions/categories'

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const admin = createAdminClient()
  const { data: category } = await admin.from('categories').select('*').eq('id', id).single()
  if (!category) notFound()

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Edit Category</h1>
          <p className="mt-1 text-sm text-zinc-500">{category.label}</p>
        </div>
        <form action={async () => { 'use server'; await deleteCategory(category.id) }}>
          <button type="submit" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors">
            Delete
          </button>
        </form>
      </div>
      <CategoryForm category={category} />
    </div>
  )
}
