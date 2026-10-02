import { Link } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar.jsx'
import OrdersTable from '../../components/admin/OrdersTable.jsx'
import useAdminData from '../../hooks/useAdminData.js'
import { formatCurrency } from '../../utils/formatters.js'

export default function AdminDashboardPage() {
  const { products, orders, updateOrderStatus } = useAdminData()
  const revenue = orders.filter((order) => order.status !== 'Cancelled').reduce((total, order) => total + order.total, 0)
  const lowStock = products.filter((product) => product.stock < 5).length
  return <div className="admin-layout"><AdminSidebar /><section className="admin-main"><header className="admin-page-heading"><div><p className="admin-eyebrow">Store management</p><h1 className="admin-title">Overview</h1></div></header><div className="admin-metrics"><article className="admin-metric"><span>Gross sales</span><strong>{formatCurrency(revenue)}</strong><small>Across {orders.length} orders</small></article><article className="admin-metric"><span>Orders</span><strong>{orders.length}</strong><small>{orders.filter((order) => order.status === 'Processing').length} need processing</small></article><article className="admin-metric"><span>Products</span><strong>{products.length}</strong><small>{lowStock} low-stock items</small></article></div><div className="admin-section-heading"><h2>Recent orders</h2><Link className="admin-text-button" to="/admin/orders">All orders</Link></div><OrdersTable orders={orders.slice(0, 5)} onStatusChange={updateOrderStatus} /></section></div>
}