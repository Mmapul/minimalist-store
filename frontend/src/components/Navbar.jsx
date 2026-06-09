import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    navigate('/login')
  }

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      background: '#000',
      color: '#fff'
    }}>
      <Link to='/' style={{ color: '#fff', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
        Minimalist Store
      </Link>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to='/cart' style={{ color: '#fff', textDecoration: 'none' }}>Cart</Link>
        {userInfo ? (
          <>
            <span style={{ color: '#fff' }}>Hi, {userInfo.name}</span>
            <button onClick={handleLogout} style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid #fff',
              padding: '0.4rem 1rem',
              cursor: 'pointer',
              borderRadius: '4px'
            }}>Logout</button>
          </>
        ) : (
          <>
            <Link to='/login' style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
            <Link to='/register' style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar 
