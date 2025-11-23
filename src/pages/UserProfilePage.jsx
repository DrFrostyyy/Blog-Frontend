import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserById, getUserPosts } from '../services/userService';
import { useAuth } from '../contexts/AuthContext';
import './UserProfilePage.css';

function UserProfilePage() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      
      // Fetch user info and their posts in parallel
      const [userData, userPosts] = await Promise.all([
        getUserById(id),
        getUserPosts(id)
      ]);
      
      setUser(userData);
      setPosts(userPosts);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="user-profile-page">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-profile-page">
        <div className="error-message">{error}</div>
        <Link to="/posts" className="btn-back">Back to Posts</Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-profile-page">
        <div className="error-message">User not found</div>
        <Link to="/posts" className="btn-back">Back to Posts</Link>
      </div>
    );
  }

  const isOwnProfile = currentUser && currentUser.id === user.id;

  return (
    <div className="user-profile-page">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="profile-details">
            <h1>{user.username}</h1>
            <p className="profile-email">{user.email}</p>
            <p className="profile-joined">
              Member since {new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
              })}
            </p>
          </div>
        </div>

        {isOwnProfile && (
          <div className="profile-actions">
            <Link to="/my-posts" className="btn-primary">
              My Posts
            </Link>
          </div>
        )}
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-number">{posts.length}</div>
          <div className="stat-label">Posts</div>
        </div>
      </div>

      <div className="profile-posts">
        <h2>{isOwnProfile ? 'Your Posts' : `${user.username}'s Posts`}</h2>
        
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>{isOwnProfile ? "You haven't created any posts yet." : "This user hasn't created any posts yet."}</p>
            {isOwnProfile && (
              <Link to="/posts/create" className="btn-primary">
                Create Your First Post
              </Link>
            )}
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <Link to={`/posts/${post.id}`} key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p className="post-excerpt">
                  {post.content.substring(0, 120)}
                  {post.content.length > 120 ? '...' : ''}
                </p>
                <div className="post-meta">
                  <span className="post-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfilePage;