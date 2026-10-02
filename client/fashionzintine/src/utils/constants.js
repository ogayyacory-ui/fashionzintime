export const CATEGORIES = ['Coats', 'Skirts', 'Shorts', 'Dresses']
export const SIZES = ['XS', 'S', 'M', 'L', 'XL']
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'

export const PRODUCTS = [
  { id: 'coat-01', name: 'The Rowan Coat', category: 'Coats', price: 148, stock: 12, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=85', description: 'A softly structured wool-blend coat made for crisp mornings.' },
  { id: 'skirt-01', name: 'Bias Midi Skirt', category: 'Skirts', price: 78, stock: 8, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=85', description: 'An easy, fluid midi skirt with a comfortable high waist.' },
  { id: 'short-01', name: 'Everyday Tailored Short', category: 'Shorts', price: 64, stock: 20, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85', description: 'A tailored warm-weather staple in a breathable cotton blend.' },
]