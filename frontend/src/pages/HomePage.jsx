import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import useCartStore from '../store/cartStore'

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCartStore()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/products')
        setProducts(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Minimalist Store</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {products.map(product => (
            <div key={product._id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%' }} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>${product.price}</strong></p>
              <button onClick={() => addToCart(product)} style={{
                width: '100%',
                padding: '0.6rem',
                background: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '0.5rem'
              }}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage