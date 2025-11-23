import { useAuth } from '../contexts/AuthContext'
import './HomePage.css'

function HomePage() {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="home-page">
      <h1>Welcome to My Blog!</h1>
      
      {isAuthenticated ? (
        <div className="welcome-card">
          <h2>Hello, {user.username}! </h2>
          <p>You're logged in and ready to start blogging!</p>
          <p className="user-info">
            <strong>Email:</strong> {user.email}<br />
            <strong>User ID:</strong> {user.id}
          </p>
        </div>
      ) : (
        <div className="welcome-card">
          <h2>Get Started</h2>
          <p>Login or register to start creating and sharing your blog posts!</p>
        </div>
      )}
    </div>
  )
}

export default HomePage