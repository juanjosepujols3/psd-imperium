'use client'

import { useState } from 'react'

export function TelegramSupport({ username = 'yourusername' }: { username?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Bubble popup */}
      {open && (
        <div className="animate-in slide-in-from-bottom-2 fade-in mb-1 w-72 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-zinc-200">
          {/* Header */}
          <div className="flex items-center gap-3 bg-[#229ED9] px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.88 13.47l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.937z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">PSDTemplates Support</p>
              <p className="text-xs text-white/80">Typically replies instantly</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-white/70 hover:bg-white/20 hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-4 py-4">
            <div className="rounded-xl bg-zinc-50 px-3 py-2.5 text-sm text-zinc-700">
              👋 Hi! Need help with a template or have a question? Chat with us on Telegram — we're here to help!
            </div>
          </div>

          {/* CTA */}
          <div className="px-4 pb-4">
            <a
              href={`https://t.me/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#229ED9] py-3 text-sm font-semibold text-white hover:bg-[#1a8bbf] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.88 13.47l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.937z" />
              </svg>
              Start Chat on Telegram
            </a>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#229ED9] shadow-lg transition-all hover:scale-110 hover:shadow-xl active:scale-95"
        aria-label="Open Telegram support"
      >
        {!open ? (
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.88 13.47l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.937z" />
          </svg>
        ) : (
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#229ED9] opacity-30" />
        )}
      </button>
    </div>
  )
}
