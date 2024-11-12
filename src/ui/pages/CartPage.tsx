import { useCartStore } from '../../infrastructure/store/useCartStore'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const { items, removeItem, clearCart } = useCartStore()

  const totalPrice = items.reduce((total, item) => total + item.product.precio * item.quantity, 0)

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
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1
    }
  }

  return (
    <motion.div 
      className="container mx-auto py-8 "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 className="text-3xl font-bold mb-6" variants={itemVariants}>Tu Carrito</motion.h2>
      {items.length === 0 ? (
        <motion.p variants={itemVariants}>Tu carrito está vacío.</motion.p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Resumen del carrito</CardTitle>
          </CardHeader>
          <CardContent>
            {items.map((item) => (
              <motion.div key={item.product.id} className="flex items-center justify-between py-4 border-b" variants={itemVariants}>
                <div className="flex items-center space-x-4">
                  <img src={item.product.imagenes[0]?.imagen} alt={item.product.nombre} className="w-16 h-16 object-contain" />
                  <div>
                    <h3 className="font-semibold">{item.product.nombre}</h3>
                    <p>Cantidad: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{(item.product.precio * item.quantity).toFixed(2)} </p>
                  <Button variant="destructive" size="sm" onClick={() => removeItem(item.product.id)}>Eliminar</Button>
                </div>
              </motion.div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold">Total: {totalPrice.toFixed(2)} </h3>
            </div>
            <div>
              <Button variant="outline" onClick={clearCart} className="mr-2">Vaciar carrito</Button>
              <Button>
              <Link to="/checkout" className="amazon-button">
              
                Proceder al pago
              </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </motion.div>
  )
}

export default CartPage