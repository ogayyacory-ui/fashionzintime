import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products }) {
  if (!products.length) return <p className="muted">No pieces match those filters.</p>
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
}