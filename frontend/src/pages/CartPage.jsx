import { useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'

function CartPage() {
  const { cartItems, removeFromCart, getTotal } = useCartStore()
  const navigate = useNavigate()

  const handleCheckout = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (!userInfo) {
      navigate('/login')
    } else {
      navigate('/checkout')
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <a href='/'>Go shopping!</a></p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item._id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              borderBottom: '1px solid #ddd',
              marginBottom: '0.5rem'
            }}>
              <div>
                <h4 style={{ margin: 0 }}>{item.name}</h4>
                <p style={{ margin: '0.25rem 0', color: '#888' }}>Qty: {item.qty}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span>${(item.price * item.qty).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item._id)} style={{
                  background: 'red',
                  color: '#fff',
                  border: 'none',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>Remove</button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
            <h3>Total: ${getTotal()}</h3>
            <button onClick={handleCheckout} style={{
              background: '#000',
              color: '#fff',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage 
