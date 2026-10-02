import { apiRequest } from './api.js'
import { PRODUCTS } from '../utils/constants.js'

export async function getProducts({ page = 1, limit = 12, category, sort } = {}) {
  try {
    const query = new URLSearchParams({ page, limit, ...(category ? { category } : {}), ...(sort ? { sort } : {}) })
    return await apiRequest(`/products?${query}`)
  } catch {
    return { items: PRODUCTS.filter((item) => !category || item.category === category).slice(0, limit), total: PRODUCTS.length, page }
  }
}