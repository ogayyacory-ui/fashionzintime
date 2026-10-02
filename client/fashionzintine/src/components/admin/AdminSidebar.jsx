import { NavLink } from 'react-router-dom'

const navigation = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/products', label: 'Inventory' },
  { to: '/admin/orders', label: 'Orders' },
]

export default function AdminSidebar() {
  return <nav className="admin-sidebar" aria-label="Admin navigation">{navigation.map(({ to, label, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => isActive ? 'admin-sidebar__link is-active' : 'admin-sidebar__link'}>{label}</NavLink>)}</nav>
}