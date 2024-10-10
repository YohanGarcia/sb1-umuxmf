import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import SearchBar from "./SearchBar";
import CategoryDropdown from "./CategoryDropdown";
import { useCartStore } from "../../infrastructure/store/useCartStore";
import { Button } from "../../components/ui/button";
import { useState } from "react";

const Header = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white py-5 fixed w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div id="branding" className="flex items-center">
            <h1 className="text-2xl font-bold">
              <Link to="/">TechStore</Link>
            </h1>
          </div>
          <div className="hidden md:block flex-grow mx-4">
            <SearchBar />
          </div>
          <Link
            to="/cart"
            className="flex items-center space-x-2 hover:text-primary  md:hidden"
          >
            <FaShoppingCart />
            <span>Carrito ({totalItems})</span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-6 items-center">
              <li>
                <CategoryDropdown />
              </li>
              <li>
                <Link to="/" className="hover:text-primary">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary">
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="flex items-center space-x-2 hover:text-primary"
                >
                  <FaShoppingCart />
                  <span>Carrito ({totalItems})</span>
                </Link>
              </li>
            </ul>
          </nav>
          <Button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars />
          </Button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <SearchBar />
            <nav className="mt-4">
              <ul className="flex flex-col space-y-2">
                <li>
                  <CategoryDropdown />
                </li>
                <li>
                  <Link to="/" className="hover:text-primary">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="hover:text-primary">
                    Productos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="flex items-center space-x-2 hover:text-primary"
                  >
                    <FaShoppingCart />
                    <span>Carrito ({totalItems})</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
