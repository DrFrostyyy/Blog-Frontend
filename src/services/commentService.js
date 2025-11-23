import api from './api';

// Get all comments for a specific post
export const getCommentsByPostId = async (postId) => {
  try {
    const response = await api.get(`/comments/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new comment on a post
export const createComment = async (postId, commentData) => {
  try {
    const response = await api.post(`/comments/posts/${postId}/comments`, commentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all comments (optional - for admin/overview purposes)
export const getAllComments = async () => {
  try {
    const response = await api.get('/comments');
    return response.data;
  } catch (error) {
    throw error;
  }
};