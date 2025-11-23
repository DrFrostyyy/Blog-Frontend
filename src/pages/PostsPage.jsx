import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../services/postService';
import './PostsPage.css';

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getAllPosts();
      setPosts(data);
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
        <div className="loading">Loading posts...</div>
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
        <h1>All Posts</h1>
        <Link to="/posts/create" className="btn-create">
          + Create Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="no-posts">
          <p>No posts yet. Be the first to create one!</p>
          <Link to="/posts/create" className="btn-primary">
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <Link to={`/posts/${post.id}`} key={post.id} className="post-card">
              <h2>{post.title}</h2>
              <p className="post-excerpt">
                {post.content.substring(0, 150)}
                {post.content.length > 150 ? '...' : ''}
              </p>
              <div className="post-meta">
                <span className="post-author"> {post.authorUsername}</span>
                <span className="post-date">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostsPage;