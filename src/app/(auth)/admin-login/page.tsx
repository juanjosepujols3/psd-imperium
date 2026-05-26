'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function AdminLoginForm() {
  const searchParams = useSearchParams()
  const from = searchParams.get('from') ?? '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch(`/api/admin-login?from=${encodeURIComponent(from)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      redirect: 'manual', // handle redirect manually
    })

    if (res.status === 401) {
      const data = await res.json()
      setError(data.error ?? 'Invalid credentials')
      setLoading(false)
      return
    }

    // 302 redirect — follow it as a full page navigation
    const location = res.headers.get('location') ?? '/dashboard'
    window.location.href = location
  }

  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-8">
      <h1 className="text-lg font-bold text-white">Admin Sign in</h1>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            placeholder="admin@example.com"
            className="mt-1.5 block w-full rounded-lg border border-zinc-600 bg-zinc-700 px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="mt-1.5 block w-full rounded-lg border border-zinc-600 bg-zinc-700 px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {error && (
          <div className="rounded-lg bg-red-900/40 px-3 py-2.5 text-sm text-red-400">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60 transition-colors"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <img src="/logo.png" alt="PSD IMPERIUM" className="h-9 w-9 object-contain" />
            <span className="text-xl font-bold tracking-tight text-white">PSD IMPERIUM</span>
          </Link>
          <p className="mt-3 text-sm text-zinc-400">Admin access only</p>
        </div>

        <Suspense fallback={<div className="h-48 rounded-2xl border border-zinc-700 bg-zinc-800 animate-pulse" />}>
          <AdminLoginForm />
        </Suspense>

        <p className="mt-4 text-center text-xs text-zinc-600">
          <Link href="/" className="hover:text-zinc-400">← Back to store</Link>
        </p>
      </div>
    </div>
  )
}
