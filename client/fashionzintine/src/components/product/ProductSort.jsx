export default function ProductSort({ value, onChange }) {
  return <label>Sort by <select value={value} onChange={(event) => onChange(event.target.value)}><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="newest">Newest</option></select></label>
}