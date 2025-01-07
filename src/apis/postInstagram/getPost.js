import apiClient from './config';

const postInstagram = {
  getPosts: async (quantity = 3) => {
    try {
      const response = await apiClient.get(`/?quantity=${quantity}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching img details:', error);
      throw error;
    }
  },
};

export { postInstagram };