import { formatCurrency, formatDate } from '../../utils/formatters.js'

const orderStatuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled']

export default function OrdersTable({ orders, onStatusChange }) {
  if (!orders.length) return <p className="admin-empty-state">No orders to show yet.</p>
  return <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td className="order-number">{order.id}</td><td><span>{order.customer}</span><small className="admin-subtext">{order.email}</small></td><td>{formatDate(order.date)}</td><td>{order.items}</td><td>{formatCurrency(order.total)}</td><td><select className="order-status" aria-label={`Status for order ${order.id}`} value={order.status} onChange={(event) => onStatusChange(order.id, event.target.value)}>{orderStatuses.map((status) => <option key={status}>{status}</option>)}</select></td></tr>)}</tbody></table></div>
}