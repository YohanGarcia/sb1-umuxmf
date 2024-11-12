import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Product } from '../../domain/entities/Product'
import { ProductApi } from '../../infrastructure/api/ProductApi'
import { useCartStore } from '../../infrastructure/store/useCartStore'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

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
    return <div className="container mx-auto py-8">Cargando...</div>
  }

  const handleAddToCart = () => {
    addToCart(product)
    toast.success('Producto añadido al carrito')

  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <motion.div 
      className="container mx-auto py-8 "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className='mt-20'>
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="text-3xl font-bold">{product.nombre}</CardTitle>
            <CardDescription>{product.categoria.nombre}</CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <motion.img 
            src={product.imagenes[0]?.imagen}
            alt={product.nombre} 
            className="w-full h-auto object-cover"
            variants={itemVariants}
          />
          <motion.div variants={itemVariants}>
            <p className="text-lg mb-4">{product.description}</p>
            <p className="text-3xl font-bold text-primary mb-4">{product.precio}</p>
            <Button onClick={handleAddToCart} size="lg">Añadir al carrito</Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ProductDetailPage