import { createContext, useState } from 'react'
import { PRODUCTS } from '../utils/constants.js'

export const AdminDataContext = createContext(null)

const sampleOrders = [
  { id: 'FIT-1048', customer: 'Mara Ellis', email: 'mara@example.com', date: '2026-09-28', total: 226, status: 'Processing', items: 2 },
  { id: 'FIT-1047', customer: 'Noah Bennett', email: 'noah@example.com', date: '2026-09-27', total: 78, status: 'Shipped', items: 1 },
  { id: 'FIT-1046', customer: 'Ava Laurent', email: 'ava@example.com', date: '2026-09-26', total: 148, status: 'Delivered', items: 1 },
]

function readStored(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

export function AdminDataProvider({ children }) {
  const [products, setProducts] = useState(() => readStored('fashionzintime-products', PRODUCTS))
  const [orders, setOrders] = useState(() => readStored('fashionzintime-orders', sampleOrders))

  function saveProducts(nextProducts) {
    localStorage.setItem('fashionzintime-products', JSON.stringify(nextProducts))
    setProducts(nextProducts)
  }

  function saveOrders(nextOrders) {
    localStorage.setItem('fashionzintime-orders', JSON.stringify(nextOrders))
    setOrders(nextOrders)
  }

  function saveProduct(product) {
    const exists = products.some((item) => item.id === product.id)
    saveProducts(exists ? products.map((item) => item.id === product.id ? product : item) : [{ ...product, id: `item-${Date.now()}` }, ...products])
  }

  function removeProduct(id) {
    saveProducts(products.filter((product) => product.id !== id))
  }

  function updateOrderStatus(id, status) {
    saveOrders(orders.map((order) => order.id === id ? { ...order, status } : order))
  }

  return <AdminDataContext.Provider value={{ products, orders, saveProduct, removeProduct, updateOrderStatus }}>{children}</AdminDataContext.Provider>
}