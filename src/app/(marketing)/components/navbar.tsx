'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Category {
  id: string
  slug: string
  label: string
  emoji: string
}

export function MarketingNavbar({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="PSD IMPERIUM" className="h-8 w-8 object-contain" />
          <span className="text-lg font-bold tracking-tight text-zinc-900">PSD IMPERIUM</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <div className="relative">
            <button
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
            >
              Categories
              <svg className="h-4 w-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {catOpen && (
              <div
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}
                className="absolute left-0 top-full z-50 mt-1 w-56 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg"
              >
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50"
                    onClick={() => setCatOpen(false)}
                  >
                    <span className="text-base">{cat.emoji}</span>
                    {cat.label}
                  </Link>
                ))}
                <div className="border-t border-zinc-100 px-4 py-2">
                  <Link href="/#categories" className="text-xs font-medium text-emerald-600 hover:underline">
                    View all categories →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {categories.slice(0, 4).map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
            >
              {cat.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link href="/account" className="hidden text-sm font-medium text-zinc-600 hover:text-zinc-900 md:block">
            My Account
          </Link>
          <Link href="/#categories" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors">
            Browse Templates
          </Link>
          <button className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 md:hidden" onClick={() => setOpen(!open)}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-zinc-100 bg-white px-4 pb-4 md:hidden">
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">Categories</p>
          <nav className="mt-2 flex flex-col gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                onClick={() => setOpen(false)}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-zinc-100 pt-2">
              <Link href="/dashboard" className="block py-2 text-sm font-medium text-zinc-600" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
