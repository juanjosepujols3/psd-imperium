'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { saveProduct } from '@/lib/actions/products'

interface Category { slug: string; label: string; emoji: string }
interface Product {
  id: string; name: string; slug: string; description: string; price: number
  category_slug: string; image_url: string | null; file_url: string | null
  featured: boolean; country: string | null
}

export function ProductForm({ product, categories }: { product?: Product; categories: Category[] }) {
  const [imagePreview, setImagePreview] = useState<string>(product?.image_url ?? '')
  const [uploadingImg, setUploadingImg] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)
  const [saving, setSaving] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>(product?.image_url ?? '')
  const [fileUrl, setFileUrl] = useState<string>(product?.file_url ?? '')
  const [fileName, setFileName] = useState<string>(
    product?.file_url ? product.file_url.split('/').pop() ?? '' : ''
  )
  const imageInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImg(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('bucket', 'product-images')
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (json.url) { setImageUrl(json.url); setImagePreview(json.url) }
    } finally {
      setUploadingImg(false)
    }
  }

  async function handleDocChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingFile(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('bucket', 'product-files')
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (json.url) { setFileUrl(json.url); setFileName(file.name) }
    } finally {
      setUploadingFile(false)
    }
  }

  return (
    <form action={async (fd) => { setSaving(true); await saveProduct(fd) }} className="space-y-6">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="image_url" value={imageUrl} />
      <input type="hidden" name="file_url" value={fileUrl} />

      {/* Image upload */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-zinc-900">Product Image</h2>
        <div className="mt-4 space-y-3">
          <div
            onClick={() => imageInputRef.current?.click()}
            className="relative flex h-48 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 transition-colors hover:border-emerald-400 hover:bg-emerald-50"
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="h-full w-full object-contain" />
            ) : (
              <div className="text-center">
                <svg className="mx-auto h-10 w-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-sm font-medium text-zinc-600">Click to upload image</p>
                <p className="text-xs text-zinc-400">PNG, JPG, WEBP — max 5MB</p>
              </div>
            )}
            {uploadingImg && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
              </div>
            )}
          </div>
          <input ref={imageInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={handleImageChange} />
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => imageInputRef.current?.click()} disabled={uploadingImg}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 transition-colors">
              {uploadingImg ? 'Uploading...' : imagePreview ? 'Change image' : 'Select image'}
            </button>
            {imagePreview && (
              <button type="button" onClick={() => { setImagePreview(''); setImageUrl('') }} className="text-sm text-red-500 hover:underline">
                Remove
              </button>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500">Or paste image URL</label>
            <input type="url" value={imageUrl} onChange={(e) => { setImageUrl(e.target.value); setImagePreview(e.target.value) }}
              placeholder="https://..." className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-zinc-900">Product Details</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700">Name <span className="text-red-500">*</span></label>
            <input type="text" name="name" defaultValue={product?.name} required placeholder="e.g. USA Passport PSD Template"
              className="mt-1.5 block w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">Category <span className="text-red-500">*</span></label>
            <select name="category" defaultValue={product?.category_slug ?? ''} required
              className="mt-1.5 block w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500">
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>{cat.emoji} {cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">Country / State</label>
            <input type="text" name="country" defaultValue={product?.country ?? ''} placeholder="e.g. United States"
              className="mt-1.5 block w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">Price <span className="text-red-500">*</span></label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">$</span>
              <input type="number" name="price" defaultValue={product?.price ?? 25} required min={1}
                className="block w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">Description</label>
            <textarea name="description" defaultValue={product?.description ?? ''} rows={4} placeholder="Describe the template..."
              className="mt-1.5 block w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
        </div>
      </div>

      {/* File upload */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-zinc-900">Download File</h2>
        <p className="mt-1 text-xs text-zinc-500">Archivo PSD/ZIP que recibirá el cliente tras la compra</p>
        <div className="mt-4 space-y-3">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative flex h-24 w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 transition-colors hover:border-emerald-400 hover:bg-emerald-50"
          >
            {uploadingFile ? (
              <div className="flex items-center gap-2 text-emerald-600">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
                <span className="text-sm font-medium">Uploading...</span>
              </div>
            ) : fileName ? (
              <div className="flex items-center gap-3 px-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-zinc-900">{fileName}</p>
                  <p className="text-xs text-zinc-400">Click to change file</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <svg className="mx-auto h-8 w-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mt-1 text-sm font-medium text-zinc-600">Upload PSD / ZIP file</p>
              </div>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept=".psd,.zip,.rar,.7z" className="hidden" onChange={handleDocChange} />
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploadingFile}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 transition-colors">
              {uploadingFile ? 'Uploading...' : fileName ? 'Change file' : 'Select file'}
            </button>
            {fileName && (
              <button type="button" onClick={() => { setFileUrl(''); setFileName('') }} className="text-sm text-red-500 hover:underline">
                Remove
              </button>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500">Or paste file URL</label>
            <input type="url" value={fileUrl} onChange={(e) => { setFileUrl(e.target.value); setFileName(e.target.value.split('/').pop() ?? '') }}
              placeholder="https://..." className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
        </div>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-5">
        <input type="checkbox" name="featured" id="featured" defaultChecked={product?.featured}
          className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500" />
        <div>
          <label htmlFor="featured" className="cursor-pointer text-sm font-medium text-zinc-900">Mark as Featured</label>
          <p className="text-xs text-zinc-500">Featured products appear highlighted on the homepage</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving || uploadingImg || uploadingFile}
          className="flex-1 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60 transition-colors">
          {saving ? 'Saving...' : product ? 'Save Changes' : 'Create Product'}
        </button>
        <Link href="/dashboard/products" className="rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  )
}
