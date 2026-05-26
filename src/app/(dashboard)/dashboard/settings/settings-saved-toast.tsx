'use client'

import { useFormStatus } from 'react-dom'

export function SettingsSavedToast() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}
      className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60 transition-colors">
      {pending ? 'Saving...' : 'Save Settings'}
    </button>
  )
}
