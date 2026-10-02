import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/formatters.js'

export default function ProductCard({ product }) {
  return <Link className="product-card" to={`/products/${product.id}`}><img src={product.image} alt={product.name} loading="lazy" onError={(event) => { event.currentTarget.src = '/images/garment-placeholder.svg' }} /><h3>{product.name}</h3><p>{formatCurrency(product.price)}</p></Link>
}