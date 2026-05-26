'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function CreateAccountForm({ email }: { email: string }) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError('Las contraseñas no coinciden'); return }
    if (password.length < 6) { setError('Mínimo 6 caracteres'); return }
    setLoading(true)
    setError('')

    const res = await fetch('/api/checkout/create-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Error al crear la cuenta')
      setLoading(false)
      return
    }

    // Sign in automatically
    const supabase = createClient()
    await supabase.auth.signInWithPassword({ email, password })

    setDone(true)
    setTimeout(() => router.push('/account/downloads'), 1500)
  }

  if (done) {
    return (
      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
        <p className="font-semibold text-emerald-700">¡Cuenta creada! Redirigiendo a tus descargas...</p>
      </div>
    )
  }

  return (
    <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm text-left">
      <p className="font-semibold text-zinc-900">Crea tu cuenta</p>
      <p className="mt-1 text-sm text-zinc-500">
        Guarda tus compras. Usaremos <span className="font-medium text-zinc-700">{email}</span>
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input
          type="password"
          required
          placeholder="Contraseña (mín. 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        <input
          type="password"
          required
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="block w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-zinc-900 py-3 text-sm font-bold text-white hover:bg-zinc-800 disabled:opacity-60 transition-colors"
        >
          {loading ? 'Creando cuenta...' : 'Crear cuenta y ver mis descargas'}
        </button>
      </form>
    </div>
  )
}
