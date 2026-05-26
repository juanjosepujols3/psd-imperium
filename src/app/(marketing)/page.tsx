import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { ProductCard } from './components/product-card'
import { SectionHeader } from './components/section-header'

export const revalidate = 60

export default async function HomePage() {
  const admin = createAdminClient()

  const [{ data: allProducts }, { data: allCategories }] = await Promise.all([
    admin.from('products').select('*').order('created_at', { ascending: false }),
    admin.from('categories').select('*').eq('active', true).order('"order"'),
  ])

  const products = allProducts ?? []
  const categories = allCategories ?? []

  const featured = products.filter((p) => p.featured).slice(0, 8)
  const newest = products.slice(0, 8)

  const categoriesWithProducts = categories
    .map((cat) => ({
      ...cat,
      count: products.filter((p) => p.category_slug === cat.slug).length,
      items: products.filter((p) => p.category_slug === cat.slug).slice(0, 4),
    }))
    .filter((cat) => cat.items.length > 0)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-emerald-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Over 19,000 Premium Documents In PSD And Word Format For Creators.
            </h1>
            <p className="mt-6 text-base leading-8 text-zinc-300 sm:text-lg">
              Premium editable templates in PSD and Word for every need. Extensive library of utility bills, corporate identity designs, and official-style document mockups for design and audiovisual production. 100% customizable and easy to use.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/#categories"
                className="w-full rounded-xl bg-emerald-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-emerald-700 transition-colors sm:w-auto"
              >
                Browse Templates
              </Link>
              <Link
                href="/#how-it-works"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/20 transition-colors sm:w-auto"
              >
                How it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-b border-zinc-100 bg-zinc-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { step: '01', title: 'Browse & Choose', desc: 'Find the template you want from 100+ options across all categories.' },
              { step: '02', title: 'Purchase & Download', desc: 'Buy for $25 and instantly download the fully layered PSD file.' },
              { step: '03', title: 'Open in Photoshop', desc: 'Place your photo in the smart object and see how you look right away.' },
            ].map((s) => (
              <div key={s.step} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
                  {s.step}
                </span>
                <div>
                  <h3 className="font-semibold text-zinc-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section id="categories" className="py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader title="Browse by" highlight="Category" />
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
              {categories.map((cat) => {
                const count = products.filter((p) => p.category_slug === cat.slug).length
                return (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 bg-white p-4 text-center transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-sm"
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className="text-xs font-semibold text-zinc-700">{cat.label}</span>
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500">{count}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Featured */}
      {featured.length > 0 && (
        <section className="bg-zinc-50 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Featured"
              highlight="Templates"
              description="Hand-picked high quality PSD templates"
            />
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newly Added */}
      {newest.length > 0 && (
        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Newly"
              highlight="Added"
              description="The latest PSD templates added to our catalog"
            />
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {newest.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Per-category sections */}
      {categoriesWithProducts.map((cat, i) => (
        <section
          key={cat.id}
          id={cat.slug}
          className={i % 2 === 0 ? 'bg-zinc-50 py-14' : 'py-14'}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title={cat.label}
              highlight="Imperium PSD"
              description={cat.description ?? ''}
              viewAllHref={`/category/${cat.slug}`}
            />
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {cat.items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Banner */}
      <section className="bg-emerald-700 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">Ready to preview your document?</h2>
          <p className="mt-3 text-emerald-100">
            Each template is fully editable in Photoshop. Just $25 per download.
          </p>
          <Link
            href="/#categories"
            className="mt-6 inline-block rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-emerald-700 shadow-lg hover:bg-emerald-50 transition-colors"
          >
            Browse All Templates
          </Link>
        </div>
      </section>
    </>
  )
}
