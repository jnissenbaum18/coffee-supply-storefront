import {Link} from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-roast-600">
        404
      </p>
      <h1 className="mt-2 font-display text-5xl font-bold tracking-tight text-espresso-950">
        This brew is off the menu.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-espresso-700">
        The page you requested does not exist in the Northstar Coffee storefront
        mock.
      </p>
      <Link
        className="mt-8 inline-flex rounded-full bg-espresso-900 px-5 py-3 font-bold text-oat-50 transition hover:bg-roast-600"
        to="/"
      >
        Return home
      </Link>
    </main>
  )
}