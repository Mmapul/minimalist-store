import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../utils/axios'

function OrderPage() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const { data } = await axios.get(`/orders/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        setOrder(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id])

  if (loading) return <p style={{ padding: '2rem' }}>Loading order...</p>
  if (!order) return <p style={{ padding: '2rem' }}>Order not found.</p>

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem' }}>
      <h2>Order Confirmed!</h2>
      <p style={{ color: '#888' }}>Order ID: {order._id}</p>
      <h3>Shipping To</h3>
      <p>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
      <h3>Items</h3>
      {order.orderItems.map((item, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>{item.name} x {item.qty}</span>
          <span>${(item.price * item.qty).toFixed(2)}</span>
        </div>
      ))}
      <hr />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', margin: '0.5rem 0' }}>
        <span>Total</span>
        <span>${order.totalPrice}</span>
      </div>
      <p style={{ marginTop: '1rem', color: order.isPaid ? 'green' : 'orange' }}>
        {order.isPaid ? '✅ Paid' : '⏳ Payment Pending'}
      </p>
    </div>
  )
}

export default OrderPage 
