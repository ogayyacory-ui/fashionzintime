import OrderHistory from '../components/settings/OrderHistory.jsx'
import ProfileTab from '../components/settings/ProfileTab.jsx'
import SecurityTab from '../components/settings/SecurityTab.jsx'

export default function SettingsPage() {
  return <><h1 className="page-title">Your account</h1><h2 className="section-heading">Profile</h2><ProfileTab /><h2 className="section-heading">Security</h2><SecurityTab /><h2 className="section-heading">Orders</h2><OrderHistory /></>
}