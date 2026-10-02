import { Link } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid.jsx'
import useAdminData from '../hooks/useAdminData.js'

export default function HomePage() {
  const { products } = useAdminData()
  const featured = products.filter((product) => product.stock > 0).slice(0, 3)
  const heroImage = featured[0]?.image || '/images/garment-placeholder.svg'
  return <><section className="hero"><div><p className="muted">A wardrobe with a point of view</p><h1>Good pieces. Long stories.</h1><p>Thoughtful layers and timeless shapes, chosen to be worn on repeat.</p><Link className="button" to="/catalog">Explore the collection</Link></div><img className="hero__image" src={heroImage} alt="A featured piece from the collection" onError={(event) => { event.currentTarget.src = '/images/garment-placeholder.svg' }} /></section><h2 className="section-heading">Considered essentials</h2><ProductGrid products={featured} /></>
}