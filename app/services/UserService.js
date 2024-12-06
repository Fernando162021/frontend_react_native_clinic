import axios from 'axios';

// Configura la URL base de tu API
const API_URL = 'https://clinic-management-api.onrender.com/users';

// El servicio de login
const UserService = {
  login: async (credentials) => {
    try {
      console.log("Enviando credenciales:", credentials);

      // Realiza la solicitud POST a la API con las credenciales
      const response = await axios.post(`${API_URL}/login`, credentials);

      console.log("Respuesta recibida de la API:", response.data);

      // Devuelve el resultado de la API, en este caso el token (si lo recibes)
      return response.data;
    } catch (error) {
      if (error.response) {
        // Si la respuesta tiene un error, lo mostramos
        console.error('Error de la API:', error.response.data);
        throw new Error(`Error en el login: ${error.response.data}`);
      } else if (error.request) {
        // Si no hay respuesta de la API
        console.error('No se recibió respuesta del servidor:', error.request);
        throw new Error('No se pudo conectar al servidor');
      } else {
        // Si ocurre otro tipo de error
        console.error('Error inesperado:', error.message);
        throw new Error('Error inesperado al realizar el login');
      }
    }
  },
};

export default UserService;
