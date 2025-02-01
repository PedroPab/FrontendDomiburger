import apiClient from '../configApiDefault';

const productService = {
  getAll: async (pagination, token) => {
    try {
      const { page, limit } = pagination || {};
      const query = new URLSearchParams();
      if (page) query.append('page', page);
      if (limit) query.append('limit', limit);
      const response = await apiClient.get(`/productos?${query.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching :', error);
      throw error;
    }
  },
  getId: async (id, token) => {
    try {
      const response = await apiClient.get(`/productos/id/?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching :', error);
      throw error;
    }
  },
  create: async (data) => {
    const rta = await apiClient.post(`/productos`, data)
    return rta.data
  }
};

export default productService;