import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">
          Welcome to <span className="brand-frost">Frost</span><span className="brand-byte">Byte</span>
        </h1>
        <p className="hero-subtitle">
          A modern blog platform built for developers and tech enthusiasts
        </p>
        
        {isAuthenticated ? (
          <div className="welcome-card">
            <h2>Welcome back, {user.username}!</h2>
            <p>Ready to share your tech insights with the community?</p>
            <div className="cta-buttons">
              <Link to="/posts/create" className="btn-primary">
                Write a Post
              </Link>
              <Link to="/posts" className="btn-secondary">
                Browse Posts
              </Link>
            </div>
          </div>
        ) : (
          <div className="welcome-card">
            <h2>Join the FrostByte Community</h2>
            <p>Share your knowledge, learn from others, and connect with fellow developers</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
              <Link to="/posts" className="btn-secondary">
                Explore Posts
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="features-section">
        <h2>Why FrostByte?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💻</div>
            <h3>Developer-Focused</h3>
            <p>Share code snippets, tutorials, and technical insights with a community that gets it</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Modern Platform</h3>
            <p>Built with cutting-edge tech stack - React, Node.js, and modern best practices</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Community Driven</h3>
            <p>Engage with posts through comments, learn from others, and grow together</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage