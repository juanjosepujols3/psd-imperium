'use client'

import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending}
      className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60 transition-colors">
      {pending ? 'Saving...' : 'Save Settings'}
    </button>
  )
}

export function SettingsSavedToast({ saved }: { saved?: boolean }) {
  return (
    <>
      {saved && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm font-medium text-emerald-700">
          ✓ Settings saved successfully
        </div>
      )}
      <SubmitButton />
    </>
  )
}
