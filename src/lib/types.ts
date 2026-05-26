export type Category =
  | 'passport'
  | 'license'
  | 'id-card'
  | 'bank-statement'
  | 'certificate'
  | 'social-security'
  | 'birth-certificate'
  | 'software'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category: Category
  imageUrl: string
  fileUrl: string
  featured: boolean
  country?: string
  createdAt: string
}
