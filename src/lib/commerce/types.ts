export type Money = {
  currency: 'USD'
  value: number
}

export type ProductImage = {
  alt: string
  url: string
}

export type Product = {
  id: string
  name: string
  slug: string
  shortDescription: string
  description: string
  categoryId: string
  origin: string
  roastLevel: 'Light' | 'Medium-Light' | 'Medium' | 'Medium-Dark' | 'Dark'
  tastingNotes: string[]
  image: ProductImage
  price: Money
  inventory: {
    ats: number
    orderable: boolean
  }
  badges?: string[]
}

export type Category = {
  id: string
  name: string
  slug: string
  description: string
  image: ProductImage
}

export type ProductSearchResult = {
  hits: Product[]
  limit: number
  offset: number
  total: number
}

export type CatalogQuery = {
  category?: string
  q?: string
  limit?: number
  offset?: number
  sort?: 'price-low' | 'price-high' | 'name-asc'
}