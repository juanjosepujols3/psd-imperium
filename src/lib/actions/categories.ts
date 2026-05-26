'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export async function saveCategory(formData: FormData) {
  const admin = createAdminClient()
  const id = formData.get('id') as string | null

  const payload = {
    label: formData.get('label') as string,
    slug: id ? formData.get('slug') as string : slugify(formData.get('label') as string),
    emoji: formData.get('emoji') as string,
    description: formData.get('description') as string,
    order: Number(formData.get('order') ?? 0),
    active: formData.get('active') === 'on',
  }

  if (id) {
    await admin.from('categories').update(payload).eq('id', id)
  } else {
    await admin.from('categories').insert(payload)
  }

  revalidatePath('/dashboard/categories')
  redirect('/dashboard/categories')
}

export async function deleteCategory(id: string) {
  const admin = createAdminClient()
  await admin.from('categories').delete().eq('id', id)
  revalidatePath('/dashboard/categories')
  redirect('/dashboard/categories')
}
