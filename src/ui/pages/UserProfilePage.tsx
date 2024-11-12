import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { OrderApi } from '../../infrastructure/api/OrderApi'
import { Order } from '../../domain/entities/Order'

const UserProfilePage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const orderApi = new OrderApi()

  useEffect(() => {
    const fetchOrders = async () => {
      const userOrders = await orderApi.getUserOrders()
      setOrders(userOrders)
    }
    fetchOrders()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Mi Perfil</h2>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Mis Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID del Pedido</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>{order.total.toFixed(2)} €</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserProfilePage