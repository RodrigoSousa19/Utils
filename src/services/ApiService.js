import { API_URL } from "@env";
import axios from 'axios';

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

  static async fileRequest(method, endpoint, body) {
    const formData = new FormData();
    formData.append("file", body);

    console.log(formData);

    try {
      console.log(`cURL equivalente:
          curl -X ${method} "${API_URL}${endpoint}" \\
            -H "Content-Type: multipart/form-data" \\
            --form 'file=@${body.name || "arquivo"}'
        `);

      const response = await axios({
        method: method,
        url: `${API_URL}${endpoint}`,
        data: JSON.stringify(formData),
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = {
        success: true,
        message: "Arquivo enviado com sucesso.",
        data: response.data,
      };

      console.log("Resposta da API:", result);
      return result;
    } catch (error) {
      console.error("Erro ao enviar arquivo:", error.response || error);

      return {
        success: false,
        message:
          error.response?.data?.message || error.message || "Erro inesperado",
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
