import { Routes, Route } from 'react-router-dom'
import Header from './ui/components/Header'
import Footer from './ui/components/Footer'
import HomePage from './ui/pages/HomePage'
import ProductListPage from './ui/pages/ProductListPage'
import ProductDetailPage from './ui/pages/ProductDetailPage'
import CartPage from './ui/pages/CartPage'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App