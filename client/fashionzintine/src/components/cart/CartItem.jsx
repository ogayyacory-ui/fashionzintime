import { formatCurrency } from '../../utils/formatters.js'

export default function CartItem({ item, onQuantityChange }) {
  return <article className="cart-item"><img src={item.image} alt={item.name} width="96" /><div><h3>{item.name}</h3><p>Size {item.size} · {formatCurrency(item.price)}</p><label>Quantity <input type="number" min="0" value={item.quantity} onChange={(event) => onQuantityChange(Number(event.target.value))} /></label></div></article>
}