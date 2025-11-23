import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getPostById, updatePost } from '../services/postService';
import { useAuth } from '../contexts/AuthContext';
import PostForm from '../components/PostForm';
import './CreatePostPage.css';

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const data = await getPostById(id);
      
      // Check if user owns this post
      if (data.authorId !== user.id) {
        setError('You do not have permission to edit this post');
        setLoading(false);
        return;
      }
      
      setPost(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (postData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await updatePost(id, postData);
      
      // Redirect to the updated post
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.message || 'Failed to update post');
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="create-post-page">
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="create-post-page">
        <div className="error-message">{error}</div>
        <Link to="/posts" className="btn-back">Back to Posts</Link>
      </div>
    );
  }

  return (
    <div className="create-post-page">
      <div className="page-header">
        <Link to={`/posts/${id}`} className="btn-back">Back to Post</Link>
        <h1>Edit Post</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      {post && (
        <PostForm 
          onSubmit={handleSubmit} 
          initialData={post}
          isLoading={isLoading} 
        />
      )}
    </div>
  );
}

export default EditPostPage;