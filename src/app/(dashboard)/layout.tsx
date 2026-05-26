import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { TelegramSupport } from '@/components/telegram-support'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: '📊' },
  { href: '/dashboard/products', label: 'Products', icon: '🗂️' },
  { href: '/dashboard/products/new', label: 'Add Product', icon: '➕' },
  { href: '/dashboard/categories', label: 'Categories', icon: '📂' },
  { href: '/dashboard/orders', label: 'Orders', icon: '📦' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = createAdminClient()
  const { data: rows } = await admin.from('settings').select('key, value').eq('key', 'telegram_username')
  const telegramUsername = rows?.[0]?.value ?? ''
  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-zinc-200 bg-white lg:block">
        <div className="flex h-16 items-center gap-2 border-b border-zinc-100 px-5">
          <img src="/logo.png" alt="PSD IMPERIUM" className="h-7 w-7 object-contain" />
          <span className="font-bold tracking-tight text-zinc-900">PSD IMPERIUM</span>
        </div>
        <nav className="p-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-0 w-60 space-y-2 px-5">
          <Link href="/" className="block text-xs text-zinc-400 hover:text-zinc-600">← Back to site</Link>
          <Link href="/logout?type=admin" className="block text-xs text-red-400 hover:text-red-600">Sign out</Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Mobile topbar */}
        <header className="flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-4 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white">P</div>
            <span className="font-bold text-zinc-900">PSDTemplates</span>
          </Link>
          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md p-1.5 text-zinc-600 hover:bg-zinc-100" title={item.label}>
                <span className="text-base">{item.icon}</span>
              </Link>
            ))}
          </nav>
        </header>

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
      {telegramUsername && <TelegramSupport username={telegramUsername} />}
    </div>
  )
}
