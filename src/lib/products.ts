import type { Category, Product } from './types'

export const CATEGORIES: { id: Category; label: string; emoji: string; count: number }[] = [
  { id: 'passport', label: 'Passports', emoji: '🛂', count: 48 },
  { id: 'license', label: "Driver's Licenses", emoji: '🚗', count: 35 },
  { id: 'id-card', label: 'ID Cards', emoji: '🪪', count: 29 },
  { id: 'bank-statement', label: 'Bank Statements', emoji: '🏦', count: 22 },
  { id: 'certificate', label: 'Certificates', emoji: '📜', count: 18 },
  { id: 'social-security', label: 'Social Security', emoji: '🔐', count: 12 },
  { id: 'birth-certificate', label: 'Birth Certificates', emoji: '📋', count: 9 },
]

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'USA Passport PSD Template',
    slug: 'usa-passport-psd-template',
    description: 'High quality editable USA passport PSD template. Place your photo and see the final result. Fully layered Photoshop file with smart objects.',
    price: 25,
    category: 'passport',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=280&fit=crop',
    fileUrl: '/files/usa-passport.psd',
    featured: true,
    country: 'United States',
    createdAt: '2024-05-10',
  },
  {
    id: '2',
    name: 'UK Passport PSD Template',
    slug: 'uk-passport-psd-template',
    description: 'Detailed UK passport PSD template with all features. Smart object for easy photo placement.',
    price: 25,
    category: 'passport',
    imageUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=400&h=280&fit=crop',
    fileUrl: '/files/uk-passport.psd',
    featured: true,
    country: 'United Kingdom',
    createdAt: '2024-05-08',
  },
  {
    id: '3',
    name: 'Canada Passport PSD Template',
    slug: 'canada-passport-psd-template',
    description: 'Canadian passport PSD template with editable fields and smart photo layer.',
    price: 25,
    category: 'passport',
    imageUrl: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=280&fit=crop',
    fileUrl: '/files/canada-passport.psd',
    featured: false,
    country: 'Canada',
    createdAt: '2024-05-06',
  },
  {
    id: '4',
    name: 'California Driver License PSD',
    slug: 'california-driver-license-psd',
    description: 'California state driver license PSD template. Fully editable with smart objects.',
    price: 25,
    category: 'license',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=280&fit=crop',
    fileUrl: '/files/ca-license.psd',
    featured: true,
    country: 'USA - California',
    createdAt: '2024-05-05',
  },
  {
    id: '5',
    name: 'Texas Driver License PSD Template',
    slug: 'texas-driver-license-psd-template',
    description: 'High resolution Texas driver license PSD template. Fully layered and editable. Place your photo using the smart object and preview the final result instantly in Photoshop.',
    price: 25,
    category: 'license',
    imageUrl: '/products/texas-license.jpg',
    fileUrl: '/files/tx-license.psd',
    featured: true,
    country: 'USA - Texas',
    createdAt: '2024-05-13',
  },
  {
    id: '6',
    name: 'Germany Passport PSD Template',
    slug: 'germany-passport-psd-template',
    description: 'German passport PSD template with accurate design and editable layers.',
    price: 25,
    category: 'passport',
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=280&fit=crop',
    fileUrl: '/files/de-passport.psd',
    featured: false,
    country: 'Germany',
    createdAt: '2024-05-01',
  },
  {
    id: '7',
    name: 'France Passport PSD Template',
    slug: 'france-passport-psd-template',
    description: 'French passport PSD template fully editable with photo smart layer.',
    price: 25,
    category: 'passport',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=280&fit=crop',
    fileUrl: '/files/fr-passport.psd',
    featured: false,
    country: 'France',
    createdAt: '2024-04-28',
  },
  {
    id: '8',
    name: 'New York State ID PSD',
    slug: 'new-york-state-id-psd',
    description: 'New York state ID card PSD template, all layers named and organized.',
    price: 25,
    category: 'id-card',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=280&fit=crop',
    fileUrl: '/files/ny-id.psd',
    featured: true,
    country: 'USA - New York',
    createdAt: '2024-04-25',
  },
  {
    id: '9',
    name: 'Chase Bank Statement PSD',
    slug: 'chase-bank-statement-psd',
    description: 'Chase Bank monthly statement PSD template. Edit your balance, transactions and personal data. See how a real statement looks.',
    price: 25,
    category: 'bank-statement',
    imageUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&h=280&fit=crop',
    fileUrl: '/files/chase-statement.psd',
    featured: true,
    country: 'USA',
    createdAt: '2024-05-12',
  },
  {
    id: '10',
    name: 'Bank of America Statement PSD',
    slug: 'bank-of-america-statement-psd',
    description: 'Bank of America bank statement PSD template, fully editable layers.',
    price: 25,
    category: 'bank-statement',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=280&fit=crop',
    fileUrl: '/files/boa-statement.psd',
    featured: false,
    country: 'USA',
    createdAt: '2024-05-11',
  },
  {
    id: '11',
    name: 'Australia Passport PSD Template',
    slug: 'australia-passport-psd-template',
    description: 'Australian passport PSD template, high resolution with all pages included.',
    price: 25,
    category: 'passport',
    imageUrl: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&h=280&fit=crop',
    fileUrl: '/files/au-passport.psd',
    featured: false,
    country: 'Australia',
    createdAt: '2024-04-20',
  },
  {
    id: '12',
    name: 'Florida Driver License PSD',
    slug: 'florida-driver-license-psd',
    description: 'Florida driver license PSD template with editable text and photo smart object.',
    price: 25,
    category: 'license',
    imageUrl: 'https://images.unsplash.com/photo-1546624585-ec9dbccbbd88?w=400&h=280&fit=crop',
    fileUrl: '/files/fl-license.psd',
    featured: false,
    country: 'USA - Florida',
    createdAt: '2024-04-22',
  },
]

export function getProductsByCategory(category: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured)
}

export function getNewlyAdded(limit = 8): Product[] {
  return [...PRODUCTS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getRecentlyViewed(limit = 4): Product[] {
  // In production this would read from localStorage/cookies
  return PRODUCTS.slice(0, limit)
}
