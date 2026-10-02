import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return <section><p className="muted">404</p><h1 className="page-title">That page wandered off.</h1><Link className="button" to="/">Return home</Link></section>
}