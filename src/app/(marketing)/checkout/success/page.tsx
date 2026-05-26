import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>
}) {
  const { order_id } = await searchParams

  const admin = createAdminClient()
  const { data: order } = order_id
    ? await admin.from('orders').select('*').eq('id', order_id).single()
    : { data: null }

  const completed = order?.status === 'completed'

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md text-center">

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          {completed ? (
            <svg className="h-10 w-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-10 w-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>

        {completed ? (
          <>
            <h1 className="text-2xl font-bold text-zinc-900">Payment Confirmed!</h1>
            <p className="mt-2 text-zinc-500">Your file is ready to download.</p>

            <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Order</p>
              <p className="mt-1 font-semibold text-zinc-900">{order.product_name}</p>
              <p className="font-mono text-xs text-zinc-400">{order.id.slice(0, 8).toUpperCase()}</p>

              {order.download_url && (
                <a
                  href={order.download_url}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white hover:bg-emerald-700 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PSD File
                </a>
              )}
            </div>

            <p className="mt-4 text-sm text-zinc-400">
              A copy of your download link has been sent to {order.guest_email ?? 'your email'}.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-zinc-900">Payment Processing</h1>
            <p className="mt-2 text-zinc-500">
              Your crypto payment is being confirmed on the blockchain. This usually takes 1–5 minutes.
            </p>
            <div className="mt-4 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
              Once confirmed, your download link will appear here automatically. Bookmark this page.
            </div>
            {order_id && (
              <p className="mt-3 font-mono text-xs text-zinc-400">Order: {order_id.slice(0, 8).toUpperCase()}</p>
            )}

            {/* Auto-refresh every 10s while pending */}
            <meta httpEquiv="refresh" content="10" />
          </>
        )}

        <div className="mt-8">
          <Link href="/" className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors">
            Browse more templates
          </Link>
        </div>
      </div>
    </div>
  )
}
