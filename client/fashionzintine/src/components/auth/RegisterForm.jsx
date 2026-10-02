import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../services/authService.js'
import Button from '../common/Button.jsx'

export default function RegisterForm() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const values = Object.fromEntries(new FormData(event.currentTarget))
    try { await register(values); navigate('/login') }
    catch (requestError) { setError(requestError.message) }
    finally { setLoading(false) }
  }

  return <form className="form-stack" onSubmit={handleSubmit}><label>Name<input name="full_name" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Password<input name="password" type="password" autoComplete="new-password" minLength="8" required /></label>{error && <p className="form-error" role="alert">{error}</p>}<Button loading={loading}>Create account</Button><p>Already registered? <Link to="/login">Sign in</Link></p></form>
}