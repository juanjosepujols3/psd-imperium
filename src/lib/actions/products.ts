'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export async function saveProduct(formData: FormData) {
  const admin = createAdminClient()
  const id = formData.get('id') as string | null

  const payload = {
    name: formData.get('name') as string,
    slug: slugify(formData.get('name') as string),
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
    category_slug: formData.get('category') as string,
    country: formData.get('country') as string,
    image_url: formData.get('image_url') as string,
    file_url: formData.get('file_url') as string,
    featured: formData.get('featured') === 'on',
  }

  if (id) {
    await admin.from('products').update(payload).eq('id', id)
  } else {
    await admin.from('products').insert(payload)
  }

  revalidatePath('/dashboard/products')
  revalidatePath('/')
  redirect('/dashboard/products')
}

export async function deleteProduct(id: string) {
  const admin = createAdminClient()
  await admin.from('products').delete().eq('id', id)
  revalidatePath('/dashboard/products')
  revalidatePath('/')
  redirect('/dashboard/products')
}

export async function toggleFeatured(id: string, featured: boolean) {
  const admin = createAdminClient()
  await admin.from('products').update({ featured }).eq('id', id)
  revalidatePath('/dashboard/products')
}
