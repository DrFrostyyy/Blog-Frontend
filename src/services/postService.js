import api from './api';

// GET ALL POST
export const getAllPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// GET POST BY ID
export const getPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// CREATE POST
export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// UPDATE POST
export const updatePost = async (id, postData) => {
  try {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// DELETE POST
export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};