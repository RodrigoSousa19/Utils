import { API_URL } from '@env'; // A URL da sua API

class ApiService {

  static async request(method, endpoint, body = null) {

    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {

      const response = await fetch(`${API_URL}${endpoint}`, options);

      if (!response.ok) {
        throw new Error(`Erro na requisição ${method}: ${response.statusText}`);
      }


      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }

  static get(endpoint) {
    return this.request('GET', endpoint);
  }

  static post(endpoint, body) {
    return this.request('POST', endpoint, body);
  }

  static put(endpoint, body) {
    return this.request('PUT', endpoint, body);
  }

  static delete(endpoint) {
    return this.request('DELETE', endpoint);
  }
}

export default ApiService;
