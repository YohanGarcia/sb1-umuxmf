import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { FaSearch } from 'react-icons/fa'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/products?search=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full md:w-2/4 items-center space-x-2">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos..."
        className="flex-grow"
      />
      <Button type="submit" size="icon">
        <FaSearch className='w-4 h-4' />
      </Button>
    </form>
  )
}

export default SearchBar