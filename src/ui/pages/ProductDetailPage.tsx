import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Product } from '../../domain/entities/Product'
import { ProductApi } from '../../infrastructure/api/ProductApi'
import { useCartStore } from '../../infrastructure/store/useCartStore'

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const navigate = useNavigate()
  const addToCart = useCartStore(state => state.addItem)

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const productRepository = new ProductApi()
        const fetchedProduct = await productRepository.getById(id)
        setProduct(fetchedProduct)
      }
    }

    fetchProduct()
  }, [id])

  if (!product) {
    return <div className="container">Cargando...</div>
  }

  const handleAddToCart = () => {
    addToCart(product)
    alert('Producto añadido al carrito')
  }

  return (
    <div className="container">
      <div className="product-detail" style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '400px', height: 'auto' }} />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="product-price" style={{ color: '#B12704', fontWeight: 'bold', fontSize: '18px' }}>{product.price.toFixed(2)} €</p>
          <p>Categoría: {product.category}</p>
          <button onClick={handleAddToCart} className="btn" style={{ fontSize: '16px', padding: '10px 20px' }}>Añadir al carrito</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage