import { CategoryForm } from '../category-form'

export default function NewCategoryPage() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Add Category</h1>
        <p className="mt-1 text-sm text-zinc-500">Create a new product category</p>
      </div>
      <CategoryForm />
    </div>
  )
}
