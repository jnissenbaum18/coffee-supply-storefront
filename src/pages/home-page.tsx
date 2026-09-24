import {Link} from 'react-router-dom'
import {ProductCard} from '../components/product/product-card'
import {useCategories, useProducts} from '../features/catalog/catalog.queries'

export function HomePage() {
  const categoriesQuery = useCategories()
  const productsQuery = useProducts({
    limit: 3,
    sort: 'name-asc'
  })

  return (
    <main>
      <section className="overflow-hidden bg-espresso-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-roast-200">
              Small-batch coffee, roasted with care
            </p>

            <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[0.98] tracking-tight text-oat-50 sm:text-6xl">
              Your best morning starts with a better cup.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-espresso-200">
              Thoughtfully sourced coffee, roasted in small batches and delivered
              fresh for the ritual you look forward to every day.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                className="rounded-full bg-roast-500 px-6 py-3 font-bold text-white transition hover:bg-roast-400"
                to="/catalog"
              >
                Shop fresh coffee
              </Link>

              <a
                className="rounded-full border border-espresso-500 px-6 py-3 font-bold text-oat-50 transition hover:border-espresso-300 hover:bg-white/5"
                href="#featured"
              >
                Explore featured roasts
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-espresso-200">
              <span>Roasted to order</span>
              <span>Free shipping over $40</span>
              <span>Ethically sourced</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-roast-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-espresso-700 bg-espresso-900 p-3 shadow-2xl shadow-black/30">
              <img
                alt="A barista pouring fresh coffee into a ceramic cup"
                className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-roast-600">
              Find your daily cup
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-espresso-950">
              Coffee for every kind of morning.
            </h2>
          </div>

          <Link
            className="text-sm font-bold text-roast-700 transition hover:text-roast-500"
            to="/catalog"
          >
            Browse all coffee →
          </Link>
        </div>

        {categoriesQuery.isLoading && (
          <p className="mt-8 text-espresso-700">Loading coffee categories…</p>
        )}

        {categoriesQuery.isError && (
          <p className="mt-8 text-roast-700">
            We could not load coffee categories. Please try again.
          </p>
        )}

        {categoriesQuery.data && (
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {categoriesQuery.data.map((category) => (
              <Link
                className="group overflow-hidden rounded-2xl border border-espresso-200/70 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-espresso-900/10"
                key={category.id}
                to={`/catalog?category=${category.id}`}
              >
                <div className="overflow-hidden">
                  <img
                    alt={category.image.alt}
                    className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
                    src={category.image.url}
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-2xl font-bold text-espresso-950">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-espresso-700">
                    {category.description}
                  </p>
                  <span className="mt-4 inline-block text-sm font-bold text-roast-700">
                    Shop collection →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="border-y border-espresso-200/70 bg-oat-100/80" id="featured">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-roast-600">
              From this week's roast
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-espresso-950">
              Start with something exceptional.
            </h2>
            <p className="mt-4 text-lg leading-8 text-espresso-700">
              A few customer favorites to take you from the first pour to the
              last sip.
            </p>
          </div>

          {productsQuery.isLoading && (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  className="h-[30rem] animate-pulse rounded-2xl bg-espresso-200"
                  key={item}
                />
              ))}
            </div>
          )}

          {productsQuery.isError && (
            <p className="mt-8 text-roast-700">
              We could not load featured coffee.
            </p>
          )}

          {productsQuery.data && (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {productsQuery.data.hits.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="rounded-3xl bg-leaf-700 px-7 py-12 text-oat-50 sm:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-100">
            The Northstar promise
          </p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-end">
            <h2 className="font-display text-4xl font-bold leading-tight">
              Coffee with a clear origin and a fresher finish.
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-leaf-100">
              We buy coffee with care, roast it in small batches, and send it
              out quickly—so the coffee you brew at home tastes like it should.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}