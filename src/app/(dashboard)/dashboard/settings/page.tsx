import { createAdminClient } from '@/lib/supabase/admin'
import { SettingsForm } from './settings-saved-toast'

export default async function SettingsPage() {
  const admin = createAdminClient()
  const { data: rows } = await admin.from('settings').select('key, value')

  const s: Record<string, string> = {}
  for (const row of rows ?? []) s[row.key] = row.value

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-zinc-900">Settings</h1>
      <p className="mt-1 text-sm text-zinc-500">Configure your store</p>

      <SettingsForm>
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-zinc-900">Store Information</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700">Store Name</label>
              <input type="text" name="store_name" defaultValue={s.store_name ?? ''} required
                className="mt-1.5 block w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700">Store Description</label>
              <textarea name="store_description" defaultValue={s.store_description ?? ''} rows={3}
                className="mt-1.5 block w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-zinc-900">Pricing</h2>
          <div className="mt-4">
            <label className="block text-sm font-medium text-zinc-700">Default Product Price ($)</label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">$</span>
              <input type="number" name="default_price" defaultValue={s.default_price ?? '25'} min={1}
                className="block w-32 rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-zinc-900">Support — Telegram</h2>
          <div className="mt-4">
            <label className="block text-sm font-medium text-zinc-700">Telegram Username</label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">@</span>
              <input type="text" name="telegram_username" defaultValue={s.telegram_username ?? ''} placeholder="yourusername"
                className="block w-full rounded-lg border border-zinc-300 py-2.5 pl-8 pr-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-zinc-900">Admin Account</h2>
          <div className="mt-4">
            <label className="block text-sm font-medium text-zinc-700">Email</label>
            <input type="email" name="admin_email" defaultValue={s.admin_email ?? ''} required
              className="mt-1.5 block w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
        </div>
      </SettingsForm>
    </div>
  )
}
