import { useState } from 'react'
import ProductFilter from '../components/product/ProductFilter.jsx'
import ProductGrid from '../components/product/ProductGrid.jsx'
import ProductSort from '../components/product/ProductSort.jsx'
import useAdminData from '../hooks/useAdminData.js'

export default function CatalogPage() {
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('featured')
  const { products: inventory } = useAdminData()
  const products = inventory.filter((item) => item.stock > 0 && (!category || item.category === category)).sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : 0)
  return <><h1 className="page-title">The collection</h1><div className="catalog-layout"><aside><ProductFilter category={category} onChange={setCategory} /></aside><section className="catalog-toolbar"><ProductSort value={sort} onChange={setSort} /><ProductGrid products={products} /></section></div></>
}