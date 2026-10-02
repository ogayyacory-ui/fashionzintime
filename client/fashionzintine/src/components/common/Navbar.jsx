import { Link } from 'react-router-dom'
import iconSprite from '../../assets/vectors/icons.svg'
import useAuth from '../../hooks/useAuth.js'
import useCart from '../../hooks/useCart.js'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cartItems } = useCart()
  const count = cartItems.reduce((total, item) => total + item.quantity, 0)
  return <header className="site-header"><div className="site-header__inner"><Link className="brand" to="/">Fashion in Time</Link><nav className="primary-nav" aria-label="Main navigation"><Link to="/catalog">Shop</Link><Link to="/help">Help</Link>{user?.role === 'admin' && <Link to="/admin">Admin</Link>}<Link to={user ? '/settings' : '/login'}>{user ? 'Account' : 'Sign in'}</Link><Link className="bag-link" to="/cart" aria-label={`Cart, ${count} items`}><svg aria-hidden="true"><use href={`${iconSprite}#bag`} /></svg><span>Bag ({count})</span></Link>{user && <button type="button" onClick={logout}>Sign out</button>}</nav></div></header>
}