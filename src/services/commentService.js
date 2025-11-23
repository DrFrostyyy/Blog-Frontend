import api from './api';

// GET ALL COMMENTS FOR A POST
export const getCommentsByPostId = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// CREATE NEW COMMENT
export const createComment = async (postId, commentData) => {
  try {
    const response = await api.post(`/posts/${postId}/comments`, commentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// GET ALL COMMENTS
export const getAllComments = async () => {
  try {
    const response = await api.get('/comments');
    return response.data;
  } catch (error) {
    throw error;
  }
};