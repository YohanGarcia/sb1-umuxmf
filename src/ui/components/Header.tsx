import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import SearchBar from './SearchBar'
import CategoryDropdown from './CategoryDropdown'
import { useCartStore } from '../../infrastructure/store/useCartStore'

const Header = () => {
  const totalItems = useCartStore(state => state.getTotalItems())

  return (
    <header>
      <div className="container">
        <div id="branding">
          <h1><Link to="/">TechStore</Link></h1>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/products">Productos</Link></li>
            <li>
              <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaShoppingCart />
                <span>Carrito ({totalItems})</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container">
        <SearchBar />
        <CategoryDropdown />
      </div>
    </header>
  )
}

export default Header