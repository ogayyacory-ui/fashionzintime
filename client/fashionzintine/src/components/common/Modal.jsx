export default function Modal({ open, title, onClose, children }) {
  if (!open) return null
  return <div className="modal-backdrop" role="presentation" onClick={onClose}><section className="modal" role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.stopPropagation()}><button type="button" aria-label="Close" onClick={onClose}>Close</button><h2>{title}</h2>{children}</section></div>
}