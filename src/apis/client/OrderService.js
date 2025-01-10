import apiClient from '../configApiDefault';

const orderService = {
  getAll: async (pagination, token) => {
    try {
      const { page, limit } = pagination || {};
      const query = new URLSearchParams();
      if (page) query.append('page', page);
      if (limit) query.append('limit', limit);
      const response = await apiClient.get(`/pedidos?${query.toString()}`, {
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
};

export default orderService;