import { createContext, useState } from 'react'

export const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fashionzintime-cart')) || [] } catch { return [] }
  })

  function updateCart(items) {
    localStorage.setItem('fashionzintime-cart', JSON.stringify(items))
    setCartItems(items)
  }

  function addToCart(product, size = 'M') {
    const match = cartItems.find((item) => item.id === product.id && item.size === size)
    updateCart(match
      ? cartItems.map((item) => item === match ? { ...item, quantity: item.quantity + 1 } : item)
      : [...cartItems, { ...product, size, quantity: 1 }])
  }

  function updateQuantity(id, size, quantity) {
    updateCart(cartItems.flatMap((item) => item.id === id && item.size === size
      ? quantity > 0 ? [{ ...item, quantity }] : []
      : [item]))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return <CartContext.Provider value={{ cartItems, total, addToCart, updateQuantity, clearCart: () => updateCart([]) }}>{children}</CartContext.Provider>
}