import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import { MarketingNavbar } from './components/navbar'
import { MarketingFooter } from './components/footer'
import { TelegramSupport } from '@/components/telegram-support'

export const metadata: Metadata = {
  title: { template: '%s — Imperium PSD', default: 'Imperium PSD — Download Editable Document Templates' },
  description: 'Download high-quality editable PSD templates for passports, driver licenses, ID cards, bank statements and more.',
}

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const admin = createAdminClient()

  const [{ data: categories }, { data: settingsRows }] = await Promise.all([
    admin.from('categories').select('id, slug, label, emoji').eq('active', true).order('"order"'),
    admin.from('settings').select('key, value'),
  ])

  const settings: Record<string, string> = {}
  for (const row of settingsRows ?? []) settings[row.key] = row.value

  return (
    <div className="min-h-screen bg-white">
      <MarketingNavbar categories={categories ?? []} />
      <main>{children}</main>
      <MarketingFooter />
      {settings.telegram_username && (
        <TelegramSupport username={settings.telegram_username} />
      )}
    </div>
  )
}
