import apiClient from '../configApiDefault';

const clientService = {
  getAll: async (pagination, token) => {
    try {
      const { page, limit } = pagination || {};
      const query = new URLSearchParams();
      if (page) query.append('page', page);
      if (limit) query.append('limit', limit);
      const response = await apiClient.get(`/clientes?${query.toString()}`, {
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

  create: async (Data) => {
    try {
      const response = await apiClient.post('/clients', Data);
      return response.data;
    } catch (error) {
      console.error('Error creating :', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await apiClient.get(`/Projects/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching  details:', error);
      throw error;
    }
  },
};

export default clientService;