'use client'

import { useState } from 'react'
import Link from 'next/link'
import { saveCategory } from '@/lib/actions/categories'

const EMOJI_OPTIONS = ['🛂', '🚗', '🪪', '🏦', '📜', '🔐', '📋', '🎓', '🏥', '✈️', '🏛️', '📄']

interface Category {
  id: string; slug: string; label: string; emoji: string
  description: string | null; order: number; active: boolean
}

export function CategoryForm({ category }: { category?: Category }) {
  const [selectedEmoji, setSelectedEmoji] = useState(category?.emoji ?? '📄')
  const [saving, setSaving] = useState(false)

  return (
    <form action={async (fd) => { setSaving(true); fd.set('emoji', selectedEmoji); await saveCategory(fd) }} className="space-y-6">
      {category && <input type="hidden" name="id" value={category.id} />}
      {category && <input type="hidden" name="slug" value={category.slug} />}

      <div className="rounded-xl border border-zinc-200 bg-white p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700">Emoji</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {EMOJI_OPTIONS.map((e) => (
              <button key={e} type="button" onClick={() => setSelectedEmoji(e)}
                className={`h-10 w-10 rounded-lg text-xl transition-colors ${selectedEmoji === e ? 'bg-emerald-100 ring-2 ring-emerald-500' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {e}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Name <span className="text-red-500">*</span></label>
          <input type="text" name="label" defaultValue={category?.label} required placeholder="e.g. Passports"
            className="mt-1.5 block w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Description</label>
          <input type="text" name="description" defaultValue={category?.description ?? ''} placeholder="Short description"
            className="mt-1.5 block w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Order</label>
          <input type="number" name="order" defaultValue={category?.order ?? 0} min={0}
            className="mt-1.5 block w-32 rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" name="active" id="active" defaultChecked={category?.active ?? true}
            className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500" />
          <label htmlFor="active" className="text-sm font-medium text-zinc-900 cursor-pointer">Active (visible on site)</label>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving}
          className="flex-1 rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60 transition-colors">
          {saving ? 'Saving...' : category ? 'Save Changes' : 'Create Category'}
        </button>
        <Link href="/dashboard/categories" className="rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  )
}
