const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre TechStore</h3>
            <p className="text-sm">Somos tu tienda de confianza para todos tus productos tecnológicos.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="text-sm">
              <li className="mb-2"><a href="/" className="hover:text-primary">Inicio</a></li>
              <li className="mb-2"><a href="/products" className="hover:text-primary">Productos</a></li>
              <li className="mb-2"><a href="/cart" className="hover:text-primary">Carrito</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <p className="text-sm">Email: info@techstore.com</p>
            <p className="text-sm">Teléfono: +34 123 456 789</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">&copy; 2024 TechStore. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer