import { Link } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm.jsx'

export default function LoginPage() {
  return <><h1 className="page-title">Welcome back</h1><LoginForm /><p>New here? <Link to="/register">Create an account</Link></p></>
}