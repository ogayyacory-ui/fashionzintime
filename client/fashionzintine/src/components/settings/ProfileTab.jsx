import Button from '../common/Button.jsx'
import useAuth from '../../hooks/useAuth.js'

export default function ProfileTab() {
  const { user } = useAuth()
  return <form className="form-stack"><label>Name<input defaultValue={user?.full_name || ''} autoComplete="name" /></label><label>Email<input type="email" defaultValue={user?.email || ''} autoComplete="email" /></label><Button type="button" disabled>Save profile</Button></form>
}