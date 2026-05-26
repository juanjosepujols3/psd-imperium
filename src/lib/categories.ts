export interface CategoryItem {
  id: string
  slug: string
  label: string
  emoji: string
  description: string
  active: boolean
  order: number
}

export const SITE_CATEGORIES: CategoryItem[] = [
  { id: '1', slug: 'passport', label: 'Passports', emoji: '🛂', description: 'Editable passport PSD templates from countries worldwide', active: true, order: 1 },
  { id: '2', slug: 'license', label: "Driver's Licenses", emoji: '🚗', description: 'State and country driver license PSD templates', active: true, order: 2 },
  { id: '3', slug: 'id-card', label: 'ID Cards', emoji: '🪪', description: 'National and state ID card PSD templates', active: true, order: 3 },
  { id: '4', slug: 'bank-statement', label: 'Bank Statements', emoji: '🏦', description: 'Editable bank statement PSD templates from major banks', active: true, order: 4 },
  { id: '5', slug: 'certificate', label: 'Certificates', emoji: '📜', description: 'Certificate and diploma PSD templates', active: true, order: 5 },
  { id: '6', slug: 'social-security', label: 'Social Security', emoji: '🔐', description: 'Social security card PSD templates', active: true, order: 6 },
  { id: '7', slug: 'birth-certificate', label: 'Birth Certificates', emoji: '📋', description: 'Birth certificate PSD templates', active: true, order: 7 },
  { id: '8', slug: 'software', label: 'Software', emoji: '💻', description: 'Software UI mockups, app screens and digital product PSD templates', active: true, order: 8 },
]

export function getActiveCategories(): CategoryItem[] {
  return SITE_CATEGORIES.filter((c) => c.active).sort((a, b) => a.order - b.order)
}
