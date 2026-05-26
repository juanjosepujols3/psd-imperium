'use client'

import Link from 'next/link'

export interface PublicProduct {
  id: string
  name: string
  slug: string
  price: number
  category_slug: string
  image_url: string | null
  featured: boolean
  country: string | null
}

export function ProductCard({ product }: { product: PublicProduct }) {
  return (
    <Link
      href={`/templates/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl text-zinc-300">🗂️</div>
        )}
        {product.featured && (
          <span className="absolute left-2 top-2 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white">
            Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">
          {product.country ?? product.category_slug}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-zinc-900 group-hover:text-emerald-700">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-base font-bold text-zinc-900">${product.price}</span>
          <span className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
            Download
          </span>
        </div>
      </div>
    </Link>
  )
}
