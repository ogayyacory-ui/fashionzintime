import { Link } from 'react-router-dom'

export default function Footer() {
  return <footer className="site-footer"><div className="site-footer__inner"><span className="brand">Fashion in Time</span><nav className="site-footer__links" aria-label="Footer"><Link to="/help">Help & contact</Link><Link to="/catalog">Shop all</Link><Link to="/settings">Account</Link></nav></div></footer>
}