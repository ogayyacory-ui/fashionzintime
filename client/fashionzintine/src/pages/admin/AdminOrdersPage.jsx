import AdminSidebar from '../../components/admin/AdminSidebar.jsx'
import OrdersTable from '../../components/admin/OrdersTable.jsx'
import useAdminData from '../../hooks/useAdminData.js'

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useAdminData()
  return <div className="admin-layout"><AdminSidebar /><section className="admin-main"><header className="admin-page-heading"><div><p className="admin-eyebrow">Store management</p><h1 className="admin-title">Orders</h1><p className="admin-description">Review orders and update fulfillment status.</p></div></header><OrdersTable orders={orders} onStatusChange={updateOrderStatus} /></section></div>
}