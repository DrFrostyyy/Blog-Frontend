import { useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import './App.css'

function App() {
  const { user, login, logout, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setMessage('Logging in...')
    
    const result = await login(email, password)
    
    if (result.success) {
      setMessage('Login successful!')
      setEmail('')
      setPassword('')
    } else {
      setMessage(`Error: ${result.message}`)
    }
  }

  const handleLogout = () => {
    logout()
    setMessage('Logged out successfully')
  }

  return (
    <div className="App">
      <h1>Blog Frontend - Auth Test</h1>
      
      {isAuthenticated ? (
        <div className="card">
          <h2>Welcome, {user.username}!</h2>
          <p>Email: {user.email}</p>
          <p>User ID: {user.id}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="card">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ display: 'block', margin: '10px 0', padding: '8px', width: '250px' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ display: 'block', margin: '10px 0', padding: '8px', width: '250px' }}
            />
            <button type="submit">Login</button>
          </form>
          {message && <p style={{ marginTop: '10px' }}>{message}</p>}
        </div>
      )}
      
      <p className="read-the-docs">
        Try logging in with an existing user from your backend!
      </p>
    </div>
  )
}

export default App