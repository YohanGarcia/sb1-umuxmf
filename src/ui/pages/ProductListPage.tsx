import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { Product } from '../../domain/entities/Product'
import { GetAllProducts } from '../../domain/usecases/GetAllProducts'
import { ProductApi } from '../../infrastructure/api/ProductApi'
import { useCartStore } from '../../infrastructure/store/useCartStore'

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const location = useLocation()
  const addToCart = useCartStore(state => state.addItem)

  useEffect(() => {
    const fetchProducts = async () => {
      const productRepository = new ProductApi()
      const getAllProducts = new GetAllProducts(productRepository)
      const fetchedProducts = await getAllProducts.execute()
      
      const searchParams = new URLSearchParams(location.search)
      const searchQuery = searchParams.get('search')
      const categoryFilter = searchParams.get('category')
      
      let filteredProducts = fetchedProducts

      if (searchQuery) {
        filteredProducts = filteredProducts.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }

      if (categoryFilter) {
        filteredProducts = filteredProducts.filter(product => 
          product.category.toLowerCase() === categoryFilter.toLowerCase()
        )
      }

      setProducts(filteredProducts)
    }

    fetchProducts()
  }, [location.search])

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    alert('Producto añadido al carrito')
  }

  return (
    <div className="container">
      <h2>Nuestros Productos</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price.toFixed(2)} €</p>
            <div className="product-actions">
              <Link to={`/products/${product.id}`} className="btn">Ver detalles</Link>
              <button onClick={() => handleAddToCart(product)} className="btn btn-cart">
                <FaShoppingCart />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductListPage