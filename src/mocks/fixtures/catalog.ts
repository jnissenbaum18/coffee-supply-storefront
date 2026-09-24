import type {Category, Product} from '../../lib/commerce/types'

export const categories: Category[] = [
  {
    id: 'single-origin',
    name: 'Single Origin',
    slug: 'single-origin',
    description: 'Traceable coffees with a distinct sense of place, season, and producer.',
    image: {
      alt: 'Coffee beans in a burlap sack',
      url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=85'
    }
  },
  {
    id: 'blends',
    name: 'Blends',
    slug: 'blends',
    description: 'Balanced, dependable coffees crafted for your daily ritual.',
    image: {
      alt: 'Freshly roasted coffee beans in a metal scoop',
      url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85'
    }
  },
  {
    id: 'espresso',
    name: 'Espresso',
    slug: 'espresso',
    description: 'Rich, syrupy profiles built to shine as espresso or in milk drinks.',
    image: {
      alt: 'A freshly pulled espresso in a ceramic cup',
      url: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=1200&q=85'
    }
  }
]

export const products: Product[] = [
  {
    id: 'colombia-la-esperanza',
    name: 'Colombia La Esperanza',
    slug: 'colombia-la-esperanza',
    shortDescription: 'A washed Colombian coffee with a bright, comforting cup.',
    description:
      'This washed lot from La Esperanza opens with brown sugar sweetness, moves into red apple acidity, and finishes with soft cocoa. It is approachable enough for every morning while retaining the clarity of a carefully produced single origin.',
    categoryId: 'single-origin',
    origin: 'Huila, Colombia',
    roastLevel: 'Medium-Light',
    tastingNotes: ['Brown sugar', 'Red apple', 'Cocoa'],
    image: {
      alt: 'Fresh coffee beans in a white ceramic bowl',
      url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=900&q=85'
    },
    price: {currency: 'USD', value: 18},
    inventory: {ats: 26, orderable: true},
    badges: ['Seasonal']
  },
  {
    id: 'ethiopia-halo-hartume',
    name: 'Ethiopia Halo Hartume',
    slug: 'ethiopia-halo-hartume',
    shortDescription: 'Floral and tea-like, with a sparkling stone-fruit finish.',
    description:
      'A delicate washed Ethiopian offering a jasmine-like aroma, ripe peach sweetness, and a clean black-tea finish. Especially rewarding as a pour-over, but still lively and elegant from a drip brewer.',
    categoryId: 'single-origin',
    origin: 'Gedeb, Ethiopia',
    roastLevel: 'Light',
    tastingNotes: ['Jasmine', 'Peach', 'Black tea'],
    image: {
      alt: 'Coffee poured from a glass carafe into a cup',
      url: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=900&q=85'
    },
    price: {currency: 'USD', value: 21},
    inventory: {ats: 11, orderable: true},
    badges: ['Limited release']
  },
  {
    id: 'daybreak-house-blend',
    name: 'Daybreak House Blend',
    slug: 'daybreak-house-blend',
    shortDescription: 'A smooth, all-day cup with caramel sweetness and a rounded body.',
    description:
      'Daybreak is our dependable daily blend: easygoing, sweet, and balanced. Built for drip coffee, French press, and anyone who wants a cup that is familiar without being boring.',
    categoryId: 'blends',
    origin: 'Colombia and Guatemala',
    roastLevel: 'Medium',
    tastingNotes: ['Caramel', 'Almond', 'Milk chocolate'],
    image: {
      alt: 'A cup of coffee beside roasted coffee beans',
      url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85'
    },
    price: {currency: 'USD', value: 16},
    inventory: {ats: 48, orderable: true},
    badges: ['Best seller']
  },
  {
    id: 'campfire-decaf',
    name: 'Campfire Decaf',
    slug: 'campfire-decaf',
    shortDescription: 'A full-bodied decaf that keeps the sweetness and skips the buzz.',
    description:
      'A water-processed decaf blend with notes of toasted marshmallow, cacao nib, and roasted hazelnut. Designed for a deeply satisfying late-afternoon or evening cup.',
    categoryId: 'blends',
    origin: 'Colombia and Peru',
    roastLevel: 'Medium-Dark',
    tastingNotes: ['Cacao nib', 'Hazelnut', 'Toasted marshmallow'],
    image: {
      alt: 'Coffee in a mug on a wooden table',
      url: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=85'
    },
    price: {currency: 'USD', value: 17},
    inventory: {ats: 19, orderable: true}
  },
  {
    id: 'night-shift-espresso',
    name: 'Night Shift Espresso',
    slug: 'night-shift-espresso',
    shortDescription: 'Dense, sweet, and velvety—with enough presence to cut through milk.',
    description:
      'Night Shift is built for espresso: syrupy body, dark cherry sweetness, and a long cocoa finish. It makes a confident straight shot and an excellent base for cappuccinos and lattes.',
    categoryId: 'espresso',
    origin: 'Brazil and Colombia',
    roastLevel: 'Medium-Dark',
    tastingNotes: ['Dark cherry', 'Fudge', 'Toasted walnut'],
    image: {
      alt: 'A double espresso in a small cup',
      url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=85'
    },
    price: {currency: 'USD', value: 17},
    inventory: {ats: 34, orderable: true},
    badges: ['Cafe favorite']
  },
  {
    id: 'midnight-espresso',
    name: 'Midnight Espresso',
    slug: 'midnight-espresso',
    shortDescription: 'A dark, traditional espresso roast with a smoky-sweet finish.',
    description:
      'For lovers of a more developed roast, Midnight delivers bittersweet chocolate, baking spice, and a rich crema. Strong enough for milk drinks, steady enough for a classic after-dinner espresso.',
    categoryId: 'espresso',
    origin: 'Brazil and Guatemala',
    roastLevel: 'Dark',
    tastingNotes: ['Bittersweet chocolate', 'Baking spice', 'Molasses'],
    image: {
      alt: 'Dark espresso in a black ceramic cup',
      url: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=900&q=85'
    },
    price: {currency: 'USD', value: 18},
    inventory: {ats: 0, orderable: false},
    badges: ['Restocking soon']
  }
]