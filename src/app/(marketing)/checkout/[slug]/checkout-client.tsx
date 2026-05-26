'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Product {
  id: string; name: string; slug: string; price: number
  category_slug: string; image_url: string | null
}

export default function CheckoutClient({ product }: { product: Product }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handlePay(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: product.slug, email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Error creating payment')
      window.location.href = data.invoice_url
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <img src="/logo.png" alt="PSD IMPERIUM" className="h-8 w-8 object-contain" />
            <span className="text-lg font-bold tracking-tight text-zinc-900">PSD IMPERIUM</span>
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          {/* Product summary */}
          <div className="flex gap-4 border-b border-zinc-100 p-6">
            <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="h-full w-full object-contain" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl">🗂️</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">{product.category_slug}</p>
              <h2 className="mt-0.5 font-semibold text-zinc-900 line-clamp-2">{product.name}</h2>
              <p className="mt-1 text-xs text-zinc-400">PSD Template · One-time purchase</p>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2 px-6 pt-5 pb-4">
            <div className="flex justify-between text-sm text-zinc-600">
              <span>Template price</span>
              <span>${Number(product.price).toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-zinc-100 pt-3 font-bold text-zinc-900">
              <span>Total</span>
              <span>${Number(product.price).toFixed(2)} USD</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handlePay} className="space-y-4 px-6 pb-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700">
                Email <span className="font-normal text-zinc-400">(we&apos;ll send your download link here)</span>
              </label>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 block w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading || !email}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-zinc-900 px-6 py-4 text-base font-bold text-white transition-colors hover:bg-zinc-800 disabled:opacity-60"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <svg className="h-5 w-5 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.236-.54 2.19 1.32.327.54-2.165c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z"/>
                  </svg>
                  Pay with Crypto — ${Number(product.price).toFixed(2)} USD
                </>
              )}
            </button>

            <div className="flex flex-wrap justify-center gap-2">
              {['Bitcoin', 'USDT', 'Ethereum', 'Litecoin', 'USDC'].map((c) => (
                <span key={c} className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-500">{c}</span>
              ))}
              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-500">+200 more</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-1 text-xs text-zinc-400">
              <span>🔒 Secure payment</span>
              <span>⚡ Instant download</span>
              <span>🔄 Free updates</span>
            </div>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-zinc-400">
          <Link href={`/templates/${product.slug}`} className="hover:text-zinc-600">← Back to product</Link>
        </p>
      </div>
    </div>
  )
}
