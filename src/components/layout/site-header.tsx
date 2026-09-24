import {Link, NavLink} from 'react-router-dom'

const navLinkClass = ({isActive}: {isActive: boolean}) =>
  [
    'text-sm font-semibold transition',
    isActive
      ? 'text-espresso-950'
      : 'text-espresso-700 hover:text-roast-600'
  ].join(' ')

export function SiteHeader() {
  return (
    <header className="border-b border-espresso-200/70 bg-oat-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link className="group flex items-center gap-2" to="/">
          <span className="grid size-9 place-items-center rounded-full bg-espresso-900 text-sm text-oat-100 shadow-sm transition group-hover:bg-roast-600">
            ☕
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-espresso-950">
            Northstar Coffee
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="flex items-center gap-5 sm:gap-7">
          <NavLink className={navLinkClass} to="/">
            Home
          </NavLink>
          <NavLink className={navLinkClass} to="/catalog">
            Shop coffee
          </NavLink>
        </nav>

        <button
          className="rounded-full border border-espresso-300 bg-white px-4 py-2 text-sm font-bold text-espresso-800 transition hover:border-espresso-500 hover:bg-espresso-50"
          type="button"
        >
          Bag (0)
        </button>
      </div>
    </header>
  )
}