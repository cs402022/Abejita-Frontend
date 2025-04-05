import axios from 'axios'; // Añadimos esta línea

const httpService = {
    get: async (url) => {
      const response = await axios.get(url, { timeout: 30000 });
      return response.data;
    },
    post: async (url, data) => {
      const response = await axios.post(url, data);
      return response.data;
    },
  };
  
  export default httpService;