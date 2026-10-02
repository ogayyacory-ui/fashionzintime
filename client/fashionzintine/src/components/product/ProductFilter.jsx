import { CATEGORIES } from '../../utils/constants.js'

export default function ProductFilter({ category, onChange }) {
  return <div className="filter-group"><label htmlFor="category-filter">Category</label><select id="category-filter" value={category} onChange={(event) => onChange(event.target.value)}><option value="">All pieces</option>{CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select></div>
}