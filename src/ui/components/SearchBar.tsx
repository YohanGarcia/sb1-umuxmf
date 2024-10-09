import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/products?search=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos..."
      />
      <button type="submit">Buscar</button>
    </form>
  )
}

export default SearchBar