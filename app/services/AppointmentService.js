import axios from 'axios';

const API_URL = 'https://clinic-management-api.onrender.com/clients';

const ClientService = {
  // Crear un nuevo cliente
  createClient: async (clientData) => {
    try {
      const response = await axios.post(`${API_URL}/save`, clientData);
      return response.data;
    } catch (error) {
      throw new Error('Error al crear el cliente');
    }
  },

  // Obtener un cliente por ID
  getClientById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener el cliente');
    }
  },

  // Obtener todos los clientes
  getAllClients: async () => {
    try {
      const response = await axios.get(`${API_URL}/list`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener los clientes');
    }
  },

  // Actualizar un cliente
  updateClient: async (id, clientData) => {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, clientData);
      return response.data;
    } catch (error) {
      throw new Error('Error al actualizar el cliente');
    }
  },

  // Eliminar un cliente
  deleteClient: async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
    } catch (error) {
      throw new Error('Error al eliminar el cliente');
    }
  },
};

export default ClientService;
