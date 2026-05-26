'use client'

import { useActionState } from 'react'
import { saveSettings } from '@/lib/actions/settings'

const initialState = { success: false, error: undefined as string | undefined }

export function SettingsForm({ children }: { children: React.ReactNode }) {
  const [state, action, pending] = useActionState(saveSettings, initialState)

  return (
    <form action={action} className="space-y-6">
      {state.success && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          ✓ Settings saved successfully
        </div>
      )}
      {state.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          Error: {state.error}
        </div>
      )}
      {children}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60 transition-colors"
      >
        {pending ? 'Saving...' : 'Save Settings'}
      </button>
    </form>
  )
}
