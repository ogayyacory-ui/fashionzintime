import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { AdminDataProvider } from './context/AdminDataContext.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import Footer from './components/common/Footer.jsx'
import Navbar from './components/common/Navbar.jsx'
import CartPage from './pages/CartPage.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import HelpPage from './pages/HelpPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
import AdminOrdersPage from './pages/admin/AdminOrdersPage.jsx'
import AdminProductsPage from './pages/admin/AdminProductsPage.jsx'
import './storefront.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AdminDataProvider>
            <div className="app-shell">
              <Navbar />
              <main className="page-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/catalog" element={<CatalogPage />} />
                  <Route path="/products/:productId" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/help" element={<HelpPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Route>
                  <Route element={<ProtectedRoute requiredRole="admin" />}>
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/admin/products" element={<AdminProductsPage />} />
                    <Route path="/admin/orders" element={<AdminOrdersPage />} />
                  </Route>
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </AdminDataProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
