import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../services/postService';
import { useAuth } from '../contexts/AuthContext';
import './PostsPage.css';

function MyPostsPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyPosts();
  }, [user]);

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      const allPosts = await getAllPosts();
      // Filter to only show current user's posts
      const myPosts = allPosts.filter(post => post.authorId === user.id);
      setPosts(myPosts);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="posts-page">
        <div className="loading">Loading your posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="posts-page">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="posts-page">
      <div className="posts-header">
        <h1>My Posts</h1>
        <Link to="/posts/create" className="btn-create">
          Create Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="no-posts">
          <p>You haven't created any posts yet.</p>
          <Link to="/posts/create" className="btn-primary">
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-card-wrapper">
              <Link to={`/posts/${post.id}`} className="post-card">
                <h2>{post.title}</h2>
                <p className="post-excerpt">
                  {post.content.substring(0, 150)}
                  {post.content.length > 150 ? '...' : ''}
                </p>
                <div className="post-meta">
                  <span className="post-author">{post.authorUsername}</span>
                  <span className="post-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </Link>
              <div className="post-card-actions">
                <Link to={`/posts/${post.id}/edit`} className="btn-edit-small">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPostsPage;