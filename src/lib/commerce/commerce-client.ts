import type {
  CatalogQuery,
  Category,
  Product,
  ProductSearchResult
} from './types'

/* Do not make individual React components import catalog fixtures directly. 
Components should always ask the commerce client for data. 
The client can later be converted to use real SCAPI calls and normalize those responses to the same Product, Category, and ProductSearchResult shapes. */

function createQueryString(query: CatalogQuery) {
  const params = new URLSearchParams()

  if (query.category) params.set('category', query.category)
  if (query.q) params.set('q', query.q)
  if (query.sort) params.set('sort', query.sort)
  if (query.limit) params.set('limit', String(query.limit))
  if (query.offset) params.set('offset', String(query.offset))

  const value = params.toString()

  return value ? `?${value}` : ''
}

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Commerce request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export const commerceClient = {
  async getCategories(): Promise<Category[]> {
    const response = await request<{data: Category[]}>('/api/categories')
    return response.data
  },

  getProducts(query: CatalogQuery = {}): Promise<ProductSearchResult> {
    return request<ProductSearchResult>(
      `/api/products${createQueryString(query)}`
    )
  },

  getProduct(productId: string): Promise<Product> {
    return request<Product>(`/api/products/${productId}`)
  }
}