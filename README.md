Northstar Coffee Roasters
A mock headless-commerce storefront for a fictional specialty coffee business. The project is built as a realistic front-end prototype: React components request catalog data through a typed commerce client, TanStack Query manages server state, and Mock Service Worker (MSW) intercepts browser requests and returns local coffee catalog fixtures.

It currently includes:

A coffee-focused landing page at /

A filterable and searchable catalog at /catalog

Single-origin, blend, and espresso collections

Product origin, roast level, tasting notes, inventory, badges, and pricing

Loading skeletons, empty search results, and API error states

A typed API boundary designed to be replaced by a real commerce backend later

This is a frontend mock, not a production e-commerce application. It does not yet include a real checkout, payments, authentication, cart persistence, inventory reservation, tax, shipping calculation, or order management.

Tech stack
Tool	Role in the project
React + TypeScript	User interface and typed application code
Vite	Local development server, bundling, fast refresh, and production build tooling
Tailwind CSS	Utility-first styles plus the coffee color/type design tokens in src/index.css
React Router	Browser routing for the landing page, catalog page, and fallback 404 page
TanStack Query	Loading/error state, response caching, retries, and future mutation support
MSW	Intercepts browser HTTP requests during development and returns local mock responses
Local TypeScript fixtures	The in-repo coffee catalog used by the MSW API handlers
Requirements
Install a current Node.js version and npm before starting.

bash
node -v
npm -v
Recent Vite releases require Node.js 20.19+ or Node.js 22.12+. If you use n to manage Node versions, install a current LTS release:

bash
sudo n lts
node -v
npm -v
Quick start
1. Clone and enter the project
bash
git clone <your-repository-url>
cd coffee-supply-storefront
Replace <your-repository-url> and coffee-supply-storefront with your actual repository URL and folder name.

2. Install dependencies
bash
npm install
3. Confirm the MSW worker exists
This project uses MSW in the browser. It needs this generated file to exist:

text
public/mockServiceWorker.js
Check for it:

bash
ls -la public/mockServiceWorker.js
If it is missing, generate it:

bash
npx msw init public --save
Commit public/mockServiceWorker.js to Git. It is a required project asset, not a personal generated file that should be ignored.

4. Start the development server
bash
npm run dev
Vite prints a local address, normally:

text
http://localhost:5173
Open that URL in the browser.

5. Run a production build
Before committing or deploying, confirm the TypeScript/build pipeline works:

bash
npm run build
To preview the compiled production output locally:

bash
npm run preview
Routes
URL	Purpose
/	Landing page: hero, category collection cards, featured coffee, brand/value section
/catalog	Full coffee catalog with category filtering, search, and sort controls
/catalog?category=espresso	Espresso-only catalog view
/catalog?q=chocolate	Searches product name, description, origin, roast level, and tasting notes
/catalog?sort=price-high	Sorts products by descending price
Any other path	Coffee-themed 404 page
Try these while the app is running:

text
/catalog
/catalog?category=single-origin
/catalog?category=blends
/catalog?category=espresso
/catalog?q=ethiopia
/catalog?q=chocolate
/catalog?sort=price-low
/catalog?sort=price-high
Architecture
The data flow deliberately resembles a headless storefront:

text
React page or component
  ↓
TanStack Query hook
  ↓
Typed commerce client
  ↓
fetch('/api/...')
  ↓
MSW Service Worker in development
  ↓
MSW request handler
  ↓
Local coffee catalog fixtures
The important architectural choice is that components do not import fixture data directly. A page asks a feature hook for data, the hook asks commerceClient, and the client makes an HTTP request.

That keeps the UI separate from the temporary mock backend. Later, commerceClient can switch from local endpoints to a real B2C Commerce/SCAPI implementation without rewriting every page and card component.

Project map
text
src/
  app/
    providers.tsx                  TanStack Query provider configuration
    router.tsx                     Application routes and shared site layout

  components/
    layout/
      site-header.tsx              Header, navigation, and placeholder bag control
    product/
      product-card.tsx             Reusable coffee card used on home and catalog pages

  features/
    catalog/
      catalog.queries.ts           TanStack Query hooks for categories and products

  lib/
    commerce/
      types.ts                     Stable app-level commerce data types
      commerce-client.ts           Typed HTTP client used by query hooks

  mocks/
    browser.ts                     Creates the browser-side MSW worker
    fixtures/
      catalog.ts                   Mock categories and coffee products
    handlers/
      catalog.handlers.ts          Mock API behavior: filter, search, sort, get by ID
      index.ts                     Combines exported request handlers

  pages/
    home-page.tsx                  Landing page
    catalog-page.tsx               Catalog/search/filter page
    not-found-page.tsx             404 page

  App.tsx                          Connects app providers and router
  index.css                        Tailwind import, coffee design tokens, global styling
  main.tsx                         Starts MSW before mounting React in development

public/
  mockServiceWorker.js             Generated MSW Service Worker; commit this file
How the mock API works
MSW is a browser-level HTTP interceptor. The React application still makes ordinary fetch() calls. In development, the registered Service Worker catches matching calls and responds with fixture data.

Current mock endpoints:

Endpoint	Purpose
GET /api/categories	Returns the Single Origin, Blends, and Espresso collections
GET /api/products	Returns coffee products; supports category, q, sort, limit, and offset query parameters
GET /api/products/:productId	Returns one coffee product by its internal ID, or a 404 JSON response
Examples:

text
GET /api/categories
GET /api/products?limit=3&sort=name-asc
GET /api/products?category=espresso&limit=24
GET /api/products?q=chocolate&sort=price-high
GET /api/products/colombia-la-esperanza
The handlers deliberately add short delays. That is useful: it makes loading skeletons and request transitions visible during development.

Important files
src/lib/commerce/types.ts
Defines the frontend's normalized commerce model.

For example, every Product currently contains:

ts
{
  id: string
  name: string
  slug: string
  categoryId: string
  origin: string
  roastLevel: 'Light' | 'Medium-Light' | 'Medium' | 'Medium-Dark' | 'Dark'
  tastingNotes: string[]
  price: { currency: 'USD'; value: number }
  inventory: { ats: number; orderable: boolean }
}
Keep these types focused on the storefront's actual needs. Do not let raw backend payload shapes spread through UI components.

src/lib/commerce/commerce-client.ts
This is the app's API boundary. It is the only current layer that makes fetch() calls for catalog data.

ts
commerceClient.getCategories()
commerceClient.getProducts({category: 'espresso', sort: 'price-low'})
commerceClient.getProduct('colombia-la-esperanza')
If a page says “Coffee catalog unavailable,” first check this file has been saved and that it is making the expected /api/... URL.

src/mocks/fixtures/catalog.ts
Contains the local category and product data. Add new coffees here.

For a new product, make sure you provide:

A unique id

A URL-safe slug

A valid categoryId matching an existing category

Price and inventory fields

An image URL and meaningful alt text

Coffee-specific information such as origin, roast level, and tasting notes

src/mocks/handlers/catalog.handlers.ts
Contains mock backend behavior—not just static data.

It currently:

Delays responses slightly

Filters coffee by category

Searches name, short description, full description, origin, roast level, and tasting notes

Sorts by price or product name

Applies limit and offset pagination values

Returns a JSON 404 response for an unknown product ID

When adding future endpoints such as a basket or checkout, create separate handler files such as:

text
src/mocks/handlers/basket.handlers.ts
src/mocks/handlers/checkout.handlers.ts
Then add them to src/mocks/handlers/index.ts.

src/main.tsx
Starts MSW before React mounts in development:

tsx
if (import.meta.env.DEV) {
  const {worker} = await import('./mocks/browser')
  await worker.start(...)
}
That order matters. If React renders before the worker is ready, components can fire requests before MSW can intercept them.

src/index.css
Contains:

Tailwind's CSS import

Custom coffee color tokens, such as espresso, oat, roast, and leaf

Display/body font stacks

Global background, selection, and interaction styles

Use the established semantic color family rather than introducing random Tailwind colors everywhere:

text
espresso-*  Dark brown text, structure, and dark backgrounds
oat-*       Cream surfaces and subtle neutral backgrounds
roast-*     Warm orange-brown accents and calls to action
leaf-*      Green brand/value section and positive availability cues
Debugging MSW
Symptom: API request returns the Vite index.html
If you see a response like this instead of JSON:

xml
<!doctype html>
<html lang="en">
  ...
  <div id="root"></div>
</html>
then Vite received an unknown /api/... request and served its SPA HTML fallback. This means MSW did not intercept the call.

Check these items in order:

Confirm public/mockServiceWorker.js exists.

bash
ls -la public/mockServiceWorker.js
With npm run dev running, open:

text
http://localhost:5173/mockServiceWorker.js
It should show JavaScript, not your app HTML.

Open browser DevTools → Application → Service Workers. Confirm a worker for mockServiceWorker.js is active.

If an old worker appears stuck, click Unregister, clear site data, then hard-refresh. macOS:

text
Cmd + Shift + R
Windows/Linux:

text
Ctrl + Shift + R
Stop and restart Vite after generating/replacing the worker:

bash
# Stop with Ctrl+C
npm run dev
Confirm the mock worker starts in src/main.tsx before createRoot(...).render(...).

Confirm the handler path matches the request path:

ts
http.get('/api/products', ...)
Query parameters do not belong in the handler URL. Read them from new URL(request.url).searchParams instead.

Symptom: “Coffee catalog unavailable” appears
This means the useProducts() query rejected. Open the browser console and Network tab, then check:

Is src/lib/commerce/commerce-client.ts saved?

Does the request URL begin with /api/products?

Is the response application/json, rather than HTML?

Is the MSW worker active?

Does catalog.handlers.ts export catalogHandlers?

Does src/mocks/handlers/index.ts include catalogHandlers?

A quick direct test in the browser console is:

js
fetch('/api/products')
  .then((response) => response.json())
  .then(console.log)
  .catch(console.error)
You should receive an object with hits, total, limit, and offset.

Symptom: handler warning in the console
If MSW says it intercepted a request but cannot find a handler, MSW itself is working. You need to add or correct the handler in src/mocks/handlers/.

For example, a missing future cart request may need something like:

ts
http.post('/api/baskets', () => {
  return HttpResponse.json({basketId: 'demo-basket'})
})
Common gotchas
Do not import fixtures in pages/components
Avoid this:

tsx
import {products} from '../../mocks/fixtures/catalog'
inside page or UI code.

That bypasses your mock API and makes a future real backend replacement unnecessarily difficult. Pages should use query hooks; query hooks should call commerceClient.

Do not ignore mockServiceWorker.js
The worker is generated, but it is still required by every developer who runs the browser mock. Keep it checked into version control.

MSW only starts in development
The current main.tsx intentionally starts MSW only when:

ts
import.meta.env.DEV
is true. A production build does not automatically have a catalog backend. Before deploying a production demo, either:

configure MSW to run in that environment intentionally, or

deploy a real mock API/serverless endpoint, or

swap commerceClient to a real commerce API implementation.

For this local-learning phase, development-only MSW is the intended behavior.

The bag is only a visual placeholder
The header's Bag (0) button does not do anything yet. Do not wire UI state directly into it as a quick shortcut. Build a proper basket API and TanStack Query mutations next.

Product links are not implemented yet
ProductCard links to:

text
/products/:slug
A product-detail page is not part of the current route configuration, so clicking a product card will reach the 404 page until you build that feature.

When you add a PDP, choose one lookup strategy and keep it consistent:

Add GET /api/products/slug/:slug, or

use GET /api/products/:id and pass/resolve IDs appropriately, or

make the mock handler support a product search by slug.

Image licensing matters
The starter uses remote Unsplash images for visual prototyping. Replace them with images you own or have permission to use before representing the project as a public commercial storefront or shipping it to production.

Do not put secrets in Vite client variables
Values prefixed with VITE_ are embedded into browser-accessible code.

Safe examples:

bash
VITE_COMMERCE_API_BASE_URL=/api
VITE_USE_MOCK_API=true
Never put private API keys, Salesforce client secrets, Account Manager credentials, payment secrets, or database credentials in VITE_* variables.

Recommended next milestones
Build in this order.

1. Product detail page
Add:

text
/products/:slug
Coffee-specific UI to include:

Large product imagery and full product description

Origin, roast level, process, and tasting notes

Bag size: 12 oz, 2 lb, 5 lb

Whole bean versus ground

Grind selection when ground is selected

Quantity control

One-time purchase versus subscription frequency

Add-to-bag control

2. Stateful basket mock API
Add endpoints such as:

text
POST   /api/baskets
GET    /api/baskets/:basketId
POST   /api/baskets/:basketId/items
PATCH  /api/baskets/:basketId/items/:itemId
DELETE /api/baskets/:basketId/items/:itemId
Persist only the basket ID in localStorage or a small client store. Treat the basket contents and pricing totals as server state: load and mutate them through TanStack Query.

3. Bag and cart page
Implement:

Header bag count

Mini-cart drawer

Cart page

Quantity update/removal mutations

Subtotal and mock free-shipping threshold

Basic discount/promotion behavior

4. Checkout mock
Implement:

Shipping/contact form with Zod validation

Shipping-method selection

Fake payment form; never collect/store real card data in this demo

Mock order creation endpoint

Coffee-themed order confirmation page

5. Tests
Add:

Unit/component tests for ProductCard and filter/search controls

MSW-backed query-hook tests

A Playwright end-to-end flow: find coffee → view product → choose bag/grind → add to bag → fake checkout → confirmation

Future SFCC / SCAPI direction
The app is designed as a mock analogue of a headless B2C Commerce storefront.

Today:

text
React → TanStack Query → commerceClient → MSW → local fixtures
Later:

text
React → TanStack Query → SCAPI adapter → Salesforce Commerce API → SFCC
The replacement should happen primarily in the commerce-client/integration layer. Your pages, card components, and stable storefront types should require minimal change.

For a real Salesforce implementation, additional work would include SCAPI endpoint configuration, SLAS authentication, API access and scopes, robust basket/checkout behavior, server-side secret handling, and an SSR/deployment solution such as PWA Kit/Managed Runtime or the appropriate current Salesforce storefront stack.

Useful commands
bash
# Install dependencies
npm install

# Start local development with fast refresh
npm run dev

# Validate TypeScript and build production files
npm run build

# Preview the compiled build locally
npm run preview

# Regenerate the MSW browser worker if it is missing
npx msw init public --save

# Verify the worker file exists
ls -la public/mockServiceWorker.js
License
This project is a learning/demo storefront. Add a license file appropriate to how you plan to share it before publishing the repository.