import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import useCart from '../hooks/useCart.js'
import useAdminData from '../hooks/useAdminData.js'
import { SIZES } from '../utils/constants.js'
import { formatCurrency } from '../utils/formatters.js'

export default function ProductDetailPage() {
  const { productId } = useParams()
  const { products } = useAdminData()
  const product = products.find((item) => item.id === productId)
  const { addToCart } = useCart()
  const [size, setSize] = useState('M')
  const [added, setAdded] = useState(false)
  if (!product) return <p>We could not find that piece.</p>
  return <section className="catalog-layout"><img className="hero__image" src={product.image} alt={product.name} /><div><p className="muted">{product.category}</p><h1 className="page-title">{product.name}</h1><p>{product.description}</p><p>{formatCurrency(product.price)}</p><label>Size <select value={size} onChange={(event) => setSize(event.target.value)}>{SIZES.map((item) => <option key={item}>{item}</option>)}</select></label><p><Button onClick={() => { addToCart(product, size); setAdded(true) }}>{added ? 'Added to bag' : 'Add to bag'}</Button></p></div></section>
}