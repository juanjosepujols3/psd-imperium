import Link from 'next/link'

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>
}) {
  const { from = '/dashboard', error } = await searchParams

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

        <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-8">
          <h1 className="text-lg font-bold text-white">Admin Sign in</h1>

          <form method="POST" action={`/api/admin-login`} className="mt-5 space-y-4">
            <input type="hidden" name="from" value={from} />

            <div>
              <label className="block text-sm font-medium text-zinc-300">Email</label>
              <input
                type="email"
                name="email"
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
                name="password"
                required
                placeholder="••••••••"
                className="mt-1.5 block w-full rounded-lg border border-zinc-600 bg-zinc-700 px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-900/40 px-3 py-2.5 text-sm text-red-400">
                Email o contraseña incorrectos
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
            >
              Sign in
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-zinc-600">
          <Link href="/" className="hover:text-zinc-400">← Back to store</Link>
        </p>
      </div>
    </div>
  )
}
