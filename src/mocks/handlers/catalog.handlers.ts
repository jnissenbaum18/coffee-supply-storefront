import {delay, http, HttpResponse} from 'msw'
import {categories, products} from '../fixtures/catalog'

function sortProducts(
  items: typeof products,
  sort: string | null
): typeof products {
  const sorted = [...items]

  if (sort === 'price-low') {
    return sorted.sort((a, b) => a.price.value - b.price.value)
  }

  if (sort === 'price-high') {
    return sorted.sort((a, b) => b.price.value - a.price.value)
  }

  if (sort === 'name-asc') {
    return sorted.sort((a, b) => a.name.localeCompare(b.name))
  }

  return sorted
}

export const catalogHandlers = [
  http.get('/api/categories', async () => {
    await delay(300)

    return HttpResponse.json({data: categories})
  }),

  http.get('/api/products', async ({request}) => {
    await delay(500)

    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    const query = url.searchParams.get('q')?.trim().toLowerCase()
    const sort = url.searchParams.get('sort')
    const limit = Number(url.searchParams.get('limit') ?? '24')
    const offset = Number(url.searchParams.get('offset') ?? '0')

    let filtered = products

    if (category) {
      filtered = filtered.filter((product) => product.categoryId === category)
    }

    if (query) {
      filtered = filtered.filter((product) => {
        const searchableText = [
          product.name,
          product.shortDescription,
          product.description,
          product.origin,
          product.roastLevel,
          ...product.tastingNotes
        ]
          .join(' ')
          .toLowerCase()

        return searchableText.includes(query)
      })
    }

    const sorted = sortProducts(filtered, sort)
    const hits = sorted.slice(offset, offset + limit)

    return HttpResponse.json({
      hits,
      total: sorted.length,
      limit,
      offset
    })
  }),

  http.get('/api/products/:productId', async ({params}) => {
    await delay(400)

    const product = products.find((item) => item.id === params.productId)

    if (!product) {
      return HttpResponse.json(
        {
          title: 'Coffee not found',
          detail: `No coffee exists with ID "${params.productId}".`
        },
        {status: 404}
      )
    }

    return HttpResponse.json(product)
  })
]