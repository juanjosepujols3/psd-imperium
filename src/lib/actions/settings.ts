'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function saveSettings(_: unknown, formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = createAdminClient()

    const entries = [
      { key: 'store_name', value: formData.get('store_name') as string },
      { key: 'store_description', value: formData.get('store_description') as string },
      { key: 'default_price', value: formData.get('default_price') as string },
      { key: 'telegram_username', value: formData.get('telegram_username') as string },
      { key: 'admin_email', value: formData.get('admin_email') as string },
    ]

    for (const entry of entries) {
      const { error } = await admin.from('settings').upsert(entry, { onConflict: 'key' })
      if (error) return { success: false, error: error.message }
    }

    revalidatePath('/dashboard/settings')
    revalidatePath('/(marketing)', 'layout')
    return { success: true }
  } catch (e) {
    return { success: false, error: String(e) }
  }
}
