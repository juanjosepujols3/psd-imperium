import Link from 'next/link'

interface SectionHeaderProps {
  title: string
  highlight?: string
  description?: string
  viewAllHref?: string
}

export function SectionHeader({ title, highlight, description, viewAllHref }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900">
          {title}{' '}
          {highlight && <span className="text-emerald-600">{highlight}</span>}
        </h2>
        {description && <p className="mt-1 text-sm text-zinc-500">{description}</p>}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
        >
          View all →
        </Link>
      )}
    </div>
  )
}
