import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { ProductApi } from '../../infrastructure/api/ProductApi'

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalCategories, setTotalCategories] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const productApi = new ProductApi()
      const products = await productApi.getAll()
      setTotalProducts(products.length)
      const categories = new Set(products.map(p => p.category))
      setTotalCategories(categories.size)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total de Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalProducts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total de Categorías</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalCategories}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard