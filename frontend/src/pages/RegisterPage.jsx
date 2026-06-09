import { useState } from 'react'
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/auth/register', { name, email, password })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate('/')
    } catch (error) {
      setError('Registration failed. Try again.')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name</label><br />
          <input type='text' value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label><br />
          <input type='email' value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password</label><br />
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
        </div>
        <button onClick={handleSubmit} style={{ width: '100%', padding: '0.75rem', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Register
        </button>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Already have an account? <a href='/login'>Login</a>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage 
