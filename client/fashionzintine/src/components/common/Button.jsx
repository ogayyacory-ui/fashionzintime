export default function Button({ children, loading = false, variant = 'primary', ...props }) {
  return <button className={`button ${variant === 'secondary' ? 'button--secondary' : ''}`} disabled={loading || props.disabled} {...props}>{loading ? 'Please wait...' : children}</button>
}