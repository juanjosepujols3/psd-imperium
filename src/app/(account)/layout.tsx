import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { TelegramSupport } from '@/components/telegram-support'
import { LogoutButton } from '@/components/logout-button'

const navItems = [
  { href: '/account', label: 'My Account', icon: '👤' },
  { href: '/account/orders', label: 'My Orders', icon: '📦' },
  { href: '/account/downloads', label: 'Downloads', icon: '⬇️' },
]

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const admin = createAdminClient()
  const { data: rows } = await admin.from('settings').select('key, value').eq('key', 'telegram_username')
  const telegramUsername = rows?.[0]?.value ?? ''
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Topbar */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="PSD IMPERIUM" className="h-7 w-7 object-contain" />
            <span className="font-bold tracking-tight text-zinc-900">PSD IMPERIUM</span>
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900">
                <span>{item.icon}</span>
                <span className="hidden sm:block">{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900">← Back to store</Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
      {telegramUsername && <TelegramSupport username={telegramUsername} />}
    </div>
  )
}
