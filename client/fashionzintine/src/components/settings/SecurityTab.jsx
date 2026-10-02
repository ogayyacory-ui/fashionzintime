import Button from '../common/Button.jsx'

export default function SecurityTab() {
  return <form className="form-stack"><label>Current password<input type="password" autoComplete="current-password" /></label><label>New password<input type="password" autoComplete="new-password" minLength="8" /></label><Button type="button" disabled>Update password</Button></form>
}