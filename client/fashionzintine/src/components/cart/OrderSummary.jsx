import { formatCurrency } from '../../utils/formatters.js'

export default function OrderSummary({ subtotal }) {
  const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 8
  const tax = subtotal * 0.08
  return <section className="order-summary"><h2>Order summary</h2><p>Subtotal <span>{formatCurrency(subtotal)}</span></p><p>Shipping <span>{shipping ? formatCurrency(shipping) : 'Free'}</span></p><p>Estimated tax <span>{formatCurrency(tax)}</span></p><strong>Total <span>{formatCurrency(subtotal + shipping + tax)}</span></strong></section>
}