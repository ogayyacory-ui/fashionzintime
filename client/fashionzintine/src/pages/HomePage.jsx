import { Link } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid.jsx'
import useAdminData from '../hooks/useAdminData.js'

export default function HomePage() {
  const { products } = useAdminData()
  const availableProducts = products.filter((product) => product.stock > 0)
  const featured = availableProducts.slice(0, 3)
  const categories = [...new Set(availableProducts.map((product) => product.category))]
  const heroProduct = availableProducts[0]

  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__copy">
          <p className="home-eyebrow">A wardrobe with a point of view</p>
          <h1 id="home-title">Good pieces.<br />Long stories.</h1>
          <p className="home-hero__description">Thoughtful layers and timeless shapes, chosen to be worn on repeat.</p>
          <Link className="button home-hero__button" to="/catalog">Explore the collection <span aria-hidden="true">→</span></Link>
          <p className="home-hero__note">Made for now. Kept for years.</p>
        </div>
        <Link className="home-hero__visual" to={heroProduct ? `/products/${heroProduct.id}` : '/catalog'} aria-label={heroProduct ? `Shop ${heroProduct.name}` : 'Shop the collection'}>
          <img
            className="home-hero__image"
            src={heroProduct?.image || '/images/garment-placeholder.svg'}
            alt={heroProduct?.name || 'A piece from the Fashion in Time collection'}
            onError={(event) => { event.currentTarget.src = '/images/garment-placeholder.svg' }}
          />
          <span className="home-hero__image-caption">The pieces you reach for, again.</span>
        </Link>
        <span className="home-hero__index" aria-hidden="true">01 / 03</span>
      </section>

      <section className="home-category-row" aria-label="Shop by category">
        <p>Find your<br />forever piece</p>
        <div className="home-category-links">
          {categories.map((category) => (
            <Link key={category} to="/catalog">{category}<span aria-hidden="true">↗</span></Link>
          ))}
          <Link to="/catalog">View everything<span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="home-featured" aria-labelledby="featured-title">
        <div className="home-section-heading">
          <div>
            <p className="home-eyebrow">The good ones</p>
            <h2 id="featured-title">Considered essentials</h2>
          </div>
          <Link className="home-text-link" to="/catalog">Shop all pieces <span aria-hidden="true">→</span></Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className="home-note" aria-label="Our approach">
        <span className="home-note__mark" aria-hidden="true">FIT</span>
        <p>Less, but lovely.<br /><em>Pieces with a life beyond a season.</em></p>
        <Link className="home-text-link" to="/catalog">Find your next favorite <span aria-hidden="true">→</span></Link>
      </section>
    </div>
  )
}