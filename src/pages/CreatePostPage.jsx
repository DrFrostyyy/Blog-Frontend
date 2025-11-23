import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPost } from '../services/postService';
import PostForm from '../components/PostForm';
import './CreatePostPage.css';

function CreatePostPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (postData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const newPost = await createPost(postData);
      
      // Redirect to the new post
      navigate(`/posts/${newPost.id}`);
    } catch (err) {
      setError(err.message || 'Failed to create post');
      setIsLoading(false);
    }
  };

  return (
    <div className="create-post-page">
      <div className="page-header">
        <Link to="/posts" className="btn-back">Back to Posts</Link>
        <h1>Create New Post</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <PostForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}

export default CreatePostPage;