import { useCartStore } from '../../infrastructure/store/useCartStore'

const CartPage = () => {
  const { items, removeItem, clearCart } = useCartStore()

  const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0)

  return (
    <div className="container">
      <h2>Tu Carrito</h2>
      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {items.map((item) => (
              <li key={item.product.id} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <img src={item.product.imageUrl} alt={item.product.name} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                  <div>
                    <h3>{item.product.name}</h3>
                    <p>Cantidad: {item.quantity}</p>
                    <p style={{ color: '#B12704', fontWeight: 'bold' }}>{(item.product.price * item.quantity).toFixed(2)} €</p>
                  </div>
                </div>
                <button onClick={() => removeItem(item.product.id)} className="btn" style={{ backgroundColor: '#FFA41C' }}>Eliminar</button>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <h3>Total: {totalPrice.toFixed(2)} €</h3>
            <button onClick={clearCart} className="btn" style={{ backgroundColor: '#FFA41C', marginRight: '10px' }}>Vaciar carrito</button>
            <button className="btn" style={{ backgroundColor: '#FFD814' }}>Proceder al pago</button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage