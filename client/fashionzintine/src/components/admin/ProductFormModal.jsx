import { useState } from 'react'
import { CATEGORIES } from '../../utils/constants.js'
import Button from '../common/Button.jsx'

export default function ProductFormModal({ product, onSave, onClose }) {
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const values = Object.fromEntries(new FormData(event.currentTarget))
    const price = Number(values.price)
    const stock = Number(values.stock)
    if (!Number.isFinite(price) || price <= 0 || !Number.isInteger(stock) || stock < 0) {
      setError('Enter a positive price and a whole-number stock count.')
      return
    }
    onSave({ ...product, ...values, price, stock, id: product?.id })
  }

  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="modal admin-product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title"><div className="admin-modal-heading"><h2 id="product-modal-title">{product ? 'Edit product' : 'Add product'}</h2><button type="button" className="admin-icon-button" aria-label="Close dialog" onClick={onClose}>×</button></div><form className="form-stack" onSubmit={handleSubmit}><label>Product name<input name="name" defaultValue={product?.name || ''} required /></label><label>Category<select name="category" defaultValue={product?.category || CATEGORIES[0]}>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></label><label>Price (USD)<input name="price" type="number" min="0.01" step="0.01" defaultValue={product?.price ?? ''} required /></label><label>Stock quantity<input name="stock" type="number" min="0" step="1" defaultValue={product?.stock ?? 0} required /></label><label>Image URL<input name="image" type="url" defaultValue={product?.image || ''} placeholder="https://" /></label><label>Description<textarea name="description" rows="3" defaultValue={product?.description || ''} /></label>{error && <p className="form-error" role="alert">{error}</p>}<div className="admin-form-actions"><Button type="button" variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit">Save product</Button></div></form></section></div>
}