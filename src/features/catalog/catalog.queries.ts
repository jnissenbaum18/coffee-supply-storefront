import {useQuery} from '@tanstack/react-query'
import {commerceClient} from '../../lib/commerce/commerce-client'
import type {CatalogQuery} from '../../lib/commerce/types'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => commerceClient.getCategories()
  })
}

export function useProducts(query: CatalogQuery = {}) {
  return useQuery({
    queryKey: ['products', query],
    queryFn: () => commerceClient.getProducts(query)
  })
}