import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import useCartStore from '../store/cartStore'

function CheckoutPage() {
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { cartItems, getTotal, clearCart } = useCartStore()
  const navigate = useNavigate()

  const handlePlaceOrder = async () => {
    if (!address || !city || !postalCode || !country) {
      setError('Please fill in all shipping fields')
      return
    }
    try {
      setLoading(true)
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const { data } = await axios.post(
        '/orders',
        {
          orderItems: cartItems,
          shippingAddress: { address, city, postalCode, country },
          paymentMethod,
          totalPrice: getTotal(),
        },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      )
      clearCart()
      navigate(`/order/${data._id}`)
    } catch (error) {
      setError('Failed to place order. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem' }}>
      <h2>Checkout</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3>Shipping Address</h3>
      <div style={{ marginBottom: '1rem' }}>
        <label>Address</label><br />
        <input value={address} onChange={e => setAddress(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>City</label><br />
        <input value={city} onChange={e => setCity(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Postal Code</label><br />
        <input value={postalCode} onChange={e => setPostalCode(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Country</label><br />
        <input value={country} onChange={e => setCountry(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
      </div>
      <h3>Payment Method</h3>
      <div style={{ marginBottom: '1.5rem' }}>
        <label>
          <input type='radio' value='PayPal' checked={paymentMethod === 'PayPal'}
            onChange={e => setPaymentMethod(e.target.value)} /> PayPal
        </label>
      </div>
      <h3>Order Summary</h3>
      {cartItems.map(item => (
        <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>{item.name} x {item.qty}</span>
          <span>${(item.price * item.qty).toFixed(2)}</span>
        </div>
      ))}
      <hr />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', margin: '0.5rem 0 1.5rem' }}>
        <span>Total</span>
        <span>${getTotal()}</span>
      </div>
      <button onClick={handlePlaceOrder} disabled={loading} style={{
        width: '100%', padding: '0.75rem', background: '#000', color: '#fff',
        border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem'
      }}>
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  )
}

export default CheckoutPage 
