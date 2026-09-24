import {createBrowserRouter, Outlet} from 'react-router-dom'
import {SiteHeader} from '../components/layout/site-header'
import {CatalogPage} from '../pages/catalog-page'
import {HomePage} from '../pages/home-page'
import {NotFoundPage} from '../pages/not-found-page'

function RootLayout() {
  return (
    <div className="min-h-screen bg-oat-50">
      <SiteHeader />
      <Outlet />
    </div>
  )
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/catalog',
        element: <CatalogPage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
])