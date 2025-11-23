import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPostById, deletePost } from "../services/postService";
import { useAuth } from "../contexts/AuthContext";
import "./PostDetailPage.css";

function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const data = await getPostById(id);
      setPost(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      setDeleting(true);
      await deletePost(id);
      navigate("/posts");
    } catch (err) {
      alert(err.message || "Failed to delete post");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="post-detail-page">
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-detail-page">
        <div className="error-message">{error}</div>
        <Link to="/posts" className="btn-back">
          ← Back to Posts
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-detail-page">
        <div className="error-message">Post not found</div>
        <Link to="/posts" className="btn-back">
          ← Back to Posts
        </Link>
      </div>
    );
  }

  const isAuthor = user && user.id === post.authorId;

  return (
    <div className="post-detail-page">
      <Link to="/posts" className="btn-back">
        ← Back to Posts
      </Link>

      <article className="post-detail">
        <header className="post-header">
          <h1>{post.title}</h1>
          <div className="post-info">
            <Link to={`/users/${post.authorId}`} className="post-author-link">
              {post.authorUsername}
            </Link>
            <span className="post-date">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </header>

        <div className="post-content">
          {post.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {isAuthor && (
          <div className="post-actions">
            <Link to={`/posts/${post.id}/edit`} className="btn-edit">
              Edit Post
            </Link>
            <button
              onClick={handleDelete}
              className="btn-delete"
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete Post"}
            </button>
          </div>
        )}
      </article>

      {/* Comments section will go here later */}
      <div className="comments-placeholder">
        <p>Comments coming soon...</p>
      </div>
    </div>
  );
}

export default PostDetailPage;
