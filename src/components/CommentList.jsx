import { Link } from 'react-router-dom';
import './CommentList.css';

function CommentList({ comments, loading }) {
  if (loading) {
    return <div className="comments-loading">Loading comments...</div>;
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="no-comments">
        <p>No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <div key={comment.id} className="comment-item">
          <div className="comment-header">
            <Link to={`/users/${comment.authorId}`} className="comment-author">
              {comment.authorUsername || `User ${comment.authorId}`}
            </Link>
            <span className="comment-date">
              {new Date(comment.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          <div className="comment-text">
            {comment.text}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;