import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/products?search=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos..."
        className="flex-grow"
      />
      <Button type="submit">Buscar</Button>
    </form>
  )
}

export default SearchBar