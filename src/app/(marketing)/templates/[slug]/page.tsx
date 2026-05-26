import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { ProductCard } from '../../components/product-card'

export const revalidate = 60

export default async function TemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const admin = createAdminClient()

  const [{ data: product }, { data: settingsRows }] = await Promise.all([
    admin.from('products').select('*').eq('slug', slug).single(),
    admin.from('settings').select('key, value'),
  ])

  if (!product) notFound()

  const settings: Record<string, string> = {}
  for (const row of settingsRows ?? []) settings[row.key] = row.value
  const telegramUsername = settings.telegram_username ?? ''

  const { data: relatedRaw } = await admin
    .from('products')
    .select('*')
    .eq('category_slug', product.category_slug)
    .neq('id', product.id)
    .limit(4)

  const related = relatedRaw ?? []

  const { data: category } = await admin
    .from('categories')
    .select('label')
    .eq('slug', product.category_slug)
    .single()

  const categoryLabel = category?.label ?? product.category_slug

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-900">Home</Link>
            <span>/</span>
            <Link href={`/category/${product.category_slug}`} className="hover:text-zinc-900">{categoryLabel}</Link>
            <span>/</span>
            <span className="text-zinc-900 line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">

          {/* Left — Image */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-64 items-center justify-center text-6xl text-zinc-200">🗂️</div>
              )}
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                {categoryLabel}
              </span>
              {product.country && (
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                  {product.country}
                </span>
              )}
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">PSD Format</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">Fully Editable</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">Smart Objects</span>
            </div>
          </div>

          {/* Right — Info */}
          <div className="flex flex-col">
            {product.featured && (
              <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                ⭐ Featured Template
              </span>
            )}
            <h1 className="text-3xl font-extrabold text-zinc-900">{product.name}</h1>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-zinc-900">${product.price}</span>
              <span className="text-sm text-zinc-500">one-time payment</span>
            </div>

            {product.description && (
              <p className="mt-4 leading-7 text-zinc-600">{product.description}</p>
            )}

            <div className="mt-6 rounded-xl border border-zinc-100 bg-zinc-50 p-5">
              <h3 className="text-sm font-semibold text-zinc-900">What&apos;s included</h3>
              <ul className="mt-3 space-y-2">
                {[
                  'Fully layered PSD file',
                  'Smart object for easy photo placement',
                  'Editable text layers',
                  'High resolution (300 DPI)',
                  'Instant download after purchase',
                  'Free updates',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-600">
                    <svg className="h-4 w-4 shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                href={`/checkout/${product.slug}`}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-zinc-900 px-6 py-4 text-base font-bold text-white shadow-lg hover:bg-zinc-800 transition-colors"
              >
                <svg className="h-5 w-5 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.236-.54 2.19 1.32.327.54-2.165c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z"/>
                </svg>
                Buy Now — ${product.price} USD
              </Link>
              {telegramUsername && (
                <a
                  href={`https://t.me/${telegramUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#229ED9]">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.88 13.47l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.937z" />
                  </svg>
                  Questions? Contact us on Telegram
                </a>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 border-t border-zinc-100 pt-5">
              {[
                { icon: '🔒', text: 'Secure payment' },
                { icon: '⚡', text: 'Instant download' },
                { icon: '🔄', text: 'Free updates' },
                { icon: '💬', text: '24/7 support' },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <span>{b.icon}</span>
                  {b.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-zinc-900">
              More <span className="text-emerald-600">{categoryLabel}</span> Templates
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
