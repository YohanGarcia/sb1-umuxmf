import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductApi } from '../../infrastructure/api/ProductApi'

const CategoryDropdown = () => {
  const [categories, setCategories] = useState<string[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      const productApi = new ProductApi()
      const products = await productApi.getAll()
      const uniqueCategories = Array.from(new Set(products.map(product => product.category)))
      setCategories(uniqueCategories)
    }

    fetchCategories()
  }, [])

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value
    if (selectedCategory) {
      navigate(`/products?category=${encodeURIComponent(selectedCategory)}`)
    } else {
      navigate('/products')
    }
  }

  return (
    <select onChange={handleCategoryChange} className="category-dropdown">
      <option value="">Todas las categorías</option>
      {categories.map(category => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
  )
}

export default CategoryDropdown