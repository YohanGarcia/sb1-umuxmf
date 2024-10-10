import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductApi } from '../../infrastructure/api/ProductApi'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"

const CategoryDropdown = () => {
  const [categories, setCategories] = useState<string[]>(['Todas las categorías'])
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas las categorías')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const productApi = new ProductApi()
        const products = await productApi.getAll()
        const uniqueCategories = Array.from(new Set(products.map(product => product.category).filter(Boolean)))
        setCategories(['Todas las categorías', ...uniqueCategories])
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    if (value && value !== 'Todas las categorías') {
      navigate(`/products?category=${encodeURIComponent(value)}`)
    } else {
      navigate('/products')
    }
  }

  return (
    <Select onValueChange={handleCategoryChange} value={selectedCategory}>
      <SelectTrigger className="w-full md:w-[180px] bg-primary text-white">
        <SelectValue placeholder="Categorías" />
      </SelectTrigger>
      <SelectContent>
        {categories.map(category => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default CategoryDropdown