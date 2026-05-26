import Link from 'next/link'

export function MarketingFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white">I</div>
              <span className="font-bold text-zinc-900">Imperium PSD</span>
            </div>
            <p className="mt-3 text-sm text-zinc-500">
              Download high-quality editable PSD templates for passports, licenses, IDs and more.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Categories</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-500">
              <li><Link href="/category/passport" className="hover:text-zinc-900">Passports</Link></li>
              <li><Link href="/category/license" className="hover:text-zinc-900">Driver Licenses</Link></li>
              <li><Link href="/category/id-card" className="hover:text-zinc-900">ID Cards</Link></li>
              <li><Link href="/category/bank-statement" className="hover:text-zinc-900">Bank Statements</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Support</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-500">
              <li><Link href="/faq" className="hover:text-zinc-900">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-zinc-900">Contact</Link></li>
              <li><Link href="/how-it-works" className="hover:text-zinc-900">How it works</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-500">
              <li><Link href="/terms" className="hover:text-zinc-900">Terms of Use</Link></li>
              <li><Link href="/privacy" className="hover:text-zinc-900">Privacy Policy</Link></li>
              <li><Link href="/refund" className="hover:text-zinc-900">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-400">
          © {new Date().getFullYear()} Imperium PSD. All rights reserved. Templates are for educational and design preview purposes only.
        </div>
      </div>
    </footer>
  )
}
