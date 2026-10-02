import { useState } from 'react'

export default function usePagination(totalItems, pageSize = 12) {
  const [page, setPage] = useState(1)
  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize))
  return { page, pageCount, setPage, startIndex: (page - 1) * pageSize, endIndex: page * pageSize }
}