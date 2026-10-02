import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.js'
import Button from '../common/Button.jsx'

export default function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try { await login(Object.fromEntries(new FormData(event.currentTarget))); navigate(location.state?.from?.pathname || '/') }
    catch (requestError) { setError(requestError.message) }
    finally { setLoading(false) }
  }

  return <form className="form-stack" onSubmit={handleSubmit}><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Password<input name="password" type="password" autoComplete="current-password" required /></label>{error && <p className="form-error" role="alert">{error}</p>}<Button loading={loading}>Sign in</Button></form>
}