import { apiRequest } from './api.js'

export const createPaymentIntent = (order) => apiRequest('/payments/intent', { method: 'POST', body: JSON.stringify(order) })
export const verifyPayment = (paymentId) => apiRequest('/payments/verify', { method: 'POST', body: JSON.stringify({ paymentId }) })