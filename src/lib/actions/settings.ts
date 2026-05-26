'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function saveSettings(formData: FormData) {
  const admin = createAdminClient()

  const entries = [
    { key: 'store_name', value: formData.get('store_name') as string },
    { key: 'store_description', value: formData.get('store_description') as string },
    { key: 'default_price', value: formData.get('default_price') as string },
    { key: 'telegram_username', value: formData.get('telegram_username') as string },
    { key: 'admin_email', value: formData.get('admin_email') as string },
  ]

  for (const entry of entries) {
    await admin.from('settings').upsert(entry, { onConflict: 'key' })
  }

  revalidatePath('/dashboard/settings')
}
