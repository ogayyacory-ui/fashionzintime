export const formatCurrency = (amount) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format(amount)

export const formatDate = (date) => new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
}).format(new Date(date))