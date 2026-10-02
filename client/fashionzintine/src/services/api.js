import { API_BASE_URL } from '../utils/constants.js'

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('fashionzintime-token')
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  const payload = response.status === 204 ? null : await response.json()
  if (!response.ok) throw new Error(payload?.detail || payload?.message || 'Request failed')
  return payload
}