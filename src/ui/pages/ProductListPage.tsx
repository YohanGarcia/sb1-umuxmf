import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { Product } from '../../domain/entities/Product'
import { GetAllProducts } from '../../domain/usecases/GetAllProducts'
import { ProductApi } from '../../infrastructure/api/ProductApi'
import { useCartStore } from '../../infrastructure/store/useCartStore'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

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
    toast.success('Producto añadido al carrito')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <motion.div 
      className="container mx-auto py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 className="text-3xl font-bold mb-6" variants={itemVariants}>Nuestros Productos</motion.h2>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" variants={containerVariants}>
        {products.map((product) => (
          <motion.div key={product.id} variants={itemVariants}>
            <Card className="flex flex-col h-full">
              <CardHeader>
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4" />
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">{product.price.toFixed(2)} €</p>
              </CardContent>
              <CardFooter className="flex justify-between mt-auto">
                <Button variant="outline" asChild>
                  <Link to={`/products/${product.id}`}>Ver detalles</Link>
                </Button>
                <Button onClick={() => handleAddToCart(product)}>
                  <FaShoppingCart className="mr-2" />
                  Añadir
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default ProductListPage