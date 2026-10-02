import { Link } from 'react-router-dom'
import CartItem from '../components/cart/CartItem.jsx'
import OrderSummary from '../components/cart/OrderSummary.jsx'
import useCart from '../hooks/useCart.js'

export default function CartPage() {
  const { cartItems, total, updateQuantity } = useCart()
  return <><h1 className="page-title">Your bag</h1>{cartItems.length ? <div className="catalog-layout"><section>{cartItems.map((item) => <CartItem key={`${item.id}-${item.size}`} item={item} onQuantityChange={(quantity) => updateQuantity(item.id, item.size, quantity)} />)}</section><aside><OrderSummary subtotal={total} /><Link className="button" to="/checkout">Continue to checkout</Link></aside></div> : <p className="muted">Your bag is empty. <Link to="/catalog">Find a piece to love.</Link></p>}</>
}