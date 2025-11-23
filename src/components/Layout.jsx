import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Layout.css'

function Layout({ children }) {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/">
            <span className="brand-frost">Frost</span>
            <span className="brand-byte">Byte</span>
          </Link>
        </div>
        
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/my-posts">My Posts</Link>
              <Link to={`/users/${user.id}`} className="nav-profile">
                Profile
              </Link>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <p>FrostByte - A blog platform for developers and tech enthusiasts</p>
        <p className="footer-tagline">Built by developers, for developers</p>
      </footer>
    </div>
  )
}

export default Layout