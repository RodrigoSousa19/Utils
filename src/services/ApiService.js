import { API_URL } from "@env";

class ApiService {
  static async request(method, endpoint, body = null) {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, options);

      const result = {
        success: response.ok,
        message: "",
        data: null,
      };

      if (
        response.status === 204 ||
        response.headers.get("Content-Length") === "0"
      ) {
        result.message = "Sem conteúdo retornado.";
        return result;
      }

      if (!response.ok) {
        throw new Error(`Erro na requisição ${method}: ${response.statusText}`);
      }

      const data = await response.json();
      result.data = data;
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Erro inesperado",
      };
    }
  }

  static get(endpoint) {
    return this.request("GET", endpoint);
  }

  static post(endpoint, body) {
    return this.request("POST", endpoint, body);
  }

  static put(endpoint, body) {
    return this.request("PUT", endpoint, body);
  }

  static delete(endpoint) {
    return this.request("DELETE", endpoint);
  }
}

export default ApiService;
