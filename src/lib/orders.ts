export interface Order {
  id: string
  customerName: string
  customerEmail: string
  productName: string
  productSlug: string
  amount: number
  status: 'completed' | 'pending' | 'refunded'
  date: string
  downloadUrl: string
}

export const MOCK_ORDERS: Order[] = [
  { id: 'ORD-001', customerName: 'John Smith', customerEmail: 'john@example.com', productName: 'Texas Driver License PSD Template', productSlug: 'texas-driver-license-psd-template', amount: 25, status: 'completed', date: '2024-05-13', downloadUrl: '/files/tx-license.psd' },
  { id: 'ORD-002', customerName: 'Maria Garcia', customerEmail: 'maria@example.com', productName: 'USA Passport PSD Template', productSlug: 'usa-passport-psd-template', amount: 25, status: 'completed', date: '2024-05-12', downloadUrl: '/files/usa-passport.psd' },
  { id: 'ORD-003', customerName: 'David Lee', customerEmail: 'david@example.com', productName: 'Chase Bank Statement PSD', productSlug: 'chase-bank-statement-psd', amount: 25, status: 'completed', date: '2024-05-11', downloadUrl: '/files/chase-statement.psd' },
  { id: 'ORD-004', customerName: 'Sarah Johnson', customerEmail: 'sarah@example.com', productName: 'UK Passport PSD Template', productSlug: 'uk-passport-psd-template', amount: 25, status: 'pending', date: '2024-05-10', downloadUrl: '/files/uk-passport.psd' },
  { id: 'ORD-005', customerName: 'Carlos Rivera', customerEmail: 'carlos@example.com', productName: 'California Driver License PSD', productSlug: 'california-driver-license-psd', amount: 25, status: 'completed', date: '2024-05-09', downloadUrl: '/files/ca-license.psd' },
  { id: 'ORD-006', customerName: 'Emma Wilson', customerEmail: 'emma@example.com', productName: 'New York State ID PSD', productSlug: 'new-york-state-id-psd', amount: 25, status: 'refunded', date: '2024-05-08', downloadUrl: '/files/ny-id.psd' },
  { id: 'ORD-007', customerName: 'James Brown', customerEmail: 'james@example.com', productName: 'Canada Passport PSD Template', productSlug: 'canada-passport-psd-template', amount: 25, status: 'completed', date: '2024-05-07', downloadUrl: '/files/canada-passport.psd' },
]

// Simulated orders for the logged-in customer
export const MY_ORDERS: Order[] = [
  { id: 'ORD-002', customerName: 'Maria Garcia', customerEmail: 'maria@example.com', productName: 'USA Passport PSD Template', productSlug: 'usa-passport-psd-template', amount: 25, status: 'completed', date: '2024-05-12', downloadUrl: '/files/usa-passport.psd' },
  { id: 'ORD-005', customerName: 'Maria Garcia', customerEmail: 'maria@example.com', productName: 'California Driver License PSD', productSlug: 'california-driver-license-psd', amount: 25, status: 'completed', date: '2024-05-09', downloadUrl: '/files/ca-license.psd' },
]
