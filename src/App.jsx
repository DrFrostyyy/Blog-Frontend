import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...')
  const [error, setError] = useState(null)

  useEffect(() => {
    // Test connection to your backend
    fetch('http://localhost:3000/')
      .then(res => res.json())
      .then(data => {
        setMessage(`Connected to backend! ${data.message}`)
        console.log('Backend data:', data)
      })
      .catch(err => {
        setError('Could not connect to backend. Is it running?')
        console.error(err)
      })
  }, [])

  return (
    <div className="App">
      <h1>Blog Frontend</h1>
      <div className="card">
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <p>{message}</p>
        )}
      </div>
      <p className="read-the-docs">
        Backend is running on port 3000
      </p>
    </div>
  )
}

export default App