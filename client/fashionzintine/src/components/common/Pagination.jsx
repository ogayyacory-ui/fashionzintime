export default function Pagination({ page, pageCount, onChange }) {
  return <nav aria-label="Pagination"><button type="button" disabled={page <= 1} onClick={() => onChange(page - 1)}>Previous</button><span> Page {page} of {pageCount} </span><button type="button" disabled={page >= pageCount} onClick={() => onChange(page + 1)}>Next</button></nav>
}