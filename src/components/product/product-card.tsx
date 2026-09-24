import {Link} from 'react-router-dom'
import type {Product} from '../../lib/commerce/types'

type ProductCardProps = {
  product: Product
}

export function ProductCard({product}: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-espresso-200/70 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-espresso-900/10">
      <div className="relative aspect-square overflow-hidden bg-espresso-100">
        <img
          alt={product.image.alt}
          className="size-full object-cover transition duration-500 group-hover:scale-105"
          src={product.image.url}
        />

        {product.badges?.[0] && (
          <span className="absolute left-4 top-4 rounded-full bg-oat-50/95 px-3 py-1 text-xs font-bold text-espresso-900 shadow-sm backdrop-blur">
            {product.badges[0]}
          </span>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-roast-600">
            {product.origin}
          </p>
          <Link
            className="mt-1 block font-display text-2xl font-bold leading-tight text-espresso-950 transition hover:text-roast-600"
            to={`/products/${product.slug}`}
          >
            {product.name}
          </Link>
          <p className="mt-2 text-sm leading-6 text-espresso-700">
            {product.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.tastingNotes.map((note) => (
            <span
              className="rounded-full bg-oat-100 px-2.5 py-1 text-xs font-medium text-espresso-700"
              key={note}
            >
              {note}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-espresso-100 pt-4">
          <span className="text-lg font-bold text-espresso-950">
            ${product.price.value.toFixed(2)}
          </span>

          <span
            className={
              product.inventory.orderable
                ? 'text-xs font-bold text-leaf-700'
                : 'text-xs font-bold text-roast-700'
            }
          >
            {product.inventory.orderable ? 'Freshly available' : 'Restocking soon'}
          </span>
        </div>
      </div>
    </article>
  )
}