import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './CommentForm.css';

function CommentForm({ onSubmit, isLoading }) {
  const { isAuthenticated } = useAuth();
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    if (text.length < 3) {
      setError('Comment must be at least 3 characters');
      return;
    }

    setError('');
    onSubmit(text.trim());
    setText('');
  };

  if (!isAuthenticated) {
    return (
      <div className="comment-form-login">
        <p>Please <Link to="/login">login</Link> to leave a comment</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="form-group">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your comment here..."
          rows="4"
          disabled={isLoading}
          className={error ? 'error' : ''}
        />
        {error && <span className="error-text">{error}</span>}
      </div>
      <button type="submit" className="btn-submit" disabled={isLoading}>
        {isLoading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}

export default CommentForm;