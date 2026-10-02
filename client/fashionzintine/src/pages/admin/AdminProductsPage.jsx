import { useState } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar.jsx'
import InventoryTable from '../../components/admin/InventoryTable.jsx'
import ProductFormModal from '../../components/admin/ProductFormModal.jsx'
import useAdminData from '../../hooks/useAdminData.js'

export default function AdminProductsPage() {
  const { products, saveProduct, removeProduct } = useAdminData()
  const [formOpen, setFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  function openForm(product = null) {
    setEditingProduct(product)
    setFormOpen(true)
  }

  function handleRemove(product) {
    if (window.confirm(`Remove ${product.name} from the catalog?`)) removeProduct(product.id)
  }

  return <div className="admin-layout"><AdminSidebar /><section className="admin-main"><header className="admin-page-heading"><div><p className="admin-eyebrow">Store management</p><h1 className="admin-title">Inventory</h1><p className="admin-description">{products.length} products in your catalog</p></div><button type="button" className="button" onClick={() => openForm()}>Add product</button></header><InventoryTable products={products} onEdit={openForm} onRemove={handleRemove} />{formOpen && <ProductFormModal key={editingProduct?.id || 'new-product'} product={editingProduct} onClose={() => setFormOpen(false)} onSave={(product) => { saveProduct(product); setFormOpen(false) }} />}</section></div>
}