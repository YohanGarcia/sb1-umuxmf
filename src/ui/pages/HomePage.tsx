import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="container">
      <h2>Bienvenido a TechStore</h2>
      <p>Descubre los mejores productos tecnológicos al mejor precio.</p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/products" className="btn">Ver todos los productos</Link>
      </div>
    </div>
  )
}

export default HomePage