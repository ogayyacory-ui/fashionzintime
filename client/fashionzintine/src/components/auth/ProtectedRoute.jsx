import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.js'

export default function ProtectedRoute({ requiredRole }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" replace />
  return <Outlet />
}