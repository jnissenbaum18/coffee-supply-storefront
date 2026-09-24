import {useMemo} from 'react'
import {useSearchParams} from 'react-router-dom'
import {ProductCard} from '../components/product/product-card'
import {useCategories, useProducts} from '../features/catalog/catalog.queries'

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const category = searchParams.get('category') ?? ''
  const q = searchParams.get('q') ?? ''
  const sort = searchParams.get('sort') ?? 'name-asc'

  const catalogQuery = useMemo(
    () => ({
      category: category || undefined,
      q: q || undefined,
      sort: sort as 'price-low' | 'price-high' | 'name-asc',
      limit: 24
    }),
    [category, q, sort]
  )

  const categoriesQuery = useCategories()
  const productsQuery = useProducts(catalogQuery)

  function updateParam(name: string, value: string) {
    const next = new URLSearchParams(searchParams)

    if (value) {
      next.set(name, value)
    } else {
      next.delete(name)
    }

    setSearchParams(next)
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-roast-600">
          Fresh coffee, shipped fast
        </p>
        <h1 className="mt-2 font-display text-5xl font-bold tracking-tight text-espresso-950">
          Shop coffee.
        </h1>
        <p className="mt-4 text-lg leading-8 text-espresso-700">
          Browse single origins, dependable blends, and espresso coffees roasted
          for the way you brew at home.
        </p>
      </div>

      <section
        aria-label="Catalog controls"
        className="mt-10 grid gap-4 rounded-2xl border border-espresso-200/70 bg-white p-5 shadow-sm md:grid-cols-[1fr_220px]"
      >
        <label className="grid gap-2">
          <span className="text-sm font-bold text-espresso-800">Search coffee</span>
          <input
            className="rounded-xl border border-espresso-300 bg-oat-50 px-4 py-3 text-espresso-950 outline-none transition placeholder:text-espresso-500 focus:border-roast-500 focus:ring-4 focus:ring-roast-100"
            onChange={(event) => updateParam('q', event.target.value)}
            placeholder="Try “chocolate”, “Ethiopia”, or “espresso”"
            type="search"
            value={q}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-espresso-800">Sort by</span>
          <select
            className="rounded-xl border border-espresso-300 bg-oat-50 px-4 py-3 text-espresso-950 outline-none transition focus:border-roast-500 focus:ring-4 focus:ring-roast-100"
            onChange={(event) => updateParam('sort', event.target.value)}
            value={sort}
          >
            <option value="name-asc">Name: A–Z</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[230px_1fr]">
        <aside className="h-fit rounded-2xl border border-espresso-200/70 bg-white p-5 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-espresso-950">
            Coffee type
          </h2>

          {categoriesQuery.isLoading && (
            <p className="mt-4 text-sm text-espresso-700">Loading categories…</p>
          )}

          {categoriesQuery.data && (
            <div className="mt-4 grid gap-2">
              <button
                className={
                  !category
                    ? 'rounded-xl bg-espresso-900 px-3 py-2.5 text-left text-sm font-bold text-oat-50'
                    : 'rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-espresso-700 transition hover:bg-oat-100 hover:text-espresso-950'
                }
                onClick={() => updateParam('category', '')}
                type="button"
              >
                All coffee
              </button>

              {categoriesQuery.data.map((item) => (
                <button
                  className={
                    category === item.id
                      ? 'rounded-xl bg-espresso-900 px-3 py-2.5 text-left text-sm font-bold text-oat-50'
                      : 'rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-espresso-700 transition hover:bg-oat-100 hover:text-espresso-950'
                  }
                  key={item.id}
                  onClick={() => updateParam('category', item.id)}
                  type="button"
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </aside>

        <section aria-live="polite">
          {productsQuery.isLoading && (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  className="h-[30rem] animate-pulse rounded-2xl bg-espresso-200"
                  key={item}
                />
              ))}
            </div>
          )}

          {productsQuery.isError && (
            <div className="rounded-2xl border border-roast-200 bg-roast-50 p-6 text-roast-700">
              <h2 className="font-bold">Coffee catalog unavailable</h2>
              <p className="mt-2 text-sm">
                The coffee request failed. Reload the page and try again.
              </p>
            </div>
          )}

          {productsQuery.data && (
            <>
              <p className="mb-5 text-sm font-medium text-espresso-700">
                {productsQuery.data.total} coffee
                {productsQuery.data.total === 1 ? '' : 's'} found
              </p>

              {productsQuery.data.hits.length === 0 ? (
                <div className="rounded-2xl border border-espresso-200/70 bg-white p-8 shadow-sm">
                  <h2 className="font-display text-2xl font-bold text-espresso-950">
                    No coffee found
                  </h2>
                  <p className="mt-2 text-espresso-700">
                    Try another search term or remove a coffee-type filter.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {productsQuery.data.hits.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  )
}