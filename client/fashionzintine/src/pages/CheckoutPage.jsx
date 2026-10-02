import OrderSummary from '../components/cart/OrderSummary.jsx'
import PaymentForm from '../components/cart/PaymentForm.jsx'
import useCart from '../hooks/useCart.js'

export default function CheckoutPage() {
  const { total } = useCart()
  return <><h1 className="page-title">Checkout</h1><div className="catalog-layout"><PaymentForm /><OrderSummary subtotal={total} /></div></>
}