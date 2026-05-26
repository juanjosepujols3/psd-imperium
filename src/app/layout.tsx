import '@/styles/tailwind.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    template: '%s — Imperium PSD',
    default: 'Imperium PSD',
  },
  description: 'Download editable PSD templates for passports, licenses, ID cards and more.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} text-zinc-950 antialiased`}>
      <body>{children}</body>
    </html>
  )
}
