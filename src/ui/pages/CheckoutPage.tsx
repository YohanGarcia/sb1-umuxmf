import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../infrastructure/store/useCartStore'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'

const CheckoutPage = () => {
  const { items, clearCart } = useCartStore()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  const totalPrice = items.reduce((total, item) => total + item.product.precio * item.quantity, 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para procesar el pago
    alert('Pago procesado con éxito')
    clearCart()
    navigate('/confirmation')
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Finalizar Compra</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className='col-span-2'>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2">Producto</th>
                    <th className="text-center pb-2">Cantidad</th>
                    <th className="text-right pb-2">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.product.id} className="border-b">
                      <td className="py-2">{item.product.nombre}</td>
                      <td className="text-center py-2">{item.quantity}</td>
                      <td className="text-right py-2">{(item.product.precio * item.quantity).toFixed(2)} </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2} className="text-right font-bold pt-4">Total:</td>
                    <td className="text-right font-bold pt-4">{totalPrice.toFixed(2)} €</td>
                  </tr>
                </tfoot>
              </table>
            </CardContent>
          </Card>
          <Card className=''>
            <CardHeader>
              <CardTitle>Detalles de Envío</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="amazon-input" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="amazon-input" />
                  </div>
                  <div>
                    <Label htmlFor="address">Dirección de Envío</Label>
                    <Input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} required className="amazon-input" />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        <Card className='col-span-2 md:col-span-1'>
          <CardHeader>
            <CardTitle>Detalles de Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                <Input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required className="amazon-input" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Fecha de Expiración</Label>
                  <Input type="text" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} required placeholder="MM/YY" className="amazon-input" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleInputChange} required className="amazon-input" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <p className="text-2xl font-bold mb-4">Total a Pagar: {totalPrice.toFixed(2)} €</p>
              <Button onClick={handleSubmit} className="w-full amazon-button">Realizar Pago</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default CheckoutPage